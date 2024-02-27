import { async, inject, TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  BaseRequestOptions,
  Http,
  HttpModule,
  Response,
  ResponseOptions,
  RequestOptions,
  ConnectionBackend,
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { CookieService } from 'angular2-cookie/core';

import { GenericFormService } from './generic-form.service';
import { SharedModule } from '../../shared/shared.module';

describe('GenericFormService', () => {
  const url = `/login/`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GenericFormService,
        MockBackend,
        BaseRequestOptions,
        CookieService,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions],
        },
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
      ],
      imports: [HttpModule, SharedModule],
    });
  });

  it('should be defined', async(
    inject([GenericFormService, MockBackend], (service, mockBackend) => {
      expect(service).toBeDefined();
    })
  ));

  describe('getByQuery method', () => {
    it('should parse response', async(
      inject([GenericFormService, MockBackend], (service, mockBackend) => {
        const mockResponse = {
          status: 'ok',
          results: [],
        };

        mockBackend.connections.subscribe(conn => {
          conn.mockRespond(
            new Response(
              new ResponseOptions({ body: JSON.stringify(mockResponse) })
            )
          );
        });

        const result = service.getByQuery(url, `?country=123`);

        result.subscribe(res => {
          expect(res).toEqual(mockResponse);
        });
      })
    ));

    it('should parse error', async(
      inject([GenericFormService, MockBackend], (service, mockBackend) => {
        const mockError = {
          errors: {
            message: 'some error',
          },
        };

        mockBackend.connections.subscribe(conn => {
          conn.mockError(
            new Response(
              new ResponseOptions({ body: JSON.stringify(mockError) })
            )
          );
        });

        const result = service.getByQuery({ status: 500 });

        result.subscribe(
          res => {
            expect(res).toBeUndefined();
          },
          err => {
            expect(err).toBeDefined();
          }
        );
      })
    ));
  });

  describe('getAll method', () => {
    it('should parse response', async(
      inject([GenericFormService, MockBackend], (service, mockBackend) => {
        const mockResponse = {
          status: 'ok',
          results: [],
        };

        mockBackend.connections.subscribe(conn => {
          conn.mockRespond(
            new Response(
              new ResponseOptions({ body: JSON.stringify(mockResponse) })
            )
          );
        });

        const result = service.getAll(url);

        result.subscribe(res => {
          expect(res).toEqual(mockResponse);
        });
      })
    ));

    it('should parse error', async(
      inject([GenericFormService, MockBackend], (service, mockBackend) => {
        const mockError = {
          errors: {
            message: 'some error',
          },
        };

        mockBackend.connections.subscribe(conn => {
          conn.mockError(
            new Response(
              new ResponseOptions({ body: JSON.stringify(mockError) })
            )
          );
        });

        const result = service.getAll({ status: 500 });

        result.subscribe(
          res => {
            expect(res).toBeUndefined();
          },
          err => {
            expect(err).toBeDefined();
          }
        );
      })
    ));
  });

  describe('getMetadata method', () => {
    it('should parse response', async(
      inject([GenericFormService, MockBackend], (service, mockBackend) => {
        const mockResponse = {
          status: 'ok',
        };

        mockBackend.connections.subscribe(conn => {
          conn.mockRespond(
            new Response(
              new ResponseOptions({ body: JSON.stringify(mockResponse) })
            )
          );
        });

        const result = service.getMetadata(url);

        result.subscribe(res => {
          expect(res).toEqual({
            status: 'ok',
          });
        });
      })
    ));

    it('should parse error', async(
      inject([GenericFormService, MockBackend], (service, mockBackend) => {
        const mockError = {
          errors: {
            register: 'email',
          },
        };

        mockBackend.connections.subscribe(conn => {
          conn.mockError(
            new Response(
              new ResponseOptions({ body: JSON.stringify(mockError) })
            )
          );
        });

        const result = service.getMetadata({ status: 500 });

        result.subscribe(
          res => {
            expect(res).toBeUndefined();
          },
          err => {
            expect(err).toBeDefined();
          }
        );
      })
    ));
  });

  describe('submitForm method', () => {
    it('should parse response', async(
      inject([GenericFormService, MockBackend], (service, mockBackend) => {
        const mockResponse = {
          status: 'ok',
          body: '',
        };

        mockBackend.connections.subscribe(conn => {
          conn.mockRespond(
            new Response(
              new ResponseOptions({ body: JSON.stringify(mockResponse) })
            )
          );
        });

        const result = service.submitForm(url, { username: 'Vasya' });

        result.subscribe(res => {
          expect(res).toEqual({
            status: 'ok',
            body: '',
          });
        });
      })
    ));

    it('should parse error', async(
      inject([GenericFormService, MockBackend], (service, mockBackend) => {
        const mockError = {
          register: 'email',
        };

        mockBackend.connections.subscribe(conn => {
          conn.mockError(
            new Response(
              new ResponseOptions({ body: JSON.stringify(mockError) })
            )
          );
        });

        const result = service.submitForm(url, { username: 'Vasya' });

        result.subscribe(
          res => {
            expect(res).toBeUndefined();
          },
          err => {
            expect(err).toBeDefined();
          }
        );
      })
    ));
  });

  describe('editForm method', () => {
    it('should parse response', async(
      inject([GenericFormService, MockBackend], (service, mockBackend) => {
        const mockResponse = {
          status: 'ok',
        };

        mockBackend.connections.subscribe(conn => {
          conn.mockRespond(
            new Response(
              new ResponseOptions({ body: JSON.stringify(mockResponse) })
            )
          );
        });

        const result = service.editForm(url, { username: 'Petya' });

        result.subscribe(res => {
          expect(res).toEqual({
            status: 'ok',
          });
        });
      })
    ));

    it('should parse error', async(
      inject([GenericFormService, MockBackend], (service, mockBackend) => {
        const mockError = {
          register: 'email',
        };

        mockBackend.connections.subscribe(conn => {
          conn.mockError(
            new Response(
              new ResponseOptions({ body: JSON.stringify(mockError) })
            )
          );
        });

        const result = service.editForm(url, { username: 'Petya' });

        result.subscribe(
          res => {
            expect(res).toBeUndefined();
          },
          err => {
            expect(err).toBeDefined();
          }
        );
      })
    ));
  });

  describe('callAction method', () => {
    it('should parse response', async(
      inject([GenericFormService, MockBackend], (service, mockBackend) => {
        const mockResponse = {
          status: 'ok',
        };

        mockBackend.connections.subscribe(conn => {
          conn.mockRespond(
            new Response(
              new ResponseOptions({ body: JSON.stringify(mockResponse) })
            )
          );
        });

        const result = service.callAction(url, ['123', '124']);

        result.subscribe(res => {
          expect(res).toEqual({
            status: 'ok',
          });
        });
      })
    ));

    it('should parse error', async(
      inject([GenericFormService, MockBackend], (service, mockBackend) => {
        const mockError = {
          errors: ['Invalid id'],
        };

        mockBackend.connections.subscribe(conn => {
          conn.mockError(
            new Response(
              new ResponseOptions({ body: JSON.stringify(mockError) })
            )
          );
        });

        const result = service.callAction(url, ['123', '124']);

        result.subscribe(
          res => {
            expect(res).toBeUndefined();
          },
          err => {
            expect(err).toBeDefined();
          }
        );
      })
    ));
  });

  describe('delete method', () => {
    it('should parse response', async(
      inject([GenericFormService, MockBackend], (service, mockBackend) => {
        const mockResponse = {
          status: 'ok',
        };

        mockBackend.connections.subscribe(conn => {
          conn.mockRespond(
            new Response(
              new ResponseOptions({ body: JSON.stringify(mockResponse) })
            )
          );
        });

        const result = service.delete(url, 123);

        result.subscribe(res => {
          expect(res).toEqual({
            status: 'ok',
          });
        });
      })
    ));

    it('should parse error', async(
      inject([GenericFormService, MockBackend], (service, mockBackend) => {
        const mockError = {
          errors: ['Invalid id'],
        };

        mockBackend.connections.subscribe(conn => {
          conn.mockError(
            new Response(
              new ResponseOptions({ body: JSON.stringify(mockError) })
            )
          );
        });

        const result = service.delete(url, 123);

        result.subscribe(
          res => {
            expect(res).toBeUndefined();
          },
          err => {
            expect(err).toBeDefined();
          }
        );
      })
    ));
  });

  describe('errorHandler method', () => {
    it('should return Observable', async(
      inject([GenericFormService, MockBackend], (service, mockBackend) => {
        const mockError = {
          errors: {
            message: 'some error',
          },
        };

        const mock = {
          json() {
            return mockError;
          },
        };

        const result = service.errorHandler(mock);

        result.subscribe(
          res => {
            expect(res).toBeUndefined();
          },
          err => {
            expect(err).toEqual(mockError);
          }
        );
      })
    ));
  });
});
