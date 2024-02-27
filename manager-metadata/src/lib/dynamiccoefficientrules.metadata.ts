const list = {
  list: {
    list: 'dynamiccoefficientrule',
    label: 'Dynamic Coefficient Rule',
    buttons: [],
    columns: [
      {
        content: [{ field: '__str__', type: 'static' }],
        name: '__str__',
        label: 'Dynamic Coefficient Rule',
      },
    ],
    pagination_label: 'Dynamic Coefficient Rule',
    search_enabled: false,
    editDisable: false,
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Dynamic Coefficient Rule',
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
    key: 'priority',
    default: 0,
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Rule Priority',
      max: 32767,
      type: 'number',
      min: 0,
    },
    read_only: false,
  },
  {
    key: 'id',
    type: 'input',
    hide: true,
    templateOptions: { required: false, label: 'Id', type: 'text' },
    read_only: false,
  },
  {
    key: 'rule',
    type: 'static',
    templateOptions: { required: false, label: 'Rule', type: 'static' },
    read_only: true,
  },
  {
    key: 'rule_endpoint',
    type: 'static',
    templateOptions: {
      required: false,
      label: 'Rule endpoint',
      type: 'static',
    },
    read_only: true,
  },
];

const formadd = [
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
    key: 'priority',
    default: 0,
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Rule Priority',
      max: 32767,
      type: 'number',
      min: 0,
    },
    read_only: false,
  },
  {
    key: 'id',
    type: 'input',
    hide: true,
    templateOptions: { required: false, label: 'Id', type: 'text' },
    read_only: false,
  },
  {
    key: 'rule',
    type: 'static',
    templateOptions: { required: false, label: 'Rule', type: 'static' },
    read_only: true,
  },
  {
    key: 'rule_endpoint',
    type: 'static',
    templateOptions: {
      required: false,
      label: 'Rule endpoint',
      type: 'static',
    },
    read_only: true,
  },
];

export const dynamiccoefficientrules = {
  list,
  form,
  formadd,
};
