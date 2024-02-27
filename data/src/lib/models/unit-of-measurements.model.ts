import { Endpoints } from '@webui/models';
import { Models } from '../enums';
import { Model } from './model';

export class UnitOfMeasurementsModel extends Model {
  override readonly endpoint = Endpoints.UnitOfMeasurements;
  override readonly label = 'Unit of measurements';
  override readonly key = Models.UnitOfMeasurements;
}
