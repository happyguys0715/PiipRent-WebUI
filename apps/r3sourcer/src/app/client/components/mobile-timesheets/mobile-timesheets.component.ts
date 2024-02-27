import { Component, Input } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { GenericListComponent } from '@webui/generic-components';
// import { GenericListComponent } from '@webui/dynamic-form';

@Component({
  standalone: true,
  selector: 'webui-mobile-timesheets',
  templateUrl: './mobile-timesheets.component.html',
  styleUrls: ['./mobile-timesheets.component.scss'],
  imports: [NgbNavModule, GenericListComponent],
})
export class MobileTimesheetsComponent {
  @Input()
  public clientId?: string;
}
