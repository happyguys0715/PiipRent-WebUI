import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ListElementDirective } from './list-element.directive';
import { ListLinkComponent } from '../components/list-link/list-link.component';

@Component({
  selector: 'container',
  template: `<div listElement [config]="config"></div>`,
  entryComponents: [ListLinkComponent],
})
export class ContainerComponent {
  public config = {
    href: 'phone',
    name: 'phone_mobile',
    type: 'link',
    value: 'hello',
    link: true,
  };
}

describe('ListElementDirective', () => {
  let fixture: ComponentFixture<ContainerComponent>;
  let comp: ContainerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListElementDirective,
        ContainerComponent,
        ListLinkComponent,
      ],
      providers: [],
      imports: [],
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
    const el = fixture.debugElement.query(By.directive(ListLinkComponent));
    expect(el.nativeElement.textContent).toContain('hello');
  });
});
