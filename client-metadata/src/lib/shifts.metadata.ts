const list = {
  fields: [
    {
      key: '__str__',
      read_only: true,
      templateOptions: {
        required: false,
        label: 'Shift',
        type: 'static',
      },
      type: 'static',
    },
  ],
  list: {
    columns: [
      {
        name: '__str__',
        content: [
          {
            type: 'static',
            field: '__str__',
          },
        ],
        label: 'Shift',
      },
    ],
    list: 'shift',
    editDisable: false,
    label: 'Shift',
    pagination_label: 'Shift',
    search_enabled: false,
  },
};

const form = [
  {
    hide: true,
    endpoint: '/skills/skills/',
    read_only: true,
    send: false,
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
    key: 'date',
    endpoint: '/hr/shiftdates/',
    collapsed: false,
    list: false,
    templateOptions: {
      add: true,
      delete: false,
      edit: true,
      values: ['__str__'],
      label: 'Date',
      type: 'related',
    },
    read_only: false,
    type: 'related',
  },
  {
    key: 'time',
    read_only: false,
    templateOptions: {
      required: true,
      label: 'Time',
      type: 'time',
    },
    type: 'datepicker',
  },
  {
    default: 1,
    key: 'workers',
    read_only: false,
    templateOptions: {
      min: 1,
      required: false,
      label: 'Workers',
      max: 32767,
      type: 'number',
    },
    type: 'input',
  },
  {
    default: 0.0,
    key: 'hourly_rate',
    read_only: false,
    templateOptions: {
      required: false,
      display: '{currency}{field}/h',
      label: 'Candidate rate',
      type: 'number',
    },
    attributes: {
      max: '{skill.upper_rate_limit}',
      min: '{skill.lower_rate_limit}',
    },
    type: 'input',
  },
];

const formadd = [
  {
    hide: true,
    endpoint: '/skills/skills/',
    read_only: true,
    send: false,
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
    key: 'date',
    endpoint: '/hr/shiftdates/',
    collapsed: false,
    list: false,
    templateOptions: {
      add: true,
      delete: false,
      edit: true,
      values: ['__str__'],
      label: 'Date',
      type: 'related',
    },
    read_only: false,
    type: 'related',
  },
  {
    key: 'time',
    read_only: false,
    templateOptions: {
      required: true,
      label: 'Time',
      type: 'time',
      placeholder: 'Time',
    },
    type: 'datepicker',
  },
  {
    default: 1,
    key: 'workers',
    read_only: false,
    templateOptions: {
      min: 1,
      required: false,
      label: 'Workers',
      max: 32767,
      type: 'number',
      placeholder: 'Workers',
    },
    type: 'input',
  },
  {
    default: 0.0,
    key: 'hourly_rate',
    read_only: false,
    templateOptions: {
      required: false,
      display: '{currency}{field}/h',
      label: 'Candidate rate',
      type: 'number',
      placeholder: 'Candidate rate',
    },
    attributes: {
      max: '{skill.upper_rate_limit}',
      min: '{skill.lower_rate_limit}',
    },
    type: 'input',
  },
];

