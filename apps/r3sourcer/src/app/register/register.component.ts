import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  CompanySettings,
  FormBuilderService,
  SiteSettingsService,
} from '@webui/core';
import { CloseButtonComponent, LanguageSelectorComponent } from '@webui/ui';
import { FormBuilderFormComponent } from '../components';

@Component({
  standalone: true,
  selector: 'webui-register',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    LanguageSelectorComponent,
    CloseButtonComponent,
    FormBuilderFormComponent,
  ],
  providers: [FormBuilderService],
})
export class RegisterComponent implements OnInit {
  public settings!: CompanySettings;

  get logo(): string {
    return this.settings['logo'] || '/assets/img/logo.svg';
  }

  constructor(
    private router: Router,
    private siteSettingsService: SiteSettingsService
  ) {}

  public ngOnInit(): void {
    this.settings = this.siteSettingsService.settings;
  }

  onClose() {
    this.router.navigateByUrl('/login');
  }
}
