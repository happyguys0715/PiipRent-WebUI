import { Field } from '@webui/metadata';

export type FormStep = {
  title: string;
  metadata: Field[];
  content: Array<string | string[]>;
  empty: boolean;
};

export const industryField: Field = {
  type: 'related',
  send: false,
  endpoint: '/pricing/industries/',
  key: 'industry',
  templateOptions: {
    label: 'Industry',
    type: 'related',
    values: ['__str__', 'id', 'translations'],
  },
  query: {
    company: '{session.company}',
  },
};

export const steps: FormStep[] = [
  {
    title: 'contact_information',
    metadata: [],
    empty: false,
    content: [
      'contact.picture',
      ['contact.first_name', 'contact.last_name'],
      ['contact.title', 'contact.gender'],
      'contact.birthday',
      ['contact.email', 'contact.phone_mobile'],
    ],
  },
  {
    title: 'additional_information',
    metadata: [],
    empty: false,
    content: [
      'contact.address.street_address',
      // "contact.address.city",
      // "contact.address.state",
      // "contact.address.postal_code",
      // "contact.address.country",
      ['nationality', 'residency'],
      'tax_file_number',
      'transportation_to_work',
      ['weight', 'height'],
    ],
  },
  {
    title: 'bank_and_superannuation_informatioin',
    metadata: [],
    empty: false,
    content: [
      'contact.bank_accounts.bank_account_number',
      'contact.bank_accounts.bank_account_name',
      'contact.bank_accounts.bsb_number',
      [
        'contact.bank_accounts.AccountholdersName',
        'contact.bank_accounts.bank_name',
      ],
      ['contact.bank_accounts.IBAN', 'formalities.personal_id'],
      'contact.bank_accounts.TestBankAccountField',
      'formalities.tax_number',
      'superannuation_fund',
      'superannuation_membership_number',
    ],
  },
  {
    title: 'industry_and_skills',
    empty: false,
    metadata: [],
    content: [['industry', 'skill'], 'tag'],
  },
];
