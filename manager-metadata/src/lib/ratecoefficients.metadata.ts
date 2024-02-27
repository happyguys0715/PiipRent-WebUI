import { createFilter, Type } from '@webui/metadata';
import { Endpoints } from '@webui/models';

const list = {
  list: {
    list: 'ratecoefficient',
    label: 'Rate Coefficient',
    columns: [
      {
        content: [
          {
            field: '__str__',
            type: 'static',
          },
        ],
        name: '__str__',
        label: 'Rate Coefficient',
      },
      {
        content: [
          {
            endpoint: '/pricing/industries/',
            field: 'industry.name',
            type: 'text',
          },
        ],
        name: 'industry',
        sort_field: 'industry',
        label: 'Industry',
        sort: true,
      },
      {
        content: [
          {
            field: 'rules',
            type: 'static',
          },
        ],
        name: 'rules',
        label: 'Rules',
      },
      {
        content: [
          {
            endpoint: '/pricing/ratecoefficientgroups/',
            field: 'group',
            type: 'related',
          },
        ],
        name: 'group',
        sort_field: 'group',
        label: 'Group',
        sort: true,
      },
      {
        content: [
          {
            field: 'active',
            type: 'checkbox',
          },
        ],
        name: 'active',
        sort_field: 'active',
        label: 'Active',
        sort: true,
      },
    ],
    pagination_label: 'Rate Coefficient',
    search_enabled: false,
    editDisable: false,
    filters: [
      createFilter(Type.Related, {
        key: 'industry',
        label: 'Industry',
        endpoint: Endpoints.Industry,
      }),
    ],
  },
  fields: [
    {
      list: false,
      endpoint: '/pricing/ratecoefficientgroups/',
      read_only: true,
      templateOptions: {
        label: 'Group',
        add: true,
        delete: false,
        description: 'Group coefficients across industries',
        values: ['__str__'],
        type: 'related',
        edit: true,
      },
      collapsed: false,
      type: 'related',
      key: 'group',
      many: false,
    },
    {
      key: 'active',
      default: true,
      type: 'checkbox',
      templateOptions: {
        required: false,
        label: 'Active',
        type: 'checkbox',
      },
      read_only: true,
    },
    {
      key: 'rules',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Rules',
        type: 'static',
      },
      read_only: true,
    },
    {
      list: false,
      endpoint: '/pricing/industries/',
      read_only: true,
      templateOptions: {
        label: 'Industry',
        values: ['__str__', 'translations'],
        type: 'related',
      },
      collapsed: false,
      type: 'related',
      key: 'industry',
      many: false,
    },
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Rate Coefficient',
        type: 'static',
      },
      read_only: true,
    },
  ],
};

