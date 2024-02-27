import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService, UserService } from '@webui/core';

@Component({
  standalone: true,
  selector: 'webui-login-as',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginAsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.params['id'];

    this.loginAs(userId);
  }

  private loginAs(id: string) {
    const endpoint = `/auth/${id}/loginas/`;

    this.http.post(endpoint, {}).subscribe(
      (res: any) => {
        this.authService.storeToken(res);
        this.userService.getUserData().subscribe(() => {
          location.href = '/';
        });
      },
      () => (location.href = '/')
    );
  }
}
