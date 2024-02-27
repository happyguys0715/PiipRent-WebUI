import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FilterService } from '../services';
import { RouterTestingModule } from '@angular/router/testing';

import { FilterElementDirective } from './filter-element.directive';
import { FilterChoiceComponent } from '../components/filter-choice/filter-choice.component';

@Component({
  selector: 'container',
  template: `<div filterElement [config]="config"></div>`,
  entryComponents: [FilterChoiceComponent],
})
export class ContainerComponent {
  public config = {
    type: 'choice',
    key: 'key of filter',
    label: 'Choice of list',
    query: 'company',
    list: [
      {
        label: 'Text of choice',
        value: 'Home',
      },
      {
        label: 'Text of another choice',
        value: 'Homes',
      },
    ],
  };
}

describe('FilterElementDirective', () => {
  let fixture: ComponentFixture<ContainerComponent>;
  let comp: ContainerComponent;
  let mockFilterService = {
    generateQuery() {
      return true;
    },
    getQueries() {
      return true;
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FilterElementDirective,
        ContainerComponent,
        FilterChoiceComponent,
      ],
      providers: [{ provide: FilterService, useValue: mockFilterService }],
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(ContainerComponent);
      comp = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should enter the assertion', () => {
    const el = fixture.debugElement.query(By.directive(FilterChoiceComponent));
    expect(el.nativeElement.textContent).toContain('Text of choice');
  });
});
