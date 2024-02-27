// import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

// import { Router, ActivatedRoute } from '@angular/router';
// import { LocalStorageService } from 'ng2-webstorage';
// import { SiteService, PageData } from '../../services/site.service';
// import { GenericFormService } from '../../dynamic-form/services/generic-form.service';
// import { NavigationService } from '../../services/navigation.service';
// import { UserService } from '../../services/user.service';

// import { SiteComponent } from './site.component';

// import { Observable } from 'rxjs/Observable';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { CheckPermissionService } from '../../shared/services/check-permission';

// describe('SiteComponent', () => {

//   let comp: SiteComponent;
//   let fixture: ComponentFixture<SiteComponent>;
//   let de: DebugElement;
//   let el: HTMLElement;
//   let mockUrl: any = [];
//   let pageData: PageData;
//   let modulesList: any;
//   let userModules: any;
//   let pages: any;
//   const permissions: any = {};

//   beforeEach(async(() => {

//     const mockSiteService = {
//       getDataOfPage() {
//         return Observable.of(pageData);
//       }
//     };

//     const mockActivatedRoute = {
//       url: Observable.of(mockUrl)
//     };

//     const mockRouter = {
//       navigate() {
//         return true;
//       }
//     };

//     const mockGenericFormService = {
//       delete() {
//         return Observable.of(true);
//       },
//       getAll() {
//         return Observable.of(true);
//       },
//       submitForm() {
//         return Observable.of(true);
//       }
//     };

//     const mockNavigationService = {
//       getModules() {
//         return Observable.of(modulesList);
//       },
//       getUserModules() {
//         return Observable.of(userModules);
//       },
//       getPages() {
//         return Observable.of(pages);
//       }
//     };

//     const mockUserService = {
//       getUserData() {
//         return Observable.of({ data: {} });
//       }
//     };

//     const mockCheckPermissionService = {
//       getAllowMethods() {
//         return ['get', 'post', 'update', 'delete'];
//       }
//     };

//     TestBed.configureTestingModule({
//       declarations: [SiteComponent],
//       providers: [
//         LocalStorageService,
//         { provide: ActivatedRoute, useValue: mockActivatedRoute },
//         { provide: Router, useValue: mockRouter },
//         { provide: SiteService, useValue: mockSiteService },
//         { provide: GenericFormService, useValue: mockGenericFormService },
//         { provide: NavigationService, useValue: mockNavigationService },
//         { provide: UserService, useValue: mockUserService },
//         { provide: CheckPermissionService, useValue: mockCheckPermissionService }
//       ],
//       schemas: [ NO_ERRORS_SCHEMA ]
//     })
//     .compileComponents()
//       .then(() => {
//         fixture = TestBed.createComponent(SiteComponent);
//         comp = fixture.componentInstance;
//       });
//   }));

//   describe('ngOnInit method', () => {

//     it('should open dashboard page',
//       async(inject([ActivatedRoute], (route: ActivatedRoute) => {
//         comp.pageData = undefined;
//         comp.formLabel = 'Add';
//         spyOn(comp, 'getPageNavigation');
//         comp.ngOnInit();
//         expect(comp.formLabel).toEqual('');
//         expect(comp.pageData).toBeNull();
//         expect(comp.getPageNavigation).toHaveBeenCalledWith([]);
//         expect(comp.dashboard).toBeTruthy();
//       })));

//     it('should open contact page',
//       async(inject([ActivatedRoute], (route: ActivatedRoute) => {
//         comp.pageData = undefined;
//         comp.formLabel = 'Add';
//         spyOn(comp, 'getPageNavigation');
//         mockUrl.push('contact');
//         comp.ngOnInit();
//         expect(comp.formLabel).toEqual('');
//         expect(comp.pageData).toBeNull();
//         expect(comp.getPageNavigation).toHaveBeenCalledWith(['contact']);
//         expect(comp.dashboard).toBeFalsy();
//     })));
//   });

//   describe('checkPermission method', () => {
//     it('should checkpermission for action', () => {
//       comp.permissionMethods = ['get', 'post'];
//       const result = comp.checkPermission('get');
//       expect(result).toBeTruthy();
//     });
//   });

//   describe('changeFormLabel method', () => {
//     it('should change formLabel proeprty', () => {
//       let event = {
//         str: 'Add',
//         data: {
//           status: true
//         }
//       };
//       comp.formStorage = true;
//       comp.changeFormLabel(event);
//       expect(comp.formLabel).toEqual('Add');
//       expect(comp.approvedStorage).toBeTruthy();
//     });
//   });

//   describe('getPageData method', () => {
//     it('should update pageData property',
//       fakeAsync(inject([SiteService], (siteService: SiteService) => {
//         comp.pagesList = [
//           {
//             children: [],
//             endpoint: '/core/contacts/',
//             name: 'Contact',
//             url: '/contacts/',
//             __str__: 'Contact'
//           }
//         ];
//         pageData = {
//           endpoint: '/contacts/',
//           pathData: {
//             type: 'form',
//             path: '/contact/',
//             id: '123'
//           }
//         };
//         comp.getPageData(['contact']);
//         tick(100);
//         expect(comp.pageData).toEqual(pageData);
//     })));

