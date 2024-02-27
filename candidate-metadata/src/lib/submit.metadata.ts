import { Models, NoteModel, SkillModel } from '@webui/data';
import { Form, CheckboxType, DatepickerType } from '@webui/metadata';
import { Endpoints } from '@webui/models';

const form = function () {
  return [
    new Form.tabs.element().setChildren([
      new Form.group.element('').mainTab('General').setChildren([
        new Form.row.element().setChildren([
          new Form.static.element('supervisor', 'Supervisor').readOnly(),

          new Form.static.element('company', 'Company').readOnly(),

          new Form.static.element('jobsite', 'Jobsite').readOnly(),

          new SkillModel()
            .formElement({
              key: 'position',
              label: 'Position',
            })
            .updateValues(['name'])
            .readOnly()
            .updateModel({
              editForm: true,
            }),
        ]),

        new Form.row.element().setChildren([
          new Form.static.element('shift.date.__str__', 'Shift date')
            .readOnly()
            .doNotSend(),

          new Form.checkbox.element(
            'hours',
            'Times only',
            CheckboxType.Checkbox
          ).setDefaultValue(true),
        ]),

        new Form.row.element()
          .setIsHidden(data => {
            return !data.hours;
          })
          .setChildren([
            new Form.group.element()
              .doNotShowLabel()
              .setChildren([
                new Form.datepicker.element(
                  'shift_started_at',
                  'Shift Start',
                  DatepickerType.Datetime
                )
                  .setWidth(0.25)
                  .required(),

                new Form.static.element('total_time', 'Total time')
                  .setWidth(0.25)
                  .readOnly()
                  .doNotSend()
                  .setColor('text-success')
                  .inlineValue(),
              ]),

            new Form.group.element()
              .doNotShowLabel()
              .setChildren([
                new Form.datepicker.element(
                  'shift_ended_at',
                  'Shift End',
                  DatepickerType.Datetime
                )
                  .setDefaultValue('{shift_ended_at}')
                  .setWidth(0.25)
                  .required(),

                new Form.checkbox.element(
                  'noBreak',
                  'No Break',
                  CheckboxType.Checkbox
                )
                  .setDefaultValue(false)
                  .updateByNull(['break_started_at', 'break_ended_at'])
                  .setWidth(0.25)
                  .doNotSend(),
              ]),

            new Form.group.element().doNotShowLabel().setChildren([
              new Form.datepicker.element(
                'break_started_at',
                'Break Start',
                DatepickerType.Datetime
              )
                .setDefaultValue('{break_started_at}')
                .setWidth(0.25)
                .saveValue()
                .setShowIfRule([{ noBreak: false }]),
            ]),

            new Form.group.element().doNotShowLabel().setChildren([
              new Form.datepicker.element(
                'break_ended_at',
                'Break End',
                DatepickerType.Datetime
              )
                .setDefaultValue('{break_ended_at}')
                .setWidth(0.25)
                .saveValue()
                .setShowIfRule([{ noBreak: false }]),
            ]),
          ]),

        new Form.list.element(
          'Skill Activities',
          Endpoints.TimesheetRates,
          'timesheetrates'
        )
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
          }),
      ]),

      new NoteModel().formListElement({
        model_content_type: '112',
      }),
    ]),
  ];
};

export const metadataSubmit = {
  form,
  list: {},
};
