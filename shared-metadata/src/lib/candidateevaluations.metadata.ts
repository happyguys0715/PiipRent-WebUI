import { createFilter, Type } from '@webui/metadata';
import { Endpoints } from '@webui/models';

const formFields = {
  'reference_timesheet.shift_started_at': {
    key: 'reference_timesheet.shift_started_at',
    read_only: false,
    templateOptions: {
      required: false,
      listLabel: 'start',
      inlineLabel: true,
      label: 'Evaluated at',
      type: 'datetime',
    },
    type: 'datepicker',
  },
  'reference_timesheet.shift_ended_at': {
    key: 'reference_timesheet.shift_ended_at',
    read_only: false,
    templateOptions: {
      required: false,
      listLabel: 'end',
      inlineLabel: true,
      label: 'Evaluated at',
      type: 'datetime',
    },
    type: 'datepicker',
  },
};

const listColumns = {
  jobsite: {
    name: 'jobsite',
    sort: true,
    sort_field: 'jobsi',
    content: [
      {
        type: 'text',
        field: 'jobsite.name',
      },
      {
        type: 'text',
        description: ' ',
        field: 'position.name',
      },
    ],
    label: 'Jobsite/Position',
  },
  supervisor: {
    name: 'supervisor',
    sort: true,
    sort_field: 'supervisor',
    content: [
      {
        type: 'text',
        field: 'supervisor.contact.name',
      },
      {
        type: 'text',
        description: ' ',
        field: 'supervisor.job_title',
      },
    ],
    label: 'Supervisor',
  },
};

const list = {
  list: {
    list: 'candidateevaluation',
    label: 'Candidate Evaluation',
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
            field: 'supervisor',
            type: 'related',
          },
        ],
        name: 'supervisor',
        sort_field: 'supervisor',
        label: 'Supervisor',
        sort: true,
      },
      {
        content: [{ field: 'evaluated_at', type: 'datepicker' }],
        name: 'evaluated_at',
        sort_field: 'evaluated_at',
        label: 'Evaluated at',
        sort: true,
      },
    ],
    pagination_label: 'Candidate Evaluation',
    search_enabled: false,
    editDisable: false,
    filters: [
      createFilter(Type.Related, {
        key: 'candidate_contact',
        label: 'Candidate contact',
        endpoint: Endpoints.CandidateContact,
      }),
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
      endpoint: '/core/companycontacts/',
      read_only: true,
      templateOptions: {
        label: 'Supervisor',
        add: true,
        delete: false,
        values: ['__str__'],
        type: 'related',
        edit: true,
      },
      collapsed: false,
      type: 'related',
      key: 'supervisor',
      many: false,
    },
    {
      key: 'evaluated_at',
      type: 'datepicker',
      templateOptions: {
        required: false,
        label: 'Evaluated at',
        type: 'datetime',
      },
      read_only: true,
    },
  ],
};

