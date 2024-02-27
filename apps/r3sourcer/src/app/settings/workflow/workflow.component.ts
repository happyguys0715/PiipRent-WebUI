import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  TemplateRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, forkJoin, Subject, takeUntil } from 'rxjs';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

import { config, workflowEl } from './workflow.config';
import { Field, Form } from '@webui/metadata';
import {
  dialogConfig,
  DialogRef,
  Endpoints,
  ICompanyWorkflowNode,
  IWorkflow,
  WorkflowNode,
} from '@webui/models';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { prop, sortBy } from 'ramda';
import { CommonModule } from '@angular/common';
import {
  CloseButtonComponent,
  FaIconComponent,
  SpinnerComponent,
  SvgIconComponent,
} from '@webui/ui';
import { SubscriptionRequiredDirective } from '@webui/shared';
import { getElementFromMetadata } from '@webui/utilities';
import { WorkflowService } from '@webui/core';
import {
  DynamicFormComponent,
  GenericFormComponent,
} from '@webui/generic-components';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  standalone: true,
  selector: 'webui-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss'],
  imports: [
    CommonModule,
    SvgIconComponent,
    DragDropModule,
    DynamicFormComponent,
    TranslateModule,
    CloseButtonComponent,
    FaIconComponent,
    SubscriptionRequiredDirective,
    SpinnerComponent,
    GenericFormComponent,
  ],
  providers: [WorkflowService],
})
export class WorkflowComponent implements OnInit, OnDestroy {
  private _destroy = new Subject<void>();

  public currentWorkflowNodes!: any[];

  public modalRef?: DialogRef;

  public modalInfo: any;
  public editModalInfo: any;

  public saveProcess!: boolean;

  public workflowId!: string;
  public parentId?: string;

  public subStates: any;
  public acceptanceTests: any;

  public addConfig!: any;
  public config!: any[];

  public form: FormGroup = new FormGroup({});

  @Input() public company!: string;
  @Input() public advanced!: boolean;
  @Output() public changeSaving = new EventEmitter<{
    advance_state_saving: boolean;
  }>();

  @ViewChild('modal') public modal!: TemplateRef<any>;
  @ViewChild('add') public addModal!: TemplateRef<any>;
  @ViewChild('edit') public editModal!: TemplateRef<any>;
  @ViewChild('tests') public testModal!: TemplateRef<any>;

  constructor(
    private workflowService: WorkflowService,
    private modalService: Dialog,
    private translateService: TranslateService
  ) {}

  public ngOnInit() {
    this.subStates = {};
    this.acceptanceTests = {};

    this.getWorkflows();
    this.form.valueChanges.pipe(takeUntil(this._destroy)).subscribe(value => {
      const { workflow, advance_state_saving } = value;

      if (workflow !== this.workflowId && workflow) {
        this.workflowId = workflow;
        this.getNodes(this.workflowId);
      }

      this.changeSaving.emit({ advance_state_saving: !!advance_state_saving });
    });
  }

