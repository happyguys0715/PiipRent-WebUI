import { ApiMethod } from '@webui/data';
import { createFilter, List, Type } from '@webui/metadata';
import { Endpoints } from '@webui/models';

import {
  getTrackingElement,
  getChangeButton,
  getApproveButton,
  getPictureColumn,
  getPositionColumn,
  getPersonalInfoColumn,
  getTimesColumn,
  getTotalTimeColumn,
} from './utils';

const changeButton = function () {
  return getChangeButton().setShowIfRule([{ supervisor_approved_at: null }]);
};

const list = function () {
  return {
    list: new List.main.element('timesheet', 'Unapproved timesheets')
      .setFilters([
        createFilter(Type.Date, {
          key: 'shift_started_at',
          label: 'Shift Started at',
          yesterday: true,
          today: true,
        }),
        createFilter(Type.Related, {
          key: 'candidate',
          label: 'Candidate Contact',
          endpoint: Endpoints.CandidateSupervisorCompany,
          queryParams: {
            supervisor: '{session.currentRole.client_contact_id}',
            company: '{session.currentRole.company_id}',
          },
        }),
        createFilter(Type.Related, {
          key: 'position',
          label: 'Position',
          endpoint: Endpoints.Skill,
          multiple: false,
          queryParams: {
            company: '{session.currentRole.company_id}',
          },
        }),
      ])
      .disableEdit()
      .disableSearch()
      .removeCreateButton()
      .setActions({
        options: [
          {
            endpoint: `${Endpoints.Timesheet}{id}/supervisor_approve/`,
            signature_endpoint: `${Endpoints.Timesheet}{id}/approve_by_signature/`,
            label: 'action.approve',
            selectionError: 'message.please-select-timesheet',
            confirm: false,
            property: 'id',
            required: true,
            multiple: true,
            method: ApiMethod.PUT,
            bodyFields: [
              'shift_started_at',
              'shift_ended_at',
              'break_started_at',
              'break_ended_at',
              { send_candidate_message: false },
              { send_supervisor_message: false },
              { no_break: false },
            ],
            bodySignature: {
              supervisor_signature: '',
            },
          },
        ],
        label: 'actions',
        agree_label: 'agree',
        button_label: 'action.go',
        decline_label: 'decline',
      })
      .setColumns([
        getPictureColumn(),
        getPositionColumn(),
        getPersonalInfoColumn(),

        new List.column.element('tracking', 'Tracking')
          .setCenter()
          .setContent([getTrackingElement()]),

        getTimesColumn(),
        getTotalTimeColumn(),

        new List.column.element('approve', 'Approve/Change').setContent([
          getApproveButton()
            .setShowIfRule([{ resend_sms_supervisor: true }])
            .addReplaceBy('supervisor'),

          changeButton(),
        ]),
      ]),
  };
};

export const unapproved = {
  list,
  formset: list,
};
