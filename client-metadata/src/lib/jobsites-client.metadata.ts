import { Endpoints } from '@webui/models';
import { Time } from '@webui/time';

const list = {
  list: {
    list: 'jobsite',
    label: 'Jobsite',
    columns: [
      {
        content: [
          {
            field: '__str__',
            type: 'static',
          },
        ],
        name: 'site_name',
        title: null,
        label: 'Site Name',
        delim: null,
      },
      {
        content: [
          {
            field: 'address.state.name',
            type: 'text',
            label: 'State',
          },
        ],
        name: 'state',
        title: null,
        label: 'State',
        delim: null,
      },
      {
        content: [
          {
            field: 'address.city.name',
            type: 'text',
            label: 'City',
          },
        ],
        name: 'city',
        title: null,
        label: 'City',
        delim: null,
      },
      {
        content: [
          {
            endpoint: '/core/companies/',
            field: 'regular_company',
            type: 'related',
          },
        ],
        name: 'regular_company',
        sort_field: 'regular_company',
        label: 'Client',
        sort: true,
      },
      {
        content: [
          {
            endpoint: '/core/companycontacts/',
            field: 'portfolio_manager',
            type: 'related',
          },
        ],
        name: 'portfolio_manager',
        sort_field: 'portfolio_manager',
        label: 'Portfolio manager',
        sort: true,
      },
      {
        content: [
          {
            endpoint: '/pricing/industries/',
            field: 'industry',
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
            field: 'start_date',
            type: 'datepicker',
          },
        ],
        name: 'start_date',
        sort_field: 'start_date',
        label: 'Start Date',
        sort: true,
      },
      {
        content: [
          {
            field: 'end_date',
            type: 'datepicker',
          },
        ],
        name: 'end_date',
        sort_field: 'end_date',
        label: 'End Date',
        sort: true,
      },
      {
        content: [
          {
            values: {
              false: 'times-circle',
              true: 'check-circle',
              null: 'minus-circle',
            },
            type: 'icon',
            field: 'is_available',
          },
        ],
        name: 'is_available',
        label: 'Status',
      },
    ],
    pagination_label: 'Jobsite',
    editDisable: false,
  },
  fields: [
    {
      key: 'start_date',
      type: 'datepicker',
      templateOptions: {
        required: false,
        label: 'Start Date',
        type: 'date',
      },
      read_only: true,
    },
    {
      key: 'end_date',
      type: 'datepicker',
      templateOptions: {
        required: false,
        label: 'End Date',
        type: 'date',
      },
      read_only: true,
    },
    {
      key: 'active_states',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Active states',
        type: 'static',
      },
      read_only: true,
    },
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Jobsite',
        type: 'static',
      },
      read_only: true,
    },
  ],
};

