import { Time } from '@webui/time';

const list = {
  list: {
    list: 'user',
    label: 'User',
    buttons: [],
    columns: [
      {
        content: [
          {
            endpoint: '/core/contacts/',
            field: 'contact',
            type: 'related',
          },
        ],
        name: 'contact',
        sort_field: 'contact',
        label: 'Contact',
        sort: true,
      },
      {
        content: [
          {
            field: 'contact.email',
            type: 'input',
          },
        ],
        name: 'contact.email',
        sort_field: 'contact.email',
        label: 'E-mail',
        sort: true,
      },
      {
        content: [
          {
            field: 'contact.phone_mobile',
            type: 'input',
          },
        ],
        name: 'contact.phone_mobile',
        sort_field: 'contact.phone_mobile',
        label: 'Mobile Phone',
        sort: true,
      },
      {
        content: [
          {
            field: 'date_joined',
            type: 'datepicker',
          },
        ],
        name: 'date_joined',
        sort_field: 'date_joined',
        label: 'Date joined',
        sort: true,
      },
      {
        content: [
          {
            endpoint: '/auth/{id}/loginas/',
            field: 'id',
            action: 'emptyPost',
            type: 'button',
            label: 'Login as',
            text: 'Login',
            redirect: '/',
            translationKey: 'login.login',
          },
        ],
        name: 'login_as',
        title: null,
        label: 'Login as',
        delim: null,
      },
    ],
    pagination_label: 'User',
    search_enabled: true,
    editDisable: false,
    filters: [
      {
        key: 'role',
        label: 'Type of User',
        options: [
          {
            value: 'candidate',
            label: 'Candidate',
          },
          {
            value: 'client',
            label: 'Client',
          },
          {
            value: 'manager',
            label: 'Manager',
          },
        ],
        query: 'role',
        type: 'select',
      },
    ],
  },
  fields: [
    {
      key: 'id',
      type: 'button',
      templateOptions: {
        action: 'emptyPost',
        label: 'Login as',
        type: 'button',
        text: 'Login',
      },
      read_only: true,
    },
    {
      list: false,
      endpoint: '/core/contacts/',
      read_only: true,
      templateOptions: {
        label: 'Contact',
        add: true,
        delete: false,
        values: ['__str__'],
        type: 'related',
        edit: true,
      },
      collapsed: false,
      type: 'related',
      key: 'contact',
      many: false,
    },
    {
      key: 'date_joined',
      default: '2018-07-04T09:43:21.930065Z',
      type: 'datepicker',
      templateOptions: {
        required: false,
        label: 'Date joined',
        type: 'datetime',
      },
      read_only: true,
    },
    {
      key: 'contact.phone_mobile',
      type: 'input',
      templateOptions: {
        required: false,
        label: 'Mobile Phone',
        type: 'text',
      },
      read_only: true,
    },
    {
      key: 'contact.email',
      type: 'input',
      templateOptions: {
        required: false,
        label: 'E-mail',
        type: 'email',
        max: 255,
      },
      read_only: true,
    },
  ],
};

const form = [
  {
    list: false,
    endpoint: '/core/contacts/',
    read_only: true,
    templateOptions: {
      label: 'Contact',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'contact',
    many: false,
  },
  {
    key: 'date_joined',
    default: '2018-07-04T09:44:49.807046Z',
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'Date joined',
      type: 'datetime',
    },
    read_only: true,
  },
  {
    type: 'row',
    name: 'Password',
    translateKey: 'password',
    children: [
      {
        type: 'related',
        key: 'password',
        value: {
          id: true,
          __str__: '******',
        },
        endpoint: '/core/contacts/{id}/password/',
        editEndpoint: '/core/contacts/{contact.id}/password/',
        send: false,
        doNotChoice: true,
        useValue: true,
        templateOptions: {
          label: 'Password',
          editLabel: 'Change password',
          editDescription:
            'Enter a new password for the user: <b style="color: black; font-weight: bold"> {contact.__str__} </b>', //tslint:disable-line
          edit: true,
        },
      },
      {
        label: 'Auto generate',
        type: 'group',
        translateKey: 'auto_generate',
        children: [
          {
            key: 'by_email',
            default: true,
            templateOptions: {
              required: false,
              label: 'Send to email',
              type: 'checkbox',
            },
            value: true,
            send: false,
            type: 'checkbox',
          },
          {
            key: 'by_phone',
            default: true,
            templateOptions: {
              required: false,
              label: 'Send to mobile phone',
              type: 'checkbox',
            },
            value: true,
            send: false,
            type: 'checkbox',
          },
          {
            type: 'button',
            color: 'primary',
            translationKey: 'send',
            templateOptions: {
              action: 'autoGenerate',
              text: 'send',
              type: 'button',
            },
          },
        ],
      },
    ],
  },
  {
    endpoint: '/company-settings/globalpermissions/',
    templateOptions: {
      label: 'Global Permissions',
      type: 'list',
      text: 'Global Permissions',
    },
    translateKey: 'permissions',
    collapsed: false,
    prefilled: {
      user: '{id}',
    },
    type: 'list',
    query: {
      user: '{id}',
    },
  },
];

const formadd = [
  {
    list: false,
    endpoint: '/core/contacts/',
    read_only: true,
    templateOptions: {
      label: 'Contact',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'contact',
    many: false,
  },
  {
    key: 'date_joined',
    default: Time.now().format(),
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'Date joined',
      type: 'datetime',
    },
    read_only: true,
  },
  {
    endpoint: '/company-settings/globalpermissions/',
    templateOptions: {
      label: 'Global Permissions',
      type: 'list',
      text: 'Global Permissions',
    },
    collapsed: false,
    prefilled: {
      user: '{id}',
    },
    type: 'list',
    query: {
      user: '{id}',
    },
  },
];

export const users = {
  list,
  form,
  formadd,
};
