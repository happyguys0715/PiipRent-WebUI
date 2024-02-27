import { createFilter, Type } from '@webui/metadata';

const list = {
  list: {
    list: 'smsmessage',
    label: 'SMS message',
    columns: [
      // {
      //   content: [
      //     {
      //       field: 'sid',
      //       type: 'button',
      //       title: '{sid}',
      //       endpoint: '/sms-interface/smsmessages/{id}',
      //       messageType: '{type}',
      //       color: 'link',
      //       customLink: true,
      //       action: 'messageDetail',
      //     },
      //   ],
      //   name: 'sid',
      //   sort_field: 'sid',
      //   label: 'SID',
      //   sort: true,
      // },
      {
        delim: null,
        label: 'Subject',
        sort: true,
        content: [
          {
            field: 'template.__str__',
            type: 'text',
          },
        ],
        name: 'template',
        title: null,
        sort_field: 'template',
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
            field: 'type',
            type: 'select',
          },
        ],
        name: 'type',
        sort_field: 'type',
        label: 'Status',
        sort: true,
      },
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
            field: 'delivered_received_datetime',
            type: 'datepicker',
          },
        ],
        name: 'delivered_received_datetime',
        label: 'Delivered received datetime',
      },
      {
        content: [
          {
            field: 'related',
            type: 'static',
            label: 'Links',
          },
        ],
        name: 'links',
        title: null,
        label: 'Links',
        delim: null,
      },
    ],
    pagination_label: 'SMS message',
    search_enabled: true,
    editDisable: true,
    filters: [
      {
        key: 'type',
        label: 'Type',
        options: [
          {
            value: 'SENT',
            label: 'SMS sent',
          },
          {
            value: 'RECEIVED',
            label: 'SMS received',
          },
        ],
        query: 'type',
        default: null,
        type: 'select',
      },
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
        key: 'template',
        label: 'Template',
        type: 'related',
        data: {
          value: '{name} ({language.name})',
          endpoint: '/sms-interface/smstemplates/',
          key: 'id',
        },
        query: 'template',
      },
      createFilter(Type.Date, {
        key: 'created_at',
        label: 'Created at',
        yesterday: true,
        today: true,
      }),
      createFilter(Type.Checkbox, {
        key: 'check_reply',
        label: 'Check reply status after timeout',
        multiple: true,
        values: [
          {
            key: 'yes',
            value: 'True',
            label: 'Yes',
          },
          {
            key: 'no',
            value: 'False',
            label: 'No',
          },
        ],
      }),
      // {
      //   key: 'check_reply',
      //   label: 'Check reply status after timeout',
      //   options: [
      //     {
      //       value: 'True',
      //       label: 'Yes'
      //     },
      //     {
      //       value: 'False',
      //       label: 'No'
      //     }
      //   ],
      //   query: 'check_reply',
      //   multiple: false,
      //   default: null,
      //   type: 'checkbox'
      // },
    ],
    buttons: [
      {
        action: 'sendSMS',
        label: 'action.send_sms',
      },
    ],
  },
  fields: [
    {
      key: 'template',
      type: 'link',
      templateOptions: {
        label: '',
        type: 'link',
        link: null,
        text: '',
      },
      read_only: true,
    },
    {
      key: 'status',
      type: 'select',
      templateOptions: {
        required: false,
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
        type: 'select',
      },
      read_only: true,
    },
    {
      key: 'delivered_received_datetime',
      type: 'datepicker',
      templateOptions: {
        required: false,
        label: 'Delivered received datetime',
        type: 'datetime',
      },
      read_only: true,
    },
    {
      key: 'sid',
      type: 'button',
      templateOptions: {
        required: false,
        label: 'SID',
        description: 'Twillio Message ID',
      },
      read_only: true,
    },
    {
      key: 'related',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Links',
        type: 'static',
      },
      read_only: true,
    },
    {
      key: 'to_number',
      type: 'input',
      templateOptions: {
        required: true,
        label: 'To number',
        type: 'text',
        max: 25,
      },
      read_only: true,
    },
    {
      key: 'from_number',
      default: '',
      type: 'input',
      templateOptions: {
        required: false,
        label: 'From number',
        type: 'text',
        max: 25,
      },
      read_only: true,
    },
    {
      key: 'sent_at',
      type: 'datepicker',
      templateOptions: {
        required: false,
        label: 'Sent at',
        type: 'datetime',
      },
      read_only: true,
    },
  ],
};

