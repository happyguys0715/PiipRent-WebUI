// import { NO_ERRORS_SCHEMA, group } from '@angular/core';
// import {
//   TestBed,
//   async,
//   ComponentFixture,
//   inject,
// } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { FormVacancyDatesComponent } from './form-vacancy-dates.component';
// import {
//   ReactiveFormsModule,
//   FormBuilder,
//   FormsModule,
//   FormControl,
// } from '@angular/forms';
//
// describe('FormVacancyDatesComponent', () => {
//   let fixture: ComponentFixture<FormVacancyDatesComponent>;
//   let comp: FormVacancyDatesComponent;
//   let el;
//   let config = {
//     type: 'vacancydates',
//     key: 'vacancydates',
//     templateOptions: {
//       label: 'Vacancy Dates',
//       required: true,
//       description: 'test',
//     },
//   };
//   let errors = {};
//
//   let moment = require('moment');
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [FormVacancyDatesComponent],
//       providers: [FormBuilder],
//       imports: [ReactiveFormsModule, NgbModule.forRoot(), FormsModule],
//       schemas: [NO_ERRORS_SCHEMA],
//     });
//   });
//
//   beforeEach(async(() => {
//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(FormVacancyDatesComponent);
//       comp = fixture.componentInstance;
//     });
//   }));
//
//   it('should be defined', () => {
//     expect(comp).toBeDefined();
//   });
//
//   describe('ngOnInit method', () => {
//     it('should initialize properties', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = config;
//         spyOn(comp, 'calcMinDate');
//         spyOn(comp, 'addControl');
//         comp.ngOnInit();
//         expect(comp.calcMinDate).toHaveBeenCalled();
//         expect(comp.addControl).toHaveBeenCalledWith(comp.config, fb);
//       })
//     ));
//   });
//
//   describe('calcMinDate method', () => {
//     it('should calc min date for datepicker', () => {
//       comp.calcMinDate(moment);
//       expect(comp.minDate).toEqual({
//         year: moment().year(),
//         month: moment().month() + 1,
//         day: moment().date(),
//       });
//     });
//   });
//
//   describe('selectVacancyDate method', () => {
//     it('should update vacancyDates property', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         let event = {
//           day: 1,
//           month: 2,
//           year: 2017,
//         };
//         comp.key = 'date';
//         comp.group = fb.group({});
//         comp.group.addControl(comp.key, fb.control(''));
//         comp.selectVacancyDate(event, moment);
//         expect(comp.event.emit).toHaveBeenCalled();
//         expect(comp.group.get(comp.key).value).toEqual('2017-01-01');
//       })
//     ));
//   });
// });
