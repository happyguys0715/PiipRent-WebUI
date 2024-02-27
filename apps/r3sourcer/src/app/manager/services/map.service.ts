import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map } from 'rxjs/operators';

import { ErrorsService } from '@webui/core';

export interface MarkerResponse {
  latitude: string;
  longitude: string;
  name: string;
  type: string; // 'client_hq' | 'jobsite' | 'jobsite_open' | 'client'
  contact: {
    name: string;
    phone_mobile: string;
  };
  __str__: string;
}

export class Marker {
  position: {
    lat: number;
    lng: number;
  };
  contact: {
    phone_mobile: string;
    name: string;
  };
  name: string;
  type: string;
  __str__: string;

  constructor(payload: MarkerResponse) {
    this.position = {
      lat: parseFloat(payload.latitude),
      lng: parseFloat(payload.longitude),
    };
    this.contact = payload.contact;
    this.name = payload.name;
    this.type = payload.type;
    this.__str__ = payload.__str__;
  }
}

const filters = [
  {
    key: 'filter_by',
    label: 'By Type',
    options: [
      {
        value: 'clients',
        label: 'All Clients',
      },
      {
        value: 'only_hqs',
        label: 'Only Client HQs',
      },
      {
        value: 'jobsites',
        label: 'All Jobsites',
      },
    ],
    query: 'filter_by',
    default: null,
    type: 'select',
  },
  {
    key: 'jobsite',
    label: 'Jobsite',
    type: 'related',
    data: {
      value: '__str__',
      endpoint: '/hr/jobsites/',
      key: 'id',
    },
    query: 'jobsite',
  },
  {
    key: 'client',
    label: 'Client',
    type: 'related',
    data: {
      value: '__str__',
      endpoint: '/core/companies/',
      key: 'id',
    },
    query: 'client',
  },
  {
    key: 'primary_contact',
    label: 'Client Contact',
    type: 'related',
    data: {
      value: '__str__',
      endpoint: '/core/companycontacts/',
      key: 'id',
    },
    query: 'primary_contact',
  },
  {
    key: 'portfolio_manager',
    label: 'Portfolio Manager',
    type: 'related',
    data: {
      value: '__str__',
      endpoint: '/core/companycontacts/?master_company=current',
      key: 'id',
    },
    query: 'portfolio_manager',
  },
];

@Injectable()
export class MapService {
  public endpoint = '/hr/jobsites/jobsite_map/';

  constructor(private http: HttpClient, private errors: ErrorsService) {}

  public getPositions(query = '') {
    return this.http.get<MarkerResponse[]>(this.endpoint + query).pipe(
      map(response => response.map(el => new Marker(el))),
      catchError(error => this.errors.handleError(error))
    );
  }

  public getFilters() {
    return filters;
  }
}
