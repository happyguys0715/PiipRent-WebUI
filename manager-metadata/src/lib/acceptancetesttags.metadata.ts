const form = [
  {
    endpoint: '/acceptance-tests/acceptancetests/',
    read_only: true,
    templateOptions: {
      label: 'Acceptance test',
      values: ['__str__'],
      type: 'related',
    },
    type: 'related',
    key: 'acceptance_test',
  },
  {
    endpoint: '/core/tags/',
    read_only: true,
    templateOptions: {
      label: 'Tag',
      values: ['__str__', 'owner', 'translation'],
      type: 'related',
    },
    type: 'related',
    key: 'tag',
  },
];

const formadd = [
  {
    endpoint: '/acceptance-tests/acceptancetests/',
    read_only: true,
    templateOptions: {
      label: 'Acceptance test',
      values: ['__str__'],
      type: 'related',
    },
    type: 'related',
    key: 'acceptance_test',
  },
  {
    endpoint: '/core/tags/',
    read_only: true,
    templateOptions: {
      label: 'Tag',
      values: ['__str__', 'owner', 'translation'],
      type: 'related',
    },
    type: 'related',
    key: 'tag',
  },
];

export const acceptancetesttags = {
  form,
  formadd,
};
