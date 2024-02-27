import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';

import { ErrorsService, SiteSettingsService } from '@webui/core';
import { getContactAvatar } from '@webui/utilities';
import { CountryCodeLanguage, Endpoints } from '@webui/models';
import { Observable } from 'rxjs';

@Injectable()
export class DashboardService {
  private fields = [
    'id',
    'contact',
    'candidate_scores',
    'latest_state',
    'skill_list',
    'tag_list',
    'average_score',
  ];

  constructor(
    private http: HttpClient,
    private errorService: ErrorsService,
    private siteSettings: SiteSettingsService
  ) {}

  getCandidates(query?: { [key: string]: any }) {
    const params = new HttpParams({
      fromObject: { ...query, fields: this.fields },
    });

    return this.http
      .get<{ count: number; results: any[] }>(Endpoints.CandidateContact, {
        params,
      })
      .pipe(
        map(response => {
          const { results, count } = response;

          const candidates = results.map(candidate => {
            const {
              id,
              contact,
              average_score,
              latest_state,
              skill_list,
              tag_list,
            } = candidate;

            return {
              id,
              name: `${contact.first_name} ${contact.last_name}`,
              img: contact.picture.origin,
              contactAvatar: getContactAvatar(contact.__str__),
              score: average_score,
              state: latest_state[0],
              skills: skill_list.map((el: any) => {
                const {
                  skill: { name },
                } = el;
                const trans = name.translations.find(
                  (item: any) =>
                    item.language.id ===
                    CountryCodeLanguage[this.siteSettings.settings.country_code]
                );

                if (trans) {
                  el.skill.__str__ = trans.value;
                }

                return { name: el.skill.__str__, score: el.score };
              }),
              tags: tag_list.map((el: any) => {
                const { tag } = el;
                const trans = tag.translations.find(
                  (item: any) =>
                    item.language.id ===
                    CountryCodeLanguage[this.siteSettings.settings.country_code]
                );

                if (trans) {
                  el.tag.name = trans.value;
                }

                return { name: el.tag.name };
              }),
            };
          });

          return { count, candidates };
        }),
        catchError(errors => this.errorService.handleError(errors))
      );
  }

  getFillinCandidates(jobId: string, query: { [key: string]: any } = {}) {
    const params = new HttpParams({ fromObject: query });

    return this.http
      .get<{ list: any[]; job: any }>(`${Endpoints.Job}${jobId}/fillin/`, {
        params,
      })
      .pipe(
        map(response => {
          const candidates = response.list;

          return candidates.map(candidate => {
            const {
              id,
              candidate_scores,
              contact,
              favourite,
              hourly_rate,
              distance_to_jobsite,
              overpriced,
              tags,
            } = candidate;

            return {
              score: candidate_scores.average_score,
              name: `${contact.first_name} ${contact.last_name}`,
              img: contact.picture && contact.picture.origin,
              contactAvatar: getContactAvatar(contact.__str__),
              scores: this.generateScores(candidate_scores),
              distance: distance_to_jobsite,
              id,
              favourite,
              hourly_rate,
              overpriced,
              tags,
            };
          });
        }),
        catchError(errors => this.errorService.handleError(errors))
      );
  }

  sendJobOffers(jobId: string, shift: string, candidates: any[]) {
    const body = {
      shifts: [shift],
      candidates,
    };

    return this.http
      .post(`${Endpoints.Job}${jobId}/fillin/`, body)
      .pipe(catchError(errors => this.errorService.handleError(errors)));
  }

  private generateScores(scores: { [key: string]: string }) {
    const skillMap: Record<string, string> = {
      recruitment_score: 'Average test',
      client_feedback: 'Client feedback',
      skill_score: 'Average skills',
      reliability: 'Reliability',
      loyalty: 'Loyality',
    };

    return Object.keys(skillMap).map(key => {
      return {
        name: skillMap[key],
        score: scores[key] ? scores[key].split(' ')[0] : 0,
        count: scores[key] ? scores[key].split(' ')[1] : '',
      };
    });
  }
}
