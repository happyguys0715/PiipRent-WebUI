export const Collapse = 'collapse';

type IsCollapsed = (data: any) => boolean;

export class CollapseElement {
  type = Collapse;
  children!: any[];
  name?: string;
  translateKey?: string;
  collapsed: boolean;
  isCollapsed?: IsCollapsed;

  constructor(
    name?: string,
    translateKey?: string,
    collapsed: boolean = false
  ) {
    this.name = name;
    this.translateKey = translateKey;
    this.collapsed = collapsed;
  }

  setChildren(children: any[]) {
    this.children = [...children];

    return this;
  }

  setIsCollapsed(callback: IsCollapsed) {
    this.isCollapsed = callback;

    return this;
  }
}
