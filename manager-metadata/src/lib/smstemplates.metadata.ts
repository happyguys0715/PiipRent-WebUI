// import { Filter } from '@webui/metadata';

import { Endpoints } from '@webui/models';

// const filters = {
//   language: new Filter.related.element({
//     key: 'language',
//     label: 'Language',
//     endpoint: `${Endpoints.CompanyLanguages}{company}/languages/?language={filter_value}`,
//     parameter: '{language.alpha_2}',
//     display: '{language.name}',
//   })
// }

const list = {
  list: {
    list: 'smstemplate',
    label: 'SMS Template',
    columns: [
      {
        content: [
          {
            field: 'name',
            type: 'input',
          },
        ],
        sort: true,
        sort_field: 'name',
        name: 'name',
        label: 'Sms Template',
      },
      {
        content: [
          {
            field: 'language.name',
            type: 'input',
          },
        ],
        sort: true,
        sort_field: 'language',
        name: 'language.name',
        label: 'Language',
      },
      {
        content: [
          {
            endpoint: Endpoints.SmsTemplate,
            action: 'createSmsTemplate',
            text: 'Create New',
            type: 'button',
            translationKey: 'create_new.label',
            field: 'id',
          },
        ],
        name: 'actions',
        label: 'Actions',
      },
    ],
    pagination_label: 'SMS Template',
    search_enabled: true,
    editDisable: false,
    buttons: [],
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Sms Template',
        type: 'static',
      },
      read_only: true,
    },
  ],
};

const form = [
  {
    key: 'id',
    type: 'input',
    hide: true,
    templateOptions: {
      required: false,
      label: 'Id',
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'updated_at',
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'Updated at',
      type: 'datetime',
    },
    send: false,
    read_only: true,
  },
  {
    key: 'created_at',
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'Created at',
      type: 'datetime',
    },
    send: false,
    read_only: true,
  },
  {
    key: 'name',
    default: '',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Name',
      max: 256,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'slug',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Slug',
      max: 50,
      type: 'text',
    },
    read_only: true,
  },
  {
    key: 'message_text_template',
    default: '',
    type: 'textarea',
    templateOptions: {
      required: false,
      label: 'Text template',
      rows: 7,
    },
    read_only: false,
  },
  {
    key: 'reply_timeout',
    default: 10,
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
    default: 10,
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
    key: 'type',
    type: 'select',
    hide: true,
    templateOptions: {
      required: true,
      label: 'Type',
      type: 'select',
      options: [
        {
          value: 'sms',
          label: 'SMS',
        },
      ],
    },
    read_only: false,
  },
  {
    key: 'language',
    type: 'related',
    read_only: false,
    send: false,
    replaceByData: true,
    endpoint: '/companies/{company_id}/languages/',
    templateOptions: {
      label: 'Language',
      display: '{name}',
      param: 'alpha_2',
      listDisplay: '{language.name}',
      listParam: '{language.alpha_2}',
    },
  },
];

const formadd = [
  {
    key: 'name',
    default: '',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Name',
      max: 256,
      type: 'text',
    },
    read_only: true,
  },
  {
    key: 'slug',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Slug',
      max: 50,
      type: 'text',
    },
    read_only: true,
  },
  {
    key: 'message_text_template',
    default: '',
    type: 'textarea',
    templateOptions: {
      required: false,
      label: 'Text template',
      type: 'text',
    },
  },
  {
    key: 'reply_timeout',
    default: 10,
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
    default: 10,
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
    send: false,
    endpoint: Endpoints.Company,
    hide: true,
    read_only: true,
    templateOptions: {
      label: 'Company',
      values: ['__str__'],
      type: 'related',
    },
    type: 'related',
    key: 'company',
  },
  {
    key: 'type',
    type: 'select',
    hide: true,
    templateOptions: {
      required: true,
      label: 'Type',
      type: 'select',
      options: [
        {
          value: 'sms',
          label: 'SMS',
        },
      ],
    },
    read_only: false,
  },
  {
    key: 'language',
    type: 'related',
    read_only: false,
    send: false,
    replaceByData: true,
    endpoint: '/companies/{company.id}/languages/',
    templateOptions: {
      label: 'Language',
      listDisplay: '{language.name}',
      listParam: '{language.alpha_2}',
    },
  },
];

export const smstemplates = {
  list,
  form,
  formadd,
};
