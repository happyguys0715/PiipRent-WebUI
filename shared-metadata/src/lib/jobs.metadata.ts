import { createFilter, Type, Form } from '@webui/metadata';
import { Endpoints } from '@webui/models';

const filter = {
  shift_dates: createFilter(Type.Date, {
    key: 'shift_dates__shift_date',
    label: 'Shift start date',
    yesterday: true,
    today: true,
    tomorrow: true,
  }),
  jobsite: createFilter(Type.Related, {
    key: 'jobsite',
    label: 'Jobsite',
    endpoint: Endpoints.Jobsite,
  }),
  position: createFilter(Type.Related, {
    key: 'position',
    label: 'Position',
    endpoint: Endpoints.SkillName,
    parameter: 'skill_id',
    display: 'translations',
  }),
  provider_representative: createFilter(Type.Related, {
    key: 'provider_representative',
    label: 'Provider representative',
    endpoint: Endpoints.CompanyContact,
    queryParams: {
      master_company: 'current',
    },
  }),
  active_states: createFilter(Type.Related, {
    key: 'active_states',
    label: 'State',
    endpoint: Endpoints.WorkflowNode,
    display: [
      'workflow.hr.job.{number}.after',
      'name_after_activation',
      'name_before_activation',
    ],
    parameter: 'number',
    queryParams: {
      company: '{company_settings.company}',
      content_type: 'hr.job',
      number: '{filter_value}',
    },
  }),
  customer_company: createFilter(Type.Related, {
    key: 'customer_company',
    label: 'Client',
    endpoint: Endpoints.Company,
  }),
};

