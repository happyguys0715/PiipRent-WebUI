// import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
// import {
//   ComponentFixture,
//   TestBed,
//   inject,
//   async,
//   fakeAsync,
//   tick } from '@angular/core/testing';
// import { ActivatedRoute, Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';

// import { Observable, BehaviorSubject } from 'rxjs';
// import { BehaviorSubject } from 'rxjs';

// import { LocalStorageService } from 'ng2-webstorage';

// import { MyobComponent } from './myob.component';
// import { GenericFormService } from '../../dynamic-form/services/generic-form.service';
// import { SettingsService } from '../settings.service';
// import { meta, payrollAccounts } from './myob.meta';

// describe('MyobComponent', () => {

//   let comp: MyobComponent;
//   let fixture: ComponentFixture<MyobComponent>;
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

//   const code = '123';
//   const mockActivatedRoute = {
//     url: Observable.of(mockUrl),
//     queryParams: Observable.of({code}),
//     snapshot: {
//       data: {
//         myobSettings: {
//           myob_settings: {}
//         }
//       }
//     }
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
//       imports: [FormsModule],
//       declarations: [MyobComponent],
//       providers: [
//         LocalStorageService,
//         { provide: SettingsService, useValue: mockSettingsService },
//         { provide: ActivatedRoute, useValue: mockActivatedRoute },
//         { provide: GenericFormService, useValue: mockGenericFormService },
//         { provide: Router, useValue: mockRouter }
//       ],
//       schemas: [ NO_ERRORS_SCHEMA ]
//     })
//     .compileComponents()
//       .then(() => {
//         fixture = TestBed.createComponent(MyobComponent);
//         comp = fixture.componentInstance;
//       });
//   }));

//   describe('ngOnInit method', () => {
//     it('should get data for edit form',
//       async(inject([LocalStorageService], (storage: LocalStorageService) => {
//         const key = '123';
//         const secret = '234';
//         storage.store('key', '123');
//         storage.store('secret', '234');
//         spyOn(comp, 'fillingForm');
//         spyOn(comp, 'saveInfo');
//         spyOn(comp, 'getCompanyFiles');
//         spyOn(comp, 'getAuthData');
//         spyOn(comp, 'parseMYOBSettings');
//         comp.ngOnInit();
//         expect(comp.payrollAccounts).toBeDefined();
//         expect(comp.MYOBSettings).toBeDefined();
//         expect(comp.config).toBeDefined();
//         expect(comp.pageUrl).toBeDefined();
//         expect(comp.endpoint).toBeDefined();
//         expect(comp.companyFile).toBeDefined();
//         expect(comp.fillingForm).toHaveBeenCalledWith(meta, { key, secret });
//         expect(comp.saveInfo).toHaveBeenCalledWith(code, key, secret);
//         expect(comp.getCompanyFiles).toHaveBeenCalled();
//         expect(comp.parseMYOBSettings).toHaveBeenCalled();
//     })));

//   });

//   describe('parseMYOBSettings method', () => {
//     const settings = {
//       subcontractor_contract_work: {
//         id: 'c413e87a',
//         number: '11',
//         name: 'Business',
//         type: 'Bank'
//       },
//       subcontractor_gst: {
//         id: 'c413e87a',
//         number: '11',
//         name: 'Business',
//         type: 'Bank'
//       },
//       candidate_wages: {
//         id: '1e1f2cb0',
//         number: '12',
//         name: 'Undeposited',
//         type: 'Bank'
//       },
//       candidate_superannuation: {
//         id: '9eb5efe3',
//         number: '12',
//         name: 'Payroll',
//         type: 'Bank'
//       },
//       company_client_labour_hire: {
//         id: '99029d69',
//         number: '11',
//         name: 'Business',
//         type: 'Bank'
//       },
//       company_client_gst: {
//         id: '1e1f2cb0',
//         number: '12',
//         name: 'Undeposited',
//         type: 'Bank'
//       },
//       payroll_accounts_last_refreshed: '2018-01-10T02:25:05.708024+11:00',
//       company_files_last_refreshed: '2018-01-10T02:25:05.708024+11:00'
//     };

