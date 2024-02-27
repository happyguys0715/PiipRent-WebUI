import { BasicListElement } from './basic-list-element';

export const Static = 'static';

export class StaticElement extends BasicListElement {
  label?: string;
  hideValue?: any;
  color?: string;
  setColor?: string;
  info?: string;
  description?: string;
  translationKey?: string;
  translated?: boolean;

  constructor(field: string) {
    super(field, Static);
  }

  setLabel(label: string): StaticElement {
    this.label = label;

    return this;
  }

  setHideValue(value: any): StaticElement {
    this.hideValue = value;

    return this;
  }

  changeColor(color: string, setColorIf?: string): StaticElement {
    this.color = color;
    this.setColor = setColorIf;

    return this;
  }

  setInfoText(text: string): StaticElement {
    this.info = text;

    return this;
  }

  setDescriptionStyle(): StaticElement {
    this.description = ' ';

    return this;
  }

  setTranslationKey(key: string): StaticElement {
    this.translationKey = key;

    return this;
  }

  setTranslateKey(key: string): StaticElement {
    this.translateKey = key;

    return this;
  }

  hasTranslate() {
    this.translated = true;

    return this;
  }
}
