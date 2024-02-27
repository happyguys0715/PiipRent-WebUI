import { createFilter, Type } from '@webui/metadata';

const formset = {
  list: {
    list: 'smslog',
    label: 'SMS log',
    columns: [
      {
        content: [
          {
            field: 'sent_at',
            type: 'datepicker',
          },
        ],
        name: 'sent_at',
        sort_field: 'sent_at',
        label: 'Sent at',
        sort: true,
      },
      {
        content: [
          {
            field: 'sid',
            type: 'textarea',
          },
        ],
        name: 'sid',
        sort_field: 'sid',
        label: 'SID',
        sort: true,
      },
      {
        content: [
          {
            field: 'type',
            type: 'select',
            values: {
              SENT: 'SMS sent',
              RECEIVED: 'SMS received',
            },
          },
        ],
        name: 'type',
        sort_field: 'type',
        label: 'Direction',
        sort: true,
      },
      {
        content: [
          {
            field: 'from_number',
            type: 'input',
          },
        ],
        name: 'from_number',
        sort_field: 'from_number',
        label: 'From number',
        sort: true,
      },
      {
        content: [
          {
            field: 'to_number',
            type: 'input',
          },
        ],
        name: 'to_number',
        sort_field: 'to_number',
        label: 'To number',
        sort: true,
      },
      {
        content: [
          {
            field: 'segments',
            type: 'input',
          },
        ],
        name: 'segments',
        sort_field: 'segments',
        label: 'Number of segments',
        sort: true,
      },
      {
        content: [
          {
            values: {
              ACCEPTED: 'Accepted',
              SENT: 'Sent',
              QUEUED: 'Queued',
              SENDING: 'Sending',
              FAILED: 'Failed',
              DELIVERED: 'Delivered',
              UNDELIVERED: 'Undelivered',
              RECEIVED: 'Received',
            },
            field: 'status',
            type: 'select',
          },
        ],
        name: 'status',
        sort_field: 'status',
        label: 'Status',
        sort: true,
      },
      {
        content: [
          {
            field: 'cost',
            display: '$ {field}',
            type: 'input',
          },
        ],
        name: 'cost',
        label: 'Cost',
      },
    ],
    pagination_label: 'SMS message',
    search_enabled: true,
    editDisable: true,
    buttons: [],
    filters: [
      createFilter(Type.Date, {
        key: 'created_at',
        label: 'Created at',
        yesterday: true,
        today: true,
        week: true,
        month: true,
      }),
      {
        key: 'status',
        label: 'Status',
        options: [
          {
            value: 'ACCEPTED',
            label: 'Accepted',
          },
          {
            value: 'SENT',
            label: 'Sent',
          },
          {
            value: 'QUEUED',
            label: 'Queued',
          },
          {
            value: 'SENDING',
            label: 'Sending',
          },
          {
            value: 'FAILED',
            label: 'Failed',
          },
          {
            value: 'DELIVERED',
            label: 'Delivered',
          },
          {
            value: 'UNDELIVERED',
            label: 'Undelivered',
          },
          {
            value: 'RECEIVED',
            label: 'Received',
          },
        ],
        query: 'status',
        default: null,
        type: 'select',
      },
      {
        key: 'type',
        label: 'Type',
        options: [
          {
            value: 'SENT',
            key: 'sent',
            label: 'SMS sent',
          },
          {
            value: 'RECEIVED',
            key: 'received',
            label: 'SMS received',
          },
        ],
        query: 'type',
        multiple: false,
        default: null,
        type: 'checkbox',
      },
    ],
  },
  fields: [
    {
      key: 'sent_at',
      templateOptions: {
        type: 'datetime',
      },
    },
  ],
};

export const smslogs = {
  formset,
};