const form = [
  {
    key: 'from_number',
    default: '',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'From number',
      max: 25,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'to_number',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'To number',
      max: 25,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'text',
    type: 'textarea',
    templateOptions: {
      required: false,
      label: 'Text message',
      type: 'textarea',
    },
    read_only: false,
  },
  {
    key: 'type',
    default: 'SENT',
    type: 'select',
    templateOptions: {
      required: false,
      label: 'Type',
      type: 'select',
      options: [
        {
          value: 'SENT',
          label: 'SMS sent',
        },
        {
          value: 'RECEIVED',
          label: 'SMS received',
        },
      ],
    },
    read_only: false,
  },
  {
    key: 'status',
    type: 'select',
    templateOptions: {
      required: false,
      label: 'Status',
      type: 'select',
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
    },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/sms-interface/smstemplates/',
    read_only: true,
    templateOptions: {
      label: 'Template',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'template',
    many: false,
  },
  {
    key: 'sent_at',
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'Sent at',
      type: 'datetime',
    },
    read_only: false,
  },
  {
    key: 'created_at',
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'Created at',
      type: 'datetime',
    },
    read_only: true,
  },
  {
    key: 'reply_timeout',
    default: 4,
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Reply timeout',
      type: 'number',
      min: -2147483648,
      description: 'Minutes',
      max: 2147483647,
    },
    read_only: false,
  },
  {
    key: 'delivery_timeout',
    default: 4,
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Delivery timeout',
      type: 'number',
      min: -2147483648,
      description: 'Minutes',
      max: 2147483647,
    },
    read_only: false,
  },
  {
    key: 'error_message',
    default: '',
    type: 'textarea',
    templateOptions: {
      required: false,
      label: 'Error message',
      type: 'textarea',
    },
    read_only: false,
  },
  {
    list: false,
    endpoint: null,
    read_only: true,
    templateOptions: {
      label: 'Related',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'related',
    many: true,
  },
];

const sent = [
  {
    type: 'input',
    key: 'resend_id',
    hide: true,
    templateOptions: {
      type: 'text',
    },
  },
  {
    type: 'checkbox',
    key: 'has_resend_action',
    hide: true,
    templateOptions: {},
  },
  {
    type: 'row',
    className: 'col row',
    children: [
      {
        type: 'group',
        label: 'From',
        normal: true,
        children: [
          {
            key: 'from.__str__',
            read_only: true,
            type: 'static',
            templateOptions: {
              bottom: true,
            },
          },
          {
            key: 'from_number',
            type: 'input',
            templateOptions: {
              type: 'text',
            },
          },
        ],
      },
      {
        type: 'group',
        label: 'To',
        normal: true,
        children: [
          {
            key: 'to.__str__',
            read_only: true,
            type: 'static',
            templateOptions: {
              bottom: true,
            },
          },
          {
            key: 'to_number',
            type: 'input',
            templateOptions: {
              type: 'text',
            },
          },
        ],
      },
    ],
  },
  {
    key: 'text',
    type: 'textarea',
    templateOptions: {
      label: 'Text of the message',
      type: 'textarea',
      background: true,
    },
  },
  {
    endpoint: '/sms-interface/smstemplates/',
    read_only: true,
    templateOptions: {
      label: 'Template',
      values: ['__str__'],
      indent: true,
    },
    type: 'related',
    key: 'template',
  },
  {
    type: 'row',
    className: 'row col',
    children: [
      {
        key: 'status',
        type: 'select',
        templateOptions: {
          label: 'Status',
          errorDescription: {
            value: 'FAILED',
            error: 'The contact is not available in this moment',
          },
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
        },
      },
      {
        type: 'group',
        width: '.1',
        children: [
          {
            type: 'button',
            color: 'primary',
            showIf: ['has_resend_action'],
            templateOptions: {
              action: 'resend',
              text: 'Resend',
              type: 'button',
            },
          },
        ],
      },
    ],
  },
  {
    key: 'sent_at',
    type: 'datepicker',
    templateOptions: {
      label: 'Sent at',
      type: 'datetime',
    },
  },
  {
    type: 'row',
    className: 'row col',
    children: [
      {
        key: 'delivery_timeout',
        type: 'input',
        templateOptions: {
          label: 'Delivery timeout',
          type: 'number',
          description: 'Minutes',
        },
      },
      {
        key: 'reply_timeout',
        type: 'input',
        templateOptions: {
          label: 'Reply timeout',
          type: 'number',
          description: 'Minutes',
        },
      },
    ],
  },
  {
    endpoint: null,
    read_only: true,
    templateOptions: {
      label: 'Related',
      edit: true,
      values: ['__str__'],
    },
    column: true,
    type: 'related',
    key: 'related',
    many: true,
  },
];

