const list = {
  list: {
    list: 'workflowobject',
    label: 'Workflow object',
    columns: [
      {
        content: [
          {
            field: 'state_name',
            type: 'static',
          },
        ],
        name: 'state_name',
        label: 'State name',
      },
      {
        content: [
          {
            field: 'comment',
            type: 'input',
          },
        ],
        name: 'comment',
        sort_field: 'comment',
        label: 'Comments',
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
    pagination_label: 'Workflow object',
    search_enabled: false,
    editDisable: false,
    filters: [
      // {
      //   key: 'object_id',
      //   label: 'Object id',
      //   type: 'text',
      //   default: null
      // },
      {
        key: 'active',
        label: 'Active',
        options: [
          {
            value: 'True',
            label: 'Yes',
          },
          {
            value: 'False',
            label: 'No',
          },
        ],
        query: 'active',
        default: null,
        type: 'checkbox',
      },
      // {
      //   key: 'state.workflow.name',
      //   label: 'Name',
      //   type: 'text',
      //   default: null
      // }
    ],
  },
  fields: [
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
      key: 'state_name',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'State name',
        type: 'static',
      },
      read_only: true,
    },
    {
      key: 'comment',
      type: 'input',
      templateOptions: {
        required: false,
        label: 'Comments',
        description: 'State Change Comment',
        type: 'text',
      },
      read_only: true,
    },
  ],
};

const formset = {
  fields: [
    {
      key: 'created_by',
      read_only: true,
      templateOptions: { required: false, label: 'Created by', type: 'static' },
      type: 'static',
    },
    {
      key: 'state_name',
      read_only: true,
      templateOptions: { required: false, label: 'State name', type: 'static' },
      type: 'static',
    },
    {
      default: true,
      key: 'active',
      read_only: false,
      templateOptions: { required: false, label: 'Active', type: 'checkbox' },
      type: 'checkbox',
    },
    {
      key: 'comment',
      read_only: false,
      templateOptions: {
        required: false,
        description: 'State Change Comment',
        label: 'Comments',
        type: 'text',
      },
      type: 'input',
    },
    {
      key: 'updated_at',
      read_only: true,
      templateOptions: {
        required: false,
        label: 'Updated at',
        type: 'datetime',
      },
      type: 'datepicker',
    },
    {
      key: 'updated_by',
      read_only: true,
      templateOptions: { required: false, label: 'Updated by', type: 'static' },
      type: 'static',
    },
    {
      key: 'created_at',
      read_only: true,
      templateOptions: {
        required: false,
        label: 'Created at',
        type: 'datetime',
      },
      type: 'datepicker',
    },
  ],
  list: {
    columns: [
      {
        name: 'state',
        content: [
          {
            type: 'static',
            field: 'state',
            display: `workflow.{model}.{state.number}.after`,
            jsonTranslate: true,
          },
        ],
        label: 'State name',
        width: 150,
      },
      {
        name: 'active',
        sort: true,
        sort_field: 'active',
        content: [{ type: 'checkbox', field: 'active' }],
        label: 'Active',
        width: 100,
      },
      {
        name: 'comment',
        sort: true,
        sort_field: 'comment',
        content: [
          {
            type: 'input',
            field: 'comment',
            color: 'comment',
            setColor: '{comment}',
          },
        ],
        label: 'Comments',
      },
      {
        name: 'created',
        content: [
          {
            type: 'datepicker',
            field: 'created_at',
          },
          {
            type: 'static',
            field: 'created_by',
            color: 'description',
            setColor: '{created_by}',
          },
        ],
        label: 'Created',
        width: 150,
        title: null,
        delim: null,
      },
      {
        name: 'updated',
        content: [
          {
            type: 'datepicker',
            field: 'updated_at',
          },
          {
            type: 'static',
            field: 'updated_by',
            color: 'description',
            setColor: '{updated_by}',
          },
        ],
        label: 'Updated',
        width: 150,
        title: null,
        delim: null,
      },
    ],
    list: 'workflowobject',
    editDisable: false,
    label: 'Workflow object',
    pagination_label: 'Workflow object',
    search_enabled: false,
  },
};

const form = [
  {
    key: 'object_id',
    type: 'input',
    hide: true,
    templateOptions: {
      required: true,
      label: 'Object id',
      type: 'text',
      description: 'ID of Object belonging to model in Workflow',
    },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/core/workflownodes/',
    read_only: false,
    templateOptions: {
      label: 'State',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'state',
    many: false,
  },
  {
    key: 'comment',
    type: 'textarea',
    templateOptions: {
      required: false,
      label: 'Comments',
      type: 'textarea',
      description: 'State Change Comment',
    },
    read_only: false,
  },
  {
    key: 'score',
    type: 'input',
    default: 1,
    templateOptions: {
      required: false,
      min: 1,
      max: 5,
      label: 'Score',
      type: 'number',
    },
    read_only: false,
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
];

const formadd = [
  {
    key: 'object_id',
    type: 'input',
    hide: true,
    templateOptions: {
      required: true,
      label: 'Object id',
      type: 'text',
      description: 'ID of Object belonging to model in Workflow',
    },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/core/workflownodes/',
    read_only: false,
    templateOptions: {
      label: 'State',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'state',
    many: false,
  },
  {
    key: 'comment',
    type: 'textarea',
    templateOptions: {
      required: false,
      label: 'Comments',
      type: 'textarea',
      description: 'State Change Comment',
    },
    read_only: false,
  },
  {
    key: 'score',
    type: 'input',
    default: 1,
    templateOptions: {
      required: false,
      min: 1,
      max: 5,
      label: 'Score',
      type: 'number',
    },
    read_only: false,
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
];

export const workflowobjects = {
  list,
  formset,
  form,
  formadd,
};