const shiftDate = {
  fields: [
    {
      key: 'date',
      endpoint: '/hr/shiftdates/',
      hide: true,
      templateOptions: {
        add: true,
        delete: false,
        edit: true,
        values: ['__str__'],
        label: 'Date',
        type: 'related',
      },
      type: 'related',
    },
    {
      key: 'time',
      read_only: false,
      default: '{default_shift_starting_time}',
      templateOptions: {
        required: true,
        label: 'Time',
        type: 'time',
      },
      type: 'datepicker',
    },
    {
      default: '{workers}',
      key: 'workers',
      read_only: false,
      templateOptions: {
        min: 1,
        required: false,
        label: 'Workers',
        max: 32767,
        type: 'number',
        placeholder: 'Workers',
      },
      type: 'input',
    },
    {
      key: 'hourly_rate',
      type: 'input',
      attributes: {
        max: '{skill.upper_rate_limit}',
        min: '{skill.lower_rate_limit}',
      },
      templateOptions: {
        label: 'Candidate rate default',
        type: 'number',
        text: '{currency}{hourly_rate}/h',
      },
    },
  ],
  list: {
    columns: [
      {
        name: 'time',
        sorted: 'desc',
        sort_field: 'time',
        title: null,
        sort: true,
        content: [
          { label: 'Shift start time', type: 'datepicker', field: 'time' },
        ],
        label: 'Shift start time',
        delim: null,
      },
      {
        name: 'workers',
        sort: true,
        sort_field: 'workers',
        content: [{ type: 'input', field: 'workers' }],
        label: 'Workers',
      },
      {
        name: 'candidate_rate',
        content: [
          {
            display: '{currency}{field}/h',
            label: 'Candidate rate',
            type: 'text',
            field: 'hourly_rate',
          },
        ],
        label: 'Candidate rate',
        title: null,
        delim: null,
      },
      {
        name: 'actions',
        content: [
          {
            action: 'editForm',
            endpoint: '/hr/shifts/{id}',
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
    buttons: [],
    list: 'shift',
    editDisable: false,
    label: 'Shift',
    pagination_label: 'Shift',
    search_enabled: false,
  },
};

const editShiftDate = [
  {
    key: 'date',
    endpoint: '/hr/shiftdates/',
    templateOptions: {
      add: true,
      delete: false,
      edit: true,
      values: ['__str__'],
      label: 'Date',
      type: 'related',
    },
    type: 'related',
  },
  {
    key: 'time',
    read_only: false,
    default: '{default_shift_starting_time}',
    templateOptions: {
      required: true,
      label: 'Time',
      type: 'time',
    },
    type: 'datepicker',
  },
  {
    default: 1,
    key: 'workers',
    read_only: false,
    templateOptions: {
      min: 1,
      required: false,
      label: 'Workers',
      max: 32767,
      type: 'number',
    },
    type: 'input',
  },
  {
    key: 'hourly_rate',
    type: 'input',
    attributes: {
      max: '{skill.upper_rate_limit}',
      min: '{skill.lower_rate_limit}',
    },
    templateOptions: {
      label: 'Candidate rate default',
      type: 'number',
      text: '{currency}{hourly_rate}/h',
    },
  },
];

const job = {
  fields: [
    {
      key: 'is_fulfilled',
      read_only: true,
      templateOptions: {
        required: false,
        values: {
          0: 'times-circle',
          1: 'check-circle',
          2: 'exclamation-circle',
          3: 'minus-circle',
          null: 'minus-circle',
        },
        label: 'Fulfilled',
        type: 'icon',
      },
      type: 'checkbox',
    },
    {
      key: 'date.shift_date',
      read_only: false,
      templateOptions: { required: true, label: 'Date', type: 'date' },
      type: 'datepicker',
    },
    {
      default: 0.0,
      key: 'hourly_rate',
      read_only: false,
      templateOptions: {
        required: false,
        display: '{currency}{field}/h',
        label: 'Candidate rate',
        type: 'text',
      },
      type: 'input',
    },
    {
      key: 'time',
      read_only: false,
      templateOptions: {
        required: true,
        label: 'Shift start time',
        type: 'time',
      },
      type: 'datepicker',
    },
    {
      default: 1,
      key: 'workers',
      read_only: false,
      templateOptions: {
        required: false,
        min: 1,
        label: 'Workers',
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
  ],
  list: {
    columns: [
      {
        name: 'date.shift_date',
        sorted: 'desc',
        sort_field: 'date.shift_date',
        title: null,
        sort: true,
        content: [
          { label: 'Date', type: 'datepicker', field: 'date.shift_date' },
        ],
        label: 'Date',
        delim: null,
      },
      {
        name: 'time',
        sorted: 'desc',
        sort_field: 'time',
        title: null,
        sort: true,
        content: [
          { label: 'Shift start time', type: 'datepicker', field: 'time' },
        ],
        label: 'Shift start time',
        delim: null,
      },
      {
        name: 'workers',
        sort: true,
        sort_field: 'workers',
        content: [
          {
            type: 'input',
            field: 'workers',
            workers_details: true,
          },
        ],
        label: 'Workers',
      },
      {
        name: 'candidate_rate',
        content: [
          {
            display: '$ {field}',
            label: ' Candidate rate override',
            type: 'text',
            field: 'hourly_rate',
          },
        ],
        label: ' Candidate rate override',
        title: null,
        delim: null,
      },
      {
        name: 'fulfilled',
        content: [
          {
            values: {
              0: 'times-circle',
              1: 'check-circle',
              2: 'exclamation-circle',
              3: 'minus-circle',
              null: 'minus-circle',
            },
            color: {
              0: 'danger',
              1: 'success',
              2: 'warning',
              3: 'default',
              null: 'default',
            },
            label: {
              0: 'unfulfilled',
              1: 'fulfilled',
              2: 'unfulfilled',
              3: 'unfulfilled',
              null: 'unfulfilled',
            },
            setColorForLabel: true,
            type: 'icon',
            field: 'is_fulfilled',
          },
        ],
        label: 'Fulfilled',
        title: null,
        delim: null,
      },
      {
        name: 'actions',
        content: [
          {
            action: 'delete',
            icon: 'fa-trash',
            title: 'Delete',
            showIf: ['can_delete'],
            type: 'button',
            field: 'id',
          },
        ],
        label: 'Actions',
        title: null,
        delim: null,
      },
    ],
    buttons: [],
    groups: ['date.shift_date'],
    list: 'shift',
    editDisable: false,
    label: 'Shift',
    pagination_label: 'Shift',
    search_enabled: false,
  },
};

export const shifts = {
  list,
  job,
  form,
  formadd,
  shiftDate,
  editShiftDate,
};
