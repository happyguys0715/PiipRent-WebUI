import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';

import { ErrorsService } from '@webui/core';
import { ButtonWidget } from '@webui/data';

import {
  Type,
  Widget,
  UserWidget,
  GridElementType,
  GridElement,
} from '../interfaces';
import { widgetsData } from '../helpers';
import { Endpoints } from '@webui/models';
import { groupBy, sort } from 'ramda';

@Injectable()
export class WidgetService {
  widgets!: Widget[];
  userWidgets?: UserWidget[];
  listsId!: string[];
  params = new HttpParams({ fromObject: { limit: '-1' } });

  constructor(private http: HttpClient, private errorService: ErrorsService) {}

  getWidgets() {
    if (this.widgets) {
      return of(this.widgets);
    }

    return this.http
      .get(Endpoints.DashboardModule, { params: this.params })
      .pipe(
        map((res: any) => {
          if (res.results) {
            const widgets = res.results
              .map((el: any) => {
                const type: Type = el.module_data.model;

                return {
                  id: el.id,
                  type,
                  ...widgetsData[type],
                };
              })
              .filter((el: any) => widgetsData[el.type as Type]);

            this.widgets = widgets;
            return this.widgets;
          }

          return <Widget[]>[];
        }),
        catchError(errors => this.errorService.handleError(errors))
      );
  }

  getUserWidgets(): Observable<UserWidget[]> {
    if (this.userWidgets) {
      return of(this.userWidgets);
    }

    return this.http
      .get(Endpoints.UserDashboardModule, { params: this.params })
      .pipe(
        map((res: any) => {
          const widgets = res.results.filter((el: any) =>
            this.existWidget(this.widgets, el)
          );

          const userWidgets = widgets.map((el: any) => {
            const widget = this.widgets.find(
              item => item.id === el.dashboard_module.id
            ) as Widget;
            const defaultConfig = {
              size: this.getSizes(widget.type),
              coords: this.getPosition(widget.type),
              active: true,
            };
            const config = Object.keys(el.ui_config).length
              ? el.ui_config
              : defaultConfig;
            const target = {
              id: el.id,
              widgetId: el.dashboard_module.id,
              name: widget.name,
              type: widget.type,
              tooltip: false,
              config,
            };

            return target;
          });

          this.userWidgets = userWidgets;
          return userWidgets;
        }),
        catchError(errors => this.errorService.handleError(errors))
      );
  }

  existWidget(widgets: Widget[], userWidget: any) {
    return widgets.some(widget => {
      return widget.id === userWidget.dashboard_module.id;
    });
  }

  getButtons(): ButtonWidget[] {
    return [
      {
        translateKey: 'job',
        link: Endpoints.Job,
        label: 'Jobs',
        description: 'Open full list of jobs',
        add_label: '+ Add new job',
        is_active: true,
      },
      {
        translateKey: 'client_contact',
        link: Endpoints.CompanyContact,
        label: 'Client contacts',
        description: 'Open full list of client contacts',
        add_label: '+ Add new client contact',
        is_active: true,
      },
      {
        translateKey: 'client',
        link: Endpoints.Company,
        label: 'Clients',
        description: 'Open full list of clients',
        add_label: '+ Add new client',
        is_active: true,
      },
      {
        translateKey: 'candidates',
        link: Endpoints.CandidateContact,
        label: 'Candidates',
        description: 'Open full list of candidates',
        add_label: '+ Add new candidate contact',
        is_active: true,
      },
    ];
  }

  addWidget(widgetId: string | null, contactId: string, config: any = {}) {
    if (!widgetId) {
      return throwError('error');
    }

    const body = {
      company_contact: contactId,
      dashboard_module: widgetId,
      position: 1,
      ui_config: config,
    };

    return this.http
      .post(Endpoints.UserDashboardModule, body)
      .pipe(catchError(errors => this.errorService.handleError(errors)));
  }

  removeWidget(id: string) {
    return this.http
      .delete(`${Endpoints.UserDashboardModule}${id}/`)
      .pipe(catchError(errors => this.errorService.handleError(errors)));
  }

  updateWidget(id: string, body: { ui_config: any }) {
    return this.http
      .patch(`${Endpoints.UserDashboardModule}${id}/`, body)
      .pipe(catchError(errors => this.errorService.handleError(errors)));
  }

  generateGrid(widgets: UserWidget[]) {
    this.listsId = [];

    const grid = {
      type: GridElementType.Column,
      elements: [],
    };

    return this.generateGridElements(grid, widgets);
  }

  updateCoords(grid: GridElement | null) {
    if (!grid) {
      return;
    }

    this.parseGrid(grid);
    this.updateElementsId(grid.elements, grid.id);
    this.listsId = [];
    this.updateListIds(grid.elements);
  }

  getSizes(type: Type) {
    const sizes = {
      [Type.Buttons]: 4 / 12,
      [Type.Calendar]: 8 / 12,
      [Type.Candidates]: 4 / 12,
    };

    return sizes[type];
  }

  getPosition(type: Type) {
    const coords = {
      [Type.Buttons]: '00',
      [Type.Calendar]: '11',
      [Type.Candidates]: '10',
    };

    return coords[type];
  }

  updateDashboard() {
    this.userWidgets = undefined;
  }

