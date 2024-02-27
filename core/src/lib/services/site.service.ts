import { Injectable } from '@angular/core';

import { of } from 'rxjs';

import { Page, PageData, PathData } from '@webui/data';

@Injectable({
  providedIn: 'root',
})
export class SiteService {
  public list!: Page[];

  public getDataOfPage(url: any, list: Page[]) {
    return of(this.generateData(list, url));
  }

  public generateData(list: Page[], url: any[]): PageData {
    const pathData: PathData = this.getTypeOfPage(url);
    let element: Page | undefined = this.getElementFromList(
      list,
      pathData.path
    );

    // For job page on client side
    if (pathData.postfix === 'fillin') {
      element = {
        endpoint: '/hr/jobs/',
      } as Page;
    }
    const data: PageData = {
      endpoint: element ? element.endpoint : '/',
      pathData,
    };
    if (pathData.postfix && pathData.postfix !== 'change_username') {
      data.endpoint = data.endpoint + pathData.id + `/${pathData.postfix}/`;
      pathData.id = undefined;
    }
    return data;
  }

  public generatePath(url: string[]): string {
    return `/${url.join('/')}/`;
  }

  public getTypeOfPage(url: Array<{ path: string }>): PathData {
    if (!url.length) {
      return {
        type: 'list',
        path: '/',
      };
    }

    let data: PathData = {} as PathData;
    const urlCopy = url.map(el => {
      return el.path;
    });
    const lastElement = urlCopy.pop();
    if (lastElement === 'add') {
      data = {
        type: 'form',
        path: this.generatePath(urlCopy),
      };
    } else if (
      lastElement === 'change' ||
      lastElement === 'submit' ||
      lastElement === 'fillin'
    ) {
      const id = urlCopy.pop();
      data = {
        type: 'form',
        path: this.generatePath(urlCopy),
        id,
      };
      if (lastElement === 'submit') {
        data.postfix = 'submit';
      }
      if (lastElement === 'fillin') {
        data.postfix = 'fillin';
        data.type = 'list';
      }
    } else if (lastElement === 'profile') {
      urlCopy.push(lastElement);
      data = {
        type: 'form',
        metadataQuery: 'type=profile',
        path: this.generatePath(urlCopy),
      };
    } else if (lastElement === 'map') {
      urlCopy.push(lastElement);
      data = {
        type: 'map',
        path: this.generatePath(urlCopy),
      };
    } else if (lastElement) {
      urlCopy.push(lastElement);
      if (urlCopy.indexOf('settings') > -1) {
        data = <any>{
          type: undefined,
          path: this.generatePath(urlCopy),
        };
      } else {
        data = {
          type: 'list',
          path: this.generatePath(urlCopy),
        };
      }
    }
    return data;
  }

  public getElementFromList(list: Page[], path: string): Page | undefined {
    let element: Page | undefined;
    list.forEach(el => {
      if (el.url === path) {
        if (!element) {
          element = el;
        }
      } else if (el.children.length) {
        if (!element) {
          element = this.getElementFromList(el.children, path);
        }
      }
    });
    return element;
  }
}
