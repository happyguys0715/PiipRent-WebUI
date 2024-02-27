const list = {
  list: {
    list: 'acceptancetestquestion',
    label: 'Acceptance Test Question',
    columns: [
      {
        content: [
          {
            field: '__str__',
            type: 'static',
          },
        ],
        name: '__str__',
        label: 'Acceptance Test Question',
      },
    ],
    pagination_label: 'Acceptance Test Question',
    search_enabled: false,
    editDisable: false,
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Acceptance Test Question',
        type: 'static',
      },
      read_only: true,
    },
  ],
};

const form = [
  {
    type: 'row',
    children: [
      {
        endpoint: '/acceptance-tests/acceptancetestanswers/',
        read_only: true,
        templateOptions: {
          label: 'Acceptance test answers',
          add: true,
          delete: false,
          values: ['__str__'],
          type: 'related',
          edit: true,
        },
        hide: true,
        type: 'related',
        key: 'acceptance_test_answers',
        many: true,
      },
      {
        key: 'id',
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
        key: 'question',
        type: 'textarea',
        templateOptions: {
          required: true,
          label: 'Question',
          max: 255,
        },
      },
      {
        key: 'details',
        type: 'textarea',
        templateOptions: {
          required: false,
          label: 'Details',
        },
      },
      {
        key: 'type',
        type: 'select',
        templateOptions: {
          required: false,
          label: 'Question Type',
          options: [
            { value: 0, label: 'Options' },
            { value: 1, label: 'Text' },
            { value: 2, label: 'Yes/No' },
          ],
        },
      },
      {
        key: 'order',
        type: 'input',
        hide: true,
        templateOptions: {
          required: false,
          label: 'Order',
          type: 'number',
        },
      },
      {
        type: 'button',
        width: 0.2,
        color: 'primary',
        templateOptions: {
          type: 'submit',
          p: true,
          small: true,
        },
      },
    ],
  },
];

const formadd = [
  {
    type: 'row',
    children: [
      {
        key: 'question',
        type: 'textarea',
        templateOptions: {
          label: 'Question',
          max: 255,
        },
      },
      {
        key: 'details',
        type: 'textarea',
        templateOptions: {
          required: false,
          label: 'Details',
        },
      },
      {
        key: 'type',
        type: 'select',
        templateOptions: {
          required: false,
          label: 'Question Type',
          options: [
            { value: 0, label: 'Options' },
            { value: 1, label: 'Text' },
            { value: 2, label: 'Yes/No' },
          ],
        },
      },
      {
        key: 'order',
        type: 'input',
        hide: true,
        templateOptions: {
          required: false,
          label: 'Order',
          type: 'number',
        },
      },
      {
        type: 'button',
        width: 0.2,
        color: 'primary',
        templateOptions: {
          text: 'Save',
          type: 'submit',
          p: true,
          small: true,
        },
      },
    ],
  },
];

export const acceptancetestquestions = {
  list,
  form,
  formadd,
};
