import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NavigationService } from './navigation.service';
import { CompanyPurposeService } from './company-purpose.service';
import { ErrorsService } from './errors.service';
import { ToastService } from './toast.service';

describe('NaviagationService', () => {
  let service: NavigationService;

  const mockCompanyPurposeService = {
    purpose: 'hire',
    filterNavigationByPurpose(purpose, list) {
      return list;
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NavigationService,
        ErrorsService,
        ToastService,
        { provide: CompanyPurposeService, useValue: mockCompanyPurposeService },
      ],
      imports: [HttpClientTestingModule],
    });

    service = TestBed.get(NavigationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('getPages method', () => {
  //   it('should return observible of response',
  //     async(inject([NavigationService], (service: NavigationService) => {
  //       let results;
  //       response = {
  //         status: 'success',
  //         results: [
  //           {
  //             name: 'Contact',
  //             url: '/contact/',
  //             endpoint: '/contacts',
  //             __str__: 'Contact',
  //             children: []
  //           },
  //           {
  //             name: 'Login',
  //             url: '/login/',
  //             endpoint: '/login',
  //             __str__: 'Login',
  //             children: []
  //           }
  //         ]
  //       };
  //       service.getPages({} as IRole).subscribe(
  //         (list: Page[]) => results = list
  //       );
  //       expect(results).toEqual(response.results);
  //       expect(service.navigationList).toEqual(response.results);
  //   })));
  // });

  // describe('getUserModules method', () => {
  //   it('should return observible of response',
  //     async(inject([NavigationService], (service: NavigationService) => {
  //       let results;
  //       response = {
  //         status: 'success',
  //         results: [
  //           {
  //             id: '69cbd45b-6a32-49c3-b139-460019d10917',
  //             company_contact: {
  //               id: '67fa53b9-b6a1-4c77-aa98-e32613aafc09',
  //               name: 'Director Mr. Tom Smith'
  //             },
  //             dashboard_module: {
  //               id: '23f8b02c-7f78-4a47-8921-c3b784fc7e92',
  //               name: 'City'
  //             },
  //             position: 3,
  //             ui_config: {},
  //             __str__: 'Director Mr. Tom Smith: City'
  //           }
  //         ]
  //       };
  //       service.getUserModules().subscribe(
  //         (userModels: any) => results = userModels
  //       );
  //       expect(results).toEqual(response.results);
  //       expect(service.userModels).toEqual(response.results);
  //   })));
  // });

  // describe('getModules method', () => {
  //   it('should return observible of response',
  //     async(inject([NavigationService], (service: NavigationService) => {
  //       let results;
  //       response = {
  //         status: 'success',
  //         results: [
  //           {
  //             id: '23f8b02c-7f78-4a47-8921-c3b784fc7e92',
  //             content_type: {
  //               id: 24,
  //               name: 'City'
  //             },
  //             module_data: {
  //               app: 'endless_core',
  //               model: 'city'
  //             },
  //             is_active: true,
  //             __str__: 'City'
  //           }
  //         ]
  //       };
  //       service.getModules().subscribe(
  //         (models: any) => results = models
  //       );
  //       expect(results).toEqual(response.results);
  //       expect(service.models).toEqual(response.results);
  //   })));
  // });
});