const formset = {
  fields: [
    {
      many: false,
      key: 'primary_contact',
      endpoint: '/core/companycontacts/',
      collapsed: false,
      list: false,
      templateOptions: {
        add: true,
        delete: false,
        edit: true,
        values: ['__str__'],
        label: 'Primary contact',
        type: 'related',
      },
      read_only: false,
      type: 'related',
    },
    {
      key: '__str__',
      read_only: true,
      templateOptions: { required: false, label: 'Jobsite', type: 'static' },
      type: 'static',
    },
    {
      key: 'id',
      templateOptions: {
        action: 'editForm',
        label: '',
        type: 'button',
        text: '',
      },
      type: 'button',
    },
    {
      key: 'start_date',
      read_only: false,
      templateOptions: { required: false, label: 'Start Date', type: 'date' },
      type: 'datepicker',
    },
    {
      key: 'end_date',
      read_only: false,
      templateOptions: { required: false, label: 'End Date', type: 'date' },
      type: 'datepicker',
    },
    {
      key: 'notes',
      read_only: false,
      templateOptions: { required: false, label: 'Notes', type: 'text' },
      type: 'input',
    },
  ],
  list: {
    columns: [
      {
        name: '__str__',
        content: [{ type: 'static', field: '__str__' }],
        label: 'Jobsite',
      },
      {
        name: 'primary_contact',
        sort: true,
        sort_field: 'primary_contact',
        content: [
          {
            endpoint: '/core/companycontacts/',
            type: 'related',
            field: 'primary_contact',
          },
        ],
        label: 'Primary contact',
      },
      {
        name: 'start_date',
        sort: true,
        sort_field: 'start_date',
        content: [{ type: 'datepicker', field: 'start_date' }],
        label: 'Start Date',
      },
      {
        name: 'end_date',
        sort: true,
        sort_field: 'end_date',
        content: [{ type: 'datepicker', field: 'end_date' }],
        label: 'End Date',
      },
      {
        name: 'notes',
        sort: true,
        sort_field: 'notes',
        content: [{ type: 'input', field: 'notes' }],
        label: 'Notes',
      },
      {
        name: 'actions',
        content: [
          {
            action: 'editForm',
            endpoint: '/hr/jobsites/{id}',
            icon: 'fa-pencil-alt',
            title: 'Edit',
            translationKey: 'edit',
            text_color: '#f0ad4e',
            type: 'button',
            field: 'id',
          },
          {
            action: 'delete',
            icon: 'fa-times-circle',
            title: 'Delete',
            text_color: '#f32700',
            type: 'button',
            field: 'id',
          },
        ],
        label: 'Actions',
        title: null,
        delim: null,
      },
    ],
    buttons: [],
    list: 'jobsite',
    editDisable: false,
    label: 'Jobsite',
    pagination_label: 'Jobsite',
    search_enabled: true,
  },
};

