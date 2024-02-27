import { Endpoints } from '@webui/models';
import { Models } from '../enums';
import { OverrideConfig } from '../interfaces';
import { Model } from './model';

export class NoteModel extends Model {
  override readonly key = Models.Note;
  override readonly label = 'Notes';
  override readonly endpoint = Endpoints.Note;
  override readonly translateKey = 'notes';

  formListElement(config: Partial<OverrideConfig>) {
    const { query, model_content_type } = config;

    return super
      ._formListElement({
        ...config,
      })
      .setQuery({
        object_id: '{id}',
      })
      .setMetadataQuery({
        type: query || 'timesheet',
      })
      .setPrefilledFields({
        object_id: '{id}',
        contact: '{session.data.contact.id}',
        content_type: model_content_type
          ? model_content_type
          : '{model_content_type}',
      })
      .useForm();
  }
}
