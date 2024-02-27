import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { FaIconComponent } from '../fa-icon/fa-icon.component';
import { OverlayDropdownComponent } from '../overlay-dropdown/overlay-dropdown.component';

type ActiveActions = {
  prev: boolean;
  next: boolean;
};

@Component({
  selector: 'webui-pagination',
  standalone: true,
  imports: [CommonModule, FaIconComponent, OverlayDropdownComponent],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnChanges {
  private dropdownOpened = new BehaviorSubject<boolean>(false);
  private pages = new BehaviorSubject<number[]>([]);
  private activeActions = new BehaviorSubject<ActiveActions>({
    prev: true,
    next: true,
  });

  @Input() page = 1;
  @Input() size = 10;
  @Input() count = 1;
  @Input() label = '';
  @Output() pageChange = new EventEmitter<number>();

  @ViewChild(OverlayDropdownComponent) dropdown!: OverlayDropdownComponent;

  readonly pages$ = this.pages.asObservable();
  readonly activeActions$ = this.activeActions.asObservable();
  readonly dropdownOpened$ = this.dropdownOpened.asObservable();

  public setPage(page: number) {
    if (page === this.page) {
      return;
    }

    this.pageChange.emit(page);
    this.updateActiveActions(page);
    this.dropdown.closeDropdown();
  }

  public nextPage() {
    const nextPage = this.page + 1;

    if (nextPage <= this.pages.value.length) {
      this.setPage(nextPage);
    }
  }

  public prevPage() {
    const nextPage = this.page - 1;

    if (nextPage > 0) {
      this.setPage(nextPage);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('size' in changes) {
      this.generatePagination(changes['size'].currentValue || 10);
    }
  }

  public onOpen() {
    this.dropdownOpened.next(true);
  }

  public onClose() {
    this.dropdownOpened.next(false);
  }

  private generatePagination(pages: number) {
    const count = Math.ceil(pages / 10);
    const view = Array(count)
      .fill(null)
      .map((_, index) => index + 1);

    this.pages.next(view);
    this.updateActiveActions(this.page);
  }

  private updateActiveActions(page: number) {
    const pages = this.pages.value.length;

    if (pages === 1) {
      this.activeActions.next({ prev: false, next: false });
    } else if (page === pages) {
      this.activeActions.next({ prev: true, next: false });
    } else if (page === 1) {
      this.activeActions.next({ prev: false, next: true });
    } else {
      this.activeActions.next({ prev: true, next: true });
    }
  }

  protected readonly length = length;
}
