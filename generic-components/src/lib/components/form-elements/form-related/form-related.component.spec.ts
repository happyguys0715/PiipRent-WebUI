// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import {
//   TestBed,
//   async,
//   ComponentFixture,
//   inject,
//   fakeAsync,
//   tick,
// } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
// import { FormRelatedComponent, RelatedObject } from './form-related.component';
// import { GenericFormService } from './../../services/generic-form.service';
//
// import { Observable } from 'rxjs/Observable';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { SharedModule } from '../../../shared/shared.module';
// import { ErrorsService } from '../../../shared/services/errors.service';
// import { CheckPermissionService } from '../../../shared/services/check-permission';
// import { NavigationService } from '../../../services/navigation.service';
//
// describe('FormRelatedComponent', () => {
//   let fixture: ComponentFixture<FormRelatedComponent>;
//   let comp: FormRelatedComponent;
//   let el;
//   let config = {
//     type: 'select',
//     key: 'country',
//     read_only: false,
//     many: undefined,
//     value: undefined,
//     metadata: [],
//     collapsed: true,
//     templateOptions: {
//       label: 'Country',
//       required: true,
//       description: 'country text',
//       placeholder: 'Country',
//       display: undefined,
//       param: undefined,
//       options: [
//         {
//           key: 'mr',
//           value: 'Mr.',
//         },
//         {
//           key: 'mrs',
//           value: 'Mrs',
//         },
//       ],
//     },
//   };
//   const mockData = {};
//   let errors = {};
//   let response;
//
//   const mockGenericFormService = {
//     delete() {
//       return Observable.of(true);
//     },
//     getByQuery() {
//       return Observable.of(response);
//     },
//     editForm() {
//       return Observable.of(response);
//     },
//   };
//
//   const mockErrorsService = {
//     parseErrors() {
//       return Observable.of(true);
//     },
//   };
//
//   const mockCheckPermissionService = {
//     getAllowMethods() {
//       return ['get', 'post', 'delete', 'update'];
//     },
//   };
//
//   const mockNavigationService = {
//     linksList: [
//       {
//         url: '/skills/skills/',
//         endpoint: '/skills/skills/',
//       },
//     ],
//   };
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [FormRelatedComponent],
//       providers: [
//         FormBuilder,
//         {
//           provide: CheckPermissionService,
//           useValue: mockCheckPermissionService,
//         },
//         { provide: ErrorsService, userValue: mockErrorsService },
//         { provide: GenericFormService, useValue: mockGenericFormService },
//         { provide: NavigationService, useValue: mockNavigationService },
//       ],
//       imports: [
//         ReactiveFormsModule,
//         FormsModule,
//         NgbModule.forRoot(),
//         SharedModule,
//       ],
//       schemas: [NO_ERRORS_SCHEMA],
//     });
//   });
//
//   beforeEach(async(() => {
//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(FormRelatedComponent);
//       comp = fixture.componentInstance;
//     });
//   }));
//
//   describe('ngOnInit method', () => {
//     it('should init default properties', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = Object.assign({}, config);
//         comp.config.list = true;
//         comp.config.endpoint = '/pricing/pricelistrates/';
//         comp.config.data = new BehaviorSubject(mockData);
//         comp.key = comp.config.key;
//         spyOn(comp, 'addControl');
//         spyOn(comp, 'setInitValue');
//         spyOn(comp, 'checkModeProperty');
//         spyOn(comp, 'checkHiddenProperty');
//         spyOn(comp, 'generateDataForList');
//         spyOn(comp, 'getReplaceElements');
//         spyOn(comp, 'createEvent');
//         spyOn(comp, 'checkFormData');
//         comp.ngOnInit();
//         expect(comp.addControl).toHaveBeenCalled();
//         expect(comp.display).toEqual('{__str__}');
//         expect(comp.param).toEqual('id');
//         expect(comp.setInitValue).toHaveBeenCalled();
//         expect(comp.checkModeProperty).toHaveBeenCalled();
//         expect(comp.checkHiddenProperty).toHaveBeenCalled();
//         expect(comp.generateDataForList).toHaveBeenCalled();
//         expect(comp.getReplaceElements).toHaveBeenCalled();
//         expect(comp.checkFormData).toHaveBeenCalled();
//         expect(comp.createEvent).toHaveBeenCalled();
//         expect(comp.isCollapsed).toEqual(comp.config.collapsed);
//         expect(comp.skillEndpoint).toBeTruthy();
//       })
//     ));
//   });
//
//   describe('generateCustomTemplate method', () => {
//     it('should generate custom template', () => {
//       comp.config = Object.assign({}, config);
//       comp.config.value = {
//         email: 'test@test.com',
//         phone_mobile: '+380777777777',
//         addres: {
//           __str__: 'Home street',
//         },
//         __str__: 'Mr. Test Testovich',
//       };
//       comp.config.customValue = [
//         'Mr. Tom Smith',
//         'Home street',
//         '+380998886633',
//         'test@hotmail.com',
//         'home.com',
//       ]; // tslint:disable-line
//       const fieldsList = [
//         '__str__',
//         'address.__str__',
//         'phone_mobile',
//         'email',
//         'website',
//       ];
//       comp.generateCustomTemplate(fieldsList);
//       expect(comp.customTemplate).toEqual(<any>[
//         {
//           key: '__str__',
//           link: true,
//           value: 'Mr. Tom Smith',
//         },
//         {
//           key: 'address.__str__',
//           icon: 'map-marker',
//           value: 'Home street',
//         },
//         {
//           key: 'phone_mobile',
//           icon: 'commenting',
//           prefix: 'tel:',
//           value: '+380998886633',
//         },
//         {
//           key: 'email',
//           icon: 'envelope',
//           prefix: 'mailto:',
//           value: 'test@hotmail.com',
//         },
//         {
//           key: 'website',
//           icon: 'globe',
//           value: 'home.com',
//           outside: true,
//         },
//       ]);
//     });
//   });
//
//   describe('checkHiddenProperty method', () => {
//     it('should call setInitValue method', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = Object.assign({}, config);
//         comp.key = comp.config.key;
//         comp.group = fb.group({});
//         comp.group.addControl(comp.key, fb.control(''));
//         spyOn(comp, 'setInitValue');
//         comp.config.hidden = new BehaviorSubject(true);
//         comp.checkHiddenProperty();
//         expect(comp.config.hide).toBeTruthy();
//         expect(comp.displayValue).toBeNull();
//         expect(comp.group.get(comp.key).value).toBeUndefined();
//         expect(comp.setInitValue).toHaveBeenCalled();
//       })
//     ));
//
//     it('should set hide false value', () => {
//       comp.config = Object.assign({}, config);
//       comp.config.hidden = new BehaviorSubject(false);
//       comp.checkHiddenProperty();
//       expect(comp.config.hide).toBeFalsy();
//     });
//   });
//
//   describe('checkModeProperty method', () => {
//     it('should set viewMode true value', () => {
//       comp.config = Object.assign({}, config);
//       comp.config.mode = new BehaviorSubject('view');
//       spyOn(comp, 'setInitValue');
//       comp.checkModeProperty();
//       expect(comp.viewMode).toBeTruthy();
//     });
//
//     it('should set viewMode false value', () => {
//       comp.config = Object.assign({}, config);
//       comp.config.mode = new BehaviorSubject('edit');
//       comp.config.read_only = false;
//       spyOn(comp, 'setInitValue');
//       comp.checkModeProperty();
//       expect(comp.viewMode).toBeFalsy();
//     });
//   });
//
//   describe('checkFormData method', () => {
//     it('should subscibe on change data of form', () => {
//       comp.config = Object.assign({}, config);
//       comp.config.formData = new BehaviorSubject({});
//       comp.checkFormData();
//       expect(comp.formData).toEqual({});
//     });
//   });
//
//   describe('getLinkPath method', () => {
//     it('should return url by endpoint', async(
//       inject([NavigationService], (navigation: NavigationService) => {
//         const endpoint = '/skills/skills/';
//         let result = comp.getLinkPath(endpoint);
//         expect(result).toEqual('/skills/skills/');
//       })
//     ));
//   });
//
//   describe('setInitValue method', () => {
//     it('should init properties', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = config;
//         comp.key = comp.config.key;
//         comp.group = fb.group({});
//         comp.group.addControl(comp.key, fb.control(''));
//         spyOn(comp, 'generateDataForList');
//         comp.setInitValue();
//         expect(comp.results).toEqual([]);
//         expect(comp.generateDataForList).toHaveBeenCalledWith(
//           comp.config,
//           comp.config.value
//         );
//       })
//     ));
//
//     it('should update value if it a object', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = Object.assign(config);
//         comp.config.options = [
//           {
//             name: 'First',
//             number: 1,
//           },
//         ];
//         let value = {
//           name: 'First',
//           number: 1,
//         };
//         comp.group = fb.group({});
//         comp.group.addControl(config.key, fb.control(''));
//         comp.config.value = value;
//         comp.config.many = false;
//         comp.key = config.key;
//         comp.display = '{name}';
//         comp.param = 'number';
//         spyOn(comp, 'generateDataForList');
//         spyOn(comp, 'getLinkPath');
//         comp.setInitValue();
//         expect(comp.getLinkPath).toHaveBeenCalled();
//         expect(comp.generateDataForList).toHaveBeenCalledWith(
//           comp.config,
//           comp.config.value
//         );
//         expect(comp.group.get(comp.key).value).toEqual(1);
//         expect(comp.displayValue).toEqual('First');
//       })
//     ));
//
//     it('should update value if it a string', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = config;
//         comp.config.options = [
//           {
//             number: 2,
//             name: 'First',
//           },
//         ];
//         let param = 'number';
//         comp.display = '{name}';
//         comp.param = 'number';
//         let value = 2;
//         spyOn(comp, 'addControl');
//         spyOn(comp, 'generateDataForList');
//         spyOn(comp, 'getLinkPath');
//         comp.group = fb.group({});
//         comp.group.addControl(config.key, fb.control(''));
//         comp.config.value = value;
//         comp.key = config.key;
//         comp.setInitValue();
//         expect(comp.getLinkPath).toHaveBeenCalled();
//         expect(comp.generateDataForList).toHaveBeenCalledWith(
//           comp.config,
//           comp.config.value
//         );
//         expect(comp.group.get(comp.key).value).toEqual(value);
//         expect(comp.displayValue).toEqual('First');
//       })
//     ));
//
//     it('should update value if many property equal true', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         let value = [1, 2, { number: 3 }];
//         let options = [
//           {
//             number: 1,
//             name: 'First',
//           },
//           {
//             number: 2,
//             name: 'Second',
//           },
//           {
//             number: 3,
//             name: 'Third',
//           },
//         ];
//         let display = '{name}';
//         let param = 'number';
//         comp.display = '{name}';
//         comp.param = 'number';
//         comp.config = config;
//         comp.config.many = true;
//         comp.config.value = value;
//         comp.config.options = options;
//         spyOn(comp, 'updateData');
//         spyOn(comp, 'generateDataForList');
//         comp.setInitValue();
//         expect(comp.display).toEqual(display);
//         expect(comp.param).toEqual(param);
//         expect(comp.results).toEqual([
//           { number: 1, name: 'First', __str__: 'First' },
//           { number: 2, name: 'Second', __str__: 'Second' },
//           { number: 3, name: 'Third', __str__: 'Third' },
//         ]);
//         expect(comp.generateDataForList).toHaveBeenCalledWith(
//           comp.config,
//           comp.config.value
//         );
//         expect(comp.updateData).toHaveBeenCalledWith();
//         comp.config.options = null;
//         comp.setInitValue();
//         expect(comp.results).toEqual(config.value);
//       })
//     ));
//   });
//
//   describe('getReplaceElements method', () => {
//     it('should update replaceElements array', () => {
//       const metadata = [
//         {
//           type: 'collapse',
//           children: [
//             {
//               type: 'replace',
//             },
//           ],
//         },
//       ];
//       comp.replaceElements = [];
//       comp.getReplaceElements(metadata);
//       expect(comp.replaceElements.length).toEqual(1);
//     });
//   });
//
//   describe('generateDataForList method', () => {
//     it('should create empty list', () => {
//       comp.config = config;
//       comp.config.metadata = [];
//       comp.config.list = true;
//       comp.config.value = undefined;
//       spyOn(comp, 'createObject').and.returnValue({});
//       comp.generateDataForList(comp.config);
//       expect(comp.createObject).toHaveBeenCalled();
//       expect(comp.dataOfList).toEqual([{}]);
//     });
//
//     it('should create list by value', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = config;
//         comp.config.metadata = [];
//         comp.config.list = true;
//         comp.config.value = [
//           {
//             id: 1,
//           },
//         ];
//         comp.key = comp.config.key;
//         comp.group = fb.group({});
//         comp.group.addControl(comp.config.key, fb.control(''));
//         spyOn(comp, 'createObject').and.returnValue({
//           id: 1,
//           data: {
//             value: {
//               id: 1,
//             },
//           },
//         });
//         spyOn(comp, 'fillingForm');
//         comp.generateDataForList(comp.config, comp.config.value);
//         expect(comp.createObject).toHaveBeenCalled();
//         expect(comp.fillingForm).toHaveBeenCalled();
//         expect(comp.dataOfList.length).toEqual(1);
//         expect(comp.group.get(comp.config.key).value).toEqual(
//           comp.config.value
//         );
//       })
//     ));
//   });
//
//   describe('createObject method', () => {
//     it('create new object of list', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = config;
//         comp.config.metadata = [{}];
//         let result = comp.createObject();
//         expect(result).toBeDefined();
//         expect(result.data).toBeDefined();
//         expect(result.metadata).toEqual([{ mode: undefined }]);
//       })
//     ));
//   });
//
//   describe('addObject method', () => {
//     it('should add new empty object into list', () => {
//       let event = {
//         preventDefault() {
//           return true;
//         },
//         stopPropagation() {
//           return true;
//         },
//       };
//       comp.config = config;
//       comp.dataOfList = [];
//       spyOn(comp, 'createObject').and.returnValue({});
//       spyOn(event, 'preventDefault');
//       spyOn(event, 'stopPropagation');
//       comp.addObject(event);
//       expect(comp.createObject).toHaveBeenCalled();
//       expect(comp.dataOfList.length).toEqual(1);
//     });
//   });
//
//   describe('deleteObject method', () => {
//     it('should delete objectfrom list', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         let object = <any>{
//           id: '2',
//           metadata: [],
//           data: fb.group({}),
//         };
//         comp.config = config;
//         comp.dataOfList = [];
//         comp.dataOfList.push(object);
//         spyOn(comp, 'updateValue');
//         comp.deleteObject(object);
//         expect(comp.dataOfList.length).toEqual(0);
//         expect(comp.updateValue).toHaveBeenCalled();
//       })
//     ));
//   });
//
//   describe('editObject method', () => {
//     it('should call open method for edit object', () => {
//       const obj: RelatedObject = {
//         id: '133',
//         allData: {},
//         data: undefined,
//         metadata: [],
//       };
//       spyOn(comp, 'open');
//       comp.editObject(obj);
//       expect(comp.open).toHaveBeenCalledWith('update', undefined, obj);
//     });
//   });
//
//   describe('setAsDefault method', () => {
//     it('should call updateList method', () => {
//       comp.config = Object.assign({}, config);
//       const obj: RelatedObject = {
//         id: '133',
//         allData: {
//           skill: {
//             id: '1243',
//           },
//         },
//         data: undefined,
//         metadata: [],
//       };
//       spyOn(comp, 'updateList');
//       comp.setAsDefault(obj);
//       expect(comp.updateList).toHaveBeenCalled();
//     });
//   });
//
//   describe('updateValue method', () => {
//     it('should update value of element', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         let event = {};
//         comp.config = config;
//         comp.key = comp.config.key;
//         comp.group = fb.group({});
//         comp.group.addControl(comp.config.key, fb.control(''));
//         comp.dataOfList = [
//           {
//             id: 1,
//             data: {
//               value: {
//                 first_name: 'Tom',
//                 last_name: 'Smith',
//               },
//             },
//           },
//         ];
//         comp.updateValue(event);
//         expect(comp.group.get(comp.config.key).value).toEqual([
//           {
//             first_name: 'Tom',
//             last_name: 'Smith',
//             id: 1,
//           },
//         ]);
//       })
//     ));
//   });
//
//   describe('fillingForm method', () => {
//     it('should filling form by data', () => {
//       let metadata = [
//         {
//           children: [
//             {
//               key: 'address.city',
//             },
//           ],
//         },
//       ];
//       let data = {
//         address: {
//           city: 'Sydney',
//         },
//       };
//       spyOn(comp, 'getValueOfData');
//       comp.fillingForm(metadata, data);
//       expect(comp.getValueOfData).toHaveBeenCalled();
//     });
//   });
//
//   describe('getValueOfData method', () => {
//     it('should set value by key from Object', () => {
//       let data = {
//         address: {
//           city: {
//             __str__: 'Sydney',
//             id: 123,
//           },
//         },
//       };
//       let object = <any>{};
//       let key = 'address.city';
//       let obj = {
//         type: 'related',
//         value: undefined,
//         options: undefined,
//       };
//       comp.getValueOfData(data, key, obj);
//       expect(obj.value).toEqual({
//         __str__: 'Sydney',
//         id: 123,
//       });
//       expect(obj.options).toEqual([
//         {
//           __str__: 'Sydney',
//           id: 123,
//         },
//       ]);
//     });
//   });
//
//   describe('onModalScrollDown method', () => {
//     it('should called generateList method', async(() => {
//       comp.config = config;
//       comp.searchValue = 'query';
//       spyOn(comp, 'generateList');
//       comp.onModalScrollDown();
//       expect(comp.generateList).toHaveBeenCalledWith(comp.searchValue, true);
//     }));
//   });
//
//   describe('deleteElement method', () => {
//     it('should emit event for delete related object', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = config;
//         comp.modalData = {
//           endpoint: 'some endpont',
//           id: 123,
//         };
//         let test = {
//           closeModal() {
//             return true;
//           },
//         };
//         let event = {
//           type: 'delete',
//           endpoint: comp.modalData.endpoint,
//           id: comp.modalData.id,
//         };
//         comp.group = fb.group({});
//         comp.key = 'key';
//         comp.config.value = 'some';
//         comp.displayValue = 'some';
//         comp.group.addControl(comp.key, fb.control('some value'));
//         spyOn(test, 'closeModal');
//         spyOn(comp.event, 'emit');
//         comp.deleteElement(test.closeModal);
//         expect(comp.event.emit).toHaveBeenCalledWith(event);
//         expect(test.closeModal).toHaveBeenCalledWith();
//         expect(comp.group.get(comp.key).value).toEqual('');
//         expect(comp.config.value).toBeUndefined();
//         expect(comp.displayValue).toBeNull();
//       })
//     ));
//   });
//
//   describe('open method', () => {
//     it('should set data for modal window', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = Object.assign({}, config);
//         comp.group = fb.group({});
//         comp.key = 'key';
//         comp.modalData = {};
//         comp.group.addControl(comp.key, fb.control(''));
//         let type = 'post';
//         let event = {
//           preventDefault() {
//             return true;
//           },
//           stopPropagation() {
//             return true;
//           },
//         };
//         spyOn(event, 'preventDefault');
//         spyOn(event, 'stopPropagation');
//         spyOn(comp, 'checkPermission').and.returnValue(true);
//         comp.open(type, event);
//         expect(comp.modalData).toEqual({
//           type,
//           title: comp.config.templateOptions.label,
//           endpoint: comp.config.templateOptions.endpoint,
//         });
//         expect(event.preventDefault).toHaveBeenCalled();
//         expect(event.stopPropagation).toHaveBeenCalled();
//       })
//     ));
//
//     it('should set data for edit object', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = Object.assign({}, config);
//         comp.config.prefilled = {
//           candidate_contact: '123',
//         };
//         comp.group = fb.group({});
//         comp.key = 'key';
//         comp.modalData = {};
//         comp.group.addControl(comp.key, fb.control(''));
//         comp.group.get(comp.key).patchValue(123);
//         comp.displayValue = 'Mr. Tom Smith';
//         let type = 'update';
//         spyOn(comp, 'checkPermission').and.returnValue(true);
//         comp.open(type);
//         expect(comp.modalData).toEqual({
//           id: 123,
//           type,
//           title: comp.displayValue,
//           endpoint: comp.config.endpoint,
//           mode: 'update',
//           data: {
//             candidate_contact: {
//               action: 'add',
//               data: {
//                 value: '123',
//                 read_only: true,
//               },
//             },
//           },
//         });
//       })
//     ));
//   });
//
//   describe('openAutocomplete method', () => {
//     it('should open actocomplete element', fakeAsync(() => {
//       comp.config = config;
//       comp.search = {
//         nativeElement: {
//           focus() {
//             return true;
//           },
//         },
//       };
//       comp.searchValue = 'query';
//       spyOn(comp, 'generateList');
//       spyOn(comp.search.nativeElement, 'focus');
//       comp.openAutocomplete();
//       expect(comp.searchValue).toBeNull();
//       expect(comp.hideAutocomplete).toBeFalsy();
//       expect(comp.generateList).toHaveBeenCalledWith(comp.searchValue);
//       tick(100);
//       expect(comp.search.nativeElement.focus).toHaveBeenCalled();
//     }));
//   });
//
//   describe('generateList method', () => {
//     it('should generate list property from data', async(() => {
//       let value = 'query';
//       comp.config = config;
//       config['useOptions'] = true;
//       comp.results = [];
//       comp.display = 'name';
//       comp.list = [];
//       comp.hideAutocomplete = true;
//       comp.config.options = [{ name: 'Lilu' }, { name: 'Bob' }];
//       spyOn(comp.config.options, 'filter').and.returnValue(comp.config.options);
//       spyOn(comp.config.options, 'sort').and.returnValue([
//         { name: 'Bob' },
//         { name: 'Lilu' },
//       ]);
//       spyOn(comp, 'generatePreviewList');
//       comp.generateList(value);
//       expect(comp.list).toEqual([{ name: 'Bob' }, { name: 'Lilu' }]);
//       expect(comp.generatePreviewList).toHaveBeenCalledWith(comp.list);
//       expect(comp.hideAutocomplete).toBeFalsy();
//     }));
//
//     it('should call filter method', async(() => {
//       let value = 'as';
//       comp.config = config;
//       comp.results = [];
//       comp.searchValue = 'as';
//       comp.config.options = [{ name: 'Lilu' }, { name: 'Bob' }];
//       spyOn(comp, 'filter');
//       comp.generateList(value);
//       expect(comp.filter).toHaveBeenCalledWith(comp.searchValue);
//       config['useOptions'] = undefined;
//     }));
//
//     it('should call getOptions method', async(() => {
//       let value = 'query';
//       comp.lastElement = 0;
//       comp.config = config;
//       spyOn(comp, 'getOptions');
//       comp.generateList(value);
//       expect(comp.getOptions).toHaveBeenCalledWith(value, 0, false);
//     }));
//   });
//
//   describe('generatePreviewList method', () => {
//     it('should generate priview list', async(() => {
//       comp.lastElement = 0;
//       comp.limit = 10;
//       comp.list = [];
//       spyOn(comp.list, 'slice').and.returnValue([]);
//       comp.generatePreviewList(comp.list);
//       expect(comp.list.slice).toHaveBeenCalledWith(0, 10);
//       expect(comp.previewList).toEqual([]);
//     }));
//   });
//
//   describe('resetList method', () => {
//     it('should reset list property', fakeAsync(() => {
//       comp.list = [{ name: 'Bob' }];
//       comp.previewList = [];
//       comp.lastElement = 10;
//       comp.hideAutocomplete = false;
//       comp.searchValue = 'as';
//       comp.config = config;
//       comp.config.many = false;
//       comp.resetList();
//       tick(200);
//       expect(comp.previewList).toBeNull();
//       expect(comp.hideAutocomplete).toBeTruthy();
//       expect(comp.searchValue).toBeNull();
//       expect(comp.lastElement).toEqual(0);
//       expect(comp.count).toBeNull();
//       expect(comp.list).toBeNull();
//     }));
//   });
//
//   describe('filter method', () => {
//     it('should filter list for autocomplete', async(() => {
//       let value = 'M';
//       comp.config = config;
//       comp.config.options = [
//         { __str__: 'Bob' },
//         { __str__: 'Sam' },
//         { __str__: 'John' },
//         { __str__: 'Bill' },
//         { __str__: 'Tom' },
//       ];
//       comp.config.useOptions = true;
//       comp.results = [];
//       spyOn(comp, 'generatePreviewList');
//       comp.filter(value);
//       expect(comp.list).toEqual([{ __str__: 'Sam' }, { __str__: 'Tom' }]);
//       expect(comp.count).toBeNull();
//       expect(comp.previewList).toBeNull();
//       expect(comp.generatePreviewList).toHaveBeenCalledWith(comp.list);
//       comp.config.useOptions = undefined;
//     }));
//
//     it('should call generateList method', async(() => {
//       let value = 'Tom';
//       comp.config = config;
//       spyOn(comp, 'generateList');
//       comp.filter(value);
//       expect(comp.generateList).toHaveBeenCalledWith(value);
//     }));
//   });
//
//   describe('setValue method', () => {
//     it('should add value if many values', async(() => {
//       let options = [
//         { __str__: 'Bob', id: '123' },
//         { __str__: 'Sam', id: '124' },
//         { __str__: 'John', id: '125' },
//         { __str__: 'Bill', id: '126' },
//         { __str__: 'Tom', id: '127' },
//       ];
//       let item = options[0];
//       comp.config = config;
//       comp.config.options = options;
//       comp.config.many = true;
//       comp.param = 'id';
//       comp.results = [];
//       comp.searchValue = 'some value';
//       comp.message = {};
//       comp.errors = {};
//       this.list = options;
//       spyOn(comp, 'changeList');
//       spyOn(comp, 'updateData');
//       spyOn(comp, 'eventHandler');
//       comp.setValue(item);
//       expect(comp.results).toEqual([item]);
//       expect(comp.changeList).toHaveBeenCalled();
//       expect(comp.updateData).toHaveBeenCalled();
//       expect(comp.eventHandler).toHaveBeenCalledWith(
//         { type: 'change' },
//         item[comp.param]
//       );
//       expect(comp.searchValue).toBeNull();
//       expect(comp.list).toBeNull();
//       expect(comp.count).toBeNull();
//       expect(comp.previewList).toBeNull();
//     }));
//
//     it('should add value if single value', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         let options = [
//           { __str__: 'Bob', id: 123 },
//           { __str__: 'Sam', id: 124 },
//           { __str__: 'John', id: 125 },
//           { __str__: 'Bill', id: 126 },
//           { __str__: 'Tom', id: 127 },
//         ];
//         let item = options[0];
//         comp.config = config;
//         comp.config.many = false;
//         comp.key = 'manager';
//         comp.group = fb.group({});
//         comp.group.addControl(comp.key, fb.control(''));
//         comp.config.options = options;
//         comp.display = '{__str__}';
//         comp.param = 'id';
//         comp.results = [];
//         comp.searchValue = 'some value';
//         comp.message = {};
//         comp.errors = {};
//         this.list = options;
//         spyOn(comp, 'changeList');
//         spyOn(comp, 'eventHandler');
//         comp.setValue(item);
//         expect(comp.group.get(comp.key).value).toEqual(123);
//         expect(comp.displayValue).toEqual('Bob');
//         expect(comp.changeList).toHaveBeenCalled();
//         expect(comp.eventHandler).toHaveBeenCalledWith(
//           { type: 'change' },
//           item[comp.param]
//         );
//         expect(comp.searchValue).toBeNull();
//         expect(comp.list).toBeNull();
//         expect(comp.previewList).toBeNull();
//       })
//     ));
//   });
//
//   describe('deleteItem method', () => {
//     it('should delete item from results', async(() => {
//       let options = [
//         { name: 'Bob' },
//         { name: 'Sam' },
//         { name: 'John' },
//         { name: 'Bill' },
//         { name: 'Tom' },
//       ];
//       let item = 2;
//       comp.config = config;
//       comp.results = options;
//       spyOn(comp, 'changeList');
//       spyOn(comp, 'updateData');
//       comp.deleteItem(item);
//       options.splice(item, 1);
//       expect(comp.results).toEqual(options);
//       expect(comp.changeList).toHaveBeenCalled();
//       expect(comp.updateData).toHaveBeenCalled();
//     }));
//   });
//
//   describe('eventHandler method', () => {
//     it('should be emit event with value', async(
//       inject([FormBuilder], (fb) => {
//         let metadata = {
//           key: 'title',
//         };
//         let event = { type: 'change' };
//         let value = '123';
//         comp.config = metadata;
//         spyOn(comp.event, 'emit');
//         comp.eventHandler(event, value);
//         expect(comp.event.emit).toHaveBeenCalledWith({
//           type: 'change',
//           el: metadata,
//           value,
//         });
//       })
//     ));
//   });
//
//   describe('changeList method', () => {
//     it('should emit event of change', async () => {
//       let list = [{ name: 'Bob' }, { name: 'Sam' }];
//       comp.config = config;
//       comp.results = list;
//       spyOn(comp.event, 'emit');
//       comp.changeList();
//       expect(comp.event.emit).toHaveBeenCalledWith({ list });
//     });
//   });
//
//   describe('updateData method', () => {
//     it('should update value of form', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         let list = [
//           { name: 'Bob', id: 1 },
//           { name: 'Sam', id: 2 },
//         ];
//         let key = 'name';
//         let form = fb.group({});
//         form.addControl(key, fb.control(''));
//         comp.group = form;
//         comp.config = config;
//         comp.key = key;
//         comp.results = list;
//         comp.param = 'id';
//         comp.updateData();
//         expect(comp.group.get(key).value).toEqual([1, 2]);
//       })
//     ));
//   });
//
//   describe('formEvent method', () => {
//     it('should update save process', () => {
//       const event = {
//         type: 'saveStart',
//       };
//       comp.saveProcess = false;
//       comp.formEvent(event, undefined);
//       expect(comp.saveProcess).toBeTruthy();
//     });
//
//     it('should close modal window and update value', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         let test = {
//           closeModal() {
//             return true;
//           },
//         };
//         let event = {
//           type: 'sendForm',
//           status: 'success',
//           data: {
//             id: 123,
//             __str__: 'First',
//           },
//         };
//         comp.config = Object.assign({}, config);
//         comp.key = comp.config.key;
//         comp.config.list = false;
//         comp.param = 'id';
//         comp.display = '{__str__}';
//         comp.group = fb.group({});
//         comp.group.addControl(comp.key, fb.control(''));
//         spyOn(test, 'closeModal');
//         spyOn(comp, 'eventHandler');
//         comp.formEvent(event, test.closeModal);
//         expect(comp.saveProcess).toBeFalsy();
//         expect(test.closeModal).toHaveBeenCalled();
//         expect(comp.group.get(comp.key).value).toEqual(123);
//         expect(comp.config.value).toEqual(123);
//         expect(comp.displayValue).toEqual('First');
//         expect(comp.eventHandler).toHaveBeenCalledWith({ type: 'change' }, 123);
//       })
//     ));
//
//     it('should call updateList method', () => {
//       let test = {
//         closeModal() {
//           return true;
//         },
//       };
//       let event = {
//         type: 'sendForm',
//         status: 'success',
//       };
//       comp.config = Object.assign({}, config);
//       spyOn(test, 'closeModal');
//       spyOn(comp, 'updateList');
//       comp.formEvent(event, test.closeModal);
//       expect(comp.saveProcess).toBeFalsy();
//       expect(test.closeModal).toHaveBeenCalled();
//       expect(comp.updateList).toHaveBeenCalled();
//     });
//   });
//
//   describe('formError method', () => {
//     it('should update save process', () => {
//       comp.saveProcess = true;
//       comp.formError();
//       expect(comp.saveProcess).toBeFalsy();
//     });
//   });
//
//   describe('updateList method', () => {
//     it('should emit event', () => {
//       comp.config = Object.assign({}, config);
//       spyOn(comp.event, 'emit');
//       comp.updateList();
//       expect(comp.event.emit).toHaveBeenCalled();
//     });
//   });
//
//   describe('generateFields method', () => {
//     it('should generate query by fields', () => {
//       const fields = ['__str__', 'id'];
//       const query = comp.generateFields(fields);
//       expect(query).toEqual('&fields=__str__&fields=id');
//     });
//
//     it('should generate query by param', () => {
//       comp.config = Object.assign({}, config);
//       comp.param = 'id';
//       const query = comp.generateFields();
//       expect(query).toEqual('&fields=__str__&fields=id');
//     });
//   });
//
//   describe('generateQuery method', () => {
//     it('should generate query', () => {
//       comp.formData = {
//         type: 'master',
//       };
//       const queries = {
//         company: '{type}',
//       };
//       const result = comp.generateQuery(queries);
//       expect(result).toEqual('&company=master');
//     });
//   });
//
//   describe('getOptions method', () => {
//     it('should create new previewList', () => {
//       let value: '123';
//       comp.config = Object.assign({}, config);
//       comp.display = '{id}';
//       comp.limit = 10;
//       response = {
//         count: 25,
//         results: [{ id: 1 }, { id: 2 }, { id: 3 }],
//       };
//       spyOn(comp, 'generateFields');
//       spyOn(comp, 'generateQuery');
//       comp.getOptions(value, 0, false);
//       expect(comp.generateFields).toHaveBeenCalled();
//       expect(comp.generateQuery).toHaveBeenCalled();
//       expect(comp.lastElement).toEqual(10);
//       expect(comp.count).toEqual(25);
//       expect(comp.previewList).toEqual([
//         { id: 1, __str__: '1' },
//         { id: 2, __str__: '2' },
//         { id: 3, __str__: '3' },
//       ]);
//     });
//
//     it('should add new elements into previewList', () => {
//       let value: '123';
//       comp.config = Object.assign({}, config);
//       comp.display = '{id}';
//       comp.limit = 10;
//       comp.lastElement = 10;
//       comp.previewList = [
//         { id: 1, __str__: '1' },
//         { id: 2, __str__: '2' },
//         { id: 3, __str__: '3' },
//       ];
//       response = {
//         count: 25,
//         results: [
//           { id: 4, __str__: 4 },
//           { id: 5, __str__: 5 },
//           { id: 6, __str__: 6 },
//         ],
//       };
//       spyOn(comp, 'generateFields');
//       spyOn(comp, 'generateQuery');
//       comp.getOptions(value, 10, true);
//       expect(comp.generateFields).toHaveBeenCalled();
//       expect(comp.generateQuery).toHaveBeenCalled();
//       expect(comp.lastElement).toEqual(20);
//       expect(comp.count).toEqual(25);
//       expect(comp.previewList).toEqual([
//         { id: 1, __str__: '1' },
//         { id: 2, __str__: '2' },
//         { id: 3, __str__: '3' },
//         { id: 4, __str__: '4' },
//         { id: 5, __str__: '5' },
//         { id: 6, __str__: '6' },
//       ]);
//     });
//   });
// });
