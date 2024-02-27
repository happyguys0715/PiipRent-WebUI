import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { fromEvent, Subject, Subscription } from 'rxjs';

import { Language } from '@webui/models';
import { TranslateHelperService } from '@webui/core';
import {
  CdkOverlayOrigin,
  Overlay,
  OverlayConfig,
  OverlayModule,
  OverlayRef,
} from '@angular/cdk/overlay';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { TemplatePortal } from '@angular/cdk/portal';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { IconComponent, Icon, IconSize } from '../icon/icon.component';

type Option = {
  value: Language;
  countryCode: 'gb' | 'ee' | 'ru' | 'fi';
};

@Component({
  standalone: true,
  selector: 'webui-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, OverlayModule, IconComponent],
})
export class LanguageSelectorComponent implements OnInit, OnDestroy {
  private overlayRef?: OverlayRef | null;
  private destroy = new Subject<void>();
  private dropdownClosed = new Subject<void>();

  @ViewChild(CdkOverlayOrigin) overlayOrigin?: CdkOverlayOrigin;
  @ViewChild('content') content?: TemplateRef<unknown>;
  @ViewChild('input') input?: ElementRef<HTMLInputElement>;
  @ViewChild('scroller') scroller?: CdkVirtualScrollViewport;

  control: FormControl = new FormControl();
  controlSubscription!: Subscription;
  Language = Language;

  public Icon = Icon;
  public IconSize = IconSize;

  public destroy$ = this.destroy.asObservable();

  readonly languages: Option[] = [
    {
      value: Language.English,
      countryCode: 'gb',
    },
    {
      value: Language.Estonian,
      countryCode: 'ee',
    },
    {
      value: Language.Finnish,
      countryCode: 'fi',
    },
    {
      value: Language.Russian,
      countryCode: 'ru',
    },
  ];

  constructor(
    private translateHelperService: TranslateHelperService,
    private overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    private cd: ChangeDetectorRef
  ) {}

  public get isOpen(): boolean {
    return !!this.overlayRef?.hasAttached();
  }

  ngOnInit() {
    const currentOption = this.languages.find(
      el => el.value === this.translateHelperService.currentLang
    );

    this.control.patchValue(currentOption);
    this.controlSubscription = this.control.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        this.translateHelperService.setLang(lang.value, true);
        this.cd.markForCheck();
      });
  }

  ngOnDestroy() {
    this.controlSubscription.unsubscribe();
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
    this.dropdownClosed.next();
    this.overlayRef = null;
  }

  public setLanguage(lang: Option) {
    this.control.patchValue(lang);
    this.closeDropdown();
  }

  public getIconClass(lang: Option) {
    return {
      fi: true,
      [`fi-${lang.countryCode}`]: true,
    };
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

    this.overlayRef = this.overlay.create(config);
    const dropdownContent = new TemplatePortal<unknown>(
      this.content,
      this.viewContainerRef
    );
    this.overlayRef.attach(dropdownContent);
    this.overlayRef
      .backdropClick()
      .pipe(takeUntil(this.dropdownClosed))
      .subscribe(() => this.closeDropdown());
    fromEvent(window, 'blur')
      .pipe(takeUntil(this.dropdownClosed))
      .subscribe(() => {
        (document.activeElement as HTMLElement)?.blur();

        this.closeDropdown();
      });
  }
}
