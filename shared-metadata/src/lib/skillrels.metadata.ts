import { createFilter, Form, Type } from '@webui/metadata';
import { Endpoints } from '@webui/models';

const list = {
  list: {
    list: 'skillrel',
    label: 'Candidate Skill',
    buttons: [],
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
            endpoint: '/skills/skills/',
            field: 'skill',
            type: 'text',
          },
        ],
        name: 'skill',
        sort_field: 'skill',
        label: 'Skill',
        sort: true,
      },
      {
        content: [{ field: 'score', type: 'input' }],
        name: 'score',
        sort_field: 'score',
        label: 'Score',
        sort: true,
      },
      {
        content: [
          {
            values: {
              0: 'Inexperienced',
              2592000: '1 Month',
              7776000: '3 Months',
              15552000: '6 Months',
              31536000: '1 Year',
              63072000: '2 Years',
              94608000: '3 Years',
              157680000: '5 Years or more',
            },
            field: 'prior_experience',
            type: 'select',
          },
        ],
        name: 'prior_experience',
        sort_field: 'prior_experience',
        label: 'Prior Experience',
        sort: true,
      },
    ],
    pagination_label: 'Candidate Skill',
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
      key: 'score',
      default: 0,
      type: 'input',
      templateOptions: {
        required: false,
        label: 'Score',
        type: 'number',
        min: 0,
        max: 32767,
      },
      read_only: true,
    },
    {
      list: false,
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
      collapsed: false,
      type: 'related',
      key: 'skill',
      many: false,
    },
    {
      key: 'prior_experience',
      type: 'select',
      templateOptions: {
        required: false,
        label: 'Prior Experience',
        options: [
          { value: 0, label: 'Inexperienced' },
          { value: 2592000, label: '1 Month' },
          { value: 7776000, label: '3 Months' },
          { value: 15552000, label: '6 Months' },
          { value: 31536000, label: '1 Year' },
          { value: 63072000, label: '2 Years' },
          { value: 94608000, label: '3 Years' },
          { value: 157680000, label: '5 Years or more' },
        ],
        type: 'select',
      },
      read_only: true,
    },
  ],
};

