import { BasicListElement } from './basic-list-element';

export const Picture = 'picture';

export class PictureElement extends BasicListElement {
  file?: boolean;
  signature?: boolean;
  image?: boolean;
  avatarType?: boolean;
  display?: string;
  emptyValue?: string;

  constructor(
    field: string,
    config: {
      file?: boolean;
      avatar?: boolean;
      image?: boolean;
      signature?: boolean;
    } = { image: true }
  ) {
    super(field, Picture);

    this.file = config.file;
    this.avatarType = config.avatar;
    this.image = config.image;
    this.signature = config.signature;
  }

  setEmptyValue(value: string) {
    this.emptyValue = value;

    return this;
  }
}
