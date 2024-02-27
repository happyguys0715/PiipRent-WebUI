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
//
// import { FormButtonComponent } from './form-button.component';
//
// describe('FormButtonComponent', () => {
//   let fixture: ComponentFixture<FormButtonComponent>;
//   let comp: FormButtonComponent;
//   let el;
//   let config = {
//     type: 'button',
//     field: 'id',
//     rowId: '123',
//     templateOptions: {
//       label: 'ENTER',
//       type: 'submit',
//     },
//   };
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [FormButtonComponent],
//       providers: [FormBuilder],
//       imports: [ReactiveFormsModule],
//       schemas: [NO_ERRORS_SCHEMA],
//     });
//   });
//
//   beforeEach(async(() => {
//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(FormButtonComponent);
//       comp = fixture.componentInstance;
//     });
//   }));
//
//   describe('ngOnInit method', () => {
//     it('should update replacyValue by object', () => {
//       comp.config = Object.assign({}, config);
//       comp.config.replace_by = {
//         __str__: 'String',
//       };
//       comp.config.repeat = 2;
//       comp.config.templateOptions.icon = true;
//       spyOn(comp, 'customizeButton');
//       comp.ngOnInit();
//       expect(comp.replacyValue).toEqual('String');
//       expect(comp.repeatArray.length).toEqual(comp.config.repeat);
//       expect(comp.customizeButton).toHaveBeenCalled();
//     });
//
//     it('should update replacyValue by some value', () => {
//       comp.config = Object.assign({}, config);
//       comp.config.replace_by = 'String';
//       comp.config.repeat = undefined;
//       comp.config.templateOptions.icon = true;
//       spyOn(comp, 'customizeButton');
//       comp.ngOnInit();
//       expect(comp.replacyValue).toEqual('String');
//       expect(comp.repeatArray.length).toEqual(1);
//       expect(comp.customizeButton).toHaveBeenCalled();
//     });
//   });
//
//   describe('customizeButton method', () => {
//     it('should update buttonClass', () => {
//       comp.config = Object.assign({}, config);
//       comp.buttonClass = undefined;
//       comp.customizeButton();
//       expect(comp.buttonClass).toEqual('');
//     });
//   });
//
//   describe('action method', () => {
//     it('should be emit event', async(
//       inject([FormBuilder], (fb) => {
//         let form = fb.group({});
//         let key = 'email';
//         let metadata = {
//           key: 'button',
//           templateOptions: {
//             action: 'add_company',
//           },
//         };
//         let event = { type: 'click' };
//         form.addControl(key, fb.control(''));
//         form.get(key).patchValue('test@test.com');
//         comp.group = form;
//         comp.config = Object.assign({}, metadata);
//         spyOn(comp.buttonAction, 'emit');
//         comp.action(event);
//         expect(comp.buttonAction.emit).toHaveBeenCalled();
//       })
//     ));
//   });
// });
