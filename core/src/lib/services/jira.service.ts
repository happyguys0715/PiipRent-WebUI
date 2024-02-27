import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UserService } from './user.service';
import { Role } from '@webui/models';
import { EventService, EventType } from './event.service';

@Injectable({
  providedIn: 'root',
})
export class JiraService {
  private Jira!: HTMLScriptElement;

  constructor(
    private eventService: EventService,
    private userService: UserService
  ) {}

  init() {
    this.Jira = this.initJira();

    this.eventService.event$
      .pipe(filter(event => event === EventType.RoleChanged))
      .subscribe(() => this.updateJira(this.userService.user?.currentRole));

    return of(true);
  }

  updateJira(role?: Role) {
    if (!role) {
      return;
    }

    const trigger = document.getElementById('atlwdg-trigger');
    if (role.__str__.includes('client') || role.__str__.includes('candidate')) {
      if (!trigger) {
        document.getElementsByTagName('head')[0].appendChild(this.Jira);
      } else {
        setTimeout(() => {
          const link = document.getElementById('atlwdg-trigger');
          if (link) {
            const el = document.getElementById('atlwdg-trigger');

            if (el) {
              el.style.display = 'block';
            }
          }
        }, 1000);
      }
    } else {
      if (trigger) {
        trigger.style.display = 'none';
      }
    }
  }

  private initJira() {
    const jira = document.createElement('script');
    jira.src =
      'https://taavisaavo.atlassian.net/s/d41d8cd98f00b204e9800998ecf8427e-T/klpxh0/b/20/a44af77267a987a660377e5c46e0fb64/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?locale=en-US&collectorId=5a8ec06b';
    jira.type = 'text/javascript';
    jira.async = true;
    jira.id = 'jira';
    jira.charset = 'utf-8';

    return jira;
  }
}
