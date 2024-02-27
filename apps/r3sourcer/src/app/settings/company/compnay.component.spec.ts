// import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
// import {
//   ComponentFixture,
//   TestBed,
//   inject,
//   async } from '@angular/core/testing';
// import { ActivatedRoute, Router } from '@angular/router';

// import { Observable } from 'rxjs/Observable';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// import { CompanyComponent } from './company.component';
// import { GenericFormService } from '../../dynamic-form/services/generic-form.service';
// import { SettingsService } from '../settings.service';

// describe('CompanyComponent', () => {

//   let comp: CompanyComponent;
//   let fixture: ComponentFixture<CompanyComponent>;
//   let response: any = {
//     status: undefined,
//     data: {},
//     errors: {}
//   };

//   const mockGenericFormService = {
//     submitForm() {
//       if (response.status === 'success') {
//         return Observable.of(response.data);
//       } else {
//         return Observable.throw(response.errors);
//       }
//     },
//     getAll() {
//       if (response.status === 'success') {
//         return Observable.of(response.data);
//       } else {
//         return Observable.throw(response.errors);
//       }
//     }
//   };

//   let mockUrl: any = [{
//     path: 'permissions'
//   }];

//   const mockActivatedRoute = {
//     url: Observable.of(mockUrl)
//   };

//   const mockSettingsService = {
//     url: new BehaviorSubject(mockUrl)
//   };

//   const mockRouter = {
//     navigate() {
//       return true;
//     }
//   };

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [CompanyComponent],
//       providers: [
//         { provide: SettingsService, useValue: mockSettingsService },
//         { provide: ActivatedRoute, useValue: mockActivatedRoute },
//         { provide: GenericFormService, useValue: mockGenericFormService },
//         { provide: Router, useValue: mockRouter }
//       ],
//       schemas: [ NO_ERRORS_SCHEMA ]
//     })
//     .compileComponents()
//       .then(() => {
//         fixture = TestBed.createComponent(CompanyComponent);
//         comp = fixture.componentInstance;
//       });
//   }));

//   describe('ngOnInit method', () => {
//     it('should get data for edit form', () => {
//       response.status = 'success';
//       spyOn(comp, 'fillingForm');
//       comp.ngOnInit();
//       expect(comp.fillingForm).toHaveBeenCalled();
//     });

//     it('should update errors property', () => {
//       response.status = 'error';
//       comp.ngOnInit();
//       expect(comp.errors).toEqual({});
//     });
//   });

//   describe('ngOnDestroy method', () => {
//     it('should call ressetSettings method', () => {
//       spyOn(comp, 'resetSettings');
//       comp.ngOnDestroy();
//       expect(comp.resetSettings).toHaveBeenCalled();
//     });
//   });

//   describe('resetSettings method', () => {
//     it('should reset settings', () => {
//       comp.savedFont = 'Barlow';
//       comp.savedTheme = 'indigo';
//       comp.currentTheme = 'default';
//       const body = document.body;
//       body.parentElement.classList.add(`${comp.currentTheme}-theme`);
//       comp.resetSettings();
//       expect(body.parentElement.classList.contains(`${comp.currentTheme}-theme`));
//       expect(body.style.fontFamily).toEqual(`${comp.savedFont}, sans-serif`);
//     });
//   });

//   describe('submitForm method', () => {
//     it('should update object', async(inject([Router], (router: Router) => {
//       let data = {};
//       comp.endpoint = 'some endpoint';
//       response.status = 'success';
//       response.data = {};
//       spyOn(router, 'navigate');
//       comp.submitForm(data);
//       expect(comp.savedTheme).toBeNull();
//       expect(comp.savedFont).toBeNull();
//       expect(router.navigate).toHaveBeenCalledWith(['/']);
//     })));

//     it('should update errors property', () => {
//       let data = {};
//       comp.endpoint = 'some endpoint';
//       response.status = 'error';
//       comp.submitForm(data);
//       expect(comp.errors).toEqual({});
//     });
//   });

//   describe('fillingForm method', () => {
//     it('should filling form by data', () => {
//       let metadata = [
//         {
//           type: 'collapse',
//           children: [
//             {
//               type: 'radio',
//               key: 'font'
//             }
//           ]
//         }
//       ];
//       let data = {
//         font: 'Roboto'
//       };
//       spyOn(comp, 'getValueOfData');
//       comp.fillingForm(metadata, data);
//       expect(comp.getValueOfData).toHaveBeenCalled();
//     });
//   });

//   describe('getValueOfData method', () => {
//     it('should set value of element', () => {
//       let data = {
//         company_setting: {
//           color_scheme: 'indigo',
//           font: 'Barlow'
//         }
//       };
//       let key = 'company_setting.color_scheme';
//       let object = {
//         value: undefined
//       };
//       comp.getValueOfData(data, key, object);
//       expect(comp.savedTheme).toEqual('indigo');
//       expect(comp.currentTheme).toEqual('indigo-theme');
//       comp.getValueOfData(data, 'company_setting.font', object);
//       expect(object.value).toEqual('Barlow');
//       expect(comp.savedFont).toEqual('Barlow');
//     });
//   });

//   describe('eventHandler method', () => {
//     it('should change color scheme of site', () => {
//       let event = {
//         type: 'change',
//         el: {
//           type: 'radio',
//           templateOptions: {
//             type: 'color'
//           }
//         },
//         value: 'indigo'
//       };
//       let body = document.body;
//       let theme = `${event.value}-theme`;
//       comp.eventHandler(event);
//       expect(body.parentElement.classList.contains(theme)).toBeTruthy();
//       expect(comp.currentTheme).toEqual(theme);
//     });

//     it('should change font of site', () => {
//       let event = {
//         type: 'change',
//         el: {
//           type: 'radio',
//           templateOptions: {
//             type: 'text'
//           }
//         },
//         value: 'Lato'
//       };
//       let body = document.body;
//       let font = `${event.value}, sans-serif`;
//       comp.eventHandler(event);
//       expect(body.style.fontFamily).toEqual(font);
//       expect(comp.currentFont).toEqual(event.value);
//     });
//   });

// });
