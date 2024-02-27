import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'webui-evaluate-field',
  templateUrl: './evaluate-field.component.html',
  styleUrls: ['./evaluate-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgbRating, TranslateModule, FormsModule],
})
export class EvaluateFieldComponent implements OnInit {
  @Input() evaluated!: boolean;
  @Input() evaluatedScore!: string;
  score!: number;
  hovered: any;

  ngOnInit() {
    this.score = parseInt(this.evaluatedScore) || 0;
  }
}
