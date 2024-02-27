import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from '../../../environments/environment';

@Component({
  standalone: true,
  selector: 'webui-redirect',
  template: '',
})
export class RedirectComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  public ngOnInit() {
    const params = this.route.snapshot.queryParams;
    const redirectUri = params['state'];

    if (redirectUri && location.host === environment.host) {
      location.href = redirectUri + location.search;
    } else {
      this.router.navigate(['/']);
    }
  }
}
