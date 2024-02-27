import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { AverageScoreColor } from '@webui/data';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Directive({
  standalone: true,
  selector: '[webuiAverageScore]',
  providers: [TranslateModule, CommonModule],
})
export class AverageScoreDirective implements OnInit {
  @Input() webuiAverageScore!: number | string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  public ngOnInit(): void {
    let score = this.webuiAverageScore || 0;

    if (typeof score === 'string') {
      score = Math.floor(parseFloat(score));
    }

    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'color',
      AverageScoreColor[score]
    );
  }
}
