import { List } from '@webui/metadata';
import { Endpoints } from '@webui/models';

const list = function () {
  return {
    list: new List.main.element('joboffer', 'Job Offer')
      .disableEdit()
      .disableSearch()
      .removeCreateButton()
      .setColumns([
        new List.column.element('times', 'Times')
          .setWidth(160)
          .setContent([
            new List.static.element('shift.date.shift_date')
              .setLabel('Shift date')
              .setDisplay('{shift.date.shift_date__date}'),

            new List.static.element('shift.time').setLabel('Shift Time'),
          ]),

        new List.column.element('shift.date.job.position', 'Position')
          .setSort(true, 'shift.date.job.position')
          .setContent([
            new List.text.element(
              'shift.date.job.position.name',
              Endpoints.Skill
            ),
          ]),

        new List.column.element('client', 'Client').setContent([
          new List.related.element(
            'shift.date.job.customer_company',
            Endpoints.Company
          ),
        ]),

        new List.column.element('job_site_-_map', 'Job Site - Map')
          .update(' ')
          .setContent([
            new List.related.element('jobsite_address'),

            new List.button.element('id', 'openMap', 'Open Map')
              .setTextColor('#006ce5')
              .setTranslationKey('open_map')
              .setIcon('map-marker-alt')
              .setFields([
                { type: 'static', field: 'latitude', key: 'lat' },
                { type: 'static', field: 'longitude', key: 'lng' },
              ]),
          ]),

        new List.column.element(
          'job_site_contact',
          'Job Site Contact'
        ).setContent([
          new List.related.element(
            'shift.date.job.jobsite.primary_contact',
            Endpoints.CompanyContact
          ),
        ]),

        new List.column.element('shift.date.job.notes', 'Notes')
          .setSort(true, 'shift.date.job.notes')
          .setContent([new List.input.element('shift.date.job.notes')]),

        new List.column.element('status', 'Status')
          .update(' ')
          .setWidth(120)
          .setContent([
            new List.button.element('hide_buttons', 'emptyPost')
              .setDisplay('Accept')
              .setTranslationKey('accept')
              .setEndpoint(`${Endpoints.JobOffer}{id}/accept/`)
              .setStyles([
                'success',
                'shadow',
                'shadow-success',
                'size-m',
                'mr',
                'resize',
              ])
              .setHidden('hide_buttons')
              .withoutDelim(),

            new List.button.element('hide_buttons', 'emptyPost')
              .setDisplay('Decline')
              .setTranslationKey('decline')
              .setEndpoint(`${Endpoints.JobOffer}{id}/cancel/`)
              .setHidden('hide_buttons')
              .setStyles(['danger', 'shadow', 'shadow-danger', 'size-m']),

            new List.icon.element('status_icon')
              .setValues({
                false: 'times',
                true: 'check',
                null: 'minus-circle',
              })
              .setShowIfRule(['hide_buttons']),

            new List.text.element('status')
              .setArrayKey(0)
              .hasTranslate()
              .setInline()
              .setShowIfRule(['hide_buttons']),
          ]),
      ]),
  };
};

export const metadataJoboffersCandidate = {
  list,
};