  getCounterWidgetData(
    id: string,
    params: { started_at_0: string; started_at_1: string }
  ) {
    const httpParams = new HttpParams({ fromObject: params });

    return this.http
      .get(`${Endpoints.CandidateCounter}${id}/`, {
        params: httpParams,
      })
      .pipe(
        map((data: any) => {
          const currency = data.currency.toUpperCase();
          const shifts = data.shifts_total;
          const { total_earned, ...skillActivities } = data.skill_activities;
          const activities = [];

          activities.push({
            key: 'hourly_work',
            label: 'Hourly work',
            translations: [],
            uom: 'h',
            unapproved: data.hourly_work.unpaid_hours,
            amount: data.hourly_work.total_hours,
            earned: data.hourly_work.total_earned,
          });

          Object.keys(skillActivities).forEach(name => {
            const item = skillActivities[name];

            activities.push({
              label: name,
              translations: item.translations,
              uom: item.uom.short_name,
              amount: item.value_sum,
              earned: item.earned_sum,
              unapproved: item.unpaid_value_sum,
            });
          });

          return {
            currency,
            activities,
            shifts,
            total: activities
              .map(activity => activity.earned)
              .reduce((prev, next) => parseFloat(prev) + parseFloat(next), 0),
          };
        })
      );
  }

  private parseGrid(gridElement: GridElement) {
    const { type, id } = gridElement;
    let { elements } = gridElement;

    if (type !== GridElementType.Widget) {
      elements = this.removeEmptyElements(gridElement);

      elements = this.checkMainColumnElements(type, elements, id);
      elements = this.checkOnSingleColumn(type, elements);
      // elements = this.checkRowElements(type, elements);

      gridElement.elements = elements;
      elements = this.removeEmptyElements(gridElement);

      if (elements && elements.length > 0) {
        elements.forEach(grid => this.parseGrid(grid));
      }
    }
  }

  private removeEmptyElements(element: GridElement) {
    return element.elements?.filter(gridElement => {
      if (gridElement.type === GridElementType.Widget) {
        return true;
      }

      return gridElement.elements && gridElement.elements.length;
    });
  }

  private updateElementsId(elements?: GridElement[], parentId?: string) {
    if (!elements) {
      return;
    }

    elements.forEach((el, index) => {
      if (el.widget && el.type === GridElementType.Widget) {
        el.id = this.getId(index, parentId);
        el.widget.config.coords = this.getId(index, parentId);

        return;
      }

      Object.assign(el, { id: this.getId(index, parentId) });
      this.updateElementsId(el.elements, el.id);
    });
  }

  private getId(index: number, parentId?: string) {
    return parentId !== undefined ? parentId + index + '' : index.toString();
  }

  private checkMainColumnElements(
    type: GridElementType,
    elements?: GridElement[],
    parentId?: string
  ): GridElement[] | undefined {
    if (!elements) {
      return elements;
    }

    if (type === GridElementType.Column && !parentId) {
      return elements.map((el, i) => {
        const id = i.toString();

        if (el.type === GridElementType.Widget) {
          return {
            id,
            type: GridElementType.Row,
            elements: [el],
          };
        }

        return { ...el, id };
      });
    }

    return elements;
  }

  private checkRowElements(
    type: GridElementType,
    elements?: GridElement[]
  ): GridElement[] | undefined {
    if (type === GridElementType.Row && elements && elements.length > 1) {
      return elements.map((el, i) => {
        const id = i.toString();
        if (el.type === GridElementType.Column) {
          return { ...el, id };
        }

        return {
          type: GridElementType.Column,
          elements: [el],
          id,
        };
      });
    }

    return elements;
  }

  private checkOnSingleColumn(
    type: GridElementType,
    elements?: GridElement[]
  ): GridElement[] | undefined {
    if (!elements) {
      return elements;
    }

    if (
      type === GridElementType.Row &&
      elements.length === 1 &&
      elements[0].type === GridElementType.Column
    ) {
      return elements[0].elements;
    }

    return elements;
  }

  private generateGridElements(
    gridElement: GridElement,
    widgets: UserWidget[]
  ) {
    const rows = new Set<string>();
    const groups = new Map<string, GridElement[]>();
    const widgetElements: GridElement[] = widgets.map(widget => ({
      id: widget.config.coords,
      type: GridElementType.Widget,
      widget,
    }));

    widgetElements.forEach(el => rows.add(el.id?.[0] as string));

    Array.from(rows.values()).forEach(row => {
      const rowItems = widgetElements.filter(widget => widget.id?.[0] === row);

      groups.set(
        row,
        sort(
          (prev, next) => ((prev.id as string) > (next.id as string) ? 1 : -1),
          rowItems
        )
      );
    });

    const elements = Array.from(groups.entries()).map(([id, widgets]) => ({
      id,
      type: GridElementType.Row,
      elements: widgets,
    }));

    this.updateListIds(elements);

    return {
      ...gridElement,
      elements,
    };
  }

  private updateListIds(elements?: GridElement[]) {
    elements?.forEach(el => {
      if (el.id && el.type !== GridElementType.Widget) {
        this.listsId.push(el.id);
      }

      this.updateListIds(el.elements);
    });
  }
}
