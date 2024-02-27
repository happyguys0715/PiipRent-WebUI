export const Tabs = 'tabs';

export class TabsElement {
  type = Tabs;

  children!: any[];

  hideEditButton?: boolean;

  constructor(hideEditButton?: boolean) {
    this.hideEditButton = hideEditButton;
  }

  setChildren(children: any[]) {
    this.children = [...children];

    return this;
  }
}
