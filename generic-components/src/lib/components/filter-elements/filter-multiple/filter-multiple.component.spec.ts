// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import {
//   TestBed,
//   async,
//   ComponentFixture,
//   inject,
// } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { FilterService } from './../../services/filter.service';
// import { RouterTestingModule } from '@angular/router/testing';
//
// import { FilterMultipleComponent } from './filter-multiple.component';
//
// import { Subject } from 'rxjs/Subject';
//
// describe('FilterMultipleComponent', () => {
//   let fixture: ComponentFixture<FilterMultipleComponent>;
//   let comp: FilterMultipleComponent;
//   let el;
//   let config = {
//     type: 'multiple',
//     key: 'date',
//     label: 'Shifts',
//     display: '__str__',
//     query: {
//       shifts: '{id}',
//     },
//   };
//   let queries;
//   let mockFilterValue = {
//     generateQuery() {
//       return true;
//     },
//     getQueries() {
//       return queries;
//     },
//   };
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [FilterMultipleComponent],
//       providers: [{ provide: FilterService, useValue: mockFilterValue }],
//       imports: [RouterTestingModule],
//       schemas: [NO_ERRORS_SCHEMA],
//     });
//   });
//
//   beforeEach(async(() => {
//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(FilterMultipleComponent);
//       comp = fixture.componentInstance;
//       comp.filterSubscription = new Subject().subscribe();
//     });
//   }));
//
//   it('should enter the assertion', () => {
//     comp.config = Object.assign({}, config);
//     fixture.detectChanges();
//     expect(comp.config).toBeDefined();
//   });
//
//   describe('ngOnInit method', () => {
//     it('should fill in filter', () => {
//       comp.config = Object.assign({}, config);
//       comp.ngOnInit();
//       expect(comp.theme).toBeDefined();
//       expect(comp.isCollapsed).toBeTruthy();
//     });
//
//     it('should generate data for filter', () => {
//       comp.config = Object.assign({}, config);
//       comp.config.data = [
//         {
//           __str__: 'Label',
//           id: '123',
//         },
//       ];
//       comp.ngOnInit();
//       expect(comp.data).toEqual([
//         {
//           label: comp.config.data[0][comp.config.display],
//           query: comp.config.query,
//           checked: true,
//           data: comp.config.data[0],
//         },
//       ]);
//     });
//   });
//
//   describe('onChange method', () => {
//     it('should update query', async(
//       inject([FilterService], (fs: FilterService) => {
//         comp.config = Object.assign({}, config);
//         spyOn(fs, 'generateQuery');
//         spyOn(comp, 'genericQuery');
//         spyOn(comp, 'changeQuery');
//         comp.onChange();
//         expect(comp.genericQuery).toHaveBeenCalled();
//         expect(fs.generateQuery).toHaveBeenCalled();
//         expect(comp.changeQuery).toHaveBeenCalled();
//       })
//     ));
//   });
//
//   describe('genericQuery method', () => {
//     it('should generate query', () => {
//       comp.config = Object.assign({}, config);
//       let data = [
//         {
//           id: '123',
//           checked: true,
//           query: comp.config.query,
//           data: {
//             id: '123',
//           },
//         },
//         {
//           id: '124',
//           checked: true,
//           query: comp.config.query,
//           data: {
//             id: '124',
//           },
//         },
//       ];
//       let query = {
//         shifts: '{id}',
//       };
//       let result = comp.genericQuery(query, data);
//       expect(comp.query).toBeDefined();
//       expect(result).toEqual(`shifts=123&shifts=124`);
//     });
//   });
//
//   describe('changeQuery method', () => {
//     it('should emit event', () => {
//       comp.config = Object.assign({}, config);
//       spyOn(comp.event, 'emit');
//       comp.changeQuery();
//       expect(comp.event.emit).toHaveBeenCalled();
//     });
//   });
//
//   describe('parseQuery method', () => {
//     it('should fill in filter by Query', () => {
//       comp.config = Object.assign({}, config);
//       comp.data = [
//         {
//           id: '123',
//           checked: false,
//           query: comp.config.query,
//           data: {
//             id: '123',
//           },
//         },
//         {
//           id: '124',
//           checked: true,
//           query: comp.config.query,
//           data: {
//             id: '124',
//           },
//         },
//       ];
//       let query = 'shifts=123&shifts=124';
//       comp.parseQuery(query);
//       expect(comp.query).toEqual(query);
//       expect(comp.data[0].checked).toBeTruthy;
//       expect(comp.data[1].checked).toBeTruthy;
//     });
//   });
//
//   describe('updateFilter method', () => {
//     it('should update filter by data', async(
//       inject([FilterService], (fs: FilterService) => {
//         comp.config = Object.assign({}, config);
//         spyOn(fs, 'getQueries').and.returnValue([]);
//         comp.updateFilter();
//         expect(fs.getQueries).toHaveBeenCalled();
//         expect(comp.query).toEqual('');
//         expect(comp.data).toEqual([]);
//       })
//     ));
//
//     it('should update filter by query', async(
//       inject([FilterService], (fs: FilterService) => {
//         comp.config = Object.assign({}, config);
//         spyOn(fs, 'getQueries').and.returnValue({ byQuery: true, query: '' });
//         spyOn(comp, 'parseQuery');
//         comp.updateFilter();
//         expect(fs.getQueries).toHaveBeenCalled();
//         expect(comp.parseQuery).toHaveBeenCalledWith('');
//         expect(comp.query).toEqual('');
//       })
//     ));
//   });
// });
