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
// import { FormTextareaComponent } from './form-textarea.component';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
//
// describe('FormTextareaComponent', () => {
//   let fixture: ComponentFixture<FormTextareaComponent>;
//   let comp: FormTextareaComponent;
//   let el;
//   let config = {
//     type: 'textarea',
//     key: 'note',
//     read_only: false,
//     templateOptions: {
//       placeholder: 'Placeholder',
//       max: 200,
//       min: 2,
//       cols: 3,
//       rows: 5,
//       label: 'Note',
//       required: true,
//       description: 'Note text',
//     },
//   };
//   let errors = {};
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [FormTextareaComponent],
//       providers: [FormBuilder],
//       imports: [ReactiveFormsModule],
//       schemas: [NO_ERRORS_SCHEMA],
//     });
//   });
//
//   beforeEach(async(() => {
//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(FormTextareaComponent);
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
//         expect(comp.displayValue).toEqual('mr');
//       })
//     ));
//
//     it('should set value', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = Object.assign({}, config);
//         comp.setInitValue();
//         expect(comp.displayValue).toEqual('-');
//       })
//     ));
//   });
//
//   describe('ngAfterViewInit method', () => {
//     it('should called addControl method', async(() => {
//       comp.config = Object.assign({}, config);
//       comp.textarea = {};
//       spyOn(comp, 'addFlags');
//       comp.ngAfterViewInit();
//       expect(comp.addFlags).toHaveBeenCalled();
//     }));
//   });
// });
