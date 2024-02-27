import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'webui-site-loader',
  templateUrl: './site-loader.component.html',
  styleUrls: ['./site-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteLoaderComponent {}
