import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GenericFormService, METADATA } from '@webui/core';
import { MetadataService } from '@webui/metadata';
import { Metadata } from './metadata.config';

@Component({
  standalone: true,
  selector: 'webui-manager',
  template: `<router-outlet></router-outlet>`,
  imports: [RouterOutlet],
  providers: [],
})
export class ManagerComponent {}
