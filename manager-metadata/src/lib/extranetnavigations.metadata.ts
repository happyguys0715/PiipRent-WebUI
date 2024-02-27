const list = {
  list: {
    list: 'extranetnavigation',
    label: 'Extranet Navigation',
    columns: [
      {
        content: [
          {
            field: '__str__',
            type: 'static',
          },
        ],
        name: '__str__',
        label: 'Extranet Navigation',
      },
    ],
    pagination_label: 'Extranet Navigation',
    search_enabled: false,
    editDisable: false,
  },
  fields: [
    {
      key: '__str__',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Extranet Navigation',
        type: 'static',
      },
      read_only: true,
    },
  ],
};

const form = [
  {
    key: 'name',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Menu Title',
      max: 63,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'url',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Default Url',
      max: 63,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'endpoint',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'DRF Endpoint',
      max: 63,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'children',
    type: 'static',
    templateOptions: {
      required: false,
      label: 'Childrens',
      type: 'static',
    },
    read_only: true,
  },
];

const formadd = [
  {
    key: 'name',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Menu Title',
      max: 63,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'url',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Default Url',
      max: 63,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'endpoint',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'DRF Endpoint',
      max: 63,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'children',
    type: 'static',
    templateOptions: {
      required: false,
      label: 'Childrens',
      type: 'static',
    },
    read_only: true,
  },
];

export const extranetnavigations = {
  list,
  form,
  formadd,
};