const form = [
  {
    label: '{name}',
    type: 'row',
    children: [
      {
        type: 'column',
        children: [
          {
            list: false,
            endpoint: '/pricing/industries/',
            read_only: true,
            templateOptions: {
              label: 'Industry',
              values: ['__str__', 'translations'],
              type: 'related',
            },
            collapsed: false,
            type: 'related',
            key: 'industry',
            many: false,
          },
          {
            key: 'name',
            type: 'input',
            templateOptions: {
              required: true,
              label: 'Name',
              max: 18,
              type: 'text',
            },
            read_only: false,
          },
          {
            list: false,
            endpoint: '/pricing/ratecoefficientgroups/',
            read_only: true,
            templateOptions: {
              label: 'Group',
              add: true,
              delete: false,
              description: 'Group coefficients across industries',
              values: ['__str__'],
              type: 'related',
              edit: true,
            },
            collapsed: false,
            type: 'related',
            key: 'group',
            many: false,
          },
          {
            key: 'active',
            default: true,
            type: 'checkbox',
            templateOptions: {
              required: false,
              label: 'Active',
              type: 'checkbox',
            },
            read_only: false,
          },
          {
            key: 'overlaps',
            default: false,
            type: 'checkbox',
            templateOptions: {
              required: false,
              label: 'Overlaps',
              type: 'checkbox',
            },
            read_only: false,
          },
        ],
      },
    ],
  },
  {
    label: 'Overtime',
    type: 'row',
    translateKey: 'overtime',
    children: [
      {
        type: 'column',
        children: [
          {
            key: 'overtime.used',
            type: 'checkbox',
            templateOptions: {
              required: false,
              label: 'Used for overtime',
              type: 'checkbox',
            },
            read_only: false,
          },
          {
            key: 'overtime.overtime_hours_from',
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
            key: 'overtime.overtime_hours_to',
            type: 'input',
            templateOptions: {
              required: false,
              label: 'Upper Overtime Hours Threshold',
              type: 'text',
              description: 'Format: (HH:MM:SS)',
            },
            read_only: false,
          },
          {
            key: 'overtime.id',
            type: 'input',
            hide: true,
            templateOptions: {
              required: false,
              label: 'Id',
              type: 'text',
            },
            read_only: false,
          },
        ],
      },
    ],
  },
  {
    label: 'Weekdays',
    type: 'row',
    translateKey: 'weekends',
    children: [
      {
        type: 'column',
        children: [
          {
            key: 'weekdays.weekday_monday',
            default: false,
            type: 'checkbox',
            templateOptions: {
              required: false,
              label: 'Monday',
              type: 'checkbox',
            },
            read_only: false,
          },
          {
            key: 'weekdays.weekday_tuesday',
            default: false,
            type: 'checkbox',
            templateOptions: {
              required: false,
              label: 'Tuesday',
              type: 'checkbox',
            },
            read_only: false,
          },
          {
            key: 'weekdays.weekday_wednesday',
            default: false,
            type: 'checkbox',
            templateOptions: {
              required: false,
              label: 'Wednesday',
              type: 'checkbox',
            },
            read_only: false,
          },
          {
            key: 'weekdays.weekday_thursday',
            default: false,
            type: 'checkbox',
            templateOptions: {
              required: false,
              label: 'Thursday',
              type: 'checkbox',
            },
            read_only: false,
          },
          {
            key: 'weekdays.weekday_friday',
            default: false,
            type: 'checkbox',
            templateOptions: {
              required: false,
              label: 'Friday',
              type: 'checkbox',
            },
            read_only: false,
          },
          {
            key: 'weekdays.weekday_saturday',
            default: false,
            type: 'checkbox',
            templateOptions: {
              required: false,
              label: 'Saturday',
              type: 'checkbox',
            },
            read_only: false,
          },
          {
            key: 'weekdays.weekday_sunday',
            default: false,
            type: 'checkbox',
            templateOptions: {
              required: false,
              label: 'Sunday',
              type: 'checkbox',
            },
            read_only: false,
          },
          {
            key: 'weekdays.weekday_bank_holiday',
            default: false,
            type: 'checkbox',
            templateOptions: {
              required: false,
              label: 'Bank Holiday',
              type: 'checkbox',
            },
            read_only: false,
          },
          {
            key: 'weekdays.id',
            type: 'input',
            hide: true,
            templateOptions: {
              required: false,
              label: 'Id',
              type: 'text',
            },
            read_only: false,
          },
        ],
      },
    ],
  },
  {
    label: 'Time',
    type: 'row',
    translateKey: 'time',
    children: [
      {
        type: 'column',
        children: [
          {
            key: 'timeofday.used',
            type: 'checkbox',
            templateOptions: {
              required: false,
              label: 'Used for Time of The Day',
              type: 'checkbox',
            },
            read_only: false,
          },
          {
            key: 'timeofday.time_start',
            default: '18:00:00',
            type: 'datepicker',
            templateOptions: {
              required: false,
              label: 'Time From',
              type: 'time',
            },
            read_only: false,
          },
          {
            key: 'timeofday.time_end',
            default: '06:00:00',
            type: 'datepicker',
            templateOptions: {
              required: false,
              label: 'Time To',
              type: 'time',
            },
            read_only: false,
          },
          {
            key: 'timeofday.id',
            type: 'input',
            hide: true,
            templateOptions: {
              required: false,
              label: 'Id',
              type: 'text',
            },
            read_only: false,
          },
        ],
      },
    ],
  },
  {
    label: 'Manual',
    type: 'row',
    translateKey: 'manual',
    children: [
      {
        type: 'column',
        children: [
          {
            key: 'allowance.used',
            type: 'checkbox',
            templateOptions: {
              required: false,
              label: 'Is Allowance',
              type: 'checkbox',
            },
            read_only: false,
          },
          {
            key: 'allowance.allowance_description',
            type: 'textarea',
            templateOptions: {
              required: false,
              label: 'Allowance Description',
              max: 255,
              type: 'textarea',
              description: 'Examples: Travel Allowance, Waiting Hours, etc.',
            },
            read_only: false,
          },
          {
            key: 'allowance.id',
            type: 'input',
            hide: true,
            templateOptions: {
              required: false,
              label: 'Id',
              type: 'text',
            },
            read_only: false,
          },
        ],
      },
    ],
  },
  {
    endpoint: '/pricing/ratecoefficientmodifiers/',
    type: 'list',
    translateKey: 'rate_coefficient_for_candidates',
    templateOptions: {
      label: 'Rate Coefficients for Candidates',
      type: 'list',
      text: 'Rate Coefficients for Candidates',
      add_label: 'add',
    },
    collapsed: false,
    prefilled: {
      rate_coefficient: '{id}',
      type: '1',
    },
    max: 1,
    query: {
      rate_coefficient: '{id}',
      type: '1',
    },
  },
  {
    endpoint: '/pricing/ratecoefficientmodifiers/',
    type: 'list',
    translateKey: 'rate_coefficient_for_companies',
    templateOptions: {
      label: 'Rate Coefficients for Companies',
      type: 'list',
      text: 'Rate Coefficients for Companies',
      add_label: 'add',
    },
    collapsed: false,
    prefilled: {
      rate_coefficient: '{id}',
      type: '0',
    },
    max: 1,
    query: {
      rate_coefficient: '{id}',
      type: '0',
    },
  },
];

