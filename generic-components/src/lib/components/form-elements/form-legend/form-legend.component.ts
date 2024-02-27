import { Component, ChangeDetectionStrategy } from '@angular/core';
import { getEmailVariablesDescription } from '@webui/data';
// import { InputService } from '../../../services';
import { NgForOf } from '@angular/common';
import { InputService } from '@webui/core';

@Component({
  standalone: true,
  selector: 'webui-form-legend',
  templateUrl: './form-legend.component.html',
  styleUrls: ['./form-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgForOf],
})
export class FormLegendComponent {
  private readonly _legend: Record<string, string> =
    getEmailVariablesDescription();

  list: string[] = Object.keys(this._legend);

  constructor(private inputService: InputService) {}

  getDescription(key: string): string {
    return this._legend[key];
  }

  onClick(prop: string, event: MouseEvent): void {
    event.preventDefault();

    this.inputService.push(`[[${prop}]]`);
  }
}
