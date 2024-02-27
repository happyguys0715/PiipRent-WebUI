import { createFilter, Type, List } from '@webui/metadata';
import { Endpoints } from '@webui/models';

const listColumns = {
  verification_evidence: {
    name: 'verification_evidence',
    sort_field: 'verification_evidence',
    title: null,
    sort: true,
    content: [
      new List.picture.element('verification_evidence', { file: true })
        .setEmptyValue('not_verify')
        .setDisplay('download'),
    ],
    label: 'Verification Evidence',
    delim: null,
  },
};

const list = {
  list: {
    list: 'tagrel',
    label: 'Tag Relationship',
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
            endpoint: '/core/tags/',
            field: 'tag',
            type: 'text',
          },
        ],
        name: 'tag',
        sort_field: 'tag',
        label: 'Tag',
        sort: true,
      },
      {
        content: [
          {
            endpoint: '/core/companycontacts/',
            field: 'verified_by',
            type: 'related',
          },
        ],
        name: 'verified_by',
        sort_field: 'verified_by',
        label: 'Verified by',
        sort: true,
      },
      {
        content: [{ field: 'verification_evidence', type: 'input' }],
        name: 'verification_evidence',
        sort_field: 'verification_evidence',
        label: 'Verification Evidence',
        sort: true,
      },
    ],
    pagination_label: 'Tag Relationship',
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
        label: 'Verified by',
        add: true,
        delete: false,
        values: ['__str__'],
        type: 'related',
        edit: true,
      },
      collapsed: false,
      type: 'related',
      key: 'verified_by',
      many: false,
    },
    {
      key: 'verification_evidence',
      type: 'input',
      templateOptions: {
        required: false,
        label: 'Verification Evidence',
        type: 'text',
        max: 100,
      },
      read_only: true,
    },
    {
      list: false,
      endpoint: '/core/tags/',
      read_only: true,
      templateOptions: {
        label: 'Tag',
        add: true,
        delete: false,
        values: ['__str__', 'owner', 'translation'],
        type: 'related',
      },
      collapsed: false,
      type: 'related',
      key: 'tag',
      many: false,
    },
  ],
};

