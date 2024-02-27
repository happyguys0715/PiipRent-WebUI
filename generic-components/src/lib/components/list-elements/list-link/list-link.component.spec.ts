// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import {
//   TestBed,
//   async,
//   ComponentFixture,
//   inject,
// } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { ListLinkComponent } from './list-link.component';
//
// describe('ListLinkComponent', () => {
//   let fixture: ComponentFixture<ListLinkComponent>;
//   let comp: ListLinkComponent;
//   let el;
//   let config = {
//     href: 'phone',
//     name: 'phone_mobile',
//     type: 'link',
//     endpoint: '/skills/skills/123/change',
//     id: 'some id',
//   };
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [ListLinkComponent],
//       providers: [],
//       imports: [],
//       schemas: [NO_ERRORS_SCHEMA],
//     });
//   });
//
//   beforeEach(async(() => {
//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(ListLinkComponent);
//       comp = fixture.componentInstance;
//     });
//   }));
//
//   describe('ngOnInit method', () => {
//     it('should update value by string', () => {
//       comp.config = Object.assign({}, config);
//       comp.config.value = 'test@test.com';
//       comp.config.link = 'mailto:test@test.com';
//       spyOn(comp, 'isEmail').and.returnValue(false);
//       spyOn(comp, 'isPhone').and.returnValue(false);
//       comp.ngOnInit();
//       expect(comp.value).toEqual(comp.config.value);
//       expect(comp.href).toEqual(comp.config.link);
//       expect(comp.link).toBeTruthy();
//     });
//
//     it('should update value by object', () => {
//       comp.config = Object.assign({}, config);
//       comp.config.value = {
//         __str__: 'Value',
//       };
//       comp.config.text = 'Text';
//       comp.config.link = 'link';
//       spyOn(comp, 'isEmail').and.returnValue(true);
//       spyOn(comp, 'isPhone').and.returnValue(false);
//       comp.ngOnInit();
//       expect(comp.value).toEqual('Text');
//       expect(comp.href).toEqual('link');
//     });
//
//     it('should update link property if value is array ', () => {
//       comp.config = Object.assign({}, config);
//       comp.config.value = ['test@test.com'];
//       comp.config.link = ['mailto:test@test.com'];
//       spyOn(comp, 'isEmail').and.returnValue(true);
//       spyOn(comp, 'isPhone').and.returnValue(false);
//       comp.ngOnInit();
//       expect(comp.value).toEqual(comp.config.value);
//       expect(comp.href).toEqual(comp.config.link);
//       expect(comp.link).toBeFalsy();
//     });
//   });
//
//   describe('isEmail method', () => {
//     it('should parse email', async(() => {
//       let email = 'test@test.com';
//       expect(comp.isEmail(email)).toBeTruthy();
//       email = 'asdasdasdas';
//       expect(comp.isEmail(email)).toBeFalsy();
//     }));
//   });
//
//   describe('isPhone method', () => {
//     it('should parse phone number', async(() => {
//       let phone = '+380978107785';
//       expect(comp.isPhone(phone)).toBeTruthy();
//       phone = 'asdasdasdas';
//       expect(comp.isPhone(phone)).toBeFalsy();
//     }));
//   });
//
//   describe('action method', () => {
//     it('should emit event', () => {
//       comp.config = Object.assign({}, config);
//       comp.value = 'some value';
//       let event = {
//         preventDefault() {
//           return true;
//         },
//         stopPropagation() {
//           return true;
//         },
//         target: {
//           innerText: 'Link',
//         },
//       };
//       spyOn(comp.event, 'emit');
//       comp.action(event);
//       expect(comp.event.emit).toHaveBeenCalled();
//     });
//
//     it('should emit buttonAction', () => {
//       comp.config = Object.assign(
//         {
//           action: 'editForm',
//         },
//         config
//       );
//       comp.value = 'some value';
//       let event = {
//         preventDefault() {
//           return true;
//         },
//         stopPropagation() {
//           return true;
//         },
//       };
//       spyOn(comp.buttonAction, 'emit');
//       comp.action(event);
//       expect(comp.buttonAction.emit).toHaveBeenCalled();
//     });
//   });
//
//   describe('eventHandler method', () => {
//     it('should emit event', () => {
//       comp.config = config;
//       let event = {};
//       spyOn(comp.event, 'emit');
//       comp.eventHandler(event);
//       expect(comp.event.emit).toHaveBeenCalled();
//     });
//   });
//
//   describe('buttonHandler method', () => {
//     it('should emit buttonAction', () => {
//       comp.config = config;
//       let event = {};
//       spyOn(comp.buttonAction, 'emit');
//       comp.buttonHandler(event);
//       expect(comp.buttonAction.emit).toHaveBeenCalled();
//     });
//   });
// });
