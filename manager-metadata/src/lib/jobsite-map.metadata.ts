const filters = [
  {
    key: 'filterby',
    label: 'By Type',
    options: [
      {
        value: 'clients',
        label: 'All Clients',
      },
      {
        value: 'only_hqs',
        label: 'Only Client HQs',
      },
      {
        value: 'jobsites',
        label: 'All Jobsites',
      },
    ],
    query: 'filter_by',
    default: null,
    type: 'select',
  },
  {
    key: 'jobsite',
    label: 'Jobsite',
    type: 'related',
    data: {
      value: '__str__',
      endpoint: '/hr/jobsites/',
      key: 'id',
    },
    query: 'jobsite',
  },
  {
    key: 'client',
    label: 'Client',
    type: 'related',
    data: {
      value: '__str__',
      endpoint: '/core/companies/',
      key: 'id',
    },
    query: 'client',
  },
  {
    key: 'primary_contact',
    label: 'Client Contact',
    type: 'related',
    data: {
      value: '__str__',
      endpoint: '/core/companycontacts/',
      key: 'id',
    },
    query: 'primary_contact',
  },
  {
    key: 'portfolio_manager',
    label: 'Portfolio Manager',
    type: 'related',
    data: {
      value: '__str__',
      endpoint: '/core/companycontacts/?master_company=current',
      key: 'id',
    },
    query: 'portfolio_manager',
  },
];

export const jobsiteMap = {
  filters,
};
