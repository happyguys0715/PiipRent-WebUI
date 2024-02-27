import { List } from '@webui/metadata';

const formset = {
  fields: [
    {
      key: 'shift.date.shift_date',
      read_only: false,
      templateOptions: { required: true, label: 'Shift date', type: 'date' },
      type: 'datepicker',
    },
    {
      default: 0,
      key: 'status',
      read_only: false,
      templateOptions: {
        required: false,
        options: [
          { value: 0, label: 'Undefined' },
          { value: 1, label: 'Accepted' },
          { value: 2, label: 'Cancelled' },
        ],
        label: 'Status',
        type: 'select',
      },
      type: 'select',
    },
    {
      key: 'shift.time',
      read_only: false,
      templateOptions: { required: true, label: 'Time', type: 'time' },
      type: 'datepicker',
    },
  ],
  list: {
    columns: [
      {
        name: 'shift_date_and_time',
        content: [
          { type: 'datepicker', field: 'shift.date.shift_date' },
          { type: 'datepicker', field: 'shift.time' },
        ],
        label: 'Shift date and time',
        title: null,
        delim: ' ',
      },
      {
        name: 'status',
        sort: true,
        sort_field: 'status',
        content: [
          {
            values: { 0: 'Undefined', 1: 'Accepted', 2: 'Cancelled' },
            type: 'select',
            field: 'status',
          },
        ],
        label: 'Status',
      },
      new List.column.element('job', 'Job')
        .setWidth(300)
        .setContent([new List.input.element('shift.date.job.name')]),
    ],
    list: 'joboffer',
    editDisable: false,
    label: 'Job Offer',
    pagination_label: 'Job Offer',
    search_enabled: false,
  },
};

export const joboffersCandidateManager = {
  formset,
};
