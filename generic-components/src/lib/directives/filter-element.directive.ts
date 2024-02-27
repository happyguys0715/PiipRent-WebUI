import {
  ComponentRef,
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';
import {
  FilterDateComponent,
  FilterLimitComponent,
  FilterMultipleComponent,
  FilterRangeComponent,
  FilterRelatedComponent,
  FilterSelectComponent,
} from '../components';

const components: Record<string, any> = {
  date: FilterDateComponent,
  checkbox: FilterMultipleComponent,
  related: FilterRelatedComponent,
  select: FilterSelectComponent,
  text: FilterRangeComponent,
  multiple: FilterMultipleComponent,
  range: FilterLimitComponent,
};

@Directive({
  standalone: true,
  selector: '[webuiFilterElement]',
})
export class FilterElementDirective implements OnInit, OnChanges {
  @Input()
  public config: any;

  @Output()
  public event: EventEmitter<any> = new EventEmitter();

  public component!: ComponentRef<any>;

  constructor(private container: ViewContainerRef) {}

  public ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.event = this.event;
    }
  }

  public ngOnInit() {
    if (this.config.type !== 'search') {
      const component = components[this.config.type];
      this.component = this.container.createComponent(component);
      this.component.instance.config = this.config;
      this.component.instance.event = this.event;
    }
  }
}
