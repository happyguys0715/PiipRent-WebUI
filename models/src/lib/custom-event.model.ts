import { Field } from '@webui/metadata';
import { FormEvent } from './form.model';

export interface CustomEvent {
  type: string | FormEvent;
  el: Field;
  value: any;
  additionalData?: any;
  manual?: boolean;
}
