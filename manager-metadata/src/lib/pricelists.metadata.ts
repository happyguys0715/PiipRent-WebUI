import { createFilter, Form, Type } from '@webui/metadata';
import { Endpoints } from '@webui/models';

const list = {
  list: {
    list: 'pricelist',
    label: 'Price List',
    columns: [
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
        delim: null,
        label: 'Valid From',
        sort: true,
        content: [
          {
            field: 'valid_from',
            type: 'datepicker',
          },
        ],
        name: 'valid_from',
        title: null,
        sort_field: 'valid_from',
      },
      {
        delim: null,
        label: 'Valid Until',
        sort: true,
        content: [
          {
            field: 'valid_until',
            type: 'datepicker',
          },
        ],
        name: 'valid_until',
        title: null,
        sort_field: 'valid_until',
      },
      {
        content: [
          {
            field: 'effective',
            type: 'checkbox',
          },
        ],
        name: 'effective',
        sort_field: 'effective',
        label: 'Effective',
        sort: true,
      },
      {
        content: [
          {
            endpoint: '/core/companycontacts/',
            field: 'approved_by',
            type: 'related',
          },
        ],
        name: 'approved_by',
        sort_field: 'approved_by',
        label: 'Approved by',
        sort: true,
      },
      {
        content: [
          {
            field: 'approved_at',
            type: 'datepicker',
          },
        ],
        name: 'approved_at',
        sort_field: 'approved_at',
        label: 'Approved At',
        sort: true,
      },
    ],
    pagination_label: 'Price List',
    search_enabled: false,
    editDisable: false,
    filters: [
      createFilter(Type.Related, {
        key: 'company',
        label: 'Company',
        endpoint: Endpoints.Company,
      }),
    ],
  },
  fields: [
    {
      key: 'approved_at',
      type: 'datepicker',
      templateOptions: {
        label: 'Approved At',
        type: 'datetime',
      },
      read_only: true,
    },
    {
      endpoint: '/core/companies/',
      read_only: true,
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
      key: 'valid_from',
      type: 'datepicker',
      templateOptions: {
        label: 'Valid From',
        type: 'date',
      },
      read_only: true,
    },
    {
      endpoint: '/core/companycontacts/',
      read_only: true,
      templateOptions: {
        label: 'Approved by',
        add: true,
        values: ['__str__'],
        type: 'related',
        edit: true,
      },
      type: 'related',
      key: 'approved_by',
    },
    {
      key: 'effective',
      default: false,
      type: 'checkbox',
      templateOptions: {
        label: 'Effective',
        type: 'checkbox',
      },
      read_only: true,
    },
    {
      key: 'valid_until',
      type: 'datepicker',
      templateOptions: {
        label: 'Valid Until',
        type: 'date',
      },
      read_only: true,
    },
  ],
};

