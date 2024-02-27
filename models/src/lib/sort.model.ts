export enum Sort {
  DEFAULT = 'default',
  DESC = 'desc',
  ASC = 'asc',
}

export interface SortData {
  [param: string]: Sort;
}
