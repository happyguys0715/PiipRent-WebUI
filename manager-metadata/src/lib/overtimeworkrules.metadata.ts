const list = {
  list: {
    list: 'overtimeworkrule',
    label: 'Overtime Work Rule',
    columns: [
      {
        content: [{ field: '__str__', type: 'static' }],
        name: '__str__',
        label: 'Overtime Work Rule',
      },
    ],
    pagination_label: 'Overtime Work Rule',
    search_enabled: false,
    editDisable: false,
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Overtime Work Rule',
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
    templateOptions: { required: false, label: 'Id', type: 'text' },
    read_only: false,
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
  {
    key: 'overtime_hours_from',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Lower Overtime Hours Threshold',
      type: 'text',
      description: 'Format: (HH:MM:SS)',
    },
    read_only: false,
  },
  {
    key: 'overtime_hours_to',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Upper Overtime Hours Threshold',
      type: 'text',
      description: 'Format: (HH:MM:SS)',
    },
    read_only: false,
  },
];

const formadd = [
  {
    key: 'id',
    type: 'input',
    hide: true,
    templateOptions: { required: false, label: 'Id', type: 'text' },
    read_only: false,
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
  {
    key: 'overtime_hours_from',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Lower Overtime Hours Threshold',
      type: 'text',
      description: 'Format: (HH:MM:SS)',
    },
    read_only: false,
  },
  {
    key: 'overtime_hours_to',
    type: 'input',
    templateOptions: {
      required: false,
      label: 'Upper Overtime Hours Threshold',
      type: 'text',
      description: 'Format: (HH:MM:SS)',
    },
    read_only: false,
  },
];

export const overtimeworkrules = {
  list,
  form,
  formadd,
};
