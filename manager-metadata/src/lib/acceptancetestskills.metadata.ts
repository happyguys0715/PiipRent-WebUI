const list = {
  list: {
    list: 'acceptancetestskill',
    label: 'Acceptance Test Skill',
    columns: [
      {
        content: [
          {
            field: '__str__',
            type: 'static',
          },
        ],
        name: '__str__',
        label: 'Acceptance Test Skill',
      },
    ],
    pagination_label: 'Acceptance Test Skill',
    search_enabled: false,
    editDisable: false,
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Acceptance Test Skill',
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
    key: 'updated_at',
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'Updated at',
      type: 'datetime',
    },
    read_only: true,
  },
  {
    key: 'created_at',
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'Created at',
      type: 'datetime',
    },
    read_only: true,
  },
  {
    list: false,
    endpoint: '/acceptance-tests/acceptancetests/',
    read_only: true,
    templateOptions: {
      label: 'Acceptance test',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'acceptance_test',
    many: false,
  },
  {
    list: false,
    endpoint: '/skills/skills/',
    read_only: true,
    templateOptions: {
      label: 'Skill',
      add: true,
      delete: false,
      values: ['__str__', 'translations', 'name'],
      type: 'related',
      edit: true,
    },
    query: {
      company: 'currentCompany',
    },
    collapsed: false,
    type: 'related',
    key: 'skill',
    many: false,
  },
];

const formadd = [
  {
    list: false,
    endpoint: '/acceptance-tests/acceptancetests/',
    read_only: true,
    templateOptions: {
      label: 'Acceptance test',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'acceptance_test',
    many: false,
  },
  {
    list: false,
    endpoint: '/skills/skills/',
    read_only: true,
    templateOptions: {
      label: 'Skill',
      add: true,
      delete: false,
      values: ['__str__', 'translations', 'name'],
      type: 'related',
      edit: true,
    },
    query: {
      company: 'currentCompany',
    },
    collapsed: false,
    type: 'related',
    key: 'skill',
    many: false,
  },
];

export const acceptancetestskills = {
  list,
  form,
  formadd,
};
