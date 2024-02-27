const list = {
  list: {
    list: 'superannuationfund',
    label: 'Superannuation Fund',
    buttons: [],
    columns: [
      {
        content: [
          {
            field: '__str__',
            type: 'static',
          },
        ],
        name: '__str__',
        label: 'Superannuation Fund',
      },
    ],
    pagination_label: 'Superannuation Fund',
    search_enabled: true,
    editDisable: false,
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Superannuation Fund',
        type: 'static',
      },
      read_only: true,
    },
  ],
};

const form = [
  {
    key: 'abn',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'ABN',
      type: 'text',
    },
    read_only: true,
  },
  {
    key: 'name',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Fund name',
      type: 'text',
    },
    read_only: true,
  },
  {
    key: 'usi',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'USI',
      type: 'text',
    },
    read_only: true,
  },
  {
    key: 'product_name',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Product name',
      type: 'text',
    },
    read_only: true,
  },
  {
    key: 'contribution_restrictions',
    type: 'checkbox',
    templateOptions: {
      type: 'checkbox',
      required: false,
      label: 'Contribution restrictions',
    },
    read_only: true,
  },
  {
    key: 'from_date',
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'From date',
      type: 'date',
    },
    read_only: true,
  },
  {
    key: 'to_date',
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'To date',
      type: 'date',
    },
    read_only: true,
  },
];

export const superannuationfunds = {
  list,
  form,
};
