const list = {
  list: {
    list: 'shiftdate',
    label: 'Shift Date',
    columns: [
      {
        content: [{ field: '__str__', type: 'static' }],
        name: '__str__',
        label: 'Shift Date',
      },
    ],
    pagination_label: 'Shift Date',
    search_enabled: false,
    editDisable: false,
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: { required: false, label: 'Shift Date', type: 'static' },
      read_only: true,
    },
  ],
};

const form = [
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
  {
    key: 'shift_date',
    type: 'datepicker',
    templateOptions: { required: true, label: 'Shift date', type: 'date' },
    read_only: true,
  },
  {
    prefilled: {
      date: '{id}',
    },
    list: true,
    send: false,
    key: 'shifts',
    endpoint: '/hr/shifts/',
    delay: true,
    templateOptions: {
      delete: true,
      label: 'Shifts',
      type: 'related',
      text: 'Shifts',
      add: true,
      edit: true,
    },
    metadata_query: {
      editable_type: 'shift_date',
    },
    showIf: ['shift_date'],
    defaultData: {
      date__shift_date_0: '{shift_date}',
      date__shift_date_1: '{shift_date}',
      job: '{job.id}',
    },
    type: 'related',
  },
];

const formadd = [
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
  {
    key: 'shift_date',
    type: 'datepicker',
    templateOptions: { required: true, label: 'Shift date', type: 'date' },
    read_only: false,
  },
];

const jobAdd = [
  {
    key: 'default_shift_starting_time',
    type: 'datepicker',
    send: false,
    hide: true,
    templateOptions: {
      required: false,
      label: 'Default Shift Starting Time',
      type: 'time',
    },
    read_only: false,
  },
  {
    key: 'workers',
    type: 'input',
    send: false,
    hide: true,
    templateOptions: {
      required: false,
      label: 'Workers',
      type: 'number',
    },
    read_only: false,
  },
  {
    hide: true,
    endpoint: '/skills/skills/',
    read_only: true,
    templateOptions: {
      label: 'Skill',
      add: true,
      delete: false,
      values: [
        '__str__',
        'upper_rate_limit',
        'lower_rate_limit',
        'default_rate',
        'translations',
        'name',
      ],
      type: 'related',
      edit: true,
    },
    type: 'related',
    key: 'skill',
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
      values: ['__str__', 'default_shift_starting_time'],
      label: 'Job',
      type: 'related',
    },
    read_only: true,
    type: 'related',
  },
  {
    key: 'shift_date',
    read_only: false,
    templateOptions: {
      required: true,
      label: 'Shift date',
      type: 'date',
    },
    separate: true,
    many: true,
    type: 'datepicker',
  },
  {
    prefilled: {
      date: '{id}',
    },
    list: true,
    send: false,
    key: 'shifts',
    endpoint: '/hr/shifts/',
    delay: true,
    templateOptions: {
      add_label: '+ Add',
      delete: true,
      label: 'Shifts',
      type: 'related',
      text: 'Shifts',
    },
    metadata_query: {
      editable_type: 'shift_date',
    },
    showIf: ['shift_date'],
    defaultData: {
      date__shift_date_0: '{shift_date}',
      date__shift_date_1: '{shift_date}',
      job: '{job.id}',
    },
    type: 'related',
  },
];

export const shiftdates = {
  list,
  form,
  formadd,
  jobAdd,
};
