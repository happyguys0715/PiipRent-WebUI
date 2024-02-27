import {
  BasicFormElement,
  BasicElementTemplateOptions,
} from './basic-form-element';
import { Endpoints } from '@webui/models';

export const Related = 'related';

export interface RelatedElementTemplateOptions
  extends BasicElementTemplateOptions {
  values: string[];
  add?: boolean;
  edit?: boolean;
  delete?: boolean;
  param?: string;
  required: boolean;
  display?: string;
}

export interface Actions {
  add?: boolean;
  edit?: boolean;
  delete?: boolean;
}

export class RelatedElement extends BasicFormElement {
  endpoint: string;
  many?: boolean;
  useOptions?: boolean;
  options?: any[];
  doNotChoice?: boolean;
  searchParam?: string;
  override send?: boolean;
  withoutIdField?: boolean;
  addEndpoint?: string;
  delay?: boolean;
  list?: boolean;

  relatedObjects?: {
    field: string;
    data: any;
    endpoint: string;
  };

  prefilled?: { [key: string]: string };
  query?: { [key: string]: any };

  override templateOptions!: RelatedElementTemplateOptions;

  constructor(key: string, label: string, endpoint: string) {
    super(key, label, Related);

    this.endpoint = endpoint;

    this.templateOptions.values = ['__str__', 'id'];
    this.templateOptions.required = false;
  }

  setRelatedObjects(field: string, data: any, endpoint: string) {
    this.relatedObjects = {
      field,
      data,
      endpoint,
    };

    return this;
  }

  setActions(actions: Actions = {} as Actions) {
    this.templateOptions = { ...this.templateOptions, ...actions };

    return this;
  }

  updateValues(values: string[]) {
    this.templateOptions.values.push(...values);

    return this;
  }

  setPrefilledFields(config: Record<string, string>) {
    this.prefilled = { ...config };

    return this;
  }

  setQuery(query: { [key: string]: any }) {
    this.query = { ...query };

    return this;
  }

  setDelay() {
    this.delay = true;

    return this;
  }

  setList() {
    this.list = true;

    return this;
  }

  setSearchParam(param: string) {
    this.searchParam = param;

    return this;
  }

  setRequired() {
    this.templateOptions.required = true;

    return this;
  }

  setAddEndpoint(endpoint: Endpoints) {
    this.addEndpoint = endpoint;

    return this;
  }

  override updateTemplate(
    config: Partial<RelatedElementTemplateOptions>
  ): this {
    return super.updateTemplate(config);
  }
}
