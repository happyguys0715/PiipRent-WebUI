import { checkAndReturnTranslation, getStorageLang } from '@webui/utilities';

export interface IRelatedObject {
  id?: string;
  __str__?: string;

  [key: string]: any;
}

export class DropdownOption {
  public id: string;
  public extraFields: { [key: string]: any };

  static fromRelatedObject(object: IRelatedObject): DropdownOption {
    const { id, ...rest } = object;

    return new DropdownOption(id, rest);
  }

  constructor(value = '', extraFields: { [key: string]: any }) {
    this.id = value;
    this.extraFields = extraFields;
  }

  public get label(): string {
    return checkAndReturnTranslation(this.extraFields, 'EN', getStorageLang());
  }

  public get __str__(): string {
    return checkAndReturnTranslation(this.extraFields, 'EN', getStorageLang());
  }

  public getField(name: string): any {
    if (!this.extraFields) {
      return undefined;
    }

    return this.extraFields[name];
  }
}

interface IDropdownPayload {
  fetching: boolean;
  results: DropdownOption[] | undefined;
  error: string | null;
}

export class DropdownPayload implements IDropdownPayload {
  fetching: boolean;
  results: DropdownOption[] | undefined;
  error: string | null;

  constructor(config: IDropdownPayload) {
    this.results = config.results;
    this.fetching = config.fetching;
    this.error = config.error || '';
  }

  static initialState() {
    return new DropdownPayload({
      fetching: true,
      results: undefined,
      error: null,
    });
  }

  static downloadMoreState(results: DropdownOption[]) {
    return new DropdownPayload({
      fetching: true,
      results,
      error: null,
    });
  }

  static successState(results: DropdownOption[]) {
    return new DropdownPayload({
      fetching: false,
      results,
      error: null,
    });
  }

  static errorState(error: string) {
    return new DropdownPayload({
      fetching: false,
      results: undefined,
      error,
    });
  }
}
