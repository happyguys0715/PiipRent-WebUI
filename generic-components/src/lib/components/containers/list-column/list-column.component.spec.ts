import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  TestBed,
  async,
  ComponentFixture,
  inject,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ListColumnComponent } from './list-column.component';

describe('ListColumnComponent', () => {
  let fixture: ComponentFixture<ListColumnComponent>;
  let comp: ListColumnComponent;
  let el;
  let config = {
    href: 'phone',
    name: 'phone_mobile',
    type: 'link',
    sort: true,
    label: 'Email',
    iconLabel: 'envelope',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListColumnComponent],
      providers: [],
      imports: [],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(ListColumnComponent);
      comp = fixture.componentInstance;
    });
  }));

  it('should enter the assertion', async () => {
    expect(comp).toBeDefined();
  });

  describe('sort method', () => {
    it('should emit event', () => {
      comp.config = config;
      spyOn(comp.event, 'emit');
      comp.sort();
      expect(comp.event.emit).toHaveBeenCalled();
    });
  });

  describe('eventHandler method', () => {
    it('should emit event', () => {
      comp.config = config;
      let event = {};
      spyOn(comp.event, 'emit');
      comp.eventHandler(event);
      expect(comp.event.emit).toHaveBeenCalled();
    });
  });

  describe('buttonHandler method', () => {
    it('should emit buttonAction', () => {
      comp.config = config;
      let event = {};
      spyOn(comp.buttonAction, 'emit');
      comp.buttonHandler(event);
      expect(comp.buttonAction.emit).toHaveBeenCalled();
    });
  });
});
