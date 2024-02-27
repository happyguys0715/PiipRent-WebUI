// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import {
//   TestBed,
//   async,
//   ComponentFixture,
//   inject,
// } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { ListImageComponent } from './list-image.copmonent';
//
// describe('ListImageComponent', () => {
//   let fixture: ComponentFixture<ListImageComponent>;
//   let comp: ListImageComponent;
//   let el;
//   let config = {
//     key: 'gender',
//     name: 'gender',
//     type: 'icon',
//     value: 'male',
//     values: {
//       female: 'venus',
//       male: 'mars',
//     },
//   };
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [ListImageComponent],
//       providers: [],
//       imports: [],
//       schemas: [NO_ERRORS_SCHEMA],
//     });
//   });
//
//   beforeEach(async(() => {
//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(ListImageComponent);
//       comp = fixture.componentInstance;
//     });
//   }));
//
//   it('should enter the assertion', async () => {
//     expect(comp).toBeDefined();
//   });
//
//   describe('ngOnInit method', () => {
//     it('should update property icon', () => {
//       comp.config = Object.assign({}, config);
//       spyOn(comp, 'setClass');
//       comp.ngOnInit();
//       expect(comp.icon).toEqual(comp.config.values[config.value]);
//       expect(comp.setClass).toHaveBeenCalledWith(comp.config.value);
//     });
//
//     it('should update property icon with color', () => {
//       comp.config = Object.assign({}, config);
//       comp.config.color = {
//         male: 'success',
//       };
//       spyOn(comp, 'getColor');
//       comp.ngOnInit();
//       expect(comp.icon).toEqual(comp.config.values[config.value]);
//       expect(comp.getColor).toHaveBeenCalledWith(comp.config.value);
//     });
//
//     it('should update src property', () => {
//       comp.config = Object.assign({}, config);
//       comp.config.type = 'picture';
//       comp.config.value = <any>{
//         thumb: 'image.jpg',
//       };
//       comp.ngOnInit();
//       expect(comp.src).toEqual(comp.config.value.thumb);
//     });
//
//     it('should set default image', () => {
//       comp.config = Object.assign({}, config);
//       comp.config.type = 'picture';
//       comp.config.default = 'logo.png';
//       comp.config.value = <any>{
//         thumb: null,
//       };
//       let defaultSrc = 'ecore/media/logo.png';
//       comp.ngOnInit();
//       expect(comp.src).toEqual(defaultSrc);
//     });
//   });
//
//   describe('getColor method', () => {
//     it('should update iconClass property', () => {
//       comp.config = Object.assign({}, config);
//       comp.config.color = {
//         true: 'danger',
//       };
//       const value = true;
//       comp.getColor(value);
//       expect(comp.iconClass).toEqual('text-danger');
//     });
//   });
//
//   describe('setClass method', () => {
//     it('should set class "text-success"', () => {
//       let value = true;
//       comp.setClass(value);
//       expect(comp.iconClass).toEqual('text-success');
//     });
//
//     it('should set class "text-danger"', () => {
//       let value = false;
//       comp.setClass(value);
//       expect(comp.iconClass).toEqual('text-danger');
//     });
//
//     it('should set class "text-muted"', () => {
//       let value = null;
//       comp.setClass(value);
//       expect(comp.iconClass).toEqual('text-muted');
//     });
//   });
// });
