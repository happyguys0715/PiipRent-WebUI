import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { CheckPermissionService } from '@webui/core';
import { Endpoints } from '@webui/models';

type Action = 'post' | 'update' | 'delete' | 'get';

@Directive({
  standalone: true,
  selector: '[webuiHasPermission]',
})
export class HasPermissionDirective implements OnInit {
  @Input() webuiHasPermission!: {
    action: Action;
    endpoint: Endpoints;
  };
  @Input() endpoint!: string;

  constructor(
    private templateRef: TemplateRef<HTMLElement>,
    private view: ViewContainerRef,
    private permissionService: CheckPermissionService
  ) {}

  ngOnInit() {
    const { action, endpoint } = this.webuiHasPermission;
    const isAllowed = this.permissionService.hasPermission(action, endpoint);

    if (isAllowed) {
      this.view.createEmbeddedView(this.templateRef);
    }
  }
}
