import {
  SkillModel,
  Models,
  TimesheetModel,
  SkillWorkTypeModel,
} from '@webui/data';
import { List, Form, InputType } from '@webui/metadata';

const getRateField = () =>
  new Form.input.element('rate', 'Rate', InputType.Number)
    .setDefaultValue('{worktype.skill_rate_ranges.default_rate}')
    .hideField();
const getValueField = () =>
  new Form.input.element('value', 'Value', InputType.Number).setIcon(
    '{worktype.uom.short_name}'
  );
const getTimesheetField = () => new TimesheetModel().formElement().hideField();

const form = () => [
  getTimesheetField(),
  new SkillWorkTypeModel()
    .formElement()
    .updateValues(['translations'])
    .readOnly()
    .setQuery({
      company: '{company}',
      priced: true,
    }),
  getRateField(),
  getValueField(),
];

const formadd = () => [
  getTimesheetField(),
  new Form.input.element('company', 'Company', InputType.Text).hideField(),
  new SkillWorkTypeModel()
    .formElement()
    .required()
    .setActions({ add: true })
    .updateValues(['translations', 'uom', 'skill_rate_ranges'])
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
  getRateField(),
  getValueField(),
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
      new List.column.element('actions', 'Actions').setContent([
        new List.button.element('id', 'editForm', 'Edit')
          .setIcon('pencil-alt')
          .setTextColor('#f0ad4e'),
        new List.button.element('id', 'delete', 'Delete')
          .setIcon('trash')
          .setTextColor('#fa5c46'),
      ]),
    ]),
});

export const timesheetratesclient = {
  form,
  formadd,
  formset,
};
