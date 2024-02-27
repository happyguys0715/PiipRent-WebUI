import { RangeFilter, RangeFilterOptions, Range } from './range-filter';
import { RelatedFilter, RelatedFilterOptions, Related } from './related-filter';
import { DateFilter, DateFilterOptions, Date } from './date-filter';
import {
  CheckboxFilter,
  CheckboxFilterOptions,
  Checkbox,
} from './checkbox-filter';
import { SelectFilter, SelectFilterOptions, Select } from './select-filter';
import {
  MultipleFilter,
  MultipleFilterOptions,
  Multiple,
} from './multiple-filter';
import { TextFilter, TextFilterOptions, Text } from './text-filter';

export * from './range-filter';
export * from './related-filter';

export type Filter =
  | RangeFilter
  | RelatedFilter
  | DateFilter
  | CheckboxFilter
  | SelectFilter
  | MultipleFilter
  | TextFilter;

export enum Type {
  Range,
  Related,
  Date,
  Checkbox,
  Select,
  Multiple,
  Text,
}

export type FilterOptions =
  | RangeFilterOptions
  | RelatedFilterOptions
  | DateFilterOptions
  | CheckboxFilterOptions
  | SelectFilterOptions
  | MultipleFilter
  | TextFilter;

export function createFilter(
  type: Type,
  options: FilterOptions
): Filter | undefined {
  switch (type) {
    case Type.Range:
      return new RangeFilter(options as RangeFilterOptions);

    case Type.Related:
      return new RelatedFilter(options as RelatedFilterOptions);

    case Type.Date:
      return new DateFilter(options as DateFilterOptions);

    case Type.Checkbox:
      return new CheckboxFilter(options as CheckboxFilterOptions);

    case Type.Select:
      return new SelectFilter(options as SelectFilterOptions);

    case Type.Multiple:
      return new MultipleFilter(options as MultipleFilterOptions);

    case Type.Text:
      return new TextFilter(options as TextFilterOptions);

    default:
      break;
  }

  return;
}

export const range = { element: RangeFilter, type: Range };
export const related = { element: RelatedFilter, type: Related };
export const date = { element: DateFilter, type: Date };
export const checkbox = { element: CheckboxFilter, type: Checkbox };
export const select = { element: SelectFilter, type: Select };
export const multiple = { element: MultipleFilter, type: Multiple };
export const text = { element: TextFilter, type: Text };
