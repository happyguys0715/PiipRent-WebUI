import { Endpoints } from '@webui/models';
import { GuideItem } from '../../interfaces';

export const guide: GuideItem[] = [
  {
    key: 'has_company_address',
    text: [
      'Add Your',
      {
        url: `/mn${Endpoints.Company}{company_id}/change`,
        queryParams: { tab: 'ngb-tab-1' },
        text: 'Business address',
      },
    ],
  },
  {
    key: 'has_industry',
    text: [
      'Add Your ',
      { url: `/mn${Endpoints.Company}{company_id}/change`, text: 'industry' },
      ': multiple choices available',
    ],
  },
  {
    key: 'purpose',
    text: ['Master company purpose'],
    options: [
      {
        value: 'self_use',
        active: false,
        text: 'We will use software to manage our own workers',
      },
      {
        value: 'hire',
        active: false,
        text: 'We use software to manage hire workers for whose work we charge our clients hourly',
      },
      {
        value: 'recruitment',
        active: false,
        text: 'We use software to find candidates or to sell candidate profiles',
      },
    ],
  },
  {
    key: 'has_skills',
    text: [
      'Add your',
      { url: `/mn${Endpoints.SkillName}`, text: 'Skills' },
      'and skill rates',
    ],
  },
  {
    key: 'has_company_contact',
    text: [
      'Who beside you will be working with this software ( add ',
      {
        url: `/mn${Endpoints.Company}{company_id}/change`,
        text: 'company users',
      },
      ')',
    ],
  },
  {
    key: 'has_candidate',
    text: [
      'Create your first',
      { url: `/mn${Endpoints.CandidateContact}add`, text: 'candidate' },
    ],
  },
  {
    key: 'has_client',
    text: [
      'Create your first',
      { url: `/mn${Endpoints.Company}add`, text: 'client' },
    ],
  },
  {
    key: 'has_jobsite',
    text: [
      'Create your first',
      { url: `/mn${Endpoints.Jobsite}add`, text: 'jobsite' },
    ],
  },
  {
    key: 'myob_connected',
    text: [
      'Integrations (MYOB only), take to Settings connect',
      { url: `/settings/myob`, text: 'MYOB' },
    ],
  },
];
