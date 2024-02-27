import { BasicListElement } from './basic-list-element';

export const Input = 'input';

export class InputElement extends BasicListElement {
  constructor(field: string) {
    super(field, Input);
  }
}
