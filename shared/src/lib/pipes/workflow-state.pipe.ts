import { Pipe, PipeTransform, Optional, Inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ENV, LocalEnvService } from '@webui/core';

@Pipe({
  standalone: true,
  name: 'workflowState',
})
export class WorkflowStatePipe implements PipeTransform {
  constructor(
    // private translatePipe: TranslatePipe,
    @Optional() @Inject(ENV) private env: Record<string, string | boolean>,
    @Optional() private localEnv: LocalEnvService,
    private translateService: TranslateService
  ) {}

  transform(number: number, ...args: [string, string]): string {
    const [fallback, type] = args;
    const workflowType = this.localEnv.value['workflowType'];

    if (!workflowType) {
      return this.env['production']
        ? fallback
        : 'Workflow type is not provided';
    }

    const translateKey = `workflow.${workflowType}.${number}.${type}`;

    return this.translateService.instant(translateKey);
  }
}
