import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RentToolDialogComponent } from './rent-tool-dialog.component';

describe('RentToolDialogComponent', () => {
  let component: RentToolDialogComponent;
  let fixture: ComponentFixture<RentToolDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentToolDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RentToolDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
