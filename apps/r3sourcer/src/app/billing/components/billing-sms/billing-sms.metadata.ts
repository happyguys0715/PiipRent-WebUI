import { CheckboxType, Field, Form, InputType } from '@webui/metadata';

export interface ISmsBalance {
  id: number;
  company: string;
  company_name: string;
  balance: string;
  top_up_amount: number;
  top_up_limit: number;
  last_payment: number;
  segment_cost: number;
  auto_charge: boolean;
}

export const autoChargeMetadata = [
  new Form.checkbox.element('auto_charge', 'Enable', CheckboxType.Checkbox),

  new Form.input.element(
    'top_up_limit',
    'If the balance falls below',
    InputType.Number
  ).setDefaultValue(10),

  new Form.input.element(
    'top_up_amount',
    'Charge the balance by',
    InputType.Number
  ).setDefaultValue(20),
] as Field[];
