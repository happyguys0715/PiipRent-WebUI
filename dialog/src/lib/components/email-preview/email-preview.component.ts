import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Inject,
} from '@angular/core';
import { getEmailVariablesValue } from '@webui/data';
import { Formatter } from '@webui/utilities';
import { BaseModalComponent } from '../base-modal/base-modal.component';
// import { DialogRef } from '@angular/cdk/dialog';
import { DIALOG_DATA, DialogRef } from '@webui/models';

@Component({
  standalone: true,
  selector: 'webui-email-preview',
  templateUrl: './email-preview.component.html',
  styleUrls: ['./email-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BaseModalComponent],
})
export class EmailPreviewComponent implements AfterViewInit {
  // template?: string;

  @ViewChild('iframe') iframe?: ElementRef<HTMLIFrameElement>;

  constructor(
    private modal: DialogRef,
    @Inject(DIALOG_DATA) public modalData: { template: string }
  ) {}

  ngAfterViewInit(): void {
    const formatter = new Formatter('[[', ']]');
    const template = this.modalData.template || '';
    const iframeElement = this.iframe?.nativeElement;

    if (!iframeElement) {
      return;
    }

    iframeElement.src = 'about:blank';
    iframeElement.contentWindow?.document.open();
    iframeElement.contentWindow?.document.write(
      formatter.format(template, getEmailVariablesValue())
    );
  }

  onClose(): void {
    this.modal.close();
  }
}
