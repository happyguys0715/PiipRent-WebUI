// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import {
//   TestBed,
//   async,
//   ComponentFixture,
//   inject,
// } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
// import {
//   NgbModule,
//   NgbCalendar,
//   NgbDateParserFormatter,
// } from '@ng-bootstrap/ng-bootstrap';
// import { FormDatepickerComponent } from './form-datepicker.component';
//
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
//
// describe('FormDatepickerComponent', () => {
//   let fixture: ComponentFixture<FormDatepickerComponent>;
//   let comp: FormDatepickerComponent;
//   let el;
//   let config = {
//     type: 'datepicker',
//     key: 'birthday',
//     read_only: false,
//     templateOptions: {
//       placeholder: '--/--/----',
//       label: 'Birthday',
//       type: 'date',
//       required: true,
//       description: 'birthday text',
//     },
//   };
//   let errors = {};
//   let moment = require('moment-timezone');
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [FormDatepickerComponent],
//       providers: [FormBuilder],
//       imports: [ReactiveFormsModule, NgbModule.forRoot(), FormsModule],
//       schemas: [NO_ERRORS_SCHEMA],
//     });
//   });
//
//   beforeEach(async(() => {
//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(FormDatepickerComponent);
//       comp = fixture.componentInstance;
//     });
//   }));
//
//   it('should enter the assertion', async(
//     inject([FormBuilder], (fb: FormBuilder) => {
//       comp.config = config;
//       comp.group = fb.group({});
//       comp.errors = errors;
//       expect(comp.errors).toBeDefined();
//       expect(comp.config).toBeDefined();
//     })
//   ));
//
//   describe('ngOnInit method', () => {
//     it('should called addControl method', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = config;
//         spyOn(comp, 'addControl');
//         spyOn(comp, 'identifyDevice').and.returnValue(true);
//         spyOn(comp, 'setInitValue');
//         spyOn(comp, 'checkModeProperty');
//         spyOn(comp, 'checkHiddenProperty');
//         spyOn(comp, 'createEvent');
//         comp.ngOnInit();
//         expect(comp.addControl).toHaveBeenCalled();
//         expect(comp.identifyDevice).toHaveBeenCalled();
//         expect(comp.setInitValue).toHaveBeenCalled();
//         expect(comp.checkModeProperty).toHaveBeenCalled();
//         expect(comp.checkHiddenProperty).toHaveBeenCalled();
//         expect(comp.mobileDevice).toEqual(true);
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
//     it('should init datetime value', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = Object.assign({}, config);
//         comp.config.templateOptions.type = 'datetime';
//         comp.key = config.key;
//         comp.config.value = '2017-02-17T08:00:00+11:00';
//         comp.group = fb.group({});
//         comp.group.addControl(comp.key, fb.control(undefined));
//         spyOn(comp, 'setDate');
//         comp.setInitValue(moment);
//         expect(comp.setDate).toHaveBeenCalled();
//         expect(comp.displayValue).toEqual('17/02/2017 08:00 AM');
//       })
//     ));
//
//     it('should init time value', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = Object.assign({}, config);
//         comp.config.templateOptions.type = 'time';
//         comp.key = config.key;
//         comp.config.value = '08:00:00';
//         comp.group = fb.group({});
//         comp.group.addControl(comp.key, fb.control(undefined));
//         spyOn(comp, 'setTime');
//         comp.setInitValue(moment);
//         expect(comp.setTime).toHaveBeenCalled();
//         expect(comp.displayValue).toEqual('08:00 AM');
//       })
//     ));
//
//     it('should init default datetime value', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = Object.assign({}, config);
//         comp.config.templateOptions.type = 'date';
//         comp.key = config.key;
//         comp.config.value = undefined;
//         comp.config.default = '2017-02-17T08:00:00+11:00';
//         comp.group = fb.group({});
//         comp.group.addControl(comp.key, fb.control(undefined));
//         spyOn(comp, 'setDate');
//         comp.setInitValue(moment);
//         expect(comp.setDate).toHaveBeenCalled();
//         expect(comp.displayValue).toEqual('17/02/2017');
//       })
//     ));
//
//     it('should init default time value', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = Object.assign({}, config);
//         comp.config.templateOptions.type = 'time';
//         comp.key = config.key;
//         comp.config.value = undefined;
//         comp.config.default = '08:00:00';
//         comp.group = fb.group({});
//         comp.group.addControl(comp.key, fb.control(undefined));
//         spyOn(comp, 'setTime');
//         comp.setInitValue(moment);
//         expect(comp.setTime).toHaveBeenCalled();
//         expect(comp.displayValue).toEqual('08:00 AM');
//       })
//     ));
//   });
//
//   describe('identifyDevice method', () => {
//     it('should identify device', () => {
//       let isMobileDevice = comp.identifyDevice();
//       expect(isMobileDevice).toBeFalsy();
//     });
//   });
//
//   describe('ngAfterViewInit method', () => {
//     it('should called addControl method', async(() => {
//       comp.init = true;
//       comp.d = {};
//       spyOn(comp, 'addFlags');
//       comp.ngAfterViewInit();
//       expect(comp.addFlags).toHaveBeenCalled();
//     }));
//   });
//
//   describe('updateDate method', () => {
//     it('should be defined', () => {
//       expect(comp.updateDate).toBeDefined();
//     });
//
//     it('should update datepicker value (date type)', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         let date = {
//           format() {
//             return true;
//           },
//         };
//         comp.config = Object.assign({}, config);
//         comp.config.templateOptions.type = 'date';
//         comp.key = config.key;
//         comp.date = undefined;
//         comp.group = fb.group({});
//         comp.group.addControl(comp.config.key, fb.control(''));
//         spyOn(date, 'format').and.returnValue('2017-06-06');
//         comp.updateDate(date);
//         expect(comp.date).toEqual('2017-06-06');
//         expect(comp.group.get(comp.key).value).toEqual('2017-06-06');
//       })
//     ));
//
//     it('should update datepicker value (date type)', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         let date = {
//           format() {
//             return true;
//           },
//         };
//         comp.config = Object.assign({}, config);
//         comp.config.templateOptions.type = 'datetime';
//         comp.key = config.key;
//         comp.group = fb.group({});
//         comp.group.addControl(comp.config.key, fb.control(''));
//         spyOn(date, 'format').and.returnValue('2017-06-06');
//         comp.updateDate(date);
//         expect(comp.date).toEqual('2017-06-06');
//         expect(comp.time).toEqual('2017-06-06');
//         expect(comp.group.get(comp.key).value).toEqual('2017-06-06');
//       })
//     ));
//   });
//
//   describe('updateTime method', () => {
//     it('should update time value', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         let time = {
//           format() {
//             return true;
//           },
//         };
//         comp.config = Object.assign({}, config);
//         comp.key = config.key;
//         comp.group = fb.group({});
//         comp.group.addControl(comp.config.key, fb.control(''));
//         spyOn(time, 'format').and.returnValue('08:00 AM');
//         comp.updateTime(time);
//         expect(comp.time).toEqual('08:00 AM');
//         expect(comp.group.get(comp.key).value).toBeDefined();
//       })
//     ));
//   });
//
//   describe('setDate method', () => {
//     it('should set date from api', async(() => {
//       let value = '2017-06-06T00:00:00+10:00';
//       spyOn(comp, 'updateDate');
//       comp.setDate(value, moment);
//       expect(comp.updateDate).toHaveBeenCalled();
//     }));
//
//     it('should set date from picker', async(() => {
//       let value = '2017-06-06 02:02 AM';
//       spyOn(comp, 'updateDate');
//       comp.setDate(value, moment, true);
//       expect(comp.updateDate).toHaveBeenCalled();
//     }));
//   });
//
//   describe('setTime method', () => {
//     it('should set time from value', () => {
//       const value = '08:00:00';
//       spyOn(comp, 'updateTime');
//       comp.setTime(value, moment);
//       expect(comp.updateTime).toHaveBeenCalled();
//     });
//
//     it('should set time from picker', () => {
//       const value = '08:00 AM';
//       spyOn(comp, 'updateTime');
//       comp.setTime(value, moment, true);
//       expect(comp.updateTime).toHaveBeenCalled();
//     });
//   });
// });
