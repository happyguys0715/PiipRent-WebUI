// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import {
//   TestBed,
//   async,
//   ComponentFixture,
//   inject,
// } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { FormOptionsComponent } from './form-options.component';
// import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
//
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
//
// describe('FormOptionsComponent', () => {
//   let fixture: ComponentFixture<FormOptionsComponent>;
//   let comp: FormOptionsComponent;
//   let el;
//   let config = {
//     type: 'formOptions',
//     key: 'choices',
//     templateOptions: {
//       label: 'Choices',
//       required: true,
//     },
//   };
//   let errors = {};
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [FormOptionsComponent],
//       providers: [FormBuilder],
//       imports: [ReactiveFormsModule, FormsModule],
//       schemas: [NO_ERRORS_SCHEMA],
//     });
//   });
//
//   beforeEach(async(() => {
//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(FormOptionsComponent);
//       comp = fixture.componentInstance;
//     });
//   }));
//
//   describe('ngOnInit method', () => {
//     it('should set value', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = config;
//         comp.group = fb.group({});
//         comp.group.addControl(config.key, fb.control(''));
//         comp.config.hidden = new BehaviorSubject(true);
//         comp.key = config.key;
//         spyOn(comp, 'addControl');
//         spyOn(comp, 'setInitValue');
//         comp.ngOnInit();
//         expect(comp.addControl).toHaveBeenCalled();
//         expect(comp.setInitValue).toHaveBeenCalled();
//         expect(comp.config.hide).toBeTruthy();
//         expect(comp.group.get(comp.key).value).toBeUndefined();
//         comp.config.hidden = null;
//       })
//     ));
//   });
//
//   describe('setInitValue method', () => {
//     it('should set value', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = config;
//         comp.group = fb.group({});
//         comp.group.addControl(config.key, fb.control(''));
//         comp.config.value = [
//           {
//             label: 'Label',
//             value: '123',
//           },
//         ];
//         comp.key = config.key;
//         comp.setInitValue();
//         expect(comp.config.hide).toBeTruthy();
//         expect(comp.group.get(comp.key).value).toEqual(comp.config.value);
//         expect(comp.optionsArray).toEqual(comp.config.value);
//       })
//     ));
//
//     it('should set optionsArray', () => {
//       comp.config = config;
//       comp.config.value = null;
//       comp.setInitValue();
//       expect(comp.optionsArray).toEqual([
//         {
//           label: '',
//           value: '',
//         },
//       ]);
//     });
//   });
//
//   describe('updateValue method', () => {
//     it('should update value', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = config;
//         comp.group = fb.group({});
//         comp.group.addControl(config.key, fb.control(''));
//         comp.key = config.key;
//         comp.optionsArray = [
//           {
//             label: '0',
//             value: '0',
//           },
//         ];
//         comp.updateValue();
//         expect(comp.group.get(comp.key).value).toEqual(comp.optionsArray);
//       })
//     ));
//   });
//
//   describe('addOption method', () => {
//     it('should add option into array', () => {
//       comp.config = config;
//       comp.optionsArray = [];
//       comp.addOption();
//       expect(comp.optionsArray).toEqual([
//         {
//           label: '',
//           value: '',
//         },
//       ]);
//     });
//   });
//
//   describe('deleteOption method', () => {
//     it('should delete element', () => {
//       let option = {
//         label: 'Label',
//         value: '123',
//       };
//       comp.config = config;
//       comp.optionsArray = [option];
//       spyOn(comp, 'updateValue');
//       comp.deleteOption(option);
//       expect(comp.updateValue).toHaveBeenCalled();
//       expect(comp.optionsArray.length).toEqual(0);
//     });
//   });
// });
