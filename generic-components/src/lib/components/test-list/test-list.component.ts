import { Component, OnInit } from '@angular/core';

// import { GenericFormService } from '../../services';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@webui/ui';
import { TranslateModule } from '@ngx-translate/core';
import { GenericFormService } from '@webui/core';

@Component({
  standalone: true,
  selector: 'webui-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss'],
  imports: [CommonModule, NgbAccordionModule, FaIconComponent, TranslateModule],
})
export class TestListComponent implements OnInit {
  public config: any;
  public tests!: any[];
  public colors: Record<number, string> = {
    0: '#515151',
    1: '#FA5C46',
    2: '#fc9183',
    3: '#FFA236',
    4: '#ffbf00',
    5: '#FFD042',
  };

  constructor(private gfs: GenericFormService) {}

  public ngOnInit() {
    let query = '';
    if (this.config.query) {
      query = this.generateQuery(this.config.query);
    }

    this.gfs.getByQuery(this.config.endpoint, query).subscribe(res => {
      this.tests = res;
    });
  }

  public getScore(score: string) {
    return Math.floor(parseFloat(score));
  }

  public generateQuery(data: any): string {
    const keys = Object.keys(data);
    const values = keys.map(key => {
      if (Array.isArray(data[key])) {
        const result: string[] = [];
        data[key].forEach((el: any) => {
          result.push(`${key}=${el}`);
        });
        return result.join('&');
      }

      return `${key}=${data[key]}`;
    });

    return `?${values.join('&')}`;
  }
}