const formset = {
  fields: [
    {
      key: 'had_ppe_and_tickets',
      read_only: false,
      templateOptions: {
        required: false,
        values: { false: 'times', true: 'check', null: 'minus-circle' },
        label: 'Had ppe and tickets',
        type: 'icon',
      },
      type: 'checkbox',
    },
    {
      key: 'met_expectations',
      read_only: false,
      templateOptions: {
        required: false,
        values: { false: 'times', true: 'check', null: 'minus-circle' },
        label: 'Met expectations',
        type: 'icon',
      },
      type: 'checkbox',
    },
    {
      key: 'was_motivated',
      read_only: false,
      templateOptions: {
        required: false,
        values: { false: 'times', true: 'check', null: 'minus-circle' },
        label: 'Was motivated',
        type: 'icon',
      },
      type: 'checkbox',
    },
    {
      key: 'representation',
      read_only: false,
      templateOptions: {
        required: false,
        values: { false: 'times', true: 'check', null: 'minus-circle' },
        label: 'Representation',
        type: 'icon',
      },
      type: 'checkbox',
    },
    {
      key: 'reference_timesheet',
      templateOptions: { link: null, label: '', type: 'link', text: '' },
      type: 'link',
    },
    {
      key: 'evaluated_at',
      read_only: true,
      templateOptions: {
        required: false,
        label: 'Evaluated at',
        type: 'datetime',
      },
      type: 'datepicker',
    },
    formFields['reference_timesheet.shift_started_at'],
    formFields['reference_timesheet.shift_ended_at'],
    {
      key: 'was_on_time',
      read_only: false,
      templateOptions: {
        required: false,
        values: { false: 'times', true: 'check', null: 'minus-circle' },
        label: 'Was on time',
        type: 'icon',
      },
      type: 'checkbox',
    },
    {
      many: false,
      key: 'supervisor',
      endpoint: '/core/companycontacts/',
      collapsed: false,
      list: false,
      templateOptions: {
        add: true,
        delete: false,
        edit: true,
        values: ['__str__'],
        label: 'Supervisor',
        type: 'related',
      },
      read_only: true,
      type: 'related',
    },
    {
      default: 0,
      key: 'evaluation_score',
      read_only: false,
      templateOptions: {
        required: false,
        label: 'Level of communication',
        type: 'skills',
        options: [
          { value: 0, label: 'Not Rated' },
          { value: 1, label: 'Impossible' },
          { value: 2, label: 'Hard' },
          { value: 3, label: 'Decent' },
          { value: 4, label: 'Good' },
          { value: 5, label: 'Excellent' },
        ],
      },
      type: 'skills',
    },
  ],
  list: {
    columns: [
      listColumns['jobsite'],
      listColumns.supervisor,
      {
        name: 'evaluation_score',
        sort: true,
        sort_field: 'evaluation_score',
        label: 'Evaluation',
        content: [
          {
            display: 'Score',
            type: 'skills',
            field: 'evaluation_score',
          },
        ],
      },
      {
        name: 'evaluated_at',
        sort: true,
        sort_field: 'evaluated_at',
        content: [{ type: 'datepicker', field: 'evaluated_at' }],
        label: 'Evaluated at',
      },
      {
        name: 'reference_timesheet',
        sort_field: 'reference_timesheet',
        title: null,
        sort: true,
        content: [
          {
            text: 'common.show-timesheet',
            color: 'primary',
            endpoint: '/hr/timesheets/{reference_timesheet.id}',
            label: 'reference_timesheet',
            type: 'link',
            field: 'reference_timesheet',
          },
          {
            type: 'datepicker',
            listLabel: 'start',
            field: 'reference_timesheet.shift_started_at',
          },
          {
            type: 'datepicker',
            listLabel: 'end',
            field: 'reference_timesheet.shift_ended_at',
          },
        ],
        label: 'Related timesheet',
        delim: null,
      },
    ],
    list: 'candidateevaluation',
    editDisable: false,
    label: 'Candidate Evaluation',
    pagination_label: 'Candidate Evaluation',
    search_enabled: false,
  },
};

