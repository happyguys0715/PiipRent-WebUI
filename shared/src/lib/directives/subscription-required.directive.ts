import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  Optional,
  Renderer2,
} from '@angular/core';
import { SubscriptionService } from '@webui/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil, delay } from 'rxjs';
import { RouterLink, RouterLinkWithHref } from '@angular/router';

@Directive({
  standalone: true,
  selector: '[webuiSubscriptionRequired]',
})
export class SubscriptionRequiredDirective implements OnDestroy, AfterViewInit {
  private _destroy = new Subject<void>();
  private _disabled = false;
  private _initialTitle: string | null = null;
  private _initialDisabled = false;

  constructor(
    private subscriptionService: SubscriptionService,
    private el: ElementRef<HTMLAnchorElement | HTMLButtonElement>,
    private renderer: Renderer2,
    private translateService: TranslateService,
    @Optional() routerLink: RouterLink,
    @Optional() routerLinkWithHref: RouterLinkWithHref
  ) {
    const link = routerLink || routerLinkWithHref;
    if (link) {
      // Save original method
      const onClick = link.onClick;
      // Replace method
      link.onClick = (...args) => {
        if (this._disabled) {
          return routerLinkWithHref ? false : true;
        } else {
          return onClick.apply(link, args);
        }
      };
    }
  }

  public ngAfterViewInit() {
    this._initialTitle = this.el.nativeElement.getAttribute('title');
    this._initialDisabled =
      this.el.nativeElement.classList.contains('disabled');

    this.subscribe();
  }

  public ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  private subscribe(): void {
    this.subscriptionService.activePlan$
      .pipe(delay(150), takeUntil(this._destroy))
      .subscribe(subscription => {
        this._disabled = !subscription;

        if (this._disabled) {
          this.renderer.addClass(this.el.nativeElement, 'disabled');
          this.renderer.setAttribute(
            this.el.nativeElement,
            'title',
            this.translateService.instant('should_have_subscription')
          );
        } else {
          if (!this._initialDisabled) {
            this.renderer.removeClass(this.el.nativeElement, 'disabled');
          }

          if (this._initialTitle) {
            this.renderer.setAttribute(
              this.el.nativeElement,
              'title',
              this._initialTitle
            );
          }
        }
      });
  }

  @HostListener('click', ['$event'])
  @HostListener('touchstart', ['$event'])
  public handleClick(event: MouseEvent | PointerEvent) {
    if (this._disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
