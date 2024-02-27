import { TemplateRef, ViewContainerRef } from '@angular/core';
import {
  CdkOverlayOrigin,
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

export class Dropdown {
  constructor(
    public overlayOrigin: CdkOverlayOrigin,
    public content: TemplateRef<any>
  ) {}

  public overlayRef?: OverlayRef | null;

  public openDropdown(
    overlay: Overlay,
    viewContainerRef: ViewContainerRef,
    payload: any
  ): void {
    this.createOverlay(overlay, viewContainerRef, payload);
  }

  public closeDropdown(): void {
    if (!this.overlayRef) {
      return;
    }

    this.overlayRef.dispose();
    this.overlayRef.detach();
  }

  public createOverlay(
    overlay: Overlay,
    viewContainerRef: ViewContainerRef,
    payload: any
  ) {
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

    config.positionStrategy = overlay
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

    this.overlayRef = overlay.create(config);
    const dropdownContent = new TemplatePortal(this.content, viewContainerRef, {
      payload,
    });
    this.overlayRef.attach(dropdownContent);

    this.overlayRef.backdropClick().subscribe(() => this.closeDropdown());
  }
}
