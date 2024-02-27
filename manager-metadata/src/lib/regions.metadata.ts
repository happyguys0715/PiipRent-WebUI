const list = {
  list: {
    list: 'region',
    label: 'State/District',
    columns: [
      {
        content: [
          {
            field: '__str__',
            type: 'static',
          },
        ],
        name: '__str__',
        label: 'State/District',
      },
    ],
    pagination_label: 'State/District',
    search_enabled: true,
    editDisable: false,
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'State/District',
        type: 'static',
      },
      read_only: true,
    },
  ],
};

const form = [
  {
    key: 'name_ascii',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Name ascii',
      max: 200,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'slug',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Slug',
      type: 'text',
    },
    read_only: true,
  },
  {
    key: 'geoname_id',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Geoname id',
      max: 2147483647,
      type: 'number',
      min: -2147483648,
    },
    read_only: false,
  },
  {
    key: 'alternate_names',
    default: '',
    type: 'textarea',
    templateOptions: {
      required: false,
      label: 'Alternate names',
      type: 'textarea',
    },
    read_only: false,
  },
  {
    key: 'name',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Name',
      max: 200,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'display_name',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Display name',
      max: 200,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'geoname_code',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Geoname code',
      max: 50,
      type: 'text',
    },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/core/countries/',
    read_only: true,
    templateOptions: {
      label: 'Country',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'country',
    many: false,
  },
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
];

const formadd = [
  {
    key: 'name_ascii',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Name ascii',
      max: 200,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'slug',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Slug',
      type: 'text',
    },
    read_only: true,
  },
  {
    key: 'geoname_id',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Geoname id',
      max: 2147483647,
      type: 'number',
      min: -2147483648,
    },
    read_only: false,
  },
  {
    key: 'alternate_names',
    default: '',
    type: 'textarea',
    templateOptions: {
      required: false,
      label: 'Alternate names',
      type: 'textarea',
    },
    read_only: false,
  },
  {
    key: 'name',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Name',
      max: 200,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'display_name',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Display name',
      max: 200,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'geoname_code',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Geoname code',
      max: 50,
      type: 'text',
    },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/core/countries/',
    read_only: true,
    templateOptions: {
      label: 'Country',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'country',
    many: false,
  },
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
];

export const regions = {
  list,
  form,
  formadd,
};
