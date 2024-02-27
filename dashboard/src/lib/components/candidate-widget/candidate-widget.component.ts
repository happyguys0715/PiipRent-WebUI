import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import {
  EventService,
  EventType,
  FilterService,
  LocalEnvService,
} from '@webui/core';
import { candidatecontacts, fillin } from '@webui/manager-metadata';

import { DashboardService } from '../../services';
import { Router } from '@angular/router';
import { Endpoints, FilterEvent } from '@webui/models';
import {
  CommonModule,
  DecimalPipe,
  NgClass,
  NgForOf,
  NgIf,
  NgTemplateOutlet,
} from '@angular/common';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { FaIconComponent, LoaderComponent } from '@webui/ui';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {
  AverageScoreDirective,
  AverageScorePipe,
  WorkflowStatePipe,
} from '@webui/shared';
import { FilterBlockComponent } from '@webui/generic-components';
import { DashboardComponent } from '../../dashboard.component';

const enum Lists {
  CandidateContact = 'candidatecontact',
  Fillin = 'fillin',
}

@Component({
  standalone: true,
  selector: 'webui-candidate-widget',
  templateUrl: './candidate-widget.component.html',
  styleUrls: ['./candidate-widget.component.scss'],
  providers: [FilterService, LocalEnvService, DashboardService],
  imports: [
    CommonModule,
    TranslateModule,
    FaIconComponent,
    InfiniteScrollModule,
    LoaderComponent,
    WorkflowStatePipe,
    AverageScorePipe,
    AverageScoreDirective,
    FilterBlockComponent,
    // DecimalPipe,
    // NgTemplateOutlet,
    // NgIf,
    // NgForOf,
    // NgClass,
  ],
})
export class CandidateWidgetComponent implements OnInit, OnDestroy {
  public modalScrollDistance = 2;
  public modalScrollThrottle = 50;
  public selectedCandidates: Set<string> = new Set();
  public offset = 0;
  public limit = 14;
  public loading = false;
  public filtersQuery = '';
  public activeList = Lists.CandidateContact;
  public statusColors: Record<number, string> = {
    0: 'danger',
    80: 'danger',
    90: 'danger',
  };

  public showFilters!: boolean;
  public filtersOfList!: any[];
  public count!: number;
  public candidates?: any[];
  public shift: any;
  private subscription!: Subscription;

  candidateContactsConfig = {
    list: Lists.CandidateContact,
    filters: candidatecontacts.list.list.filters,
  };

  fillinConfig = {
    list: Lists.Fillin,
    filters: fillin.list.list.filters.slice(1),
  };

  constructor(
    private widgetService: DashboardService,
    private eventService: EventService,
    private filterService: FilterService,
    private router: Router,
    private localEnv: LocalEnvService
  ) {}

  ngOnInit() {
    this.getCandidateContacts();
    this.subscribeEventChanges();
    this.initFilters();
    this.localEnv.register('workflowType', 'candidate');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.filterService.clean('fillin', this.fillinConfig.list);
  }

  public checkClass(item: { __str__: string; number: number }) {
    const key: number = item.number;

    return this.statusColors[key] || '';
  }

  public selectCandidate(candidate: { selected: boolean; id: string }) {
    if (this.shift) {
      candidate.selected = !candidate.selected;

      if (candidate.selected) {
        this.selectedCandidates.add(candidate.id);
      } else {
        this.selectedCandidates.delete(candidate.id);
      }
    } else {
      this.router.navigateByUrl(
        `/mn/candidate/candidatecontacts/${candidate.id}/change`
      );
    }
  }

  public onModalScrollDown() {
    if (
      this.candidates &&
      !this.loading &&
      this.count > this.candidates.length
    ) {
      this.offset += this.limit;
      this.loading = true;
      const queryObj = this.parseQuery(this.filtersQuery);

      this.getCandidateContacts({ offset: this.offset, ...queryObj }, true);
    }
  }

  public filterHandler(e: FilterEvent) {
    if (e.reset) {
      this.filterService.resetFilters(e.list);
    }
  }

  public toggleFilters() {
    const query = this.filterService.getQuery(this.activeList);
    this.showFilters = !this.showFilters;

    if (!this.showFilters && query !== this.filtersQuery) {
      this.candidates = undefined;
      this.filtersQuery = query;
      const queryObj = this.parseQuery(this.filtersQuery);

      if (this.activeList === Lists.CandidateContact) {
        this.offset = 0;
        this.getCandidateContacts(queryObj);
      } else {
        this.getFillinCandidates(queryObj);
      }
    }
  }

  public sendJobOffer() {
    const { job, shift } = this.shift;
    const candidates = Array.from(this.selectedCandidates.values());

    this.widgetService
      .sendJobOffers(job, shift.id, candidates)
      .subscribe(() => {
        this.changeList(Lists.CandidateContact, Endpoints.CandidateContact);
        this.candidates = undefined;
        this.selectedCandidates.clear();
        this.getCandidateContacts();
        this.eventService.emit(EventType.RefreshCalendar);
      });
  }

  public togglePanel(candidate: { extend: boolean }, event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    candidate.extend = !candidate.extend;

    return false;
  }

  private initFilters() {
    this.filterService.filters = {
      endpoint: Endpoints.CandidateContact,
      list: this.candidateContactsConfig,
    };
    this.filterService.filters = {
      endpoint: 'fillin',
      list: this.fillinConfig,
    };

    this.filtersOfList = this.filterService.getFiltersByEndpoint(
      Endpoints.CandidateContact
    );
  }

  private subscribeEventChanges() {
    this.subscription = this.eventService.event$.subscribe(type => {
      if (type === EventType.CalendarJobSelected) {
        this.offset = 0;
        this.shift = this.eventService.payload;
        this.candidates = undefined;
        this.selectedCandidates.clear();

        if (this.shift) {
          this.changeList(Lists.Fillin, Lists.Fillin);
          this.getFillinCandidates();
        } else {
          this.shift = undefined;
          this.changeList(Lists.CandidateContact, Endpoints.CandidateContact);
          this.getCandidateContacts();
        }
      }
    });
  }

  private getCandidateContacts(
    query: { [key: string]: any } = {},
    concat = false
  ) {
    this.widgetService
      .getCandidates({ limit: this.limit, ...query })
      .subscribe((data: any) => {
        if (data && data.candidates) {
          if (concat) {
            this.candidates?.push(...data.candidates);
            this.loading = false;
            return;
          }

          this.count = data.count;
          this.candidates = data.candidates;
        }
      });
  }

  private getFillinCandidates(query: { [key: string]: any } = {}) {
    const { job, shift } = this.shift;

    this.widgetService
      .getFillinCandidates(job, {
        shifts: shift.id,
        ...query,
      })
      .subscribe(candidates => {
        this.candidates = candidates;
      });
  }

  private parseQuery(query: string): { [key: string]: any } {
    const result: Record<string, any> = {};
    if (query.length) {
      query.split('&').forEach(el => {
        const parseEl = el.split('=');
        result[parseEl[0]] = parseEl[1];
      });
    }
    return result;
  }

  private changeList(list: Lists, endpoint: string) {
    this.activeList = list;
    this.filterService.resetFilters(list);
    this.filtersOfList = this.filterService.getFiltersByEndpoint(endpoint);
    this.showFilters = false;
    this.filtersQuery = '';
  }
}
