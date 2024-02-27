import { Basic, IBasic, ID, IRelatedModel, RelatedModel } from './basic';

export enum ENoteContentType {
  TimeSheet = 112,
}

interface INoteFile {
  id: ID;
  file: string;
  __str__: string;
}

export class NoteFile {
  readonly id: ID;
  readonly file: string;
  readonly __str__: string;

  constructor(config: INoteFile) {
    this.id = config.id;
    this.file = config.file;
    this.__str__ = config.__str__;
  }
}

export interface INote extends IBasic {
  content_type?: IRelatedModel;
  object_id: ID;
  note: string;
  contact?: IRelatedModel;
  files?: INoteFile[];
  __str__?: string;
  created_by?: string;
  updated_by?: string;
}

export class Note extends Basic implements INote {
  content_type?: RelatedModel;
  object_id: ID;
  note: string;
  contact?: RelatedModel;
  __str__?: string;
  created_by?: string;
  updated_by?: string;

  constructor(config: INote) {
    super(config);

    this.content_type = config.content_type
      ? new RelatedModel(config.content_type)
      : undefined;
    this.object_id = config.object_id;
    this.note = config.note;
    this.__str__ = config.__str__;
    this.created_by = config.created_by;
    this.updated_by = config.updated_by;
    this.contact = config.contact
      ? new RelatedModel(config.contact)
      : undefined;
  }
}
