import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'webui-list-fillin-tags',
  templateUrl: './list-fillin-tags.component.html',
  styleUrls: ['./list-fillin-tags.component.scss'],
  imports: [CommonModule],
})
export class ListFillinTagsComponent {
  public config!: any;

  public labels: Record<string, string> = {
    required: 'Required',
    missing: 'Missing',
    existing: 'Existing',
  };
}
