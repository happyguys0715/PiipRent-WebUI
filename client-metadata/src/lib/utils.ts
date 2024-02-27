import { List } from '@webui/metadata';
import { Endpoints } from '@webui/models';

export function getPictureColumn() {
  return new List.column.element(
    'job_offer.candidate_contact.contact.picture',
    'Picture'
  )
    .setHide()
    .setContent([
      new List.picture.element('job_offer.candidate_contact.contact.picture', {
        avatar: true,
      }),
    ]);
}

export function getPositionColumn() {
  return new List.column.element('position', 'Position')
    .setHide()
    .setContent([
      new List.link.element(
        'job_offer.candidate_contact',
        'showCandidateProfile'
      ).setEndpoint(
        `${Endpoints.CandidateContact}{job_offer.candidate_contact.id}/`
      ),

      new List.text.element('position.name'),
      new List.static.element('jobsite').setDescriptionStyle(),
    ]);
}

export function getPersonalInfoColumn() {
  return new List.column.element('personal_info', 'Candidate/Position')
    .setSort(true, 'job_offer.candidate_contact')
    .setWidth(255)
    .setContent([
      new List.info.element('id').setValues({
        hideAvailability: true,
        title: 'job_offer.candidate_contact.contact.__str__',
        picture: 'job_offer.candidate_contact.contact.picture.origin',
        position: 'position.__str__',
      }),
    ]);
}

export function getTrackingElement() {
  return new List.button.element('id', 'showTracking')
    .setEndpoint(
      `${Endpoints.CandidateLocation}{job_offer.candidate_contact.id}/history/`
    )
    .setCustomLink('/assets/img/map-lg.jpg');
}

export function getTimesColumn() {
  return new List.column.element('times', 'Times')
    .setSort(true, 'shift_started_at')
    .setContent([
      new List.static.element('shift.date')
        .setLabel('shift_date.label')
        .setDisplay('{shift.date.__str__}'),

      new List.static.element('shift_started_at')
        .setLabel('shift_start_end')
        .setDisplay('{shift_started_at__time} - {shift_ended_at__time}'),

      new List.static.element('break_started_at')
        .setLabel('mobileTimes.break_started_at.label')
        .setDisplay('{break_started_at__time} - {break_ended_at__time}'),
    ]);
}

export function getTotalTimeColumn() {
  return new List.column.element('totalTime', 'Total time')
    .setWidth(150)
    .setContent([
      {
        field: 'timesheet_rates',
        type: 'skillactivity',
        label: 'Skill Activities',
      },
    ]);
}

export function getEvaluateColumn() {
  return new List.column.element('evaluate', 'Evaluate')
    .setWidth(115)
    .setContent([
      new List.button.element('id', 'evaluateCandidate')
        .setEndpoint(`${Endpoints.Timesheet}{id}/evaluate/`)
        .setTranslationKey('evaluate.button')
        .setDisplay('Evaluate')
        .customButton('warning', 'evaluate')
        .setShowIfRule([{ evaluated: false }]),

      new List.text.element('evaluation.evaluation_score')
        .scoreField()
        .setShowIfRule([{ evaluated: true }]),
    ]);
}

export function getChangeButton() {
  return new List.button.element('id', 'changeTimesheet')
    .setDisplay('Change')
    .setTranslationKey('change')
    .setEndpoint(`${Endpoints.Timesheet}{id}/not_agree/`)
    .customButton('danger', 'change');
}

export function getApproveButton() {
  return new List.button.element('id', 'approveTimesheet')
    .setDisplay('Approve')
    .setTranslationKey('approve')
    .setEndpoint(`${Endpoints.Timesheet}{id}/approve/`)
    .customButton('success', 'approve');
}
