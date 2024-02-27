// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import {
//   TestBed,
//   async,
//   ComponentFixture,
//   inject,
// } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
// import { FormSelectComponent } from './form-select.component';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
//
// describe('FormSelectComponent', () => {
//   let fixture: ComponentFixture<FormSelectComponent>;
//   let comp: FormSelectComponent;
//   let el;
//   let config = {
//     type: 'select',
//     key: 'country',
//     read_only: false,
//     templateOptions: {
//       label: 'Country',
//       required: true,
//       description: 'country text',
//       placeholder: 'Country',
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
//   let errors = {};
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [FormSelectComponent],
//       providers: [FormBuilder],
//       imports: [ReactiveFormsModule],
//       schemas: [NO_ERRORS_SCHEMA],
//     });
//   });
//
//   beforeEach(async(() => {
//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(FormSelectComponent);
//       comp = fixture.componentInstance;
//     });
//   }));
//
//   describe('ngOnInit method', () => {
//     it('should init defaults properties', async(
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
//   describe('getValue method', () => {
//     it('should return label by some value', () => {
//       const options = [{ value: '1', label: 'Accepted' }];
//       const value = '1';
//       let result = comp.getValue(options, value);
//       expect(result).toEqual(options[0].label);
//     });
//
//     it('should return default value', () => {
//       const options = [{ value: '1', label: 'Accepted' }];
//       const value = undefined;
//       let result = comp.getValue(options, value);
//       expect(result).toEqual('-');
//     });
//   });
//
//   describe('setInitValue method', () => {
//     it('should set value', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = Object.assign({}, config);
//         comp.key = comp.config.key;
//         comp.config.value = 'mr';
//         comp.group = fb.group({});
//         comp.group.addControl(comp.key, fb.control(''));
//         comp.setInitValue();
//         expect(comp.group.get(comp.key).value).toEqual('mr');
//       })
//     ));
//
//     it('should update display value', () => {
//       comp.config = Object.assign({}, config);
//       comp.config.value = undefined;
//       comp.viewMode = true;
//       comp.config.hide = false;
//       spyOn(comp, 'getValue').and.returnValue('-');
//       comp.setInitValue();
//       expect(comp.displayValue).toEqual('-');
//     });
//   });
//
//   describe('ngAfterViewInit method', () => {
//     it('should called addControl method', async(() => {
//       comp.config = Object.assign({}, config);
//       comp.select = {};
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
//         };
//         let event = { type: 'change' };
//         form.addControl(key, fb.control(''));
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
