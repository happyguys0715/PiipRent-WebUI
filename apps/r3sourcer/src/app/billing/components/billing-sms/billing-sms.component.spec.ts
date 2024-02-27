import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';

import { BillingSmsComponent } from './billing-sms.component';
import { BillingService } from '../../services';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

describe('BillingSmsComponent', () => {
  let component: BillingSmsComponent;
  let fixture: ComponentFixture<BillingSmsComponent>;

  beforeEach(() => {
    const billingService: Partial<BillingService> = {
      getCreditDetails: jest.fn().mockReturnValue(of({})),
      addFunds: jest.fn().mockReturnValue(of({})),
    };

    TestBed.configureTestingModule({
      declarations: [BillingSmsComponent],
      imports: [TranslateModule.forRoot()],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        {
          provide: BillingService,
          useValue: billingService,
        },
      ],
    });

    fixture = TestBed.createComponent(BillingSmsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
