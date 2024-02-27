import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// import { DynamicFormComponent, GenericFormService } from '@webui/dynamic-form';
import { ToastService, MessageType, GenericFormService } from '@webui/core';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicFormComponent } from '@webui/generic-components';
import { Pagination } from '@webui/models';

@Component({
  standalone: true,
  selector: 'webui-fill-in',
  templateUrl: './fill-in.component.html',
  styleUrls: ['./fill-in.component.scss'],
  imports: [TranslateModule, DynamicFormComponent],
})
export class FillInComponent implements OnInit {
  @Input()
  public endpoint!: string;

  @Input()
  public pageData: any;

  public meta!: any[];
  public data: any;
  public err: any;

  constructor(
    private gfs: GenericFormService,
    private router: Router,
    private toastr: ToastService
  ) {}

  public ngOnInit() {
    this.meta = [
      {
        type: 'list',
        collapsed: false,
        endpoint: this.endpoint,
        responseField: 'list',
        paginated: Pagination.Off,
        supportData: 'job',
        metaType: true,
        actions: true,
        templateOptions: {
          label: '',
          text: '',
        },
      },
    ];
  }

  public checkedObjects(e: any) {
    const shifts = e.filters.keys.date.value.filter((el: any) => el.checked);
    this.data = {
      candidates: e.checkedData,
      shifts: shifts.map((el: any) => el.data.id),
    };
  }

  public back() {
    const { pathData: path, endpoint } = this.pageData;
    const id = this.getId(endpoint);
    const route = `${path}/${id}/change`;

    this.router.navigate([route]);
  }

  public sendData() {
    if (this.data) {
      this.gfs.submitForm(this.endpoint, this.data).subscribe(
        () => this.back(),
        err => {
          const { detail } = err.errors;

          if (!detail) {
            return;
          }

          this.toastr.sendMessage(detail, MessageType.Error);
        }
      );
    }
  }

  private getId(path: string): string {
    const keys = path.split('/');

    return keys[keys.length - 3];
  }
}
