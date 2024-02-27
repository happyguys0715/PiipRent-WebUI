import { Form } from '@webui/metadata';
import { Endpoints } from '@webui/models';

export const paymentMetadata = [
  new Form.list.element('', Endpoints.Payments, 'payments').withoutAddButton(),
];

export const smsMetadata = [
  new Form.list.element('', Endpoints.SmsLog, 'sms_logs'),
];
