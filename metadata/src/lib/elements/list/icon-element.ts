import { BasicListElement } from './basic-list-element';

export const Icon = 'icon';

export class IconElement extends BasicListElement {
  constructor(field: string) {
    super(field, Icon);
  }
}
