import { createFilter, Type } from '@webui/metadata';
import { Endpoints } from '@webui/models';

const list = {
  fields: [
    {
      many: false,
      key: 'tag',
      endpoint: '/core/tags/',
      collapsed: false,
      list: false,
      templateOptions: {
        add: true,
        delete: false,
        edit: true,
        values: ['__str__', 'owner', 'translation'],
        label: 'Tag',
        type: 'related',
      },
      read_only: true,
      type: 'related',
    },
    {
      many: false,
      key: 'job',
      endpoint: '/hr/jobs/',
      collapsed: false,
      list: false,
      templateOptions: {
        add: true,
        delete: false,
        edit: true,
        values: ['__str__'],
        label: 'Job',
        type: 'related',
      },
      read_only: true,
      type: 'related',
    },
  ],
  list: {
    columns: [
      {
        name: 'job',
        sort: true,
        sort_field: 'job',
        content: [
          {
            endpoint: '/hr/jobs/',
            type: 'related',
            field: 'job',
          },
        ],
        label: 'Job',
      },
      {
        name: 'tag',
        sort: true,
        sort_field: 'tag',
        content: [
          {
            endpoint: '/core/tags/',
            type: 'text',
            field: 'tag',
          },
        ],
        label: 'Tag',
      },
    ],
    filters: [
      createFilter(Type.Related, {
        key: 'job',
        label: 'Job',
        endpoint: Endpoints.Job,
      }),
    ],
    list: 'jobtag',
    editDisable: false,
    label: 'Job Tag',
    pagination_label: 'Job Tag',
    search_enabled: false,
  },
};

const form = [
  {
    hide: true,
    many: false,
    key: 'job',
    endpoint: '/hr/jobs/',
    collapsed: false,
    list: false,
    templateOptions: {
      add: true,
      delete: false,
      edit: true,
      values: ['__str__'],
      label: 'Job',
      type: 'related',
    },
    read_only: true,
    type: 'related',
  },
  {
    many: false,
    key: 'tag',
    endpoint: '/core/tags/',
    collapsed: false,
    list: false,
    templateOptions: {
      add: true,
      delete: false,
      edit: true,
      values: ['__str__', 'owner', 'translation'],
      label: 'Tag',
      type: 'related',
    },
    read_only: false,
    type: 'related',
  },
];

const formadd = [
  {
    hide: true,
    many: false,
    key: 'job',
    endpoint: '/hr/jobs/',
    collapsed: false,
    list: false,
    templateOptions: {
      add: true,
      delete: false,
      edit: true,
      values: ['__str__'],
      label: 'Job',
      type: 'related',
    },
    read_only: true,
    type: 'related',
  },
  {
    many: false,
    key: 'tag',
    endpoint: '/core/tags/',
    collapsed: false,
    list: false,
    templateOptions: {
      add: true,
      delete: false,
      edit: true,
      values: ['__str__', 'owner', 'translation'],
      label: 'Tag',
      type: 'related',
    },
    read_only: false,
    type: 'related',
  },
];

const formset = {
  fields: [
    {
      many: false,
      key: 'tag',
      endpoint: '/core/tags/',
      collapsed: false,
      list: false,
      templateOptions: {
        add: true,
        delete: false,
        edit: true,
        values: ['__str__', 'owner', 'translation'],
        label: 'Tag',
        type: 'related',
      },
      read_only: true,
      type: 'related',
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
        name: 'tag',
        sort: true,
        sort_field: 'tag',
        content: [
          {
            endpoint: '/core/tags/',
            type: 'text',
            field: 'tag',
          },
        ],
        label: 'Tag',
      },
      {
        name: 'actions',
        content: [
          {
            action: 'editForm',
            endpoint: '/hr/jobtags/{id}',
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
        delim: null,
      },
    ],
    list: 'jobtag',
    editDisable: false,
    label: 'Job Tag',
    pagination_label: 'Job Tag',
    search_enabled: false,
  },
};

export const jobtags = {
  list,
  form,
  formadd,
  formset,
};
