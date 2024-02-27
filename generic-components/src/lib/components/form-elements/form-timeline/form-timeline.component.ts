import {
  Component,
  ViewChild,
  OnInit,
  OnDestroy,
  TemplateRef,
} from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';

import { FormatString } from '@webui/utilities';
import {
  EventService,
  EventType,
  SiteSettingsService,
  TimelineAction,
  TimelineService,
} from '@webui/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Endpoints, FormMode, DialogRef, dialogConfig } from '@webui/models';
import { is } from 'ramda';
import { CommonModule } from '@angular/common';
import {
  CloseButtonComponent,
  FaIconComponent,
  InfoComponent,
  LoaderComponent,
  SpinnerComponent,
  TooltipDirective,
} from '@webui/ui';
import { TranslateModule } from '@ngx-translate/core';
import {
  PassTestModalComponent,
  PassTestModalConfig,
} from '@webui/application-test';
import { GenericFormComponent } from '../../../generic-form/generic-form.component';
import { Dialog } from '@angular/cdk/dialog';

interface IStateOption {
  id: string;
  number: number;
  name_before_activation: string;
  name_after_activation: string;
  state: 1 | 2 | 3;
  requirements: string[];
  substates?: IStateOption[];
  wf_object_id: string;
  acceptance_tests: any[];
}

class StateOption {
  id: string;
  number: number;
  name_before_activation: string;
  name_after_activation: string;
  state: 0 | 1 | 2 | 3 | 4;
  model: string;
  label: string;
  requirements: string[];
  substates?: IStateOption[];
  wf_object_id: string;
  acceptance_tests: any[];

  constructor(payload: IStateOption, model: string) {
    this.id = payload.id;
    this.number = payload.number;
    this.name_after_activation = payload.name_after_activation;
    this.name_before_activation = payload.name_before_activation;
    this.state = payload.state;
    this.model = model;
    this.label =
      this.state === 2
        ? this.name_after_activation || this.name_before_activation
        : this.name_before_activation;
    this.requirements = payload.requirements;
    this.substates = payload.substates;
    this.wf_object_id = payload.wf_object_id;
    this.acceptance_tests = payload.acceptance_tests;
  }

  get translateKey() {
    const state = this.state === 1 ? 'before' : 'after';

    return `workflow.${this.model}.${this.number}.${state}`;
  }
}

@Component({
  standalone: true,
  selector: 'webui-form-timeline',
  templateUrl: 'form-timeline.component.html',
  styleUrls: ['./form-timeline.component.scss'],
  imports: [
    CommonModule,
    LoaderComponent,
    FaIconComponent,
    TranslateModule,
    ReactiveFormsModule,
    InfoComponent,
    SpinnerComponent,
    CloseButtonComponent,
    GenericFormComponent,
    TooltipDirective,
  ],
})
export class FormTimelineComponent implements OnInit, OnDestroy {
  private _options = new BehaviorSubject<IStateOption[] | null>(null);
  private _destroy = new Subject<void>();

  @ViewChild('stateModal') stateModal!: TemplateRef<unknown>;

  public config: any;
  public modalData: any;
  public stateData: any = {};
  public requirements!: any[];
  public modalRef?: DialogRef<any, any>;
  public objectId!: string;
  public query: { [key: string]: any } = {};
  public testId!: string;

  public currentState = new FormControl();

  public dropdown!: boolean;
  public updated!: boolean;
  public loading!: boolean;
  public saveProcess!: boolean;
  public advancedSeving!: boolean;

  public passTestAction!: BehaviorSubject<number>;
  public passedTests: Map<string, any[]> = new Map();
  public workflowObjectEndpoint = Endpoints.WorkflowObject;
  public FormMode = FormMode;

  options$ = this._options
    .asObservable()
    .pipe(
      map(states => states?.map(el => new StateOption(el, this.getModel())))
    );

  dropdownOptions$ = this.options$.pipe(
    map(states => states?.filter(el => el.state < 3)),
    tap(states => {
      const currentState = states?.reduce((prev, next) =>
        next.state === 2 ? next : prev
      );

      if (currentState) {
        this.currentState.patchValue(currentState.id);
      }
    })
  );

  constructor(
    private modalService: Dialog,
    private companySettings: SiteSettingsService,
    private timelineService: TimelineService,
    private eventService: EventService
  ) {}

