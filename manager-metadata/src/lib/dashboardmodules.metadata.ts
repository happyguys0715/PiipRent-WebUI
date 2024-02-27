const list = {
  list: {
    list: 'dashboardmodule',
    label: 'Dashboard module',
    columns: [
      {
        content: [
          {
            field: '__str__',
            type: 'static',
          },
        ],
        name: '__str__',
        label: 'Dashboard Module',
      },
    ],
    pagination_label: 'Dashboard module',
    search_enabled: false,
    editDisable: false,
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Dashboard Module',
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
    endpoint: '/contenttypes/contenttypes/',
    read_only: true,
    templateOptions: {
      label: 'Content type',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'content_type',
    many: false,
  },
  {
    key: 'module_data',
    type: 'static',
    templateOptions: {
      required: false,
      label: 'Module data',
      type: 'static',
    },
    read_only: true,
  },
  {
    key: 'is_active',
    default: true,
    type: 'checkbox',
    templateOptions: {
      required: false,
      label: 'Is active',
      type: 'checkbox',
    },
    read_only: false,
  },
];

const formadd = [
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
    endpoint: '/contenttypes/contenttypes/',
    read_only: true,
    templateOptions: {
      label: 'Content type',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'content_type',
    many: false,
  },
  {
    key: 'module_data',
    type: 'static',
    templateOptions: {
      required: false,
      label: 'Module data',
      type: 'static',
    },
    read_only: true,
  },
  {
    key: 'is_active',
    default: true,
    type: 'checkbox',
    templateOptions: {
      required: false,
      label: 'Is active',
      type: 'checkbox',
    },
    read_only: false,
  },
];

export const dashboardmodules = {
  list,
  form,
  formadd,
};
