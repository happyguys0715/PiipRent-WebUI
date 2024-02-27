import { DatepickerType, Form, List } from '@webui/metadata';

const formset = {
  list: new List.main.element('payments', 'Payments')
    .disableSearch()
    .disableEdit()
    .setColumns([
      new List.column.element('payment_type', 'Type')
        .setSort(true, 'type')
        .setContent([
          new List.select.element('type').setValues({
            sms: 'SMS',
            subscription: 'Subscription',
            extra_workers: 'Extra Workers',
            candidate: 'Candidate',
          }),
        ]),

      new List.column.element('amount', 'Amount')
        .setSort(true, 'amount')
        .setContent([
          new List.text.element('amount')
            .setCurrency()
            .setFormatValue('{currency}{field}'),
        ]),

      new List.column.element('status', 'Status')
        .setSort(true, 'status')
        .setContent([
          new List.select.element('status').setValues({
            paid: 'Paid',
            not_paid: 'Not paid',
            open: 'Open',
            void: 'Void',
          }),
        ]),

      new List.column.element('created', 'Created')
        .setSort(true, 'created')
        .setContent([
          {
            type: 'datepicker',
            field: 'created',
          },
        ]),

      new List.column.element('invoice_url', 'Invoice url')
        .setSort(true, 'invoice_url')
        .setWidth(300)
        .setContent([new List.text.element('invoice_url')]),
    ]),
  fields: [new Form.datepicker.element('created', '', DatepickerType.Datetime)],
};

export const payments = {
  formset,
};
