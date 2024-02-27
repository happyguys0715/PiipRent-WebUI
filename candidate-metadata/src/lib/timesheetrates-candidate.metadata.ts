import {
  SkillModel,
  Models,
  SkillWorkTypeModel,
  TimesheetModel,
} from '@webui/data';
import { List, Form, InputType } from '@webui/metadata';

const form = () => [
  new TimesheetModel().formElement().hideField(),
  new SkillWorkTypeModel()
    .formElement()
    .updateValues(['translations', 'uom'])
    .readOnly()
    .setQuery({
      company: '{company}',
      priced: true,
    }),
  new Form.input.element('rate', 'Rate', InputType.Number).hideField(),
  new Form.input.element('value', 'Value', InputType.Number).setIcon(
    '{uom.name}'
  ),
];

const formadd = () => [
  new Form.input.element('timesheet', 'Timesheet', InputType.Text).hideField(),
  new Form.input.element('company', 'Company', InputType.Text).hideField(),
  new SkillWorkTypeModel()
    .formElement()
    .required()
    .updateValues(['skill_rate_ranges', 'translations', 'uom'])
    .required()
    .setPrefilledFields({
      [Models.Skill]: `{${Models.Skill}.id}`,
    })
    .setQuery({
      skill: '{skill.id}',
      company: '{company}',
      priced: true,
    }),
  new SkillModel().formElement().updateValues(['name']),
  new Form.input.element('rate', 'Rate', InputType.Number)
    .setDefaultValue('{worktype.skill_rate_ranges.default_rate}')
    .hideField(),
  new Form.input.element('value', 'Value', InputType.Number).setIcon(
    '{worktype.uom.short_name}'
  ),
];

const formset = () => ({
  fields: [],
  list: new List.main.element('timesheetrates', 'Skill Activity')
    .disableSearch()
    .setColumns([
      new List.column.element('worktype', 'Skill Activity').setContent([
        new List.text.element('worktype'),
      ]),
      new List.column.element('value', 'Value').setContent([
        new List.input.element('value'),
      ]),
      new List.column.element('buttons', 'Actions').setContent([
        new List.button.element('id', 'editForm', 'Edit')
          .setTranslationKey('edit')
          .setIcon('pencil-alt')
          .setTextColor('#f0ad4e'),
        new List.button.element('id', 'delete', 'Delete')
          .setTranslationKey('delete')
          .setIcon('trash')
          .setTextColor('#fa5c46'),
      ]),
    ]),
});

export const timesheetratescandidate = {
  form,
  formadd,
  formset,
};
