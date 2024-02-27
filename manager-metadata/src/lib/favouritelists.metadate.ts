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
    endpoint: Endpoints.CandidateContact,
    searchParam: 'full_name',
  }),
  company: createFilter(Type.Related, {
    key: 'company',
    label: 'Client',
    endpoint: '/core/companies/',
  }),
  primary_contact: createFilter(Type.Related, {
    key: 'client_contact',
    label: 'Client Contact',
    endpoint: '/core/companycontacts/',
  }),
  jobsite: createFilter(Type.Related, {
    key: 'jobsite',
    label: 'Jobsite',
    endpoint: '/hr/jobsites/',
  }),
  job: createFilter(Type.Related, {
    key: 'job',
    label: 'Job',
    endpoint: '/hr/jobs/',
  }),
};

const list = {
  list: {
    list: 'favouritelist',
    label: 'Favourite list',
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
        sort_field: 'client_contact',
        label: 'Client contact',
        sort: true,
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
      // {
      //   content: [
      //     { endpoint: '/hr/jobs/', field: 'job', type: 'related' }
      //   ],
      //   name: 'job',
      //   sort_field: 'job',
      //   label: 'Job',
      //   sort: true
      // }
    ],
    pagination_label: 'Favourite list',
    search_enabled: false,
    editDisable: false,
    filters: [
      filters.companyContact,
      filters.candidateContact,
      filters.company,
      filters.primary_contact,
      filters.jobsite,
      // filters.job
    ],
  },
  fields: [
    {
      list: false,
      endpoint: '/core/companycontacts/',
      read_only: true,
      templateOptions: {
        label: 'Company Manager',
        add: true,
        delete: false,
        values: ['__str__'],
        type: 'related',
        edit: true,
      },
      collapsed: false,
      type: 'related',
      key: 'company.primary_contact',
      many: false,
    },
    {
      list: false,
      endpoint: '/core/companies/',
      read_only: true,
      templateOptions: {
        label: 'Client',
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
      endpoint: '/core/companycontacts/',
      read_only: true,
      templateOptions: {
        label: 'Recruitment Agent',
        add: true,
        delete: false,
        values: ['__str__'],
        type: 'related',
        edit: true,
      },
      collapsed: false,
      type: 'related',
      key: 'company_contact',
      many: false,
    },
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
    {
      list: false,
      endpoint: '/hr/jobs/',
      read_only: true,
      templateOptions: {
        label: 'Job',
        add: true,
        delete: false,
        values: ['__str__'],
        type: 'related',
        edit: true,
      },
      collapsed: false,
      type: 'related',
      key: 'job',
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
        label: 'Client',
        type: 'related',
      },
      read_only: false,
      type: 'related',
    },
    {
      many: false,
      key: 'company.manager',
      endpoint: '/core/companycontacts/',
      collapsed: false,
      list: false,
      templateOptions: {
        add: true,
        delete: false,
        edit: true,
        values: ['__str__'],
        label: 'Company Manager',
        type: 'related',
      },
      read_only: true,
      type: 'related',
    },
    {
      many: false,
      key: 'job',
      endpoint: '/hr/jobs/',
      collapsed: false,
      list: false,
      templateOptions: {
        add: true,
        delete: false,
        edit: true,
        values: ['__str__'],
        label: 'Job',
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
    {
      many: false,
      key: 'company_contact',
      endpoint: '/core/companycontacts/',
      collapsed: false,
      list: false,
      templateOptions: {
        add: true,
        delete: false,
        edit: true,
        values: ['__str__'],
        label: 'Recruitment Agent',
        type: 'related',
      },
      read_only: true,
      type: 'related',
    },
  ],
  list: {
    columns: [
      {
        name: 'company_contact',
        sort: true,
        sort_field: 'company_contact',
        content: [
          {
            endpoint: '/core/companycontacts/',
            type: 'related',
            field: 'company_contact',
          },
        ],
        label: 'Recruitment Agent',
      },
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
        label: 'Client',
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
      // {
      //   name: 'job',
      //   sort: true,
      //   sort_field: 'job',
      //   content: [
      //     { endpoint: '/hr/jobs/', type: 'related', field: 'job' }
      //   ],
      //   label: 'Job'
      // },
      {
        name: 'actions',
        content: [
          {
            action: 'editForm',
            endpoint: '/hr/favouritelists/{id}',
            icon: 'fa-pencil-alt',
            title: 'Edit',
            text_color: '#f0ad4e',
            type: 'button',
            field: 'id',
          },
          {
            action: 'delete',
            icon: 'fa-trash',
            title: 'Delete',
            type: 'button',
            field: 'id',
          },
        ],
        label: 'Actions',
        title: null,
        delim: null,
      },
    ],
    list: 'favouritelist',
    editDisable: false,
    label: 'Favourite list',
    pagination_label: 'Favourite list',
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
    searchParam: 'full_name',
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
    collapsed: false,
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
    collapsed: false,
    type: 'related',
    key: 'jobsite',
  },
  {
    endpoint: '/hr/jobs/',
    read_only: true,
    hide: true,
    templateOptions: {
      label: 'Job',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'job',
  },
  {
    endpoint: '/core/companycontacts/',
    templateOptions: {
      label: 'Client Contact',
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
    collapsed: false,
    type: 'related',
    key: 'company_contact',
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
];

const job = {
  fields: [
    {
      key: 'id',
      templateOptions: {
        action: 'delete',
        label: '',
        type: 'button',
        text: '',
      },
      type: 'button',
    },
    {
      many: false,
      key: 'candidate_contact',
      endpoint: '/candidate/candidatecontacts/',
      collapsed: false,
      list: false,
      templateOptions: {
        add: true,
        delete: false,
        edit: true,
        values: ['__str__'],
        label: 'Candidate contact',
        type: 'related',
      },
      read_only: true,
      type: 'related',
    },
    {
      many: false,
      key: 'job',
      endpoint: '/hr/jobs/',
      collapsed: false,
      list: false,
      templateOptions: {
        add: true,
        delete: false,
        edit: true,
        values: ['__str__'],
        label: 'Job',
        type: 'related',
      },
      read_only: true,
      type: 'related',
    },
    {
      many: false,
      key: 'company_contact',
      endpoint: '/core/companycontacts/',
      collapsed: false,
      list: false,
      templateOptions: {
        add: true,
        delete: false,
        edit: true,
        values: ['__str__'],
        label: 'Recruitment Agent',
        type: 'related',
      },
      read_only: true,
      type: 'related',
    },
  ],
  list: {
    columns: [
      {
        name: 'company_contact',
        sort: true,
        sort_field: 'company_contact',
        content: [
          {
            endpoint: '/core/companycontacts/',
            type: 'related',
            field: 'company_contact',
          },
        ],
        label: 'Recruitment Agent',
      },
      {
        name: 'candidate_contact',
        sort: true,
        sort_field: 'candidate_contact',
        content: [
          {
            endpoint: '/candidate/candidatecontacts/',
            type: 'related',
            field: 'candidate_contact',
          },
        ],
        label: 'Candidate contact',
      },
      // {
      //   name: 'job',
      //   sort: true,
      //   sort_field: 'job',
      //   content: [
      //     { endpoint: '/hr/jobs/', type: 'related', field: 'job' }
      //   ],
      //   label: 'Job'
      // },
      {
        name: 'actions',
        content: [
          {
            action: 'editForm',
            endpoint: '/hr/favouritelists/{id}',
            icon: 'fa-pencil-alt',
            title: 'Edit',
            text_color: '#f0ad4e',
            type: 'button',
            field: 'id',
          },
          {
            action: 'delete',
            icon: 'fa-trash',
            title: 'Delete',
            type: 'button',
            field: 'id',
          },
        ],
        label: 'Actions',
        title: null,
      },
    ],
    list: 'favouritelist',
    editDisable: false,
    label: 'Favourite list',
    pagination_label: 'Favourite list',
    search_enabled: false,
  },
};

const formadd = [
  {
    endpoint: '/candidate/candidatecontacts/',
    read_only: false,
    templateOptions: {
      required: true,
      label: 'Candidate contact',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    searchParam: 'full_name',
    type: 'related',
    key: 'candidate_contact',
  },
  {
    endpoint: '/core/companies/',
    read_only: false,
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
    collapsed: false,
    type: 'related',
    key: 'company',
  },
  {
    endpoint: '/hr/jobsites/',
    read_only: false,
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
    endpoint: '/hr/jobs/',
    read_only: false,
    hide: true,
    templateOptions: {
      label: 'Job',
      add: true,
      delete: false,
      values: ['__str__', 'jobsite', 'customer_company'],
      type: 'related',
      edit: true,
    },
    query: {
      customer_company: '{company.id}',
      jobsite: '{jobsite.id}',
    },
    collapsed: false,
    type: 'related',
    key: 'job',
  },
  {
    endpoint: '/core/companycontacts/',
    templateOptions: {
      label: 'Client Contact',
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
    collapsed: false,
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

export const favouritelists = {
  list,
  formset,
  form,
  formadd,
  job,
};
