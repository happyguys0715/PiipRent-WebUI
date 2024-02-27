const list = {
  list: {
    list: 'employmentclassification',
    label: 'Employment Classification',
    columns: [
      {
        content: [{ field: '__str__', type: 'static' }],
        name: '__str__',
        label: 'Employment Classification',
      },
    ],
    pagination_label: 'Employment Classification',
    search_enabled: true,
    editDisable: false,
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Employment Classification',
        type: 'static',
      },
      read_only: true,
    },
  ],
};

const form = [
  {
    list: false,
    endpoint: '/candidate/candidatecontacts/',
    read_only: true,
    templateOptions: {
      label: 'Candidates',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'candidates',
    many: true,
  },
  {
    list: false,
    endpoint: '/skills/skills/',
    read_only: true,
    templateOptions: {
      label: 'Skills',
      add: true,
      delete: false,
      values: ['__str__', 'translations', 'name'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'skills',
    many: true,
  },
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
    key: 'name',
    type: 'input',
    templateOptions: { required: true, label: 'Name', max: 255, type: 'text' },
    read_only: false,
  },
];

const formadd = [
  {
    list: false,
    endpoint: '/candidate/candidatecontacts/',
    read_only: true,
    templateOptions: {
      label: 'Candidates',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    type: 'related',
    key: 'candidates',
    many: true,
  },
  {
    list: false,
    endpoint: '/skills/skills/',
    read_only: true,
    templateOptions: {
      label: 'Skills',
      add: true,
      delete: false,
      values: ['__str__', 'translations', 'name'],
      type: 'related',
      edit: true,
    },
    query: {
      comapny: 'currentCompany',
    },
    collapsed: false,
    type: 'related',
    key: 'skills',
    many: true,
  },
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
    key: 'name',
    type: 'input',
    templateOptions: { required: true, label: 'Name', max: 255, type: 'text' },
    read_only: false,
  },
];

export const employmentclassifications = {
  list,
  form,
  formadd,
};
