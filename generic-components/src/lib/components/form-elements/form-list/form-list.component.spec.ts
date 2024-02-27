// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import {
//   TestBed,
//   async,
//   ComponentFixture,
//   inject,
// } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { FormListComponent } from './form-list.component';
// import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
// import { Router } from '@angular/router';
//
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { CheckPermissionService } from '../../../shared/services/check-permission';
// import { GenericFormService } from '../../services/generic-form.service';
//
// describe('FormListComponent', () => {
//   let fixture: ComponentFixture<FormListComponent>;
//   let comp: FormListComponent;
//   let el;
//   let config = {
//     type: 'list',
//     endpoint: '/core/contacts/',
//     query: {
//       contact: '25',
//     },
//     collapsed: true,
//     prefilled: {
//       contact: '25',
//       name: 'Tom',
//     },
//     templateOptions: {
//       label: 'Company',
//       add_label: 'Add Contact',
//     },
//   };
//   let errors = {};
//
//   const mockCheckPermissionService = {
//     getAllowMethods() {
//       return true;
//     },
//   };
//
//   const mockGenericFormService = {
//     getByQuery() {
//       return true;
//     },
//   };
//
//   const mockRouter = {
//     url: '/',
//     navigateByUrl() {
//       return true;
//     },
//   };
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [FormListComponent],
//       providers: [
//         FormBuilder,
//         { provide: Router, useValue: mockRouter },
//         { provide: GenericFormService, useValue: mockGenericFormService },
//         {
//           provide: CheckPermissionService,
//           useValue: mockCheckPermissionService,
//         },
//       ],
//       imports: [ReactiveFormsModule, NgbModule.forRoot()],
//       schemas: [NO_ERRORS_SCHEMA],
//     });
//   });
//
//   beforeEach(async(() => {
//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(FormListComponent);
//       comp = fixture.componentInstance;
//     });
//   }));
//
//   it('should enter the assertion', () => {
//     expect(comp).toBeDefined();
//   });
//
//   describe('ngOnInit method', () => {
//     it('should call initialize method', () => {
//       comp.config = Object.assign(config);
//       spyOn(comp, 'initialize');
//       comp.ngOnInit();
//       expect(comp.initialize).toHaveBeenCalled();
//     });
//   });
//
//   describe('initialize method', () => {
//     it('should init properties', () => {
//       comp.config = Object.assign(config);
//       comp.ngOnInit();
//       expect(comp.isCollapsed).toBeTruthy();
//     });
//
//     it('should set false for isCollapsed', () => {
//       comp.config = Object.assign(config);
//       comp.config.collapsed = undefined;
//       comp.ngOnInit();
//       expect(comp.isCollapsed).toBeFalsy();
//     });
//   });
//
//   describe('ngOnDestroy method', () => {
//     it('should close open modal', () => {
//       comp.modalRef = <any>{
//         close() {
//           return true;
//         },
//       };
//       spyOn(comp.modalRef, 'close');
//       comp.ngOnDestroy();
//       expect(comp.modalRef.close).toHaveBeenCalled();
//     });
//   });
//
//   describe('addObject method', () => {
//     it('should open modal window for add new object', () => {
//       comp.config = Object.assign(config);
//       comp.addObject();
//       expect(comp.modalData).toEqual({
//         endpoint: comp.config.endpoint,
//         title: 'Add Contact',
//         data: {
//           contact: {
//             action: 'add',
//             data: {
//               value: '25',
//               read_only: true,
//               editForm: true,
//               hide: undefined,
//             },
//           },
//           name: {
//             action: 'add',
//             data: {
//               value: 'Tom',
//               read_only: true,
//               editForm: true,
//               hide: undefined,
//             },
//           },
//         },
//       });
//       expect(comp.modalRef).toBeDefined();
//     });
//   });
//
//   describe('formEvent method', () => {
//     it('should update close modal after save', () => {
//       const testObject = {
//         closeModal() {
//           return true;
//         },
//       };
//       const event = {
//         type: 'sendForm',
//         status: 'success',
//       };
//       spyOn(testObject, 'closeModal');
//       spyOn(comp, 'updateList');
//       comp.formEvent(event, testObject.closeModal);
//       expect(testObject.closeModal).toHaveBeenCalled();
//       expect(comp.updateList).toHaveBeenCalled();
//     });
//   });
//
//   describe('updateList method', () => {
//     it('should emit update event for list', () => {
//       comp.update = new BehaviorSubject(false);
//       comp.config = Object.assign({}, config);
//       spyOn(comp.update, 'next');
//       comp.updateList(null);
//       expect(comp.update.next).toHaveBeenCalledWith(true);
//     });
//   });
//
//   describe('checkCount method', () => {
//     it('update showButton property', () => {
//       comp.config = Object.assign({}, config);
//       comp.config.max = 2;
//       let event = 4;
//       comp.checkCount(event);
//       expect(comp.showButton).toBeFalsy();
//     });
//   });
// });