const reply = [
  {
    type: 'row',
    className: 'col row',
    children: [
      {
        type: 'group',
        normal: true,
        label: 'From',
        children: [
          {
            key: 'from.__str__',
            read_only: true,
            type: 'static',
            templateOptions: {
              bottom: true,
            },
          },
          {
            key: 'from_number',
            type: 'input',
            templateOptions: {
              type: 'text',
            },
          },
        ],
      },
      {
        type: 'group',
        normal: true,
        label: 'To',
        children: [
          {
            key: 'to.__str__',
            read_only: true,
            type: 'static',
            templateOptions: {
              bottom: true,
            },
          },
          {
            key: 'to_number',
            type: 'input',
            templateOptions: {
              type: 'text',
            },
          },
        ],
      },
    ],
  },
  {
    key: 'text',
    type: 'textarea',
    templateOptions: {
      label: 'Text of the message',
      type: 'textarea',
      background: true,
    },
  },
  {
    key: 'status',
    type: 'select',
    templateOptions: {
      label: 'Status',
      errorDescription: {
        value: 'FAILED',
        error: 'The contact is not available in this moment',
      },
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
    },
  },
  {
    key: 'sent_at',
    type: 'datepicker',
    templateOptions: {
      label: 'Sent at',
      type: 'datetime',
    },
  },
  {
    endpoint: null,
    read_only: true,
    templateOptions: {
      label: 'Related',
      edit: true,
      values: ['__str__'],
    },
    column: true,
    type: 'related',
    key: 'related',
    many: true,
  },
];

const formadd = [
  {
    key: 'from_number',
    default: '',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'From number',
      max: 25,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'to_number',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'To number',
      max: 25,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'text',
    type: 'textarea',
    templateOptions: {
      required: false,
      label: 'Text message',
      type: 'textarea',
    },
    read_only: false,
  },
  {
    key: 'type',
    default: 'SENT',
    type: 'select',
    templateOptions: {
      required: false,
      label: 'Type',
      type: 'select',
      options: [
        {
          value: 'SENT',
          label: 'SMS sent',
        },
        {
          value: 'RECEIVED',
          label: 'SMS received',
        },
      ],
    },
    read_only: false,
  },
  {
    key: 'status',
    type: 'select',
    templateOptions: {
      required: false,
      label: 'Status',
      type: 'select',
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
    },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/sms-interface/smstemplates/',
    read_only: true,
    templateOptions: {
      label: 'Template',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'template',
    many: false,
  },
  {
    key: 'sent_at',
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'Sent at',
      type: 'datetime',
    },
    read_only: false,
  },
  {
    key: 'created_at',
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'Created at',
      type: 'datetime',
    },
    read_only: true,
  },
  {
    key: 'reply_timeout',
    default: 4,
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Reply timeout',
      type: 'number',
      min: -2147483648,
      description: 'Minutes',
      max: 2147483647,
    },
    read_only: false,
  },
  {
    key: 'delivery_timeout',
    default: 4,
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Delivery timeout',
      type: 'number',
      min: -2147483648,
      description: 'Minutes',
      max: 2147483647,
    },
    read_only: false,
  },
  {
    key: 'error_message',
    default: '',
    type: 'textarea',
    templateOptions: {
      required: false,
      label: 'Error message',
      type: 'textarea',
    },
    read_only: false,
  },
  {
    list: false,
    endpoint: null,
    read_only: true,
    templateOptions: {
      label: 'Related',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'related',
    many: true,
  },
];

export const smsmessages = {
  list,
  form,
  formadd,
  sent,
  reply,
};
