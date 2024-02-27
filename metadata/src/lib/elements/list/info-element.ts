import { BasicListElement } from './basic-list-element';

export const Info = 'info';

export class InfoElement extends BasicListElement {
  constructor(field: string) {
    super(field, Info);
  }
}
