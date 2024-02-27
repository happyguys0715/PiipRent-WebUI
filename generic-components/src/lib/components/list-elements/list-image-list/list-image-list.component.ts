import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CloseButtonComponent } from '@webui/ui';
import { NgForOf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'webui-list-image-list',
  templateUrl: './list-image-list.component.html',
  styleUrls: ['./list-image-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CloseButtonComponent, NgForOf],
})
export class ListImageListComponent implements OnInit {
  public config: any;
  public images: Array<{ preview: boolean; image: string }> = [];

  public preview!: boolean;

  get hasOpenPreview() {
    return this.images.some(el => el.preview);
  }

  ngOnInit() {
    this.images = this.config.value.map((el: any) => {
      return {
        preview: false,
        image: el.file,
      };
    });
  }

  showPreview(index: number) {
    this.images[index].preview = true;
  }

  hidePreview(index: number) {
    this.images[index].preview = false;
  }
}
