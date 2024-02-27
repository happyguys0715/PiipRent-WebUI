// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import {
//   TestBed,
//   async,
//   ComponentFixture,
//   inject,
//   fakeAsync,
//   tick,
// } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { FilterService } from './../../services/filter.service';
// import { RouterTestingModule } from '@angular/router/testing';
//
// import { GenericFormService } from './../../services/generic-form.service';
// import { FilterRelatedComponent } from './filter-related.component';
//
// import { Observable } from 'rxjs/Observable';
//
// import { Subject } from 'rxjs/Subject';
//
// describe('FilterRelatedComponent', () => {
//   let fixture: ComponentFixture<FilterRelatedComponent>;
//   let comp: FilterRelatedComponent;
//   let el;
//   let config = {
//     type: 'related',
//     key: 'key of filter',
//     label: 'Company',
//     listName: 'copmany',
//     data: {
//       endpoint: '',
//       key: 'id',
//       value: 'name',
//     },
//     query: 'company',
//     param: 'id',
//     many: true,
//     options: [],
//   };
//   let queries;
//   let response;
//   let mockFilterValue = {
//     generateQuery() {
//       return true;
//     },
//     getQueries() {
//       return queries;
//     },
//   };
//
//   const mockGenericFormService = {
//     getByQuery() {
//       return Observable.of(response);
//     },
//     getAll() {
//       return Observable.of(response);
//     },
//   };
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [FilterRelatedComponent],
//       providers: [
//         { provide: FilterService, useValue: mockFilterValue },
//         { provide: GenericFormService, useValue: mockGenericFormService },
//       ],
//       imports: [RouterTestingModule],
//       schemas: [NO_ERRORS_SCHEMA],
//     });
//   });
//
//   beforeEach(async(() => {
//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(FilterRelatedComponent);
//       comp = fixture.componentInstance;
//       comp.filterSubscription = new Subject().subscribe();
//     });
//   }));
//
//   describe('ngOnInit method', () => {
//     it('should set isCollapsed by true', async(() => {
//       comp.config = config;
//       comp.query = '';
//       comp.ngOnInit();
//       expect(comp.defaultValue).toBeDefined();
//       expect(comp.theme).toBeDefined();
//       expect(comp.isCollapsed).toBeTruthy();
//     }));
//   });
//
//   describe('genericList method', () => {
//     it('generate call getOptions method', () => {
//       let item = {
//         id: 1,
//         data: '',
//       };
//       comp.config = config;
//       comp.searchValue = '';
//       spyOn(comp, 'getOptions');
//       comp.generateList(item);
//       expect(comp.getOptions).toHaveBeenCalledWith(
//         comp.searchValue,
//         item,
//         false
//       );
//     });
//   });
//
//   describe('generatePreviewList method', () => {
//     it('should generate preview list', () => {
//       let item = {
//         id: 1,
//         lastElement: 0,
//       };
//       let list = [
//         {
//           [config.data.key]: '123',
//           [config.data.value]: 'First Value',
//         },
//       ];
//       comp.limit = 10;
//       comp.generatePreviewList(list, item);
//       expect(item.lastElement).toEqual(10);
//       expect(comp.previewList).toEqual(list);
//     });
//   });
//
//   describe('openAutocomplete method', () => {
//     it('should open autocomplete element and add focus on input', fakeAsync(() => {
//       let searchElement = {
//         children: [
//           {
//             focus() {
//               return true;
//             },
//           },
//         ],
//       };
//       let event = {
//         target: {
//           classList: {
//             contains() {
//               return true;
//             },
//           },
//           offsetHeight: 25,
//           nextElementSibling: searchElement,
//         },
//       };
//       let item = {
//         id: 1,
//         hideAutocomplete: true,
//       };
//       config.options = [
//         {
//           [config.data.key]: '123',
//           [config.data.value]: 'First Value',
//         },
//       ];
//       comp.config = config;
//       comp.searchValue = 'a';
//       spyOn(comp, 'generateList');
//       spyOn(searchElement.children[0], 'focus');
//       comp.openAutocomplete(event, item);
//       expect(comp.searchValue).toBeNull();
//       expect(item.hideAutocomplete).toBeFalsy();
//       expect(comp.topHeight).toEqual(25);
//       expect(comp.generateList).toHaveBeenCalledWith(item);
//       tick(100);
//       expect(searchElement.children[0].focus).toHaveBeenCalled();
//     }));
//   });
//
//   describe('resetList method', () => {
//     it('should reset properties after autocomplete element was closed', fakeAsync(() => {
//       let item = {
//         id: 1,
//         hideAutocomplete: false,
//         lastElement: 20,
//         count: 125,
//       };
//       comp.previewList = [];
//       comp.resetList(item);
//       tick(200);
//       expect(comp.previewList).toBeNull();
//       expect(item.hideAutocomplete).toBeTruthy();
//       expect(item.lastElement).toEqual(0);
//       expect(item.count).toBeNull();
//     }));
//   });
//
//   describe('filter method', () => {
//     it('should call generateList method', () => {
//       let item = {
//         id: 1,
//         lastElement: 10,
//         count: 123,
//       };
//       spyOn(comp, 'generateList');
//       comp.filter(item);
//       expect(item.lastElement).toEqual(0);
//       expect(item.count).toBeNull();
//       expect(comp.previewList).toBeNull();
//       expect(comp.generateList).toHaveBeenCalled();
//     });
//   });
//
//   describe('onModalScrollDown method', () => {
//     it('should call generateList method', () => {
//       let item = {
//         id: 1,
//       };
//       spyOn(comp, 'generateList');
//       comp.onModalScrollDown(item);
//       expect(comp.generateList).toHaveBeenCalledWith(item, true);
//     });
//   });
//
//   describe('setValue method', () => {
//     it('should set value from autocomplete element', () => {
//       let item = {
//         id: 1,
//         data: '',
//         displayValue: '',
//         count: 123,
//       };
//       let value = {
//         [config.data.key]: '124',
//         [config.data.value]: 'Tom',
//       };
//       comp.config = config;
//       comp.previewList = [];
//       comp.searchValue = 'om';
//       spyOn(comp, 'onChange');
//       comp.setValue(value, item);
//       expect(comp.previewList).toBeNull();
//       expect(comp.searchValue).toBeNull();
//       expect(item.count).toBeNull();
//       expect(item.data).toEqual('124');
//       expect(item.displayValue).toEqual('Tom');
//       expect(comp.onChange).toHaveBeenCalled();
//     });
//   });
//
//   describe('deleteValue method', () => {
//     it('should delete value', async(
//       inject([FilterService], (fs: FilterService) => {
//         comp.config = config;
//         spyOn(fs, 'generateQuery');
//         spyOn(comp, 'genericQuery');
//         spyOn(comp, 'changeQuery');
//         let value = 'Home LTD';
//         let element = {
//           id: 1,
//           data: value,
//           displayValue: '1',
//         };
//         comp.deleteValue(element);
//         expect(element.data).toEqual('');
//         expect(element.displayValue).toEqual('All');
//         expect(comp.genericQuery).toHaveBeenCalled();
//         expect(comp.changeQuery).toHaveBeenCalled();
//         expect(fs.generateQuery).toHaveBeenCalled();
//       })
//     ));
//   });
//
//   describe('addElement method', () => {
//     it('should add new element', () => {
//       comp.count = 1;
//       comp.elements = [
//         {
//           id: 1,
//         },
//       ];
//       config.options = [
//         {
//           [config.data.key]: '123',
//           [config.data.value]: 'Anna',
//         },
//         {
//           [config.data.key]: '124',
//           [config.data.value]: 'Tom',
//         },
//       ];
//       comp.config = config;
//       spyOn(comp, 'createElement').and.returnValue({
//         id: 2,
//       });
//       comp.addElement();
//       expect(comp.elements.length).toEqual(2);
//       expect(comp.elements[1]).toEqual({ id: 2 });
//     });
//   });
//
//   describe('deleteElement method', () => {
//     it('should delete element', async(
//       inject([FilterService], (fs: FilterService) => {
//         comp.config = config;
//         spyOn(fs, 'generateQuery');
//         spyOn(comp, 'genericQuery');
//         spyOn(comp, 'changeQuery');
//         let data = {
//           id: 1,
//           data: '',
//         };
//         let elements = [
//           data,
//           {
//             id: 2,
//             data: '',
//           },
//         ];
//         comp.elements = elements;
//         comp.deleteElement(data);
//         expect(comp.elements).toEqual([{ id: 2, data: '' }]);
//         expect(comp.genericQuery).toHaveBeenCalled();
//         expect(fs.generateQuery).toHaveBeenCalled();
//         expect(comp.changeQuery).toHaveBeenCalled();
//       })
//     ));
//   });
//
//   describe('createElement method', () => {
//     it('should create element', () => {
//       let id = 2;
//       let data = {
//         id,
//         data: '123',
//         lastElement: 0,
//         hideAutocomplete: true,
//         displayValue: 'Value',
//       };
//       spyOn(comp, 'getOption').and.returnValue('Value');
//       let result = comp.createElement(id, '123');
//       expect(comp.getOption).toHaveBeenCalled();
//       expect(result).toEqual(data);
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
//         comp.addElement();
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
//         let data = [
//           {
//             id: 1,
//             data: 4567931,
//           },
//         ];
//         let query = 'company';
//         let result = comp.genericQuery(data, query);
//         expect(result).toEqual(`${query}=4567931`);
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
//     it('should parse query', async () => {
//       let query = 'company=123&company=124';
//       comp.config = config;
//       comp.count = 1;
//       let result = [
//         {
//           id: 1,
//           data: '123',
//           lastElement: 0,
//           hideAutocomplete: true,
//         },
//         {
//           id: 2,
//           data: '124',
//           lastElement: 0,
//           hideAutocomplete: true,
//         },
//       ];
//       comp.parseQuery(query);
//       expect(comp.elements.length).toEqual(2);
//       expect(comp.elements).toEqual(result);
//     });
//   });
//
//   describe('updateFilter method', () => {
//     it('should reset filter from empty query', async(
//       inject([FilterService], (fs: FilterService) => {
//         let elements = [
//           {
//             id: 1,
//             data: '123',
//           },
//           {
//             id: 2,
//             data: '124',
//           },
//         ];
//         comp.elements = elements;
//         comp.config = config;
//         spyOn(fs, 'getQueries').and.returnValue(false);
//         comp.updateFilter();
//         expect(comp.query).toEqual('');
//         expect(comp.count).toEqual(1);
//         expect(comp.elements.length).toEqual(2);
//       })
//     ));
//
//     it('should update filter by query', async(
//       inject([FilterService], (fs: FilterService) => {
//         comp.elements = [
//           {
//             id: 1,
//             data: '125',
//           },
//         ];
//         spyOn(fs, 'getQueries').and.returnValue({
//           byQuery: true,
//           query: 'company=123',
//         });
//         comp.config = config;
//         comp.settingValue = true;
//         spyOn(comp, 'parseQuery');
//         comp.updateFilter();
//         expect(comp.elements).toEqual([]);
//         expect(comp.parseQuery).toHaveBeenCalledWith('company=123');
//         expect(comp.settingValue).toBeFalsy();
//       })
//     ));
//
//     it('should update filter by data', async(
//       inject([FilterService], (fs: FilterService) => {
//         let data = [
//           {
//             id: 1,
//             data: '124',
//           },
//           {
//             id: 2,
//             data: '125',
//           },
//         ];
//         comp.config = config;
//         spyOn(fs, 'getQueries').and.returnValue(data);
//         spyOn(comp, 'genericQuery');
//         comp.settingValue = true;
//         comp.updateFilter();
//         expect(comp.count).toEqual(2);
//         expect(comp.elements).toEqual(data);
//         expect(comp.genericQuery).toHaveBeenCalledWith(
//           comp.elements,
//           config.query
//         );
//         expect(comp.settingValue).toBeFalsy();
//       })
//     ));
//   });
//
//   describe('resetFilter method', () => {
//     it('should reset query', async(
//       inject([FilterService], (fs: FilterService) => {
//         comp.elements = [
//           {
//             id: 1,
//             data: '123',
//           },
//           {
//             id: 2,
//             data: '124',
//           },
//         ];
//         comp.config = config;
//         spyOn(fs, 'generateQuery');
//         spyOn(comp, 'deleteValue');
//         spyOn(comp, 'changeQuery');
//         comp.resetFilter();
//         expect(comp.elements.length).toEqual(1);
//         expect(comp.deleteValue).toHaveBeenCalled();
//         expect(comp.changeQuery).toHaveBeenCalled();
//         expect(fs.generateQuery).toHaveBeenCalled();
//       })
//     ));
//   });
//
//   describe('getOption method', () => {
//     it('should udpate displayValue of filter', async(
//       inject([GenericFormService], (genericFormService: GenericFormService) => {
//         let value = '123';
//         let item = {
//           id: 1,
//           data: '',
//           displayValue: '',
//         };
//         comp.config = config;
//         response = {
//           id: '123',
//           name: 'Tom',
//         };
//         comp.getOption(value, item);
//         expect(item.displayValue).toEqual('Tom');
//       })
//     ));
//   });
//
//   describe('getOptions method', () => {
//     it('should create new previewList', () => {
//       let value: '123';
//       let item = {
//         id: 1,
//         data: '',
//         count: null,
//         lastElement: 0,
//       };
//       comp.config = config;
//       comp.limit = 10;
//       response = {
//         count: 25,
//         results: [1, 2, 3],
//       };
//       comp.getOptions(value, item, false);
//       expect(item.lastElement).toEqual(10);
//       expect(item.count).toEqual(25);
//       expect(comp.previewList).toEqual([1, 2, 3]);
//     });
//
//     it('should add new elements into previewList', () => {
//       let value: '123';
//       let item = {
//         id: 1,
//         data: '',
//         count: null,
//         lastElement: 10,
//       };
//       comp.config = config;
//       comp.limit = 10;
//       comp.previewList = [1, 2, 3];
//       response = {
//         count: 25,
//         results: [4, 5, 6],
//       };
//       comp.getOptions(value, item, true);
//       expect(item.lastElement).toEqual(20);
//       expect(item.count).toEqual(25);
//       expect(comp.previewList).toEqual([1, 2, 3, 4, 5, 6]);
//     });
//   });
// });