const formadd = [
  {
    label: '{name}',
    type: 'row',
    children: [
      {
        type: 'column',
        children: [
          {
            list: false,
            endpoint: '/pricing/industries/',
            read_only: true,
            templateOptions: {
              required: true,
              label: 'Industry',
              values: ['__str__', 'translations'],
              type: 'related',
            },
            collapsed: false,
            type: 'related',
            key: 'industry',
            many: false,
          },
          {
            key: 'name',
            type: 'input',
            templateOptions: {
              required: true,
              label: 'Name',
              max: 18,
              type: 'text',
            },
            read_only: false,
          },
          {
            list: false,
            endpoint: '/pricing/ratecoefficientgroups/',
            read_only: true,
            templateOptions: {
              label: 'Group',
              add: true,
              delete: false,
              description: 'Group coefficients across industries',
              values: ['__str__'],
              type: 'related',
              edit: true,
            },
            collapsed: false,
            type: 'related',
            key: 'group',
            many: false,
          },
          {
            key: 'active',
            default: true,
            type: 'checkbox',
            templateOptions: {
              required: false,
              label: 'Active',
              type: 'checkbox',
            },
            read_only: false,
          },
        ],
      },
    ],
  },
  {
    label: 'Overtime',
    type: 'row',
    children: [
      {
        type: 'column',
        children: [
          {
            key: 'overtime.used',
            type: 'checkbox',
            templateOptions: {
              required: false,
              label: 'Used for overtime',
              type: 'checkbox',
            },
            read_only: false,
          },
          {
            key: 'overtime.overtime_hours_from',
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
            key: 'overtime.overtime_hours_to',
            type: 'input',
            templateOptions: {
              required: false,
              label: 'Upper Overtime Hours Threshold',
              type: 'text',
              description: 'Format: (HH:MM:SS)',
            },
            read_only: false,
          },
          {
            key: 'overtime.id',
            type: 'input',
            hide: true,
            templateOptions: {
              required: false,
              label: 'Id',
              type: 'text',
            },
            read_only: false,
          },
        ],
      },
    ],
  },
  {
    label: 'Weekdays',
    type: 'row',
    children: [
      {
        type: 'column',
        children: [
          {
            key: 'weekdays.weekday_monday',
            default: false,
            type: 'checkbox',
            templateOptions: {
              required: false,
              label: 'Monday',
              type: 'checkbox',
            },
            read_only: false,
          },
          {
            key: 'weekdays.weekday_tuesday',
            default: false,
            type: 'checkbox',
            templateOptions: {
              required: false,
              label: 'Tuesday',
              type: 'checkbox',
            },
            read_only: false,
          },
          {
            key: 'weekdays.weekday_wednesday',
            default: false,
            type: 'checkbox',
            templateOptions: {
              required: false,
              label: 'Wednesday',
              type: 'checkbox',
            },
            read_only: false,
          },
          {
            key: 'weekdays.weekday_thursday',
            default: false,
            type: 'checkbox',
            templateOptions: {
              required: false,
              label: 'Thursday',
              type: 'checkbox',
            },
            read_only: false,
          },
          {
            key: 'weekdays.weekday_friday',
            default: false,
            type: 'checkbox',
            templateOptions: {
              required: false,
              label: 'Friday',
              type: 'checkbox',
            },
            read_only: false,
          },
          {
            key: 'weekdays.weekday_saturday',
            default: false,
            type: 'checkbox',
            templateOptions: {
              required: false,
              label: 'Saturday',
              type: 'checkbox',
            },
            read_only: false,
          },
          {
            key: 'weekdays.weekday_sunday',
            default: false,
            type: 'checkbox',
            templateOptions: {
              required: false,
              label: 'Sunday',
              type: 'checkbox',
            },
            read_only: false,
          },
          {
            key: 'weekdays.weekday_bank_holiday',
            default: false,
            type: 'checkbox',
            templateOptions: {
              required: false,
              label: 'Bank Holiday',
              type: 'checkbox',
            },
            read_only: false,
          },
          {
            key: 'weekdays.id',
            type: 'input',
            hide: true,
            templateOptions: {
              required: false,
              label: 'Id',
              type: 'text',
            },
            read_only: false,
          },
        ],
      },
    ],
  },
  {
    label: 'Time',
    type: 'row',
    children: [
      {
        type: 'column',
        children: [
          {
            key: 'timeofday.used',
            type: 'checkbox',
            templateOptions: {
              required: false,
              label: 'Used for Time of The Day',
              type: 'checkbox',
            },
            read_only: false,
          },
          {
            key: 'timeofday.time_start',
            default: '18:00:00',
            type: 'datepicker',
            templateOptions: {
              required: false,
              label: 'Time From',
              type: 'time',
            },
            read_only: false,
          },
          {
            key: 'timeofday.time_end',
            default: '06:00:00',
            type: 'datepicker',
            templateOptions: {
              required: false,
              label: 'Time To',
              type: 'time',
            },
            read_only: false,
          },
          {
            key: 'timeofday.id',
            type: 'input',
            hide: true,
            templateOptions: {
              required: false,
              label: 'Id',
              type: 'text',
            },
            read_only: false,
          },
        ],
      },
    ],
  },
  {
    label: 'Manual',
    type: 'row',
    children: [
      {
        type: 'column',
        children: [
          {
            key: 'allowance.used',
            type: 'checkbox',
            templateOptions: {
              required: false,
              label: 'Is Allowance',
              type: 'checkbox',
            },
            read_only: false,
          },
          {
            key: 'allowance.allowance_description',
            type: 'textarea',
            templateOptions: {
              required: false,
              label: 'Allowance Description',
              max: 255,
              type: 'textarea',
              description: 'Examples: Travel Allowance, Waiting Hours, etc.',
            },
            read_only: false,
          },
          {
            key: 'allowance.id',
            type: 'input',
            hide: true,
            templateOptions: {
              required: false,
              label: 'Id',
              type: 'text',
            },
            read_only: false,
          },
        ],
      },
    ],
  },
  {
    endpoint: '/pricing/ratecoefficientmodifiers/',
    type: 'list',
    templateOptions: {
      label: 'Rate Coefficients for Candidates',
      type: 'list',
      text: 'Rate Coefficients for Candidates',
    },
    collapsed: false,
    prefilled: {
      rate_coefficient: '{id}',
      type: '1',
    },
    max: 1,
    query: {
      rate_coefficient: '{id}',
      type: '1',
    },
  },
  {
    endpoint: '/pricing/ratecoefficientmodifiers/',
    type: 'list',
    templateOptions: {
      label: 'Rate Coefficients for Companies',
      type: 'list',
      text: 'Rate Coefficients for Companies',
    },
    collapsed: false,
    prefilled: {
      rate_coefficient: '{id}',
      type: '0',
    },
    max: 1,
    query: {
      rate_coefficient: '{id}',
      type: '0',
    },
  },
];

export const ratecoefficients = {
  list,
  form,
  formadd,
};