//     it('should update payrollAccounts', () => {
//       const result = {
//         isCollapsed: false,
//         subcontractor: [
//           {
//             label: 'Subcontractor',
//             key: 'subcontractor',
//             value: ''
//           },
//           {
//             label: 'Contract work',
//             key: 'subcontractor_contract_work',
//             value: 'c413e87a'
//           },
//           {
//             label: 'GST',
//             key: 'subcontractor_gst',
//             value: 'c413e87a'
//           }
//         ],
//         candidate: [
//           {
//             label: 'Cadidate',
//             key: 'candidate',
//             value: ''
//           },
//           {
//             label: 'Wages and Salries',
//             key: 'candidate_wages',
//             value: '1e1f2cb0'
//           },
//           {
//             label: 'Superannuation',
//             key: 'candidate_superannuation',
//             value: '9eb5efe3'
//           }
//         ],
//         company_client: [
//           {
//             label: 'Company Client',
//             key: 'company_client',
//             value: ''
//           },
//           {
//             label: 'Labour hire services',
//             key: 'company_client_labour_hire',
//             value: '99029d69'
//           },
//           {
//             label: 'GST',
//             key: 'company_client_gst',
//             value: '1e1f2cb0'
//           }
//         ]
//       };
//       comp.payrollAccounts = payrollAccounts;
//       const moment = require('moment-timezone');
//       comp.parseMYOBSettings(settings, moment, true);
//       expect(comp.payrollAccounts).toEqual(result);
//     });

//     it('should update time of settings', () => {
//       const moment = require('moment-timezone');
//       comp.payrollAccounts = payrollAccounts;
//       comp.parseMYOBSettings(settings, moment);
//       expect(settings.company_files_last_refreshed).toEqual('10/01/2018 02:25 AM');
//       expect(settings.payroll_accounts_last_refreshed).toEqual('10/01/2018 02:25 AM');
//     });
//   });

//   describe('paseAccounts method', () => {
//     it('should update options of accounts of subcontractor', () => {
//       const key = 'subcontractor';
//       const data = [];
//       comp.payrollAccounts = payrollAccounts;
//       comp.parseAccounts(data, key);
//       expect(comp.payrollAccounts.subcontractor[1].options).toEqual([]);
//       expect(comp.payrollAccounts.subcontractor[2].options).toEqual([]);
//     });

//     it('should update options of accouts of all type contact', () => {
//       const data = [];
//       comp.payrollAccounts = payrollAccounts;
//       comp.parseAccounts(data);
//       expect(comp.payrollAccounts.subcontractor[1].options).toEqual([]);
//       expect(comp.payrollAccounts.subcontractor[2].options).toEqual([]);

//       expect(comp.payrollAccounts.candidate[1].options).toEqual([]);
//       expect(comp.payrollAccounts.candidate[2].options).toEqual([]);

//       expect(comp.payrollAccounts.company_client[1].options).toEqual([]);
//       expect(comp.payrollAccounts.company_client[2].options).toEqual([]);
//     });
//   });

//   describe('eventHandler method', () => {
//     it('should store api key',
//       async(inject([LocalStorageService], (storage: LocalStorageService) => {
//         let event = {
//           type: 'blur',
//           el: {
//             key: 'key'
//           },
//           value: '123'
//         };
//         comp.eventHandler(event);
//         expect(storage.retrieve('key')).toEqual(event.value);
//     })));

//     it('should store secret key',
//       async(inject([LocalStorageService], (storage: LocalStorageService) => {
//         const event = {
//           type: 'blur',
//           el: {
//             key: 'secret'
//           },
//           value: '123'
//         };
//         comp.eventHandler(event);
//         expect(storage.retrieve('secret')).toEqual(event.value);
//     })));
//   });

//   describe('buttonHandler method', () => {
//     it('should call action of button', () => {
//       const event = {
//         type: 'click',
//         value: 'connect'
//       };
//       spyOn(comp, 'connect');
//       comp.connected = false;
//       comp.buttonHandler(event);
//       expect(comp.connect).toHaveBeenCalled();
//     });
//   });

//   describe('saveInfo method', () => {
//     it('should save info after redirect', () => {
//       response.status = 'success';
//       const key = '123';
//       const secret = '123';
//       comp.pageUrl = 'http://localhost/settings/myob';
//       spyOn(comp, 'updateButton');
//       spyOn(comp, 'getCompanyFiles');
//       comp.saveInfo(code, key, secret);
//       expect(comp.connected).toBeTruthy();
//       expect(comp.updateButton).toHaveBeenCalled();
//     });
//   });

//   describe('testCompanyFile method', () => {
//     it('should test company file with credentials', () => {
//       response.status = 'success';
//       response.data = {
//         is_valid: true
//       };
//       const file = {
//         id: '123',
//         username: 'Tom',
//         password: 'Smith',
//         authenticated: undefined
//       };
//       comp.testCompanyFile(file);
//       expect(file.authenticated).toEqual(response.data.is_valid);
//     });

//     it('should update errors', () => {
//       response.status = 'error';
//       response.errors = {};
//       const file = {
//         id: '123',
//         username: 'Tom',
//         password: 'Smith',
//         status: undefined
//       };
//       comp.testCompanyFile(file);
//       expect(comp.error).toEqual(response.errors);
//     });
//   });

