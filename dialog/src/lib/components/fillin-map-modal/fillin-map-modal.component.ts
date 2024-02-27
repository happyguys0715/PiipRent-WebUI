import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  GoogleMapsModule,
  MapInfoWindow,
  MapMarker,
} from '@angular/google-maps';
import { BLUE_MARKER_SRC, RED_MARKER_SRC } from '@webui/time';
import { getPropValue } from '@webui/utilities';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DIALOG_DATA, DialogRef, Modal } from '@webui/models';
import { BaseModalComponent } from '../base-modal/base-modal.component';

type MapPosition = google.maps.LatLngLiteral | google.maps.LatLng;

type Marker = {
  position: MapPosition;
  iconUrl: string;
  name?: string;
  description?: string;
  id?: string;
  selected?: boolean;
};

@Component({
  standalone: true,
  selector: 'webui-fillin-map-modal',
  templateUrl: './fillin-map-modal.component.html',
  styleUrls: ['./fillin-map-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, GoogleMapsModule, BaseModalComponent],
})
export class FillinMapComponent
  extends Modal
  implements OnInit, AfterViewInit, OnDestroy
{
  private _destroy = new Subject<void>();

  public markers!: Marker[];
  public mapCenter!: MapPosition;

  public activeMarker?: Marker;

  // data!: any[];
  // supportData!: {
  //   __str__: string;
  //   latitude: number;
  //   longitude: number;
  //   address: string;
  // };
  // markerClick!: (marker: Marker) => void;
  // select!: Record<string, boolean>;

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  constructor(
    modal: DialogRef,
    @Inject(DIALOG_DATA)
    public modalData: {
      results: any[];
      markerClick: (marker: Marker) => void;
      select: Record<string, boolean>;
      supportData: {
        __str__: string;
        latitude: number;
        longitude: number;
        address: string;
      };
    }
  ) {
    super(modal);
  }

  ngOnInit(): void {
    this.prepareMap();
  }

  ngAfterViewInit(): void {
    this.infoWindow.closeclick.pipe(takeUntil(this._destroy)).subscribe(() => {
      this.activeMarker = undefined;
    });
  }

  open(marker: Marker, anchor: MapMarker) {
    this.activeMarker = marker;
    this.infoWindow.open(anchor);
  }

  private prepareMap() {
    const markers: Marker[] = [];

    this.modalData.results.forEach(el => {
      const address = el.contact.contact_address[0];

      markers.push({
        position: {
          lat: parseFloat(getPropValue(address, 'address.latitude') as string),
          lng: parseFloat(getPropValue(address, 'address.longitude') as string),
        },
        name: getPropValue(el, 'contact.__str__') as string,
        description: getPropValue(address, 'address.__str__') as string,
        iconUrl: BLUE_MARKER_SRC,
        id: getPropValue(el, 'id') as string,
        selected: this.modalData.select[getPropValue(el, 'id') as string],
      });
    });

    markers.push({
      position: {
        lat: this.modalData.supportData.latitude,
        lng: this.modalData.supportData.longitude,
      },
      name: this.modalData.supportData.__str__,
      description: this.modalData.supportData.address,
      iconUrl: RED_MARKER_SRC,
    });

    this.markers = markers;

    this.mapCenter = {
      lat: this.modalData.supportData.latitude,
      lng: this.modalData.supportData.longitude,
    };
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
}
