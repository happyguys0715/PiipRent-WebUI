import {
  Component,
  OnInit,
  Output,
  ViewChild,
  AfterViewInit,
  ElementRef,
  EventEmitter,
  OnDestroy,
  ChangeDetectorRef,
  TemplateRef,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Subject, Subscription } from 'rxjs';

import { BasicElementComponent } from './../basic-element/basic-element.component';
import { getContactAvatar, getTranslationKey } from '@webui/utilities';

// import { FormMode, FormService } from '../../../services';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {
  CloseButtonComponent,
  FaIconComponent,
  InfoComponent,
} from '@webui/ui';
import { WebcamModule } from 'ngx-webcam';
import { FormService } from '@webui/core';
import { FormMode, dialogConfig } from '@webui/models';
import { Dialog } from '@angular/cdk/dialog';
// import { InfoComponent } from '../../info/info.component';

@Component({
  standalone: true,
  selector: 'webui-form-picture',
  templateUrl: 'form-picture.component.html',
  styleUrls: ['./form-picture.component.scss'],
  imports: [
    CommonModule,
    TranslateModule,
    InfoComponent,
    FaIconComponent,
    CloseButtonComponent,
    WebcamModule,
  ],
})
export class FormPictureComponent
  extends BasicElementComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private subscriptions: Subscription[] = [];
  @ViewChild('modal')
  public modal!: TemplateRef<unknown>;

  @ViewChild('picture')
  public picture!: ElementRef;

  @ViewChild('dropzone')
  public dropzone!: ElementRef;

  @Output()
  public override event: EventEmitter<any> = new EventEmitter();

  public override config: any;
  public override group!: FormGroup;
  public errors: any;
  public message: any;
  public override key: any;
  public label!: boolean;
  public photoExist = false;
  public mime!: string;
  public fileName = '';
  public err: any;
  public base64!: string;
  public link!: string;
  public sizeError!: boolean;

  public value: any;

  public viewMode!: boolean;

  public contactAvatar!: string;

  isRemoved!: boolean;

  private capture: Subject<void> = new Subject();

  capture$ = this.capture.asObservable();

  getTranslationKey = (key: string) => getTranslationKey(this.config.key, key);

  constructor(
    private fb: FormBuilder,
    public modalService: Dialog,
    private cd: ChangeDetectorRef,
    private formService: FormService
  ) {
    super();
  }

  public onImageCapture(data: any) {
    const { imageAsDataUrl } = data;

    if (imageAsDataUrl) {
      this.photoExist = true;
      this.base64 = imageAsDataUrl;
    }
  }

  public ngOnInit(): void {
    this.addControl(this.config, this.fb, this.config.templateOptions.required);
    this.mime = 'image/jpeg';
    this.setInitValue();
    this.checkModeProperty();
    this.checkHiddenProperty();
    this.createEvent();
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());

    if (this.dropzone) {
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
        this.dropzone.nativeElement.removeEventListener(
          event,
          this.stopEvent,
          false
        );
      });

      this.dropzone.nativeElement.removeEventListener(
        'drop',
        this.handleDrop,
        false
      );
    }
  }

  public checkHiddenProperty() {
    if (this.config && this.config.hidden) {
      const subscription = this.config.hidden.subscribe((hide: boolean) => {
        if (hide) {
          this.config.hide = hide;
          this.group.get(this.key)?.patchValue(undefined);
          this.setInitValue();
        } else {
          this.config.hide = hide;
        }

        if (!(<any>this.cd).destroyed) {
          this.cd.detectChanges();
        }
      });

      this.subscriptions.push(subscription);
    }
  }

  public checkModeProperty() {
    if (this.config && this.config.mode) {
      const subscription = this.config.mode.subscribe((mode: FormMode) => {
        if (mode === 'view') {
          this.viewMode = true;
        } else {
          this.viewMode = this.config.read_only || false;
        }
        this.setInitValue();
      });

      this.subscriptions.push(subscription);
    }
  }

  public setInitValue() {
    if (this.config.value || this.group.get(this.key)?.value) {
      this.config.value = this.config.value || this.group.get(this.key)?.value;
      if (this.config.value instanceof Object && this.config.value.origin) {
        this.value = this.config.value.origin;
      } else if (typeof this.config.value === 'string') {
        const imageType = /^image\//;
        const pdfType = /pdf$/;
        if (pdfType.test(this.config.value)) {
          this.link = this.config.value;
        } else {
          this.value = this.config.value;
        }
      }
    }

    if (!this.value) {
      this.value =
        this.config.companyContact && this.config.key === 'logo'
          ? '/assets/img/logo.svg'
          : '';

      if (!this.value && this.config.contactName) {
        this.contactAvatar = getContactAvatar(this.config.contactName);
      }
    }

    this.group.get(this.key)?.patchValue(undefined);

    if (
      this.config.value &&
      typeof this.config.value === 'string' &&
      this.config.value.indexOf('data:image') > -1
    ) {
      this.value = this.config.value;
      this.group.get(this.key)?.patchValue(this.config.value);
    }

    if (this.config.templateOptions.signature) {
      this.group.get(this.key)?.patchValue(this.config.value);
    }
  }

  public ngAfterViewInit() {
    if (this.picture) {
      this.addFlags(this.picture, this.config);
    }

    if (this.dropzone) {
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
        this.dropzone.nativeElement.addEventListener(
          event,
          this.stopEvent,
          false
        );
      });

      this.dropzone.nativeElement.addEventListener(
        'drop',
        this.handleDrop.bind(this),
        false
      );
    }
  }

  public stopEvent(e: MouseEvent) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    return false;
  }

  public upload(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.picture.nativeElement.click();
  }

  public open(): void {
    this.photoExist = false;
    this.modalService.open(
      this.modal,
      dialogConfig({
        size: 'sm',
      })
    );
  }

  public getPhoto() {
    this.fileName = '';
    this.capture.next();
    // const canvas = this.createPhoto();
    // this.base64 = canvas.toDataURL(this.mime);
  }

  public save(closeModal: () => void) {
    if (this.base64) {
      this.updateValue('image.jpeg', this.base64, true);
      closeModal();
    }
  }

  // public createPhoto() {
  //   this.photoExist = true;
  //   const video = <any>document.getElementsByTagName('video')[0];
  //   const canvas = <any>document.getElementsByTagName('canvas')[0];
  //   if (video) {
  //     canvas.style.maxWidth = `100%`;
  //     canvas.width = video.videoWidth;
  //     canvas.height = video.videoHeight;
  //     canvas.getContext('2d').drawImage(video, 0, 0);
  //   } else {
  //     this.flashPlayer.capture();
  //   }
  //   return canvas;
  // }

  public fileChangeEvent(e: any) {
    this.updateValue('', '', true);
    const file = e.target.files[0];

    if (file.size > 10 * 1024 * 1024) {
      this.formService.disableSaveButton(this.config.formId, true);
      this.sizeError = true;
    } else {
      this.sizeError = false;
      this.formService.disableSaveButton(this.config.formId, false);
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageType = /^image\//;
        const pdfType = /pdf$/;

        if (!imageType.test(file.type) && !pdfType.test(file.type)) {
          return;
        }
        if (reader.result) {
          const name = file.name;
          this.updateValue(name, reader.result, imageType.test(file.type));
        }
      };
      reader.readAsDataURL(file);
    }
  }

  // public onFallback(): void {
  //   const self = this;
  //   const canvas = <any>document.getElementsByTagName('canvas')[0];
  //   if (canvas) {
  //     const ctx = canvas.getContext('2d');
  //     const size = self.flashPlayer.getCameraSize();
  //     const w = size.width;
  //     const h = size.height;
  //     const externData = {
  //       imgData: ctx.getImageData(0, 0, w, h),
  //       pos: 0,
  //     };

  //     canvas.width = w;
  //     canvas.height = h;
  //     ctx.clearRect(0, 0, w, h);

  //     FallbackDispatcher.implementExternal({
  //       onSave: (data) => {
  //         try {
  //           const col = data.split(';');
  //           let tmp = null;

  //           for (let i = 0; i < w; i++) {
  //             tmp = parseInt(col[i], 10);
  //             externData.imgData.data[externData.pos + 0] = (tmp >> 16) & 0xff; //tslint:disable-line
  //             externData.imgData.data[externData.pos + 1] = (tmp >> 8) & 0xff; //tslint:disable-line
  //             externData.imgData.data[externData.pos + 2] = tmp & 0xff; //tslint:disable-line
  //             externData.imgData.data[externData.pos + 3] = 0xff;
  //             externData.pos += 4;
  //           }

  //           if (externData.pos >= 4 * w * h) {
  //             ctx.putImageData(externData.imgData, 0, 0);
  //             externData.pos = 0;
  //           }
  //         } catch (e) {
  //           console.error(e);
  //         }
  //       },
  //       debug: (tag, message): void => {
  //         // do nothing
  //       },
  //       onCapture: () => {
  //         self.flashPlayer.save();
  //       },
  //       onTick: (time) => {
  //         // do nothing
  //       },
  //     });
  //   }
  // }

  public updateValue(name: string, value: any, image = false) {
    this.fileName = name;
    if (image) {
      this.value = value;
    }
    this.group.get(this.key)?.patchValue(value);
    this.event.emit({
      type: 'changeImage',
    });
  }

  public getExtension(link: string) {
    return link.split('.').pop();
  }

  handleDrop(e: any) {
    const dt = e.dataTransfer;
    const files = dt.files;
    this.fileChangeEvent({ target: { files } });
  }

  patchPicture() {
    this.event.emit({
      type: 'patchPicture',
      value: this.group.get(this.key)?.value,
    });

    this.fileName = '';
  }

  removeImage() {
    this.group.get(this.key)?.patchValue(null);
    this.value = null;
    this.fileName = '';
    if (this.config.contactName) {
      this.contactAvatar = getContactAvatar(this.config.contactName);
    }

    if (this.config.candidateForm) {
      this.isRemoved = true;
    }
  }
}
