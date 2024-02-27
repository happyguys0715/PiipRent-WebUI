import {
  CdkOverlayOrigin,
  Overlay,
  OverlayConfig,
  OverlayModule,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Component,
  ChangeDetectionStrategy,
  TemplateRef,
  ElementRef,
  ViewChild,
  ViewContainerRef,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { fromEvent, Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'webui-overlay-dropdown',
  templateUrl: './overlay-dropdown.component.html',
  styleUrls: ['./overlay-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OverlayModule],
})
export class OverlayDropdownComponent {
  private overlayRef?: OverlayRef | null;
  private dropdownClosed = new Subject<void>();

  @ViewChild(CdkOverlayOrigin) overlayOrigin?: CdkOverlayOrigin;
  @ViewChild('content') content?: TemplateRef<unknown>;
  @ViewChild('input') input?: ElementRef<HTMLInputElement>;

  @Input() size: 'auto' | 'full' = 'auto';
  @Input() placement: 'start' | 'end' = 'start';
  @Input() maxHeight = '20rem';

  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  public get isOpen(): boolean {
    return !!this.overlayRef?.hasAttached();
  }

  constructor(
    private overlay: Overlay,
    public viewContainerRef: ViewContainerRef
  ) {}

  public openDropdown(): void {
    this.createOverlay();
    this.opened.emit();
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
    this.closed.emit();
  }

  private createOverlay() {
    if (!this.overlayOrigin || !this.content) {
      return;
    }

    const config = new OverlayConfig({
      disposeOnNavigation: true,
      width: getComputedStyle(this.overlayOrigin.elementRef.nativeElement)
        .width,
      maxHeight: this.maxHeight,
      backdropClass: 'form-dropdown-control-backdrop',
      hasBackdrop: true,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.overlayOrigin.elementRef)
        .withViewportMargin(8)
        .withLockedPosition()
        .withFlexibleDimensions(true)
        .withPositions([
          {
            originX: this.placement,
            originY: 'bottom',
            overlayX: this.placement,
            overlayY: 'top',
          },
        ]),
    });

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

    if (this.size === 'auto') {
      this.overlayRef.updateSize({
        width: 'auto',
      });
    }
  }
}
