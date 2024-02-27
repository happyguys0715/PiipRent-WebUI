import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { BillingService } from '../../services';
import { autoChargeMetadata, ISmsBalance } from './billing-sms.metadata';
import { MessageType, ToastService } from '@webui/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CloseButtonComponent } from '@webui/ui';
import { DynamicFormComponent } from '@webui/generic-components';
// import { DynamicFormComponent } from '@webui/dynamic-form';
import { dialogConfig, DialogRef } from '@webui/models';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  standalone: true,
  selector: 'webui-billing-sms',
  templateUrl: './billing-sms.component.html',
  styleUrls: ['./billing-sms.component.scss'],
  imports: [
    CommonModule,
    TranslateModule,
    CloseButtonComponent,
    ReactiveFormsModule,
    DynamicFormComponent,
  ],
})
export class BillingSmsComponent implements OnInit, OnDestroy {
  @Input() currency = 'USD';
  @Input() cardExist?: boolean;

  public minChargeAmount = 20;
  public smsBalance?: ISmsBalance;
  public modalConfig = autoChargeMetadata;
  public modalRef!: DialogRef;
  public group!: FormGroup;
  public additionalData: any;
  public amountControl = new FormControl(this.minChargeAmount, [
    Validators.required,
    Validators.min(this.minChargeAmount),
  ]);

  @ViewChild('charge') public modal!: ElementRef;
  @ViewChild('funds') public fundsModal!: ElementRef;

  constructor(
    private billingService: BillingService,
    private modalService: Dialog,
    private toastr: ToastService
  ) {}

  ngOnInit() {
    this.getSmsBalance();
  }

  public ngOnDestroy() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  public getSmsBalance(message?: boolean) {
    this.billingService.getCreditDetails().subscribe((res: any) => {
      if (message) {
        if (this.smsBalance !== res.sms_balance) {
          this.toastr.sendMessage(
            'Balance has been updated',
            MessageType.Success
          );
        }
      }

      this.smsBalance = res.sms_balance;
    });
  }

  public showAddFundsForm() {
    if (this.cardExist) {
      this.openModal(this.fundsModal);
    }
  }

  public addFunds() {
    if (this.amountControl.invalid) {
      return;
    }

    const amount = this.amountControl.value;

    this.billingService.addFunds({ amount }).subscribe(() => {
      this.amountControl.patchValue(this.minChargeAmount);
      this.modalRef.close();
      this.toastr.sendMessage('Please wait a few seconds', MessageType.Info);
      setTimeout(() => {
        this.getSmsBalance(true);
      }, 10000);
    });
  }

  public autoCharge(event: MouseEvent) {
    if (!this.smsBalance) {
      return;
    }

    event.stopPropagation();
    event.preventDefault();

    this.group = new FormGroup({});
    const balance = this.smsBalance as ISmsBalance;
    this.modalConfig.forEach(el => {
      const key = el.key as keyof ISmsBalance;

      el.value = balance[key];
    });
    this.openModal(this.modal);
  }

  public openModal(modal: any) {
    this.modalRef = this.modalService.open(modal, dialogConfig({ size: 'sm' }));
  }

  public saveAutoCharge() {
    this.billingService
      .setCreditDetails(this.group.value)
      .subscribe((res: any) => {
        this.smsBalance = res.sms_balance;
        this.modalRef.close();
      });
  }
}
