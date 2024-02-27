import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { throwError } from 'rxjs';

import { ErrorsService } from './errors.service';
import { SiteService } from './site.service';
import { NavigationService } from './navigation.service';
import { CheckPermissionService } from './check-permission.service';

describe('CheckPermissionService', () => {
  let service: CheckPermissionService;

  const mockErrorsService = {
    parseErrors() {
      return throwError('err');
    },
  };

  const mockSiteService = {
    getDataOfPage() {
      return {};
    },
  };

  const mockNavigationService = {
    parsedByPermissions: false,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckPermissionService,
        { provide: ErrorsService, useValue: mockErrorsService },
        { provide: SiteService, useValue: mockSiteService },
        { provide: NavigationService, useValue: mockNavigationService },
      ],
      imports: [HttpClientTestingModule],
    });

    service = TestBed.get(CheckPermissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPermissions method', () => {
    it('should return permissions from cash', () => {
      service.permissions = [
        {
          name: 'Name',
          id: 1,
          codename: 'Codename',
        },
      ];

      const permissions = service.getPermissions('123');

      permissions.subscribe(res => {
        expect(res).toEqual(service.permissions);
      });
    });
  });
});
