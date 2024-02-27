import { Form } from '@webui/metadata';
import { Endpoints } from '@webui/models';

const list = {
  list: {
    list: 'note',
    label: 'Contact Note',
    buttons: [],
    columns: [
      {
        content: [{ field: '__str__', type: 'static' }],
        name: '__str__',
        label: 'Contact Note',
      },
    ],
    pagination_label: 'Contact Note',
    search_enabled: false,
    editDisable: false,
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Contact Note',
        type: 'static',
      },
      read_only: true,
    },
  ],
};

const formset = {
  fields: [
    {
      key: 'created_by',
      read_only: true,
      templateOptions: { required: false, label: 'Created by', type: 'static' },
      type: 'static',
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
      key: 'note',
      read_only: false,
      templateOptions: { required: false, label: 'Notes', type: 'text' },
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
      key: 'updated_by',
      read_only: true,
      templateOptions: { required: false, label: 'Updated by', type: 'static' },
      type: 'static',
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
        name: 'note',
        sort: true,
        sort_field: 'note',
        content: [{ type: 'input', field: 'note' }],
        label: 'Notes',
      },
      {
        name: 'contact',
        content: [{ type: 'input', field: 'contact.__str__' }],
        label: 'Contact',
      },
      {
        name: 'files',
        content: [{ type: 'imageList', field: 'files' }],
        label: 'Files',
      },
      {
        name: 'created',
        width: 200,
        content: [
          { type: 'datepicker', field: 'created_at' },
          { type: 'static', field: 'created_by' },
        ],
        label: 'Created',
        title: null,
        delim: null,
      },
      {
        name: 'updated',
        width: 200,
        content: [
          { type: 'datepicker', field: 'updated_at' },
          { type: 'static', field: 'updated_by' },
        ],
        label: 'Updated',
        title: null,
        delim: null,
      },
      {
        content: [
          {
            action: 'editForm',
            endpoint: '/core/notes/{id}',
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
        width: 120,
        name: 'actions',
        title: null,
        label: 'Actions',
        showIf: [
          {
            ['contact.id']: '{session.data.contact.id}',
          },
        ],
        delim: null,
      },
    ],
    list: 'note',
    editDisable: false,
    label: 'Contact Note',
    pagination_label: 'Contact Note',
    search_enabled: false,
  },
};

const timesheet = {
  fields: [
    {
      key: 'created_by',
      read_only: true,
      templateOptions: { required: false, label: 'Created by', type: 'static' },
      type: 'static',
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
      key: 'note',
      read_only: false,
      templateOptions: { required: false, label: 'Notes', type: 'text' },
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
      key: 'updated_by',
      read_only: true,
      templateOptions: { required: false, label: 'Updated by', type: 'static' },
      type: 'static',
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
        name: 'note',
        sort: true,
        sort_field: 'note',
        content: [{ type: 'input', field: 'note' }],
        label: 'Notes',
      },
      {
        name: 'contact',
        content: [{ type: 'input', field: 'contact.__str__' }],
        label: 'Contact',
      },
      {
        name: 'files',
        content: [{ type: 'imageList', field: 'files' }],
        label: 'Files',
      },
      {
        name: 'created',
        width: 200,
        content: [{ type: 'datepicker', field: 'created_at' }],
        label: 'Created',
        title: null,
        delim: null,
      },
      {
        content: [
          {
            action: 'editForm',
            endpoint: '/core/notes/{id}',
            icon: 'fa-pencil-alt',
            title: 'Edit',
            text_color: '#f0ad4e',
            type: 'button',
            field: 'id',
            showIf: [
              {
                ['contact.id']: '{session.data.contact.id}',
              },
            ],
          },
          {
            action: 'delete',
            icon: 'fa-times-circle',
            title: 'Delete',
            text_color: '#f32700',
            type: 'button',
            field: 'id',
            showIf: [
              {
                ['contact.id']: '{session.data.contact.id}',
              },
            ],
          },
        ],
        width: 120,
        name: 'actions',
        title: null,
        label: 'Actions',
        delim: null,
      },
    ],
    list: 'note',
    editDisable: false,
    label: 'Contact Note',
    pagination_label: 'Contact Note',
    search_enabled: false,
  },
};

const form = [
  {
    endpoint: '/contenttypes/contenttypes/',
    read_only: true,
    hide: true,
    templateOptions: {
      label: 'Content type',
      values: ['__str__'],
    },
    type: 'related',
    key: 'content_type',
  },
  {
    key: 'object_id',
    type: 'input',
    hide: true,
    templateOptions: { required: true, label: 'Object id', type: 'text' },
    read_only: false,
  },
  {
    key: 'contact',
    type: 'related',
    endpoint: Endpoints.Contact,
    templateOptions: {
      required: false,
      label: 'Contact',
      type: 'related',
    },
    read_only: true,
  },
  new Form.row.element().setChildren([
    new Form.group.element()
      .doNotShowLabel()
      .setChildren([new Form.textarea.element('note', 'Notes').setRows(5)]),
    new Form.group.element()
      .doNotShowLabel()
      .setChildren([new Form.imageList.element('files', 'Images').doNotSend()]),
  ]),
];

const formadd = [
  {
    endpoint: '/contenttypes/contenttypes/',
    read_only: true,
    hide: true,
    templateOptions: {
      label: 'Content type',
      values: ['__str__'],
    },
    type: 'related',
    key: 'content_type',
  },
  {
    key: 'object_id',
    type: 'input',
    hide: true,
    templateOptions: {
      required: true,
      label: 'Object id',
      type: 'text',
    },
    read_only: false,
  },
  new Form.related.element('contact', 'Contact', Endpoints.Contact)
    .setDefaultValue('{session.data.contact.id}')
    .readOnly(),
  new Form.row.element().setChildren([
    new Form.group.element(' ')
      .doNotShowLabel()
      .setChildren([
        new Form.textarea.element('note', 'Notes')
          .setRows(5)
          .setFullWidth()
          .setAutofocus(),
      ]),
    new Form.group.element(' ')
      .doNotShowLabel()
      .setChildren([new Form.imageList.element('files', 'Images').doNotSend()]),
  ]),
];

const candidatepool = {
  fields: [
    {
      key: 'created_by',
      read_only: true,
      templateOptions: { required: false, label: 'Created by', type: 'static' },
      type: 'static',
    },
    {
      key: 'note',
      read_only: false,
      templateOptions: { required: false, label: 'Notes', type: 'text' },
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
        name: 'note',
        sort: true,
        sort_field: 'note',
        content: [{ type: 'input', field: 'note' }],
        label: 'Notes',
      },
      {
        name: 'created',
        content: [{ type: 'datepicker', field: 'created_at' }],
        label: 'Created',
        title: null,
        delim: null,
      },
    ],
    list: 'note',
    editDisable: true,
    label: 'Contact Note',
    pagination_label: 'Contact Note',
    search_enabled: false,
  },
};

export const notes = {
  list,
  formset,
  form,
  formadd,
  candidatepool,
  timesheet,
};
