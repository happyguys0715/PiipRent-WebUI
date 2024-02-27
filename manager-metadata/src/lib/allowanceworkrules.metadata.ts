const list = {
  list: {
    list: 'allowanceworkrule',
    label: 'Allowance Work Rule',
    columns: [
      {
        content: [{ field: '__str__', type: 'static' }],
        name: '__str__',
        label: 'Allowance Work Rule',
      },
    ],
    pagination_label: 'Allowance Work Rule',
    search_enabled: false,
    editDisable: false,
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Allowance Work Rule',
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
    key: 'allowance_description',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Allowance Description',
      max: 255,
      type: 'text',
      description: 'Examples: Travel Allowance, Waiting Hours, etc.',
    },
    read_only: false,
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
    key: 'allowance_description',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Allowance Description',
      max: 255,
      type: 'text',
      description: 'Examples: Travel Allowance, Waiting Hours, etc.',
    },
    read_only: false,
  },
];

export const allowanceworkrules = {
  list,
  form,
  formadd,
};
