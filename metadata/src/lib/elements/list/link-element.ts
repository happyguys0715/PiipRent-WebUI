import { BasicListElement } from './basic-list-element';

export const Link = 'link';

export class LinkElement extends BasicListElement {
  action?: string;
  endpoint?: string;

  constructor(field: string, action?: string) {
    super(field, Link);

    this.action = action;
  }

  setEndpoint(endpoint: string) {
    this.endpoint = endpoint;

    return this;
  }
}