//     it('should navigate to dashboard',
//       async(inject([SiteService, Router], (siteService: SiteService, router: Router) => {
//         comp.pagesList = [];
//         pageData = {
//           endpoint: null,
//           pathData: {
//             type: 'form',
//             path: '/',
//             id: '123'
//           }
//         };
//         spyOn(router, 'navigate');
//         comp.getPageData(['contact']);
//         expect(router.navigate).toHaveBeenCalledWith(['/']);
//     })));
//   });

//   describe('getPageNavigation method', () => {
//     it('should call methods', () => {
//       let url = [];
//       spyOn(comp, 'getModelsList');
//       spyOn(comp, 'getPages');
//       spyOn(comp, 'getUserModules');
//       comp.getPageNavigation(url);
//       expect(comp.getModelsList).toHaveBeenCalledWith(url);
//       expect(comp.getPages).toHaveBeenCalledWith(url);
//       expect(comp.getUserModules).toHaveBeenCalledWith(url);
//     });
//   });

//   describe('getModelsList method', () => {
//     it('should update modlelsList property',
//       async(inject([NavigationService], (navigationService: NavigationService) => {
//         modulesList = [];
//         let pagesList = [
//           {
//             children: [],
//             endpoint: '/core/contacts/',
//             name: 'Contact',
//             url: '/contacts/',
//             __str__: 'Contact'
//           }
//         ];
//         let url = ['contacts'];
//         comp.pages = [];
//         comp.userModules = [];
//         spyOn(comp, 'filterNavigation').and.returnValue(pagesList);
//         spyOn(comp, 'getPageData');
//         comp.getModelsList(url);
//         expect(comp.filterNavigation)
//           .toHaveBeenCalledWith(comp.pages, comp.userModules, comp.modulesList);
//         expect(comp.getPageData).toHaveBeenCalledWith(url);
//         expect(comp.modulesList).toEqual(modulesList);
//         expect(comp.pagesList).toEqual(pagesList);
//     })));
//   });

//   describe('getUserModules method', () => {
//     it('should update userModules property',
//       async(inject([NavigationService], (navigationService: NavigationService) => {
//         userModules = [];
//         let pagesList = [
//           {
//             children: [],
//             endpoint: '/core/contacts/',
//             name: 'Contact',
//             url: '/contacts/',
//             __str__: 'Contact'
//           }
//         ];
//         let url = ['contacts'];
//         comp.pages = [];
//         comp.modulesList = [];
//         spyOn(comp, 'filterNavigation').and.returnValue(pagesList);
//         spyOn(comp, 'getPageData');
//         comp.getUserModules(url);
//         expect(comp.filterNavigation)
//           .toHaveBeenCalledWith(comp.pages, comp.userModules, comp.modulesList);
//         expect(comp.getPageData).toHaveBeenCalledWith(url);
//         expect(comp.userModules).toEqual(modulesList);
//         expect(comp.pagesList).toEqual(pagesList);
//     })));
//   });

//   describe('getPages method', () => {
//     it('should update pages property',
//       async(inject([NavigationService], (navigationService: NavigationService) => {
//         pages = [];
//         let pagesList = [
//           {
//             children: [],
//             endpoint: '/core/contacts/',
//             name: 'Contact',
//             url: '/contacts/',
//             __str__: 'Contact'
//           }
//         ];
//         let url = ['contacts'];
//         comp.userModules = [];
//         comp.modulesList = [];
//         spyOn(comp, 'filterNavigation').and.returnValue(pagesList);
//         spyOn(comp, 'getPageData');
//         comp.getPages(url);
//         expect(comp.filterNavigation)
//           .toHaveBeenCalledWith(comp.pages, comp.userModules, comp.modulesList);
//         expect(comp.getPageData).toHaveBeenCalledWith(url);
//         expect(comp.pages).toEqual(modulesList);
//         expect(comp.pagesList).toEqual(pagesList);
//     })));
//   });

//   describe('changeMode method', () => {
//     it('should change formMoe property', () => {
//       const mockPageData = {
//         endpoint: 'some endpoint',
//         pathData: {
//           id: '123'
//         }
//       };
//       comp.formMode = 'view';
//       comp.changeMode(mockPageData);
//       expect(comp.formMode).toEqual('edit');
//     });
//   });

//   describe('formEvent method', () => {
//     it('should update save process', () => {
//       let event = {
//         type: 'saveStart'
//       };
//       comp.saveProcess = false;
//       comp.formEvent(event);
//       expect(comp.saveProcess).toBeTruthy();
//     });

