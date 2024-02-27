import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassTestModalComponent } from './pass-test-modal.component';

describe('PassTestModalComponent', () => {
  let component: PassTestModalComponent;
  let fixture: ComponentFixture<PassTestModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PassTestModalComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassTestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
