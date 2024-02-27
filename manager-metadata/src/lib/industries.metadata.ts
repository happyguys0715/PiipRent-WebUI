const list = {
  list: {
    list: 'industry',
    label: 'Industry',
    columns: [
      {
        content: [
          {
            field: 'type',
            type: 'input',
          },
        ],
        name: 'type',
        sort_field: 'type',
        label: 'Type',
        sort: true,
      },
    ],
    pagination_label: 'Industry',
    search_enabled: true,
    editDisable: false,
  },
  fields: [
    {
      key: 'type',
      type: 'input',
      templateOptions: {
        required: true,
        label: 'Type',
        type: 'text',
        max: 63,
      },
      read_only: true,
    },
  ],
};

const form = [
  {
    key: 'type',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Type',
      max: 63,
      type: 'text',
    },
    read_only: false,
  },
];

const formadd = [
  {
    key: 'type',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Type',
      max: 63,
      type: 'text',
    },
    read_only: false,
  },
];

export const industries = {
  list,
  form,
  formadd,
};