  public ngOnInit() {
    this.advancedSeving = this.companySettings.settings.advance_state_saving;
    this.dropdown = this.config.dropdown;
    if (!this.config.hide) {
      this.initialize();
    }
    this.timelineService.action$
      .pipe(takeUntil(this._destroy))
      .subscribe(value => {
        if (value === TimelineAction.Update) {
          this.getTimeline();
          return;
        }

        if (value !== TimelineAction.Reset) {
          this._options.next(value);
        }
      });
  }

  public initialize() {
    const formatString = new FormatString();
    const keys = Object.keys(this.config.query);
    keys.forEach(el => {
      if (el === 'object_id') {
        if (Array.isArray(this.config.query[el])) {
          if (!this.objectId) {
            this.objectId = formatString.format(
              this.config.query[el][2],
              this.config.value
            );
          }

          this.config.query[el].forEach((query: any) => {
            if (!this.objectId) {
              this.objectId = formatString.format(query, this.config.value);
            }
          });
        } else {
          this.objectId = formatString.format(
            this.config.query[el],
            this.config.value
          );
        }

        this.query[el] = this.objectId;
      } else {
        this.query[el] = this.config.query[el];
      }
    });

    if (this._options.value === null) {
      this.getTimeline();
    }
  }

  public getState(): any {
    const states = this._options.value;
    const id = this.currentState.value;

    return states?.find(el => el.id === id);
  }

  public ngOnDestroy() {
    this.modalRef?.close();
    this._destroy.next();
    this._destroy.complete();
  }

  public open(state: any): void {
    this.modalRef?.close();
    if (this.saveProcess) {
      return;
    }
    this.modalData = {};
    if (
      state.state === 1 &&
      !this.advancedSeving &&
      !state.acceptance_tests.length &&
      !state.substates.length
    ) {
      state.saveProcess = true;
      this.timelineService
        .activateState(this.objectId, state.id, true)
        .pipe(finalize(() => (this.saveProcess = false)))
        .subscribe(() => {
          this.eventService.emit(EventType.UpdateList, {
            endpoint: Endpoints.WorkflowObject,
          });
          this.getTimeline(this.config.query.model === 'hr.job');
        });
      return;
    }

    if (state.acceptance_tests.length) {
      const tests = state.acceptance_tests.filter(
        (test: any) => test.score === 0
      );

      if (tests.length) {
        const passTestAction = new BehaviorSubject(0);

        passTestAction.subscribe(index => {
          const testId = tests[index].acceptance_test.id;
          this.modalRef = this.modalService.open(PassTestModalComponent, {
            ...dialogConfig(),
            data: {
              config: {
                testId,
                send: false,
              } as PassTestModalConfig,
            },
          });

          this.modalRef.closed.pipe(takeUntil(this._destroy)).subscribe(res => {
            if (!res) {
              this.passedTests.clear();
              return;
            }

            if (this.passedTests.has(testId)) {
              this.passedTests.set(testId, [
                ...(this.passedTests.get(testId) as any[]),
                ...(res as any[]),
              ]);
            } else {
              this.passedTests.set(testId, res as any[]);
            }

            if (tests[index + 1]) {
              passTestAction.next(index + 1);
            } else if (this.passedTests.size === tests.length) {
              if (state.wf_object_id) {
                this.savePassedTests(state.wf_object_id);
              } else {
                this.timelineService
                  .activateState(this.objectId, state.id, true)
                  .subscribe(workflowObject => {
                    this.eventService.emit(EventType.UpdateList, {
                      endpoint: Endpoints.WorkflowObject,
                    });
                    this.savePassedTests(workflowObject.id);
                  });
              }
            }
          });
        });

        return;
      } else {
        state.saveProcess = true;
        this.timelineService
          .activateState(this.objectId, state.id, true)
          .pipe(finalize(() => (this.saveProcess = false)))
          .subscribe(() => {
            this.eventService.emit(EventType.UpdateList, {
              endpoint: Endpoints.WorkflowObject,
            });
            this.getTimeline(this.config.query.model === 'hr.job');
          });
        return;
      }
    }

    if (state.state === 1 || state.state === 2) {
      let title = '';
      if (state.state === 1) {
        title = state.name_before_activation;
      } else if (state.state === 2) {
        title = state.name_after_activation
          ? state.name_after_activation
          : state.name_before_activation;
      }
      this.modalData.id = state.wf_object_id || undefined;
      this.modalData.title = title;
      this.modalData.tests =
        state.acceptance_tests.length &&
        state.acceptance_tests.map((el: any) => {
          if (el.score) {
            const score = parseFloat(el.score);

            el.score = score.toFixed(2);
          }
          return el;
        });
      this.modalData.substates = state.substates.length && state.substates;
      this.modalData.workflowObject = state.wf_object_id;
      if (state.total_score) {
        const score = parseFloat(state.total_score);

        state.total_score = score.toFixed(2);
      }

      this.modalData.state = state;
      this.stateData = this.setDataForState(
        state,
        !this.modalData.tests && !this.modalData.substates
      );
      this.modalRef = this.modalService.open(this.stateModal, dialogConfig());

      this.modalRef.closed.pipe(takeUntil(this._destroy)).subscribe(() => {
        this.eventService.emit(EventType.UpdateList, {
          endpoint: Endpoints.WorkflowObject,
        });
      });
    }
  }

