export const Group = 'group';

export class GroupElement {
  type = Group;

  children!: any[];

  label?: string;
  width?: number;
  main?: boolean;
  name?: string;
  hideLabel?: boolean;
  marginBottom?: number;
  translateKey?: string;

  constructor(label?: string, translateKey?: string) {
    this.label = label;
    this.translateKey = translateKey;
  }

  mainTab(name: string) {
    this.main = true;
    this.name = name;

    return this;
  }

  setChildren(children: any[]) {
    this.children = [...children];

    return this;
  }

  setWidth(width: number) {
    this.width = width;

    return this;
  }

  doNotShowLabel() {
    this.hideLabel = true;

    return this;
  }

  setMarginBottom(value: number) {
    this.marginBottom = value;

    return this;
  }
}
