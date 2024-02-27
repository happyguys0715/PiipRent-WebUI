import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { LocalStorageService } from 'ngx-webstorage';
import { Language } from '@webui/models';

@Injectable({
  providedIn: 'root',
})
export class TranslateHelperService {
  private _lang = new BehaviorSubject('en');

  langChange$ = this._lang.asObservable();

  get currentLang() {
    return this._lang.value;
  }

  constructor(private storage: LocalStorageService) {}

  setLang(lang: Language, update?: boolean): void {
    if (update) {
      this.storage.store('lang', lang);
    }

    this._lang.next(lang);
  }
}
