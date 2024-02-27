import { createFilter, Type } from '@webui/metadata';
import { Endpoints } from '@webui/models';

const list = {
  list: {
    list: 'discount',
    label: 'Discount',
    search_enabled: true,
    columns: [
      {
        content: [
          {
            endpoint: '/core/companies/{company.id}',
            field: 'company',
            type: 'link',
          },
        ],
        name: 'company',
        label: 'Company',
      },
      {
        content: [
          {
            field: 'payment_type',
            type: 'select',
            values: {
              sms: 'SMS',
              subscription: 'Subscription',
              extra_workers: 'Extra Workers',
            },
          },
        ],
        name: 'payment_type',
        label: 'Payment type',
      },
      {
        content: [
          {
            field: 'percent_off',
            type: 'text',
          },
        ],
        name: 'percent_off',
        label: 'Percent off',
      },
      {
        content: [
          {
            field: 'amount_off',
            type: 'text',
          },
        ],
        name: 'amount_off',
        label: 'Amount off',
      },
      {
        content: [
          {
            field: 'duration',
            type: 'select',
            values: {
              once: 'Once',
              repeating: 'Repeating',
              forever: 'Forever',
            },
          },
        ],
        name: 'duration',
        label: 'Duration',
      },
      {
        content: [
          {
            field: 'duration_in_months',
            type: 'text',
          },
        ],
        name: 'duration_in_months',
        label: 'Duration in months',
      },
      {
        content: [
          {
            field: 'active',
            type: 'icon',
            values: {
              false: 'times-circle',
              true: 'check-circle',
              null: 'minus-circle',
            },
          },
        ],
        name: 'active',
        label: 'Active',
      },
    ],
    filters: [
      createFilter(Type.Related, {
        key: 'company',
        label: 'Company',
        endpoint: Endpoints.Company,
        queryParams: {
          type: 'master',
        },
      }),
    ],
  },
  fields: [],
};

const formadd = [
  {
    endpoint: '/core/companies/',
    templateOptions: {
      label: 'Client',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    query: {
      type: 'master',
    },
    type: 'related',
    key: 'company',
  },
  {
    key: 'payment_type',
    type: 'select',
    templateOptions: {
      required: true,
      label: 'Payment type',
      options: [
        {
          value: 'sms',
          label: 'SMS',
        },
        {
          value: 'subscription',
          label: 'Subscription',
        },
        {
          value: 'extra_workers',
          label: 'Extra Workers',
        },
      ],
      type: 'select',
    },
  },
  {
    key: 'percent_off',
    type: 'input',
    templateOptions: {
      label: 'Percent off',
      type: 'number',
      max: 100,
      min: 0,
    },
  },
  {
    key: 'amount_off',
    type: 'input',
    templateOptions: {
      label: 'Amount off',
      type: 'number',
    },
  },
  {
    key: 'duration',
    type: 'select',
    templateOptions: {
      required: true,
      label: 'Duration',
      options: [
        {
          value: 'once',
          label: 'Once',
        },
        {
          value: 'repeating',
          label: 'Repeating',
        },
        {
          value: 'forever',
          label: 'Forever',
        },
      ],
      type: 'select',
    },
  },
  {
    key: 'duration_in_months',
    type: 'input',
    templateOptions: {
      label: 'Duration in months',
      type: 'number',
    },
  },
  {
    key: 'active',
    type: 'checkbox',
    templateOptions: {
      label: 'Active',
      type: 'number',
    },
  },
];

const form = [
  {
    endpoint: '/core/companies/',
    read_only: true,
    templateOptions: {
      label: 'Client',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    type: 'related',
    key: 'company',
  },
  {
    key: 'payment_type',
    type: 'select',
    templateOptions: {
      required: true,
      label: 'Payment type',
      options: [
        {
          value: 'sms',
          label: 'SMS',
        },
        {
          value: 'subscription',
          label: 'Subscription',
        },
        {
          value: 'extra_workers',
          label: 'Extra Workers',
        },
      ],
      type: 'select',
    },
  },
  {
    key: 'percent_off',
    type: 'input',
    templateOptions: {
      label: 'Percent off',
      type: 'number',
      max: 100,
      min: 0,
    },
  },
  {
    key: 'amount_off',
    type: 'input',
    templateOptions: {
      label: 'Amount off',
      type: 'number',
    },
  },
  {
    key: 'duration',
    type: 'select',
    templateOptions: {
      required: true,
      label: 'Duration',
      options: [
        {
          value: 'once',
          label: 'Once',
        },
        {
          value: 'repeating',
          label: 'Repeating',
        },
        {
          value: 'forever',
          label: 'Forever',
        },
      ],
      type: 'select',
    },
  },
  {
    key: 'duration_in_months',
    type: 'input',
    templateOptions: {
      label: 'Duration in months',
      type: 'number',
    },
  },
  {
    key: 'active',
    type: 'checkbox',
    templateOptions: {
      label: 'Active',
      type: 'number',
    },
  },
];

export const billingdoscounts = {
  list,
  formadd,
  form,
};
