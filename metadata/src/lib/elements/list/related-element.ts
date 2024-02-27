import { BasicListElement } from './basic-list-element';

export const Related = 'related';

export class RelatedElement extends BasicListElement {
  endpoint?: string;

  constructor(field: string, endpoint?: string) {
    super(field, Related);

    this.endpoint = endpoint;
  }
}
