const list = {
  list: {
    list: 'filestorage',
    label: 'File Storage',
    columns: [
      {
        content: [
          {
            field: '__str__',
            type: 'static',
          },
        ],
        name: '__str__',
        label: 'File Storage',
      },
    ],
    pagination_label: 'File Storage',
    search_enabled: false,
    editDisable: false,
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'File Storage',
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
    endpoint: '/contenttypes/contenttypes/',
    read_only: true,
    templateOptions: {
      label: 'Owner type',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'owner_type',
    many: false,
  },
  {
    key: 'owner_id',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Owner id',
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'content',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Content',
      max: 100,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'owner',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Owner',
      type: 'text',
    },
    read_only: true,
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
    endpoint: '/contenttypes/contenttypes/',
    read_only: true,
    templateOptions: {
      label: 'Owner type',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'owner_type',
    many: false,
  },
  {
    key: 'owner_id',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Owner id',
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'content',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Content',
      max: 100,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'owner',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Owner',
      type: 'text',
    },
    read_only: true,
  },
];

export const filestorages = {
  list,
  form,
  formadd,
};
