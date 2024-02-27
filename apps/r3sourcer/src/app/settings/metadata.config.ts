import { Endpoints } from '@webui/models';
import { workflownodes, workflows } from '@webui/shared-metadata';

export class Metadata {
  [Endpoints.WorkflowNode] = workflownodes;
  [Endpoints.Workflow] = workflows;
}