const form = [
  {
    values: {
      client: 'regular_company',
      created_at: 'created_at',
      available: 'is_available',
      address: 'address.__str__',
      title: 'short_name',
      updated_at: 'updated_at',
      map: 'address',
    },
    type: 'info',
    key: 'id',
  },
  {
    type: 'tabs',
    children: [
      {
        main: true,
        name: 'General Info',
        key: 'general',
        translateKey: 'general',
        type: 'group',
        label: 'General information',
        children: [
          {
            type: 'row',
            children: [
              {
                label: 'Primary Contact',
                key: 'primary_contact',
                translateKey: 'primary_contact',
                type: 'group',
                children: [
                  {
                    endpoint: '/core/companycontacts/',
                    key: 'primary_contact',
                    templateOptions: {
                      label: 'Name',
                      values: ['contact'],
                      type: 'related',
                      display: '{contact.__str__}',
                    },
                    read_only: true,
                    prefilled: {
                      company: '{regular_company.id}',
                    },
                    type: 'related',
                    query: {
                      company: '{regular_company.id}',
                    },
                  },
                  {
                    key: 'primary_contact.job_title',
                    send: false,
                    type: 'input',
                    templateOptions: {
                      required: false,
                      label: 'Job Title',
                      max: 31,
                      type: 'text',
                    },
                    read_only: true,
                  },
                  {
                    key: 'primary_contact.contact.email',
                    send: false,
                    type: 'input',
                    templateOptions: {
                      required: false,
                      label: 'E-mail',
                      max: 255,
                      type: 'text',
                    },
                    read_only: true,
                  },
                  {
                    key: 'primary_contact.contact.phone_mobile',
                    send: false,
                    type: 'input',
                    templateOptions: {
                      required: false,
                      label: 'Phone number',
                      type: 'text',
                    },
                    read_only: true,
                  },
                ],
                width: 0.25,
              },
              {
                label: 'Additional Info',
                key: 'additional_info',
                translateKey: 'additional_info',
                type: 'group',
                children: [
                  {
                    endpoint: '/pricing/industries/',
                    read_only: true,
                    templateOptions: {
                      label: 'Industry',
                      values: ['__str__', 'translations'],
                      type: 'related',
                    },
                    type: 'related',
                    key: 'industry',
                  },
                  {
                    key: 'start_date',
                    type: 'datepicker',
                    templateOptions: {
                      required: false,
                      label: 'Start Date',
                      type: 'date',
                    },
                    read_only: false,
                  },
                  {
                    key: 'end_date',
                    type: 'datepicker',
                    templateOptions: {
                      required: false,
                      label: 'End Date',
                      type: 'date',
                    },
                    read_only: false,
                  },
                ],
                width: 0.25,
              },
              {
                label: 'Portfolio Manager',
                key: 'portfolio_manager',
                translateKey: 'portfolio_manager',
                type: 'group',
                children: [
                  {
                    endpoint: '/core/companycontacts/',
                    read_only: false,
                    key: 'portfolio_manager',
                    templateOptions: {
                      label: 'Name',
                      values: ['__str__'],
                      type: 'related',
                    },
                    type: 'related',
                    query: {
                      company: '{master_company.id}',
                    },
                  },
                  {
                    key: 'portfolio_manager.job_title',
                    send: false,
                    type: 'input',
                    templateOptions: {
                      required: false,
                      label: 'Job Title',
                      max: 31,
                      type: 'text',
                    },
                    read_only: true,
                  },
                  {
                    key: 'portfolio_manager.contact.phone_mobile',
                    send: false,
                    type: 'input',
                    templateOptions: {
                      required: false,
                      label: 'Phone number',
                      type: 'text',
                    },
                    read_only: true,
                  },
                ],
                width: 0.25,
              },
            ],
          },
        ],
      },
      {
        endpoint: Endpoints.Job,
        translateKey: 'job',
        templateOptions: {
          label: 'Jobs',
          type: 'list',
          text: 'Jobs',
          add_label: 'add',
        },
        prefilled: {
          customer_representative: '{primary_contact.id}',
          jobsite: '{id}',
          customer_company: '{regular_company.id}',
        },
        type: 'list',
        metadata_query: {
          type: 'jobsite_client',
        },
        query: {
          jobsite: '{id}',
        },
      },
      {
        endpoint: '/core/notes/',
        translateKey: 'notes',
        templateOptions: {
          label: 'Notes',
          type: 'list',
          add_label: '+ Add',
          text: 'Notes',
        },
        add_form: true,
        prefilled: {
          object_id: '{id}',
          content_type: '{model_content_type}',
        },
        type: 'list',
        query: {
          object_id: '{id}',
        },
      },
    ],
  },
  {
    key: 'primary_contact.contact',
    read_only: false,
    hide: true,
    templateOptions: {
      required: true,
      label: 'Contact',
      type: 'text',
    },
    send: false,
    type: 'input',
  },
  {
    key: 'portfolio_manager.contact',
    read_only: false,
    hide: true,
    templateOptions: {
      required: true,
      label: 'Contact',
      type: 'text',
    },
    send: false,
    type: 'input',
  },
  {
    key: 'is_available',
    read_only: false,
    templateOptions: {
      required: false,
      label: 'Available',
      type: 'checkbox',
    },
    hide: true,
    default: false,
    type: 'checkbox',
  },
  {
    key: 'short_name',
    type: 'input',
    hide: true,
    templateOptions: {
      label: 'Site short name',
      max: 63,
      type: 'text',
    },
  },
  {
    endpoint: '/core/companies/',
    hide: true,
    templateOptions: {
      label: 'Provider company',
      values: ['__str__'],
      type: 'related',
    },
    type: 'related',
    key: 'master_company',
  },
  {
    key: 'regular_company',
    endpoint: '/core/companies/',
    read_only: true,
    hide: true,
    send: false,
    templateOptions: {
      label: 'Client',
      values: ['__str__'],
      type: 'related',
    },
    type: 'related',
  },
  {
    endpoint: '/core/addresses/',
    read_only: false,
    hide: true,
    templateOptions: {
      label: 'Address',
      add: true,
      values: ['__str__'],
      type: 'address',
    },
    type: 'address',
    key: 'address',
  },
];

