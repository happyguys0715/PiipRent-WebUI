import {
  Directive,
  Input,
  // ComponentFactoryResolver,
  ViewContainerRef,
  OnInit,
  ComponentRef,
  OnChanges,
  Output,
  EventEmitter,
  Injector,
} from '@angular/core';

import {
  ButtonsWidgetComponent,
  CalendarWidgetComponent,
  CandidateWidgetComponent,
} from '../components';
import { Type } from '../interfaces';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

const components = {
  [Type.Buttons]: ButtonsWidgetComponent,
  [Type.Calendar]: CalendarWidgetComponent,
  [Type.Candidates]: CandidateWidgetComponent,
};

@Directive({
  standalone: true,
  selector: '[webuiWidget]',
})
export class WidgetDirective implements OnInit, OnChanges {
  @Input() public config!: any;

  @Output() public event: EventEmitter<any> = new EventEmitter();

  public component!: ComponentRef<any>;

  constructor(
    // private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}

  public ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.event = this.event;
    }
  }

  public ngOnInit() {
    const component = components[this.config.type as Type];
    // const factory = this.resolver.resolveComponentFactory<any>(component);
    this.component = this.container.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.event = this.event;
  }
}
