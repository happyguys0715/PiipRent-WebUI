import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Field } from '@webui/metadata';

import { BasicElementComponent } from '../basic-element/basic-element.component';
import { NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
  standalone: true,
  selector: 'webui-form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.scss'],
  imports: [
    ReactiveFormsModule,
    NgIf,
    TranslateModule,
    QuillEditorComponent,
    FormsModule,
  ],
})
export class FormEditorComponent
  extends BasicElementComponent
  implements OnInit
{
  public override config!: Field;
  public override group: any;
  public htmlText: any;

  quillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],

        [
          {
            size: [
              false,
              '10px',
              '12px',
              '14px',
              '16px',
              '18px',
              '20px',
              '22px',
            ],
          },
        ],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ align: [] }],
      ],
    },
  };

  public customOptions = [
    {
      import: 'attributors/style/size',
      whitelist: ['10px', '12px', '14px', '16px', '18px', '20px', '22px'],
    },
  ];

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.addControl(
      this.config,
      this.fb,
      this.config.templateOptions?.required
    );
    this.createEvent();
    this.htmlText = this.config.value;
  }

  onSelectionChanged() {
    this.group.get(this.key).patchValue(this.htmlText);
  }

  onContentChanged() {
    this.group.get(this.key).patchValue(this.htmlText);
  }
}
