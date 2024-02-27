import { BehaviorSubject } from 'rxjs';

export const meta = [
  {
    name: 'API Connection',
    type: 'collapse',
    children: [
      {
        key: 'auth_data_list',
        type: 'related',
        many: true,
        endpoint: '/company_settings/auth_data/',
        mode: new BehaviorSubject('view'),
        templateOptions: {
          label: 'Authorized accounts',
          display: '{myob_user_username}',
          deleteList: true,
        },
      },
    ],
  },
];

export const payrollAccounts = {
  isCollapsed: false,
  invoice_company_file: {
    label: 'Company file',
    key: 'invoice_company_file',
    value: '',
  },
  invoice_activity_account: {
    label: 'Income account',
    key: 'invoice_activity_account',
    value: '',
  },
  timesheet_company_file: {
    label: 'Company file',
    key: 'timesheet_company_file',
    value: '',
  },
};
