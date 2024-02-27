import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  TestBed,
  async,
  ComponentFixture,
  inject,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FilterBlockComponent } from './filter-block.component';

describe('FilterBlockComponent', () => {
  let fixture: ComponentFixture<FilterBlockComponent>;
  let comp: FilterBlockComponent;
  let el;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterBlockComponent],
      providers: [],
      imports: [],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(FilterBlockComponent);
      comp = fixture.componentInstance;
    });
  }));

  it('should enter the assertion', async () => {
    expect(comp).toBeDefined();
  });

  describe('changeQuery method', () => {
    it('should emit event', () => {
      spyOn(comp.event, 'emit');
      comp.changeQuery({ list: 'company' });
      expect(comp.event.emit).toHaveBeenCalled();
    });
  });
});
