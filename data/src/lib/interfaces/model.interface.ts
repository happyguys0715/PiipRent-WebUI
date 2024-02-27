import { RelatedElement } from '@webui/metadata';
import { Endpoints } from '@webui/models';

export type OverrideConfig = {
  key: string;
  label: string;
  model_content_type: string;
  [key: string]: string;
};

export interface IModel {
  readonly key: string;
  readonly label: string;
  readonly endpoint: Endpoints;
  readonly data?: unknown;
  formElement(config?: OverrideConfig): RelatedElement;
}
