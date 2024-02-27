import { List } from '@webui/metadata';

const list = () => {
  return {
    list: new List.main.element('tag', 'Tag').setColumns([
      new List.column.element('name', 'Tag').setContent([
        new List.text.element('__str__'),
      ]),
    ]),
  };
};

const form = [
  {
    key: 'id',
    type: 'input',
    hide: true,
    templateOptions: {
      required: true,
      label: 'Id',
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'name',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Tag Name',
      max: 63,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'parent',
    type: 'related',
    endpoint: '/core/tags/',
    hideIfNull: true,
    templateOptions: {
      values: ['__str__', 'owner', 'translation'],
      label: 'Parent',
      add: true,
    },
    read_only: false,
  },
  {
    key: 'children',
    many: true,
    type: 'related',
    endpoint: '/core/tags/',
    update: {
      getValue: 'children',
      setValue: {
        field: 'parent',
        value: '{id}',
      },
    },
    hideIfNull: true,
    templateOptions: {
      values: ['__str__', 'owner', 'translation'],
      label: 'Child',
      add: true,
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
  {
    key: 'evidence_required_for_approval',
    type: 'checkbox',
    templateOptions: {
      required: false,
      label: 'Evidence required for approval',
      type: 'checkbox',
    },
    read_only: false,
  },
  {
    key: 'confidential',
    type: 'checkbox',
    templateOptions: {
      required: false,
      label: 'Confidential',
      type: 'checkbox',
    },
    read_only: false,
  },
  {
    key: 'skills',
    many: true,
    type: 'related',
    endpoint: '/skills/skilltags/',
    hideIfNull: true,
    doNotChoice: true,
    send: false,
    prefilled: {
      tag: '{id.id}',
    },
    templateOptions: {
      values: ['__str__', 'name'],
      label: 'Skills',
      delete: true,
      add: true,
      edit: true,
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
      label: 'Tag Name',
      max: 63,
      type: 'text',
    },
    read_only: false,
  },
  {
    key: 'parent',
    type: 'related',
    endpoint: '/core/tags/',
    smallModal: true,
    templateOptions: {
      values: ['__str__', 'owner', 'translation'],
      add: true,
      label: 'Parent',
    },
    read_only: true,
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
  {
    key: 'evidence_required_for_approval',
    type: 'checkbox',
    templateOptions: {
      required: false,
      label: 'Evidence required for approval',
      type: 'checkbox',
    },
    read_only: false,
  },
  {
    key: 'confidential',
    type: 'checkbox',
    templateOptions: {
      required: false,
      label: 'Confidential',
      type: 'checkbox',
    },
    read_only: false,
  },
];

export const tags = {
  list,
  form,
  formadd,
};
