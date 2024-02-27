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
// import { FormInputComponent } from './form-input.component';
// import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
//
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
//
// describe('FormInputComponent', () => {
//   let fixture: ComponentFixture<FormInputComponent>;
//   let comp: FormInputComponent;
//   let el;
//   let config = <any>{
//     type: 'input',
//     key: 'test',
//     templateOptions: {
//       placeholder: 'test',
//       max: 2,
//       min: 2,
//       label: 'test',
//       type: 'text',
//       required: true,
//       description: 'test',
//     },
//   };
//   let errors = {};
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [FormInputComponent],
//       providers: [FormBuilder],
//       imports: [ReactiveFormsModule],
//       schemas: [NO_ERRORS_SCHEMA],
//     });
//   });
//
//   beforeEach(async(() => {
//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(FormInputComponent);
//       comp = fixture.componentInstance;
//     });
//   }));
//
//   describe('ngOnInit method', () => {
//     it('should called addControl method', async(
//       inject([FormBuilder], (fb) => {
//         comp.config = Object.assign({}, config);
//         spyOn(comp, 'addControl');
//         spyOn(comp, 'setInitValue');
//         spyOn(comp, 'checkModeProperty');
//         spyOn(comp, 'checkHiddenProperty');
//         spyOn(comp, 'createEvent');
//         comp.ngOnInit();
//         expect(comp.addControl).toHaveBeenCalledWith(comp.config, fb);
//         expect(comp.setInitValue).toHaveBeenCalled();
//         expect(comp.checkModeProperty).toHaveBeenCalled();
//         expect(comp.checkHiddenProperty).toHaveBeenCalled();
//         expect(comp.createEvent).toHaveBeenCalled();
//       })
//     ));
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
//   describe('setInitValue method', () => {
//     it('should set default value', async(
//       inject([FormBuilder], (fb) => {
//         comp.config = Object.assign({}, config);
//         comp.key = comp.config.key;
//         comp.group = fb.group({});
//         comp.group.addControl(comp.key, fb.control(''));
//         comp.config.default = 0;
//         comp.setInitValue();
//         expect(comp.group.get(comp.key).value).toEqual(0);
//       })
//     ));
//
//     it('should set display value from object', () => {
//       comp.config = Object.assign({}, config);
//       comp.config.type = 'static';
//       comp.config.value = {
//         __str__: 'Value',
//       };
//       comp.setInitValue();
//       expect(comp.displayValue).toEqual('Value');
//     });
//
//     it('should set display value from string', () => {
//       comp.config = Object.assign({}, config);
//       comp.config.type = 'static';
//       comp.config.value = 'Value';
//       comp.setInitValue();
//       expect(comp.displayValue).toEqual('Value');
//     });
//   });
//
//   describe('ngAfterViewInit method', () => {
//     it('should called addControl method', async(() => {
//       comp.config = config;
//       comp.config.read_only = false;
//       comp.input = {};
//       spyOn(comp, 'addFlags');
//       comp.ngAfterViewInit();
//       expect(comp.addFlags).toHaveBeenCalled();
//     }));
//   });
//
//   describe('eventHandler method', () => {
//     it('should be emit event', fakeAsync(
//       inject([FormBuilder], (fb) => {
//         let form = fb.group({});
//         let key = 'active';
//         let metadata = {
//           key: 'active',
//         };
//         let event = { type: 'change' };
//         form.addControl(key, fb.control(''));
//         form.get(key).patchValue('test@test.com');
//         comp.group = form;
//         comp.config = metadata;
//         comp.key = key;
//         spyOn(comp.event, 'emit');
//         comp.eventHandler(event);
//         tick(300);
//         expect(comp.event.emit).toHaveBeenCalled();
//       })
//     ));
//   });
//
//   describe('filter method', () => {
//     it('should update filteredList', async(
//       inject([FormBuilder], (fb) => {
//         let form = fb.group({});
//         let metadata = {
//           autocomplete: [{ name: 'anna' }, { name: 'banana' }],
//         };
//         let key = 'email';
//         form.addControl('email', fb.control(''));
//         comp.group = form;
//         comp.config = metadata;
//         spyOn(comp, 'generateList');
//         comp.filter(key);
//         expect(comp.generateList).toHaveBeenCalled();
//       })
//     ));
//
//     it('should update filteredList by query', async(
//       inject([FormBuilder], (fb) => {
//         let form = fb.group({});
//         let metadata = {
//           autocomplete: [{ name: 'anna' }, { name: 'banana' }],
//         };
//         let key = 'email';
//         form.addControl('email', fb.control(''));
//         comp.group = form;
//         comp.config = metadata;
//         spyOn(comp, 'generatePreviewList');
//         form.get(key).patchValue('an');
//         comp.filter(key);
//         comp.list = metadata.autocomplete;
//         expect(comp.generatePreviewList).toHaveBeenCalledWith(
//           metadata.autocomplete
//         );
//       })
//     ));
//   });
//
//   describe('select method', () => {
//     it('should update field', async(
//       inject([FormBuilder], (fb) => {
//         let form = fb.group({});
//         let key = 'email';
//         form.addControl('email', fb.control(''));
//         comp.group = form;
//         comp.key = key;
//         spyOn(comp, 'generateList');
//         comp.select('anna');
//         expect(comp.generateList).toHaveBeenCalled();
//         expect(comp.group.get(key).value).toEqual('anna');
//         expect(comp.filteredList).toBeNull();
//       })
//     ));
//   });
//
//   describe('generateList method', () => {
//     it('should generate first list for autocomplete', async(() => {
//       let key = 'email';
//       comp.key = key;
//       comp.hideAutocomplete = true;
//       let metadata = {
//         autocomplete: [{ name: 'banana' }, { name: 'anna' }],
//       };
//       comp.config = metadata;
//       spyOn(comp, 'generatePreviewList');
//       let result = metadata.autocomplete.sort((p, n) =>
//         p.name > n.name ? 1 : -1
//       );
//       comp.generateList();
//       expect(comp.hideAutocomplete).toBeFalsy();
//       expect(comp.list).toEqual(result);
//       expect(comp.generatePreviewList).toHaveBeenCalledWith(result);
//     }));
//   });
//
//   describe('onModalScrollDown method', () => {
//     it('should call generatePreviewList method', async(() => {
//       comp.config = config;
//       let filteredList = [{ name: 'anna' }, { name: 'top' }];
//       comp.filteredList = filteredList;
//       spyOn(comp, 'generatePreviewList');
//       comp.onModalScrollDown();
//       expect(comp.generatePreviewList).toHaveBeenCalledWith(filteredList);
//     }));
//   });
//
//   describe('generatePreviewList method', () => {
//     it('should generate list for autocomplete', async(() => {
//       comp.config = config;
//       comp.limit = 1;
//       comp.lastElement = 0;
//       let list = [{ name: 'anna' }, { name: 'top' }];
//       comp.generatePreviewList(list);
//       expect(comp.list).toEqual(list.slice(0, 1));
//     }));
//   });
//
//   describe('handleClick method', () => {
//     it('should reset filteredList', async () => {
//       comp.filteredList = [{ name: 'anna' }, { name: 'banana' }];
//       comp.handleClick({ target: {} });
//       expect(comp.filteredList).toEqual([]);
//     });
//   });
// });
