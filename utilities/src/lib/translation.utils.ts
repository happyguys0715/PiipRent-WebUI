import {
  CountryCodeLanguage,
  ITranslationPayload,
  Language,
  Translation,
} from '@webui/models';

export function getTranslationKey(key: string, type: string) {
  return `${key}.${type}`;
}

export function checkAndReturnTranslation(
  element: ITranslationPayload,
  countryCode: string,
  lang?: Language | null
): string {
  const { translations, translation, name } = element;
  const translationList =
    translations ||
    translation ||
    (name && typeof name !== 'string' && name.translations) ||
    [];

  if (!translationList.length) {
    return getDefaultValue(element);
  }

  const target = translationList.find((element: Translation) => {
    const { id } = element.language;
    const languageCode =
      lang ||
      CountryCodeLanguage[countryCode as keyof typeof CountryCodeLanguage];

    return id === languageCode;
  });

  if (!target) {
    return getDefaultValue(element);
  }

  return target.value;
}

function getDefaultValue(element: {
  name?: { name: string; translations: Translation[] } | string;
  __str__?: string;
}): string {
  const { __str__, name } = element;

  if (typeof name === 'string') {
    return __str__ || name;
  }

  if (name) {
    return name.name;
  }

  return __str__ || '';
}
