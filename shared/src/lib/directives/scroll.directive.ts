import {
  Directive,
  HostListener,
  ElementRef,
  Input,
  AfterViewInit,
  Renderer2,
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[webuiScroll]',
})
export class ScrollDirective implements AfterViewInit {
  public offsetTop: number;

  @Input() public enable!: boolean;

  constructor(private el: ElementRef, public renderer: Renderer2) {
    this.offsetTop = el.nativeElement.offsetTop;
  }

  public ngAfterViewInit() {
    this.offsetTop = this.el.nativeElement.offsetTop;
  }

  @HostListener('document:scroll') public onScroll() {
    if (this.enable) {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      if (scrollTop + 85 >= this.offsetTop) {
        this.renderer.addClass(this.el.nativeElement, 'scrolled');
      } else {
        this.renderer.removeClass(this.el.nativeElement, 'scrolled');
      }
    }
  }
}
