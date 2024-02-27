// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import {
//   TestBed,
//   async,
//   ComponentFixture,
//   inject,
// } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { ListTextComponent } from './list-text.component';
//
// describe('ListTextComponent', () => {
//   let fixture: ComponentFixture<ListTextComponent>;
//   let comp: ListTextComponent;
//   let el;
//   let config = {
//     href: 'phone',
//     name: 'phone_mobile',
//     type: 'link',
//   };
//
//   const moment = require('moment-timezone');
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [ListTextComponent],
//       providers: [],
//       imports: [],
//       schemas: [NO_ERRORS_SCHEMA],
//     });
//   });
//
//   beforeEach(async(() => {
//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(ListTextComponent);
//       comp = fixture.componentInstance;
//     });
//   }));
//
//   it('should enter the assertion', async () => {
//     expect(comp).toBeDefined();
//   });
//
//   describe('ngOnInit method', () => {
//     it('should update value property', () => {
//       comp.config = Object.assign({}, config);
//       comp.config.value = 0;
//       spyOn(comp, 'checkDate');
//       comp.ngOnInit();
//       expect(comp.value).toEqual(0);
//       expect(comp.checkDate).toHaveBeenCalled();
//     });
//   });
//
//   describe('checkDate method', () => {
//     it('should parse time value', () => {
//       comp.config = Object.assign({}, config);
//       comp.config.templateOptions = {
//         type: 'time',
//       };
//       comp.value = '08:00:00';
//       spyOn(comp, 'ngOnInit');
//       comp.checkDate(moment);
//       expect(comp.value).toEqual('08:00 AM');
//     });
//
//     it('should parse time if value is array', () => {
//       comp.config = Object.assign({}, config);
//       comp.config.templateOptions = {
//         type: 'time',
//       };
//       comp.arrayValue = true;
//       comp.value = ['08:00:00'];
//       spyOn(comp, 'ngOnInit');
//       comp.checkDate(moment);
//       expect(comp.value).toEqual(['08:00 AM']);
//     });
//
//     it('should parse date value', () => {
//       comp.config = Object.assign({}, config);
//       comp.config.templateOptions = {
//         type: 'date',
//       };
//       comp.value = '2017-12-08';
//       spyOn(comp, 'ngOnInit');
//       comp.checkDate(moment);
//       expect(comp.value).toEqual('08/12/2017');
//     });
//
//     it('should parse date if value is array', () => {
//       comp.config = Object.assign({}, config);
//       comp.config.templateOptions = {
//         type: 'date',
//       };
//       comp.arrayValue = true;
//       comp.value = ['2017-12-08'];
//       spyOn(comp, 'ngOnInit');
//       comp.checkDate(moment);
//       expect(comp.value).toEqual(['08/12/2017']);
//     });
//
//     it('should parse datetime value', () => {
//       comp.config = Object.assign({}, config);
//       comp.config.templateOptions = {
//         type: 'datetime',
//       };
//       comp.value = '2017-12-08T08:00:00+11:00';
//       spyOn(comp, 'ngOnInit');
//       comp.checkDate(moment);
//       expect(comp.value).toEqual('08/12/2017 08:00 AM');
//     });
//
//     it('should parse datetime if value is array', () => {
//       comp.config = Object.assign({}, config);
//       comp.config.templateOptions = {
//         type: 'datetime',
//       };
//       comp.arrayValue = true;
//       comp.value = ['2017-12-08T08:00:00+11:00'];
//       spyOn(comp, 'ngOnInit');
//       comp.checkDate(moment);
//       expect(comp.value).toEqual(['08/12/2017 08:00 AM']);
//     });
//   });
// });
