import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';

interface JSONPreview {
  title: string;
  value: string | number;
}

@Component({
  standalone: true,
  selector: 'webui-form-json',
  templateUrl: 'form-json.component.html',
  imports: [NgIf, NgForOf],
})
export class FormJsonComponent implements OnInit {
  public config: any;
  public group!: FormGroup;
  public errors: any;
  public message: any;
  public key: any;

  public previewData!: JSONPreview[];

  public ngOnInit() {
    if (this.config && this.config.value) {
      this.previewData = [];
      this.generateViewByJSON(this.config.value);
    }
  }

  public generateViewByJSON(json: any): void {
    const keys: string[] = Object.keys(json);
    keys.forEach((el: string) => {
      if (json[el] instanceof Object) {
        this.generateViewByJSON(json[el]);
      } else {
        const fields: string[] = el.split('__');
        if (fields.length > 1) {
          this.previewData.push({
            title: fields.pop()?.split('_').join(' ') || '',
            value: json[el],
          });
        } else {
          this.previewData.push({
            title: el.split('_').join(' '),
            value: json[el],
          });
        }
      }
    });
  }
}