  public savePassedTests(id: string) {
    this.timelineService
      .passTests(this.updateTests(id))
      .pipe(finalize(() => (this.saveProcess = false)))
      .subscribe(() => {
        this.getTimeline(this.config.query.model === 'hr.job');
      });
  }

  public updateTests(id: string) {
    const tests: any[] = [];
    Array.from(this.passedTests.values()).forEach(el => {
      if (el) {
        el.forEach(q => (q.workflow_object = id));
        tests.push(...el);
      }
    });

    return tests;
  }

  public getTimeline(resetPage?: boolean): void {
    const query = { ...this.query };
    this.loading = true;

    if (is(Object, this.query['model'])) {
      query['model'] = this.getModel();
    }

    this.timelineService
      .getTimeline(query)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(timeline => {
        this.timelineService.emit(resetPage ? TimelineAction.Reset : timeline);
      });
  }

  public setDataForState(state: any, hideScore: any) {
    const fields = ['object_id', 'state', 'active'];
    const result: Record<string, any> = {};
    fields.forEach(el => {
      const value =
        el === 'state' ? state.id : el === 'object_id' ? this.objectId : true;
      result[el] = {
        action: 'add',
        data: {
          read_only: el === 'active' ? false : true,
          value,
          readonly: true,
          editForm: true,
        },
      };
    });

    result['score'] = {
      action: 'add',
      data: {
        editForm: true,
        hide: hideScore,
        send: false,
        value: 5,
      },
    };

    return result;
  }

  public sendEventHandler(e: any): void {
    if (e.type === 'saveStart') {
      this.saveProcess = true;
    }
    if (e.status === 'success') {
      this.modalRef?.close();
      this.saveProcess = false;
      this.getTimeline(this.config.query.model === 'hr.job');
      this.modalData = null;
    }
  }

  public formError() {
    this.saveProcess = false;
  }

  public fillinTest(e: any, id: string) {
    e.preventDefault();
    e.stopPropagation();
    this.modalRef?.close();

    this.testId = id;

    if (!this.modalData.workflowObject) {
      this.createWorkflowObject(this.modalData.state.id);

      return;
    }

    this.modalRef = this.modalService.open(PassTestModalComponent, {
      ...dialogConfig(),
      data: {
        config: {
          send: true,
          testId: id,
          workflowObject: this.modalData.workflowObject,
        } as PassTestModalConfig,
      },
    });
  }

  public createWorkflowObject(stateId: string) {
    this.timelineService
      .activateState(this.objectId, stateId)
      .subscribe(res => {
        const { id } = res;

        this.modalData.state.wf_object_id = id;
        this.modalData.workflowObject = id;

        this.modalRef = this.modalService.open(PassTestModalComponent, {
          ...dialogConfig(),
          data: {
            config: {
              send: true,
              testId: id,
              workflowObject: this.modalData.workflowObject,
            } as PassTestModalConfig,
          },
        });
      });
  }

  public testComplete(closeModal: () => void) {
    closeModal();

    this.getTimeline();
    this.modalData = null;
  }

  public calculateProgress(state: any) {
    if (state.substates && state.substates.length) {
      const substatesCount = state.substates.length;

      let activeCount = 0;

      state.substates.forEach((el: any) => {
        if (el.state === 2 || el.state === 3) {
          activeCount += 1;
        }
      });

      return `${activeCount} / ${substatesCount}`;
    }

    return;
  }

  public editContact(event: Event) {
    event.stopPropagation();
    event.preventDefault();

    this.timelineService.editContact({ type: 'editContact' });

    return false;
  }

  public verifyPhone(message: string): boolean {
    return message.includes('mobile phone');
  }

  onRefresh(): void {
    this.timelineService.emit(TimelineAction.Update);
  }

  private getModel() {
    return this.config.query['model'];
  }
}
