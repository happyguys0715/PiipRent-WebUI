const list = {
  list: {
    list: 'jobsiteunavailability',
    label: 'Jobsite Unavailability',
    columns: [
      {
        content: [{ field: '__str__', type: 'static' }],
        name: '__str__',
        label: 'Jobsite Unavailability',
      },
    ],
    pagination_label: 'Jobsite Unavailability',
    search_enabled: false,
    editDisable: false,
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Jobsite Unavailability',
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
    list: false,
    endpoint: '/hr/jobsites/',
    read_only: true,
    templateOptions: {
      label: 'Jobsite',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'jobsite',
    many: false,
  },
  {
    key: 'unavailable_from',
    type: 'datepicker',
    templateOptions: { required: false, label: 'From', type: 'date' },
    read_only: false,
  },
  {
    key: 'unavailable_until',
    type: 'datepicker',
    templateOptions: { required: false, label: 'Until', type: 'date' },
    read_only: false,
  },
  {
    key: 'notes',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Notes',
      type: 'text',
      description: 'Unavailability Description',
    },
    read_only: false,
  },
];

const formadd = [
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
    list: false,
    endpoint: '/hr/jobsites/',
    read_only: true,
    templateOptions: {
      required: true,
      label: 'Jobsite',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    type: 'related',
    key: 'jobsite',
    many: false,
  },
  {
    key: 'unavailable_from',
    type: 'datepicker',
    templateOptions: { required: false, label: 'From', type: 'date' },
    read_only: false,
  },
  {
    key: 'unavailable_until',
    type: 'datepicker',
    templateOptions: { required: false, label: 'Until', type: 'date' },
    read_only: false,
  },
  {
    key: 'notes',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Notes',
      type: 'text',
      description: 'Unavailability Description',
    },
    read_only: false,
  },
];

export const jobsiteunavailabilities = {
  list,
  form,
  formadd,
};
