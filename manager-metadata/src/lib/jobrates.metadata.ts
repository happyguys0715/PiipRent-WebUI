import { Form, InputType, List } from '@webui/metadata';
import { Endpoints } from '@webui/models';

const formset = {
  fields: [
    new Form.related.element('company', 'Company', Endpoints.Company)
      .setDefaultValue('{customer_company.id}')
      .hideField(),
    new Form.related.element('skill', 'Skill', Endpoints.Skill)
      .setDefaultValue('{position.id}')
      .updateValues(['name'])
      .hideField()
      .doNotSend(),
    new Form.related.element('worktype', 'Work Type', Endpoints.SkillWorkTypes)
      .setQuery({
        skill: '{position.id}',
        company: '{customer_company.id}',
        priced: true,
      })
      .updateValues(['translations', 'default_rate', '__str__']),
    new Form.input.element('rate', 'Rate', InputType.Number).setNumberOptions(
      0.01,
      0
    ),
    new Form.related.element('job', 'Job', Endpoints.Job).hideField(),
  ],
  list: new List.main.element('jobrates', 'Job Rates')
    .disableSearch()
    .setColumns([
      new List.column.element('rate', 'Rate').setContent([
        new List.text.element('rate').setFormatValue('{currency}{field}'),
      ]),
      new List.column.element('worktype', 'work type').setContent([
        new List.text.element('worktype'),
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
};

const formadd = () => [
  new Form.related.element('company', 'Company', Endpoints.Company),
  new Form.related.element('skill', 'Skill', Endpoints.Skill)
    .updateValues(['name'])
    .readOnly()
    .doNotSend(),
  new Form.related.element('worktype', 'Work Type', Endpoints.SkillWorkTypes)
    .setQuery({
      skill: '{skill.id}',
      company: '{company.id}',
      priced: true,
    })
    .updateValues(['translations', 'default_rate', '__str__']),
  new Form.input.element('rate', 'Rate', InputType.Number).setNumberOptions(
    0.01,
    0
  ),
  new Form.related.element('job', 'Job', Endpoints.Job).hideField(),
];

const form = () => [
  new Form.related.element('worktype', 'Work Type', Endpoints.SkillWorkTypes)
    .readOnly()
    .updateValues(['translations', 'default_rate', '__str__']),
  new Form.input.element('rate', 'Rate', InputType.Number).setNumberOptions(
    0.01,
    0
  ),
  new Form.related.element('job', 'Job', Endpoints.Skill).hideField(),
];

export const jobrates = {
  formset,
  formadd,
  form,
};
