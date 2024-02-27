import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { BasicElementComponent } from './../basic-element/basic-element.component';
import { ApiService, SiteSettingsService } from '@webui/core';
import {
  Endpoints,
  ICompanyWorkflowNode,
  IListResponse,
  IWorkflowNode,
  RuleValue,
  WorkflowNode,
  getModelAndApp,
} from '@webui/models';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { OutputData, Rule } from './form-rule.model';
import { prop, sortBy } from 'ramda';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderComponent, SvgIconComponent } from '@webui/ui';

@Component({
  standalone: true,
  selector: 'webui-form-rule',
  templateUrl: './form-rule.component.html',
  styleUrls: ['./form-rule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslateModule, SvgIconComponent, LoaderComponent],
})
export class FormRuleComponent
  extends BasicElementComponent
  implements OnInit, OnDestroy
{
  private _destroy = new Subject<void>();
  private _states = new BehaviorSubject<WorkflowNode[] | null>(null);
  private _functions = new BehaviorSubject<string[] | null>(null);
  private _value = new BehaviorSubject<{
    key: keyof OutputData;
    value: RuleValue | null;
  } | null>(null);

  private _activeStates = new BehaviorSubject<Rule | null>(null);
  private _requiredStates = new BehaviorSubject<Rule | null>(null);
  private _requiredFunctions = new BehaviorSubject<Rule | null>(null);

  public override config!: any;
  public override group!: FormGroup;
  public errors: any;
  public message: any;
  public override key: any;
  public label!: boolean;

  readonly states$ = this._states.asObservable().pipe(takeUntil(this._destroy));
  readonly functions$ = this._functions
    .asObservable()
    .pipe(takeUntil(this._destroy));
  readonly value$ = this._value.asObservable().pipe(takeUntil(this._destroy));

  activeStates$ = this._activeStates
    .asObservable()
    .pipe(tap(rule => this.onChange(rule, 'active')));
  requiredStates$ = this._requiredStates
    .asObservable()
    .pipe(tap(rule => this.onChange(rule, 'required_states')));
  requiredFunctions$ = this._requiredFunctions
    .asObservable()
    .pipe(tap(rule => this.onChange(rule, 'required_functions')));

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private settings: SiteSettingsService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.addControl(this.config, this.fb);
    this.getStates(this.config.formData.value.data);
    this.getFunctions(this.config.formData.value.data);
    this.prepareRules();

    this.value$.pipe(takeUntil(this._destroy)).subscribe(event => {
      if (event) {
        const { key, value } = event;
        let currentValue = Object.assign(
          {},
          this.group.get(this.key)?.value || {}
        );

        if (key in currentValue) {
          if (value) {
            currentValue[key] = value;
          } else {
            delete currentValue[key];
          }
        } else if (value) {
          currentValue[key] = value;
        }

        if (Object.keys(currentValue).length === 0) {
          currentValue = null;
        }

        this.group.get(this.key)?.patchValue(currentValue);
      }
    });

    this.group.get(this.key)?.patchValue(this.config.value);
  }

  public ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  onChange(rule: Rule | null, key: keyof OutputData): void {
    if (rule) {
      rule.value$.pipe(takeUntil(this._destroy)).subscribe(value => {
        if (value) {
          let result: RuleValue | null = this.parseRule(value);

          if (result?.length === 2) {
            result = result[1] as RuleValue;
          }

          if (result?.length === 1) {
            result = null;
          }

          if (key === 'active' && result) {
            result = result.slice(1);
          }

          this._value.next({ key, value: result });
        }
      });
    }
  }

  private getStates(node: IWorkflowNode) {
    const params: Record<string, any> = {
      workflow_node__workflow: node.workflow.id,
      active: true,
      only_parent: true,
      limit: -1,
    };

    if (this.settings.companyId) {
      params['company'] = this.settings.companyId;
    }

    this.apiService
      .get<IListResponse<ICompanyWorkflowNode>>(
        '/core/companyworkflownodes/',
        params
      )
      .pipe(takeUntil(this._destroy))
      .subscribe((response: IListResponse<ICompanyWorkflowNode>) => {
        const nodes = sortBy(prop('order'))(response.results);

        this._states.next(nodes.map(node => new WorkflowNode(node)));
      });
  }

  private getFunctions(payload: IWorkflowNode) {
    const node = getModelAndApp(payload);
    const params: Record<string, string | number> = {
      app_name: node.app,
      model_name: node.model,
    };

    this.apiService
      .get<string[]>(Endpoints.Functions, params)
      .pipe(takeUntil(this._destroy))
      .subscribe(response => {
        this._functions.next(response);
      });
  }

  private prepareRules() {
    const value = JSON.parse(JSON.stringify(this.config.value));

    this.states$.subscribe(states => {
      if (!states) {
        return;
      }

      const activeStates = value?.active
        ? ['or', ['or', ...value.active]]
        : ['or', ['or']];
      const requiredStates = this.parseRule(value?.required_states);

      this._activeStates.next(new Rule(states, activeStates));
      this._requiredStates.next(new Rule(states, requiredStates));
    });

    this.functions$.subscribe(functions => {
      if (!functions) {
        return;
      }

      const requiredFunctions = this.parseRule(value?.required_functions);

      this._requiredFunctions.next(new Rule(functions, requiredFunctions));
    });
  }

  private parseRule(initialValue?: RuleValue): RuleValue {
    if (!initialValue) {
      return ['or', ['or']];
    }

    let result = [...initialValue];

    result = this.flatArray(result);
    result = this.optimazeRule(result);
    result = this.compactRule(result);

    if (result.some(el => Array.isArray(el))) {
      return result;
    } else {
      return [result[0], result];
    }
  }

  private optimazeRule(value: RuleValue): RuleValue {
    const result: RuleValue = [];
    const operator: unknown = value.shift();

    if (Rule.isOperator(operator)) {
      value.forEach(el => {
        if (Array.isArray(el)) {
          const [op, ...items] = this.optimazeRule([...el]);

          if (op === operator) {
            result.push(...items);
          } else {
            result.push([op, ...items]);
          }
        } else {
          result.push(el);
        }
      });
    }

    return [operator, ...result] as RuleValue;
  }

  private compactRule(value: RuleValue): RuleValue {
    const result: RuleValue = [];
    const operator: unknown = value.shift();

    if (Rule.isOperator(operator)) {
      if (value.some(node => Array.isArray(node))) {
        const ids = value.filter(el => !Array.isArray(el));

        if (ids.length) {
          ids.unshift(operator);
          result.push(ids);
        }

        value
          .filter(el => Array.isArray(el))
          .forEach(el => result.push(this.compactRule(el as RuleValue)));
      } else {
        result.push(...value);
      }
    }

    return [operator, ...result] as RuleValue;
  }

  // Remove [[40]] situation
  private flatArray(value: RuleValue): RuleValue {
    const result: RuleValue = [];

    value.forEach(el => {
      if (Array.isArray(el) && el.length === 1) {
        result.push(...this.flatArray(el));
      } else if (Array.isArray(el)) {
        result.push(this.flatArray(el));
      } else {
        result.push(el);
      }
    });

    return result;
  }
}
