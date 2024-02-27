import { createFilter, Type, Form, InputType } from '@webui/metadata';
import { Endpoints } from '@webui/models';

const weekOptions = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday',
};

const filters = {
  status: createFilter(Type.Related, {
    key: 'status',
    label: 'Status',
    endpoint: Endpoints.WorkflowNode,
    display: [
      'workflow.core.companyrel.{number}.after',
      'name_after_activation',
      'name_before_activation',
    ],
    parameter: 'number',
    queryParams: {
      company: '{company_settings.company}',
      content_type: 'core.companyrel',
      number: '{filter_value}',
    },
  }),
  manager: createFilter(Type.Related, {
    key: 'portfolio_manager',
    label: 'Portfolio Manager',
    endpoint: Endpoints.CompanyContact,
    queryParams: {
      master_company: 'current',
    },
  }),
  state: createFilter(Type.Related, {
    key: 'state',
    label: 'State',
    endpoint: Endpoints.Region,
    display: 'name',
    queryParams: {
      country: 'AU',
    },
  }),
  creditLimit: createFilter(Type.Range, {
    key: 'approved_credit_limit',
    label: 'Credit Limit',
  }),
};

const list = {
  list: {
    list: 'company',
    label: 'Client',
    columns: [
      {
        content: [
          {
            values: {
              available: 'available',
              address: 'address.__str__',
              description: 'description',
              title: 'name',
              picture: 'logo.origin',
            },
            field: 'id',
            type: 'info',
            label: 'Client Info',
          },
        ],
        name: 'client_info',
        title: null,
        label: 'Client Info',
        delim: null,
      },
      {
        content: [
          {
            endpoint: '/core/companycontacts/{primary_contact.id}/',
            field: 'primary_contact.contact',
            type: 'link',
            display: '{primary_contact.job_title}',
          },
          {
            field: 'primary_contact.contact.email',
            type: 'link',
            label: 'E-mail',
            link: 'mailto:{primary_contact.contact.email}',
          },
          {
            field: 'primary_contact.contact.phone_mobile',
            type: 'link',
            link: 'tel:{primary_contact.contact.phone_mobile}',
          },
        ],
        name: 'primary_contact',
        title: null,
        label: 'Primary Contact',
        delim: null,
      },
      {
        delim: null,
        label: 'Manager',
        sort: true,
        content: [
          {
            endpoint: '/core/companycontacts/{manager.id}/',
            field: 'manager',
            type: 'link',
            label: 'Manager',
            display: '{manager.job_title}',
          },
        ],
        name: 'manager',
        title: null,
        sort_field: 'manager',
      },
      {
        content: [
          {
            field: 'credit_approved',
            type: 'static',
          },
          {
            values: {
              false: 'circle',
              true: 'circle',
              null: 'minus-circle',
            },
            field: 'credit_check',
            type: 'icon',
            color: {
              false: 'danger',
              true: 'success',
            },
          },
          {
            field: 'approved_credit_limit',
            type: 'static',
          },
          {
            field: 'terms_of_pay',
            type: 'static',
          },
        ],
        name: 'credit_info',
        title: null,
        label: 'Credit Info',
        delim: null,
      },
      {
        content: [
          {
            field: 'latest_state',
            outline: true,
            type: 'tags',
            translateKey: 'workflow.core.companyrel.{number}.after',
            color: {
              danger: [0, 80, 90],
            },
            label: 'Client State',
            color_attr: 'number',
          },
        ],
        name: 'client_state',
        title: null,
        label: 'Client State',
        delim: null,
      },
    ],
    pagination_label: 'Clients',
    search_enabled: true,
    editDisable: false,
    filters: [
      filters.status,
      filters.manager,
      filters.state,
      {
        key: 'credit_check',
        label: 'Credit Check',
        options: [
          {
            value: 'True',
            label: 'Approved',
            key: 'approved',
          },
          {
            value: 'False',
            label: 'Unapproved',
            key: 'unapproved',
          },
        ],
        query: 'credit_check',
        default: null,
        multiple: false,
        type: 'checkbox',
      },
      filters.creditLimit,
    ],
    buttons: [
      {
        action: 'add_object',
        label: 'client.add',
      },
    ],
  },
  fields: [
    {
      key: 'terms_of_pay',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Terms of Payment',
        type: 'static',
      },
      read_only: true,
    },
    {
      key: 'credit_approved',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Credit approved',
        type: 'static',
      },
      read_only: true,
    },
    {
      key: 'manager',
      type: 'link',
      templateOptions: {
        label: 'Manager',
        type: 'link',
        link: null,
        text: 'Manager',
      },
      read_only: true,
    },
    {
      key: 'credit_check',
      default: false,
      type: 'checkbox',
      templateOptions: {
        required: false,
        label: 'Credit Check',
        options: [
          {
            value: true,
            label: 'Approved',
          },
          {
            value: false,
            label: 'Not Approved',
          },
        ],
        values: {
          false: 'circle',
          true: 'circle',
          null: 'minus-circle',
        },
        type: 'icon',
        color: {
          false: 'danger',
          true: 'success',
        },
      },
      read_only: true,
    },
    {
      read_only: true,
      values: {
        available: 'available',
        address: 'address.__str__',
        description: 'description',
        title: 'name',
        picture: 'logo.origin',
      },
      type: 'info',
      key: 'id',
    },
    {
      key: 'latest_state',
      type: 'tags',
      templateOptions: {
        required: false,
        label: 'Client State',
        type: 'tags',
        color: {
          danger: [0, 80, 90],
        },
        color_attr: 'number',
      },
      read_only: true,
    },
    {
      key: 'primary_contact.contact.phone_mobile',
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
      key: 'primary_contact.contact.email',
      type: 'link',
      templateOptions: {
        label: 'E-mail',
        type: 'link',
        link: 'mailto:{field}',
        text: 'E-mail',
      },
      read_only: true,
    },
    {
      key: 'approved_credit_limit',
      default: 0.0,
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Approved Credit Limit',
        type: 'static',
      },
      read_only: true,
    },
    {
      key: 'primary_contact.contact',
      type: 'link',
      templateOptions: {
        label: '',
        type: 'link',
        link: null,
        text: '',
      },
      read_only: true,
    },
  ],
};

