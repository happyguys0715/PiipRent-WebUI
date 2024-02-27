const list = {
  list: {
    list: 'weekdayworkrule',
    label: 'Weekday Work Rule',
    columns: [
      {
        content: [{ field: '__str__', type: 'static' }],
        name: '__str__',
        label: 'Weekday Work Rule',
      },
    ],
    pagination_label: 'Weekday Work Rule',
    search_enabled: false,
    editDisable: false,
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Weekday Work Rule',
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
    key: 'weekday_monday',
    default: false,
    type: 'checkbox',
    templateOptions: { required: false, label: 'Monday', type: 'checkbox' },
    read_only: false,
  },
  {
    key: 'weekday_tuesday',
    default: false,
    type: 'checkbox',
    templateOptions: { required: false, label: 'Tuesday', type: 'checkbox' },
    read_only: false,
  },
  {
    key: 'weekday_wednesday',
    default: false,
    type: 'checkbox',
    templateOptions: { required: false, label: 'Wednesday', type: 'checkbox' },
    read_only: false,
  },
  {
    key: 'weekday_thursday',
    default: false,
    type: 'checkbox',
    templateOptions: { required: false, label: 'Thursday', type: 'checkbox' },
    read_only: false,
  },
  {
    key: 'weekday_friday',
    default: false,
    type: 'checkbox',
    templateOptions: { required: false, label: 'Friday', type: 'checkbox' },
    read_only: false,
  },
  {
    key: 'weekday_saturday',
    default: false,
    type: 'checkbox',
    templateOptions: { required: false, label: 'Saturday', type: 'checkbox' },
    read_only: false,
  },
  {
    key: 'weekday_sunday',
    default: false,
    type: 'checkbox',
    templateOptions: { required: false, label: 'Sunday', type: 'checkbox' },
    read_only: false,
  },
  {
    key: 'weekday_bank_holiday',
    default: false,
    type: 'checkbox',
    templateOptions: {
      required: false,
      label: 'Bank Holiday',
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
    key: 'weekday_monday',
    default: false,
    type: 'checkbox',
    templateOptions: { required: false, label: 'Monday', type: 'checkbox' },
    read_only: false,
  },
  {
    key: 'weekday_tuesday',
    default: false,
    type: 'checkbox',
    templateOptions: { required: false, label: 'Tuesday', type: 'checkbox' },
    read_only: false,
  },
  {
    key: 'weekday_wednesday',
    default: false,
    type: 'checkbox',
    templateOptions: { required: false, label: 'Wednesday', type: 'checkbox' },
    read_only: false,
  },
  {
    key: 'weekday_thursday',
    default: false,
    type: 'checkbox',
    templateOptions: { required: false, label: 'Thursday', type: 'checkbox' },
    read_only: false,
  },
  {
    key: 'weekday_friday',
    default: false,
    type: 'checkbox',
    templateOptions: { required: false, label: 'Friday', type: 'checkbox' },
    read_only: false,
  },
  {
    key: 'weekday_saturday',
    default: false,
    type: 'checkbox',
    templateOptions: { required: false, label: 'Saturday', type: 'checkbox' },
    read_only: false,
  },
  {
    key: 'weekday_sunday',
    default: false,
    type: 'checkbox',
    templateOptions: { required: false, label: 'Sunday', type: 'checkbox' },
    read_only: false,
  },
  {
    key: 'weekday_bank_holiday',
    default: false,
    type: 'checkbox',
    templateOptions: {
      required: false,
      label: 'Bank Holiday',
      type: 'checkbox',
    },
    read_only: false,
  },
];

export const weekdayworkrules = {
  list,
  form,
  formadd,
};
