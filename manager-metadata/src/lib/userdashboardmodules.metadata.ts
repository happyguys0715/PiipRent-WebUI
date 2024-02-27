const list = {
  list: {
    list: 'userdashboardmodule',
    label: 'User dashboard module',
    columns: [
      {
        content: [
          {
            field: '__str__',
            type: 'static',
          },
        ],
        name: '__str__',
        label: 'User Dashboard Module',
      },
    ],
    pagination_label: 'User dashboard module',
    search_enabled: false,
    editDisable: false,
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'User Dashboard Module',
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
    list: false,
    endpoint: '/core/companycontacts/',
    read_only: true,
    templateOptions: {
      label: 'Company contact',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    type: 'related',
    key: 'company_contact',
    many: false,
  },
  {
    list: false,
    endpoint: '/core/dashboardmodules/',
    read_only: true,
    templateOptions: {
      label: 'Dashboard module',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'dashboard_module',
    many: false,
  },
  {
    key: 'position',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Position',
      type: 'number',
      min: 0,
      description: 'would be used for ordering',
      max: 2147483647,
    },
    read_only: false,
  },
  {
    key: 'ui_config',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'UI config',
      type: 'text',
    },
    read_only: false,
  },
];

const formadd = [
  {
    list: false,
    endpoint: '/core/companycontacts/',
    read_only: true,
    templateOptions: {
      required: true,
      label: 'Company contact',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'company_contact',
    many: false,
  },
  {
    list: false,
    endpoint: '/core/dashboardmodules/',
    read_only: true,
    templateOptions: {
      required: true,
      label: 'Dashboard module',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'dashboard_module',
    many: false,
  },
  {
    key: 'position',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Position',
      type: 'number',
      min: 0,
      description: 'would be used for ordering',
      max: 2147483647,
    },
    read_only: false,
  },
  {
    key: 'ui_config',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'UI config',
      type: 'text',
    },
    read_only: false,
  },
];

export const userdashboardmodules = {
  list,
  form,
  formadd,
};
