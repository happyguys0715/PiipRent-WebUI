import { currency } from '@webui/metadata';

const list = {
  list: {
    list: 'country',
    label: 'Country',
    columns: [
      {
        content: [
          {
            field: '__str__',
            type: 'static',
          },
        ],
        name: '__str__',
        label: 'Country',
      },
    ],
    pagination_label: 'Country',
    search_enabled: true,
    editDisable: false,
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Country',
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
      label: 'Candidate contacts',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    type: 'related',
    key: 'candidate_contacts',
    many: true,
  },
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
    key: 'code2',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Code2',
      max: 2,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'code3',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Code3',
      max: 3,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'continent',
    type: 'select',
    templateOptions: {
      required: true,
      label: 'Continent',
      type: 'select',
      options: [
        {
          value: 'OC',
          label: 'Oceania',
        },
        {
          value: 'EU',
          label: 'Europe',
        },
        {
          value: 'AF',
          label: 'Africa',
        },
        {
          value: 'NA',
          label: 'North America',
        },
        {
          value: 'AN',
          label: 'Antarctica',
        },
        {
          value: 'SA',
          label: 'South America',
        },
        {
          value: 'AS',
          label: 'Asia',
        },
      ],
    },
    read_only: false,
  },
  {
    key: 'tld',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Tld',
      max: 5,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'phone',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Phone',
      max: 20,
      type: 'text',
    },
    read_only: false,
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
  {
    key: 'currency',
    default: 'USD',
    type: 'select',
    templateOptions: {
      required: false,
      label: 'Currency',
      type: 'select',
      options: currency,
    },
    read_only: false,
  },
];

const formadd = [
  {
    list: false,
    endpoint: '/candidate/candidatecontacts/',
    read_only: true,
    templateOptions: {
      label: 'Candidate contacts',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    type: 'related',
    key: 'candidate_contacts',
    many: true,
  },
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
    key: 'code2',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Code2',
      max: 2,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'code3',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Code3',
      max: 3,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'continent',
    type: 'select',
    templateOptions: {
      required: true,
      label: 'Continent',
      type: 'select',
      options: [
        {
          value: 'OC',
          label: 'Oceania',
        },
        {
          value: 'EU',
          label: 'Europe',
        },
        {
          value: 'AF',
          label: 'Africa',
        },
        {
          value: 'NA',
          label: 'North America',
        },
        {
          value: 'AN',
          label: 'Antarctica',
        },
        {
          value: 'SA',
          label: 'South America',
        },
        {
          value: 'AS',
          label: 'Asia',
        },
      ],
    },
    read_only: false,
  },
  {
    key: 'tld',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Tld',
      max: 5,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'phone',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Phone',
      max: 20,
      type: 'text',
    },
    read_only: false,
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
  {
    key: 'currency',
    default: 'USD',
    type: 'select',
    templateOptions: {
      required: false,
      label: 'Currency',
      type: 'select',
      options: currency,
    },
    read_only: false,
  },
];

export const countries = {
  list,
  form,
  formadd,
};
