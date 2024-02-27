// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import {
//   TestBed,
//   async,
//   ComponentFixture,
//   inject,
// } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { FormJsonComponent } from './form-json.component';
// import { ReactiveFormsModule } from '@angular/forms';
//
// describe('FormJsonComponent', () => {
//   let fixture: ComponentFixture<FormJsonComponent>;
//   let comp: FormJsonComponent;
//   let el;
//   let config = {
//     type: 'json',
//     key: 'data',
//     read_only: false,
//     value: undefined,
//     templateOptions: {
//       label: 'Data',
//     },
//   };
//   let errors = {};
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [FormJsonComponent],
//       providers: [],
//       imports: [ReactiveFormsModule],
//       schemas: [NO_ERRORS_SCHEMA],
//     });
//   });
//
//   beforeEach(async(() => {
//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(FormJsonComponent);
//       comp = fixture.componentInstance;
//     });
//   }));
//
//   describe('ngOnInit method', () => {
//     it('should call generateViewByJSON method', () => {
//       comp.config = Object.assign(config);
//       comp.config.value = {};
//       spyOn(comp, 'generateViewByJSON');
//       comp.ngOnInit();
//       expect(comp.previewData).toEqual([]);
//       expect(comp.generateViewByJSON).toHaveBeenCalledWith(comp.config.value);
//     });
//   });
//
//   describe('generateViewByJSON method', () => {
//     it('should generate data from object', () => {
//       const json = {
//         contact: {
//           first_name: 'Tom',
//           last_name: 'Smith',
//         },
//         address: {
//           country: 'Australia',
//           city: 'Sydney',
//         },
//       };
//       comp.previewData = [];
//       comp.generateViewByJSON(json);
//       expect(comp.previewData).toEqual([
//         { title: 'first name', value: 'Tom' },
//         { title: 'last name', value: 'Smith' },
//         { title: 'country', value: 'Australia' },
//         { title: 'city', value: 'Sydney' },
//       ]);
//     });
//
//     it('should generate data from string', () => {
//       const json = {
//         contact__first_name: 'Tom',
//         contact__last_name: 'Smith',
//         address__country: 'Australia',
//         address__city: 'Sydney',
//       };
//       comp.previewData = [];
//       comp.generateViewByJSON(json);
//       expect(comp.previewData).toEqual([
//         { title: 'first name', value: 'Tom' },
//         { title: 'last name', value: 'Smith' },
//         { title: 'country', value: 'Australia' },
//         { title: 'city', value: 'Sydney' },
//       ]);
//     });
//   });
// });
