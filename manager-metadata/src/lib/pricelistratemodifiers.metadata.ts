import { Endpoints } from '@webui/models';

const list = {
  list: {
    list: 'skillratecoefficientrels',
    label: 'price list rate modifiers',
    columns: [
      {
        content: [{ field: '__str__', type: 'static' }],
        name: '__str__',
        label: 'Proce List Rate Modifiers',
      },
      {
        name: 'actions',
        content: [
          {
            action: 'editForm',
            endpoint: `${Endpoints.PriceListRateModifiers}{id}`,
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
    pagination_label: 'price list rate modifiers',
    search_enabled: false,
    editDisable: false,
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Price List Rate Modifiers',
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
    endpoint: Endpoints.PriceListRate,
    read_only: true,
    templateOptions: {
      label: 'Price List Rate',
      values: ['__str__'],
      type: 'related',
    },
    type: 'related',
    key: 'price_list_rate',
  },
  {
    endpoint: Endpoints.RateCoefficient,
    templateOptions: {
      label: 'Rate coefficient',
      values: ['__str__'],
      type: 'related',
    },
    type: 'related',
    key: 'rate_coefficient',
  },
  {
    endpoint: Endpoints.RateCoefficientModifier,
    templateOptions: {
      label: 'Rate coefficient',
      values: ['__str__'],
      type: 'related',
    },
    query: {
      rate_coefficient: '{rate_coefficient.id}',
    },
    showIf: ['rate_coefficient.id'],
    type: 'related',
    key: 'rate_coefficient_modifier',
  },
];

const formadd = [
  {
    endpoint: Endpoints.PriceListRate,
    read_only: true,
    templateOptions: {
      label: 'Price List Rate',
      values: ['__str__'],
      type: 'related',
    },
    type: 'related',
    key: 'price_list_rate',
  },
  {
    endpoint: Endpoints.RateCoefficient,
    templateOptions: {
      label: 'Rate coefficient',
      values: ['__str__'],
      type: 'related',
    },
    type: 'related',
    key: 'rate_coefficient',
  },
  {
    endpoint: Endpoints.RateCoefficientModifier,
    templateOptions: {
      label: 'Rate coefficient modifier',
      values: ['__str__'],
      type: 'related',
    },
    query: {
      rate_coefficient: '{rate_coefficient.id}',
    },
    showIf: ['rate_coefficient.id'],
    type: 'related',
    key: 'rate_coefficient_modifier',
  },
];

export const priselistratemodifiers = {
  list,
  form,
  formadd,
  formset: list,
};
