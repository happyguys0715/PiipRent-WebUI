import { Models } from '@webui/data';
import { CheckboxType, Form } from '@webui/metadata';
import { Endpoints } from '@webui/models';

const form = [
  new Form.checkbox.element(
    'hours',
    'Times only',
    CheckboxType.Button
  ).setDefaultValue(true),
  {
    key: 'shift_started_at',
    type: 'datepicker',
    templateOptions: {
      type: 'datetime',
      required: false,
      label: 'Shift Started at',
    },
    read_only: false,
    showIf: [{ hours: true }],
  },
  {
    key: 'shift_ended_at',
    type: 'datepicker',
    default: '{shift_started_at}',
    templateOptions: {
      type: 'datetime',
      required: false,
      label: 'Shift Ended at',
    },
    read_only: false,
    showIf: [{ hours: true }],
  },
  {
    key: 'no_break',
    type: 'checkbox',
    templateOptions: { type: 'checkbox', required: false, label: 'No Break' },
    read_only: false,
    showIf: [{ hours: true }],
  },
  {
    key: 'break_started_at',
    type: 'datepicker',
    default: '{shift_started_at}',
    templateOptions: {
      type: 'datetime',
      required: false,
      label: 'Break Started at',
    },
    read_only: false,
    shouldUpdate: true,
    showIf: [{ hours: true }, { no_break: false }],
  },
  {
    key: 'break_ended_at',
    type: 'datepicker',
    default: '{shift_started_at}',
    templateOptions: {
      type: 'datetime',
      required: false,
      label: 'Break Ended at',
    },
    read_only: false,
    shouldUpdate: true,
    showIf: [{ hours: true }, { no_break: false }],
  },
  {
    key: 'total_worked',
    type: 'static',
    templateOptions: { type: 'static', required: false, label: 'Total' },
    read_only: true,
    showIf: [{ hours: true }],
  },
  {
    key: 'send_supervisor_message',
    type: 'checkbox',
    templateOptions: {
      type: 'checkbox',
      required: false,
      label: 'Send confirmation message to supervisor',
    },
    read_only: false,
  },
  new Form.list.element('Skill Activities', Endpoints.TimesheetRates)
    .setShowIfRule([
      {
        hours: false,
      },
    ])
    .setQuery({
      timesheet: '{id}',
    })
    .setPrefilledFields({
      [Models.Skill]: '{position.id}',
      [Models.Timesheet]: '{id}',
      company: '{company.id}',
      candidate_contact: '{candidate_contact_id}',
    }),
];

export const candidateFill = {
  form,
};