const formset = {
  fields: [
    {
      key: 'skill.name',
      read_only: false,
      templateOptions: {
        required: true,
        label: 'Skill',
        max: 63,
        type: 'text',
      },
      type: 'input',
    },
    {
      key: 'created_by',
      read_only: true,
      templateOptions: { required: false, label: 'Created by', type: 'static' },
      type: 'static',
    },
    {
      default: 0,
      key: 'score',
      read_only: false,
      templateOptions: {
        required: false,
        min: 0,
        label: 'Score',
        max: 32767,
        type: 'number',
      },
      type: 'input',
    },
    {
      key: 'id',
      templateOptions: {
        action: 'editForm',
        label: '',
        type: 'button',
        text: '',
      },
      type: 'button',
    },
    {
      key: 'hourly_rate',
      read_only: false,
      templateOptions: {
        required: true,
        display: '{currency}{field}/h',
        label: 'Skill Rate',
        type: 'static',
      },
      type: 'static',
    },
    {
      key: 'updated_at',
      read_only: true,
      templateOptions: {
        required: false,
        label: 'Updated at',
        type: 'datetime',
      },
      type: 'datepicker',
    },
    {
      key: 'prior_experience',
      read_only: false,
      templateOptions: {
        required: false,
        options: [
          { value: 0, label: 'Inexperienced' },
          { value: 2592000, label: '1 Month' },
          { value: 7776000, label: '3 Months' },
          { value: 15552000, label: '6 Months' },
          { value: 31536000, label: '1 Year' },
          { value: 63072000, label: '2 Years' },
          { value: 94608000, label: '3 Years' },
          { value: 157680000, label: '5 Years or more' },
        ],
        label: 'Prior Experience',
        type: 'select',
      },
      type: 'select',
    },
    {
      key: 'updated_by',
      read_only: true,
      templateOptions: { required: false, label: 'Updated by', type: 'static' },
      type: 'static',
    },
    {
      key: 'created_at',
      read_only: true,
      templateOptions: {
        required: false,
        label: 'Created at',
        type: 'datetime',
      },
      type: 'datepicker',
    },
  ],
  list: {
    columns: [
      {
        name: 'skill',
        sort_field: 'skill',
        title: null,
        sort: true,
        content: [{ label: 'Skill', type: 'text', field: 'skill.name' }],
        label: 'Skill',
        delim: null,
      },
      {
        name: 'score',
        sort: true,
        sort_field: 'score',
        content: [{ type: 'input', field: 'score' }],
        label: 'Score',
      },
      {
        name: 'prior_experience',
        sort: true,
        sort_field: 'prior_experience',
        content: [
          {
            values: {
              0: 'Inexperienced',
              2592000: '1 Month',
              7776000: '3 Months',
              15552000: '6 Months',
              31536000: '1 Year',
              63072000: '2 Years',
              94608000: '3 Years',
              157680000: '5 Years or more',
            },
            type: 'select',
            field: 'prior_experience',
          },
        ],
        label: 'Prior Experience',
      },
      {
        name: 'created',
        content: [
          { type: 'datepicker', field: 'created_at' },
          { type: 'static', field: 'created_by' },
        ],
        label: 'Created',
        title: null,
        delim: null,
      },
      {
        name: 'updated',
        content: [
          { type: 'datepicker', field: 'updated_at' },
          { type: 'static', field: 'updated_by' },
        ],
        label: 'Updated',
        title: null,
        delim: null,
      },
      {
        name: 'actions',
        content: [
          {
            action: 'editForm',
            endpoint: '/candidate/skillrels/{id}',
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
    list: 'skillrel',
    editDisable: false,
    label: 'Candidate Skill',
    pagination_label: 'Candidate Skill',
    search_enabled: false,
  },
};

const form = [
  {
    list: false,
    endpoint: '/candidate/candidatecontacts/',
    read_only: true,
    hide: true,
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
    endpoint: '/skills/skills/',
    read_only: true,
    key: 'skill',
    templateOptions: {
      required: true,
      label: 'Skill',
      add: true,
      delete: false,
      values: ['default_rate', '__str__', 'translations', 'name'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    query: { exclude: '{candidate_contact.id}', company: 'currentCompany' },
    many: false,
  },
  {
    key: 'score',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Score',
      max: 5,
      type: 'score',
      min: 0,
      noneValue: 'Please add skill rating',
    },
    read_only: false,
  },
  {
    key: 'prior_experience',
    type: 'select',
    templateOptions: {
      required: true,
      label: 'Prior Experience',
      type: 'select',
      options: [
        { value: 0, label: 'Inexperienced' },
        { value: 2592000, label: '1 Month' },
        { value: 7776000, label: '3 Months' },
        { value: 15552000, label: '6 Months' },
        { value: 31536000, label: '1 Year' },
        { value: 63072000, label: '2 Years' },
        { value: 94608000, label: '3 Years' },
        { value: 157680000, label: '5 Years or more' },
      ],
    },
    read_only: false,
  },
  {
    endpoint: Endpoints.SkillRateCoefficient,
    type: 'list',
    templateOptions: {
      label: 'Candidate Skill Modifier',
      type: 'list',
      text: 'Candidate Skill Modifier',
      add_label: 'Add',
    },
    collapsed: false,
    translateKey: 'skillratecoefficientrels',
    prefilled: {
      skill_rel: '{id}',
    },
    query: {
      skill_rel: '{id}',
    },
  },
  {
    endpoint: Endpoints.SkillRate,
    type: 'list',
    templateOptions: {
      label: 'Skill Rate',
      type: 'list',
      text: 'Skill Rate',
      add_label: 'Add',
    },
    translateKey: 'skillrates',
    collapsed: false,
    prefilled: {
      skill_rel: '{id}',
      skill: '{skill.id}',
    },
    query: {
      skill_rel: '{id}',
    },
  },
];

const formadd = [
  {
    list: false,
    endpoint: '/candidate/candidatecontacts/',
    read_only: true,
    hide: true,
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
    endpoint: '/skills/skills/',
    read_only: false,
    key: 'skill',
    templateOptions: {
      required: true,
      label: 'Skill',
      add: true,
      delete: false,
      values: ['default_rate', '__str__', 'translations', 'name'],
      type: 'related',
      edit: true,
      display: '{name.name}',
    },
    collapsed: false,
    type: 'related',
    query: { exclude: '{candidate_contact.id}', company: 'currentCompany' },
    many: false,
  },
  {
    key: 'score',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Score',
      max: 5,
      type: 'score',
      min: 0,
      noneValue: 'Please add skill rating',
    },
    read_only: false,
  },
  {
    key: 'prior_experience',
    type: 'select',
    templateOptions: {
      required: true,
      label: 'Prior Experience',
      type: 'select',
      options: [
        { value: 0, label: 'Inexperienced' },
        { value: 2592000, label: '1 Month' },
        { value: 7776000, label: '3 Months' },
        { value: 15552000, label: '6 Months' },
        { value: 31536000, label: '1 Year' },
        { value: 63072000, label: '2 Years' },
        { value: 94608000, label: '3 Years' },
        { value: 157680000, label: '5 Years or more' },
      ],
    },
    read_only: false,
  },
  new Form.related.element('skillrates', 'Skill Rate', Endpoints.SkillRate)
    .setPrefilledFields({
      skill_rel: '{id}',
      skill: '{skill.id}',
    })
    .setQuery({
      skill_rel: '{id}',
    })
    .setTranslateKey('skillrates')
    .setDelay()
    .setList()
    .setShowIfRule(['skill.id'])
    .setRequired(),
];

const profile = {
  fields: [
    {
      key: 'skill.name',
      read_only: false,
      templateOptions: {
        required: true,
        label: 'Skill',
        max: 63,
        type: 'text',
      },
      type: 'input',
    },
    {
      key: 'created_by',
      read_only: true,
      templateOptions: { required: false, label: 'Created by', type: 'static' },
      type: 'static',
    },
    {
      default: 0,
      key: 'score',
      read_only: false,
      templateOptions: {
        required: false,
        min: 0,
        label: 'Score',
        max: 32767,
        type: 'number',
      },
      type: 'input',
    },
    {
      key: 'id',
      templateOptions: {
        action: 'editForm',
        label: '',
        type: 'button',
        text: '',
      },
      type: 'button',
    },
    {
      key: 'hourly_rate',
      read_only: false,
      templateOptions: {
        required: true,
        display: '{currency}{field}/h',
        label: 'Skill Rate',
        type: 'static',
      },
      type: 'static',
    },
    {
      key: 'updated_at',
      read_only: true,
      templateOptions: {
        required: false,
        label: 'Updated at',
        type: 'datetime',
      },
      type: 'datepicker',
    },
    {
      key: 'prior_experience',
      read_only: false,
      templateOptions: {
        required: false,
        options: [
          { value: 0, label: 'Inexperienced' },
          { value: 2592000, label: '1 Month' },
          { value: 7776000, label: '3 Months' },
          { value: 15552000, label: '6 Months' },
          { value: 31536000, label: '1 Year' },
          { value: 63072000, label: '2 Years' },
          { value: 94608000, label: '3 Years' },
          { value: 157680000, label: '5 Years or more' },
        ],
        label: 'Prior Experience',
        type: 'select',
      },
      type: 'select',
    },
    {
      key: 'updated_by',
      read_only: true,
      templateOptions: { required: false, label: 'Updated by', type: 'static' },
      type: 'static',
    },
    {
      key: 'created_at',
      read_only: true,
      templateOptions: {
        required: false,
        label: 'Created at',
        type: 'datetime',
      },
      type: 'datepicker',
    },
  ],
  list: {
    columns: [
      {
        name: 'skill',
        sort_field: 'skill',
        title: null,
        sort: true,
        content: [{ label: 'Skill', type: 'text', field: 'skill.name' }],
        label: 'Skill',
        delim: null,
      },
      {
        name: 'score',
        sort: true,
        sort_field: 'score',
        content: [
          {
            type: 'skills',
            field: 'score',
            stars: true,
          },
        ],
        label: 'Score',
      },
      {
        name: 'prior_experience',
        sort: true,
        sort_field: 'prior_experience',
        content: [
          {
            values: {
              0: 'Inexperienced',
              2592000: '1 Month',
              7776000: '3 Months',
              15552000: '6 Months',
              31536000: '1 Year',
              63072000: '2 Years',
              94608000: '3 Years',
              157680000: '5 Years or more',
            },
            type: 'select',
            field: 'prior_experience',
          },
        ],
        label: 'Prior Experience',
      },
      // {
      //   name: 'actions',
      //   content: [
      //     {
      //       action: 'editForm',
      //       endpoint: '/candidate/skillrels/{id}',
      //       icon: 'fa-pencil',
      //       title: 'Edit',
      //       text_color: '#f0ad4e',
      //       type: 'button',
      //       field: 'id'
      //     },
      //     {
      //       action: 'delete',
      //       icon: 'fa-times-circle',
      //       title: 'Delete',
      //       text_color: '#f32700',
      //       type: 'button',
      //       field: 'id'
      //     }
      //   ],
      //   label: 'Actions',
      //   title: null,
      //   delim: null
      // }
    ],
    list: 'skillrel',
    editDisable: false,
    label: 'Candidate Skill',
    pagination_label: 'Candidate Skill',
    search_enabled: false,
  },
};

const candidatepool = {
  fields: [
    {
      key: 'skill.name',
      read_only: false,
      templateOptions: {
        required: true,
        label: 'Skill',
        max: 63,
        type: 'text',
      },
      type: 'input',
    },
    {
      default: 0,
      key: 'score',
      read_only: false,
      templateOptions: {
        required: false,
        min: 0,
        label: 'Score',
        max: 32767,
        type: 'number',
      },
      type: 'input',
    },
    {
      key: 'prior_experience',
      read_only: false,
      templateOptions: {
        required: false,
        options: [
          { value: 0, label: 'Inexperienced' },
          { value: 2592000, label: '1 Month' },
          { value: 7776000, label: '3 Months' },
          { value: 15552000, label: '6 Months' },
          { value: 31536000, label: '1 Year' },
          { value: 63072000, label: '2 Years' },
          { value: 94608000, label: '3 Years' },
          { value: 157680000, label: '5 Years or more' },
        ],
        label: 'Prior Experience',
        type: 'select',
      },
      type: 'select',
    },
  ],
  list: {
    columns: [
      {
        name: 'skill',
        sort_field: 'skill',
        title: null,
        sort: true,
        content: [{ label: 'Skill', type: 'text', field: 'skill.name' }],
        label: 'Skill',
        delim: null,
      },
      {
        name: 'score',
        sort: true,
        sort_field: 'score',
        content: [{ type: 'input', field: 'score' }],
        label: 'Score',
      },
      {
        name: 'prior_experience',
        sort: true,
        sort_field: 'prior_experience',
        content: [
          {
            values: {
              0: 'Inexperienced',
              2592000: '1 Month',
              7776000: '3 Months',
              15552000: '6 Months',
              31536000: '1 Year',
              63072000: '2 Years',
              94608000: '3 Years',
              157680000: '5 Years or more',
            },
            type: 'select',
            field: 'prior_experience',
          },
        ],
        label: 'Prior Experience',
      },
    ],
    list: 'skillrel',
    editDisable: true,
    label: 'Candidate Skill',
    pagination_label: 'Candidate Skill',
    search_enabled: false,
  },
};

export const skillrels = {
  list,
  formset,
  form,
  formadd,
  profile,
  candidatepool,
};
