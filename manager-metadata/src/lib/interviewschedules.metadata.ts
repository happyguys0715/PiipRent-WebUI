const list = {
  list: {
    list: 'interviewschedule',
    label: 'interview schedule',
    columns: [
      {
        content: [
          {
            field: '__str__',
            type: 'static',
          },
        ],
        name: '__str__',
        label: 'Interview Schedule',
      },
    ],
    pagination_label: 'interview schedule',
    search_enabled: false,
    editDisable: false,
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Interview Schedule',
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
      label: 'Company contact',
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
    key: 'target_date_and_time',
    type: 'datepicker',
    templateOptions: {
      required: true,
      label: 'Target date',
      type: 'datetime',
    },
    read_only: false,
  },
  {
    key: 'category',
    type: 'select',
    templateOptions: {
      required: false,
      label: 'Category',
      type: 'select',
      options: [
        {
          value: 'first_phone_interview',
          label: 'First Phone Interview',
        },
        {
          value: 'second_phone_interview',
          label: 'Second Phone Interview',
        },
        {
          value: 'live_interview',
          label: 'Live interview',
        },
      ],
    },
    read_only: false,
  },
  {
    key: 'accepted',
    default: false,
    type: 'checkbox',
    templateOptions: {
      required: false,
      label: 'Accepted',
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
      label: 'Company contact',
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
    key: 'target_date_and_time',
    type: 'datepicker',
    templateOptions: {
      required: true,
      label: 'Target date',
      type: 'datetime',
    },
    read_only: false,
  },
  {
    key: 'category',
    type: 'select',
    templateOptions: {
      required: false,
      label: 'Category',
      type: 'select',
      options: [
        {
          value: 'first_phone_interview',
          label: 'First Phone Interview',
        },
        {
          value: 'second_phone_interview',
          label: 'Second Phone Interview',
        },
        {
          value: 'live_interview',
          label: 'Live interview',
        },
      ],
    },
    read_only: false,
  },
  {
    key: 'accepted',
    default: false,
    type: 'checkbox',
    templateOptions: {
      required: false,
      label: 'Accepted',
      type: 'checkbox',
    },
    read_only: false,
  },
];

export const interviewschedules = {
  list,
  form,
  formadd,
};
