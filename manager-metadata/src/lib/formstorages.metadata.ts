const list = {
  list: {
    list: 'formstorage',
    label: 'Form storage',
    columns: [
      {
        delim: null,
        label: 'Form',
        sort: true,
        content: [
          {
            endpoint: '/core/forms/{form.id}/',
            field: 'form',
            type: 'link',
            label: 'Form',
          },
        ],
        name: 'form',
        title: null,
        sort_field: 'form',
      },
      {
        delim: null,
        label: 'Company',
        sort: true,
        content: [
          {
            endpoint: '/core/companies/{company.id}/',
            field: 'company',
            type: 'link',
            label: 'Company',
          },
        ],
        name: 'company',
        title: null,
        sort_field: 'company',
      },
      {
        content: [
          {
            values: {
              null: 'Wait',
              false: 'Cancelled',
              true: 'Approved',
            },
            field: 'status',
            type: 'select',
          },
        ],
        name: 'status',
        sort_field: 'status',
        label: 'Status',
        sort: true,
      },
      {
        content: [
          {
            field: 'created_at',
            type: 'datepicker',
          },
        ],
        name: 'created_at',
        sort_field: 'created_at',
        label: 'Created at',
        sort: true,
      },
    ],
    pagination_label: 'Form storage',
    search_enabled: false,
    editDisable: false,
    buttons: [],
  },
  fields: [
    {
      key: 'company',
      type: 'link',
      templateOptions: {
        label: 'Company',
        type: 'link',
        link: null,
        text: 'Company',
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
      key: 'form',
      type: 'link',
      templateOptions: {
        label: 'Form',
        type: 'link',
        link: null,
        text: 'Form',
      },
      read_only: true,
    },
    {
      key: 'status',
      type: 'select',
      templateOptions: {
        required: false,
        label: 'Status',
        options: [
          {
            value: null,
            label: 'Wait',
          },
          {
            value: false,
            label: 'Cancelled',
          },
          {
            value: true,
            label: 'Approved',
          },
        ],
        type: 'select',
      },
      read_only: true,
    },
  ],
};

const form = [
  {
    name: 'General',
    type: 'collapse',
    children: [
      {
        list: false,
        endpoint: '/core/companies/',
        read_only: true,
        templateOptions: {
          label: 'Company',
          add: true,
          delete: false,
          values: ['__str__'],
          type: 'related',
          edit: true,
        },
        collapsed: false,
        type: 'related',
        key: 'company',
        many: false,
      },
      {
        key: 'status',
        type: 'select',
        templateOptions: {
          required: false,
          label: 'Status',
          type: 'select',
          options: [
            {
              value: null,
              label: 'Wait',
            },
            {
              value: false,
              label: 'Cancelled',
            },
            {
              value: true,
              label: 'Approved',
            },
          ],
        },
        read_only: true,
      },
      {
        key: 'data',
        type: 'static',
        templateOptions: {
          required: false,
          label: 'Data',
          type: 'static',
        },
        read_only: true,
      },
    ],
  },
];

const formadd = [
  {
    name: 'General',
    type: 'collapse',
    children: [
      {
        list: false,
        endpoint: '/core/companies/',
        read_only: true,
        templateOptions: {
          label: 'Company',
          add: true,
          delete: false,
          values: ['__str__'],
          type: 'related',
          edit: true,
        },
        collapsed: false,
        type: 'related',
        key: 'company',
        many: false,
      },
      {
        key: 'status',
        type: 'select',
        templateOptions: {
          required: false,
          label: 'Status',
          type: 'select',
          options: [
            {
              value: null,
              label: 'Wait',
            },
            {
              value: false,
              label: 'Cancelled',
            },
            {
              value: true,
              label: 'Approved',
            },
          ],
        },
        read_only: true,
      },
      {
        key: 'data',
        type: 'static',
        templateOptions: {
          required: false,
          label: 'Data',
          type: 'static',
        },
        read_only: true,
      },
    ],
  },
];

export const formstorages = {
  list,
  form,
  formadd,
};
