const formadd = [
  {
    endpoint: '/core/companies/',
    read_only: true,
    hide: true,
    templateOptions: {
      label: 'Acceptance test',
      values: ['__str__'],
    },
    type: 'related',
    default: 'currentCompany',
    key: 'company',
  },
  {
    endpoint: '/acceptance-tests/acceptancetests/',
    read_only: true,
    templateOptions: {
      label: 'Acceptance test',
      values: ['__str__'],
    },
    type: 'related',
    key: 'acceptance_test',
  },
  {
    endpoint: '/core/companyworkflownodes/',
    read_only: true,
    templateOptions: {
      label: 'Workflow Node',
      values: ['__str__'],
    },
    query: {
      company: '{company.id}',
    },
    type: 'related',
    key: 'company_workflow_node',
  },
];

const form = [
  {
    endpoint: '/core/companies/',
    read_only: true,
    send: false,
    hide: true,
    templateOptions: {
      label: 'Acceptance test',
      values: ['__str__'],
    },
    type: 'related',
    default: 'currentCompany',
    key: 'company',
  },
  {
    endpoint: '/acceptance-tests/acceptancetests/',
    read_only: true,
    templateOptions: {
      label: 'Acceptance test',
      values: ['__str__'],
    },
    type: 'related',
    key: 'acceptance_test',
  },
  {
    endpoint: '/core/companyworkflownodes/',
    read_only: true,
    templateOptions: {
      label: 'Workflow Node',
      values: ['__str__'],
    },
    query: {
      company: '{company.id}',
    },
    type: 'related',
    key: 'company_workflow_node',
  },
];

export const acceptancetestworkflownodes = {
  form,
  formadd,
};