const form = [
  {
    values: {
      created_at: 'created_at',
      status: {
        field: 'active_states',
        color: {
          danger: [0, 80, 90],
          color_attr: 'number',
        },
      },
      address: 'address.__str__',
      title: 'name',
      updated_at: 'updated_at',
      link: 'website',
      picture: 'logo',
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
        type: 'group',
        translateKey: 'general_info',
        label: 'General information',
        children: [
          {
            type: 'row',
            children: [
              {
                label: 'Primary Contact',
                type: 'group',
                translateKey: 'primary_contact',
                children: [
                  {
                    list: false,
                    endpoint: '/core/companycontacts/',
                    read_only: false,
                    key: 'primary_contact',
                    templateOptions: {
                      label: 'Name',
                      add: true,
                      delete: false,
                      values: ['contact', 'job_title'],
                      type: 'related',
                      edit: true,
                      display: '{contact.__str__}',
                    },
                    prefilled: {
                      company: '{id.id}',
                      content_type: '{model_content_type}',
                    },
                    type: 'related',
                    query: {
                      company: '{id.id}',
                    },
                    many: false,
                  },
                  {
                    key: 'primary_contact.job_title',
                    send: false,
                    type: 'input',
                    default: '{primary_contact.job_title}',
                    showIf: ['primary_contact.id'],
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
                    type: 'input',
                    templateOptions: {
                      placeholder: 'E-mail',
                      required: true,
                      label: 'E-mail',
                      max: 255,
                      type: 'text',
                    },
                    read_only: false,
                  },
                  {
                    key: 'primary_contact.contact.phone_mobile',
                    type: 'input',
                    intl: true,
                    templateOptions: {
                      placeholder: 'Mobile phone',
                      required: true,
                      label: 'Phone number',
                      type: 'text',
                    },
                    read_only: false,
                  },
                ],
                width: 0.25,
              },
              {
                label: 'Additional Info',
                translateKey: 'additional_contact',
                type: 'group',
                children: [
                  {
                    key: 'short_name',
                    type: 'input',
                    templateOptions: {
                      required: false,
                      label: 'Short name',
                      description: 'Used for Jobsite naming',
                      max: 31,
                      type: 'text',
                    },
                    read_only: false,
                  },
                  new Form.input.element(
                    'business_id',
                    'Business Number',
                    InputType.Text
                  )
                    .setRequired()
                    .setPattern('^[0-9]+$', 'error.invalid-business-number'),
                  {
                    key: 'myob_card_id',
                    type: 'input',
                    templateOptions: {
                      label: 'MYOB Card ID',
                      type: 'text',
                    },
                    showIf: [{ type: 'regular' }, { country_code: 'AU' }],
                  },
                  {
                    key: 'registered_for_gst',
                    default: false,
                    type: 'checkbox',
                    templateOptions: {
                      required: false,
                      label: '{vat_name}',
                      label_default: 'VAT Name',
                      type: 'checkbox',
                      text: 'Registered',
                    },
                    read_only: false,
                  },
                  {
                    key: 'company_settings.allow_job_creation',
                    type: 'checkbox',
                    templateOptions: {
                      label: 'Allow Job/Jobsite creation',
                      type: 'checkbox',
                    },
                    showIf: [{ type: 'regular' }],
                  },
                  {
                    key: 'company_settings.id',
                    type: 'related',
                    templateOptions: {
                      label: 'Company Settings',
                    },
                    hide: true,
                  },
                ],
                width: 0.25,
              },
              {
                label: 'Portfolio Manager',
                translateKey: 'portfolio_manager',
                type: 'group',
                children: [
                  {
                    list: false,
                    endpoint: '/core/companycontacts/',
                    read_only: false,
                    key: 'manager',
                    templateOptions: {
                      label: 'Name',
                      add: false,
                      delete: false,
                      values: ['__str__'],
                      type: 'related',
                      edit: true,
                    },
                    collapsed: false,
                    showIf: [
                      {
                        type: 'regular',
                      },
                    ],
                    type: 'related',
                    query: {
                      company: '{master_company.id}',
                    },
                    many: false,
                  },
                  {
                    endpoint: '/core/companies/',
                    read_only: true,
                    key: 'master_company',
                    templateOptions: {
                      label: 'Master company',
                      type: 'related',
                    },
                    showIf: [
                      {
                        type: 'regular',
                      },
                    ],
                    type: 'related',
                    query: {
                      type: 'master',
                    },
                  },
                ],
                width: 0.25,
              },
              {
                type: 'group',
                children: [
                  {
                    endpoint: '/pricing/industries/',
                    read_only: false,
                    templateOptions: {
                      label: 'Industries',
                      values: ['__str__', 'translations'],
                      type: 'related',
                    },
                    column: true,
                    sendData: ['default'],
                    type: 'related',
                    replaceKey: 'industries_objects',
                    key: 'industries',
                    many: true,
                  },
                ],
                width: 0.25,
              },
            ],
          },
          {
            type: 'row',
            children: [
              {
                label: 'Credit Info and billing terms',
                type: 'group',
                translateKey: 'credit_info',
                children: [
                  {
                    key: 'credit_check',
                    default: false,
                    type: 'select',
                    templateOptions: {
                      required: false,
                      label: 'Credit Check',
                      type: 'select',
                      options: [
                        {
                          value: true,
                          label: 'Approved',
                        },
                        {
                          value: false,
                          label: 'Not Approved',
                        },
                      ],
                    },
                    read_only: false,
                  },
                  {
                    key: 'credit_check_proof',
                    type: 'input',
                    templateOptions: {
                      required: false,
                      label: 'Credit Check Proof',
                      max: 100,
                      label_photo: 'Take a photo',
                      label_upload: 'Choose a file',
                      type: 'picture',
                    },
                    read_only: false,
                  },
                  {
                    key: 'credit_check_date',
                    type: 'datepicker',
                    templateOptions: {
                      required: false,
                      label: 'Approval date',
                      type: 'date',
                    },
                    read_only: false,
                  },
                ],
                width: 0.25,
              },
              {
                type: 'group',
                children: [
                  {
                    key: 'approved_credit_limit',
                    default: 0.0,
                    type: 'input',
                    templateOptions: {
                      required: false,
                      label: 'Approved Credit Limit',
                      type: 'number',
                    },
                    read_only: false,
                  },
                  {
                    key: 'terms_of_payment',
                    default: 'on_delivery',
                    type: 'select',
                    templateOptions: {
                      required: false,
                      label: 'Terms of Payment',
                      type: 'select',
                      options: [
                        {
                          value: 'prepaid',
                          label: 'Prepaid',
                        },
                        {
                          value: 'on_delivery',
                          label: 'Cash on delivery',
                        },
                        {
                          value: 'days',
                          label: 'NET Days',
                        },
                        {
                          value: 'days_eom',
                          label: 'Days after EOM',
                        },
                      ],
                    },
                    read_only: false,
                  },
                  {
                    key: 'payment_due_date',
                    default: 0,
                    type: 'input',
                    templateOptions: {
                      required: false,
                      label: 'Number of days to pay',
                      type: 'number',
                      min: 0,
                      description:
                        'Or set the day of the month within which the payment must be made to pay',
                      max: 32767,
                    },
                    read_only: false,
                  },
                ],
                width: 0.25,
              },
              {
                type: 'group',
                children: [
                  {
                    key: 'billing_email',
                    type: 'input',
                    templateOptions: {
                      required: false,
                      label: 'Billing E-mail',
                      max: 255,
                      type: 'email',
                    },
                    read_only: false,
                  },
                  {
                    key: 'invoice_rule.id',
                    type: 'input',
                    hide: true,
                    templateOptions: {
                      required: false,
                      label: 'Id',
                      type: 'text',
                    },
                    read_only: true,
                  },
                  {
                    key: 'invoice_rule.separation_rule',
                    default: 'one_invoice',
                    type: 'select',
                    translateKey: 'separation_rule',
                    templateOptions: {
                      required: false,
                      label: 'Separation rule',
                      type: 'select',
                      options: [
                        {
                          value: 'one_invoice',
                          label: 'One invoice',
                        },
                        {
                          value: 'per_jobsite',
                          label: 'Per jobsite',
                        },
                        {
                          value: 'per_candidate',
                          label: 'Per candidate',
                        },
                      ],
                    },
                    read_only: false,
                  },
                  {
                    key: 'invoice_rule.period',
                    default: 'weekly',
                    type: 'select',
                    translateKey: 'period',
                    templateOptions: {
                      required: false,
                      label: 'Invoice Frequency',
                      type: 'select',
                      options: [
                        {
                          value: 'weekly',
                          label: 'Weekly',
                        },
                        {
                          value: 'fortnightly',
                          label: 'Fortnightly',
                        },
                        {
                          value: 'monthly',
                          label: 'Monthly',
                        },
                        {
                          value: 'daily',
                          label: 'Daily',
                        },
                      ],
                    },
                    read_only: false,
                  },
                  // {
                  //   key: 'invoice_rule.period_zero_reference',
                  //   read_only: false,
                  //   templateOptions: {
                  //     required: false,
                  //     label: 'Period zero reference',
                  //     max: 2147483647,
                  //     type: 'text',
                  //     min: -2147483648
                  //   },
                  //   showIf: [
                  //     {
                  //       type: 'master'
                  //     }
                  //   ],
                  //   default: 1,
                  //   type: 'input'
                  // },
                  {
                    key: 'invoice_rule.serial_number',
                    type: 'input',
                    showIf: [
                      {
                        type: 'master',
                      },
                    ],
                    templateOptions: {
                      required: false,
                      label: 'Serial number',
                      max: 20,
                      type: 'text',
                    },
                    read_only: false,
                  },
                ],
                width: 0.25,
              },
              {
                type: 'group',
                children: [
                  {
                    key: 'invoice_rule.starting_number',
                    read_only: false,
                    templateOptions: {
                      required: false,
                      label: 'Starting number',
                      max: 2147483647,
                      type: 'text',
                      min: -2147483648,
                    },
                    showIf: [
                      {
                        type: 'master',
                      },
                    ],
                    default: 1,
                    type: 'input',
                  },
                  {
                    key: 'invoice_rule.notice',
                    type: 'input',
                    showIf: [
                      {
                        type: 'master',
                      },
                    ],
                    templateOptions: {
                      required: false,
                      label: 'Notice',
                      type: 'text',
                    },
                    read_only: false,
                  },
                  {
                    key: 'invoice_rule.comment',
                    type: 'input',
                    showIf: [
                      {
                        type: 'master',
                      },
                    ],
                    templateOptions: {
                      required: false,
                      label: 'Comment',
                      type: 'text',
                    },
                    read_only: false,
                  },
                  {
                    key: 'invoice_rule.show_candidate_name',
                    default: false,
                    type: 'checkbox',
                    templateOptions: {
                      required: false,
                      label: 'Show Candidate name',
                      type: 'checkbox',
                      text: 'Show name',
                    },
                    read_only: false,
                  },
                ],
                width: 0.25,
              },
            ],
          },
          {
            type: 'row',
            children: [
              new Form.group.element('Timesheet', 'timesheet')
                .setChildren([
                  {
                    key: 'timesheet_approval_scheme',
                    default: 'PIN',
                    type: 'select',
                    templateOptions: {
                      required: false,
                      label: 'TimeSheet approval scheme',
                      type: 'select',
                      options: [
                        {
                          value: 'BASIC',
                          label: 'Basic',
                        },
                        // {
                        //   value: 'PIN',
                        //   label: 'PIN'
                        // },
                        {
                          value: 'SIGNATURE',
                          label: 'Signature',
                        },
                      ],
                    },
                    read_only: false,
                  },
                  new Form.select.element(
                    'invoice_rule.period_zero_reference_weekly',
                    'Invoice generation time'
                  )
                    .setTranslateKey('period_zero_reference_weekly')
                    .addOptions(weekOptions)
                    .setShowIfRule([{ 'invoice_rule.period': 'weekly' }]),

                  new Form.select.element(
                    'invoice_rule.period_zero_reference_fortnightly',
                    'Invoice generation time'
                  )
                    .setTranslateKey('period_zero_reference_fortnightly')
                    .addOptions(weekOptions)
                    .setShowIfRule([{ 'invoice_rule.period': 'fortnightly' }]),

                  {
                    type: 'datepicker',
                    key: 'invoice_rule.period_zero_reference_date',
                    translateKey: 'period_zero_reference_date',
                    customDatepicker: {
                      dateFormat: 'DD',
                      datepickerFormat: '%d',
                      parseFormat: 'DD',
                    },
                    templateOptions: {
                      label: 'Invoice generation time',
                      type: 'date',
                      clear: false,
                      change: false,
                    },
                    showIf: [
                      {
                        'invoice_rule.period': 'monthly',
                      },
                    ],
                  },
                ])
                .setWidth(0.25),

              new Form.group.element('About company', 'about_company')
                .setChildren([
                  {
                    key: 'description',
                    type: 'textarea',
                    templateOptions: {
                      full: true,
                      required: false,
                      label: 'Public description',
                      type: 'textarea',
                    },
                    read_only: false,
                  },
                ])
                .setWidth(0.75),
            ],
          },
        ],
      },
      {
        endpoint: '/core/companyaddresses/',
        templateOptions: {
          label: 'Company Address',
          type: 'list',
          add_label: '+ Add',
          text: 'Company Address',
        },
        collapsed: false,
        translateKey: 'addresses',
        prefilled: {
          company: '{id}',
        },
        type: 'list',
        query: {
          company: '{id}',
        },
        help: 'All addresses of the company',
      },
      {
        endpoint: '/core/companycontactrelationships/',
        add_endpoint: '/core/companycontacts/',
        templateOptions: {
          label: 'Client Contacts',
          type: 'list',
          add_label: '+ Add',
          text: 'Client Contacts',
          customLabel: {
            field: 'type',
            values: {
              master: 'Company Contacts',
              regular: 'Client Contacts',
            },
          },
        },
        translateKey: 'company_contacts',
        prefilled: {
          company: '{id}',
        },
        type: 'list',
        query: {
          company: '{id}',
        },
      },
      {
        endpoint: '/hr/jobsites/',
        templateOptions: {
          label: 'Jobsites',
          type: 'list',
          add_label: '+ Add',
          text: 'Jobsites',
        },
        translateKey: 'jobsites',
        prefilled: {
          regular_company: '{id}',
        },
        type: 'list',
        query: {
          company: '{id}',
        },
        help: 'Jobsites from the client company',
      },
      {
        endpoint: '/pricing/pricelists/',
        metadata_query: {
          editable_type: 'company',
        },
        templateOptions: {
          label: 'Price list',
          type: 'list',
          add_label: '+ Add',
          text: 'Price list',
        },
        translateKey: 'pricelists',
        collapsed: false,
        prefilled: {
          company: '{id}',
        },
        type: 'list',
        query: {
          company: '{id}',
        },
      },
      {
        name: 'States',
        translateKey: 'states',
        type: 'group',
        children: [
          {
            key: 'timeline',
            type: 'timeline',
            query: {
              model: 'core.companyrel',
              object_id: ['{id.id}', '{id}', '{regular_company_rel.id}'],
            },
            templateOptions: {
              label: '',
              type: 'timeline',
              text: '',
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
            insertData: {
              model: 'core.companyrel',
            },
            prefilled: {
              object_id: '{regular_company_rel.id}',
            },
            type: 'list',
            query: {
              object_id: ['{id.id}', '{id}', '{regular_company_rel.id}'],
            },
            help: 'Here you can see changes client company states',
          },
        ],
      },
      {
        endpoint: '/core/invoices/',
        type: 'list',
        query: {
          customer_company: '{id}',
        },
        translateKey: 'invoices',
        templateOptions: {
          label: 'Invoices',
          type: 'list',
          text: 'Invoices',
        },
        collapsed: false,
      },
      {
        // endpoint: `${Endpoints.CompanyLanguages}{id}/languages/`,
        endpoint: `${Endpoints.CompanyLanguages_new_endpoint}`,
        query: {
          // company_id: '{id}',
          company: '{id}',
        },
        templateOptions: {
          label: 'Languages',
          type: 'list',
          add_label: '+ Add',
          text: 'Languages',
        },
        translateKey: 'languages',
        prefilled: {
          company: '{id}',
        },
        type: 'list',
      },
      {
        endpoint: '/core/notes/',
        templateOptions: {
          label: 'Notes',
          type: 'list',
          add_label: '+ Add',
          text: 'Notes',
        },
        add_form: true,
        collapsed: false,
        translateKey: 'notes',
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
    key: 'manager.contact',
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
    key: 'type',
    read_only: false,
    templateOptions: {
      required: false,
      label: 'Company type',
      type: 'text',
      options: [
        {
          value: 'master',
          label: 'Master',
        },
        {
          value: 'regular',
          label: 'Regular',
        },
      ],
    },
    hide: true,
    default: 'regular',
    type: 'input',
  },
  {
    key: 'name',
    type: 'input',
    hide: true,
    templateOptions: {
      required: true,
      label: 'Company Name',
      type: 'text',
      max: 127,
    },
    read_only: false,
  },
  {
    key: 'logo',
    read_only: false,
    templateOptions: {
      required: false,
      label: 'Logo',
      max: 100,
      file: false,
      type: 'picture',
    },
    hide: true,
    default: 'company_pictures/default_picture.jpg',
    type: 'input',
  },
  {
    list: false,
    endpoint: '/core/addresses/',
    read_only: true,
    hide: true,
    templateOptions: {
      label: 'Address',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'address',
      edit: true,
    },
    collapsed: false,
    type: 'address',
    key: 'address',
    many: false,
  },
  {
    key: 'name',
    type: 'input',
    hide: true,
    templateOptions: {
      required: true,
      label: 'Company Name',
      type: 'text',
      max: 127,
    },
    read_only: false,
  },
  {
    key: 'website',
    type: 'input',
    hide: true,
    templateOptions: {
      required: false,
      label: 'Website',
      max: 200,
      type: 'text',
    },
    read_only: false,
  },
];

const formadd = [
  {
    key: 'name',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Company Name',
      max: 127,
      type: 'text',
    },
    read_only: false,
  },
  new Form.input.element('business_id', 'Business Number', InputType.Text)
    .setRequired()
    .setPattern('^[0-9]+$', 'error.invalid-business-number'),
];

export const companies = {
  list,
  form,
  formadd,
};

export const purposeOptions = {
  hire: 'Hire',
  self_use: 'Self use',
  recruitment: 'Recruitment',
};
