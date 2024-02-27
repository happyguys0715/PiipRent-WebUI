import {
  MissingTranslationHandler,
  MissingTranslationHandlerParams,
} from '@ngx-translate/core';

export class MissingTranslationHelper implements MissingTranslationHandler {
  private defaultKey = 'Default';

  handle(params: MissingTranslationHandlerParams) {
    const key = params.key;
    const interpolateParams =
      params.interpolateParams || ({} as Record<string, unknown>);
    const defaultValueDescriptior = Object.getOwnPropertyDescriptor(
      interpolateParams,
      this.defaultKey
    );

    // console.log(`"${key}": "${defaultValueDescriptior?.value}`);

    return defaultValueDescriptior?.value || key;
  }
}
