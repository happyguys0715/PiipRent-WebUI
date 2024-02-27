import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DATE_FORMAT } from '@webui/time';
import { TranslateModule } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  standalone: true,
  selector: 'webui-range-field',
  templateUrl: './range-field.component.html',
  styleUrls: ['./range-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, TranslateModule, BsDatepickerModule],
})
export class RangeFieldComponent {
  @Input() controlName!: string;
  @Input() name!: string;
  @Input() translateKey!: string;
  @Input() label!: string;
  @Input() group!: FormGroup;

  formats = {
    date: DATE_FORMAT,
  };
}
