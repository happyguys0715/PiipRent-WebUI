import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  Renderer2,
} from '@angular/core';

import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';

@Directive({
  standalone: true,
  selector: '[webuiDropDown]',
})
export class DropdownDirective implements OnInit, OnDestroy {
  @Input() public element: any;
  @Input() public target: any;
  @Input() public update!: Subject<any>;

  public top!: string;
  public dropDownElement: any;
  public scrollHeight!: number;
  public subscription!: Subscription;

  constructor(private el: ElementRef, public renderer: Renderer2) {}

  public ngOnInit() {
    this.subscription = this.update.subscribe(() => {
      setTimeout(() => {
        this.updatePosition();
      }, 10);
    });
  }

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public setPosition(el: any, dropDown: any) {
    const { offsetHeight: dropDownHeight } = dropDown.offsetHeight;
    const { offsetTop: elOffsetTop } = el;
    const parent = this.getParent(el);
    const bottomHeight = this.getBottomHeight(elOffsetTop, 48, parent);

    if (dropDownHeight > bottomHeight && elOffsetTop > dropDownHeight) {
      this.renderer.setStyle(dropDown, 'top', `-${dropDownHeight + 14}px`);
    } else {
      this.renderer.setStyle(this.dropDownElement, 'top', this.top);
    }
  }

  public getTop() {
    if (!this.top) {
      const element = this.getElement();
      const styles = window.getComputedStyle(element);

      this.top = styles.top;
    }
  }

  public updatePosition() {
    this.dropDownElement = this.getElement();

    if (this.dropDownElement) {
      this.getTop();

      this.setPosition(this.el.nativeElement, this.dropDownElement);
    }
  }

  public getBottomHeight(offsetTop: number, height: number, parent: any) {
    let scrollTop = parent.scrollTop;
    let viewport = parent.clientHeight;

    if (parent.classList.contains('r3sourcer')) {
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      viewport = window.innerHeight;
    }

    const topHeight = offsetTop - scrollTop;

    return viewport - topHeight - height;
  }

  public getElement() {
    if (this.target) {
      return this.target.parentNode.querySelector(this.element);
    } else {
      return this.el.nativeElement.querySelector(this.element);
    }
  }

  public getParent(el: any) {
    let parent;
    let testParent = el;
    if (el) {
      do {
        if (
          testParent.classList &&
          (testParent.classList.contains('modal-body') ||
            testParent.classList.contains('r3sourcer'))
        ) {
          parent = testParent;
        }
        testParent = testParent.offsetParent;
      } while (testParent && !parent);
    }

    return parent;
  }
}
