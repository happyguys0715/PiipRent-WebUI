const list = {
  list: {
    list: 'timeofdayworkrule',
    label: 'Time of Day Work Rule',
    columns: [
      {
        content: [{ field: '__str__', type: 'static' }],
        name: '__str__',
        label: 'Time Of Day Work Rule',
      },
    ],
    pagination_label: 'Time of Day Work Rule',
    search_enabled: false,
    editDisable: false,
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Time Of Day Work Rule',
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
    key: 'time_start',
    default: '18:00:00',
    type: 'datepicker',
    templateOptions: { required: false, label: 'Time From', type: 'time' },
    read_only: false,
  },
  {
    key: 'time_end',
    default: '06:00:00',
    type: 'datepicker',
    templateOptions: { required: false, label: 'Time To', type: 'time' },
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
    key: 'time_start',
    default: '18:00:00',
    type: 'datepicker',
    templateOptions: { required: false, label: 'Time From', type: 'time' },
    read_only: false,
  },
  {
    key: 'time_end',
    default: '06:00:00',
    type: 'datepicker',
    templateOptions: { required: false, label: 'Time To', type: 'time' },
    read_only: false,
  },
];

export const timeofdayworkrules = {
  list,
  form,
  formadd,
};
