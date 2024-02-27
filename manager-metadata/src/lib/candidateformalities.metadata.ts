import { Endpoints } from '@webui/models';

const formset = {
  fields: [],
  list: {
    columns: [
      {
        name: 'country',
        title: null,
        content: [
          {
            type: 'text',
            field: 'country.name',
          },
        ],
        label: 'Country',
      },
      {
        name: 'tax_number',
        title: null,
        content: [
          {
            type: 'text',
            field: 'tax_number',
            showIf: ['tax_number'],
          },
          {
            values: {
              false: 'N/A',
            },
            color: {
              false: 'danger',
            },
            field: 'formality_attributes.display_tax_number',
            type: 'select',
          },
        ],
        label: 'Tax Number',
      },
      {
        name: 'personal_id',
        title: null,
        content: [
          {
            type: 'text',
            field: 'personal_id',
            showIf: ['personal_id'],
          },
          {
            values: {
              false: 'N/A',
            },
            color: {
              false: 'danger',
            },
            field: 'formality_attributes.display_personal_id',
            type: 'select',
          },
        ],
        label: 'Personal ID',
      },
    ],
    list: 'candidateformalities',
    label: 'Candidate Formalities',
    pagination_label: 'Candidate Formalities',
  },
};

export const formadd = [
  {
    key: 'candidate_contact',
    type: 'input',
    hide: true,
    templateOptions: {
      label: 'Candidate Contact',
    },
  },
  {
    key: 'company',
    send: false,
    hide: true,
    type: 'related',
    endpoint: Endpoints.Company,
    templateOptions: {
      label: 'Company',
      values: ['__str__'],
    },
  },
  {
    list: false,
    endpoint: '/core/countries/',
    read_only: true,
    templateOptions: {
      label: 'Country',
      add: true,
      delete: false,
      values: ['__str__', 'display_tax_number', 'display_personal_id'],
      type: 'related',
      edit: true,
    },
    replaceByData: true,
    collapsed: false,
    type: 'related',
    key: 'country',
    many: false,
    query: {
      company: '{company.id}',
    },
  },
  {
    key: 'tax_number',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Tax number',
      type: 'text',
    },
    showIf: ['country.id', 'country.display_tax_number'],
    read_only: false,
  },
  {
    key: 'personal_id',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Personal ID',
      type: 'text',
    },
    showIf: ['country.id', 'country.display_personal_id'],
    read_only: false,
  },
];

export const candidateformalities = {
  formset,
  formadd,
};
