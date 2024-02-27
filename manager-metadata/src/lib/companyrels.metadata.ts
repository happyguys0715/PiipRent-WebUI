const list = {
  list: {
    list: 'companyrel',
    label: 'Company Relationship',
    columns: [
      {
        content: [
          {
            endpoint: '/core/companies/',
            field: 'master_company',
            type: 'related',
          },
        ],
        name: 'master_company',
        sort_field: 'master_company',
        label: 'Master company',
        sort: true,
      },
      {
        content: [
          {
            endpoint: '/core/companies/',
            field: 'regular_company',
            type: 'related',
          },
        ],
        name: 'regular_company',
        sort_field: 'regular_company',
        label: 'Regular company',
        sort: true,
      },
      {
        content: [
          {
            endpoint: '/core/companycontacts/',
            field: 'primary_contact',
            type: 'related',
          },
        ],
        name: 'primary_contact',
        sort_field: 'primary_contact',
        label: 'Primary contact',
        sort: true,
      },
    ],
    pagination_label: 'Company Relationship',
    search_enabled: false,
    editDisable: false,
  },
  fields: [
    {
      list: false,
      endpoint: '/core/companies/',
      read_only: true,
      templateOptions: {
        label: 'Regular company',
        add: true,
        delete: false,
        values: ['__str__'],
        type: 'related',
        edit: true,
      },
      collapsed: false,
      type: 'related',
      key: 'regular_company',
      many: false,
    },
    {
      list: false,
      endpoint: '/core/companycontacts/',
      read_only: true,
      templateOptions: {
        label: 'Primary contact',
        add: true,
        delete: false,
        values: ['__str__'],
        type: 'related',
        edit: true,
      },
      collapsed: false,
      type: 'related',
      key: 'primary_contact',
      many: false,
    },
    {
      list: false,
      endpoint: '/core/companies/',
      read_only: true,
      templateOptions: {
        label: 'Master company',
        add: true,
        delete: false,
        values: ['__str__'],
        type: 'related',
        edit: true,
      },
      collapsed: false,
      type: 'related',
      key: 'master_company',
      many: false,
    },
  ],
};

const form = [
  {
    list: false,
    endpoint: '/core/companies/',
    read_only: true,
    templateOptions: {
      label: 'Master company',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'master_company',
    many: false,
  },
  {
    list: false,
    endpoint: '/core/companies/',
    read_only: true,
    templateOptions: {
      label: 'Regular company',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'regular_company',
    many: false,
  },
  {
    list: false,
    endpoint: '/core/companycontacts/',
    read_only: true,
    templateOptions: {
      label: 'Primary contact',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'primary_contact',
    many: false,
  },
  {
    key: 'timeline',
    type: 'timeline',
    query: { model: 'core.companyrel', object_id: '{id}' },
    templateOptions: {
      label: 'States Timeline',
      type: 'timeline',
      text: 'States Timeline',
    },
    endpoint: '/core/workflownodes/timeline/',
  },
];

const formadd = [
  {
    list: false,
    endpoint: '/core/companies/',
    read_only: true,
    templateOptions: {
      required: true,
      label: 'Master company',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'master_company',
    many: false,
  },
  {
    list: false,
    endpoint: '/core/companies/',
    read_only: true,
    templateOptions: {
      required: true,
      label: 'Regular company',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'regular_company',
    many: false,
  },
  {
    list: false,
    endpoint: '/core/companycontacts/',
    read_only: true,
    templateOptions: {
      label: 'Primary contact',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    type: 'related',
    key: 'primary_contact',
    many: false,
  },
  // {
  //   key: 'timeline',
  //   type: 'timeline',
  //   query: { model: 'core.companyrel', object_id: '{id}' },
  //   templateOptions: {
  //     label: 'States Timeline',
  //     type: 'timeline',
  //     text: 'States Timeline'
  //   },
  //   endpoint: '/core/workflownodes/timeline/'
  // }
];

export const companyrels = {
  list,
  form,
  formadd,
};