const list = {
  list: {
    list: 'job',
    label: 'Job',
    columns: [
      {
        content: [
          {
            field: 'workers',
            type: 'input',
          },
        ],
        name: 'workers',
        sort_field: 'workers',
        label: 'Workers',
        sort: true,
      },
      {
        content: [
          {
            endpoint: '/hr/jobsites/',
            field: 'jobsite',
            type: 'related',
          },
          {
            endpoint: '/core/companycontacts/',
            field: 'jobsite.primary_contact',
            type: 'related',
          },
          {
            field: 'jobsite.primary_contact.contact.phone_mobile',
            type: 'link',
            link: 'tel:{jobsite.primary_contact.contact.phone_mobile}',
          },
        ],
        name: 'jobsite',
        title: null,
        label: 'Jobsite',
        delim: null,
      },
      {
        content: [
          {
            endpoint: '/skills/skills/',
            field: 'position.name',
            type: 'text',
          },
        ],
        name: 'position',
        sort_field: 'position',
        label: 'Position',
        sort: true,
      },
      {
        content: [
          // {
          //   values: {
          //     0: 'times-circle',
          //     1: 'check-circle',
          //     2: 'exclamation-circle',
          //     3: 'minus-circle',
          //     null: 'minus-circle'
          //   },
          //   field: 'is_fulfilled_today',
          //   type: 'icon',
          //   color: {
          //     0: 'danger',
          //     1: 'success',
          //     2: 'warning'
          //   }
          // },
          {
            values: {
              0: 'times-circle',
              1: 'check-circle',
              2: 'exclamation-circle',
              3: 'minus-circle',
              null: 'minus-circle',
            },
            field: 'is_fulfilled',
            type: 'icon',
            color: {
              0: 'danger',
              1: 'success',
              2: 'warning',
            },
          },
        ],
        name: 'fulfilled',
        // title: 'today / next day',
        label: 'Fulfilled',
        // delim: '/'
      },
      {
        content: [
          {
            field: 'id',
            hidden: 'no_sds',
            icon: 'fa-times',
            action: 'editForm',
            type: 'button',
            translationKey: 'cancel_shift_dates',
            text: 'Cancel Shift Dates',
          },
          {
            field: 'id',
            hidden: 'hide_fillin',
            icon: 'fa-sign-in-alt',
            action: 'fillin',
            type: 'button',
            translationKey: 'fill_in',
            text: 'Fill-in',
          },
          {
            endpoint: '/hr/jobs/{id}/extend',
            field: 'id',
            showIf: [
              {
                extend: true,
              },
            ],
            icon: 'fa-sign-in-alt',
            action: 'editForm',
            type: 'button',
            translationKey: 'extend',
            text: 'Extend',
          },
          {
            showIf: [
              {
                extend: false,
              },
              {
                hide_fillin: true,
              },
              {
                no_sds: true,
              },
            ],
            type: 'static',
            text: 'job_status_btn_not_allowed_label',
          },
        ],
        name: 'actions',
        title: null,
        label: 'Actions',
        delim: null,
      },
      {
        content: [
          {
            field: 'active_states',
            type: 'static',
            translateKey: 'workflow.hr.job.{number}.after',
          },
        ],
        name: 'state',
        title: null,
        label: 'State',
        delim: null,
      },
    ],
    pagination_label: 'Job',
    search_enabled: true,
    editDisable: false,
    filters: [
      filter.shift_dates,
      filter.jobsite,
      filter.position,
      filter.provider_representative,
      filter.active_states,
      filter.customer_company,
    ],
    buttons: [
      {
        action: 'add_object',
        label: 'create_job',
      },
    ],
  },
  fields: [
    {
      key: 'published',
      default: false,
      type: 'checkbox',
      templateOptions: {
        required: false,
        label: 'Published',
        type: 'checkbox',
      },
      read_only: true,
    },
    {
      key: 'publish_on',
      type: 'datepicker',
      templateOptions: {
        required: false,
        label: 'Publishing Date',
        type: 'date',
      },
      read_only: true,
    },
    {
      list: false,
      endpoint: '/skills/skills/',
      read_only: true,
      templateOptions: {
        label: 'Position',
        add: true,
        delete: false,
        values: ['__str__', 'translations', 'name'],
        type: 'related',
        edit: true,
        placeholder: 'Please select role/trade',
      },
      collapsed: false,
      type: 'related',
      key: 'position',
      many: false,
    },
    {
      key: 'is_fulfilled_today',
      type: 'checkbox',
      templateOptions: {
        required: false,
        label: 'Is fulfilled today',
        type: 'icon',
        color: {
          0: 'danger',
          1: 'success',
          2: 'warning',
        },
        values: {
          0: 'times-circle',
          1: 'check-circle',
          2: 'exclamation-circle',
          3: 'minus-circle',
          null: 'minus-circle',
        },
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
      key: 'title',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Title',
        type: 'static',
      },
      read_only: true,
    },
    {
      list: false,
      endpoint: '/hr/jobsites/',
      read_only: true,
      templateOptions: {
        label: 'Jobsite',
        add: true,
        delete: false,
        values: ['__str__'],
        type: 'related',
        edit: true,
      },
      collapsed: false,
      type: 'related',
      key: 'jobsite',
      many: false,
    },
    {
      key: 'updated_at',
      type: 'datepicker',
      templateOptions: {
        required: false,
        label: 'Updated at',
        type: 'datetime',
      },
      read_only: true,
    },
    {
      key: 'expires_on',
      type: 'datepicker',
      templateOptions: {
        required: false,
        label: 'Expiration date',
        type: 'date',
      },
      read_only: true,
    },
    {
      key: 'workers',
      default: 1,
      type: 'input',
      templateOptions: {
        required: false,
        label: 'Workers',
        type: 'number',
        min: 1,
        max: 32767,
      },
      read_only: true,
    },
    {
      key: 'jobsite.primary_contact.contact.phone_mobile',
      type: 'link',
      templateOptions: {
        label: '',
        type: 'link',
        link: 'tel:{field}',
        text: '',
      },
      read_only: true,
    },
    {
      key: 'created_at',
      type: 'datepicker',
      templateOptions: {
        required: false,
        label: 'Created at',
        type: 'datetime',
      },
      read_only: true,
    },
    {
      key: 'id',
      type: 'button',
      templateOptions: {
        action: 'editForm',
        label: '',
        type: 'button',
        text: 'Cancel Shift Dates',
      },
      read_only: true,
    },
    {
      list: false,
      endpoint: '/core/companycontacts/',
      read_only: true,
      templateOptions: {
        label: 'Primary contact',
        add: true,
        delete: false,
        values: ['__str__'],
        type: 'related',
        edit: true,
      },
      collapsed: false,
      type: 'related',
      key: 'jobsite.primary_contact',
      many: false,
    },
    {
      key: 'is_fulfilled',
      type: 'checkbox',
      templateOptions: {
        required: false,
        label: 'Is fulfilled',
        type: 'icon',
        color: {
          0: 'danger',
          1: 'success',
          2: 'warning',
        },
        values: {
          0: 'times-circle',
          1: 'check-circle',
          2: 'exclamation-circle',
          3: 'minus-circle',
          null: 'minus-circle',
        },
      },
      read_only: true,
    },
  ],
};

