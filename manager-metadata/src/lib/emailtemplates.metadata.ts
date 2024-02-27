import { createFilter, Form, Type } from '@webui/metadata';
import { Endpoints } from '@webui/models';

const templateFilter = createFilter(Type.Related, {
  endpoint: `${Endpoints.EmailTemplate}slugs/`,
  label: 'Template',
  key: 'slug',
  property: 'slugs',
});

const list = {
  list: {
    list: 'emailtemplates',
    label: 'Email Template',
    columns: [
      {
        content: [
          {
            field: 'name',
            type: 'input',
          },
        ],
        name: 'name',
        label: 'Email Template',
      },
      {
        content: [
          {
            field: 'language.name',
            type: 'input',
          },
        ],
        name: 'language.name',
        label: 'Language',
      },
      {
        content: [
          {
            endpoint: Endpoints.EmailTemplate,
            action: 'createEmailTemplate',
            text: 'Create New',
            type: 'button',
            field: 'id',
            translationKey: 'create_new.label',
          },
        ],
        name: 'actions',
        label: 'Actions',
      },
    ],
    pagination_label: 'Email Template',
    search_enabled: true,
    editDisable: false,
    buttons: [],
    filters: [templateFilter],
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Email Template',
        type: 'static',
      },
      read_only: true,
    },
  ],
};

const form = [
  new Form.row.element().setChildren([
    new Form.group.element().setChildren([
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
        key: 'message_html_template',
        default: '',
        type: 'textarea',
        templateOptions: {
          required: false,
          label: 'HTML template',
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
        key: 'type',
        type: 'select',
        hide: true,
        default: 'email',
        require: true,
        templateOptions: {
          label: 'Type',
          type: 'select',
          options: [
            {
              value: 'email',
              label: 'Email',
            },
          ],
        },
        read_only: false,
      },
      {
        key: 'language',
        type: 'related',
        read_only: true,
        send: false,
        replaceByData: true,
        endpoint: '/companies/{company_id}/languages/',
        templateOptions: {
          label: 'Language',
          display: '{name}',
          param: 'alpha_2',
        },
      },
    ]),

    new Form.group.element().setChildren([
      {
        key: 'legend',
        type: 'legend',
      },
      {
        type: 'button',
        color: 'primary',
        showIf: ['message_html_template'],
        translationKey: 'preview.label',
        templateOptions: {
          action: 'showEmailPreview',
          text: 'preview.label',
          type: 'button',
          small: true,
          icon: 'envelope',
          p: true,
        },
      },
    ]),
  ]),
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
      type: 'text',
    },
  },
  {
    key: 'message_html_template',
    default: '',
    type: 'textarea',
    templateOptions: {
      required: false,
      label: 'HTML template',
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
    default: 'email',
    templateOptions: {
      label: 'Type',
      type: 'select',
      options: [
        {
          value: 'email',
          label: 'Email',
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

export const emailtemplates = {
  list,
  form,
  formadd,
};