const formadd = [
  {
    label: '{__str__}',
    type: 'row',
    children: [
      {
        type: 'column',
        children: [
          {
            endpoint: '/core/companies/',
            read_only: true,
            key: 'regular_company',
            default: '{company_id}',
            templateOptions: {
              label: 'Client',
              values: [
                'industry',
                'short_name',
                '__str__',
                'master_company',
                'primary_contact',
              ],
              type: 'related',
              required: true,
            },
            type: 'related',
            query: {
              has_industry: '2',
              status: '70',
            },
            many: false,
          },
          {
            endpoint: '/core/companycontacts/',
            key: 'primary_contact',
            templateOptions: {
              required: true,
              label: 'Primary contact',
              values: ['__str__'],
              type: 'related',
            },
            default: '{regular_company.primary_contact.id}',
            showIf: ['regular_company.id'],
            type: 'related',
            query: {
              company: '{regular_company.id}',
            },
          },
          {
            list: false,
            endpoint: '/core/addresses/',
            read_only: false,
            updateFormData: true,
            templateOptions: {
              required: true,
              label: 'Address',
              add: true,
              delete: false,
              values: ['__str__'],
              type: 'address',
              edit: true,
            },
            collapsed: false,
            showIf: ['regular_company.id'],
            type: 'address',
            key: 'address',
            many: false,
          },
          {
            list: false,
            endpoint: '/pricing/industries/',
            read_only: true,
            templateOptions: {
              label: 'Industry',
              values: ['__str__', 'translations'],
              type: 'related',
              required: true,
            },
            checkObject: {
              endpoint: '/hr/jobsites/',
              error: 'Job site with this name already exists, please alter it!',
              query: {
                short_name: '{short_name}',
              },
            },
            collapsed: false,
            default: '{regular_company.industry.id}',
            showIf: ['primary_contact.id', 'address'],
            type: 'related',
            key: 'industry',
            many: false,
          },
          {
            key: 'short_name',
            read_only: false,
            templateOptions: {
              required: false,
              label: 'Site name',
              max: 63,
              type: 'text',
            },
            updated: ['regular_company', 'address'],
            showIf: ['primary_contact.id', 'address'],
            default: '{regular_company.short_name} - {address.vicinity}',
            type: 'input',
          },
        ],
      },
      {
        type: 'column',
        children: [
          {
            list: false,
            endpoint: '/core/companycontacts/',
            read_only: false,
            key: 'portfolio_manager',
            templateOptions: {
              label: 'Portfolio manager',
              add: true,
              delete: false,
              values: ['__str__'],
              type: 'related',
              edit: true,
            },
            default: '{regular_company.primary_contact.id}',
            showIf: ['primary_contact.id', 'address'],
            type: 'related',
            query: {
              master_company: 'current',
            },
            many: false,
          },
          {
            list: false,
            endpoint: '/core/companies/',
            read_only: true,
            key: 'master_company',
            templateOptions: {
              label: 'Provider company',
              add: true,
              delete: false,
              values: ['__str__'],
              type: 'related',
              edit: true,
              required: true,
            },
            collapsed: false,
            default: '{regular_company.master_company.id}',
            showIf: ['primary_contact.id', 'address'],
            type: 'related',
            query: {
              current: '2',
              type: 'master',
            },
            many: false,
          },
          {
            key: 'start_date',
            read_only: false,
            templateOptions: {
              required: false,
              label: 'Start Date',
              type: 'date',
            },
            showIf: ['primary_contact.id', 'address'],
            default: Time.now().format(),
            type: 'datepicker',
          },
          {
            key: 'end_date',
            type: 'datepicker',
            showIf: ['primary_contact.id', 'address'],
            templateOptions: {
              required: false,
              label: 'End Date',
              type: 'date',
            },
            read_only: false,
          },
        ],
      },
    ],
  },
];

export const jobsitesclient = {
  list,
  formset,
  form,
  formadd,
};
