import { TestBed, async, inject } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { ErrorsService } from './errors.service';
import { ToastService } from './toast.service';

describe('ErrorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorsService, ToastService],
    });
  });

  describe('parseResponse method', () => {
    it('should add new error message', async(
      inject([ErrorsService], (es: ErrorsService) => {
        const errors = {
          status: 'error',
          errors: {
            detail: 'Some error',
          },
        };
        const errorResponse = new HttpErrorResponse({
          error: errors,
        });
        let error;
        es.handleError(errorResponse)
          .pipe(
            catchError((err: any) => {
              error = err;
              return of(err);
            })
          )
          .subscribe();
        expect(error).toEqual(errors);
      })
    ));
  });
});
