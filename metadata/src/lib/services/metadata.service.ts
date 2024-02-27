import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class MetadataService {
  get(endpoint: string, query: string, metadata: any) {
    if (endpoint.includes('/submit/')) {
      endpoint = 'submit';
    }

    if (endpoint.includes('/evaluate')) {
      endpoint = 'evaluate';
    }

    if (endpoint.includes('/not_agree')) {
      endpoint = 'not_agree';
    }

    if (endpoint.includes('/extend')) {
      endpoint = 'extend';
    }

    if (endpoint.includes('/fillin')) {
      endpoint = 'fillin';
    }

    if (endpoint.includes('/candidate_fill')) {
      endpoint = 'candidateFill';
    }

    if (endpoint.includes('/supervisor_approve')) {
      endpoint = 'supervisorApprove';
    }

    if (endpoint.includes('/change_password/')) {
      endpoint = 'change_password';
    }

    if (endpoint.includes('/password/')) {
      endpoint = 'password';
    }

    if (
      endpoint.includes('/candidate_contacts/') &&
      endpoint.includes('/languages/')
    ) {
      endpoint = 'candidate_languages';
    }

    if (endpoint.includes('/companies/') && endpoint.includes('/languages/')) {
      endpoint = 'company_languages';
    }

    if (metadata[endpoint]) {
      let type = '';

      if (query.includes('formadd')) {
        type = 'formadd';
        if (query.includes('job')) {
          type = 'jobAdd';
        }

        if (query.includes('contact')) {
          type = 'contact';
        }
      } else if (query.includes('pricelist')) {
        if (query.includes('form')) {
          type = 'pricelistForm';
        }
        if (query.includes('formset')) {
          type = 'pricelist';
        }
      } else if (query.includes('company')) {
        type = 'company';
      } else if (query.includes('jobsite_client')) {
        type = 'jobsite_client';
      } else if (query.includes('supervisor')) {
        type = 'supervisor';
      } else if (query.includes('profile')) {
        type = 'profile';
      } else if (query.includes('job')) {
        if (query.includes('form')) {
          type = 'form';
        }
        if (query.includes('formset')) {
          type = 'job';
        }
      } else if (query.includes('shift_date')) {
        if (query.includes('formset')) {
          type = 'shiftDate';
        } else {
          type = 'editShiftDate';
        }
      } else if (query.includes('candidatepool')) {
        type = 'candidatepool';
      } else if (query.includes('timesheet')) {
        type = 'timesheet';
      } else if (query.includes('extend')) {
        type = 'extend';
      } else if (query.includes('sent')) {
        type = 'sent';
      } else if (query.includes('reply')) {
        type = 'reply';
      } else if (query.includes('formset')) {
        type = 'formset';
      } else if (query.includes('mobile')) {
        type = 'mobile';
      } else if (query.includes('form')) {
        type = 'form';
      } else if (query.includes('filters')) {
        type = 'filters';
      } else {
        type = 'list';
      }

      const res = metadata[endpoint][type];

      if (res instanceof Function) {
        return of(res());
      }

      if (res) {
        const stringifyMetadata = JSON.stringify(res);

        return of(JSON.parse(stringifyMetadata));
      } else {
        return of();
      }
    }

    return;
  }
}
