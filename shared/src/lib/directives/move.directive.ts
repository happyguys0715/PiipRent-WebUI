import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  HostListener,
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[webuiMove]',
})
export class MoveDirective {
  public elem: any;
  public offsetTop: any;
  public offsetLeft: any;

  @Input()
  public parent: any;

  @Output()
  public active: EventEmitter<any> = new EventEmitter();

  public isMovable = false;

  public pos: any = { x: 0, y: 0 };

  constructor(private el: ElementRef) {
    this.elem = el.nativeElement;
  }

  @HostListener('mousedown', ['$event'])
  public onMouseDown() {
    this.down();
  }

  @HostListener('document:mousemove', ['$event'])
  public onMouseMove($event: MouseEvent) {
    this.move($event);
  }

  @HostListener('document:mouseup', ['$event'])
  public onMouseUp() {
    this.end();
  }

  @HostListener('touchstart')
  public onTouchStart() {
    this.down();
  }

  @HostListener('document:touchmove', ['$event'])
  public onToucMove($event: MouseEvent) {
    this.move($event);
  }

  @HostListener('touchstart')
  public onTouchEnd() {
    this.end();
  }

  public updatePosition(x: number = 0, y: number = 0) {
    this.pos.x += x;
    this.pos.y += y;

    this.parent.style.left = this.pos.x + this.offsetLeft + 'px';
    this.parent.style.top = this.pos.y + this.offsetTop + 'px';
  }

  public down() {
    this.offsetTop = this.parent.offsetTop;
    this.offsetLeft = this.parent.offsetLeft;
    this.updatePosition();
    this.isMovable = true;
    this.elem.style.cursor = 'move';
    this.active.emit(true);
  }

  public move($event: MouseEvent) {
    if (!this.isMovable) {
      return;
    }
    this.updatePosition($event.movementX, $event.movementY);
  }

  public end() {
    this.isMovable = false;
    this.pos.x = 0;
    this.pos.y = 0;
    this.elem.style.cursor = 'default';
  }
}
