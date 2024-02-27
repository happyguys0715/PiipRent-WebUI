import { createFilter, Type } from '@webui/metadata';
import { Endpoints } from '@webui/models';

const list = {
  list: {
    list: 'carrierlist',
    label: 'Carrier List',
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
        content: [{ field: 'target_date', type: 'datepicker' }],
        name: 'target_date',
        sort_field: 'target_date',
        label: 'Target Date',
        sort: true,
      },
      {
        content: [{ field: 'confirmed_available', type: 'checkbox' }],
        name: 'confirmed_available',
        sort_field: 'confirmed_available',
        label: 'Confirmed Available',
        sort: true,
      },
      {
        content: [
          {
            endpoint: '/hr/joboffers/',
            field: 'job_offer',
            type: 'related',
          },
        ],
        name: 'job_offer',
        sort_field: 'job_offer',
        label: 'Job offer',
        sort: true,
      },
    ],
    pagination_label: 'Carrier List',
    search_enabled: false,
    editDisable: false,
    filters: [
      createFilter(Type.Related, {
        key: 'candidate_contact',
        label: 'Candidate contact',
        endpoint: Endpoints.CandidateContact,
      }),
      createFilter(Type.Date, {
        key: 'target_date',
        label: 'Target date',
        yesterday: true,
        today: true,
        tomorrow: true,
      }),
    ],
    buttons: [
      {
        action: 'add_object',
        label: 'add',
      },
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
      endpoint: '/hr/joboffers/',
      read_only: true,
      templateOptions: {
        label: 'Job offer',
        add: true,
        delete: false,
        values: ['__str__'],
        type: 'related',
        edit: true,
      },
      collapsed: false,
      type: 'related',
      key: 'job_offer',
      many: false,
    },
    {
      key: 'target_date',
      type: 'datepicker',
      templateOptions: { required: false, label: 'Target Date', type: 'date' },
      read_only: true,
    },
    {
      key: 'confirmed_available',
      default: false,
      type: 'checkbox',
      templateOptions: {
        required: false,
        label: 'Confirmed Available',
        type: 'checkbox',
      },
      read_only: true,
    },
  ],
};

const formset = {
  fields: [
    {
      default: false,
      key: 'confirmed_available',
      read_only: false,
      templateOptions: {
        required: false,
        label: 'Confirmed Available',
        type: 'checkbox',
      },
      type: 'checkbox',
    },
    {
      many: false,
      key: 'job_offer',
      endpoint: '/hr/joboffers/',
      collapsed: false,
      list: false,
      templateOptions: {
        add: true,
        delete: false,
        edit: true,
        values: ['__str__'],
        label: 'Job offer',
        type: 'related',
      },
      read_only: true,
      type: 'related',
    },
    {
      key: 'target_date',
      read_only: false,
      templateOptions: { required: false, label: 'Target Date', type: 'date' },
      type: 'datepicker',
    },
  ],
  list: {
    columns: [
      {
        name: 'target_date',
        sort: true,
        sort_field: 'target_date',
        content: [{ type: 'datepicker', field: 'target_date' }],
        label: 'Target Date',
      },
      {
        name: 'confirmed_available',
        sort: true,
        sort_field: 'confirmed_available',
        content: [{ type: 'checkbox', field: 'confirmed_available' }],
        label: 'Confirmed Available',
      },
      {
        name: 'job_offer',
        sort: true,
        sort_field: 'job_offer',
        content: [
          {
            endpoint: '/hr/joboffers/',
            type: 'related',
            field: 'job_offer',
          },
        ],
        label: 'Job offer',
      },
      {
        name: 'actions',
        content: [
          {
            action: 'editForm',
            endpoint: '/hr/carrierlists/{id}',
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
    list: 'carrierlist',
    editDisable: false,
    label: 'Carrier List',
    pagination_label: 'Carrier List',
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
    type: 'related',
    key: 'candidate_contact',
  },
  {
    key: 'target_date',
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'Target Date',
      type: 'date',
    },
    read_only: true,
  },
  {
    key: 'confirmed_available',
    default: false,
    type: 'checkbox',
    templateOptions: {
      required: false,
      label: 'Confirmed Available',
      type: 'checkbox',
    },
    read_only: false,
  },
  {
    endpoint: '/skills/skills/',
    read_only: true,
    templateOptions: {
      label: 'Skill',
      add: true,
      delete: false,
      values: ['__str__', 'translations', 'name'],
      type: 'related',
      edit: true,
    },
    type: 'related',
    key: 'skill',
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

const formadd = [
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
    query: {
      active_states: 70,
    },
    type: 'related',
    key: 'candidate_contact',
  },
  {
    key: 'target_date',
    type: 'datepicker',
    templateOptions: { required: false, label: 'Target Date', type: 'date' },
    read_only: false,
  },
  {
    key: 'confirmed_available',
    default: true,
    type: 'checkbox',
    templateOptions: {
      required: false,
      label: 'Confirmed Available',
      type: 'checkbox',
    },
    read_only: false,
  },
  {
    endpoint: '/skills/skills/',
    read_only: true,
    templateOptions: {
      label: 'Skill',
      add: true,
      delete: false,
      values: ['__str__', 'translations', 'name'],
      type: 'related',
      edit: true,
    },
    query: {
      company: 'currentCompany',
    },
    type: 'related',
    key: 'skill',
  },
];

const candidatepool = {
  fields: [
    {
      key: 'target_date',
      read_only: false,
      templateOptions: { required: false, label: 'Target Date', type: 'date' },
      type: 'datepicker',
    },
  ],
  list: {
    columns: [
      {
        name: 'target_date',
        sort: true,
        sort_field: 'target_date',
        content: [{ type: 'datepicker', field: 'target_date' }],
        label: 'Target Date',
      },
      {
        name: 'confirmed_available',
        sort: true,
        sort_field: 'confirmed_available',
        content: [{ type: 'checkbox', field: 'confirmed_available' }],
        label: 'Confirmed Available',
      },
    ],
    list: 'carrierlist',
    editDisable: false,
    label: 'Carrier List',
    pagination_label: 'Carrier List',
    search_enabled: false,
  },
};

export const carrierlists = {
  list,
  formset,
  form,
  formadd,
  candidatepool,
};