const formset = {
  fields: [
    {
      key: 'is_fulfilled_today',
      read_only: true,
      templateOptions: {
        required: false,
        values: {
          0: 'times-circle',
          1: 'check-circle',
          2: 'exclamation-circle',
          3: 'minus-circle',
          null: 'minus-circle',
        },
        label: 'Is fulfilled today',
        type: 'icon',
        color: { 0: 'danger', 1: 'success', 2: 'warning' },
      },
      type: 'checkbox',
    },
    {
      key: 'active_states',
      read_only: true,
      templateOptions: {
        required: false,
        label: 'Active states',
        type: 'static',
      },
      type: 'static',
    },
    {
      key: '__str__',
      read_only: true,
      templateOptions: { required: false, label: 'Job', type: 'static' },
      type: 'static',
    },
    {
      key: 'id',
      templateOptions: {
        action: 'fillin',
        label: '',
        type: 'button',
        text: 'Fill in',
      },
      type: 'button',
    },
    {
      many: false,
      key: 'position',
      endpoint: '/skills/skills/',
      collapsed: false,
      list: false,
      templateOptions: {
        add: true,
        delete: false,
        edit: true,
        values: ['__str__', 'translations', 'name'],
        label: 'Position',
        type: 'related',
        placeholder: 'Please select role/trade',
      },
      read_only: true,
      type: 'related',
    },
    {
      key: 'is_fulfilled',
      read_only: true,
      templateOptions: {
        required: false,
        values: {
          0: 'times-circle',
          1: 'check-circle',
          2: 'exclamation-circle',
          3: 'minus-circle',
          null: 'minus-circle',
        },
        label: 'Is fulfilled',
        type: 'icon',
        color: { 0: 'danger', 1: 'success', 2: 'warning' },
      },
      type: 'checkbox',
    },
    {
      default: '07:00:00',
      key: 'default_shift_starting_time',
      read_only: false,
      templateOptions: {
        required: false,
        label: 'Shift Starting Time',
        type: 'time',
      },
      type: 'datepicker',
    },
    {
      key: 'work_start_date',
      read_only: false,
      templateOptions: {
        required: false,
        label: 'Work Start Date',
        type: 'date',
      },
      type: 'datepicker',
    },
  ],
  list: {
    columns: [
      {
        name: '__str__',
        content: [{ type: 'static', field: '__str__' }],
        label: 'Job',
      },
      {
        name: 'position',
        sort: true,
        sort_field: 'position',
        content: [
          {
            endpoint: '/skills/skills/',
            type: 'text',
            field: 'position.name',
          },
        ],
        label: 'Position',
      },
      {
        name: 'work_start_date',
        sort: true,
        sort_field: 'work_start_date',
        content: [{ type: 'datepicker', field: 'work_start_date' }],
        label: 'Work Start Date',
      },
      {
        name: 'shift_starting_time',
        content: [
          {
            label: 'Shift Starting Time',
            type: 'datepicker',
            field: 'default_shift_starting_time',
          },
        ],
        label: 'Shift Starting Time',
        title: null,
        delim: null,
      },
      {
        name: 'fill_in',
        content: [
          {
            action: 'fillin',
            hidden: 'hide_fillin',
            icon: 'fa-sign-in-alt',
            text: 'Fill in',
            type: 'button',
            field: 'id',
          },
        ],
        label: 'Fill in',
        title: null,
        delim: ' ',
      },
      {
        name: 'fulfilled',
        content: [
          {
            color: { 0: 'danger', 1: 'success', 2: 'warning' },
            values: {
              0: 'times-circle',
              1: 'check-circle',
              2: 'exclamation-circle',
              3: 'minus-circle',
              null: 'minus-circle',
            },
            type: 'icon',
            field: 'is_fulfilled_today',
          },
          {
            color: { 0: 'danger', 1: 'success', 2: 'warning' },
            values: {
              0: 'times-circle',
              1: 'check-circle',
              2: 'exclamation-circle',
              3: 'minus-circle',
              null: 'minus-circle',
            },
            type: 'icon',
            field: 'is_fulfilled',
          },
        ],
        label: 'Fulfilled',
        title: 'today / next day',
        delim: '/',
      },
      {
        name: 'state',
        content: [{ type: 'static', field: 'active_states' }],
        label: 'State',
        title: null,
        delim: null,
      },
      {
        name: 'actions',
        content: [
          {
            action: 'editForm',
            endpoint: '/hr/jobs/{id}',
            icon: 'fa-pencil-alt',
            title: 'Edit',
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
      },
    ],
    buttons: [],
    list: 'job',
    editDisable: false,
    label: 'Job',
    pagination_label: 'Job',
    search_enabled: true,
  },
};

const jobsite_client = {
  fields: [
    {
      key: 'is_fulfilled_today',
      read_only: true,
      templateOptions: {
        required: false,
        values: {
          0: 'times-circle',
          1: 'check-circle',
          2: 'exclamation-circle',
          3: 'minus-circle',
          null: 'minus-circle',
        },
        label: 'Is fulfilled today',
        type: 'icon',
        color: { 0: 'danger', 1: 'success', 2: 'warning' },
      },
      type: 'checkbox',
    },
    {
      key: 'active_states',
      read_only: true,
      templateOptions: {
        required: false,
        label: 'Active states',
        type: 'static',
      },
      type: 'static',
    },
    {
      key: '__str__',
      read_only: true,
      templateOptions: { required: false, label: 'Job', type: 'static' },
      type: 'static',
    },
    {
      key: 'id',
      templateOptions: {
        action: 'fillin',
        label: '',
        type: 'button',
        text: 'Fill in',
      },
      type: 'button',
    },
    {
      many: false,
      key: 'position',
      endpoint: '/skills/skills/',
      collapsed: false,
      list: false,
      templateOptions: {
        add: true,
        delete: false,
        edit: true,
        values: ['__str__', 'translations', 'name'],
        label: 'Position',
        type: 'related',
        placeholder: 'Please select role/trade',
      },
      read_only: true,
      type: 'related',
    },
    {
      key: 'is_fulfilled',
      read_only: true,
      templateOptions: {
        required: false,
        values: {
          0: 'times-circle',
          1: 'check-circle',
          2: 'exclamation-circle',
          3: 'minus-circle',
          null: 'minus-circle',
        },
        label: 'Is fulfilled',
        type: 'icon',
        color: { 0: 'danger', 1: 'success', 2: 'warning' },
      },
      type: 'checkbox',
    },
    {
      default: '07:00:00',
      key: 'default_shift_starting_time',
      read_only: false,
      templateOptions: {
        required: false,
        label: 'Shift Starting Time',
        type: 'time',
      },
      type: 'datepicker',
    },
    {
      key: 'work_start_date',
      read_only: false,
      templateOptions: {
        required: false,
        label: 'Work Start Date',
        type: 'date',
      },
      type: 'datepicker',
    },
  ],
  list: {
    columns: [
      {
        name: '__str__',
        content: [{ type: 'static', field: '__str__' }],
        label: 'Job',
      },
      {
        name: 'position',
        sort: true,
        sort_field: 'position',
        content: [
          {
            endpoint: '/skills/skills/',
            type: 'text',
            field: 'position.name',
          },
        ],
        label: 'Position',
      },
      {
        name: 'work_start_date',
        sort: true,
        sort_field: 'work_start_date',
        content: [{ type: 'datepicker', field: 'work_start_date' }],
        label: 'Work Start Date',
      },
      {
        name: 'shift_starting_time',
        content: [
          {
            label: 'Shift Starting Time',
            type: 'datepicker',
            field: 'default_shift_starting_time',
          },
        ],
        label: 'Shift Starting Time',
        title: null,
        delim: null,
      },
      {
        name: 'fill_in',
        content: [
          {
            action: 'fillin',
            hidden: 'hide_fillin',
            icon: 'fa-sign-in-alt',
            text: 'Fill in',
            type: 'button',
            translationKey: 'fill_in',
            field: 'id',
          },
          {
            endpoint: '/hr/jobs/{id}/extend',
            field: 'id',
            showIf: [
              {
                extend: true,
              },
            ],
            icon: 'fa-sign-in-alt',
            action: 'editForm',
            type: 'button',
            translationKey: 'extend',
            text: 'Extend',
          },
        ],
        label: 'Fill in',
        title: null,
        delim: ' ',
      },
      {
        name: 'fulfilled',
        content: [
          {
            color: { 0: 'danger', 1: 'success', 2: 'warning' },
            values: {
              0: 'times-circle',
              1: 'check-circle',
              2: 'exclamation-circle',
              3: 'minus-circle',
              null: 'minus-circle',
            },
            type: 'icon',
            field: 'is_fulfilled_today',
          },
          {
            color: { 0: 'danger', 1: 'success', 2: 'warning' },
            values: {
              0: 'times-circle',
              1: 'check-circle',
              2: 'exclamation-circle',
              3: 'minus-circle',
              null: 'minus-circle',
            },
            type: 'icon',
            field: 'is_fulfilled',
          },
        ],
        label: 'Fulfilled',
        title: 'today / next day',
        delim: '/',
      },
      {
        name: 'state',
        content: [{ type: 'static', field: 'active_states' }],
        label: 'State',
        title: null,
        delim: null,
      },
    ],
    buttons: [],
    list: 'job',
    editDisable: false,
    label: 'Job',
    pagination_label: 'Job',
    search_enabled: true,
  },
};

const form = [
  {
    values: {
      status: {
        field: 'active_states',
      },
      job: 'position.__str__',
      jobsite: 'jobsite',
    },
    type: 'info',
    key: 'id',
  },
  {
    type: 'tabs',
    children: [
      {
        main: true,
        name: 'Job info',
        translateKey: 'job_info',
        type: 'group',
        children: [
          {
            type: 'row',
            children: [
              {
                label: 'General',
                translateKey: 'general',
                type: 'group',
                children: [
                  {
                    key: 'workers',
                    default: 1,
                    type: 'input',
                    templateOptions: {
                      required: false,
                      label: 'Number Of workers',
                      max: 32767,
                      type: 'number',
                      min: 1,
                    },
                    read_only: false,
                  },
                  {
                    key: 'work_start_date',
                    default: '2018-07-04',
                    type: 'datepicker',
                    templateOptions: {
                      required: false,
                      label: 'Work Start Date',
                      type: 'date',
                    },
                    read_only: false,
                  },
                  {
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
                ],
                width: 0.33,
              },
              {
                label: 'Client',
                translateKey: 'client',
                type: 'group',
                children: [
                  {
                    list: false,
                    endpoint: '/core/companies/',
                    read_only: true,
                    key: 'customer_company',
                    templateOptions: {
                      label: 'Client',
                      add: true,
                      delete: false,
                      values: ['__str__'],
                      type: 'related',
                      edit: true,
                    },
                    collapsed: false,
                    type: 'related',
                    query: {
                      fields: 'primary_contact',
                    },
                    many: false,
                  },
                  {
                    endpoint: '/core/companycontacts/',
                    key: 'customer_representative',
                    templateOptions: {
                      label: 'Client representative',
                      values: ['__str__', 'company'],
                      type: 'related',
                      edit: true,
                    },
                    type: 'related',
                    query: {
                      company: '{customer_company.id}',
                    },
                  },
                  {
                    key: 'provider_signed_at',
                    type: 'datepicker',
                    templateOptions: {
                      required: false,
                      label: 'Accepted at',
                      type: 'datetime',
                    },
                    read_only: true,
                  },
                ],
                width: 0.33,
              },
              {
                label: 'Provider',
                translateKey: 'provider',
                type: 'group',
                children: [
                  {
                    list: false,
                    endpoint: '/core/companies/',
                    read_only: true,
                    key: 'provider_company',
                    templateOptions: {
                      label: 'Provider company',
                      add: true,
                      delete: false,
                      values: ['__str__'],
                      type: 'related',
                      edit: true,
                    },
                    collapsed: false,
                    default: '{customer_company.master_company.id}',
                    showIf: ['customer_company.id'],
                    type: 'related',
                    query: {
                      regular_company: '{customer_company.id}',
                      type: 'master',
                    },
                    many: false,
                  },
                  {
                    list: false,
                    endpoint: '/core/companycontacts/',
                    read_only: false,
                    key: 'provider_representative',
                    templateOptions: {
                      label: 'Provider representative',
                      add: true,
                      delete: false,
                      values: ['__str__'],
                      type: 'related',
                      edit: true,
                    },
                    collapsed: false,
                    default: '{customer_company.primary_contact.id}',
                    showIf: ['provider_company.id'],
                    type: 'related',
                    query: {
                      company: '{provider_company.id}',
                    },
                    many: false,
                  },
                ],
                width: 0.33,
              },
            ],
          },
          new Form.row.element().setChildren([
            new Form.textarea.element('notes', 'Notes')
              .setFullWidth()
              .updateTemplate({
                description: 'Job Description/Instructions for candidate',
              }),
          ]),
          {
            endpoint: Endpoints.JobRates,
            type: 'list',
            templateOptions: {
              label: 'Job Rate',
              type: 'list',
              text: 'Job Rate',
              add_label: 'add',
            },
            translateKey: 'jobrates',
            collapsed: false,
            prefilled: {
              job: '{id}',
              skill: '{position.id}',
              company: '{customer_company.id}',
            },
            query: {
              job: '{id}',
            },
          },
          {
            endpoint: Endpoints.JobAmount,
            type: 'list',
            templateOptions: {
              label: 'Job Amount',
              type: 'list',
              text: 'Job Amount',
              add_label: 'add',
            },
            prefilled: {
              job: '{id}',
              company: '{customer_company.id}',
            },
            query: {
              job: '{id}',
            },
          },
        ],
      },
      {
        endpoint: '/hr/shifts/',
        metadata_query: {
          editable_type: 'job',
        },
        add_endpoint: '/hr/shiftdates/',
        edit_endpoint: '/hr/shiftdates/{date.id}',
        translateKey: 'shifts',
        templateOptions: {
          // label: 'Shift Dates',
          type: 'list',
          add_label: '+ Add',
          // text: 'Shift Dates'
        },
        query: {
          job: '{id}',
        },
        prefilled: {
          job: '{id}',
          skill: '{position.id}',
          default_shift_starting_time: '{default_shift_starting_time}',
          workers: '{workers}',
        },
        type: 'list',
        add_metadata_query: {
          fieldsets_type: 'job',
        },
        listKey: 'shifts',
      },
      {
        endpoint: '/hr/joboffers/',
        templateOptions: {
          type: 'list',
          add_label: '+ Add job offer',
          hasButtonInAction: true,
        },
        translateKey: 'job_offers',
        type: 'list',
        query: {
          job: '{id}',
        },
        prefilled: {
          job: '{id}',
        },
        add_metadata_query: {
          type: 'list',
        },
        listKey: 'joboffers',
      },
      {
        name: 'Job states',
        translateKey: 'job_states',
        type: 'group',
        children: [
          {
            key: 'timeline',
            type: 'timeline',
            query: {
              model: 'hr.job',
              object_id: ['{id.id}', '{id}'],
            },
            templateOptions: {
              label: 'States Timeline',
              type: 'timeline',
              text: 'States Timeline',
            },
            endpoint: '/core/workflownodes/timeline/',
          },
          {
            endpoint: '/core/workflowobjects/',
            templateOptions: {
              label: 'States history',
              type: 'list',
              add_label: '+ Add',
              text: 'States history',
            },
            collapsed: false,
            prefilled: {
              object_id: '{id}',
            },
            insertData: {
              model: 'hr.job',
            },
            translateKey: 'workflowobjects',
            type: 'list',
            query: {
              model: 'hr.job',
              object_id: '{id}',
            },
            help: 'Here you can see changes job states',
            listKey: 'workflowobjects',
          },
        ],
      },
      {
        endpoint: '/hr/favouritelists/',
        metadata_query: {
          editable_type: 'job',
        },
        templateOptions: {
          // label: 'Favourite List',
          type: 'list',
          add_label: '+ Add',
          // text: 'Favourite List'
        },
        collapsed: false,
        translateKey: 'favorite_list',
        prefilled: {
          job: '{id}',
          jobsite: '{jobsite.id}',
          company: '{customer_company.id}',
          ['jobsite.primary_contact']: '{jobsite.primary_contact.id}',
        },
        type: 'list',
        query: {
          job: '{id}',
          company_contact: 'session.contact.contact_id',
        },
        help: 'Here you can see the favorite candidates for client',
        listKey: 'favouritelists',
      },
    ],
  },
  {
    endpoint: '/core/tags/',
    key: 'tags',
    hide: true,
    useOptions: true,
    templateOptions: {
      label: 'Tags',
      values: ['__str__', 'id', 'owner', 'translation'],
      type: 'related',
    },
    translateKey: 'tags',
    query: {
      skill: '{position.id}',
    },
    type: 'related',
    many: true,
  },
  {
    endpoint: '/hr/jobsites/',
    read_only: true,
    key: 'jobsite',
    hide: true,
    templateOptions: {
      label: 'Jobsite',
      add: true,
      delete: false,
      values: ['primary_contact', '__str__'],
      type: 'related',
      edit: true,
    },
    type: 'related',
    query: {
      company: '{customer_company.id}',
      primary_contact: '{customer_representative.id}',
    },
  },
  {
    endpoint: '/skills/skills/',
    read_only: true,
    key: 'position',
    hide: true,
    templateOptions: {
      label: 'Position',
      add: false,
      delete: false,
      values: ['__str__', 'translations', 'name'],
      type: 'related',
      edit: true,
      placeholder: 'Please select role/trade',
    },
    type: 'related',
    query: {
      job: '{id}',
    },
  },
];

const formadd = [
  {
    type: 'row',
    children: [
      {
        type: 'column',
        children: [
          {
            endpoint: '/core/companies/',
            read_only: false,
            key: 'customer_company',
            templateOptions: {
              label: 'Client',
              add: true,
              delete: false,
              values: [
                '__str__',
                'master_company',
                'primary_contact',
                'manager',
              ],
              type: 'related',
              edit: true,
              required: true,
            },
            default: '{customer_representative.company.id}',
            reset: ['jobsite', 'position', 'customer_representative'],
            type: 'related',
          },
          {
            list: false,
            endpoint: '/core/companies/',
            read_only: true,
            key: 'provider_company',
            templateOptions: {
              label: 'Provider company',
              add: true,
              delete: false,
              values: ['__str__'],
              type: 'related',
              edit: true,
            },
            collapsed: false,
            default: '{customer_company.master_company.id}',
            showIf: ['customer_company.id'],
            type: 'related',
            query: {
              regular_company: '{customer_company.id}',
              type: 'master',
            },
            many: false,
          },
          {
            list: false,
            endpoint: '/core/companycontacts/',
            read_only: false,
            key: 'provider_representative',
            templateOptions: {
              label: 'Provider representative',
              add: true,
              delete: false,
              values: ['__str__'],
              type: 'related',
              edit: true,
            },
            default: '{customer_company.manager.id}',
            if_master: 'session.contact.contact_id',
            showIf: ['provider_company.id'],
            type: 'related',
            query: {
              company: '{provider_company.id}',
            },
            many: false,
          },
          {
            endpoint: '/core/companycontacts/',
            read_only: false,
            key: 'customer_representative',
            templateOptions: {
              label: 'Client representative',
              add: true,
              delete: false,
              values: ['__str__', 'company'],
              type: 'related',
              edit: true,
            },
            // default: '{jobsite.primary_contact.id}',
            // if_master: '{customer_company.manager.id}',
            type: 'related',
            query: {
              company: '{customer_company.id}',
            },
          },
          {
            endpoint: '/hr/jobsites/',
            read_only: false,
            key: 'jobsite',
            templateOptions: {
              label: 'Jobsite',
              add: true,
              delete: false,
              values: ['primary_contact', '__str__'],
              type: 'related',
              edit: true,
              required: true,
              description: 'Only active jobsites',
            },
            type: 'related',
            // default: {
            //   useIf: ['customer_company.id', 'customer_representative.id'],
            //   query: {
            //     primary_contact: '{customer_representative.id}',
            //   },
            //   only: 1,
            //   manual: true,
            // },
            prefilled: {
              regular_company: '{customer_company.id}',
            },
            disabled: {
              keys: ['customer_company.id'],
              values: [''],
              messages: ['Please select client'],
            },
            query: {
              company: '{customer_company.id}',
              is_available: 'True',
            },
          },
          {
            key: 'provider_signed_at',
            type: 'datepicker',
            showIf: ['provider_signed_at'],
            templateOptions: {
              required: false,
              label: 'Accepted at',
              type: 'datetime',
            },
            read_only: true,
          },
        ],
      },
      {
        type: 'column',
        children: [
          {
            list: false,
            endpoint: '/skills/skills/',
            read_only: true,
            key: 'position',
            templateOptions: {
              label: 'Position',
              add: false,
              delete: false,
              values: [
                '__str__',
                'upper_rate_limit',
                'lower_rate_limit',
                'default_rate',
                'translations',
                'name',
              ],
              type: 'related',
              edit: true,
              required: true,
              placeholder: 'Please select role/trade',
            },
            disabled: {
              keys: ['customer_company.id'],
              values: [''],
              messages: ['Please select client'],
            },
            checkObject: {
              endpoint: '/hr/jobs/',
              error: 'Active Job for Jobsite and Position already exist!',
              query: {
                jobsite: '{jobsite.id}',
                position: '{position.id}',
                state: ['10', '20', '40'],
              },
            },
            collapsed: false,
            type: 'related',
            query: {
              company: '{customer_company.id}',
              active: true,
              priced: true,
            },
            many: false,
          },
          {
            key: 'workers',
            default: 1,
            type: 'input',
            templateOptions: {
              required: true,
              label: 'Number Of workers',
              max: 32767,
              type: 'number',
              min: 1,
            },
            read_only: false,
          },
          {
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
        ],
      },
    ],
  },
  {
    endpoint: Endpoints.JobRates,
    type: 'related',
    key: 'jobrates',
    templateOptions: {
      label: 'Job Rate',
      type: 'list',
      text: 'Job Rate',
      add_label: 'Add',
    },
    translateKey: 'jobrates',
    prefilled: {
      job: '{id}',
      skill: '{position.id}',
      company: '{customer_company.id}',
    },
    delay: true,
    list: true,
    showIf: ['position.id', 'customer_company.id'],
    addAll: {
      endpoint: Endpoints.SkillWorkTypes,
      property: 'worktype',
      properties: {
        rate: `{default_rate}`,
      },
      query: {
        skill: '{position.id}',
        company: '{customer_company.id}',
        fields: [
          'translations',
          'default_rate',
          '__str__',
          'skill_rate_ranges',
        ],
        priced: true,
      },
    },
  },
  {
    key: 'shifts',
    type: 'jobdates',
    removeDate: null,
    value: [],
  },
];

export const jobs = {
  list,
  formset,
  form,
  formadd,
  jobsite_client,
};
