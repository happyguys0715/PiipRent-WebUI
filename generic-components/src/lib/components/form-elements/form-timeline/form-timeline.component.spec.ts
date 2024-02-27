// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import {
//   TestBed,
//   async,
//   ComponentFixture,
//   inject,
// } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { FormTimelineComponent } from './form-timeline.component';
// import { FormsModule } from '@angular/forms';
//
//
// import { FormatString } from '../../../helpers/format';
//
// describe('FormTimelineComponent', () => {
//   let fixture: ComponentFixture<FormTimelineComponent>;
//   let comp: FormTimelineComponent;
//   let el;
//   let config = {
//     type: 'timeline',
//     endpoint: '/core/workflownodes/timeline',
//     query: {
//       model: 'endless_core.companyrel',
//       object_id: '{id}',
//     },
//   };
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [FormTimelineComponent],
//       providers: [],
//       imports: [FormsModule, NgbModule.forRoot()],
//       schemas: [NO_ERRORS_SCHEMA],
//     });
//   });
//
//   beforeEach(async(() => {
//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(FormTimelineComponent);
//       comp = fixture.componentInstance;
//     });
//   }));
//
//   describe('ngOnInit method', () => {
//     it('should initialize properties', () => {
//       comp.config = Object.assign(config);
//       spyOn(comp, 'initialize');
//       comp.ngOnInit();
//       expect(comp.query).toEqual([]);
//       expect(comp.objectEndpoint).toEqual('/core/workflowobjects/');
//       expect(comp.initialize).toHaveBeenCalled();
//     });
//   });
//
//   describe('initialize method', () => {
//     it('should initialize properties', () => {
//       comp.config = config;
//       comp.config.value = {
//         id: '123',
//       };
//       comp.query = [];
//       let formatString = new FormatString();
//       let value = formatString.format(
//         comp.config.query['object_id'],
//         comp.config.value
//       );
//       spyOn(comp, 'getTimeline');
//       comp.ngOnInit();
//       expect(comp.query).toEqual([
//         'model=endless_core.companyrel',
//         'object_id=123',
//       ]);
//       expect(comp.objectId).toEqual(value);
//       expect(comp.getTimeline).toHaveBeenCalled();
//     });
//   });
//
//   describe('ngOnDestroy method', () => {
//     it('should close modal window', () => {
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
//   describe('open method', () => {
//     it('should open modal window for allowed states', () => {
//       let state = {
//         id: 123,
//         name_before_activation: 'Cancel/Fail',
//         name_after_activation: 'Sales Failed',
//         state: 1,
//         requirements: [],
//         wf_object_id: 124,
//       };
//       comp.modalData = {};
//       comp.stateModal = {};
//       spyOn(comp.modalService, 'open');
//       spyOn(comp, 'setDataForState');
//       comp.open(state);
//       expect(comp.modalData.title).toEqual(state.name_before_activation);
//       expect(comp.modalService.open).toHaveBeenCalledWith(comp.stateModal, {
//         size: 'lg',
//       });
//       expect(comp.setDataForState).toHaveBeenCalledWith(state);
//     });
//
//     it('should open modal window for active states if name_after_activation is defined', () => {
//       let state = {
//         id: 123,
//         name_before_activation: 'Cancel/Fail',
//         name_after_activation: 'Sales Failed',
//         state: 2,
//         requirements: [],
//         wf_object_id: 124,
//       };
//       comp.modalData = {};
//       comp.stateModal = {};
//       spyOn(comp.modalService, 'open');
//       spyOn(comp, 'setDataForState');
//       comp.open(state);
//       expect(comp.modalData.id).toEqual(124);
//       expect(comp.modalData.title).toEqual(state.name_after_activation);
//       expect(comp.modalService.open).toHaveBeenCalledWith(comp.stateModal, {
//         size: 'lg',
//       });
//       expect(comp.setDataForState).toHaveBeenCalledWith(state);
//     });
//
//     it('should open modal window for active states', () => {
//       let state = {
//         id: 123,
//         name_before_activation: 'Cancel/Fail',
//         name_after_activation: '',
//         state: 2,
//         requirements: [],
//         wf_object_id: 124,
//       };
//       comp.modalData = {};
//       comp.stateModal = {};
//       spyOn(comp.modalService, 'open');
//       spyOn(comp, 'setDataForState');
//       comp.open(state);
//       expect(comp.modalData.id).toEqual(124);
//       expect(comp.modalData.title).toEqual(state.name_before_activation);
//       expect(comp.modalService.open).toHaveBeenCalledWith(comp.stateModal, {
//         size: 'lg',
//       });
//       expect(comp.setDataForState).toHaveBeenCalledWith(state);
//     });
//   });
//
//   describe('getTimeline method', () => {
//     it('should emit event for get a timeline data', () => {
//       comp.config = config;
//       let formatString = new FormatString();
//       comp.query = ['model=endless_core.companyrel', 'object_id=123'];
//       spyOn(comp.event, 'emit');
//       comp.getTimeline();
//       expect(comp.event.emit).toHaveBeenCalledWith({
//         type: 'update',
//         el: comp.config,
//         query: `?model=endless_core.companyrel&object_id=123`,
//       });
//     });
//   });
//
//   describe('setDataForState method', () => {
//     it('should set data for chosen state', () => {
//       comp.config = config;
//       comp.objectId = '123';
//       let state = {
//         id: 123,
//         name_before_activation: 'Cancel/Fail',
//         name_after_activation: '',
//         state: 2,
//         requirements: [],
//         wf_object_id: 124,
//       };
//       let value = <any>{
//         object_id: {
//           action: 'add',
//           data: {
//             read_only: true,
//             value: '123',
//             readonly: true,
//             editForm: true,
//           },
//         },
//         state: {
//           action: 'add',
//           data: {
//             read_only: true,
//             value: state.id,
//             readonly: true,
//             editForm: true,
//           },
//         },
//         active: {
//           action: 'add',
//           data: {
//             read_only: false,
//             value: true,
//             readonly: true,
//             editForm: true,
//           },
//         },
//       };
//       let result = comp.setDataForState(state);
//       expect(result).toEqual(value);
//     });
//   });
//
//   describe('sendEventHandler method', () => {
//     it('should update timeline', () => {
//       comp.config = config;
//       comp.modalData = {};
//       let test = {
//         closeModal() {
//           return true;
//         },
//       };
//       let event = {
//         status: 'success',
//       };
//       spyOn(test, 'closeModal');
//       spyOn(comp, 'getTimeline');
//       comp.sendEventHandler(event, test.closeModal);
//       expect(test.closeModal).toHaveBeenCalled();
//       expect(comp.getTimeline).toHaveBeenCalled();
//       expect(comp.modalData).toBeNull();
//     });
//   });
// });
