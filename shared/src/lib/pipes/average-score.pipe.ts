import { DecimalPipe, formatNumber, formatPercent } from '@angular/common';
import { inject, Optional, Pipe, PipeTransform } from '@angular/core';
import {
  TranslateModule,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';

@Pipe({
  standalone: true,
  name: 'averageScore',
})
export class AverageScorePipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: number | string): string {
    if (value === 0 || !value) {
      return this.translateService.instant('no_rating');
    }

    const number = typeof value === 'string' ? parseFloat(value) : value;

    return formatNumber(number, this.translateService.currentLang, '1.1-1');
  }
}
