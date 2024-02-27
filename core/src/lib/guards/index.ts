import { AuthGuard } from './auth-guard';
import { NotAuthorizedGuard } from './not-authorized-guard';
import { PermissionGuard } from './permission.guard';
import { LogoutGuard } from './logout.guard';
import { CandidateGuard } from './candidate-guard';
import { ClientGuard } from './client-guard';
import { ManagerGuard } from './manager-guard';

export * from './auth-guard';
export * from './not-authorized-guard';
export * from './permission.guard';
export * from './logout.guard';
export * from './candidate-guard';
export * from './client-guard';
export * from './manager-guard';

export const guards = [
  AuthGuard,
  NotAuthorizedGuard,
  PermissionGuard,
  LogoutGuard,
  CandidateGuard,
  ClientGuard,
  ManagerGuard,
];
