const list = {
  list: {
    list: 'pricelistratecoefficient',
    label: 'price list rate coefficient',
    columns: [
      {
        content: [{ field: '__str__', type: 'static' }],
        name: '__str__',
        label: 'Price List Rate Coefficient',
      },
    ],
    pagination_label: 'price list rate coefficient',
    search_enabled: false,
    editDisable: false,
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Price List Rate Coefficient',
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
    list: false,
    endpoint: '/pricing/pricelists/',
    read_only: true,
    templateOptions: {
      label: 'Price list',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'price_list',
    many: false,
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
    list: false,
    endpoint: '/pricing/pricelists/',
    read_only: true,
    templateOptions: {
      required: true,
      label: 'Price list',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'price_list',
    many: false,
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
];

export const pricelistratecoefficients = {
  list,
  form,
  formadd,
};