//   describe('getCompanyFiles method', () => {
//     it('should update list of company files', () => {
//       response.status = 'success';
//       response.data = {
//         company_files: [
//           {
//             id: '123',
//             name: 'Sandbox'
//           }
//         ]
//       };
//       comp.companyFile = {};
//       spyOn(comp, 'filledCompanyFiles');
//       spyOn(comp, 'getAccounts');
//       comp.getCompanyFiles();
//       expect(comp.companyFile).toEqual({
//         list: response.data.company_files,
//         isCollapsed: false
//       });
//       expect(comp.filledCompanyFiles).toHaveBeenCalled();
//       expect(comp.getAccounts).toHaveBeenCalledWith();
//     });

//     it('should update errors', () => {
//       response.status = 'error';
//       response.errors = {};
//       comp.getCompanyFiles();
//       expect(comp.error).toEqual(response.errors);
//     });
//   });

//   describe('refreshCompanyFiles method', () => {
//     it('should refresh list of company files', () => {
//       response.status = 'success';
//       response.data = {
//         company_files: [
//           {
//             id: '124',
//             name: 'Sandbox File'
//           }
//         ]
//       };
//       comp.companyFile = {
//         list: []
//       };
//       spyOn(comp, 'filledCompanyFiles');
//       spyOn(comp, 'getMYOBSettings');
//       comp.refreshCompanyFiles();
//       expect(comp.companyFile).toEqual({
//         list: response.data.company_files,
//         isCollapsed: false
//       });
//       expect(comp.filledCompanyFiles).toHaveBeenCalled();
//       expect(comp.getMYOBSettings).toHaveBeenCalled();
//     });

//     it('should update errors', () => {
//       response.status = 'error';
//       response.errors = {};
//       comp.refreshCompanyFiles();
//       expect(comp.error).toEqual(response.errors);
//     });
//   });

//   describe('getAccounts method', () => {
//     it('should update list of accounts', () => {
//       response.status = 'success';
//       response.data = {
//         myob_accounts: []
//       };
//       spyOn(comp, 'parseAccounts');
//       comp.getAccounts();
//       expect(comp.accounts).toEqual([]);
//       expect(comp.parseAccounts).toHaveBeenCalled();
//     });

//     it('should call getMYOBSettings for update date of refresh', () => {
//       response.status = 'success';
//       response.data = {};
//       spyOn(comp, 'parseAccounts');
//       spyOn(comp, 'getMYOBSettings');
//       comp.getAccounts(true);
//       expect(comp.parseAccounts).toHaveBeenCalled();
//       expect(comp.getMYOBSettings).toHaveBeenCalled();
//     });

//     it('should update errors', () => {
//       response.status = 'error';
//       response.errors = {};
//       comp.getAccounts();
//       expect(comp.error).toEqual(response.errors);
//     });
//   });

//   describe('getAccountsOfCompanyFile method', () => {
//     it('should update list of file accounts', () => {
//       response.status = 'success';
//       response.data = {
//         myob_accounts: []
//       };
//       const id = '123';
//       const key = 'subcontractor';
//       spyOn(comp, 'parseAccounts');
//       comp.getAccountsOfCompanyFile(id, key);
//       expect(comp.parseAccounts).toHaveBeenCalledWith(response.data.myob_accounts, key);
//     });

//     it('should update errors', () => {
//       response.status = 'error';
//       response.errors = {};
//       const id = '123';
//       const key = 'subcontractor';
//       comp.getAccountsOfCompanyFile(id, key);
//       expect(comp.error).toEqual(response.errors);
//     });
//   });

//   describe('getMYOBSettings method', () => {
//     it('should update myob settings', () => {
//       response.status = 'success';
//       response.data = {
//         myob_settings: {}
//       };
//       spyOn(comp, 'parseMYOBSettings');
//       comp.getMYOBSettings();
//       expect(comp.MYOBSettings).toEqual({});
//       expect(comp.parseMYOBSettings).toHaveBeenCalled();
//     });

//     it('should update errors', () => {
//       response.status = 'error';
//       response.errors = {};
//       comp.getMYOBSettings();
//       expect(comp.error).toEqual(response.errors);
//     });
//   });

//   describe('filledCompanyFiles method', () => {
//     it('should add company lists into account type', () => {
//       comp.payrollAccounts = {
//         subcontractor: [
//           {
//             key: 'subcontractor'
//           }
//         ],
//         candidate: [
//           {
//             key: 'candidate'
//           }
//         ],
//         company_client: [
//           {
//             key: 'company_client'
//           }
//         ]
//       };
//       const accounts = [];
//       comp.filledCompanyFiles(accounts);
//       expect(comp.payrollAccounts.subcontractor[0].options).toEqual([]);
//       expect(comp.payrollAccounts.candidate[0].options).toEqual([]);
//       expect(comp.payrollAccounts.company_client[0].options).toEqual([]);
//     });
//   });

