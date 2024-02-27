import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Observable, Subscriber, combineLatest } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FaIconComponent, SpinnerComponent } from '@webui/ui';

@Component({
  standalone: true,
  selector: 'webui-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslateModule, SpinnerComponent, FaIconComponent],
})
export class ImageUploaderComponent {
  @Input() source?: Array<{ src: string; id: string }> = [];
  @Input() count = 2;
  @Input() loading?: boolean;
  @Output() images: EventEmitter<string[]> = new EventEmitter();
  @Output() remove: EventEmitter<string> = new EventEmitter();

  fileChangeEvent(e: any) {
    const files: FileList = e.target.files;
    const observables: Observable<any>[] = [];

    Array.from(files)
      .slice(
        0,
        this.count - (this.source as Array<{ src: string; id: string }>).length
      )
      .forEach((file: File) => {
        const reader = new FileReader();

        observables.push(
          new Observable(
            (subscriber: Subscriber<string | ArrayBuffer | null>) => {
              reader.onload = () => {
                subscriber.next(reader.result);
                subscriber.complete();
              };
            }
          )
        );

        reader.readAsDataURL(file);
      });

    combineLatest(observables).subscribe(
      (data: string[]) => {
        this.images.emit(data);
      },
      () => console.error('Image upload error')
    );
  }

  onRemove(id: string) {
    this.remove.emit(id);
  }
}
