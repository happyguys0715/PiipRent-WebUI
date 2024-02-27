// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import {
//   TestBed,
//   async,
//   ComponentFixture,
//   inject,
// } from '@angular/core/testing';
// import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
//
// import { FormReplaceComponent } from './form-replace.component';
// import { Observable } from 'rxjs/Observable';
// import { GenericFormService } from '../../services/generic-form.service';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { lang } from 'moment';
//
// describe('FormReplaceComponent', () => {
//   let fixture: ComponentFixture<FormReplaceComponent>;
//   let comp: FormReplaceComponent;
//   let el;
//   const data = {
//     company: {
//       skill: {
//         hourly_rate: 25,
//         actions: {
//           create: true,
//           text: true,
//           edit: true,
//         },
//       },
//       id: '123',
//       __str__: 'General Construction Labourer $24.46/h',
//     },
//   };
//   const config = {
//     type: 'replace',
//     key: 'test',
//     templateOptions: {
//       label: 'Hourle rate',
//     },
//     replace_by: [
//       { create: 'company.skill.actions.create' },
//       { text: 'company.skill.actions.text' },
//       { change: 'company.skill.actions.edit' },
//     ],
//     elements: {
//       create: {
//         type: 'button',
//         endpoint: '/{company.id}/hourly_rate/',
//         query: 'rate={company.skill.hourly_rate}',
//         id: '{company.id}',
//         templateOptions: {
//           text: 'Set hourly rate',
//           p: true,
//           small: true,
//         },
//       },
//       text: {
//         type: 'static',
//         key: 'company.__str__',
//         read_only: true,
//         templateOptions: {
//           label: 'Hourly rate',
//         },
//       },
//       change: {
//         value: 'Change rate',
//         type: 'link',
//         endpoint: '/',
//       },
//     },
//     data: new BehaviorSubject(data),
//   };
//   let errors = {};
//   const response = <any>{};
//
//   const mockGenericFormservice = {
//     getAll() {
//       if (response.status === 'success') {
//         return Observable.of(response.data);
//       } else {
//         return Observable.throw(response.error);
//       }
//     },
//     getByQuery() {
//       if (response.status === 'success') {
//         return Observable.of(response.data);
//       } else {
//         return Observable.throw(response.error);
//       }
//     },
//     delete() {
//       if (response.status === 'success') {
//         return Observable.of(response.data);
//       } else {
//         return Observable.throw(response.error);
//       }
//     },
//   };
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [FormReplaceComponent],
//       providers: [
//         FormBuilder,
//         { provide: GenericFormService, useValue: mockGenericFormservice },
//       ],
//       imports: [ReactiveFormsModule, NgbModule.forRoot()],
//       schemas: [NO_ERRORS_SCHEMA],
//     });
//   });
//
//   beforeEach(async(() => {
//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(FormReplaceComponent);
//       comp = fixture.componentInstance;
//     });
//   }));
//
//   describe('ngOnInit method', () => {
//     it('should init propeties', async(
//       inject([FormBuilder], (fb: FormBuilder) => {
//         comp.config = Object.assign(config);
//         comp.group = fb.group({});
//         comp.key = comp.config.key;
//         comp.group.addControl(comp.key, fb.control(''));
//         spyOn(comp, 'addControl');
//         spyOn(comp, 'generateMetadata');
//         comp.ngOnInit();
//         expect(comp.metadata).toEqual([]);
//         expect(comp.selfGroup).toBeDefined();
//         expect(comp.modalData).toEqual({});
//         expect(comp.addControl).toHaveBeenCalledWith(comp.config, fb);
//         expect(comp.generateMetadata).toHaveBeenCalledWith(
//           comp.config.replace_by,
//           data
//         );
//       })
//     ));
//   });
//
//   describe('ngOnDestroy method', () => {
//     it('should close modal', () => {
//       comp.modalRef = {
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
//   describe('generateMetadata method', () => {
//     it('should generate metedata by some rules', () => {
//       comp.config = Object.assign(config);
//       comp.metadata = [];
//       spyOn(comp, 'getValueByKey').and.returnValue('mockValue');
//       comp.generateMetadata(comp.config.replace_by, data);
//       expect(comp.metadata).toEqual([
//         {
//           type: 'button',
//           endpoint: '/123/hourly_rate/',
//           query: 'rate=25',
//           id: '123',
//           templateOptions: {
//             text: 'Set hourly rate',
//             p: true,
//             small: true,
//           },
//         },
//         {
//           type: 'static',
//           key: 'company.__str__',
//           read_only: true,
//           templateOptions: {
//             label: 'Hourly rate',
//           },
//           value: 'mockValue',
//         },
//         {
//           value: 'Change rate',
//           type: 'link',
//           endpoint: '/',
//         },
//       ]);
//     });
//   });
//
//   describe('getValueByKey method', () => {
//     it('should return value by key', () => {
//       const apiData = {
//         address: {
//           city: 'Sydney',
//         },
//       };
//       const key = 'address.city';
//       const value = comp.getValueByKey(key, apiData);
//       expect(value).toEqual(apiData.address.city);
//     });
//   });
//
//   describe('eventHandler method', () => {
//     it('should call add action', () => {
//       const event = {
//         endpoint: 'some endpoint',
//         query: 'some query',
//         target: 'form',
//         action: 'add',
//         el: {},
//       };
//       spyOn(comp, 'addAction');
//       comp.eventHandler(event);
//       expect(comp.addAction).toHaveBeenCalledWith(
//         event.endpoint,
//         event.query,
//         event.el
//       );
//     });
//
//     it('should call edit method', () => {
//       const event = {
//         type: 'click',
//         action: 'edit',
//         el: {
//           endpoint: 'some endpoint',
//           query: 'some query',
//         },
//       };
//       spyOn(comp, 'editAction');
//       comp.eventHandler(event);
//       expect(comp.editAction).toHaveBeenCalledWith(
//         event.el.endpoint,
//         event.el.query,
//         event.el
//       );
//     });
//   });
//
//   describe('addAction method', () => {
//     it('should open modal window', () => {
//       const endpoint = 'some endpoint';
//       const query = 'some query';
//       const element = {};
//       comp.addAction(endpoint, query, element);
//       expect(comp.modalData).toEqual({
//         endpoint: endpoint + '?' + query,
//         el: element,
//       });
//       expect(comp.modalRef).toBeDefined();
//     });
//   });
//
//   describe('sendAction method', () => {
//     it('should send some request', () => {
//       const endpoint = 'some endpoint';
//       const query = 'some query';
//       response.status = 'success';
//       spyOn(comp, 'updateReplace');
//       comp.sendAction(endpoint, query);
//       expect(comp.updateReplace).toHaveBeenCalled();
//     });
//   });
//
//   describe('editAction method', () => {
//     it('should open modal window for edit some object', () => {
//       const endpoint = 'some endpoint';
//       const query = 'some query';
//       const element = {
//         id: '123',
//       };
//       comp.editAction(endpoint, query, element);
//       expect(comp.modalData).toEqual({
//         endpoint,
//         id: element.id,
//         el: element,
//       });
//       expect(comp.modalRef).toBeDefined();
//     });
//   });
//
//   describe('deleteAction method', () => {
//     it('should open modal window for delete some object', () => {
//       const endpoint = 'some endpoint';
//       const query = 'some query';
//       const element = {
//         id: '123',
//       };
//       comp.deleteAction(endpoint, query, element);
//       expect(comp.modalData).toEqual({
//         type: 'delete',
//         endpoint,
//         id: element.id,
//         el: element,
//       });
//       expect(comp.modalRef).toBeDefined();
//     });
//   });
//
//   describe('deleteElement method', () => {
//     it('should close modal and delete some object', () => {
//       const testObject = {
//         closeModal() {
//           return true;
//         },
//       };
//       comp.modalData = {
//         endpoint: 'some endpoint',
//         id: '123',
//       };
//       response.status = 'success';
//       spyOn(testObject, 'closeModal');
//       spyOn(comp, 'updateReplace');
//       comp.deleteElement(testObject.closeModal);
//       expect(testObject.closeModal).toHaveBeenCalled();
//       expect(comp.updateReplace).toHaveBeenCalled();
//     });
//   });
//
//   describe('formEvent method', () => {
//     it('should update replace elenent after close modal', () => {
//       const event = {
//         type: 'sendForm',
//         status: 'success',
//       };
//       const testObject = {
//         closeModal() {
//           return true;
//         },
//       };
//       const element = {};
//       spyOn(comp, 'updateReplace');
//       spyOn(testObject, 'closeModal');
//       comp.formEvent(event, testObject.closeModal, element);
//       expect(comp.updateReplace).toHaveBeenCalled();
//       expect(testObject.closeModal).toHaveBeenCalled();
//     });
//   });
//
//   describe('updateReplace method', () => {
//     it('should emit event for update replace element', () => {
//       comp.config = Object.assign(config);
//       spyOn(comp.event, 'emit');
//       comp.updateReplace();
//       expect(comp.event.emit).toHaveBeenCalledWith({
//         type: 'updateData',
//         el: comp.config,
//       });
//     });
//   });
// });
