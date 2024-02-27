import { Component, forwardRef, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

// import { CustomEvent } from '../../../models';
// import { ListService } from '../../../services';
import { FormElementDirective } from '../../../directives';
import { ListService } from '@webui/core';
import { CustomEvent } from '@webui/models';

@Component({
  standalone: true,
  selector: 'webui-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss'],
  imports: [forwardRef(() => FormElementDirective)],
})
export class ListFormComponent implements OnInit {
  config: any;
  value!: string;

  group = new FormGroup({});

  constructor(private service: ListService) {}

  ngOnInit() {
    this.setValue(this.config.form.value, this.config.display);
  }

  eventHandler(event: CustomEvent) {
    if (event.value !== this.config.value) {
      this.service.updateChanges(this.config.rowId, this.group.value);
    }
  }

  private setValue(value: any, display: string) {
    this.value = value && display ? display : value;
  }
}
