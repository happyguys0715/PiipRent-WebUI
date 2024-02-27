import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'webui-candidate',
  template: `<router-outlet></router-outlet>`,
  imports: [RouterOutlet],
})
export class CandidateComponent {}
