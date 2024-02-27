const list = {
  list: {
    list: 'payslipline',
    label: 'Payslip Line',
    columns: [
      {
        content: [{ field: '__str__', type: 'static' }],
        name: '__str__',
        label: 'Payslip Line',
      },
    ],
    pagination_label: 'Payslip Line',
    search_enabled: false,
    editDisable: false,
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Payslip Line',
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
    templateOptions: {
      required: false,
      label: 'Id',
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'updated_at',
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'Updated at',
      type: 'datetime',
    },
    read_only: true,
  },
  {
    key: 'created_at',
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'Created at',
      type: 'datetime',
    },
    read_only: true,
  },
  {
    key: 'description',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Description',
      max: 255,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'hours',
    default: 0,
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Hours',
      type: 'number',
    },
    read_only: false,
  },
  {
    key: 'calc_rate',
    default: 0,
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Calc. Rate',
      type: 'number',
    },
    read_only: false,
  },
  {
    key: 'amount',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Amount',
      type: 'number',
    },
    read_only: false,
  },
  {
    key: 'ytd',
    default: 0,
    type: 'input',
    templateOptions: {
      required: false,
      label: 'YTD',
      type: 'number',
    },
    read_only: false,
  },
  {
    key: 'type',
    type: 'select',
    templateOptions: {
      required: true,
      label: 'Type',
      type: 'select',
      options: [
        {
          value: 0,
          label: 'Wages',
        },
        {
          value: 1,
          label: 'Tax',
        },
        {
          value: 2,
          label: 'Superannuation Expenses',
        },
      ],
    },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/hr/payslips/',
    read_only: true,
    templateOptions: {
      label: 'Payslip',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'payslip',
    many: false,
  },
];

const formadd = [
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
    key: 'description',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Description',
      max: 255,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'hours',
    default: 0,
    type: 'input',
    templateOptions: { required: false, label: 'Hours', type: 'number' },
    read_only: false,
  },
  {
    key: 'calc_rate',
    default: 0,
    type: 'input',
    templateOptions: { required: false, label: 'Calc. Rate', type: 'number' },
    read_only: false,
  },
  {
    key: 'amount',
    type: 'input',
    templateOptions: { required: true, label: 'Amount', type: 'number' },
    read_only: false,
  },
  {
    key: 'ytd',
    default: 0,
    type: 'input',
    templateOptions: { required: false, label: 'YTD', type: 'number' },
    read_only: false,
  },
  {
    key: 'type',
    type: 'select',
    templateOptions: {
      required: true,
      label: 'Type',
      type: 'select',
      options: [
        { value: 0, label: 'Wages' },
        { value: 1, label: 'Tax' },
        { value: 2, label: 'Superannuation Expenses' },
      ],
    },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/hr/payslips/',
    read_only: true,
    templateOptions: {
      label: 'Payslip',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'payslip',
    many: false,
  },
];

export const paysliplines = {
  list,
  form,
  formadd,
};
