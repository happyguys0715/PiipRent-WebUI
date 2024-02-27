import { Component, OnDestroy, OnInit } from '@angular/core';

import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import {
  GridElement,
  GridElementType,
  Type,
  UserWidget,
  Widget,
} from './interfaces';
import { WidgetService } from './services/widget.service';
import { UserService } from '@webui/core';

import { DashboardMenuComponent, WidgetItem } from './components';
import {
  BehaviorSubject,
  finalize,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { map, sort } from 'ramda';
import { CommonModule } from '@angular/common';
import { FaIconComponent, LoaderComponent, TooltipDirective } from '@webui/ui';
import { TranslateModule } from '@ngx-translate/core';
import { WidgetDirective } from './directives';

@Component({
  standalone: true,
  selector: 'webui-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    CommonModule,
    LoaderComponent,
    DragDropModule,
    FaIconComponent,
    TranslateModule,
    WidgetDirective,
    DashboardMenuComponent,
    TooltipDirective,
  ],
  providers: [WidgetService],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private _destroy = new Subject<void>();
  private _loading = new BehaviorSubject<boolean>(false);
  private _grid = new BehaviorSubject<GridElement | null>(null);
  private _moving = new BehaviorSubject<boolean>(false);

  userWidgets!: UserWidget[];
  widgets!: Widget[];
  widgetList!: WidgetItem[];

  GridElementType = GridElementType;

  loading$ = this._loading.asObservable();
  grid$ = this._grid.asObservable();
  moving$ = this._moving.asObservable();
  userWidgets$ = this.widgetService.getUserWidgets().pipe(
    tap(userWidgets => (this.userWidgets = userWidgets)),
    takeUntil(this._destroy)
  );
  widgets$ = this.widgetService.getWidgets().pipe(
    tap(widgets => (this.widgets = widgets)),
    takeUntil(this._destroy)
  );

  constructor(
    private userService: UserService,
    private widgetService: WidgetService
  ) {}

  ngOnInit() {
    this.initializeDashboard();
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  getColumnWidth(gridElement: GridElement): { [key: string]: any } {
    const style: Record<string, any> = {};

    if (gridElement.type === GridElementType.Column && gridElement.id) {
      const elements = gridElement.elements;

      if (!elements) {
        return style;
      }

      elements.forEach((el: GridElement) => {
        if (el.type === GridElementType.Widget) {
          if (!el.widget) {
            return;
          }

          const size = el.widget.config.size * 100;

          if (el.widget.config.active) {
            style['flexBasis'] = size + '%';
          } else {
            style['flex'] = 0;
          }

          // style['flex'] = Math.max(style['flex'] || 0, size);
          // style['flexGrow'] = size;
        }
      });
    }

    return style;
  }

  isActive(gridElement: GridElement): boolean {
    if (gridElement.type === GridElementType.Column && gridElement.id) {
      const elements = gridElement.elements;

      if (!elements) {
        return false;
      }

      return elements.some(el => {
        if (el.type === GridElementType.Widget) {
          return el.widget?.config.active;
        }

        return false;
      });
    }

    return true;
  }

  isMove(gridElement: GridElement): boolean {
    if (gridElement.type === GridElementType.Widget) {
      return gridElement.widget?.move || false;
    }

    return false;
  }

  getId(gridElement: GridElement) {
    if (gridElement.id) {
      return `list-${gridElement.id}`;
    }

    return '';
  }

  getlistsId() {
    const diff = (a: string, b: string) => (a > b ? -1 : 1);
    const ids = sort(diff, this.widgetService.listsId);

    return [...map(el => `list-${el}`, ids), 'main-list'];
  }

  toggleActions(tooltip: TooltipDirective, widget: any) {
    widget.tooltip = !widget.tooltip;

    if (widget.tooltip) {
      tooltip.show();
    } else {
      tooltip.hide();
    }
  }

  moveWidget(tooltip: TooltipDirective, widget: UserWidget) {
    tooltip.hide();
    widget.tooltip = false;
    widget.move = !widget.move;
  }

  removeWidget(tooltip: TooltipDirective, widget: UserWidget) {
    tooltip.hide();
    widget.tooltip = false;

    this.widgetService.removeWidget(widget.id).subscribe(() => {
      this.userWidgets = this.userWidgets.filter(el => el.id !== widget.id);
      this.generateDashboard(this.userWidgets);
      this.widgetService.updateCoords(this._grid.value);
      this.updateWidgetsConfig();
      this.updateWidgetList();
    });
  }

  addWidget(widget: Widget) {
    const contactId = this.userService.user?.data.contact.contact_id;

    if (!contactId) {
      return;
    }

    const config = {
      coords: this._grid.value?.elements?.length + '0',
      size: this.widgetService.getSizes(widget.type),
      active: true,
    };

    this._grid.next(null);
    this._loading.next(true);
    this.widgetService
      .addWidget(widget.id, contactId, config)
      .pipe(tap(() => this._loading.next(false)))
      .subscribe({
        next: () => {
          this.widgetService.updateDashboard();
          this.updateWidgetsConfig();
          this.initializeDashboard();
        },
        error: () => {
          this.initializeDashboard();
        },
      });
  }

  isArray(el: any) {
    return Array.isArray(el);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    this.widgetService.updateCoords(this._grid.value);
    this.userWidgets.forEach(el => {
      el.move = false;
    });
    this._moving.next(false);
    this.updateWidgetsConfig();
  }

  onDragStarted() {
    this._moving.next(true);
  }

  updateUserWidgets(target: WidgetItem) {
    const userWidget = this.userWidgets.find(
      el => el.widgetId === target.widgetId
    );

    if (userWidget) {
      userWidget.config.active = target.active;

      this.widgetService
        .updateWidget(userWidget.id, { ui_config: userWidget.config })
        .subscribe(() => {
          this.updateWidgetList();
        });
    } else {
      const widget = this.widgets.find(el => el.id === target.widgetId);

      if (widget) {
        this.addWidget(widget);
      }
    }
  }

  private updateWidgetList() {
    this.widgetList = this.widgets.map(widget => {
      const { name, id } = widget;
      const userWidget = this.userWidgets.find(el => el.widgetId === id);
      const active = userWidget?.config ? userWidget.config.active : false;

      return {
        widgetId: id,
        name,
        id: userWidget?.id || null,
        active,
        translateKey: `widget.${name?.toLowerCase()}`,
      };
    });
  }

  private initializeDashboard() {
    this._loading.next(true);
    this.widgets$
      .pipe(
        switchMap(() => this.userWidgets$),
        finalize(() => this._loading.next(false))
      )
      .subscribe(userWidgets => {
        if (!this.widgets.length) {
          return;
        }

        this.generateDashboard(userWidgets);

        // After optimization
        this.updateWidgetList();
      });
  }

  private updateWidgetsConfig() {
    this.userWidgets.forEach((widget: UserWidget) => {
      this.widgetService
        .updateWidget(widget.id, { ui_config: widget.config })
        .subscribe();
    });
  }

  private generateDashboard(widgets: UserWidget[]): any {
    const types = Object.values(Type);
    const availableWidgets = widgets.filter(el => types.includes(el.type));

    this._grid.next(this.widgetService.generateGrid(availableWidgets));
  }
}
