import {
  Component,
  AfterViewInit,
  ViewChild,
  EventEmitter,
  Output,
  Input,
  ChangeDetectionStrategy,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core';

import {
  BehaviorSubject,
  fromEvent,
  merge,
  Subject,
  takeUntil,
  tap,
  debounceTime,
  of,
} from 'rxjs';
import { SignaturePadModule } from 'angular16-signaturepad';
import { CommonModule } from '@angular/common';

const maxWidth = 426;
const getHeight = (width: number) => width / (maxWidth / 208);

@Component({
  standalone: true,
  selector: 'webui-signature',
  templateUrl: 'signature.component.html',
  styleUrls: ['signature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SignaturePadModule, CommonModule],
})
export class SignatureComponent implements OnInit, AfterViewInit, OnDestroy {
  private _destroy = new Subject<void>();
  private _params = new BehaviorSubject<{
    canvasWidth: number;
    canvasHeight: number;
  } | null>(null);

  @Input()
  public supervisorSignature!: string;

  @ViewChild('signaturePad', { static: false }) signatureElement: any;

  @Output()
  public signature: EventEmitter<string> = new EventEmitter();

  public params$ = this._params.asObservable();

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.subscribe();
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  ngAfterViewInit() {
    if (this.supervisorSignature) {
      this.toDataURL(
        this.supervisorSignature,
        this.getSignaturePad().fromDataURL.bind(this),
        'image/png'
      );
    }

    this.clear();
  }

  generateParams() {
    const width = Math.min(maxWidth, this.elementRef.nativeElement.offsetWidth);

    return {
      canvasWidth: width,
      canvasHeight: getHeight(width),
    };
  }

  clear() {
    if (this.getSignaturePad()) {
      this.getSignaturePad().clear();
    }
  }

  drawComplete() {
    if (this.getSignaturePad()) {
      this.signature.emit(this.getSignaturePad().toDataURL());
    }
  }

  toDataURL(
    src: string,
    callback: (data: string) => void,
    outputFormat?: string
  ) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas: any = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.height = this.generateParams().canvasHeight;
      canvas.width = this.generateParams().canvasWidth;
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
    };
  }

  private getSignaturePad() {
    return this.signatureElement?.signaturePad;
  }

  private subscribe() {
    merge(of(true), fromEvent(window, 'resize'))
      .pipe(
        tap(() => this._params.next(null)),
        debounceTime(400),
        takeUntil(this._destroy)
      )
      .subscribe(() => {
        this._params.next(this.generateParams());
      });
  }
}
