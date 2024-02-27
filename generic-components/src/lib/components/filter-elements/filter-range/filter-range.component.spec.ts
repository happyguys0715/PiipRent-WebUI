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
// import { FilterRangeComponent } from './filter-range.component';
//
// import { Subject } from 'rxjs/Subject';
//
// describe('FilterRangeComponent', () => {
//   let fixture: ComponentFixture<FilterRangeComponent>;
//   let comp: FilterRangeComponent;
//   let el;
//   let config = {
//     default: 50,
//     key: 'distance_to_jobsite',
//     label: 'Distance',
//     max: 200,
//     min: 0,
//     type: 'text',
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
//       declarations: [FilterRangeComponent],
//       providers: [{ provide: FilterService, useValue: mockFilterValue }],
//       imports: [RouterTestingModule],
//       schemas: [NO_ERRORS_SCHEMA],
//     });
//   });
//
//   beforeEach(async(() => {
//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(FilterRangeComponent);
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
//     it('should fill in filter', async(
//       inject([FilterService], (fs: FilterService) => {
//         comp.config = Object.assign({}, config);
//         spyOn(fs, 'generateQuery');
//         comp.ngOnInit();
//         expect(comp.theme).toBeDefined();
//         expect(comp.isCollapsed).toBeTruthy();
//         expect(comp.data).toEqual(50);
//         expect(fs.generateQuery).toHaveBeenCalled();
//       })
//     ));
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
//       let data = 50;
//       let query = 'range';
//       let result = comp.genericQuery(query, data);
//       expect(comp.query).toBeDefined();
//       expect(result).toEqual(`range=50`);
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
//       let query = 'range=50';
//       comp.parseQuery(query);
//       expect(comp.query).toEqual(query);
//       expect(comp.data).toEqual('50');
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
//
//   describe('resetFilter method', () => {
//     it('should reset filter', async(
//       inject([FilterService], (fs: FilterService) => {
//         comp.config = Object.assign({}, config);
//         spyOn(fs, 'generateQuery');
//         spyOn(comp, 'changeQuery');
//         comp.resetFilter();
//         expect(comp.data).toEqual('');
//         expect(comp.query).toEqual('');
//         expect(fs.generateQuery).toHaveBeenCalled();
//         expect(comp.changeQuery).toHaveBeenCalled();
//       })
//     ));
//   });
// });
