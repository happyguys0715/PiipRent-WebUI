import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  OnDestroy,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent, FaIconComponent } from '@webui/ui';

export interface WidgetItem {
  widgetId: string | null;
  id: string | null;
  name?: string;
  active?: boolean;
  translateKey: string;
}

@Component({
  standalone: true,
  selector: 'webui-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    CheckboxComponent,
    FaIconComponent,
  ],
})
export class DashboardMenuComponent implements OnInit, OnChanges, OnDestroy {
  @Input() widgets!: WidgetItem[];
  @Output() changed: EventEmitter<WidgetItem> = new EventEmitter();

  form!: FormGroup;
  private subscription!: Subscription;

  ngOnInit() {
    this.updateForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['widgets'].isFirstChange()) {
      this.updateForm();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getFieldValue(name: string | null): boolean {
    if (!name) {
      return false;
    }

    return this.form.get(name)?.value as boolean;
  }

  private updateForm() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    const form: Record<string, any> = {};
    this.widgets.forEach(widget => {
      form[widget.widgetId as string] = new FormControl(widget.active);
    });

    this.form = new FormGroup(form);
    this.subscription = this.form.valueChanges.subscribe(value => {
      const changedWidget = this.widgets.find(
        widget => value[widget.widgetId as string] !== widget.active
      );

      if (changedWidget) {
        this.changed.emit({
          ...changedWidget,
          active: value[changedWidget.widgetId as string],
        });
      }
    });
  }
}
