import {
  ConnectedPosition,
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  Attribute,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
} from '@angular/core';
import { TooltipComponent } from '../components';
import { Subject, takeUntil, timer } from 'rxjs';

type TooltipPosition =
  | 'right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'left-top'
  | 'right-top';

@Directive({
  selector: '[webuiTooltip]',
  standalone: true,
  exportAs: '[webuiTooltip]',
})
export class TooltipDirective implements OnDestroy {
  private destroy = new Subject<void>();
  private overlay = inject(Overlay);
  private elementRef = inject(ElementRef);
  private overlayRef?: OverlayRef;
  private readonly hasCloseButton: boolean;
  private readonly darkTheme: boolean;
  private readonly flat: boolean;

  @Input() webuiTooltip?: unknown;
  @Input() trigger: 'mouseover' | 'click' | 'manual' = 'mouseover';
  @Input() placement: TooltipPosition = 'right';
  @Input() tooltipClass?: string;
  @Input() useReposition = true;

  @Output() shown = new EventEmitter<TooltipDirective>();
  @Output() hidden = new EventEmitter<void>();

  constructor(
    @Attribute('hasCloseButton') hasCloseButton: boolean,
    @Attribute('darkTheme') darkTheme: boolean,
    @Attribute('flat') flat: boolean
  ) {
    this.hasCloseButton = hasCloseButton !== null;
    this.darkTheme = darkTheme !== null;
    this.flat = flat !== null;
  }

  ngOnDestroy(): void {
    this.detach();
    this.destroy.next();
    this.destroy.complete();
  }

  public show() {
    if (!this.overlayRef) {
      this.attach();
    }
  }

  public hide() {
    if (this.overlayRef) {
      this.detach();
    }
  }

  private attach() {
    if (!this.webuiTooltip) {
      return;
    }

    this.overlayRef = this.overlay.create(this.getConfig());
    const tooltipPortal = new ComponentPortal(TooltipComponent);
    const compRef = this.overlayRef.attach(tooltipPortal);

    this.overlayRef.backdropClick().subscribe(() => this.hide());
    this.overlayRef.detachments().subscribe(() => this.hide());

    if (typeof this.webuiTooltip === 'string') {
      compRef.instance['message'] = this.webuiTooltip;
    }

    if (this.webuiTooltip instanceof TemplateRef) {
      compRef.instance['templateRef'] = this.webuiTooltip;
    }

    if (this.hasCloseButton) {
      compRef.instance['onClose'] = () => this.detach();
    }

    if (this.darkTheme) {
      compRef.instance['dark'] = true;
    }

    if (this.flat) {
      compRef.instance['flat'] = true;
    }

    this.shown.emit(this);
  }

  public reposition() {
    timer(100)
      .pipe(takeUntil(this.destroy))
      .subscribe(() => {
        this.overlayRef?.updatePosition();
      });
  }

  public close(): void {
    this.detach();
  }

  private detach() {
    this.hidden.emit();
    this.overlayRef?.detach();
    this.overlayRef?.dispose();
    this.overlayRef = undefined;
  }

  @HostListener('mouseenter')
  onMouseOver() {
    if (!this.overlayRef && this.trigger === 'mouseover') {
      this.attach();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.overlayRef && this.trigger === 'mouseover') {
      this.detach();
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.stopPropagation();

    if (this.trigger === 'click') {
      this.overlayRef ? this.detach() : this.attach();
    }
  }

  private getConfig() {
    const config = new OverlayConfig({
      disposeOnNavigation: true,
      width: 'fit-content',
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.elementRef)
        .withGrowAfterOpen(true)
        .withPositions(this.getPosition(this.placement)),
      scrollStrategy: this.useReposition
        ? this.overlay.scrollStrategies.reposition()
        : this.overlay.scrollStrategies.close(),
    });

    if (this.trigger === 'click') {
      config.hasBackdrop = true;
      config.backdropClass = 'opacity-0';
    }

    return config;
  }

  private getPosition(placement: TooltipPosition): ConnectedPosition[] {
    switch (placement) {
      case 'bottom': {
        return [
          {
            originX: 'center',
            originY: 'bottom',
            overlayX: 'center',
            overlayY: 'top',
            offsetY: 8,
          },
        ];
      }

      case 'bottom-left':
        return [
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
            offsetY: 8,
          },
        ];

      case 'bottom-right':
        return [
          {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top',
            offsetY: 8,
          },
        ];

      case 'right':
      case 'right-top':
        return [
          {
            originX: 'end',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'top',
            offsetX: 8,
          },
        ];

      case 'left-top':
        return [
          {
            originX: 'start',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'top',
            offsetX: -8,
          },
        ];

      case 'left':
        return [
          {
            originX: 'start',
            originY: 'center',
            overlayX: 'end',
            overlayY: 'center',
            offsetX: -8,
          },
        ];

      default:
        return [
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
          },
        ];
    }
  }
}
