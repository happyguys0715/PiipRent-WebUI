import { createFilter, Type } from '@webui/metadata';

const list = {
  list: {
    list: 'workflownode',
    label: 'Workflow Node',
    columns: [
      {
        content: [
          {
            endpoint: '/core/workflows/',
            field: 'workflow',
            type: 'related',
          },
        ],
        name: 'workflow',
        sort_field: 'workflow',
        label: 'Workflow',
        sort: true,
      },
      {
        content: [
          {
            endpoint: '/core/companies/',
            field: 'company',
            type: 'related',
          },
        ],
        name: 'company',
        sort_field: 'company',
        label: 'Company',
        sort: true,
      },
      {
        content: [
          {
            field: 'number',
            type: 'input',
          },
        ],
        name: 'number',
        sort_field: 'number',
        label: 'State number',
        sort: true,
      },
      {
        content: [
          {
            field: 'name_before_activation',
            type: 'input',
          },
        ],
        name: 'name_before_activation',
        sort_field: 'name_before_activation',
        label: 'State name before activation',
        sort: true,
      },
      {
        content: [
          {
            field: 'name_after_activation',
            type: 'input',
          },
        ],
        name: 'name_after_activation',
        sort_field: 'name_after_activation',
        label: 'State name after activation',
        sort: true,
      },
      {
        content: [
          {
            field: 'active',
            type: 'checkbox',
          },
        ],
        name: 'active',
        sort_field: 'active',
        label: 'Active',
        sort: true,
      },
      {
        content: [
          {
            field: 'hardlock',
            type: 'checkbox',
          },
        ],
        name: 'hardlock',
        sort_field: 'hardlock',
        label: 'Hardlock',
        sort: true,
      },
    ],
    pagination_label: 'Workflow Node',
    search_enabled: true,
    editDisable: false,
    filters: [
      createFilter(Type.Related, {
        key: 'workflow__model',
        label: 'Model',
        endpoint: '/contenttypes/contenttypes/',
      }),
    ],
  },
  fields: [
    {
      key: 'hardlock',
      default: false,
      type: 'checkbox',
      templateOptions: {
        required: false,
        label: 'Hardlock',
        type: 'checkbox',
      },
      read_only: true,
    },
    {
      key: 'number',
      type: 'input',
      templateOptions: {
        required: true,
        label: 'State number',
        type: 'number',
        min: 0,
        max: 32767,
      },
      read_only: true,
    },
    {
      key: 'active',
      default: true,
      type: 'checkbox',
      templateOptions: {
        required: false,
        label: 'Active',
        type: 'checkbox',
      },
      read_only: true,
    },
    {
      list: false,
      endpoint: '/core/companies/',
      read_only: true,
      hide: true,
      templateOptions: {
        label: 'Company',
        add: true,
        delete: false,
        values: ['__str__'],
        type: 'related',
        edit: true,
      },
      collapsed: false,
      type: 'related',
      key: 'company',
      many: false,
    },
    {
      key: 'name_before_activation',
      type: 'input',
      templateOptions: {
        required: true,
        label: 'State name before activation',
        type: 'text',
        max: 128,
      },
      read_only: true,
    },
    {
      list: false,
      endpoint: '/core/workflows/',
      read_only: true,
      templateOptions: {
        label: 'Workflow',
        add: true,
        delete: false,
        values: ['__str__'],
        type: 'related',
        edit: true,
      },
      collapsed: false,
      type: 'related',
      key: 'workflow',
      many: false,
    },
    {
      key: 'name_after_activation',
      type: 'input',
      templateOptions: {
        required: false,
        label: 'State name after activation',
        type: 'text',
        max: 128,
      },
      read_only: true,
    },
  ],
};

const form = [
  {
    list: false,
    endpoint: '/core/workflows/',
    read_only: false,
    templateOptions: {
      label: 'Workflow',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'workflow',
    many: false,
  },
  {
    key: 'number',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'State number',
      max: 32767,
      type: 'number',
      min: 0,
    },
    read_only: false,
  },
  {
    key: 'name_before_activation',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'State name before activation',
      max: 128,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'name_after_activation',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'State name after activation',
      max: 128,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'rules',
    type: 'rule',
    templateOptions: {
      required: false,
      label: 'Rules',
      type: 'rule',
    },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/core/companies/',
    read_only: true,
    hide: true,
    templateOptions: {
      label: 'Company',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'company',
    many: false,
  },
  {
    key: 'active',
    default: true,
    type: 'checkbox',
    templateOptions: {
      required: false,
      label: 'Active',
      type: 'checkbox',
    },
    read_only: false,
  },
  {
    key: 'hardlock',
    default: false,
    type: 'checkbox',
    templateOptions: {
      required: false,
      label: 'Hardlock',
      type: 'checkbox',
    },
    read_only: false,
  },
];

const formadd = [
  {
    list: false,
    endpoint: '/core/workflows/',
    read_only: false,
    templateOptions: {
      required: true,
      label: 'Workflow',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'workflow',
    many: false,
  },
  {
    key: 'number',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'State number',
      max: 32767,
      type: 'number',
      min: 0,
    },
    read_only: false,
  },
  {
    key: 'name_before_activation',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'State name before activation',
      max: 128,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'name_after_activation',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'State name after activation',
      max: 128,
      type: 'text',
    },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/core/companies/',
    read_only: true,
    hide: true,
    templateOptions: {
      label: 'Company',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    type: 'related',
    key: 'company',
  },
  {
    key: 'active',
    default: true,
    type: 'checkbox',
    templateOptions: {
      required: false,
      label: 'Active',
      type: 'checkbox',
    },
    read_only: false,
  },
];

export const workflownodes = {
  list,
  form,
  formadd,
};
