import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { TranslateHelperService } from './translate-helper-service';
import { LocalStorageService } from 'ngx-webstorage';
import { isManager } from '@webui/utilities';
import { CountryCodeLanguage, Endpoints, Language } from '@webui/models';
import { TranslateService } from '@ngx-translate/core';

export interface CompanySettings {
  id: string;
  logo: string;
  color_scheme: string;
  font: string;
  forwarding_number: string;
  company: string;
  billing_email: string;
  register_form_id: string;
  company_name: string;
  sms_enabled: boolean;
  pre_shift_sms_enabled: boolean;
  pre_shift_sms_delta: number;
  invoice_template: string;
  advance_state_saving: boolean;
  country_code: keyof typeof CountryCodeLanguage;
  currency: string;

  redirect_to?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SiteSettingsService {
  settings!: CompanySettings;

  get companyId() {
    if (this.settings) {
      return this.settings.company;
    }
    return;
  }

  get smsActionDisabledMessage() {
    return this.translateService.instant('message.send_sms_action_disabled', {
      company: this.getCompanyName(),
    });
  }

  constructor(
    private http: HttpClient,
    private translateService: TranslateService,
    private translate: TranslateHelperService,
    private storage: LocalStorageService
  ) {}

  resolve() {
    return this.getSettings();
  }

  isSmsEnabled(): boolean {
    return this.settings.sms_enabled || false;
  }

  getCompanyName(): string {
    return this.settings.company_name || '';
  }

  private getSettings() {
    if (!this.settings) {
      return this.http.get<CompanySettings>(Endpoints.CompanySettings).pipe(
        tap(settings => {
          this.settings = settings;

          if (!settings.country_code) {
            settings.country_code = 'GB';
          }

          this.updateBrowserStyles(settings);
        }),
        tap(settings => this.updateLanguage(settings)),
        map(settings => {
          if (settings.redirect_to) {
            location.href = settings.redirect_to;

            return {} as CompanySettings;
          }

          return settings;
        }),
        catchError(() => {
          return of({} as CompanySettings);
        })
      );
    } else {
      return of(this.settings).pipe(
        tap(settings => this.updateLanguage(settings))
      );
    }
  }

  private updateBrowserStyles(settings: CompanySettings): void {
    const { body } = document;
    const root = document.documentElement;
    const { color_scheme, font } = settings;

    const themeClass = `${settings.color_scheme || 'default'}-theme`;
    const fontFamily = `${font || 'Source Sans Pro'}, sans-serif`;

    // TODO: refactor it
    body.parentElement?.classList.add(themeClass);
    root.style.setProperty('--main-font-family', fontFamily);
    root.style.setProperty(
      '--primary-color',
      this.getPrimaryColor(color_scheme)
    );
  }

  private updateLanguage(settings: CompanySettings): void {
    const companyLang: string =
      CountryCodeLanguage[settings.country_code]?.toString() ||
      Language.English;
    const defaultLanguage = this.storage.retrieve('lang');
    const { currentLang } = this.translate;

    let lang;

    if (defaultLanguage) {
      this.translate.setLang(defaultLanguage);
      return;
    }

    if (isManager()) {
      lang = Language.English;
    } else if (companyLang && currentLang !== (companyLang as string)) {
      lang = companyLang;
    }

    if (!lang && !companyLang) {
      this.translate.setLang(Language.English);
    } else if (lang) {
      this.translate.setLang(lang as Language);
    }
  }

  private getPrimaryColor(theme: string): string {
    const themeMap: Record<string, string> = {
      warning: '#f58926',
      indigo: '#3f51b5',
      teal: '#009688',
      brown: '#795548',
      labour: '#f58926',
      default: '#28a3fc',
    };

    return themeMap[theme] || themeMap['default'];
  }
}
