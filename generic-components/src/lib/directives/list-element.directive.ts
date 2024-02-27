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

import { InfoComponent } from '@webui/ui';
import {
  ButtonGroupComponent,
  FormButtonComponent,
  ListAvailableComponent,
  ListCheckboxComponent,
  ListColumnComponent,
  ListFillinTagsComponent,
  ListFormComponent,
  ListImageComponent,
  ListImageListComponent,
  ListInfoComponent,
  ListLinkComponent,
  ListSkillActivityComponent,
  ListSkillsComponent,
  ListTagsComponent,
  ListTextComponent,
} from '../components';

const components: Record<string, any> = {
  text: ListTextComponent,
  column: ListColumnComponent,
  link: ListLinkComponent,
  input: ListTextComponent,
  static: ListTextComponent,
  checkbox: ListCheckboxComponent,
  select: ListCheckboxComponent,
  button: FormButtonComponent,
  datetime: ListTextComponent,
  related: ListTextComponent,
  picture: ListImageComponent,
  icon: ListImageComponent,
  date: ListTextComponent,
  time: ListTextComponent,
  datepicker: ListTextComponent,
  textarea: ListTextComponent,
  info: ListInfoComponent,
  tags: ListTagsComponent,
  skills: ListSkillsComponent,
  description: InfoComponent,
  fillintags: ListFillinTagsComponent,
  available: ListAvailableComponent,
  buttonGroup: ButtonGroupComponent,
  form: ListFormComponent,
  skillactivity: ListSkillActivityComponent,
  imageList: ListImageListComponent,
};

@Directive({
  standalone: true,
  selector: '[webuiListElement]',
})
export class ListElementDirective implements OnInit, OnChanges {
  @Input()
  public config!: any;

  @Input()
  public last!: boolean;

  @Input()
  public length!: number;

  @Input()
  public head!: boolean;

  @Input()
  public padding!: boolean;

  @Output()
  public event: EventEmitter<any> = new EventEmitter();

  @Output()
  public buttonAction: EventEmitter<any> = new EventEmitter();

  public component!: ComponentRef<any>;

  constructor(private container: ViewContainerRef) {}

  public ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
    }
  }

  public ngOnInit() {
    if (this.config.type) {
      const component = components[this.config.type];
      this.component = this.container.createComponent(component);
      this.component.instance.config = this.config;
      this.component.instance.last = this.last;
      this.component.instance.length = this.length;
      this.component.instance.padding = this.padding;
      this.component.instance.event = this.event;
      this.component.instance.buttonAction = this.buttonAction;
    } else if (this.config.length || this.config.name) {
      const component = components['column'];
      this.component = this.container.createComponent(component);
      this.component.instance.config = this.config;
      this.component.instance.last = this.last;
      this.component.instance.length = this.length;
      this.component.instance.head = this.head;
      this.component.instance.padding = this.padding;
      this.component.instance.event = this.event;
      this.component.instance.buttonAction = this.buttonAction;
    }
  }
}
