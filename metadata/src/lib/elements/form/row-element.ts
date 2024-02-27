import { IsHiddenFn } from '../../models';

export const Row = 'row';

export class RowElement {
  type = Row;

  children!: any[];

  label?: string;
  hideBorder?: boolean;
  showOnMobile?: boolean;
  isHidden?: IsHiddenFn;

  constructor(label?: string) {
    this.label = label;
  }

  setChildren(children: any[]) {
    this.children = [...children];

    return this;
  }

  noBorder() {
    this.hideBorder = true;

    return this;
  }

  showOnMobileDevice() {
    this.showOnMobile = true;

    return this;
  }

  setIsHidden(rule: (v?: any) => boolean) {
    this.isHidden = rule;

    return this;
  }
}