const profile = {
  fields: [
    {
      key: 'had_ppe_and_tickets',
      read_only: false,
      templateOptions: {
        required: false,
        values: { false: 'times', true: 'check', null: 'minus-circle' },
        label: 'Had ppe and tickets',
        type: 'icon',
      },
      type: 'checkbox',
    },
    {
      key: 'met_expectations',
      read_only: false,
      templateOptions: {
        required: false,
        values: { false: 'times', true: 'check', null: 'minus-circle' },
        label: 'Met expectations',
        type: 'icon',
      },
      type: 'checkbox',
    },
    {
      key: 'was_motivated',
      read_only: false,
      templateOptions: {
        required: false,
        values: { false: 'times', true: 'check', null: 'minus-circle' },
        label: 'Was motivated',
        type: 'icon',
      },
      type: 'checkbox',
    },
    {
      key: 'representation',
      read_only: false,
      templateOptions: {
        required: false,
        values: { false: 'times', true: 'check', null: 'minus-circle' },
        label: 'Representation',
        type: 'icon',
      },
      type: 'checkbox',
    },
    {
      key: 'reference_timesheet',
      templateOptions: { link: null, label: '', type: 'link', text: '' },
      type: 'link',
    },
    {
      key: 'evaluated_at',
      read_only: true,
      templateOptions: {
        required: false,
        label: 'Evaluated at',
        type: 'datetime',
      },
      type: 'datepicker',
    },
    formFields['reference_timesheet.shift_started_at'],
    formFields['reference_timesheet.shift_ended_at'],
    {
      key: 'was_on_time',
      read_only: false,
      templateOptions: {
        required: false,
        values: { false: 'times', true: 'check', null: 'minus-circle' },
        label: 'Was on time',
        type: 'icon',
      },
      type: 'checkbox',
    },
    {
      many: false,
      key: 'supervisor',
      endpoint: '/core/companycontacts/',
      collapsed: false,
      list: false,
      templateOptions: {
        add: true,
        delete: false,
        edit: true,
        values: ['__str__'],
        label: 'Supervisor',
        type: 'related',
      },
      read_only: true,
      type: 'related',
    },
    {
      default: 0,
      key: 'evaluation_score',
      read_only: false,
      templateOptions: {
        required: false,
        label: 'Level of communication',
        type: 'skills',
        options: [
          { value: 0, label: 'Not Rated' },
          { value: 1, label: 'Impossible' },
          { value: 2, label: 'Hard' },
          { value: 3, label: 'Decent' },
          { value: 4, label: 'Good' },
          { value: 5, label: 'Excellent' },
        ],
      },
      type: 'skills',
    },
  ],
  list: {
    columns: [
      listColumns['jobsite'],
      listColumns.supervisor,
      {
        name: 'evaluation_score',
        sort: true,
        sort_field: 'evaluation_score',
        label: 'Evaluation',
        content: [
          {
            display: 'Score',
            type: 'skills',
            field: 'evaluation_score',
          },
        ],
      },
      {
        name: 'evaluated_at',
        sort: true,
        sort_field: 'evaluated_at',
        content: [{ type: 'datepicker', field: 'evaluated_at' }],
        label: 'Evaluated at',
      },
      {
        name: 'reference_timesheet',
        sort_field: 'reference_timesheet',
        title: null,
        sort: true,
        content: [
          // TODO: Fix button
          // {
          //   text: 'Show timesheet',
          //   color: 'primary',
          //   endpoint: '/hr/timesheets/{reference_timesheet.id}',
          //   label: 'reference_timesheet',
          //   display: 'Show timesheet',
          //   type: 'button',
          //   field: 'reference_timesheet'
          // },
          {
            type: 'datepicker',
            listLabel: 'start',
            field: 'reference_timesheet.shift_started_at',
          },
          {
            type: 'datepicker',
            listLabel: 'end',
            field: 'reference_timesheet.shift_ended_at',
          },
        ],
        label: 'Related timesheet',
        delim: null,
      },
    ],
    list: 'candidateevaluation',
    editDisable: false,
    label: 'Candidate Evaluation',
    pagination_label: 'Candidate Evaluation',
    search_enabled: false,
  },
};

const form = [
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
    endpoint: '/core/companycontacts/',
    read_only: true,
    templateOptions: {
      label: 'Supervisor',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'supervisor',
    many: false,
  },
  {
    key: 'evaluated_at',
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'Evaluated at',
      type: 'datetime',
    },
    read_only: false,
  },
  {
    key: 'evaluation_score',
    default: 0,
    type: 'select',
    templateOptions: {
      required: false,
      label: 'Level of Communication',
      type: 'select',
      options: [
        { value: 0, label: 'Not Rated' },
        { value: 1, label: 'Impossible' },
        { value: 2, label: 'Hard' },
        { value: 3, label: 'Decent' },
        { value: 4, label: 'Good' },
        { value: 5, label: 'Excellent' },
      ],
    },
    read_only: false,
  },
  {
    key: 'was_on_time',
    type: 'checkbox',
    templateOptions: {
      required: false,
      label: 'Was on time?',
      type: 'checkbox',
    },
    read_only: false,
  },
  {
    key: 'was_motivated',
    type: 'checkbox',
    templateOptions: {
      required: false,
      label: 'Was motivated?',
      type: 'checkbox',
    },
    read_only: false,
  },
  {
    key: 'had_ppe_and_tickets',
    type: 'checkbox',
    templateOptions: {
      required: false,
      label: 'Had PPE and tickets?',
      type: 'checkbox',
    },
    read_only: false,
  },
  {
    key: 'met_expectations',
    type: 'checkbox',
    templateOptions: {
      required: false,
      label: 'Met Your expectations?',
      type: 'checkbox',
    },
    read_only: false,
  },
  {
    key: 'representation',
    type: 'checkbox',
    templateOptions: {
      required: false,
      label: 'Was clean, well presented?',
      type: 'checkbox',
    },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/hr/timesheets/',
    read_only: true,
    templateOptions: {
      label: 'Reference timesheet',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'reference_timesheet',
    many: false,
  },
];

