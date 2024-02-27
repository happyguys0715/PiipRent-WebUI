// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import {
//   TestBed,
//   async,
//   ComponentFixture,
//   inject,
// } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { FormCheckboxComponent } from './form-checkbox.component';
// import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
//
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
//
// describe('FormCheckboxComponent', () => {
//   let fixture: ComponentFixture<FormCheckboxComponent>;
//   let comp: FormCheckboxComponent;
//   let el;
//   let config = {
//     type: 'checkbox',
//     key: 'is_available',
//     read_only: true,
//     value: false,
//     default: true,
//     templateOptions: {
//       label: 'Test',
//       required: true,
//       type: 'icon',
//       color: 'primary',
//       values: {
//         true: 'check-circle',
//         false: 'times-circle',
//         null: 'minus-circle',
//       },
//     },
//   };
//   let errors = {};
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [FormCheckboxComponent],
//       providers: [FormBuilder],
//       imports: [ReactiveFormsModule],
//       schemas: [NO_ERRORS_SCHEMA],
//     });
//   });
//
//   beforeEach(async(() => {
//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(FormCheckboxComponent);
//       comp = fixture.componentInstance;
//     });
//   }));
//
//   describe('ngOnInit method', () => {
//     it('should init properties', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = Object.assign({}, config);
//         spyOn(comp, 'addControl');
//         spyOn(comp, 'setInitValue');
//         spyOn(comp, 'checkModeProperty');
//         spyOn(comp, 'checkHiddenProperty');
//         spyOn(comp, 'createEvent');
//         comp.ngOnInit();
//         expect(comp.addControl).toHaveBeenCalled();
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
//     it('should init checkbox value', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = Object.assign({}, config);
//         comp.key = config.key;
//         comp.group = fb.group({});
//         comp.group.addControl(comp.key, fb.control(''));
//         comp.viewMode = true;
//         comp.config.templateOptions.type = 'checkbox';
//         spyOn(comp, 'defaultValues');
//         comp.setInitValue();
//         expect(comp.defaultValues).toHaveBeenCalled();
//         expect(comp.group.get(comp.key).value).toBeTruthy();
//       })
//     ));
//
//     it('should init icon value', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = Object.assign({}, config);
//         comp.key = config.key;
//         comp.group = fb.group({});
//         comp.group.addControl(comp.key, fb.control(false));
//         comp.config.templateOptions.type = 'icon';
//         spyOn(comp, 'customizeCheckbox');
//         comp.setInitValue();
//         expect(comp.customizeCheckbox).toHaveBeenCalled();
//         expect(comp.group.get(comp.key).value).toBeTruthy();
//       })
//     ));
//
//     it('should update value', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         let form = fb.group({});
//         comp.group = form;
//         comp.config = config;
//         comp.key = config.key;
//         comp.group.addControl(comp.key, fb.control(false));
//         comp.config.value = null;
//         comp.setInitValue();
//         expect(comp.group.get(comp.config.key).value).toBeTruthy();
//       })
//     ));
//   });
//
//   describe('defaultValues method', () => {
//     it('should update checkboxClass and checkboxValue if value is true', () => {
//       const value = true;
//       comp.defaultValues(value);
//       expect(comp.checkboxClass).toEqual('text-success');
//       expect(comp.checkboxValue).toEqual('check-circle');
//     });
//
//     it('should update checkboxClass and checkboxValue if value is null', () => {
//       const value = null;
//       comp.defaultValues(value);
//       expect(comp.checkboxClass).toEqual('text-muted');
//       expect(comp.checkboxValue).toEqual('minus-circle');
//     });
//
//     it('should update checkboxClass and checkboxValue if value is false', () => {
//       const value = false;
//       comp.defaultValues(value);
//       expect(comp.checkboxClass).toEqual('text-danger');
//       expect(comp.checkboxValue).toEqual('times-circle');
//     });
//   });
//
//   describe('customCheckbox method', () => {
//     it('should update buttonClass', () => {
//       comp.config = Object.assign({}, config);
//       comp.config.templateOptions.color = undefined;
//       comp.checkboxClass = undefined;
//       const value = null;
//       comp.customizeCheckbox(value);
//       expect(comp.checkboxValue).toEqual(config.templateOptions.values[value]);
//       expect(comp.checkboxColor).toEqual('');
//     });
//   });
//
//   describe('ngAfterViewInit method', () => {
//     it('should called addControl method', async(() => {
//       comp.checkbox = {};
//       spyOn(comp, 'addFlags');
//       comp.ngAfterViewInit();
//       expect(comp.addFlags).toHaveBeenCalled();
//     }));
//   });
//
//   describe('eventHandler method', () => {
//     it('should be emit event', async(
//       inject([FormBuilder], (fb) => {
//         let form = fb.group({});
//         let key = 'email';
//         let metadata = {
//           key: 'email',
//           value: 'test@test.com',
//           read_only: false,
//         };
//         let event = { type: 'change' };
//         form.addControl(key, fb.control(''));
//         form.get(key).patchValue('test@test.com');
//         comp.group = form;
//         comp.config = metadata;
//         comp.key = key;
//         spyOn(comp.event, 'emit');
//         comp.eventHandler(event);
//         expect(comp.event.emit).toHaveBeenCalled();
//       })
//     ));
//   });
// });
