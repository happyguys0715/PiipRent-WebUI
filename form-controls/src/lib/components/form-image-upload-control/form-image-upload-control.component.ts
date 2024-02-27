import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Icon, IconComponent, IconSize } from '@webui/ui';
import { BehaviorSubject, interval, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { TranslateModule } from '@ngx-translate/core';
import { SafeHtmlPipe } from '@webui/shared';

@Component({
  standalone: true,
  selector: 'webui-form-image-upload-control',
  templateUrl: './form-image-upload-control.component.html',
  styleUrls: ['./form-image-upload-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormImageUploadControlComponent),
      multi: true,
    },
  ],
  imports: [
    CommonModule,
    NgxDropzoneModule,
    IconComponent,
    TranslateModule,
    SafeHtmlPipe,
  ],
})
export class FormImageUploadControlComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  private destroy: Subject<void> = new Subject();
  private pictures: BehaviorSubject<File[]> = new BehaviorSubject([] as File[]);

  public pictures$ = this.pictures.asObservable();
  public onChange?: (value: unknown[]) => void;
  public onTouched?: () => void;
  public Icon = Icon;
  public IconSize = IconSize;
  public control: FormControl = new FormControl();
  public destroy$: Observable<void> = this.destroy.asObservable();

  constructor(private cd: ChangeDetectorRef) {}

  public ngOnInit() {
    this.control.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        if (this.onChange) {
          this.onChange(value);
        }
      });

    this.initUpdate();
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public writeValue(value: string): void {
    this.control.patchValue(value);
  }

  public registerOnChange(fn: (value: unknown[]) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public onSelect(event: any) {
    const pictures = this.pictures.value;

    pictures.push(...event.addedFiles);

    this.pictures.next([...pictures]);
    if (this.onChange) {
      this.onChange(this.pictures.value);
    }
  }

  public onRemove(event: File) {
    const pictures = this.pictures.value;

    pictures.splice(pictures.indexOf(event), 1);

    this.pictures.next([...pictures]);
  }

  private initUpdate(): void {
    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cd.detectChanges();
      });
  }
}
