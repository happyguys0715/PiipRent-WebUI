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
// import { FilterChoiceComponent } from './filter-choice.component';
//
// describe('FilterChoiceComponent', () => {
//   let fixture: ComponentFixture<FilterChoiceComponent>;
//   let comp: FilterChoiceComponent;
//   let el;
//   let config = {
//     type: 'choice',
//     key: 'key of filter',
//     label: 'Choice of list',a
//     query: 'company',
//     list: [
//       {
//         label: 'Text of choice',
//         value: 'Home',
//       },
//       {
//         label: 'Text of another choice',
//         value: 'Homes',
//       },
//     ],
//   };
//   let queries;
//   let mockFilterService = {
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
//       declarations: [FilterChoiceComponent],
//       providers: [{ provide: FilterService, useValue: mockFilterService }],
//       imports: [RouterTestingModule],
//       schemas: [NO_ERRORS_SCHEMA],
//     });
//   });
//
//   beforeEach(async(() => {
//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(FilterChoiceComponent);
//       comp = fixture.componentInstance;
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
//     it('should update query', async(() => {
//       comp.config = config;
//       queries = 'Home';
//       comp.ngOnInit();
//       expect(comp.query).toEqual(queries);
//     }));
//
//     it('should update query from URL', async(() => {
//       comp.config = config;
//       queries = {
//         byQuery: true,
//         query: 'companty=Home',
//       };
//       comp.ngOnInit();
//       expect(comp.query).toEqual('Home');
//       expect(comp.isCollapsed).toBeFalsy();
//     }));
//   });
//
//   describe('select method', () => {
//     it('should set new query', async(() => {
//       comp.config = config;
//       let value = 'company=Home';
//       comp.select(value);
//       expect(comp.query).toEqual(value);
//     }));
//
//     it('should unset query', async(() => {
//       comp.config = config;
//       let value = 'company=Home';
//       comp.query = value;
//       comp.select(value);
//       expect(comp.query).toBeNull();
//     }));
//
//     it('should be called generateQuery method', async(
//       inject([FilterService], (fs: FilterService) => {
//         comp.config = config;
//         spyOn(fs, 'generateQuery');
//         let value = 'company=Home';
//         comp.query = value;
//         comp.select(value);
//         expect(fs.generateQuery).toHaveBeenCalled();
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
//   describe('resetFilter method', () => {
//     it('should reset query', async(
//       inject([FilterService], (fs: FilterService) => {
//         comp.config = config;
//         spyOn(fs, 'generateQuery');
//         spyOn(comp, 'changeQuery');
//         comp.resetFilter();
//         expect(comp.changeQuery).toHaveBeenCalled();
//         expect(fs.generateQuery).toHaveBeenCalled();
//         expect(comp.query).toBeNull();
//       })
//     ));
//   });
// });
