const list = {
  list: {
    list: 'formfieldgroup',
    label: 'Form fields group',
    columns: [
      {
        content: [
          {
            endpoint: '/core/forms/',
            field: 'form',
            type: 'related',
          },
        ],
        name: 'form',
        sort_field: 'form',
        label: 'Form',
        sort: true,
      },
      {
        content: [
          {
            field: 'name',
            type: 'input',
          },
        ],
        name: 'name',
        sort_field: 'name',
        label: 'Group name',
        sort: true,
      },
      {
        content: [
          {
            field: 'position',
            type: 'input',
          },
        ],
        name: 'position',
        sort_field: 'position',
        label: 'Position',
        sort: true,
      },
    ],
    pagination_label: 'Form fields group',
    search_enabled: false,
    editDisable: false,
  },
  fields: [
    {
      key: 'name',
      default: '',
      type: 'input',
      templateOptions: {
        required: false,
        label: 'Group name',
        type: 'text',
        max: 512,
      },
      read_only: true,
    },
    {
      key: 'position',
      default: 0,
      type: 'input',
      templateOptions: {
        required: false,
        label: 'Position',
        type: 'number',
        min: 0,
        max: 2147483647,
      },
      read_only: true,
    },
    {
      list: false,
      endpoint: '/core/forms/',
      read_only: true,
      templateOptions: {
        label: 'Form',
        add: true,
        delete: false,
        values: ['__str__'],
        type: 'related',
        edit: true,
      },
      collapsed: false,
      type: 'related',
      key: 'form',
      many: false,
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
    endpoint: '/core/forms/',
    read_only: true,
    templateOptions: {
      label: 'Form',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'form',
    many: false,
  },
  {
    key: 'name',
    default: '',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Group name',
      max: 512,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'position',
    default: 0,
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Position',
      max: 2147483647,
      type: 'number',
      min: 0,
    },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/core/formfields/',
    read_only: true,
    templateOptions: {
      label: 'Field list',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'field_list',
    many: true,
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
    endpoint: '/core/forms/',
    read_only: true,
    templateOptions: {
      label: 'Form',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'form',
    many: false,
  },
  {
    key: 'name',
    default: '',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Group name',
      max: 512,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'position',
    default: 0,
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Position',
      max: 2147483647,
      type: 'number',
      min: 0,
    },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/core/formfields/',
    read_only: true,
    templateOptions: {
      label: 'Field list',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'field_list',
    many: true,
  },
];

export const formfieldgroups = {
  list,
  form,
  formadd,
};
