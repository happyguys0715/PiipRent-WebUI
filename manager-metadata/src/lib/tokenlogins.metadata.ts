const list = {
  list: {
    columns: [
      {
        name: '__str__',
        content: [
          {
            field: '__str__',
            type: 'static',
          },
        ],
        label: 'Token Login',
      },
    ],
    search_enabled: false,
    editDisable: false,
    list: 'tokenlogin',
    pagination_label: 'Token Login',
    label: 'Token Login',
  },
  fields: [
    {
      read_only: true,
      templateOptions: {
        required: false,
        label: 'Token Login',
        type: 'static',
      },
      key: '__str__',
      type: 'static',
    },
  ],
};

const form = [
  {
    read_only: false,
    templateOptions: {
      required: false,
      label: 'Id',
      type: 'text',
    },
    hide: true,
    key: 'id',
    type: 'input',
  },
  {
    read_only: true,
    templateOptions: {
      required: false,
      label: 'Updated at',
      type: 'datetime',
    },
    key: 'updated_at',
    type: 'datepicker',
  },
  {
    read_only: true,
    templateOptions: {
      required: false,
      label: 'Created at',
      type: 'datetime',
    },
    key: 'created_at',
    type: 'datepicker',
  },
  {
    key: 'contact',
    collapsed: false,
    endpoint: '/core/contacts/',
    read_only: true,
    templateOptions: {
      edit: true,
      add: true,
      delete: false,
      values: ['__str__'],
      label: 'Contact',
      type: 'related',
    },
    list: false,
    many: false,
    type: 'related',
  },
  {
    read_only: true,
    templateOptions: {
      required: true,
      label: 'Auth Token',
      max: 32,
      type: 'text',
    },
    key: 'auth_token',
    type: 'input',
  },
  {
    read_only: true,
    templateOptions: {
      required: false,
      label: 'Logged in at',
      type: 'datetime',
    },
    key: 'loggedin_at',
    type: 'datepicker',
  },
  {
    read_only: true,
    default: '/',
    templateOptions: {
      required: false,
      label: 'Redirect Url',
      max: 127,
      type: 'text',
    },
    key: 'redirect_to',
    type: 'input',
  },
  {
    read_only: true,
    default: 0,
    templateOptions: {
      options: [
        {
          value: 0,
          label: 'SMS',
        },
        {
          value: 1,
          label: 'E-mail',
        },
      ],
      required: false,
      label: 'Token type',
      type: 'select',
    },
    key: 'type',
    type: 'select',
  },
];

const formadd = [
  {
    read_only: false,
    templateOptions: {
      required: false,
      label: 'Id',
      type: 'text',
    },
    hide: true,
    key: 'id',
    type: 'input',
  },
  {
    read_only: true,
    templateOptions: {
      required: false,
      label: 'Updated at',
      type: 'datetime',
    },
    key: 'updated_at',
    type: 'datepicker',
  },
  {
    read_only: true,
    templateOptions: {
      required: false,
      label: 'Created at',
      type: 'datetime',
    },
    key: 'created_at',
    type: 'datepicker',
  },
  {
    key: 'contact',
    collapsed: false,
    endpoint: '/core/contacts/',
    read_only: true,
    templateOptions: {
      edit: true,
      add: true,
      delete: false,
      values: ['__str__'],
      label: 'Contact',
      type: 'related',
    },
    list: false,
    many: false,
    type: 'related',
  },
  {
    read_only: false,
    templateOptions: {
      required: true,
      label: 'Auth Token',
      max: 32,
      type: 'text',
    },
    key: 'auth_token',
    type: 'input',
  },
  {
    read_only: false,
    templateOptions: {
      required: false,
      label: 'Logged in at',
      type: 'datetime',
    },
    key: 'loggedin_at',
    type: 'datepicker',
  },
  {
    read_only: false,
    default: '/',
    templateOptions: {
      required: false,
      label: 'Redirect Url',
      max: 127,
      type: 'text',
    },
    key: 'redirect_to',
    type: 'input',
  },
  {
    read_only: false,
    default: 0,
    templateOptions: {
      options: [
        {
          value: 0,
          label: 'SMS',
        },
        {
          value: 1,
          label: 'E-mail',
        },
      ],
      required: false,
      label: 'Token type',
      type: 'select',
    },
    key: 'type',
    type: 'select',
  },
];

export const tokenlogins = {
  list,
  form,
  formadd,
};
