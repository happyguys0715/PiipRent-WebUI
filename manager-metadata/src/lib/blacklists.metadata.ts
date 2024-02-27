import { createFilter, Type } from '@webui/metadata';
import { Endpoints } from '@webui/models';

const filters = {
  companyContact: createFilter(Type.Related, {
    key: 'company_contact',
    label: 'Recruitment Agent',
    endpoint: Endpoints.CompanyContact,
    queryParams: {
      master_company: 'current',
    },
  }),
  candidateContact: createFilter(Type.Related, {
    key: 'candidate_contact',
    label: 'Candidate contact',
    endpoint: '/candidate/candidatecontacts/',
  }),
  company: createFilter(Type.Related, {
    key: 'company',
    label: 'Client',
    endpoint: '/core/companies/',
  }),
  client_contact: createFilter(Type.Related, {
    key: 'client_contact',
    label: 'Client Contact',
    endpoint: '/core/companycontacts/',
  }),
  jobsite: createFilter(Type.Related, {
    key: 'jobsite',
    label: 'Jobsite',
    endpoint: '/hr/jobsites/',
  }),
};

const list = {
  list: {
    list: 'blacklist',
    label: 'Black list',
    columns: [
      {
        content: [
          {
            endpoint: '/candidate/candidatecontacts/',
            field: 'candidate_contact',
            type: 'related',
          },
        ],
        name: 'candidate_contact',
        sort_field: 'candidate_contact',
        label: 'Candidate contact',
        sort: true,
      },
      {
        content: [
          {
            endpoint: '/core/companycontacts/',
            field: 'company_contact',
            type: 'related',
          },
        ],
        name: 'company_contact',
        sort_field: 'company_contact',
        label: 'Recruitment Agent',
        sort: true,
      },
      {
        content: [
          {
            endpoint: '/core/companies/',
            field: 'company',
            type: 'related',
          },
        ],
        name: 'company',
        sort_field: 'company',
        label: 'Client',
        sort: true,
      },
      {
        content: [
          {
            endpoint: '/core/companycontacts/',
            field: 'client_contact',
            type: 'related',
          },
        ],
        name: 'client_contact',
        label: 'Client Contact',
      },
      {
        content: [
          {
            endpoint: '/hr/jobsites/',
            field: 'jobsite',
            type: 'related',
          },
        ],
        name: 'jobsite',
        sort_field: 'jobsite',
        label: 'Jobsite',
        sort: true,
      },
    ],
    pagination_label: 'Black list',
    search_enabled: true,
    editDisable: false,
    filters: [
      filters.companyContact,
      filters.candidateContact,
      filters.company,
      filters.client_contact,
      filters.jobsite,
    ],
  },
  fields: [
    {
      list: false,
      endpoint: '/candidate/candidatecontacts/',
      read_only: true,
      templateOptions: {
        label: 'Candidate contact',
        add: true,
        delete: false,
        values: ['__str__'],
        type: 'related',
        edit: true,
      },
      collapsed: false,
      type: 'related',
      key: 'candidate_contact',
      many: false,
    },
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
      list: false,
      endpoint: '/hr/jobsites/',
      read_only: true,
      templateOptions: {
        label: 'Jobsite',
        add: true,
        delete: false,
        values: ['__str__'],
        type: 'related',
        edit: true,
      },
      collapsed: false,
      type: 'related',
      key: 'jobsite',
      many: false,
    },
  ],
};

