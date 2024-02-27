import { createFilter, Type } from '@webui/metadata';
import { Endpoints } from '@webui/models';

const list = {
  list: {
    list: 'ratecoefficientmodifier',
    label: 'Rate Coefficient Modifier',
    columns: [
      {
        content: [{ field: '__str__', type: 'static' }],
        name: '__str__',
        label: 'Rate Coefficient Modifier',
      },
    ],
    pagination_label: 'Rate Coefficient Modifier',
    search_enabled: false,
    editDisable: false,
    filters: [
      createFilter(Type.Related, {
        key: 'rate_coefficient',
        label: 'Rate coefficient',
        endpoint: Endpoints.RateCoefficient,
      }),
      {
        key: 'type',
        label: 'Type',
        options: [
          { value: 0, label: 'Company' },
          { value: 1, label: 'Candidate' },
        ],
        query: 'type',
        default: null,
        type: 'select',
      },
    ],
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Rate Coefficient Modifier',
        type: 'static',
      },
      read_only: true,
    },
  ],
};

const formset = {
  fields: [
    {
      default: 0,
      key: 'fixed_addition',
      read_only: false,
      templateOptions: {
        required: false,
        description: 'adds after multiplying when set',
        label: 'Fixed Addition',
        type: 'number',
      },
      type: 'input',
    },
    {
      default: 0,
      key: 'fixed_override',
      read_only: false,
      templateOptions: {
        required: false,
        label: 'Fixed Rate Override',
        type: 'number',
      },
      type: 'input',
    },
    {
      default: 1.0,
      key: 'multiplier',
      read_only: false,
      templateOptions: {
        required: false,
        description: '1.00 = none',
        label: 'Multiplier',
        type: 'number',
      },
      type: 'input',
    },
    {
      key: 'id',
      templateOptions: {
        action: 'editForm',
        label: '',
        type: 'button',
        text: '',
      },
      type: 'button',
    },
  ],
  list: {
    columns: [
      {
        name: 'multiplier',
        sort: true,
        sort_field: 'multiplier',
        content: [{ type: 'input', field: 'multiplier' }],
        label: 'Multiplier',
      },
      {
        name: 'fixed_addition',
        sort: true,
        sort_field: 'fixed_addition',
        content: [{ type: 'input', field: 'fixed_addition' }],
        label: 'Fixed Addition',
      },
      {
        name: 'fixed_override',
        sort: true,
        sort_field: 'fixed_override',
        content: [{ type: 'input', field: 'fixed_override' }],
        label: 'Fixed Rate Override',
      },
      {
        name: 'actions',
        content: [
          {
            action: 'editForm',
            endpoint: '/pricing/ratecoefficientmodifiers/{id}',
            icon: 'fa-pencil-alt',
            title: 'Edit',
            text_color: '#f0ad4e',
            type: 'button',
            field: 'id',
          },
          {
            action: 'delete',
            icon: 'fa-times-circle',
            title: 'Delete',
            text_color: '#f32700',
            type: 'button',
            field: 'id',
          },
        ],
        label: 'Actions',
        title: null,
        delim: ' ',
      },
    ],
    list: 'ratecoefficientmodifier',
    editDisable: false,
    label: 'Rate Coefficient Modifier',
    pagination_label: 'Rate Coefficient Modifier',
    search_enabled: false,
  },
};

const form = [
  {
    key: 'id',
    type: 'input',
    hide: true,
    templateOptions: { required: false, label: 'Id', type: 'text' },
    read_only: false,
  },
  {
    key: 'updated_at',
    type: 'datepicker',
    templateOptions: { required: false, label: 'Updated at', type: 'datetime' },
    read_only: true,
  },
  {
    key: 'created_at',
    type: 'datepicker',
    templateOptions: { required: false, label: 'Created at', type: 'datetime' },
    read_only: true,
  },
  {
    key: 'type',
    type: 'select',
    templateOptions: {
      required: true,
      label: 'Type',
      type: 'select',
      options: [
        { value: 0, label: 'Company' },
        { value: 1, label: 'Candidate' },
      ],
    },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/pricing/ratecoefficients/',
    read_only: true,
    templateOptions: {
      label: 'Rate coefficient',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'rate_coefficient',
    many: false,
  },
  {
    key: 'multiplier',
    default: 1.0,
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Multiplier',
      type: 'number',
      description: '1.00 = none',
    },
    read_only: false,
  },
  {
    key: 'fixed_addition',
    default: 0,
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Fixed Addition',
      type: 'number',
      description: 'adds after multiplying when set',
    },
    read_only: false,
  },
  {
    key: 'fixed_override',
    default: 0,
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Fixed Rate Override',
      type: 'number',
    },
    read_only: false,
  },
];

const formadd = [
  {
    key: 'updated_at',
    type: 'datepicker',
    templateOptions: { required: false, label: 'Updated at', type: 'datetime' },
    read_only: true,
  },
  {
    key: 'created_at',
    type: 'datepicker',
    templateOptions: { required: false, label: 'Created at', type: 'datetime' },
    read_only: true,
  },
  {
    key: 'type',
    type: 'select',
    templateOptions: {
      required: true,
      label: 'Type',
      type: 'select',
      options: [
        { value: 0, label: 'Company' },
        { value: 1, label: 'Candidate' },
      ],
    },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/pricing/ratecoefficients/',
    read_only: true,
    templateOptions: {
      required: true,
      label: 'Rate coefficient',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'rate_coefficient',
    many: false,
  },
  {
    key: 'multiplier',
    default: 1.0,
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Multiplier',
      type: 'number',
      description: '1.00 = none',
    },
    read_only: false,
  },
  {
    key: 'fixed_addition',
    default: 0,
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Fixed Addition',
      type: 'number',
      description: 'adds after multiplying when set',
    },
    read_only: false,
  },
  {
    key: 'fixed_override',
    default: 0,
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Fixed Rate Override',
      type: 'number',
    },
    read_only: false,
  },
];

export const ratecoefficientmodifiers = {
  list,
  formset,
  form,
  formadd,
};
