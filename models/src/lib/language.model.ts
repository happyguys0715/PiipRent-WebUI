export enum Language {
  English = 'en',
  Russian = 'ru',
  Estonian = 'et',
  Finnish = 'fi',
}

export enum LanguageFullName {
  English = 'English',
  Russian = 'Russian',
  Estonian = 'Estonian',
  Finnish = 'Finnish',
}

export enum CountryCodeLanguage {
  GB = Language.English,
  EE = Language.Estonian,
  FI = Language.Finnish,
}

export const translationCountryName = {
  EE: LanguageFullName.Estonian,
  FI: LanguageFullName.Finnish,
};

export type Translation = {
  language: {
    id: Language;
    name: LanguageFullName;
  };
  value: string;
};

export interface ITranslationPayload {
  translations?: Translation[];
  translation?: Translation[];
  name?: { name: string; translations: Translation[] } | string;
  __str__?: string;
}