const formset = {
  fields: [
    {
      many: false,
      key: 'company',
      endpoint: '/core/companies/',
      collapsed: false,
      list: false,
      templateOptions: {
        add: true,
        delete: false,
        edit: true,
        values: ['__str__'],
        label: 'Company',
        type: 'related',
      },
      read_only: true,
      type: 'related',
    },
    {
      many: false,
      key: 'jobsite',
      endpoint: '/hr/jobsites/',
      collapsed: false,
      list: false,
      templateOptions: {
        add: true,
        delete: false,
        edit: true,
        values: ['__str__'],
        label: 'Jobsite',
        type: 'related',
      },
      read_only: true,
      type: 'related',
    },
  ],
  list: {
    columns: [
      {
        name: 'company',
        sort: true,
        sort_field: 'company',
        content: [
          {
            endpoint: '/core/companies/',
            type: 'related',
            field: 'company',
          },
        ],
        label: 'Company',
      },
      {
        name: 'jobsite',
        sort: true,
        sort_field: 'jobsite',
        content: [
          {
            endpoint: '/hr/jobsites/',
            type: 'related',
            field: 'jobsite',
          },
        ],
        label: 'Jobsite',
      },
      {
        name: 'actions',
        content: [
          {
            action: 'editForm',
            endpoint: '/hr/blacklists/{id}',
            icon: 'fa-pencil-alt',
            title: 'Edit',
            text_color: '#f0ad4e',
            type: 'button',
            field: 'id',
          },
          {
            action: 'delete',
            icon: 'fa-times-circle',
            title: 'Delete',
            text_color: '#f32700',
            type: 'button',
            field: 'id',
          },
        ],
        label: 'Actions',
        title: null,
        delim: null,
      },
    ],
    list: 'blacklist',
    editDisable: false,
    label: 'Black list',
    pagination_label: 'Black list',
    search_enabled: false,
  },
};

const form = [
  {
    endpoint: '/candidate/candidatecontacts/',
    read_only: true,
    templateOptions: {
      label: 'Candidate contact',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'candidate_contact',
  },
  {
    endpoint: '/core/companies/',
    templateOptions: {
      label: 'Client',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    query: {
      id: ['{jobsite.regular_company.id}', '{client_contact.company.id}'],
    },
    type: 'related',
    key: 'company',
  },
  {
    endpoint: '/hr/jobsites/',
    templateOptions: {
      label: 'Jobsite',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    query: {
      company: '{company.id}',
      primary_contact: '{client_contact.id}',
    },
    type: 'related',
    key: 'jobsite',
  },
  {
    list: false,
    endpoint: '/core/companycontacts/',
    read_only: true,
    templateOptions: {
      label: 'Client contact',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    query: {
      id: '{jobsite.primary_contact.id}',
      company: '{company.id}',
    },
    collapsed: false,
    type: 'related',
    key: 'client_contact',
    many: false,
  },
  {
    endpoint: '/core/companycontacts/',
    read_only: true,
    templateOptions: {
      label: 'Recruitment Agent',
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    type: 'related',
    key: 'company_contact',
  },
  {
    key: 'created_at',
    type: 'datepicker',
    templateOptions: { required: false, label: 'Created at', type: 'datetime' },
    read_only: true,
  },
  {
    key: 'updated_at',
    type: 'datepicker',
    templateOptions: { required: false, label: 'Updated at', type: 'datetime' },
    read_only: true,
  },
];

const formadd = [
  {
    endpoint: '/candidate/candidatecontacts/',
    read_only: true,
    templateOptions: {
      required: true,
      label: 'Candidate contact',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    type: 'related',
    key: 'candidate_contact',
  },
  {
    endpoint: '/core/companies/',
    templateOptions: {
      label: 'Client',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    query: {
      id: ['{jobsite.regular_company.id}', '{client_contact.company.id}'],
    },
    type: 'related',
    key: 'company',
  },
  {
    endpoint: '/hr/jobsites/',
    templateOptions: {
      label: 'Jobsite',
      add: true,
      delete: false,
      values: ['__str__', 'regular_company', 'primary_contact'],
      type: 'related',
      edit: true,
    },
    query: {
      company: '{company.id}',
      primary_contact: '{client_contact.id}',
    },
    type: 'related',
    key: 'jobsite',
  },
  {
    endpoint: '/core/companycontacts/',
    templateOptions: {
      label: 'Client contact',
      add: true,
      delete: false,
      values: ['__str__', 'company'],
      type: 'related',
      edit: true,
    },
    query: {
      id: '{jobsite.primary_contact.id}',
      company: '{company.id}',
    },
    type: 'related',
    key: 'client_contact',
  },
  {
    endpoint: '/core/companycontacts/',
    read_only: true,
    templateOptions: {
      label: 'Recruitment Agent',
      values: ['__str__'],
      type: 'related',
    },
    default: '{session.contact.contact_id}',
    query: {
      master_company: 'current',
    },
    type: 'related',
    key: 'company_contact',
  },
];

export const blacklists = {
  list,
  formset,
  form,
  formadd,
};
