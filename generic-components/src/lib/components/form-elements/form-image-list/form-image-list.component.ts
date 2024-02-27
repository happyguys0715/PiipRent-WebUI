import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { getTranslationKey } from '@webui/utilities';
import { Subject, takeUntil } from 'rxjs';
import { BasicElementComponent } from '../basic-element/basic-element.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'webui-image-list',
  templateUrl: './form-image-list.component.html',
  styleUrls: ['./form-image-list.component.scss'],
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    NgxDropzoneModule,
    NgIf,
    NgForOf,
  ],
})
export class FormImageListComponent
  extends BasicElementComponent
  implements OnInit, OnDestroy
{
  private _destroy = new Subject<void>();

  override group!: FormGroup;
  override config!: any;
  override key!: string;

  label!: string;
  translateKeyLabel!: string;
  files: File[] = [];
  images!: Array<{ preview: boolean; image: string }>;

  get control() {
    return this.group.get(this.key);
  }

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    const { templateOptions, key, value } = this.config;

    this.label = templateOptions.label;
    this.translateKeyLabel = getTranslationKey(key, 'label');
    this.images = value ? value.map((el: any) => ({ image: el.file })) : [];

    this.addControl(this.config, this.fb);

    this.control?.valueChanges
      .pipe(takeUntil(this._destroy))
      .subscribe(value => {
        if (Object.is(value, null)) {
          this.files = [];
        }
      });
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    this.group.get(this.key)?.patchValue(this.files);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.group.get(this.key)?.patchValue(this.files);
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
}
