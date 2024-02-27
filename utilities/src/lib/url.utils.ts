import { isCandidate, isClient, isManager } from './role.utils';

export const getUrlPrefix = (): string => {
  if (isClient()) {
    return '/cl';
  }

  if (isManager()) {
    return '/mn';
  }

  if (isCandidate()) {
    return '/cd';
  }

  return '';
};
