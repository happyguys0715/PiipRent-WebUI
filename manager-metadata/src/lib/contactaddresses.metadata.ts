import { Endpoints } from '@webui/models';

const formset = {
  fields: [
    {
      default: true,
      key: 'is_active',
      read_only: false,
      templateOptions: {
        required: false,
        label: 'Active',
        type: 'checkbox',
      },
      type: 'checkbox',
    },
    {
      key: 'address',
      templateOptions: {
        link: null,
        label: 'Address',
        type: 'link',
        text: 'Address',
      },
      type: 'link',
    },
  ],
  list: {
    columns: [
      {
        name: 'address',
        sort_field: 'address',
        title: null,
        sort: true,
        content: [
          {
            endpoint: `${Endpoints.Address}{address.id}/`,
            label: 'Address',
            type: 'link',
            field: 'address',
          },
        ],
        label: 'Address',
        delim: null,
      },
      {
        name: 'is_active',
        content: [
          {
            type: 'checkbox',
            field: 'is_active',
          },
        ],
        label: 'Active',
      },
      {
        name: 'actions',
        content: [
          {
            action: 'editForm',
            endpoint: `${Endpoints.ContactAddresses}{id}`,
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
    list: 'contactaddress',
    label: 'Contact Address',
    pagination_label: 'Contact Addresses',
  },
};

const form = [
  {
    endpoint: Endpoints.Contact,
    templateOptions: {
      label: 'Contact',
      values: ['__str__'],
      type: 'related',
    },
    read_only: true,
    type: 'related',
    key: 'contact',
  },
  {
    endpoint: '/core/addresses/',
    read_only: true,
    templateOptions: {
      required: true,
      label: 'Address',
      add: true,
      values: ['__str__'],
      type: 'address',
      edit: true,
    },
    type: 'related',
    key: 'address',
  },
  {
    key: 'is_active',
    default: true,
    type: 'checkbox',
    templateOptions: {
      label: 'Active',
      type: 'checkbox',
    },
  },
];

const formadd = [
  {
    endpoint: Endpoints.Contact,
    templateOptions: {
      label: 'Contact',
      values: ['__str__'],
      type: 'related',
    },
    type: 'related',
    key: 'contact',
  },
  {
    endpoint: '/core/addresses/',
    templateOptions: {
      required: true,
      label: 'Address',
      add: true,
      values: ['__str__'],
      type: 'address',
      edit: true,
    },
    type: 'address',
    key: 'address',
  },
  {
    key: 'is_active',
    default: true,
    type: 'checkbox',
    templateOptions: {
      label: 'Active',
      type: 'checkbox',
    },
  },
];

export const contactaddresses = {
  formset,
  form,
  formadd,
};
