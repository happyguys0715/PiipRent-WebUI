import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  standalone: true,
  selector: '[webuiPlaceAutocomplete]',
})
export class PlaceAutocompleteDirective implements OnInit, OnDestroy {
  private destroy = new Subject<void>();

  @Output() addressChange = new EventEmitter<google.maps.places.PlaceResult>();

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const input = this.el.nativeElement;
    const autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener('place_changed', () => {
      this.addressChange.emit(autocomplete.getPlace());
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
