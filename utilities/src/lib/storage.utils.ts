import { IRole, Language } from '@webui/models';

type StorageKey = 'role' | 'user' | 'lang';

const keys: Record<StorageKey, string> = {
  role: 'web.role',
  user: 'web.user',
  lang: 'web.lang',
};

function getLocalStorageItem<T>(key: StorageKey): T | null {
  const value = localStorage.getItem(keys[key]);

  try {
    return value && JSON.parse(value);
  } catch (e) {
    return null;
  }
}

export function getStorageLang() {
  const lang = getLocalStorageItem<string>('lang');

  switch (lang) {
    case 'en':
      return Language.English;
    case 'et':
      return Language.Estonian;
    case 'fi':
      return Language.Finnish;
    case 'ru':
      return Language.Russian;
  }

  return null;
}

export function getStorageRole() {
  return getLocalStorageItem<IRole>('role');
}
