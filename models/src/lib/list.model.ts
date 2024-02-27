let counter = 0;

export enum ListEvent {
  Initialized,
  Loading,
}

export class List {
  private _id = counter++;
  get id() {
    return this._id;
  }
}

export enum Pagination {
  On = 'on',
  Off = 'off',
}
