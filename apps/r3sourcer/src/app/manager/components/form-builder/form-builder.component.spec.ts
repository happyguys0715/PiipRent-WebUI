// import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
// import {
//   ComponentFixture,
//   TestBed,
//   inject,
//   async } from '@angular/core/testing';
// import { Router } from '@angular/router';

// import { FormBuilderComponent } from './form-builder.component';
// import { GenericFormService } from './../../dynamic-form/services/generic-form.service';

// import { Observable } from 'rxjs/Observable';

// describe('FormBuilderComponent', () => {

//   let comp: FormBuilderComponent;
//   let fixture: ComponentFixture<FormBuilderComponent>;
//   let response: any = {};

//   let mockGenericFormService = {
//     delete() {
//       if (response.status === 'success') {
//         return Observable.of(response);
//       } else {
//         return Observable.throw(response);
//       }
//     }
//   };
//   let mockRouter = {
//     navigate() {
//       return true;
//     }
//   };

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [FormBuilderComponent],
//       providers: [
//         { provide: Router, useValue: mockRouter },
//         { provide: GenericFormService, useValue: mockGenericFormService }
//       ],
//       schemas: [ NO_ERRORS_SCHEMA ]
//     })
//     .compileComponents()
//       .then(() => {
//         fixture = TestBed.createComponent(FormBuilderComponent);
//         comp = fixture.componentInstance;
//       });
//   }));

//   it('should be defined', () => {
//     expect(comp).toBeDefined();
//   });

//   describe('eventHandler method', () => {
//     it('should set data of form', () => {
//       let event = {
//         type: 'sendForm',
//         status: 'success',
//         data: {
//           id: 'some id',
//           __str__: 'some str',
//           groups: [],
//           model_fields: [],
//           company_links: [
//             {
//               company: 'LabourKing',
//               url: '/ecore/form-builders/'
//             }
//           ]
//         }
//       };
//       spyOn(comp.str, 'emit');
//       comp.eventHandler(event);
//       expect(comp.id).toEqual('some id');
//       expect(comp.label).toEqual('some str');
//       expect(comp.links).toEqual(event.data.company_links);
//       expect(comp.data).toEqual({
//         groups: {
//           action: 'add',
//           data: {
//             fields: event.data.model_fields
//           }
//         },
//         id: {
//           action: 'add',
//           data: {
//             value: event.data.id
//           }
//         }
//       });
//       expect(comp.str.emit).toHaveBeenCalledWith({
//         str: event.data.__str__
//       });
//     });

//     it('should redirect after save form',
//       async(inject([Router], (router: Router) => {
//         const event = {
//           type: 'sendForm',
//           status: 'success',
//           data: {}
//         };
//         comp.id = '123';
//         spyOn(router, 'navigate');
//         comp.eventHandler(event);
//         expect(router.navigate).toHaveBeenCalled();
//     })));
//   });

//   describe('eventForm method', () => {
//     it('should set data of form', () => {
//       let event = {
//         data: {
//           id: 'some id',
//           __str__: 'some str',
//           groups: [],
//           model_fields: [],
//           company_links: [
//             {
//               company: 'LabourKing',
//               url: '/ecore/form-builders/'
//             }
//           ]
//         }
//       };
//       spyOn(comp.str, 'emit');
//       comp.eventForm(event);
//       expect(comp.label).toEqual('some str');
//       expect(comp.links).toEqual(event.data.company_links);
//       expect(comp.data).toEqual({
//         groups: {
//           action: 'add',
//           data: {
//             fields: event.data.model_fields,
//             id: event.data.id
//           }
//         }
//       });
//       expect(comp.str.emit).toHaveBeenCalledWith({
//         str: event.data.__str__
//       });
//     });

//     it('should set str property', () => {
//       let event = {
//         str: 'Title'
//       };
//       spyOn(comp.str, 'emit');
//       comp.eventForm(event);
//       expect(comp.str.emit).toHaveBeenCalledWith({
//         str: event.str
//       });
//     });
//   });

//   describe('delete method', () => {
//     it('should delete form', async(inject([Router], (router: Router) => {
//       comp.path = '/';
//       comp.endpoint = 'some endpoint';
//       comp.id = '123';
//       response.status = 'success';
//       spyOn(router, 'navigate');
//       comp.delete();
//       expect(router.navigate).toHaveBeenCalledWith([comp.path]);
//     })));

//     it('should update error property', () => {
//       comp.endpoint = 'some endpoint';
//       comp.id = '123';
//       response.status = 'error';
//       comp.delete();
//       expect(comp.error).toEqual(response);
//     });
//   });

// });
