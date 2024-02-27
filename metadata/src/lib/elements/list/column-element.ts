export class ColumnElement {
  label: string;
  name: string;

  delim?: any;
  sort?: boolean;
  sort_field?: string;
  center?: boolean;
  hide?: boolean;
  width?: number;

  timezone?: string;

  content?: any[];

  constructor(name: string, label: string) {
    this.name = name;
    this.label = label;
  }

  update(delim: any) {
    this.delim = delim;

    return this;
  }

  setCenter() {
    this.center = true;

    return this;
  }

  setContent(content: any[]) {
    this.content = [...content];

    return this;
  }

  setSort(sort: boolean, sort_field: string) {
    this.sort = sort;
    this.sort_field = sort_field;

    return this;
  }

  setHide() {
    this.hide = true;

    return this;
  }

  setWidth(width: number) {
    this.width = width;

    return this;
  }

  setTimezone(timezone: string) {
    this.timezone = timezone;

    return this;
  }
}
