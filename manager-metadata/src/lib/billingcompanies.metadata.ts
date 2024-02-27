import { createFilter, Type } from '@webui/metadata';
import { Endpoints } from '@webui/models';

const list = {
  list: {
    list: 'subscription',
    label: 'Subscription',
    search_enabled: true,
    columns: [
      {
        content: [
          {
            field: 'name',
            type: 'static',
          },
        ],
        name: 'name',
        label: 'Name',
      },
      {
        content: [
          {
            field: 'sms_balance',
            type: 'static',
          },
        ],
        name: 'sms_balance',
        label: 'SMS balance',
      },
      {
        content: [
          {
            field: 'subscription.price',
            type: 'text',
          },
        ],
        name: 'subscription.price',
        label: 'Price',
      },
      {
        content: [
          {
            field: 'subscription.worker_count',
            type: 'text',
          },
        ],
        name: 'subscription.worker_count',
        label: 'Worker count',
      },
      {
        content: [
          {
            field: 'subscription.type',
            type: 'select',
            values: {
              annual: 'Annual',
              monthly: 'Monthly',
            },
          },
        ],
        name: 'subscription.type',
        label: 'Type',
      },
      {
        name: 'created',
        content: [
          {
            type: 'datepicker',
            field: 'subscription.created',
          },
        ],
        label: 'Created',
      },
      {
        name: 'current_period_start',
        content: [
          {
            type: 'datepicker',
            field: 'subscription.current_period_start',
          },
        ],
        label: 'Current period start',
      },
      {
        name: 'current_period_end',
        content: [
          {
            type: 'datepicker',
            field: 'subscription.current_period_end',
          },
        ],
        label: 'Current period end',
      },
      {
        name: 'last_time_billed',
        content: [
          {
            type: 'datepicker',
            field: 'subscription.last_time_billed',
          },
        ],
        label: 'Last time billed',
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
    buttons: [],
    editDisable: true,
  },
  fields: [
    {
      type: 'datepicker',
      key: 'subscription.created',
      templateOptions: {
        type: 'datetime',
      },
    },
    {
      type: 'datepicker',
      key: 'subscription.current_period_start',
      templateOptions: {
        type: 'datetime',
      },
    },
    {
      type: 'datepicker',
      key: 'subscription.current_period_end',
      templateOptions: {
        type: 'datetime',
      },
    },
    {
      type: 'datepicker',
      key: 'subscription.last_time_billed',
      templateOptions: {
        type: 'datetime',
      },
    },
  ],
};

export const billingcompanies = {
  list,
};
