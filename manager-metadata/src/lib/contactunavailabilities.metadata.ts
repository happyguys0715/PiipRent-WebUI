import { createFilter, Type } from '@webui/metadata';
import { Endpoints } from '@webui/models';

const list = {
  list: {
    list: 'contactunavailability',
    label: 'Contact Unavailability',
    columns: [
      {
        content: [{ field: '__str__', type: 'static' }],
        name: '__str__',
        label: 'Contact Unavailability',
      },
    ],
    pagination_label: 'Contact Unavailability',
    search_enabled: false,
    editDisable: false,
    filters: [
      createFilter(Type.Related, {
        key: 'contact',
        label: 'Contact',
        endpoint: Endpoints.Contact,
      }),
    ],
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Contact Unavailability',
        type: 'static',
      },
      read_only: true,
    },
  ],
};

const formset = {
  fields: [
    {
      key: 'unavailable_from',
      read_only: false,
      templateOptions: { required: false, label: 'From', type: 'date' },
      type: 'datepicker',
    },
    {
      key: 'unavailable_until',
      read_only: false,
      templateOptions: { required: false, label: 'Until', type: 'date' },
      type: 'datepicker',
    },
    {
      key: 'id',
      templateOptions: {
        action: 'delete',
        label: '',
        type: 'button',
        text: '',
      },
      type: 'button',
    },
    {
      key: 'notes',
      read_only: false,
      templateOptions: {
        required: false,
        description: 'Unavailability Description',
        label: 'Notes',
        type: 'text',
      },
      type: 'input',
    },
    {
      key: 'updated_at',
      read_only: true,
      templateOptions: {
        required: false,
        label: 'Updated at',
        type: 'datetime',
      },
      type: 'datepicker',
    },
    {
      key: 'created_at',
      read_only: true,
      templateOptions: {
        required: false,
        label: 'Created at',
        type: 'datetime',
      },
      type: 'datepicker',
    },
  ],
  list: {
    columns: [
      {
        name: 'unavailable_from',
        sort: true,
        sort_field: 'unavailable_from',
        content: [{ type: 'datepicker', field: 'unavailable_from' }],
        label: 'From',
      },
      {
        name: 'unavailable_until',
        sort: true,
        sort_field: 'unavailable_until',
        content: [{ type: 'datepicker', field: 'unavailable_until' }],
        label: 'Until',
      },
      {
        name: 'notes',
        sort: true,
        sort_field: 'notes',
        content: [{ type: 'input', field: 'notes' }],
        label: 'Notes',
      },
      {
        name: 'created_at',
        sort: true,
        sort_field: 'created_at',
        content: [{ type: 'datepicker', field: 'created_at' }],
        label: 'Created at',
      },
      {
        name: 'updated_at',
        sort: true,
        sort_field: 'updated_at',
        content: [{ type: 'datepicker', field: 'updated_at' }],
        label: 'Updated at',
      },
      {
        name: 'actions',
        title: null,
        label: 'Actions',
        content: [
          {
            action: 'editForm',
            endpoint: '/core/contactunavailabilities/{id}',
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
        delim: null,
      },
    ],
    list: 'contactunavailability',
    editDisable: false,
    label: 'Contact Unavailability',
    pagination_label: 'Contact Unavailability',
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
    list: false,
    endpoint: '/core/contacts/',
    read_only: true,
    templateOptions: {
      label: 'Contact',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'contact',
    many: false,
  },
  {
    key: 'unavailable_from',
    type: 'datepicker',
    templateOptions: { required: false, label: 'From', type: 'date' },
    read_only: false,
  },
  {
    key: 'unavailable_until',
    type: 'datepicker',
    templateOptions: { required: false, label: 'Until', type: 'date' },
    read_only: false,
  },
  {
    key: 'notes',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Notes',
      type: 'text',
      description: 'Unavailability Description',
    },
    read_only: false,
  },
];

const formadd = [
  {
    list: false,
    endpoint: '/core/contacts/',
    read_only: true,
    templateOptions: {
      required: true,
      label: 'Contact',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'contact',
    many: false,
  },
  {
    key: 'unavailable_from',
    type: 'datepicker',
    templateOptions: { required: false, label: 'From', type: 'date' },
    read_only: false,
  },
  {
    key: 'unavailable_until',
    type: 'datepicker',
    templateOptions: { required: false, label: 'Until', type: 'date' },
    read_only: false,
  },
  {
    key: 'notes',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Notes',
      type: 'text',
      description: 'Unavailability Description',
    },
    read_only: false,
  },
];

const candidatepool = {
  fields: [
    {
      key: 'unavailable_from',
      read_only: false,
      templateOptions: { required: false, label: 'From', type: 'date' },
      type: 'datepicker',
    },
    {
      key: 'unavailable_until',
      read_only: false,
      templateOptions: { required: false, label: 'Until', type: 'date' },
      type: 'datepicker',
    },
    {
      key: 'notes',
      read_only: false,
      templateOptions: {
        required: false,
        description: 'Unavailability Description',
        label: 'Notes',
        type: 'text',
      },
      type: 'input',
    },
    {
      key: 'created_at',
      read_only: true,
      templateOptions: {
        required: false,
        label: 'Created at',
        type: 'datetime',
      },
      type: 'datepicker',
    },
  ],
  list: {
    columns: [
      {
        name: 'unavailable_from',
        sort: true,
        sort_field: 'unavailable_from',
        content: [{ type: 'datepicker', field: 'unavailable_from' }],
        label: 'From',
      },
      {
        name: 'unavailable_until',
        sort: true,
        sort_field: 'unavailable_until',
        content: [{ type: 'datepicker', field: 'unavailable_until' }],
        label: 'Until',
      },
      {
        name: 'notes',
        sort: true,
        sort_field: 'notes',
        content: [{ type: 'input', field: 'notes' }],
        label: 'Notes',
      },
      {
        name: 'created_at',
        sort: true,
        sort_field: 'created_at',
        content: [{ type: 'datepicker', field: 'created_at' }],
        label: 'Created at',
      },
    ],
    list: 'contactunavailability',
    editDisable: true,
    label: 'Contact Unavailability',
    pagination_label: 'Contact Unavailability',
    search_enabled: false,
  },
};

export const contactunavailabilities = {
  list,
  formset,
  form,
  formadd,
  candidatepool,
};
