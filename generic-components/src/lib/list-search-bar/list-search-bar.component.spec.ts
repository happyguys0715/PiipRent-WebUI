import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  TestBed,
  async,
  ComponentFixture,
  inject,
} from '@angular/core/testing';
import { ListSerachBarComponent } from './list-search-bar.component';

import { FilterService } from './../../services/filter.service';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

describe('ListLinkComponent', () => {
  let fixture: ComponentFixture<ListSerachBarComponent>;
  let comp: ListSerachBarComponent;
  let el;
  let query;
  let params = [];

  const mockFilterService = {
    generateQuery() {
      return true;
    },
    getQueries() {
      return query;
    },
  };

  const mockActivatedRoute = {
    queryParams: Observable.of(params),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSerachBarComponent],
      providers: [
        { provide: FilterService, useValue: mockFilterService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
      imports: [],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(ListSerachBarComponent);
      comp = fixture.componentInstance;
    });
  }));

  it('should enter the assertion', async () => {
    expect(comp).toBeDefined();
  });

  describe('ngOnInit method', () => {
    it('should subscribe on query params', () => {
      spyOn(comp, 'updateSearchBar');
      comp.ngOnInit();
      expect(comp.updateSearchBar).toHaveBeenCalled();
    });
  });

  describe('search method', () => {
    it('should generate search action', async(
      inject([FilterService], (fs: FilterService) => {
        let event = {
          preventDefault() {
            return true;
          },
          stopPropagation() {
            return true;
          },
        };
        spyOn(fs, 'generateQuery');
        spyOn(comp, 'changeQuery');
        comp.searchValue = 'some text';
        comp.list = 'contact';
        comp.search(event);
        expect(fs.generateQuery).toHaveBeenCalledWith(
          `search=${comp.searchValue}`,
          'search',
          comp.list,
          { data: comp.searchValue, query: comp.searchValue }
        );
        expect(comp.changeQuery).toHaveBeenCalled();
      })
    ));
  });

  describe('changeQuery method', () => {
    it('should emit event', () => {
      spyOn(comp.event, 'emit');
      comp.changeQuery();
      expect(comp.event.emit).toHaveBeenCalledWith({
        list: comp.list,
      });
    });
  });

  describe('updateSearchBar method', () => {
    it('should update search bar by query', async(
      inject([FilterService], (fs: FilterService) => {
        let data = {
          byQuery: true,
          query: 'search=some',
        };
        spyOn(fs, 'getQueries').and.returnValue(data);
        comp.updateSearchBar();
        expect(comp.searchValue).toEqual('some');
      })
    ));

    it('should update search bar by data', async(
      inject([FilterService], (fs: FilterService) => {
        let data = {
          byQuery: false,
          data: 'some',
        };
        spyOn(fs, 'getQueries').and.returnValue(data);
        comp.updateSearchBar();
        expect(comp.searchValue).toEqual('some');
      })
    ));

    it('should update search bar by query', async(
      inject([FilterService], (fs: FilterService) => {
        spyOn(fs, 'getQueries').and.returnValue(undefined);
        comp.updateSearchBar();
        expect(comp.searchValue).toEqual('');
      })
    ));
  });
});
