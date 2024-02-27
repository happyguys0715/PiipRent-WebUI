import { Endpoints } from '@webui/models';
import { Models } from '../enums';
import { Model } from './model';

export class SkillWorkTypeModel extends Model {
  override readonly key = Models.SkillWorkType;
  override readonly label = 'Skill Activity';
  override readonly endpoint = Endpoints.SkillWorkTypes;
}
