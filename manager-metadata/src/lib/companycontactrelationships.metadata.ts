const list = {
  list: {
    list: 'companycontactrelationship',
    label: 'Client Contact Relations',
    buttons: [],
    columns: [
      {
        content: [{ field: '__str__', type: 'static' }],
        name: '__str__',
        label: 'Company Contact Relationship',
      },
    ],
    pagination_label: 'Client Contacts',
    search_enabled: false,
    editDisable: false,
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Company Contact Relationship',
        type: 'static',
      },
      read_only: true,
    },
  ],
};

const formset = {
  fields: [
    {
      key: 'company_contact.job_title',
      read_only: false,
      templateOptions: {
        required: false,
        label: 'Job title',
        max: 31,
        type: 'text',
      },
      type: 'input',
    },
    {
      default: true,
      key: 'company_contact.receive_job_confirmation_sms',
      read_only: false,
      templateOptions: {
        required: false,
        label: 'Receive Job confirmation sms',
        type: 'checkbox',
      },
      type: 'checkbox',
    },
    {
      key: 'company_contact.contact.last_name',
      read_only: false,
      templateOptions: {
        required: true,
        label: 'Last Name',
        max: 255,
        type: 'text',
      },
      type: 'input',
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
      key: 'company_contact.contact.email',
      read_only: false,
      templateOptions: {
        required: true,
        label: 'E-mail',
        max: 255,
        type: 'email',
      },
      type: 'input',
    },
    {
      key: 'company_contact.contact.first_name',
      read_only: false,
      templateOptions: {
        required: true,
        label: 'First Name',
        max: 255,
        type: 'text',
      },
      type: 'input',
    },
    {
      key: 'company_contact.contact.phone_mobile',
      read_only: false,
      templateOptions: { required: true, label: 'Mobile Phone', type: 'text' },
      type: 'input',
    },
  ],
  list: {
    columns: [
      {
        name: 'jobTitle_/_firstName_/_lastName',
        sort: true,
        content: [
          {
            type: 'link',
            field: 'company_contact',
            endpoint: '/core/companycontacts/{company_contact.id}',
          },
        ],
        label:
          'company_contact.job_title / company_contact.contact.first_name / company_contact.contact.last_name',
        sortMap: [
          {
            name: 'jobTitle',
            param: 'company_contact.job_title',
          },
          {
            name: 'firstName',
            param: 'company_contact.contact.first_name',
          },
          {
            name: 'lastName',
            param: 'company_contact.contact.last_name',
          },
        ],
        delim: null,
      },
      {
        name: 'email_/_phone',
        sort: true,
        content: [
          {
            field: 'company_contact.contact.email',
            type: 'link',
            link: 'mailto:{contact.email}',
          },
          {
            type: 'link',
            field: 'company_contact.contact.phone_mobile',
            link: 'tel:{contact.phone_mobile}',
          },
        ],
        label:
          'company_contact.contact.email / company_contact.contact.phone_mobile',
        sortMap: [
          {
            name: 'email',
            param: 'company_contact.contact.email',
          },
          {
            name: 'phone',
            param: 'company_contact.contact.phone_mobile',
          },
        ],
      },
      {
        name: 'company_contact.receive_job_confirmation_sms',
        sort: true,
        sort_field: 'company_contact.receive_job_confirmation_sms',
        content: [
          {
            type: 'checkbox',
            field: 'company_contact.receive_job_confirmation_sms',
          },
        ],
        label: 'Receive Job confirmation sms',
      },
      {
        name: 'actions',
        content: [
          {
            action: 'editForm',
            endpoint: '/core/companycontacts/{company_contact.id}',
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
            translationKey: 'delete',
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
    list: 'companycontactrelationship',
    editDisable: false,
    label: 'Client Contact Relations',
    pagination_label: 'Client Contacts',
    search_enabled: false,
  },
};

const form = [
  {
    key: 'company',
    type: 'input',
    hide: true,
    templateOptions: { required: false, label: 'Company', type: 'text' },
    read_only: true,
  },
  {
    list: false,
    endpoint: '/core/companycontacts/',
    read_only: false,
    templateOptions: {
      label: 'Company contact',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    type: 'related',
    key: 'company_contact',
    many: false,
  },
  {
    key: 'active',
    default: true,
    type: 'checkbox',
    templateOptions: { required: false, label: 'Active', type: 'checkbox' },
    read_only: false,
  },
  {
    key: 'termination_date',
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'Termination date',
      type: 'date',
    },
    read_only: false,
  },
];

const formadd = [
  {
    key: 'company',
    type: 'input',
    hide: true,
    templateOptions: { required: false, label: 'Company', type: 'text' },
    read_only: true,
  },
  {
    list: false,
    endpoint: '/core/companycontacts/',
    read_only: false,
    templateOptions: {
      label: 'Company contact',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    type: 'related',
    key: 'company_contact',
    many: false,
  },
  {
    key: 'active',
    default: true,
    type: 'checkbox',
    templateOptions: { required: false, label: 'Active', type: 'checkbox' },
    read_only: false,
  },
  {
    key: 'termination_date',
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'Termination date',
      type: 'date',
    },
    read_only: false,
  },
];

export const companycontactrelationships = {
  list,
  formset,
  form,
  formadd,
};
