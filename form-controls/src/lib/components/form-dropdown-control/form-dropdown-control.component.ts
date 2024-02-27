import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Icon, IconComponent, IconSize, LoaderComponent } from '@webui/ui';
import {
  CdkOverlayOrigin,
  Overlay,
  OverlayConfig,
  OverlayModule,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DropdownService } from '../../services';
import { BehaviorSubject, fromEvent, Observable, Subject } from 'rxjs';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  takeUntil,
  throttleTime,
} from 'rxjs/operators';
import { DropdownOption, DropdownPayload } from '../../models/dropdown.model';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { DropdownContentComponent } from '../dropdown-content/dropdown-content.component';

type OptionFilter = (option: DropdownOption) => boolean;
type ContentPayload = { payload: BehaviorSubject<DropdownPayload> };

@Component({
  standalone: true,
  selector: 'webui-form-dropdown-control',
  templateUrl: './form-dropdown-control.component.html',
  styleUrls: ['./form-dropdown-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DropdownService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormDropdownControlComponent),
      multi: true,
    },
  ],
  imports: [
    CommonModule,
    OverlayModule,
    TranslateModule,
    ReactiveFormsModule,
    IconComponent,
    LoaderComponent,
    DropdownContentComponent,
  ],
})
export class FormDropdownControlComponent
  implements OnInit, ControlValueAccessor, OnDestroy
{
  private value: unknown;
  private destroy: Subject<void> = new Subject<void>();
  private dropdownClosed = new Subject<void>();
  private overlayRef?: OverlayRef | null;
  private onChange?: (val: DropdownOption) => void;
  private onTouched?: () => void;

  @Input() label!: string;
  @Input() placeholder?: string;
  @Input() url?: string;
  @Input() params?: { [key: string]: unknown } = {};
  @Input() optionFilter?: OptionFilter;

  @ViewChild(CdkOverlayOrigin) overlayOrigin?: CdkOverlayOrigin;
  @ViewChild('content') content?: TemplateRef<ContentPayload>;
  @ViewChild('input') input?: ElementRef<HTMLInputElement>;
  @ViewChild('scroller') scroller?: CdkVirtualScrollViewport;

  public control!: FormControl;
  public Icon = Icon;
  public IconSize = IconSize;
  public options$: BehaviorSubject<DropdownPayload> = new BehaviorSubject(
    DropdownPayload.initialState()
  );
  public destroy$: Observable<void> = this.destroy.asObservable();

  constructor(
    private overlay: Overlay,
    private dropdownService: DropdownService,
    public viewContainerRef: ViewContainerRef,
    private cd: ChangeDetectorRef
  ) {}

  public get isOpen(): boolean {
    return !!this.overlayRef;
  }

  public ngOnInit(): void {
    this.initControl();
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public openDropdown(): void {
    this.createOverlay();
  }

  public closeDropdown(): void {
    if (!this.overlayRef) {
      return;
    }

    this.overlayRef.dispose();
    this.overlayRef.detach();
    this.overlayRef.detachBackdrop();
    this.dropdownService.clearPagination();
    this.options$.next(DropdownPayload.initialState());
    this.dropdownClosed.next();

    if (this.value) {
      this.control?.patchValue((this.value as DropdownOption).label, {
        emitEvent: false,
      });
    }

    this.overlayRef = null;
    this.cd.markForCheck();
  }

  public setValue(option: DropdownOption): void {
    this.control?.patchValue(option.label, { emitEvent: false });
    this.value = option;
    if (this.onChange) {
      this.onChange(option);
    }
    this.closeDropdown();
  }

  private subscribeOnScroll(): void {
    if (!this.scroller) {
      return;
    }

    this.scroller
      .elementScrolled()
      .pipe(
        map(() => this.scroller?.measureScrollOffset('bottom')),
        pairwise(),
        filter(([y1 = 0, y2 = 0]) => y2 < y1 && y2 < 140),
        throttleTime(100)
      )
      .subscribe(() => {
        const { fetching, results } = this.options$.value;

        if (!fetching) {
          this.fetchOptions(this.control?.value || '', results);
        }
      });
  }

  private initControl() {
    this.control = new FormControl();

    this.control.valueChanges
      .pipe(takeUntil(this.destroy$), distinctUntilChanged(), debounceTime(400))
      .subscribe(value => {
        this.options$.next(DropdownPayload.initialState());
        this.dropdownService.clearPagination();
        this.fetchOptions(value);
        this.cd.markForCheck();
      });
  }

  private fetchOptions(search = '', existOptions?: DropdownOption[]): void {
    if (!this.url || !this.dropdownService.hasMoreItems) {
      return;
    }

    if (existOptions) {
      this.options$.next(
        DropdownPayload.downloadMoreState(existOptions as DropdownOption[])
      );
    }

    this.dropdownService
      .fetchOptions(this.url, { search, ...this.params })
      .pipe(takeUntil(this.dropdownClosed))
      .subscribe({
        next: (value: DropdownOption[] | undefined) => {
          let options: DropdownOption[] = [];
          if (value) {
            if (this.optionFilter) {
              options = value.filter(this.optionFilter);
            } else {
              options = [...value];
            }
          }

          if (existOptions) {
            options = [...existOptions, ...options];
          }

          this.options$?.next(DropdownPayload.successState(options));
        },
        error: error =>
          this.options$.next(DropdownPayload.errorState(error.error)),
      });
  }

  private createOverlay() {
    if (!this.overlayOrigin || !this.content) {
      return;
    }

    const config = new OverlayConfig({
      disposeOnNavigation: true,
      width: getComputedStyle(this.overlayOrigin.elementRef.nativeElement)
        .width,
      maxHeight: '10rem',
      backdropClass: 'form-dropdown-control-backdrop',
      hasBackdrop: true,
    });

    config.positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.overlayOrigin.elementRef)
      .withGrowAfterOpen(true)
      .withDefaultOffsetY(7)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
      ]);

    this.control?.patchValue('', { emitEvent: false });

    this.overlayRef = this.overlay.create(config);
    const dropdownContent = new TemplatePortal<ContentPayload>(
      this.content,
      this.viewContainerRef,
      {
        payload: this.options$,
      }
    );
    this.overlayRef.attachments().subscribe(() => {
      this.fetchOptions();
      this.subscribeOnScroll();
    });
    this.overlayRef.attach(dropdownContent);
    this.overlayRef
      .backdropClick()
      .pipe(takeUntil(this.dropdownClosed))
      .subscribe(() => this.closeDropdown());
    fromEvent(window, 'blur')
      .pipe(takeUntil(this.dropdownClosed))
      .subscribe(() => {
        (document.activeElement as any)?.blur();

        this.closeDropdown();
      });
  }

  public registerOnChange(fn: (val: DropdownOption) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public writeValue(obj: any): void {
    if (obj) {
      this.value = obj;
      this.control?.patchValue(obj.label || obj.__str__, { emitEvent: false });
    }
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.control?.disable();
    } else {
      this.control?.enable();
    }
  }

  public toPayload(item: unknown): BehaviorSubject<DropdownPayload> {
    return item as BehaviorSubject<DropdownPayload>;
  }
}
