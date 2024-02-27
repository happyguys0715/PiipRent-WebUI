import { Models, SkillModel, SkillWorkTypeModel } from '@webui/data';
import { Form, InputType, List } from '@webui/metadata';

const list = () =>
  new List.main.element('skillrateranges', ' Skill Rate Ranges');

const formset = () => {
  return {
    fields: [],
    list: new List.main.element('skillrateranges', 'Skill Rate Ranges')
      .disableSearch()
      .setTabs([
        {
          label: 'Skill Rate',
          is_collapsed: true,
          fields: ['lower_rate_limit', 'upper_rate_limit'],
        },
        {
          label: 'Price List Rate',
          is_collapsed: true,
          fields: [
            'price_list_lower_rate_limit',
            'price_list_upper_rate_limit',
          ],
        },
      ])
      .setColumns([
        new List.column.element('worktype', 'Worktype').setContent([
          new List.text.element('worktype').setShowIfRule(['worktype']),
          new List.select.element('worktype')
            .setValues({ null: 'Default' })
            .setColors({ null: 'info' })
            .setShowIfRule([{ worktype: null }]),
        ]),

        new List.column.element('default_rate', 'Default Rate').setContent([
          new List.text.element('default_rate').setFormatValue(
            '{currency}{field}'
          ),
        ]),

        new List.column.element(
          'price_list_default_rate',
          'Price List Default Rate'
        ).setContent([
          new List.text.element('price_list_default_rate').setFormatValue(
            '{currency}{field}'
          ),
        ]),

        new List.column.element('actions', 'Actions').setContent([
          new List.button.element('id', 'editForm', 'Edit')
            .setIcon('pencil-alt')
            .setTextColor('#f0ad4e'),
          new List.button.element('id', 'delete', 'Delete')
            .setIcon('trash')
            .setTextColor('#fa5c46'),
        ]),

        new List.column.element(
          'lower_rate_limit',
          'Lower Rate Limit'
        ).setContent([
          new List.text.element('lower_rate_limit').setFormatValue(
            '{currency}{field}'
          ),
        ]),

        new List.column.element(
          'upper_rate_limit',
          'Upper Rate Limit'
        ).setContent([
          new List.text.element('upper_rate_limit').setFormatValue(
            '{currency}{field}'
          ),
        ]),

        new List.column.element(
          'price_list_lower_rate_limit',
          'Lower Rate Limit'
        ).setContent([
          new List.text.element('price_list_lower_rate_limit').setFormatValue(
            '{currency}{field}'
          ),
        ]),

        new List.column.element(
          'price_list_upper_rate_limit',
          'Upper Rate Limit'
        ).setContent([
          new List.text.element('price_list_upper_rate_limit').setFormatValue(
            '{currency}{field}'
          ),
        ]),
      ]),
  };
};

const formadd = () => [
  new Form.row.element().setChildren([
    new Form.group.element().setChildren([
      new SkillModel()
        .formElement()
        .updateValues(['name', 'translations'])
        .setQuery({
          company: 'currentCompany',
        }),
      new SkillWorkTypeModel()
        .formElement()
        .setShowIfRule(['skill.id'])
        .setPrefilledFields({
          [Models.Skill]: '{skill.id}',
        })
        .updateValues(['translations'])
        .setActions({ add: true })
        .setQuery({
          skill: '{skill.id}',
          all: true,
        }),
    ]),
    new Form.group.element('Skill Rate', 'skill_rate').setChildren([
      new Form.input.element(
        'lower_rate_limit',
        'Lower Rate Limit',
        InputType.Number
      )
        .setNumberOptions(0.01, 0)
        .setFormatOfValue('{currency}{field}'),
      new Form.input.element('default_rate', 'Default Rate', InputType.Number)
        .setNumberOptions(0.01, 0)
        .setFormatOfValue('{currency}{field}'),
      new Form.input.element(
        'upper_rate_limit',
        'Upper Rate Limit',
        InputType.Number
      )
        .setNumberOptions(0.01, 0)
        .setFormatOfValue('{currency}{field}'),
    ]),
    new Form.group.element('Price List Rate', 'price_list_rate').setChildren([
      new Form.input.element(
        'price_list_lower_rate_limit',
        'Lower Rate Limit',
        InputType.Number
      )
        .setNumberOptions(0.01, 0)
        .setFormatOfValue('{currency}{field}'),
      new Form.input.element(
        'price_list_default_rate',
        'Default Rate',
        InputType.Number
      )
        .setNumberOptions(0.01, 0)
        .setFormatOfValue('{currency}{field}'),
      new Form.input.element(
        'price_list_upper_rate_limit',
        'Upper Rate Limit',
        InputType.Number
      )
        .setNumberOptions(0.01, 0)
        .setFormatOfValue('{currency}{field}'),
    ]),
  ]),
];

const form = () => [
  new Form.row.element().setChildren([
    new Form.group.element().setChildren([
      new SkillModel().formElement().readOnly().updateValues(['name']),
      new SkillWorkTypeModel()
        .formElement()
        .readOnly()
        .updateValues(['translations'])
        .setQuery({
          skill: '{skill.id}',
          all: true,
        }),
    ]),
    new Form.group.element('Skill Rate').setChildren([
      new Form.input.element(
        'lower_rate_limit',
        'Lower Rate Limit',
        InputType.Number
      )
        .setNumberOptions(0.01, 0)
        .setFormatOfValue('{currency}{field}'),
      new Form.input.element('default_rate', 'Default Rate', InputType.Number)
        .setNumberOptions(0.01, 0)
        .setFormatOfValue('{currency}{field}'),
      new Form.input.element(
        'upper_rate_limit',
        'Upper Rate Limit',
        InputType.Number
      )
        .setNumberOptions(0.01, 0)
        .setFormatOfValue('{currency}{field}'),
    ]),
    new Form.group.element('Price List Rate').setChildren([
      new Form.input.element(
        'price_list_lower_rate_limit',
        'Lower Rate Limit',
        InputType.Number
      )
        .setNumberOptions(0.01, 0)
        .setFormatOfValue('{currency}{field}'),
      new Form.input.element(
        'price_list_default_rate',
        'Default Rate',
        InputType.Number
      )
        .setNumberOptions(0.01, 0)
        .setFormatOfValue('{currency}{field}'),
      new Form.input.element(
        'price_list_upper_rate_limit',
        'Upper Rate Limit',
        InputType.Number
      )
        .setNumberOptions(0.01, 0)
        .setFormatOfValue('{currency}{field}'),
    ]),
  ]),
];

export const skillrateranges = {
  list,
  formset,
  formadd,
  form,
};
