import { getStorageRole } from './storage.utils';

export function isCandidate() {
  const role = getStorageRole();

  return role ? role.__str__.includes('candidate') : false;
}

export function isClient() {
  const role = getStorageRole();

  return role ? role.__str__.includes('client') : false;
}

export function isManager() {
  const role = getStorageRole();
  const roleKey = role?.__str__;

  return roleKey
    ? roleKey.includes('manager') || roleKey.includes('trial')
    : false;
}

export function getRoleId() {
  const role = getStorageRole();

  return role ? role.id : null;
}