//     it('should redirect to list page', async(inject([Router], (router: Router) => {
//       let event = {
//         type: 'sendForm',
//         status: 'success'
//       };
//       comp.pageData = {
//         endpoint: '/contacts/',
//         pathData: {
//           type: 'form',
//           path: '/contact/',
//           id: '123'
//         }
//       };
//       spyOn(router, 'navigate');
//       comp.formEvent(event);
//       expect(comp.saveProcess).toBeFalsy();
//       expect(router.navigate).toHaveBeenCalledWith([comp.pageData.pathData.path]);
//     })));
//   });

//   describe('formError method', () => {
//     it('should update save process', () => {
//       comp.saveProcess = true;
//       comp.formError();
//       expect(comp.saveProcess).toBeFalsy();
//     });
//   });

//   describe('modeEvent method', () => {
//     it('should change formMode', () => {
//       const mode = 'view';
//       comp.formMode = '';
//       comp.modeEvent(mode);
//       expect(comp.formMode).toEqual(mode);
//     });
//   });

//   describe('deleteElement method', () => {
//     it('should delete widget of form', async(inject([Router], (router: Router) => {
//       spyOn(router, 'navigate');
//       let element = {
//         endpoint: 'some endpoint',
//         pathData: {
//           path: 'some path',
//           id: '123'
//         }
//       };
//       comp.deleteElement(element);
//       expect(router.navigate).toHaveBeenCalledWith([element.pathData.path]);
//     })));
//   });

//   describe('filterNavigation method', () => {
//     it('should call removePages method and return filtered methods', () => {
//       comp.userModules = [
//         {
//           id: '668d308f-ee32-4bdb-ae44-57b5c83431bf',
//           company_contact: {
//             id: '67fa53b9-b6a1-4c77-aa98-e32613aafc09',
//             name: 'Director Mr. Tom Smith'
//           },
//           dashboard_module: {
//             id: '54f6bc1e-aec1-49f2-9f4e-8791326a2750',
//             name: 'Candidate Contact'
//           },
//           position: 1,
//           ui_config: {
//             display_on_navbar: true
//           },
//           __str__: 'Director Mr. Tom Smith: Candidate Contact'
//         }
//       ];
//       comp.modulesList = [
//         {
//           id: '54f6bc1e-aec1-49f2-9f4e-8791326a2750',
//           content_type: {
//             id: 114,
//             name: 'Candidate Contact'
//           },
//           module_data: {
//             app: 'endless_candidate',
//             model: 'candidatecontact',
//             plural_name: 'Candidate Contacts'
//           },
//           is_active: true,
//           __str__: 'Candidate Contact'
//         },
//       ];
//       comp.pages = [
//         {
//           children: [],
//           endpoint: '/candidate/candidatecontacts/',
//           name: 'Candidate Contact',
//           url: '/candidatecontacts/',
//           __str__: 'Candidate Contact'
//         }
//       ];
//       spyOn(comp, 'removePages').and.returnValue(comp.pages);
//       let result = comp.filterNavigation(comp.pages, comp.userModules, comp.modulesList);
//       expect(result).toEqual(comp.pages);
//     });
//   });

//   describe('removePages method', () => {
//     it('should remove pages', () => {
//       let endpoints = ['first', 'second', 'third'];
//       let pagesList = [
//         {
//           endpoint: 'four',
//           children: [
//             {
//               endpoint: 'first',
//               children: []
//             }
//           ]
//         },
//         {
//           endpoint: 'five',
//           children: [
//             {
//               endpoint: 'six',
//               children: [
//                 {
//                   endpoint: 'seven',
//                   children: []
//                 }
//               ]
//             }
//           ]
//         },
//         {
//           endpoint: 'second',
//           children: [
//             {
//               endpoint: 'third',
//               children: []
//             }
//           ]
//         }
//       ];
//       let result = comp.removePages(pagesList, endpoints);
//       expect(result).toEqual([
//         {
//           endpoint: 'four',
//           children: []
//         },
//         {
//           endpoint: 'five',
//           children: [
//             {
//               endpoint: 'six',
//               children: [
//                 {
//                   endpoint: 'seven',
//                   children: []
//                 }
//               ]
//             }
//           ]
//         }
//       ]);
//     });
//   });

//   describe('updateNavigation method', () => {
//     it('should update navigation', () => {
//       let event = {
//         changed: true
//       };
//       spyOn(comp, 'getPageNavigation');
//       comp.updateNavigation(event);
//       expect(comp.pages).toBeNull();
//       expect(comp.userModules).toBeNull();
//       expect(comp.modulesList).toBeNull();
//       expect(comp.getPageNavigation).toHaveBeenCalledWith([]);
//     });
//   });

//   describe('approveFormStorage method', () => {
//     it('should approve form storage',
//       async(inject([Router], (router: Router) => {
//         comp.formStorageEndpoint = '/core/formstorages/';
//         const element = {
//           pathData: {
//             id: '123',
//             path: '/'
//           }
//         };
//         spyOn(router, 'navigate');
//         comp.approveFormStorage(element);
//         expect(router.navigate).toHaveBeenCalledWith([element.pathData.path]);
//     })));
//   });

// });