const formset = {
  fields: [
    {
      many: false,
      key: 'tag',
      endpoint: '/core/tags/',
      collapsed: false,
      list: false,
      templateOptions: {
        add: true,
        delete: false,
        edit: true,
        values: ['__str__', 'owner', 'translation'],
        label: 'Tag',
        type: 'related',
      },
      read_only: false,
      type: 'related',
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
      key: 'verification_evidence',
      read_only: false,
      templateOptions: {
        required: false,
        label: 'Verification Evidence',
        max: 100,
        type: 'picture',
      },
      type: 'input',
    },
    {
      many: false,
      key: 'verified_by',
      endpoint: '/core/companycontacts/',
      collapsed: false,
      list: false,
      templateOptions: {
        add: true,
        delete: false,
        edit: true,
        values: ['__str__'],
        label: 'Verified by',
        type: 'related',
      },
      read_only: true,
      type: 'related',
    },
  ],
  list: {
    columns: [
      {
        name: 'tag',
        sort: true,
        sort_field: 'tag',
        content: [
          {
            endpoint: '/core/tags/',
            type: 'text',
            field: 'tag',
          },
        ],
        label: 'Tag',
      },
      {
        name: 'verified_by',
        sort: true,
        sort_field: 'verified_by',
        content: [
          {
            endpoint: '/core/companycontacts/',
            type: 'related',
            field: 'verified_by.contact',
          },
          {
            endpoint: '/core/companycontacts/',
            type: 'text',
            description: ' ',
            field: 'verified_by.job_title',
          },
        ],
        label: 'Verified by',
      },
      listColumns['verification_evidence'],
      {
        name: 'actions',
        content: [
          {
            action: 'editForm',
            endpoint: '/candidate/tagrels/{id}',
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
    list: 'tagrel',
    editDisable: false,
    label: 'Tag Relationship',
    pagination_label: 'Tag Relationship',
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
    endpoint: '/core/tags/',
    read_only: false,
    key: 'tag',
    templateOptions: {
      label: 'Tag',
      add: true,
      delete: false,
      values: ['__str__', 'owner', 'translation'],
      type: 'related',
    },
    collapsed: false,
    type: 'related',
    query: { exclude: '{candidate_contact.id}' },
    many: false,
  },
  {
    key: 'verification_evidence',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Verification Evidence',
      max: 100,
      type: 'picture',
    },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/core/companycontacts/',
    read_only: true,
    templateOptions: {
      label: 'Verified by',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    default: '{session.contact.contact_id}',
    type: 'related',
    key: 'verified_by',
    many: false,
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
    endpoint: '/core/tags/',
    read_only: false,
    key: 'tag',
    templateOptions: {
      label: 'Tag',
      add: true,
      delete: false,
      values: [
        '__str__',
        'evidence_required_for_approval',
        'owner',
        'translation',
      ],
      type: 'related',
      dropdownCount: 9,
    },
    smallModal: true,
    collapsed: false,
    type: 'related',
    query: { exclude: '{candidate_contact.id}' },
    many: false,
  },
  {
    key: 'verification_evidence',
    type: 'input',
    showIf: ['tag.id', { 'tag.evidence_required_for_approval': true }],
    templateOptions: {
      required: false,
      label: 'Verification Evidence',
      max: 100,
      type: 'picture',
    },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/core/companycontacts/',
    read_only: true,
    templateOptions: {
      label: 'Verified by',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    default: '{session.contact.contact_id}',
    type: 'related',
    key: 'verified_by',
    many: false,
  },
];

const profile = {
  fields: [
    {
      many: false,
      key: 'tag',
      endpoint: '/core/tags/',
      collapsed: false,
      list: false,
      templateOptions: {
        add: true,
        delete: false,
        edit: true,
        values: ['__str__', 'owner', 'translation'],
        label: 'Tag',
        type: 'related',
      },
      read_only: false,
      type: 'related',
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
      key: 'verification_evidence',
      read_only: false,
      templateOptions: {
        required: false,
        label: 'Verification Evidence',
        max: 100,
        type: 'picture',
      },
      type: 'input',
    },
    {
      many: false,
      key: 'verified_by',
      endpoint: '/core/companycontacts/',
      collapsed: false,
      list: false,
      templateOptions: {
        add: true,
        delete: false,
        edit: true,
        values: ['__str__'],
        label: 'Verified by',
        type: 'related',
      },
      read_only: true,
      type: 'related',
    },
  ],
  list: {
    columns: [
      {
        name: 'tag',
        sort: true,
        sort_field: 'tag',
        content: [
          {
            endpoint: '/core/tags/',
            type: 'text',
            field: 'tag',
          },
        ],
        label: 'Tag',
      },
      {
        name: 'verified_by',
        sort: true,
        sort_field: 'verified_by',
        content: [
          {
            endpoint: '/core/companycontacts/',
            type: 'related',
            field: 'verified_by.contact',
          },
          {
            endpoint: '/core/companycontacts/',
            type: 'text',
            description: ' ',
            field: 'verified_by.job_title',
          },
        ],
        label: 'Verified by',
      },
      listColumns['verification_evidence'],
      // {
      //   name: 'actions',
      //   content: [
      //     {
      //       action: 'editForm',
      //       endpoint: '/candidate/tagrels/{id}',
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
    list: 'tagrel',
    editDisable: false,
    label: 'Tag Relationship',
    pagination_label: 'Tag Relationship',
    search_enabled: false,
  },
};

const candidatepool = {
  fields: [
    {
      many: false,
      key: 'tag',
      endpoint: '/core/tags/',
      collapsed: false,
      list: false,
      templateOptions: {
        add: true,
        delete: false,
        edit: true,
        values: ['__str__', 'owner', 'translation'],
        label: 'Tag',
        type: 'related',
      },
      read_only: false,
      type: 'related',
    },
  ],
  list: {
    columns: [
      {
        name: 'tag',
        sort: true,
        sort_field: 'tag',
        content: [
          {
            endpoint: '/core/tags/',
            type: 'text',
            field: 'tag',
          },
        ],
        label: 'Tag',
      },
    ],
    list: 'tagrel',
    editDisable: true,
    label: 'Tag Relationship',
    pagination_label: 'Tag Relationship',
    search_enabled: false,
  },
};

export const tagrels = {
  list,
  formset,
  form,
  formadd,
  profile,
  candidatepool,
};
