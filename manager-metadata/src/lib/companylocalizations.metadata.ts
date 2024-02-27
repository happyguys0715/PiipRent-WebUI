const list = {
  list: {
    list: 'companylocalization',
    label: 'Company Localization',
    columns: [
      {
        content: [{ field: '__str__', type: 'static' }],
        name: '__str__',
        label: 'Company Localization',
      },
    ],
    pagination_label: 'Company Localization',
    search_enabled: false,
    editDisable: false,
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Company Localization',
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
    key: 'field_name',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Company field name',
      max: 64,
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
      description:
        'Country of localization. Empty value used for default variant',
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
    key: 'verbose_value',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Company field verbose name',
      max: 128,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'help_text',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Company field help text',
      max: 512,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'active',
    default: true,
    type: 'checkbox',
    templateOptions: {
      required: false,
      label: 'Company field is active',
      type: 'checkbox',
    },
    read_only: false,
  },
];

const formadd = [
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
    key: 'field_name',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Company field name',
      max: 64,
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
      description:
        'Country of localization. Empty value used for default variant',
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
    key: 'verbose_value',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Company field verbose name',
      max: 128,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'help_text',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Company field help text',
      max: 512,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'active',
    default: true,
    type: 'checkbox',
    templateOptions: {
      required: false,
      label: 'Company field is active',
      type: 'checkbox',
    },
    read_only: false,
  },
];

export const companylocalizations = {
  list,
  form,
  formadd,
};
