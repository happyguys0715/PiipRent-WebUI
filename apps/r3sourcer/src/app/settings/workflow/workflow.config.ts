import { Form } from '@webui/metadata';

export const workflowEl = new Form.select.element('workflow', 'Workflow');

export const config = [
  {
    type: 'row',
    children: [
      {
        type: 'group',
        label: 'Workflow settings',
        translateKey: 'workflow_settings',
        children: [workflowEl],
      },
      {
        type: 'group',
        children: [
          {
            type: 'checkbox',
            key: 'advance_state_saving',
            value: false,
            templateOptions: {
              label: 'Advanced state saving',
            },
          },
        ],
      },
    ],
  },
];
