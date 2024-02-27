import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { GenericFormService, SiteSettingsService } from '@webui/core';
import { CloseButtonComponent } from '@webui/ui';
import { TestGeneratorComponent } from '../test-generator/test-generator.component';
import { MetadataService } from '@webui/metadata';
import { DIALOG_DATA, DialogRef } from '@webui/models';

export interface PassTestModalConfig {
  send?: boolean;
  workflowObject?: string;
  testId?: string;
  description?: string;
  test?: any;
  skipScoreForTest?: boolean;
}

@Component({
  standalone: true,
  selector: 'webui-pass-test-modal',
  templateUrl: './pass-test-modal.component.html',
  styleUrls: ['./pass-test-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CloseButtonComponent, TestGeneratorComponent],
  providers: [GenericFormService, MetadataService],
})
export class PassTestModalComponent {
  // config!: PassTestModalConfig;

  get config() {
    return this.modalData.config;
  }

  constructor(
    private modal: DialogRef,
    private settings: SiteSettingsService,
    @Inject(DIALOG_DATA) public modalData: { config: PassTestModalConfig }
  ) {}

  public get logo(): string {
    return this.settings.settings['logo'] || '/assets/img/logo.svg';
  }

  close(data: any) {
    this.modal.close(data);
  }

  dismiss() {
    this.modal.close();
  }
}
