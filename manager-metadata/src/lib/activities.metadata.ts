import { createFilter, Type } from '@webui/metadata';

const list = {
  list: {
    list: 'activity',
    label: 'Activity',
    columns: [
      {
        content: [
          {
            field: 'contact.__str__',
            type: 'static',
          },
        ],
        name: 'contact.__str__',
        label: 'Contact',
      },
      {
        content: [
          {
            values: {
              1: 'Bottom',
              2: 'Low',
              3: 'Normal',
              4: 'High',
              5: 'Top',
            },
            field: 'priority',
            type: 'select',
          },
        ],
        name: 'priority',
        sort_field: 'priority',
        label: 'Priority',
        sort: true,
      },
      {
        delim: null,
        label: 'Starts at',
        sort: true,
        content: [
          {
            field: 'starts_at',
            type: 'datepicker',
            label: 'Starts at',
          },
        ],
        name: 'starts_at',
        title: null,
        sort_field: 'starts_at',
      },
      {
        delim: null,
        label: 'Ends at',
        sort: true,
        content: [
          {
            field: 'ends_at',
            type: 'datepicker',
            label: 'Ends at',
          },
        ],
        name: 'ends_at',
        title: null,
        sort_field: 'ends_at',
      },
      {
        content: [
          {
            values: {
              null: 'New',
              false: 'SEEN',
              true: 'Done',
            },
            field: 'done',
            type: 'select',
          },
        ],
        name: 'done',
        sort_field: 'done',
        label: 'Done',
        sort: true,
      },
    ],
    pagination_label: 'Activity',
    search_enabled: false,
    editDisable: false,
    filters: [
      {
        key: 'priority',
        label: 'Priority',
        options: [
          {
            value: 1,
            label: 'Bottom',
          },
          {
            value: 2,
            label: 'Low',
          },
          {
            value: 3,
            label: 'Normal',
          },
          {
            value: 4,
            label: 'High',
          },
          {
            value: 5,
            label: 'Top',
          },
        ],
        query: 'priority',
        default: null,
        type: 'select',
      },
      {
        key: 'done',
        label: 'Done',
        options: [
          {
            value: null,
            label: 'New',
          },
          {
            value: false,
            label: 'SEEN',
          },
          {
            value: true,
            label: 'Done',
          },
        ],
        query: 'done',
        default: null,
        type: 'select',
      },
      createFilter(Type.Date, {
        key: 'starts_at',
        label: 'Starts at',
        yesterday: true,
        today: true,
        tomorrow: true,
      }),
      createFilter(Type.Date, {
        key: 'ends_at',
        label: 'Ends at',
        yesterday: true,
        today: true,
        tomorrow: true,
      }),
    ],
  },
  fields: [
    {
      key: 'priority',
      default: 3,
      type: 'select',
      templateOptions: {
        required: false,
        label: 'Priority',
        options: [
          {
            value: 1,
            label: 'Bottom',
          },
          {
            value: 2,
            label: 'Low',
          },
          {
            value: 3,
            label: 'Normal',
          },
          {
            value: 4,
            label: 'High',
          },
          {
            value: 5,
            label: 'Top',
          },
        ],
        type: 'select',
      },
      read_only: true,
    },
    {
      key: 'starts_at',
      default: '2018-07-04T08:25:20.158039Z',
      type: 'datepicker',
      templateOptions: {
        required: false,
        label: 'Starts at',
        type: 'datetime',
      },
      read_only: true,
    },
    {
      key: 'done',
      type: 'select',
      templateOptions: {
        required: false,
        label: 'Done',
        options: [
          {
            value: null,
            label: 'New',
          },
          {
            value: false,
            label: 'SEEN',
          },
          {
            value: true,
            label: 'Done',
          },
        ],
        type: 'select',
      },
      read_only: true,
    },
    {
      key: 'contact.__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Contact',
        type: 'static',
      },
      read_only: true,
    },
    {
      key: 'ends_at',
      type: 'datepicker',
      templateOptions: {
        required: true,
        label: 'Ends at',
        type: 'datetime',
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
    key: 'starts_at',
    default: '2018-07-04T08:26:46.115665Z',
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'Starts at',
      type: 'datetime',
    },
    read_only: false,
  },
  {
    key: 'ends_at',
    type: 'datepicker',
    templateOptions: {
      required: true,
      label: 'Ends at',
      type: 'datetime',
    },
    read_only: false,
  },
  {
    key: 'priority',
    default: 3,
    type: 'select',
    templateOptions: {
      required: false,
      label: 'Priority',
      type: 'select',
      options: [
        {
          value: 1,
          label: 'Bottom',
        },
        {
          value: 2,
          label: 'Low',
        },
        {
          value: 3,
          label: 'Normal',
        },
        {
          value: 4,
          label: 'High',
        },
        {
          value: 5,
          label: 'Top',
        },
      ],
    },
    read_only: false,
  },
  {
    key: 'done',
    type: 'select',
    templateOptions: {
      required: false,
      label: 'Done',
      type: 'select',
      options: [
        {
          value: null,
          label: 'New',
        },
        {
          value: false,
          label: 'SEEN',
        },
        {
          value: true,
          label: 'Done',
        },
      ],
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
    key: 'starts_at',
    default: '2018-07-04T08:27:16.603365Z',
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'Starts at',
      type: 'datetime',
    },
    read_only: false,
  },
  {
    key: 'ends_at',
    type: 'datepicker',
    templateOptions: {
      required: true,
      label: 'Ends at',
      type: 'datetime',
    },
    read_only: false,
  },
  {
    key: 'priority',
    default: 3,
    type: 'select',
    templateOptions: {
      required: false,
      label: 'Priority',
      type: 'select',
      options: [
        {
          value: 1,
          label: 'Bottom',
        },
        {
          value: 2,
          label: 'Low',
        },
        {
          value: 3,
          label: 'Normal',
        },
        {
          value: 4,
          label: 'High',
        },
        {
          value: 5,
          label: 'Top',
        },
      ],
    },
    read_only: false,
  },
  {
    key: 'done',
    type: 'select',
    templateOptions: {
      required: false,
      label: 'Done',
      type: 'select',
      options: [
        {
          value: null,
          label: 'New',
        },
        {
          value: false,
          label: 'SEEN',
        },
        {
          value: true,
          label: 'Done',
        },
      ],
    },
    read_only: false,
  },
];

export const activities = {
  list,
  form,
  formadd,
};
