import { Color } from '@webui/data';
import { List, Filter } from '@webui/metadata';
import { Endpoints } from '@webui/models';

const list = function () {
  return {
    list: new List.main.element('timesheet', 'Timesheet history')
      .disableSearch()
      .disableEdit()
      .removeCreateButton()
      .setFilters([
        new Filter.date.element({
          key: 'shift_started_at',
          label: 'Shift date',
          yesterday: true,
          today: true,
          tomorrow: true,
        }),

        new Filter.select.element({
          key: 'status',
          label: 'Status',
          values: [
            { label: 'Pending submission', value: '4' },
            { label: 'Pending approval', value: '5' },
            { label: 'Approved', value: '7' },
          ],
        }),
      ])
      .setColumns([
        new List.column.element('jobsite', 'Position / Jobsite')
          .setSort(true, 'jobsite')
          .setContent([
            new List.text.element('position').setStyles(['bolder']),

            new List.related.element('jobsite', Endpoints.Jobsite).setStyles([
              'secondary',
            ]),
          ]),

        new List.column.element('tracking', 'Tracking')
          .setCenter()
          .setContent([
            new List.button.element('id', 'showTracking')
              .setEndpoint(
                `${Endpoints.CandidateLocation}{job_offer.candidate_contact.id}/history/`
              )
              .setCustomLink('/assets/img/map-lg.jpg'),
          ]),

        new List.column.element('times', 'Times').setContent([
          new List.static.element('shift.date')
            .setLabel('Date')
            .setDisplay('{shift.date.__str__}'),

          new List.static.element('shift_started_at')
            .setLabel('Start')
            .setDisplay('{shift_started_at__time}'),

          new List.static.element('break_started_at')
            .setLabel('Break')
            .setDisplay('-')
            .setShowIfRule([{ status: [0, 1, 2, 3, 4] }]),

          new List.static.element('shift_ended_at')
            .setLabel('End')
            .setDisplay('-')
            .setShowIfRule([{ status: [0, 1, 2, 3, 4] }]),

          new List.static.element('break_started_at')
            .setLabel('Break')
            .setDisplay('{break_started_at__time} - {break_ended_at__time}')
            .setShowIfRule([{ status: [5, 6, 7] }]),

          new List.static.element('shift_ended_at')
            .setLabel('End')
            .setDisplay('{shift_ended_at__time}')
            .setShowIfRule([{ status: [5, 6, 7] }]),
        ]),

        new List.column.element('mobileTimes', 'Times').setHide().setContent([
          new List.static.element('shift_started_at')
            .setLabel('Shift date')
            .setDisplay('{shift_started_at__date}'),

          new List.static.element('shift_started_at')
            .setLabel('Shift start/end')
            .setDisplay('{shift_started_at__time} / -')
            .setShowIfRule([{ status: [0, 1, 2, 3, 4] }]),

          new List.static.element('break_started_at')
            .setLabel('Break start/end')
            .setDisplay('- / -')
            .setShowIfRule([{ status: [0, 1, 2, 3, 4] }]),

          new List.static.element('shift_ended_at')
            .setLabel('Shift start/end')
            .setDisplay('{shift_started_at__time} / {shift_ended_at__time}')
            .setShowIfRule([{ status: [5, 6, 7] }]),

          new List.static.element('break_started_at')
            .setLabel('Break start/end')
            .setDisplay('{break_started_at__time} / {break_ended_at__time}')
            .setShowIfRule([{ status: [5, 6, 7] }]),
        ]),

        new List.column.element('activity', 'Activity')
          .setWidth(150)
          .setContent([
            new List.static.element('status')
              .setDisplay('Not started yet')
              .setTranslationKey('not_started_yet')
              .setStyles(['muted'])
              .setShowIfRule([{ status: [0, 1] }]),

            new List.static.element('status')
              .setDisplay('Waiting for the timesheet')
              .setTranslationKey('waiting_for_timesheet')
              .setStyles(['muted'])
              .setShowIfRule([{ status: 2 }]),

            new List.static.element('status')
              .setDisplay('No record')
              .setTranslationKey('no_record')
              .setStyles(['muted'])
              .setShowIfRule([{ status: [3, 4] }]),

            {
              field: 'timesheet_rates',
              type: 'skillactivity',
              label: 'Skill Activities',
            },
          ]),

        new List.column.element('status', 'Status').setContent([
          new List.select.element('status')
            .setTranslateKey('timesheet_status')
            .setValues({
              0: 'New',
              1: 'Pre-Shift check pending',
              2: 'Pre-Shift check confirmed',
              3: 'Pre-Shift check failed',
              4: 'Submit pending',
              5: 'Approval pending',
              6: 'Supervisor modified',
              7: 'Approved',
            })
            .setColors({
              0: Color.Primary,
              1: Color.Primary,
              2: Color.Success,
              3: Color.Danger,
              4: Color.Primary,
              5: Color.Primary,
              6: Color.Danger,
              7: Color.Success,
            }),

          new List.static.element('status')
            .setDisplay(
              'Your shift is schedulled to start at {shift_started_at__time}'
            )
            .setTranslationKey('will_start_at_time')
            .setStyles(['muted'])
            .setShowIfRule([{ status: 0 }]),

          new List.static.element('status')
            .setDisplay('Confirm if you are going to work')
            .setStyles(['muted'])
            .setTranslationKey('confirm_going_to_work')
            .setShowIfRule([{ status: 1 }]),

          new List.button.element('id', 'emptyPost')
            .setDisplay('Accept')
            .setTranslationKey('accept')
            .setEndpoint(`${Endpoints.Timesheet}{id}/confirm/`)
            .setStyles(['success', 'shadow', 'shadow-success', 'mr', 'resize'])
            .setShowIfRule([{ status: 1 }])
            .withoutDelim(),

          new List.button.element('id', 'emptyPost')
            .setDisplay('Decline')
            .setTranslationKey('decline')
            .setEndpoint(`${Endpoints.Timesheet}{id}/decline/`)
            .setStyles(['danger', 'shadow', 'shadow-danger'])
            .setShowIfRule([{ status: 1 }]),

          new List.static.element('status')
            .setDisplay('Your shift will start {shift_started_at__diff}')
            .setTranslationKey('will_start_diff')
            .setStyles(['muted'])
            .setShowIfRule([{ status: 2 }]),

          new List.static.element('status')
            .setDisplay('Inactive timesheet will be deleted in 48 hours')
            .setTranslationKey('inactive_timesheet')
            .setStyles(['muted'])
            .setShowIfRule([{ status: 3 }]),

          new List.button.element('id', 'submitTimesheet')
            .setDisplay('Submit')
            .setTranslationKey('submit')
            .setEndpoint(`${Endpoints.TimesheetCandidate}{id}/submit/`)
            .setStyles(['success', 'shadow', 'shadow-success'])
            .setShowIfRule([{ status: 4 }]),

          new List.button.element('id', 'submitTimesheet')
            .setDisplay('Edit submission')
            .setTranslationKey('edit_submission')
            .setEndpoint(`${Endpoints.TimesheetCandidate}{id}/submit/`)
            .setStyles(['default'])
            .setShowIfRule([{ status: 5 }]),

          new List.button.element('id', 'submitTimesheet')
            .setDisplay('View')
            .setStyles(['default', 'view'])
            .setShowIfRule([{ status: 7 }]),

          new List.static.element('status')
            .setDisplay('Timesheet will be automatically approved in 4 hours')
            .setTranslationKey('timesheet_will_approved')
            .setStyles(['muted'])
            .setShowIfRule([{ status: 6 }]),

          new List.static.element('supervisor.name').setShowIfRule([
            { status: 7 },
          ]),

          new List.static.element('supervisor_approved_at')
            .setDisplay('{supervisor_approved_at__datetime}')
            .setStyles(['muted'])
            .setShowIfRule([
              { status: 7 },
              'supervisor_approved_at',
              { supervisor_modified_at: null },
            ]),

          new List.static.element('supervisor_modified_at')
            .setDisplay('{supervisor_modified_at__datetime}')
            .setStyles(['muted'])
            .setShowIfRule([{ status: 7 }, 'supervisor_modified_at']),

          new List.picture.element('supervisor_signature', {
            signature: true,
          }).setShowIfRule([{ status: 7 }, 'supervisor_signature.origin']),
        ]),
      ]),
  };
};

export const metadataTimesheetsCandidate = {
  list,
};
