// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import {
//   TestBed,
//   async,
//   ComponentFixture,
//   inject,
// } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { ListCheckboxComponent } from './list-checkbox.component';
//
// describe('FormSelectComponent', () => {
//   let fixture: ComponentFixture<ListCheckboxComponent>;
//   let comp: ListCheckboxComponent;
//   let el;
//   let config = {
//     href: 'phone',
//     name: 'phone_mobile',
//     type: 'link',
//     value: true,
//     values: {
//       true: 'HQ:',
//     },
//   };
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [ListCheckboxComponent],
//       providers: [],
//       imports: [],
//       schemas: [NO_ERRORS_SCHEMA],
//     });
//   });
//
//   beforeEach(async(() => {
//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(ListCheckboxComponent);
//       comp = fixture.componentInstance;
//     });
//   }));
//
//   it('should enter the assertion', async () => {
//     expect(comp).toBeDefined();
//   });
//
//   describe('ngOnInit method', () => {
//     it('should init value', async () => {
//       comp.config = config;
//       comp.ngOnInit();
//       expect(comp.value).toEqual('HQ:');
//     });
//   });
// });
