import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  TestBed,
  async,
  ComponentFixture,
  inject,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { ActionElementComponent } from './action-element.component';

describe('ActionElementComponent', () => {
  let fixture: ComponentFixture<ActionElementComponent>;
  let comp: ActionElementComponent;
  let el;
  let config = {
    label: 'Actions',
    button_label: 'Go',
    agree_label: 'Agree',
    decline_label: 'Decline',
    options: [
      {
        key: 'key of action',
        label: 'label of action',
        query: 'delete',
        confirm: true,
        message: 'confirm message',
      },
      {
        confirm: false,
        endpoint: '/core/companyaddresses/sendsms/',
        label: 'Send',
        message: 'Are you sure?',
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionElementComponent],
      providers: [],
      imports: [NgbModule.forRoot(), FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(ActionElementComponent);
      comp = fixture.componentInstance;
    });
  }));

  it('should enter the assertion', async () => {
    comp.config = config;
    fixture.detectChanges();
    expect(comp.config).toBeDefined();
  });

  describe('toDoAction method', () => {
    it('should be called open', async(() => {
      comp.action = config.options[0];
      spyOn(comp, 'open');
      comp.toDoAction();
      expect(comp.open).toHaveBeenCalled();
    }));

    it('should emit action', async(() => {
      comp.action = config.options[1];
      spyOn(comp.event, 'emit');
      comp.toDoAction();
      expect(comp.event.emit).toHaveBeenCalledWith({
        action: comp.action,
      });
    }));
  });
});
