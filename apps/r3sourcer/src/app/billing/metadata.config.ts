import { payments, smslogs } from '@webui/billing-metadata';
import { Endpoints } from '@webui/models';

export class Metadata {
  [Endpoints.SmsLog] = smslogs;
  [Endpoints.Payments] = payments;
}
