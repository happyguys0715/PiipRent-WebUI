import {
  BasicFormElement,
  BasicElementTemplateOptions,
} from './basic-form-element';

export const ImageList = 'image_list';

export type ImageListElementTemplateOptions = BasicElementTemplateOptions;

export class ImageListElement extends BasicFormElement {
  override templateOptions!: ImageListElementTemplateOptions;

  constructor(key: string, label: string) {
    super(key, label, ImageList);
  }
}
