import { ColumnElement } from './column-element';
import { MainElement } from './main-element';

import { StaticElement, Static } from './static-element';
import { TextElement, Text } from './text-element';
import { RelatedElement, Related } from './related-element';
import { ButtonElement, Button } from './button-element';
import { SelectElement, Select } from './select-element';
import { PictureElement, Picture } from './picture-element';
import { InputElement, Input } from './input-element';
import { IconElement, Icon } from './icon-element';
import { InfoElement, Info } from './info-element';
import { LinkElement, Link } from './link-element';
import { CheckboxElement, Checkbox } from './checkbox-element';

export const column = { element: ColumnElement };
export const main = { element: MainElement };

export const stat = { element: StaticElement, type: Static };
export const text = { element: TextElement, type: Text };
export const related = { element: RelatedElement, type: Related };
export const button = { element: ButtonElement, type: Button };
export const select = { element: SelectElement, type: Select };
export const picture = { element: PictureElement, type: Picture };
export const input = { element: InputElement, type: Input };
export const icon = { element: IconElement, type: Icon };
export const info = { element: InfoElement, type: Info };
export const link = { element: LinkElement, type: Link };
export const checkbox = { element: CheckboxElement, type: Checkbox };
