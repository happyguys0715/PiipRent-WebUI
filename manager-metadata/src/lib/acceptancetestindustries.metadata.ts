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
    endpoint: '/pricing/industries/',
    read_only: true,
    templateOptions: {
      label: 'Tag',
      values: ['__str__', 'translations'],
      type: 'related',
    },
    type: 'related',
    key: 'industry',
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
    endpoint: '/pricing/industries/',
    read_only: true,
    templateOptions: {
      label: 'Tag',
      values: ['__str__', 'translations'],
      type: 'related',
    },
    type: 'related',
    key: 'industry',
  },
];

export const acceptancetestindustries = {
  form,
  formadd,
};