  public ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();

    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  public onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.currentWorkflowNodes,
      event.previousIndex,
      event.currentIndex
    );

    const states = this.currentWorkflowNodes;
    const requests: any[] = [];
    states.forEach((state, i) => {
      const body = {
        order: i,
      };

      requests.push(this.workflowService.updateStateOrder(body, state.id));
    });

    forkJoin(requests).subscribe();
  }

  public getWorkflows() {
    this.workflowService.getWorkflowList().subscribe((res: any) => {
      const { results } = res;
      const options = res.count
        ? results.map((el: IWorkflow) => {
            return {
              value: el.id,
              key: el.model.name.toLowerCase().replace(' ', '-'),
              label: el.name,
            };
          })
        : [];

      workflowEl.updateTemplate({ options });
      if (this.advanced) {
        const saving: any = getElementFromMetadata(
          config,
          'advance_state_saving'
        );
        saving.value = true;
      }
      this.config = config;
    });
  }

  public getNodes(id: string) {
    this.workflowService
      .getNodesOfCompany(id, this.company)
      .subscribe(({ results }) => {
        this.currentWorkflowNodes = sortBy(prop('order'))(results);
      });
  }

  public getSubstates(workflowId: string, nodeId?: string) {
    if (!nodeId) {
      return;
    }

    this.workflowService
      .getSubStates(workflowId, nodeId)
      .subscribe((res: any) => (this.subStates[nodeId] = res.results));
  }

  public getAcceptensTests(id: string) {
    this.workflowService.getAcceptenceTets(id).subscribe((res: any) => {
      this.acceptanceTests[id] = res.results;
    });
  }

  public addState(e: MouseEvent, parent?: string) {
    e.preventDefault();
    e.stopPropagation();

    if (parent) {
      this.parentId = parent;
    } else {
      this.parentId = undefined;
    }

    this.addConfig = this.getAddConfig(this.company, this.workflowId);

    this.modalRef = this.modalService.open(
      this.addModal,
      dialogConfig({
        size: 'sm',
      })
    );
  }

  public addStateToCompany(data: any) {
    this.modalRef?.close();
    if (data.workflow_node && data.workflow_node.id) {
      data.company = {
        id: this.company,
      };

      if (this.parentId) {
        this.addSubstateToCompany(this.parentId, data);
      } else {
        this.setState(data);
      }
    }
  }

  public setState(data: any, parentId?: string) {
    data.order = this.getNextOrder();

    this.workflowService.addWorkflowToCompany(data).subscribe(() => {
      if (parentId) {
        this.getSubstates(this.workflowId, parentId);
      } else {
        this.getNodes(this.workflowId);
      }
    });
  }

  public getNextOrder(): number {
    let order = 0;

    this.currentWorkflowNodes.forEach(el => {
      if (el.order > order) {
        order = el.order;
      }
    });

    const length = this.currentWorkflowNodes.length;
    if (length > order) {
      order = length;
    }

    return order;
  }

  public addSubstateToCompany(parentId: string, data: any) {
    this.workflowService
      .setParentForSubstate(data.workflow_node.id, parentId)
      .subscribe(() => {
        this.setState(data, parentId);
      });
  }

  public addAcceptanceTest(data: any) {
    this.modalRef?.close();

    this.workflowService.addAcceptenceTest(data).subscribe((res: any) => {
      this.getAcceptensTests(res.company_workflow_node);
    });
  }

  public addSubstate(e: MouseEvent, node: any) {
    const parent = node.workflow_node.id;

    this.addState(e, parent);
  }

  public addTest(e: MouseEvent, node: any) {
    e.preventDefault();
    e.stopPropagation();

    this.addConfig = this.getAcceptenceTestsConfig(node);

    this.modalRef = this.modalService.open(
      this.testModal,
      dialogConfig({ size: 'sm' })
    );
  }

  public openEditModal(node: any) {
    this.openState(node, { size: 'lg' }, 'edit');
  }

  public openState(node: any, options?: any, type?: string) {
    this.modalRef?.close();

    let modal = this.modal;

    if (type === 'edit') {
      this.editModalInfo = this.generateConfigForEditModal(node);
      modal = this.editModal;
    } else {
      this.modalInfo = this.generateConfigForModal(node);

      this.getSubstates(this.workflowId, node.workflow_node.id);
      this.getAcceptensTests(node.id);
    }

    this.modalRef = this.modalService.open(
      modal,
      dialogConfig({
        ...options,
      })
    );

    this.modalRef.closed.subscribe(() => (this.modalRef = undefined));
  }

  public deleteNode(id: string) {
    this.workflowService.deleteNode(id).subscribe(() => {
      this.getNodes(this.workflowId);
    });
  }

  public deleteTest(test: any, node: any) {
    this.workflowService.deleteTest(test.id).subscribe(() => {
      this.getAcceptensTests(node.id);
    });
  }

  public deleteSubstate(node: any, e?: MouseEvent) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    this.workflowService
      .deleteParentForSubstate(node.workflow_node.id)
      .subscribe(() => {
        this.workflowService.deleteNode(node.id).subscribe(() => {
          this.getSubstates(this.workflowId, this.parentId);
        });
      });
  }

  public formEvent(e: any) {
    if (e.type === 'saveStart') {
      this.saveProcess = true;
    }
    if (e.type === 'sendForm' && e.status === 'success') {
      this.saveProcess = false;
      this.modalRef?.close();
    }
  }

  public formError() {
    this.saveProcess = false;
  }

  public generateConfigForEditModal(node: any) {
    return {
      id: node.workflow_node.id,
      label: node.workflow_node.name_before_activation,
      endpoint: this.workflowService.workflowNodeEndpoint,
      data: {
        company: {
          action: 'add',
          data: {
            hide: true,
            value: {
              id: this.company,
            },
          },
        },
        workflow: {
          action: 'add',
          data: {
            hide: true,
          },
        },
      },
    };
  }

  public generateConfigForModal(node: any) {
    return {
      id: node.workflow_node.id,
      label: node.workflow_node.name_before_activation,
      endpoint: this.workflowService.workflowNodeEndpoint,
      nodeId: node.id,
      node,
    };
  }

  public getAddConfig(company: string, workflow: string): any {
    return {
      config: [
        {
          type: 'related',
          key: 'workflow_node',
          endpoint: this.workflowService.workflowNodeEndpoint,
          options: [],
          templateOptions: {
            add: true,
            label: 'Workflow Node',
            values: ['__str__'],
          },
          prefilled: {
            workflow,
            company,
          },
          query: {
            company,
            workflow,
            system: 2,
          },
        },
      ],
    };
  }

  public getSubStatesConfig(
    company: string,
    workflow: string,
    parent: string
  ): any[] {
    return [
      {
        many: true,
        type: 'related',
        key: 'workflow_node',
        endpoint: this.workflowService.workflowNodeEndpoint,
        options: [],
        templateOptions: {
          add: true,
          label: 'Workflow Node',
        },
        prefilled: {
          workflow,
          company,
        },
        query: {
          company,
          workflow,
          parent,
          system: 2,
        },
      },
    ];
  }

  public getAcceptenceTestsConfig(node: any) {
    const hiddenFields = {
      elements: <Field[]>[],
      keys: <string[]>[],
      observers: <any[]>[],
    };

    return {
      config: this.parseMetadata(
        [
          new Form.select.element('test_type', 'Test type')
            .doNotSend()
            .addOptions({
              '': 'All',
              skill: 'Skill',
              tag: 'Tag',
              industry: 'Industry',
            }),

          new Form.related.element('industry', 'Industry', Endpoints.Industry)
            .setShowIfRule([
              {
                test_type: 'industry',
              },
            ])
            .doNotSend()
            .updateValues(['translations']),

          new Form.related.element('skill', 'Skill', Endpoints.Skill)
            .updateValues(['translations', 'name'])
            .setShowIfRule([
              {
                test_type: 'skill',
              },
            ])
            .doNotSend()
            .setQuery({
              company: 'currentCompany',
            }),

          new Form.related.element('tag', 'Tag', Endpoints.Tag)
            .setShowIfRule([
              {
                test_type: 'tag',
              },
            ])
            .doNotSend()
            .updateValues(['owner', 'translation']),

          new Form.related.element(
            'acceptance_test',
            'Acceptance Test',
            Endpoints.AcceptanceTest
          ).setQuery({
            type: '{test_type}',
            industry: '{industry.id}',
            skill: '{skill.id}',
            tag: '{tag.id}',
          }),

          {
            endpoint: '/core/companyworkflownodes/',
            read_only: false,
            hide: true,
            templateOptions: {
              label: 'Acceptance Test',
              values: ['__str__'],
              type: 'related',
            },
            value: node.id,
            type: 'related',
            key: 'company_workflow_node',
          },
        ],
        hiddenFields
      ),
      hiddenFields,
    };
  }

  getNodeTranslateKey(node: ICompanyWorkflowNode) {
    const workflowNode = new WorkflowNode(node);

    return `workflow.${workflowNode.app}.${workflowNode.model}.${workflowNode.number}.before`;
  }

  private parseMetadata(metadata: Field[], hiddenFields: any): Field[] {
    const formData = new BehaviorSubject({ data: {} });

    metadata.forEach(el => {
      if (el.showIf && el.showIf.length) {
        if (hiddenFields.keys.indexOf(el.key as string) === -1) {
          hiddenFields.keys.push(el.key as string);
          hiddenFields.elements.push(el);
          hiddenFields.observers = this.observeFields(
            el.showIf,
            hiddenFields.observers
          );
          el.hidden = new BehaviorSubject<boolean>(true);
        }
      }

      el.formData = formData;
    });

    return metadata;
  }

  private observeFields(fields: any[], observers: any[]) {
    fields.forEach((field: any) => {
      if (field instanceof Object) {
        const keys = Object.keys(field);
        keys.forEach(key => {
          if (observers.indexOf(key) === -1) {
            observers.push(key);
          }
        });
      } else {
        if (observers.indexOf(field) === -1) {
          observers.push(field);
        }
      }
    });
    return observers;
  }
}
