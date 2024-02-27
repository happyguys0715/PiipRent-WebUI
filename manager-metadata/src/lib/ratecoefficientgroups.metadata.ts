const list = {
  list: {
    list: 'ratecoefficientgroup',
    label: 'Rate Coefficient Group',
    columns: [
      {
        content: [{ field: '__str__', type: 'static' }],
        name: '__str__',
        label: 'Rate Coefficient Group',
      },
    ],
    pagination_label: 'Rate Coefficient Group',
    search_enabled: false,
    editDisable: false,
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Rate Coefficient Group',
        type: 'static',
      },
      read_only: true,
    },
  ],
};

const form = [
  {
    list: false,
    endpoint: '/pricing/ratecoefficients/',
    read_only: true,
    templateOptions: {
      label: 'Rate coefficients',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'rate_coefficients',
    many: true,
  },
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
    key: 'name',
    type: 'input',
    templateOptions: { required: true, label: 'Name', max: 255, type: 'text' },
    read_only: false,
  },
];

const formadd = [
  {
    list: false,
    endpoint: '/pricing/ratecoefficients/',
    read_only: true,
    templateOptions: {
      label: 'Rate coefficients',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'rate_coefficients',
    many: true,
  },
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
    key: 'name',
    type: 'input',
    templateOptions: { required: true, label: 'Name', max: 255, type: 'text' },
    read_only: false,
  },
];

export const ratecoefficientgroups = {
  list,
  form,
  formadd,
};
