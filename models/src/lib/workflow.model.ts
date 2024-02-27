const apps: Record<string, string> = {
  job: 'hr',
  jobsite: 'hr',
  company: 'core',
  companyrelationship: 'core',
  companyrel: 'core',
  timesheet: 'hr',
  order: 'core',
  candidatecontact: 'candidate',
};

export interface IWorkflow {
  id: string;
  __str__: string;
  name: string;
  model: {
    id: number;
    name: string;
    __str__: string;
  };
}

export type RuleValue = Array<string | number | RuleValue>;

export interface IWorkflowNode {
  id: string;
  updated_at: string;
  created_at: string;
  workflow: IWorkflow;
  number: number;
  full_path: string;
  name_before_activation: string;
  name_after_activation: string;
  active: boolean;
  rules: {
    active: number[];
    inactive: number[];
    required_states: RuleValue;
    required_functions: RuleValue;
  };
  hardlock: boolean;
  endpoint: string | null;
  initial: boolean;
  parent: string | null;
  order: number;
  __str__: string;
  company?: { id: string };
}

export interface ICompanyWorkflowNode {
  active: boolean;
  app: string;
  company: {
    id: string;
    name: string;
    timezone: string;
    __str__: string;
  };
  created_at: string;
  id: string;
  model: string;
  order: number;
  updated_at: string;
  workflow_node: {
    id: string;
    name_after_activation: string;
    name_before_activation: string;
    number: number;
    parent: any;
    __str__: string;
  };
  __str__: string;
}

export interface IWorkflow {
  created_at: string;
  id: string;
  name: string;
  updated_at: string;
  __str__: string;
  model: {
    id: number;
    name: string;
    __str__: string;
  };
  nodes: IWorkflowNode;
}

export const getModelAndApp = (node: IWorkflowNode) => {
  let model = node.workflow.model.name.toLowerCase().replace(' ', '');

  if (model === 'companyrelationship') {
    model = 'companyrel';
  }

  if (model === 'timesheetentry') {
    model = 'timesheet';
  }

  const app = apps[model];

  return {
    model,
    app,
  };
};

export class WorkflowNode {
  readonly nameBeforeActivation: string;
  readonly nameAfterActivation: string;
  readonly number: number;
  readonly model: string;
  readonly app: string;

  constructor(payload: ICompanyWorkflowNode) {
    this.nameAfterActivation = payload.workflow_node.name_after_activation;
    this.nameBeforeActivation = payload.workflow_node.name_before_activation;
    this.number = payload.workflow_node.number;
    this.model = payload.model.toLowerCase().replace(' ', '');

    if (this.model === 'companyrelationship') {
      this.model = 'companyrel';
    }

    if (this.model === 'timesheetentry') {
      this.model = 'timesheet';
    }

    this.app = apps[this.model];
  }

  get nameBefore() {
    return this.nameBeforeActivation && this.createTranslateKey('before');
  }

  get nameAfter() {
    return this.nameAfterActivation && this.createTranslateKey('after');
  }

  private createTranslateKey(suffix: string) {
    return `workflow.${apps[this.model]}.${this.model}.${
      this.number
    }.${suffix}`;
  }
}
