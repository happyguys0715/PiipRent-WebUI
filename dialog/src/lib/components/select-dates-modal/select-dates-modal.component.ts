import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import { FormElementDirective } from '@webui/generic-components';
import { DialogRef } from '@webui/models';

@Component({
  standalone: true,
  selector: 'webui-select-dates-modal',
  templateUrl: './select-dates-modal.component.html',
  styleUrls: ['./select-dates-modal.component.scss'],
  imports: [BaseModalComponent, FormElementDirective],
})
export class SelectDatesModalComponent {
  config = {
    key: 'shifts',
    type: 'jobdates',
    removeDate: null,
    value: [],
  };

  group = new FormGroup<any>({});

  constructor(private modal: DialogRef) {}

  close() {
    const data = this.group.value['shifts'];

    this.modal.close(data.sort() || []);
  }

  dismiss() {
    this.modal.close();
  }
}
