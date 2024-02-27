// const statuses = {
//   ['ACCEPTED']: 'Accepted',
//   ['SENT']: 'Sent',
//   ['QUEUED']: 'Queued',
//   ['SENDING']: 'Sending',
//   ['FAILED']: 'Failed',
//   ['DELIVERED']: 'Delivered',
//   ['UNDELIVERED']: 'Undelivered',
//   ['RECEIVED']: 'Received',
// };

// const smsTypes = {
//   ['SENT']: 'SMS sent',
//   ['RECEIVED']: 'SMS received',
// };

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
        width: 140,
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
        width: 140,
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
        width: 120,
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
        width: 120,
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
            currency: true,
          },
        ],
        width: 60,
        name: 'cost',
        label: 'Cost',
        sort: true,
      },
    ],
    pagination_label: 'SMS message',
    search_enabled: false,
    editDisable: true,
    buttons: [],
    // filters: [
    //   createFilter(Type.Date, {
    //     key: 'created_at',
    //     label: 'Created at',
    //     yesterday: true,
    //     today: true,
    //     week: true,
    //     month: true
    //   }),
    //   createFilter(Type.Select, {
    //     key: 'status',
    //     label: 'Status',
    //     values: generateOptions(statuses)
    //   }),
    //   createFilter(Type.Checkbox, {
    //     key: 'type',
    //     label: 'Type',
    //     values: generateOptions(smsTypes)
    //   })
    // ]
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
