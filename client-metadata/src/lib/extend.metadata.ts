const form = [
  {
    type: 'input',
    hide: true,
    key: 'id',
    templateOptions: {},
  },
  {
    key: 'job_shift',
    type: 'extend',
  },
  {
    hide: true,
    key: 'default_shift_starting_time',
    default: '07:00:00',
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'Default Shift Starting Time',
      type: 'time',
    },
    read_only: false,
  },
  {
    endpoint: '/skills/skills/',
    read_only: true,
    key: 'skill',
    hide: true,
    templateOptions: {
      label: 'Position',
      add: false,
      delete: false,
      values: ['__str__', 'translations', 'name'],
      type: 'related',
      edit: true,
    },
    type: 'related',
    query: {
      job: '{id}',
    },
  },
];

export const extend = {
  form,
};
