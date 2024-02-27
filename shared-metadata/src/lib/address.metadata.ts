const list = {
  list: {
    list: 'address',
    label: 'Address',
    columns: [
      {
        content: [
          {
            field: '__str__',
            type: 'static',
          },
        ],
        name: '__str__',
        label: 'Address',
      },
    ],
    pagination_label: 'Address',
    search_enabled: false,
    editDisable: false,
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Address',
        type: 'static',
      },
      read_only: true,
    },
  ],
};

const formadd = [
  {
    key: 'street_address',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Street Address',
      max: 126,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'apartment',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Apartment',
      max: 11,
      type: 'text',
    },
    read_only: false,
  },
];

const form = [
  {
    key: 'street_address',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Street Address',
      max: 126,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'apartment',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Apartment',
      max: 11,
      type: 'text',
    },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/core/cities/',
    read_only: true,
    templateOptions: {
      label: 'City',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'city',
    many: false,
  },
  {
    key: 'postal_code',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Postal Code',
      max: 11,
      type: 'text',
    },
    read_only: true,
  },
  {
    list: false,
    endpoint: '/core/regions/',
    read_only: true,
    templateOptions: {
      label: 'State',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'state',
    many: false,
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
    default: 'AU',
    type: 'related',
    key: 'country',
    many: false,
  },
  {
    key: 'latitude',
    default: 0,
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Latitude',
      type: 'text',
    },
    read_only: true,
  },
  {
    key: 'longitude',
    default: 0,
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Longitude',
      type: 'text',
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
    key: 'updated_at',
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'Updated at',
      type: 'datetime',
    },
    read_only: true,
  },
];

export const address = {
  list,
  form,
  formadd,
};
