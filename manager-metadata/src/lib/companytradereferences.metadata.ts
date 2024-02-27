const list = {
  list: {
    list: 'companytradereference',
    label: 'Company Trade Reference',
    columns: [
      {
        content: [{ field: '__str__', type: 'static' }],
        name: '__str__',
        label: 'Company Trade Reference',
      },
    ],
    pagination_label: 'Company Trade Reference',
    search_enabled: false,
    editDisable: false,
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Company Trade Reference',
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
    key: 'trade_reference',
    type: 'textarea',
    templateOptions: {
      required: true,
      label: 'Trade Reference',
      type: 'textarea',
    },
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
  {
    key: 'referral_company_name',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Company Name',
      max: 255,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'referral_person_name',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Title, First and Last Name',
      max: 255,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'referral_email',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'E-mail',
      max: 254,
      type: 'email',
    },
    read_only: false,
  },
  {
    key: 'referral_phone',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Phone',
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'email_auth_code',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'E-mail authentication string',
      type: 'text',
    },
    read_only: true,
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
    key: 'trade_reference',
    type: 'textarea',
    templateOptions: {
      required: true,
      label: 'Trade Reference',
      type: 'textarea',
    },
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
  {
    key: 'referral_company_name',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Company Name',
      max: 255,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'referral_person_name',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Title, First and Last Name',
      max: 255,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'referral_email',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'E-mail',
      max: 254,
      type: 'email',
    },
    read_only: false,
  },
  {
    key: 'referral_phone',
    type: 'input',
    templateOptions: { required: true, label: 'Phone', type: 'text' },
    read_only: false,
  },
  {
    key: 'email_auth_code',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'E-mail authentication string',
      type: 'text',
    },
    read_only: true,
  },
];

export const companytradereferences = {
  list,
  form,
  formadd,
};