//   describe('updateButton method', () => {
//     it('should update button after success response', () => {
//       const el = {
//         color: undefined,
//         templateOptions: {
//           text: 'Connect'
//         }
//       };
//       const type = 'success';
//       spyOn(comp, 'getElementByKey').and.returnValue(el);
//       comp.updateButton(type);
//       expect(el.color).toEqual('#5cb85c');
//       expect(el.templateOptions.text).toEqual('Success');
//     });

//     it('should update button after error response', fakeAsync(() => {
//       const el = {
//         color: undefined,
//         templateOptions: {
//           text: 'Connect'
//         }
//       };
//       const type = 'error';
//       spyOn(comp, 'getElementByKey').and.returnValue(el);
//       comp.updateButton(type);
//       expect(el.color).toEqual('#d9534f');
//       expect(el.templateOptions.text).toEqual('Error');
//       tick(4000);
//       expect(el.color).toBeUndefined;
//       expect(el.templateOptions.text).toEqual('Connect');
//     }));
//   });

//   describe('fillingForm method', () => {
//     it('should filling form by data', () => {
//       let metadata = [
//         {
//           type: 'collapse',
//           children: [
//             {
//               type: 'input',
//               key: 'key'
//             }
//           ]
//         }
//       ];
//       let data = {
//         key: '123'
//       };
//       spyOn(comp, 'getValueOfData');
//       comp.fillingForm(metadata, data);
//       expect(comp.getValueOfData).toHaveBeenCalled();
//     });
//   });

//   describe('sendForm method', () => {
//     it('should save data', async(inject([Router], (router: Router) => {
//       response.status = 'success';
//       response.data = {};
//       comp.payrollAccounts = payrollAccounts;
//       spyOn(comp, 'resetErrors');
//       spyOn(router, 'navigate');
//       comp.sendForm();
//       expect(comp.resetErrors).toHaveBeenCalled();
//       expect(router.navigate).toHaveBeenCalledWith(['/']);
//     })));

//     it('should update errors', () => {
//       response.status = 'errors';
//       response.errors = {};
//       comp.payrollAccounts = payrollAccounts;
//       spyOn(comp, 'resetErrors');
//       spyOn(comp, 'parseError');
//       comp.sendForm();
//       expect(comp.resetErrors).toHaveBeenCalled();
//       expect(comp.parseError).toHaveBeenCalled();
//     });
//   });

//   describe('getValueOfData method', () => {
//     it('should set value of element', () => {
//       let data = {
//         secret: {
//           key: '123'
//         }
//       };
//       let key = 'secret.key';
//       let object = {
//         value: undefined
//       };
//       comp.getValueOfData(data, key, object);
//       expect(object.value).toEqual('123');
//     });
//   });

//   describe('getElementByKey method', () => {
//     it('should return element from metadata', () => {
//       const element = comp.getElementByKey(meta, 'connect');
//       expect(element).toBeDefined();
//     });
//   });

//   describe('parseError method', () => {
//     it('should update errors of payroll accounts', () => {
//       comp.payrollAccounts = payrollAccounts;
//       const err = {
//         errors: {
//           subcontractor_contract_work: {
//             id: []
//           },
//           subcontractor_gst: {
//             id: []
//           },
//           candidate_wages: {
//             id: []
//           },
//           candidate_superannuation: {
//             id: []
//           },
//           company_client_labour_hire: {
//             id: []
//           },
//           company_client_gst: {
//             id: []
//           }
//         }
//       };
//       comp.parseError(err);
//       expect(comp.payrollAccounts.subcontractor[1].error).toEqual([]);
//       expect(comp.payrollAccounts.subcontractor[2].error).toEqual([]);

//       expect(comp.payrollAccounts.candidate[1].error).toEqual([]);
//       expect(comp.payrollAccounts.candidate[2].error).toEqual([]);

//       expect(comp.payrollAccounts.company_client[1].error).toEqual([]);
//       expect(comp.payrollAccounts.company_client[2].error).toEqual([]);
//     });
//   });

//   describe('resetErrors method', () => {
//     it('should reset errors', () => {
//       comp.payrollAccounts = payrollAccounts;
//       const keys = ['subcontractor', 'candidate', 'company_client'];
//       comp.resetErrors();
//       keys.forEach((el) => {
//         comp.payrollAccounts[el].forEach((item) => {
//           expect(item.error).toBeNull();
//         });
//       });
//     });
//   });

//   describe('reset method', () => {
//     it('should reset changes', () => {
//       comp.MYOBSettings = {};
//       spyOn(comp, 'parseMYOBSettings');
//       comp.reset();
//       expect(comp.parseMYOBSettings).toHaveBeenCalled();
//     });
//   });

// });
