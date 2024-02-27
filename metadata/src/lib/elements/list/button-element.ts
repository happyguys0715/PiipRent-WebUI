import { BasicListElement } from './basic-list-element';

export const Button = 'button';

export class ButtonElement extends BasicListElement {
  action: string;
  endpoint?: string;

  customLink?: boolean;
  image?: string;
  noDelim?: boolean;
  title?: string;
  fields?: any[];
  icon?: string;
  text_color?: string;
  hidden?: string;

  color?: string;
  svg?: string;
  shadow?: boolean;
  replace_by?: string;
  translationKey?: string;

  constructor(field: string, action: string, title?: string) {
    super(field, Button);

    this.action = action;
    this.title = title;
  }

  setCustomLink(image?: string): ButtonElement {
    this.customLink = true;

    if (image) {
      this.image = image;
    }

    return this;
  }

  setEndpoint(endpoint: string): ButtonElement {
    this.endpoint = endpoint;

    return this;
  }

  withoutDelim(): ButtonElement {
    this.noDelim = true;

    return this;
  }

  setFields(fields: any[]): ButtonElement {
    this.fields = fields;

    return this;
  }

  setIcon(icon: string): ButtonElement {
    this.icon = `fa-${icon}`;

    return this;
  }

  setTextColor(color: string): ButtonElement {
    this.text_color = color;

    return this;
  }

  setHidden(value: string): ButtonElement {
    this.hidden = value;

    return this;
  }

  customButton(color: string, svgName: string): ButtonElement {
    this.color = color;
    this.svg = svgName;
    this.shadow = true;

    return this;
  }

  addReplaceBy(field: string): ButtonElement {
    this.replace_by = field;

    return this;
  }

  setTranslationKey(key: string): ButtonElement {
    this.translationKey = key;

    return this;
  }
}
