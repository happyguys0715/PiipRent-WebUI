const list = {
  list: {
    list: 'invoiceline',
    label: 'Invoice Line',
    buttons: [],
    columns: [
      {
        content: [{ field: '__str__', type: 'static' }],
        name: '__str__',
        label: 'Invoice Line',
      },
    ],
    pagination_label: 'Invoice Line',
    search_enabled: false,
    editDisable: false,
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Invoice Line',
        type: 'static',
      },
      read_only: true,
    },
  ],
};

const form = [
  {
    list: false,
    endpoint: '/core/invoices/',
    read_only: true,
    templateOptions: {
      label: 'Invoice',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'invoice',
    many: false,
  },
  {
    key: 'date',
    type: 'datepicker',
    templateOptions: { required: true, label: 'Date', type: 'date' },
    read_only: false,
  },
  {
    key: 'units',
    type: 'input',
    templateOptions: { required: true, label: 'Units', type: 'number' },
    read_only: false,
  },
  {
    key: 'notes',
    type: 'textarea',
    templateOptions: { required: true, label: 'Notes', type: 'textarea' },
    read_only: false,
  },
  {
    key: 'unit_price',
    type: 'input',
    templateOptions: { required: true, label: 'Rate', type: 'number' },
    read_only: false,
  },
  {
    key: 'amount',
    type: 'input',
    templateOptions: { required: true, label: 'Amount', type: 'number' },
    read_only: false,
  },
  {
    key: 'unit_type',
    default: 'unit',
    type: 'select',
    templateOptions: {
      required: false,
      label: 'Unit type',
      type: 'select',
      options: [{ value: 'unit', label: 'Unit' }],
    },
    read_only: false,
  },
  { key: 'vat' },
];

const formset = {
  fields: [
    {
      key: 'timesheet',
      templateOptions: {
        link: null,
        label: 'Timesheets',
        type: 'link',
        text: 'Timesheet',
      },
      type: 'link',
    },
    {
      key: 'vat.name',
      read_only: false,
      templateOptions: { required: true, label: 'Code', max: 64, type: 'text' },
      type: 'input',
    },
    {
      key: 'unit_price',
      read_only: false,
      templateOptions: { required: true, label: 'Rate', type: 'number' },
      type: 'input',
    },
    {
      key: 'amount',
      read_only: false,
      templateOptions: { required: true, label: 'Amount', type: 'number' },
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
      key: 'units',
      read_only: false,
      templateOptions: { required: true, label: 'Units', type: 'number' },
      type: 'input',
    },
    {
      key: 'notes',
      read_only: false,
      templateOptions: { required: true, label: 'Notes', type: 'textarea' },
      type: 'textarea',
    },
    {
      key: 'date',
      read_only: false,
      templateOptions: { required: true, label: 'Date', type: 'date' },
      type: 'datepicker',
    },
    {
      many: false,
      key: 'timesheet.job_offer.candidate_contact',
      endpoint: '/candidate/candidatecontacts/',
      collapsed: false,
      list: false,
      templateOptions: {
        add: true,
        delete: false,
        edit: true,
        values: ['__str__'],
        label: 'Candidate contact',
        type: 'related',
      },
      read_only: true,
      type: 'related',
    },
  ],
  list: {
    columns: [
      {
        name: 'date',
        sort: true,
        sort_field: 'date',
        content: [{ type: 'datepicker', field: 'date' }],
        label: 'Date',
      },
      {
        name: 'units',
        sort: true,
        sort_field: 'units',
        content: [{ type: 'input', field: 'units' }],
        label: 'Units',
      },
      {
        name: 'notes',
        sort: true,
        sort_field: 'notes',
        content: [{ type: 'textarea', field: 'notes' }],
        label: 'Notes',
      },
      {
        name: 'timesheet.job_offer.candidate_contact',
        sort: true,
        sort_field: 'timesheet.job_offer.candidate_contact',
        content: [
          {
            endpoint: '/candidate/candidatecontacts/',
            type: 'related',
            field: 'timesheet.job_offer.candidate_contact',
          },
        ],
        label: 'Candidate contact',
      },
      {
        name: 'unit_price',
        sort: true,
        sort_field: 'unit_price',
        content: [{ type: 'input', field: 'unit_price' }],
        label: 'Rate',
      },
      {
        name: 'amount',
        sort: true,
        sort_field: 'amount',
        content: [{ type: 'input', field: 'amount' }],
        label: 'Amount',
      },
      {
        name: 'code',
        content: [{ label: 'Code', type: 'text', field: 'vat.name' }],
        label: 'Code',
        title: null,
        delim: null,
      },
      {
        name: 'timesheets',
        content: [
          {
            text: 'Timesheet',
            endpoint: '/hr/timesheets/{timesheet.id}',
            label: 'Timesheets',
            action: 'timesheetHistory',
            type: 'button',
            // type: 'link',
            field: 'timesheet',
            // translateKey: 'timesheet',    // it is needed for type: 'link'
            translationKey: 'timesheet',
          },
        ],
        label: 'Timesheets',
        title: null,
        delim: null,
      },
      {
        name: 'actions',
        content: [
          {
            action: 'editForm',
            endpoint: '/core/invoicelines/{id}',
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
            translationKey: 'delete',
            type: 'button',
            field: 'id',
          },
        ],
        label: 'Actions',
        title: null,
        delim: null,
      },
    ],
    list: 'invoiceline',
    editDisable: false,
    label: 'Invoice Line',
    pagination_label: 'Invoice Line',
    search_enabled: false,
  },
};

const formadd = [
  {
    list: false,
    endpoint: '/core/invoices/',
    read_only: true,
    templateOptions: {
      required: true,
      label: 'Invoice',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'invoice',
    many: false,
  },
  {
    key: 'date',
    type: 'datepicker',
    templateOptions: { required: true, label: 'Date', type: 'date' },
    read_only: false,
  },
  {
    key: 'units',
    type: 'input',
    templateOptions: { required: true, label: 'Units', type: 'number' },
    read_only: false,
  },
  {
    key: 'notes',
    type: 'textarea',
    templateOptions: { required: true, label: 'Notes', type: 'textarea' },
    read_only: false,
  },
  {
    key: 'unit_price',
    type: 'input',
    templateOptions: { required: true, label: 'Rate', type: 'number' },
    read_only: false,
  },
  {
    key: 'amount',
    type: 'input',
    templateOptions: { required: true, label: 'Amount', type: 'number' },
    read_only: false,
  },
  {
    key: 'unit_type',
    default: 'unit',
    type: 'select',
    templateOptions: {
      required: false,
      label: 'Unit type',
      type: 'select',
      options: [{ value: 'unit', label: 'Unit' }],
    },
    read_only: false,
  },
  { key: 'vat' },
];

export const invoicelines = {
  list,
  formset,
  form,
  formadd,
};
