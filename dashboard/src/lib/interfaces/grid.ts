import { UserWidget } from './user-widget';

export enum GridElementType {
  Row,
  Column,
  Widget,
}

export interface GridElement {
  type: GridElementType;
  id?: string;
  widget?: UserWidget;
  elements?: GridElement[];
}
