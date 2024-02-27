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
// import { FilterSelectComponent } from './filter-select.component';
//
// import { Subject } from 'rxjs/Subject';
//
// describe('FilterSelectComponent', () => {
//   let fixture: ComponentFixture<FilterSelectComponent>;
//   let comp: FilterSelectComponent;
//   let el;
//   let config = {
//     type: 'select',
//     query: 'company__type',
//     options: [
//       {
//         value: '',
//         label: 'All',
//       },
//       {
//         value: 'master',
//         label: 'Master',
//       },
//       {
//         value: 'regular',
//         label: 'Regular',
//       },
//     ],
//     key: 'company.type',
//     label: 'Company type',
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
//       declarations: [FilterSelectComponent],
//       providers: [{ provide: FilterService, useValue: mockFilterValue }],
//       imports: [RouterTestingModule],
//       schemas: [NO_ERRORS_SCHEMA],
//     });
//   });
//
//   beforeEach(async(() => {
//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(FilterSelectComponent);
//       comp = fixture.componentInstance;
//       comp.filterSubscription = new Subject().subscribe();
//     });
//   }));
//
//   it('should enter the assertion', async () => {
//     comp.config = config;
//     fixture.detectChanges();
//     expect(comp.config).toBeDefined();
//   });
//
//   describe('ngOnInit method', () => {
//     it('should fill in filter', async(
//       inject([FilterService], (fs: FilterService) => {
//         comp.config = config;
//         queries = 'Master';
//         comp.ngOnInit();
//         expect(comp.data).toEqual('Master');
//         expect(comp.isCollapsed).toBeTruthy();
//       })
//     ));
//
//     it('should call parseQuery method', () => {
//       comp.config = config;
//       queries = {
//         byQuery: true,
//         query: 'company__type=Master',
//       };
//       spyOn(comp, 'parseQuery');
//       comp.ngOnInit();
//       expect(comp.parseQuery).toHaveBeenCalled();
//     });
//   });
//
//   describe('onChange method', () => {
//     it('should update query', async(
//       inject([FilterService], (fs: FilterService) => {
//         comp.config = config;
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
//     it('should generate query', async(
//       inject([FilterService], (fs: FilterService) => {
//         let data = 'Master';
//         let query = 'company';
//         let result = comp.genericQuery(query, data);
//         expect(result).toEqual(`${query}=${data}`);
//       })
//     ));
//   });
//
//   describe('changeQuery method', () => {
//     it('should emit event', () => {
//       comp.config = config;
//       spyOn(comp.event, 'emit');
//       comp.changeQuery();
//       expect(comp.event.emit).toHaveBeenCalled();
//     });
//   });
//
//   describe('parseQuery method', () => {
//     it('should fill in filter by Query', async(
//       inject([FilterService], (fs: FilterService) => {
//         comp.config = config;
//         let query = 'company__type=master';
//         comp.parseQuery(query);
//         expect(comp.query).toEqual(query);
//         expect(comp.data).toEqual('master');
//       })
//     ));
//   });
//
//   describe('resetFilter method', () => {
//     it('should reset query', async(
//       inject([FilterService], (fs: FilterService) => {
//         comp.config = config;
//         spyOn(fs, 'generateQuery');
//         spyOn(comp, 'changeQuery');
//         comp.resetFilter();
//         expect(comp.changeQuery).toHaveBeenCalled();
//         expect(fs.generateQuery).toHaveBeenCalled();
//         expect(comp.data).toEqual('');
//         expect(comp.query).toEqual('');
//       })
//     ));
//   });
// });
