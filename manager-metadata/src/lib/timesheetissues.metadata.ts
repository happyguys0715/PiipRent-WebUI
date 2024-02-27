const list = {
  list: {
    list: 'timesheetissue',
    label: 'Timesheet Issue',
    columns: [
      {
        content: [{ field: '__str__', type: 'static' }],
        name: '__str__',
        label: 'Timesheet Issue',
      },
    ],
    pagination_label: 'Timesheet Issue',
    search_enabled: false,
    editDisable: false,
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Timesheet Issue',
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
    endpoint: '/hr/timesheets/',
    read_only: true,
    templateOptions: {
      label: 'Time sheet',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'time_sheet',
    many: false,
  },
  {
    key: 'subject',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Subject',
      max: 255,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'description',
    type: 'textarea',
    templateOptions: {
      required: true,
      label: 'Description',
      type: 'textarea',
    },
    read_only: false,
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
    key: 'supervisor_approved_at',
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'Supervisor Approved at',
      type: 'datetime',
    },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/core/companycontacts/',
    read_only: true,
    templateOptions: {
      label: 'Account representative',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'account_representative',
    many: false,
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
    endpoint: '/hr/timesheets/',
    read_only: true,
    templateOptions: {
      label: 'Time sheet',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'time_sheet',
    many: false,
  },
  {
    key: 'subject',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Subject',
      max: 255,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'description',
    type: 'textarea',
    templateOptions: {
      required: true,
      label: 'Description',
      type: 'textarea',
    },
    read_only: false,
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
    key: 'supervisor_approved_at',
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'Supervisor Approved at',
      type: 'datetime',
    },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/core/companycontacts/',
    read_only: true,
    templateOptions: {
      label: 'Account representative',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'account_representative',
    many: false,
  },
];

export const timesheetissues = {
  list,
  form,
  formadd,
};
