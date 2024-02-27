import { Endpoints } from '@webui/models';
import { Models } from '../enums';
import { Model } from './model';

export class SkillModel extends Model {
  override readonly endpoint = Endpoints.Skill;
  override readonly label = 'Skill';
  override readonly key = Models.Skill;
}
