import { Models } from '@webui/data';
import { Form } from '@webui/metadata';
import { Endpoints } from '@webui/models';

const form = [
  {
    key: 'shift_started_at',
    type: 'datepicker',
    templateOptions: {
      type: 'datetime',
      required: false,
      label: 'Shift Started at',
    },
    read_only: false,
  },
  {
    key: 'shift_ended_at',
    type: 'datepicker',
    templateOptions: {
      type: 'datetime',
      required: false,
      label: 'Shift Ended at',
    },
    read_only: false,
  },
  {
    key: 'no_break',
    type: 'checkbox',
    templateOptions: { type: 'checkbox', required: false, label: 'No Break' },
    read_only: false,
  },
  {
    key: 'break_started_at',
    type: 'datepicker',
    templateOptions: {
      type: 'datetime',
      required: false,
      label: 'Break Started at',
    },
    read_only: false,
    showIf: [{ no_break: false }],
  },
  {
    key: 'break_ended_at',
    type: 'datepicker',
    templateOptions: {
      type: 'datetime',
      required: false,
      label: 'Break Ended at',
    },
    read_only: false,
    showIf: [{ no_break: false }],
  },
  {
    key: 'total_worked',
    type: 'static',
    templateOptions: { type: 'static', required: false, label: 'Total' },
    read_only: true,
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
  {
    key: 'send_candidate_message',
    type: 'checkbox',
    templateOptions: {
      type: 'checkbox',
      required: false,
      label: 'Send confirmation message to Candidate',
    },
    read_only: false,
  },
  new Form.related.element(
    'manager_who_approved',
    'Approved By',
    Endpoints.CompanyContact
  )
    .readOnly()
    .setDefaultValue('{session.currentRole.client_contact_id}'),
  new Form.list.element('Skill Activities', Endpoints.TimesheetRates)
    .setQuery({
      timesheet: '{id}',
    })
    .setPrefilledFields({
      [Models.Skill]: '{position.id}',
      [Models.Timesheet]: '{id}',
      candidate_contact: '{candidate_contact_id}',
    }),
];

export const supervisorApprove = {
  form,
};
