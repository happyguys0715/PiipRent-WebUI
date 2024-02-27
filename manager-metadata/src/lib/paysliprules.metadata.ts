const list = {
  list: {
    list: 'paysliprule',
    label: 'Payslip Rule',
    columns: [
      {
        content: [{ field: '__str__', type: 'static' }],
        name: '__str__',
        label: 'Payslip Rule',
      },
    ],
    pagination_label: 'Payslip Rule',
    search_enabled: false,
    editDisable: false,
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Payslip Rule',
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
    key: 'period',
    default: 'weekly',
    type: 'select',
    templateOptions: {
      required: false,
      label: 'Period',
      type: 'select',
      options: [
        { value: 'weekly', label: 'Weekly' },
        { value: 'fortnightly', label: 'Fortnightly' },
        { value: 'monthly', label: 'Monthly' },
        { value: 'daily', label: 'Daily' },
      ],
    },
    read_only: false,
  },
  {
    key: 'period_zero_reference',
    default: 1,
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Period zero reference',
      max: 2147483647,
      type: 'number',
      min: -2147483648,
    },
    read_only: false,
  },
  {
    key: 'starting_number',
    default: 1,
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Starting number',
      max: 2147483647,
      type: 'number',
      min: -2147483648,
    },
    read_only: false,
  },
  {
    key: 'comment',
    type: 'textarea',
    templateOptions: { required: false, label: 'Comment', type: 'textarea' },
    read_only: false,
  },
  {
    list: false,
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
    collapsed: false,
    type: 'related',
    key: 'company',
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
    key: 'period',
    default: 'weekly',
    type: 'select',
    templateOptions: {
      required: false,
      label: 'Period',
      type: 'select',
      options: [
        { value: 'weekly', label: 'Weekly' },
        { value: 'fortnightly', label: 'Fortnightly' },
        { value: 'monthly', label: 'Monthly' },
        { value: 'daily', label: 'Daily' },
      ],
    },
    read_only: false,
  },
  {
    key: 'period_zero_reference',
    default: 1,
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Period zero reference',
      max: 2147483647,
      type: 'number',
      min: -2147483648,
    },
    read_only: false,
  },
  {
    key: 'starting_number',
    default: 1,
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Starting number',
      max: 2147483647,
      type: 'number',
      min: -2147483648,
    },
    read_only: false,
  },
  {
    key: 'comment',
    type: 'textarea',
    templateOptions: { required: false, label: 'Comment', type: 'textarea' },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/core/companies/',
    read_only: true,
    templateOptions: {
      required: true,
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
];

export const paysliprules = {
  list,
  form,
  formadd,
};
