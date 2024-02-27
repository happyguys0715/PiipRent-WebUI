import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormRowComponent } from './form-row.component';

describe('FormRowComponent', () => {
  let fixture: ComponentFixture<FormRowComponent>;
  let comp: FormRowComponent;
  let el;
  let config = {
    label: 'Title',
    children: [],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormRowComponent],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(FormRowComponent);
      comp = fixture.componentInstance;
    });
  }));

  it('should enter the assertion', () => {
    comp.config = config;
    fixture.detectChanges();
    expect(comp.config).toBeDefined();
  });

  describe('eventHandler method', () => {
    it('should be emit event', () => {
      spyOn(comp.event, 'emit');
      comp.eventHandler('event');
      expect(comp.event.emit).toHaveBeenCalled();
    });
  });

  describe('buttonActionHandler method', () => {
    it('should be emit event', () => {
      spyOn(comp.buttonAction, 'emit');
      comp.buttonActionHandler('event');
      expect(comp.buttonAction.emit).toHaveBeenCalled();
    });
  });
});
