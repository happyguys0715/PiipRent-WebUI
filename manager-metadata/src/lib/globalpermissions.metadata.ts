const list = {
  fields: [
    {
      key: 'name',
      read_only: true,
      templateOptions: {
        required: true,
        label: 'Name',
        max: 255,
        type: 'text',
      },
      type: 'input',
    },
  ],
  list: {
    columns: [
      {
        name: 'name',
        sort: true,
        sort_field: 'name',
        content: [
          {
            type: 'input',
            field: 'name',
          },
        ],
        label: 'Name',
      },
    ],
    list: 'globalpermission',
    editDisable: false,
    label: 'global permission',
    pagination_label: 'global permission',
    search_enabled: true,
  },
};

const formset = {
  fields: [
    {
      key: 'name',
      read_only: false,
      templateOptions: {
        required: true,
        label: 'Name',
        max: 255,
        type: 'text',
      },
      type: 'input',
    },
  ],
  list: {
    columns: [
      {
        name: 'name',
        sort: true,
        sort_field: 'name',
        content: [{ type: 'input', field: 'name' }],
        label: 'Name',
      },
    ],
    buttons: [],
    list: 'globalpermission',
    editDisable: false,
    label: 'global permission',
    pagination_label: 'global permission',
    search_enabled: true,
  },
};

const form = [
  {
    key: 'name',
    read_only: false,
    templateOptions: {
      required: true,
      label: 'Name',
      max: 255,
      type: 'text',
    },
    type: 'input',
  },
];

const formadd = [
  {
    key: 'name',
    read_only: false,
    templateOptions: {
      required: true,
      label: 'Name',
      max: 255,
      type: 'text',
    },
    type: 'input',
  },
];

export const globalpermissions = {
  list,
  formset,
  form,
  formadd,
};
