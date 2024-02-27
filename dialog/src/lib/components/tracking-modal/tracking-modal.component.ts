import { Component, Inject, OnInit } from '@angular/core';

import { isMobile } from '@webui/utilities';
import { Moment, Time } from '@webui/time';
import { CloseButtonComponent } from '@webui/ui';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from '@webui/shared';
import { TimeTrackingComponent } from './time-tracking/time-tracking.component';
import { DIALOG_DATA, DialogRef } from '@webui/models';

@Component({
  standalone: true,
  selector: 'webui-tracking-modal',
  templateUrl: './tracking-modal.component.html',
  styleUrls: ['./tracking-modal.component.scss'],
  imports: [
    CommonModule,
    CloseButtonComponent,
    GoogleMapsModule,
    DateFormatPipe,
    TimeTrackingComponent,
  ],
})
export class TrackingModalComponent implements OnInit {
  // timesheet: any;
  // data!: any[];

  jobsite!: string;
  path!: Array<{ lat: number; lng: number; log_at: string }>;
  breakPath!: Array<{ lat: number; lng: number; log_at: string }>;
  timePoints!: { start: any; end: any; break_start: any; break_end: any };
  center!: google.maps.LatLngLiteral;

  markerPosition?: { lat: number; lng: number };

  markerLatitude?: number;
  markerLongitude?: number;

  timezone!: string;

  timeInstance: any;
  isMobile = isMobile;

  get timesheet() {
    return this.modalData.timesheet;
  }

  constructor(
    private modal: DialogRef<TrackingModalComponent>,
    @Inject(DIALOG_DATA) public modalData: { results: any[]; timesheet: any }
  ) {}

  ngOnInit() {
    this.timezone = this.timesheet.time_zone || this.timesheet.timezone;
    const break_end = this.timesheet.break_ended_at
      ? Time.parse(this.timesheet.break_ended_at, {
          timezone: this.timezone,
        })
      : null;
    const break_start = this.timesheet.break_started_at
      ? Time.parse(this.timesheet.break_started_at, {
          timezone: this.timezone,
        })
      : null;
    const start = Time.parse(this.timesheet.shift_started_at, {
      timezone: this.timezone,
    });
    const end = this.timesheet.shift_ended_at
      ? Time.parse(this.timesheet.shift_ended_at, {
          timezone: this.timezone,
        })
      : start.clone().add(8, 'hour');

    this.timePoints = { start, end, break_start, break_end };
    this.jobsite = this.timesheet.jobsite.__str__;

    this.path = this.modalData.results
      .filter(el => {
        const time = Time.parse(el.log_at, { timezone: this.timezone });

        return start.isBefore(time) && (end ? end.isAfter(time) : true);
      })
      .map(point => {
        return {
          lat: point.latitude,
          lng: point.longitude,
          log_at: point.log_at,
        };
      });

    this.center = {
      lat: this.path[0].lat,
      lng: this.path[0].lng,
    };

    this.breakPath = this.path.filter(el => {
      const time = Time.parse(el.log_at, { timezone: this.timezone });

      return time.isBefore(break_end) && time.isAfter(break_start);
    });

    this.trackingMarkerCoordinates(start);
  }

  dismiss() {
    this.modal.close();
  }

  public trackingMarkerCoordinates(time: Moment) {
    const item = this.path.find(
      el =>
        time.format('hh:mm A') ===
        Time.parse(el.log_at, { timezone: this.timezone }).format('hh:mm A')
    );

    if (item) {
      this.markerPosition = {
        lat: item.lat,
        lng: item.lng,
      };
    }
  }

  public trackByTracking(data: any) {
    return data.log_at;
  }
}
