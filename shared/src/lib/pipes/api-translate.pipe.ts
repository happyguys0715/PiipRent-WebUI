import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SiteSettingsService } from '@webui/core';
import { Language } from '@webui/models';
import { checkAndReturnTranslation } from '@webui/utilities';
import { map, merge, of } from 'rxjs';

@Pipe({
  standalone: true,
  name: 'apiTranslate',
})
export class ApiTranslatePipe implements PipeTransform {
  constructor(
    private translateService: TranslateService,
    private settings: SiteSettingsService
  ) {}

  transform(value: any, params: { Default?: string } = {}) {
    const currentLanguage = this.translateService.currentLang as Language;

    return merge(
      of(this.parseValue(value, currentLanguage, params)),
      this.translateService.onLangChange.pipe(
        map(({ lang }) => this.parseValue(value, lang as Language, params))
      )
    );
  }

  private parseValue(value: any, lang: Language, params: { Default?: string }) {
    if (typeof value === 'string') {
      return this.translateService.instant(value, params);
    }

    return checkAndReturnTranslation(
      value,
      this.settings.settings.country_code,
      lang as Language
    );
  }
}
