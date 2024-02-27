import { createFilter, Type } from '@webui/metadata';

export const filters = {
  client: createFilter(Type.Related, {
    key: 'client',
    label: 'Company filter',
    endpoint: '/core/companies/',
  }),
  candidate: createFilter(Type.Related, {
    key: 'candidate',
    label: 'Candidate contact filter',
    endpoint: '/candidate/candidatecontacts/',
  }),
};
