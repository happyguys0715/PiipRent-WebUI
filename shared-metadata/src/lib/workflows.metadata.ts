const list = {
  list: {
    list: 'workflow',
    label: 'Workflow',
    columns: [
      {
        content: [
          {
            field: 'name',
            type: 'input',
          },
        ],
        name: 'name',
        sort_field: 'name',
        label: 'Name',
        sort: true,
      },
      {
        content: [
          {
            endpoint: '/contenttypes/contenttypes/',
            field: 'model',
            type: 'related',
          },
        ],
        name: 'model',
        sort_field: 'model',
        label: 'Model',
        sort: true,
      },
    ],
    pagination_label: 'Workflow',
    search_enabled: true,
    editDisable: false,
  },
  fields: [
    {
      list: false,
      endpoint: '/contenttypes/contenttypes/',
      read_only: true,
      templateOptions: {
        label: 'Model',
        add: true,
        delete: false,
        values: ['__str__'],
        type: 'related',
        edit: true,
      },
      collapsed: false,
      type: 'related',
      key: 'model',
      many: false,
    },
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        required: true,
        label: 'Name',
        type: 'text',
        max: 64,
      },
      read_only: true,
    },
  ],
};

const form = [
  {
    key: 'name',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Name',
      max: 64,
      type: 'text',
    },
    read_only: false,
  },
  {
    endpoint: '/contenttypes/contenttypes/',
    read_only: true,
    templateOptions: {
      label: 'Model',
      values: ['__str__'],
      type: 'related',
    },
    type: 'related',
    key: 'model',
  },
];

const formadd = [
  {
    key: 'name',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Name',
      max: 64,
      type: 'text',
    },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/contenttypes/contenttypes/',
    read_only: true,
    templateOptions: {
      required: true,
      label: 'Model',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'model',
    many: false,
  },
];

export const workflows = {
  list,
  form,
  formadd,
};
