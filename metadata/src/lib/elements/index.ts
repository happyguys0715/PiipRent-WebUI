export * from './filters';

import * as forms from './form';
import * as filters from './filters';
import * as datalist from './list';

export const Form = {
  select: forms.select,
  textarea: forms.textarea,
  checkbox: forms.checkbox,
  datepicker: forms.datepicker,
  input: forms.input,
  related: forms.related,
  group: forms.group,
  row: forms.row,
  static: forms.stat,
  list: forms.list,
  info: forms.info,
  tabs: forms.tabs,
  collapse: forms.collapse,
  imageList: forms.image_list,
};

export const Filter = {
  range: filters.range,
  related: filters.related,
  date: filters.date,
  checkbox: filters.checkbox,
  select: filters.select,
  multiple: filters.multiple,
  text: filters.text,
};

export const List = {
  main: datalist.main,
  column: datalist.column,
  static: datalist.stat,
  text: datalist.text,
  related: datalist.related,
  button: datalist.button,
  select: datalist.select,
  picture: datalist.picture,
  input: datalist.input,
  icon: datalist.icon,
  info: datalist.info,
  link: datalist.link,
  checkbox: datalist.checkbox,
};

export { DatepickerType } from './form/datepicker-element';
export { InputType } from './form/input-element';
export { CheckboxType } from './form/checkbox-element';
export { StaticType } from './form/static-element';
export { RelatedElement } from './form/related-element';
export { CollapseElement } from './form/collapse-element';

export * from './form/utils';