const company = {
  fields: [
    {
      default: false,
      key: 'effective',
      read_only: false,
      templateOptions: {
        label: 'Effective',
        type: 'checkbox',
      },
      type: 'checkbox',
    },
    {
      key: 'valid_until',
      read_only: false,
      templateOptions: {
        label: 'Valid Until',
        type: 'date',
      },
      type: 'datepicker',
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
    {
      key: 'approved_at',
      read_only: false,
      templateOptions: {
        label: 'Approved At',
        type: 'datetime',
      },
      type: 'datepicker',
    },
    {
      key: 'approved_by',
      endpoint: '/core/companycontacts/',
      templateOptions: {
        add: true,
        edit: true,
        values: ['__str__'],
        label: 'Approved by',
        type: 'related',
      },
      read_only: false,
      type: 'related',
    },
    {
      key: 'valid_from',
      read_only: true,
      templateOptions: {
        label: 'Valid From',
        type: 'date',
      },
      type: 'datepicker',
    },
  ],
  list: {
    columns: [
      {
        name: 'valid_from',
        sort_field: 'valid_from',
        title: null,
        sort: true,
        content: [{ type: 'datepicker', field: 'valid_from' }],
        label: 'Valid From',
        delim: null,
      },
      {
        name: 'valid_until',
        sort_field: 'valid_until',
        title: null,
        sort: true,
        content: [{ type: 'datepicker', field: 'valid_until' }],
        label: 'Valid Until',
        delim: null,
      },
      {
        name: 'effective',
        sort: true,
        sort_field: 'effective',
        content: [{ type: 'checkbox', field: 'effective' }],
        label: 'Effective',
      },
      {
        name: 'approved_by',
        sort: true,
        sort_field: 'approved_by',
        content: [
          {
            endpoint: '/core/companycontacts/',
            type: 'related',
            field: 'approved_by',
          },
        ],
        label: 'Approved by',
      },
      {
        name: 'approved_at',
        sort: true,
        sort_field: 'approved_at',
        content: [{ type: 'datepicker', field: 'approved_at' }],
        label: 'Approved At',
      },
      {
        name: 'actions',
        content: [
          {
            action: 'editForm',
            endpoint: '/pricing/pricelists/{id}',
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
    list: 'pricelist',
    editDisable: false,
    label: 'Price List',
    pagination_label: 'Price List',
    search_enabled: false,
  },
};

const form = [
  {
    endpoint: '/core/companies/',
    read_only: true,
    templateOptions: {
      label: 'Company',
      required: true,
      add: true,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    type: 'related',
    key: 'company',
  },
  {
    key: 'valid_from',
    type: 'datepicker',
    templateOptions: {
      required: true,
      hidePreviewError: true,
      label: 'Valid From',
      type: 'date',
    },
    read_only: false,
  },
  {
    key: 'valid_until',
    type: 'datepicker',
    templateOptions: {
      required: true,
      hidePreviewError: true,
      label: 'Valid Until',
      type: 'date',
    },
    read_only: false,
  },
  {
    key: 'effective',
    default: false,
    type: 'checkbox',
    templateOptions: {
      label: 'Effective',
      type: 'checkbox',
    },
    read_only: false,
  },
  {
    endpoint: '/core/companycontacts/',
    read_only: false,
    templateOptions: {
      label: 'Approved by',
      add: true,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    type: 'related',
    key: 'approved_by',
    query: {
      company: '{company.id}',
    },
  },
  {
    key: 'approved_at',
    type: 'datepicker',
    templateOptions: {
      label: 'Approved At',
      type: 'datetime',
    },
    read_only: false,
  },
  new Form.list.element('Price List Rates', Endpoints.PriceListRate)
    .setMetadataQuery({
      editable_type: 'pricelist',
    })
    .setPrefilledFields({
      price_list: '{id}',
      company: '{company.id}',
    })
    .setQuery({
      price_list: '{id}',
    }),
];

const formadd = [
  {
    endpoint: '/core/companies/',
    read_only: true,
    templateOptions: {
      label: 'Company',
      required: true,
      add: true,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    type: 'related',
    key: 'company',
  },
  {
    key: 'valid_from',
    type: 'datepicker',
    templateOptions: {
      required: true,
      hidePreviewError: true,
      label: 'Valid From',
      type: 'date',
    },
    read_only: false,
  },
  {
    key: 'valid_until',
    type: 'datepicker',
    templateOptions: {
      required: true,
      hidePreviewError: true,
      label: 'Valid Until',
      type: 'date',
    },
    read_only: false,
  },
  {
    key: 'effective',
    default: false,
    type: 'checkbox',
    templateOptions: {
      label: 'Effective',
      type: 'checkbox',
    },
    read_only: false,
  },
  {
    endpoint: '/core/companycontacts/',
    read_only: true,
    templateOptions: {
      label: 'Approved by',
      add: true,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    type: 'related',
    key: 'approved_by',
    query: {
      company: '{company.id}',
    },
  },
  {
    key: 'approved_at',
    type: 'datepicker',
    templateOptions: {
      label: 'Approved At',
      type: 'datetime',
    },
    read_only: false,
  },
];

export const pricelists = {
  list,
  company,
  form,
  formadd,
};
