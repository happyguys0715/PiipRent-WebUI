import { Injectable } from '@angular/core';

@Injectable()
export class ListStorageService {
  private trackingStorage: { [key: string]: boolean } = {};

  getTrackingInfo(id: string): boolean {
    return this.trackingStorage[id];
  }

  updateTrackingInfo(id: string, value: boolean) {
    this.trackingStorage[id] = value;
  }

  hasTrackingInfo(id: string): boolean {
    return id in this.trackingStorage;
  }
}
