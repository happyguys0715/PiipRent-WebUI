import { Component } from '@angular/core';

import { paymentMetadata, smsMetadata } from './billing-lists.metadata';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ListService, SortService } from '@webui/core';
import { DynamicFormComponent } from '@webui/generic-components';

@Component({
  standalone: true,
  selector: 'webui-billing-lists',
  templateUrl: './billing-lists.component.html',
  styleUrls: ['./billing-lists.component.scss'],
  providers: [ListService, SortService],
  imports: [NgbNavModule, TranslateModule, DynamicFormComponent],
})
export class BillingListsComponent {
  public paymentConfig = paymentMetadata;
  public smsConfig = smsMetadata;
  public activeTab = 'payment';
}
