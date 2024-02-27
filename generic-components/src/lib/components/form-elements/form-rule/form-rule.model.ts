import { RuleValue, WorkflowNode } from '@webui/models';
import { BehaviorSubject } from 'rxjs';

type RuleKey = number | string;
type RuleState = WorkflowNode;
type RuleFunction = string;
type Operator = 'or' | 'and';

export interface OutputData {
  active: number[];
  required_states: number[] | string[] | null;
  required_functions: number[] | string[] | null;
}

export class Rule {
  private _active = new BehaviorSubject<RuleKey[]>([]);
  private _condition = new BehaviorSubject<Operator>('or');
  private _ruleItems: Array<RuleState | RuleFunction> = [];
  private _value = new BehaviorSubject<RuleValue | null>(null);

  active$ = this._active.asObservable();
  condition$ = this._condition.asObservable();
  value$ = this._value.asObservable();
  items: Array<RuleState | Rule | RuleFunction> = [];

  get hasElements() {
    return !!this._ruleItems.length;
  }

  static isOperator = (value: unknown): value is Operator => {
    return value === 'or' || value === 'and';
  };

  constructor(
    elements: Array<RuleState | RuleFunction>,
    initialValue?: RuleValue
  ) {
    this._ruleItems = [...elements];

    if (initialValue) {
      this.fill(initialValue);
    } else {
      this.addRow();
    }
  }

  isActive(key: RuleKey) {
    return this._active.value.includes(key);
  }

  toggleItem(value: RuleKey) {
    if (this.isActive(value)) {
      this._active.next(this._active.value.filter(el => el !== value));
    } else {
      this._active.next([...this._active.value, value]);
    }

    this._value.next(this.value());
  }

  setCondition(value: Operator) {
    this._condition.next(value);

    this._value.next(this.value());
  }

  addRule(initialValue?: RuleValue) {
    if (!this._ruleItems) {
      return;
    }

    const rule = new Rule(this._ruleItems, initialValue);

    rule.value$.subscribe(() => {
      this._value.next(this.value());
    });

    this.items.push(rule);
  }

  addRow() {
    this.items = this._ruleItems;

    this._value.next(this.value());
  }

  value(): RuleValue {
    const rules: Rule[] = this.items.filter(el => el instanceof Rule) as Rule[];
    const result: RuleValue = [...this._active.value];

    if (rules.length) {
      result.push(
        ...rules.map((el: Rule) => el.value()).filter(el => el.length > 1)
      );
    }

    return [this._condition.value, ...result];
  }

  private fill(ruleValue: RuleValue) {
    this.setCondition(ruleValue[0] as Operator);

    if (ruleValue.some(el => Array.isArray(el))) {
      ruleValue.forEach(el => {
        if (Rule.isOperator(el)) {
          this.setCondition(el);
        } else if (Array.isArray(el)) {
          this.addRule(el);
        }
      });
    } else {
      this.items = this._ruleItems;

      this.items.forEach(el => {
        const key = el instanceof WorkflowNode ? el.number : (el as string);

        if (ruleValue.includes(key)) {
          this.toggleItem(key);
        }
      });
    }

    this._value.next(this.value());
  }
}
