import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  TestBed,
  async,
  ComponentFixture,
  inject,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ListButtonsComponent } from './list-buttons.component';

describe('ListButtonsComponent', () => {
  let fixture: ComponentFixture<ListButtonsComponent>;
  let comp: ListButtonsComponent;
  let el;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListButtonsComponent],
      providers: [],
      imports: [],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(ListButtonsComponent);
      comp = fixture.componentInstance;
    });
  }));

  it('should enter the assertion', async () => {
    expect(comp).toBeDefined();
  });

  describe('buttonAction method', async () => {
    let type = 'add_object';
    spyOn(comp.event, 'emit');
    comp.buttonAction(type);
    expect(comp.event.emit).toHaveBeenCalledWith({ type });
  });
});
