import { BasicListElement } from './basic-list-element';

export const Checkbox = 'checkbox';

export class CheckboxElement extends BasicListElement {
  constructor(field: string) {
    super(field, Checkbox);
  }
}
