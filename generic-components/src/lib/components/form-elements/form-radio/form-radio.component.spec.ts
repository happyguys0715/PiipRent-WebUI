// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import {
//   TestBed,
//   async,
//   ComponentFixture,
//   inject,
// } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { FormRadioComponent } from './form-radio.component';
// import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
//
// describe('FormRadioComponent', () => {
//   let fixture: ComponentFixture<FormRadioComponent>;
//   let comp: FormRadioComponent;
//   let el;
//   let config = {
//     type: 'radio',
//     key: 'font',
//     label: true,
//     default: 'Roboto',
//     read_only: false,
//     templateOptions: {
//       label: 'Font',
//       type: 'text',
//       options: [
//         { key: 'Roboto', value: 'Roboto' },
//         { key: 'Lato', value: 'Lato' },
//         { key: 'Barlow', value: 'Barlow' },
//         { key: 'Open Sans', value: 'Open Sans' },
//       ],
//     },
//   };
//   let errors = {};
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [FormRadioComponent],
//       providers: [FormBuilder],
//       imports: [ReactiveFormsModule, FormsModule],
//       schemas: [NO_ERRORS_SCHEMA],
//     });
//   });
//
//   beforeEach(async(() => {
//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(FormRadioComponent);
//       comp = fixture.componentInstance;
//     });
//   }));
//
//   describe('ngOnInit method', () => {
//     it('should set default value', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = Object.assign(config);
//         comp.key = config.key;
//         comp.group = fb.group({});
//         comp.group.addControl(comp.key, fb.control(undefined));
//         spyOn(comp, 'addControl');
//         comp.ngOnInit();
//         expect(comp.addControl).toHaveBeenCalled();
//         expect(comp.group.get(comp.key).value).toEqual(config.default);
//       })
//     ));
//
//     it('should initialize properties', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = Object.assign(config);
//         comp.config.value = null;
//         comp.key = config.key;
//         comp.group = fb.group({});
//         comp.group.addControl(comp.key, fb.control(undefined));
//         spyOn(comp, 'addControl');
//         comp.ngOnInit();
//         expect(comp.addControl).toHaveBeenCalled();
//         expect(comp.group.get(comp.key).value).toBeNull();
//       })
//     ));
//   });
//
//   describe('eventHandler method', () => {
//     it('should emit event of change value', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = Object.assign(config);
//         let event = {
//           type: 'change',
//         };
//         comp.key = config.key;
//         comp.group = fb.group({});
//         comp.group.addControl(comp.key, fb.control('Lato'));
//         spyOn(comp.event, 'emit');
//         comp.eventHandler(event);
//         expect(comp.event.emit).toHaveBeenCalledWith({
//           type: event.type,
//           el: comp.config,
//           value: 'Lato',
//         });
//       })
//     ));
//   });
// });