const formadd = [
  {
    list: false,
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
    many: false,
  },
  {
    list: false,
    endpoint: '/core/companycontacts/',
    read_only: true,
    templateOptions: {
      label: 'Supervisor',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    type: 'related',
    key: 'supervisor',
    many: false,
  },
  {
    key: 'evaluated_at',
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'Evaluated at',
      type: 'datetime',
    },
    read_only: false,
  },
  {
    key: 'evaluation_score',
    default: 0,
    type: 'select',
    templateOptions: {
      required: false,
      label: 'Level of Communication',
      type: 'select',
      options: [
        { value: 0, label: 'Not Rated' },
        { value: 1, label: 'Impossible' },
        { value: 2, label: 'Hard' },
        { value: 3, label: 'Decent' },
        { value: 4, label: 'Good' },
        { value: 5, label: 'Excellent' },
      ],
    },
    read_only: false,
  },
  {
    key: 'was_on_time',
    type: 'checkbox',
    templateOptions: {
      required: false,
      label: 'Was on time?',
      type: 'checkbox',
    },
    read_only: false,
  },
  {
    key: 'was_motivated',
    type: 'checkbox',
    templateOptions: {
      required: false,
      label: 'Was motivated?',
      type: 'checkbox',
    },
    read_only: false,
  },
  {
    key: 'had_ppe_and_tickets',
    type: 'checkbox',
    templateOptions: {
      required: false,
      label: 'Had PPE and tickets?',
      type: 'checkbox',
    },
    read_only: false,
  },
  {
    key: 'met_expectations',
    type: 'checkbox',
    templateOptions: {
      required: false,
      label: 'Met Your expectations?',
      type: 'checkbox',
    },
    read_only: false,
  },
  {
    key: 'representation',
    type: 'checkbox',
    templateOptions: {
      required: false,
      label: 'Was clean, well presented?',
      type: 'checkbox',
    },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/hr/timesheets/',
    read_only: true,
    templateOptions: {
      label: 'Reference timesheet',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'reference_timesheet',
    many: false,
  },
];

const candidatepool = {
  fields: [
    {
      key: 'evaluated_at',
      read_only: true,
      templateOptions: {
        required: false,
        label: 'Evaluated at',
        type: 'datetime',
      },
      type: 'datepicker',
    },
    {
      default: 0,
      key: 'evaluation_score',
      read_only: false,
      templateOptions: {
        required: false,
        label: 'Level of communication',
        type: 'skills',
        options: [
          { value: 0, label: 'Not Rated' },
          { value: 1, label: 'Impossible' },
          { value: 2, label: 'Hard' },
          { value: 3, label: 'Decent' },
          { value: 4, label: 'Good' },
          { value: 5, label: 'Excellent' },
        ],
      },
      type: 'skills',
    },
  ],
  list: {
    columns: [
      {
        name: 'jobsite',
        sort: true,
        sort_field: 'jobsi',
        content: [
          {
            type: 'text',
            field: 'position.name',
          },
        ],
        label: 'Position',
      },
      {
        name: 'evaluation_score',
        sort: true,
        sort_field: 'evaluation_score',
        label: 'Evaluation',
        content: [
          {
            display: 'Score',
            type: 'skills',
            field: 'evaluation_score',
          },
        ],
      },
      {
        name: 'evaluated_at',
        sort: true,
        sort_field: 'evaluated_at',
        content: [{ type: 'datepicker', field: 'evaluated_at' }],
        label: 'Evaluated at',
      },
    ],
    list: 'candidateevaluation',
    editDisable: true,
    label: 'Candidate Evaluation',
    pagination_label: 'Candidate Evaluation',
    search_enabled: false,
  },
};

export const candidateevaluations = {
  list,
  formset,
  profile,
  form,
  formadd,
  candidatepool,
};
