import {
  Form,
  Filter,
  List,
  DatepickerType,
  InputType,
  CheckboxType,
  generateOptions,
} from '@webui/metadata';
import { Endpoints } from '@webui/models';

const list = function () {
  return {
    list: new List.main.element('acceptancetest', 'Acceptance Tests')
      .disableSearch()
      .setFilters([
        new Filter.select.element({
          key: 'active_states',
          label: 'Relationships',
          values: generateOptions({
            skill: 'Skills',
            tag: 'Tags',
            industry: 'Industries',
          }),
        }),
      ])
      .setColumns([
        new List.column.element('__str__', 'Acceptance Tests').setContent([
          new List.static.element('__str__'),
        ]),

        new List.column.element(
          'acceptance_tests_industries',
          'Industries'
        ).setContent([
          new List.text.element('acceptance_tests_industries').update({
            param: 'industry.name',
          }),
        ]),

        new List.column.element('acceptance_tests_skills', 'Skills').setContent(
          [
            new List.text.element('acceptance_tests_skills').update({
              param: 'skill.name',
            }),
          ]
        ),

        new List.column.element('acceptance_tests_tags', 'Tags').setContent([
          new List.text.element('acceptance_tests_tags').update({
            param: 'tag.name',
          }),
        ]),

        new List.column.element(
          'acceptance_tests_workflow_nodes',
          'Workflow nodes'
        ).setContent([
          new List.text.element('acceptance_tests_workflow_nodes').update({
            param: 'company_workflow_node.name',
          }),
        ]),
      ]),
  };
};

const form = function () {
  return [
    new Form.row.element().setChildren([
      new Form.group.element('General', 'general').setChildren([
        new Form.input.element('test_name', 'Test Name', InputType.Text)
          .required()
          .updateTemplate({ max: 255 }),

        new Form.textarea.element('description', 'Description'),

        new Form.checkbox.element('is_active', 'Active', CheckboxType.Checkbox),

        new Form.datepicker.element(
          'valid_from',
          'Valid From',
          DatepickerType.Date
        ).required(),

        new Form.datepicker.element(
          'valid_until',
          'Valid Until',
          DatepickerType.Date
        ),
      ]),

      new Form.group.element('Relationships', 'relationships').setChildren([
        new Form.related.element(
          'acceptance_tests_industries',
          'Industries',
          Endpoints.Industry
        )
          .updateModel({ many: true, useOptions: true })
          .setActions({ delete: true })
          .updateValues(['translations'])
          .setRelatedObjects(
            'industry',
            { acceptance_test: '{id}' },
            Endpoints.AcceptanceTestIndustry
          ),

        new Form.related.element(
          'acceptance_tests_skills',
          'Skills',
          Endpoints.Skill
        )
          .updateModel({ many: true, useOptions: true })
          .setActions({ delete: true })
          .updateValues(['translations', 'name'])
          .setQuery({
            company: 'currentCompany',
          })
          .setRelatedObjects(
            'skill',
            { acceptance_test: '{id}' },
            Endpoints.AcceptanceTestSkill
          ),

        new Form.related.element('acceptance_tests_tags', 'Tags', Endpoints.Tag)
          .updateModel({ many: true, useOptions: true })
          .setActions({ delete: true })
          .updateValues(['translations'])
          .setRelatedObjects(
            'tag',
            { acceptance_test: '{id}' },
            Endpoints.AcceptanceTestTag
          ),

        new Form.related.element(
          'acceptance_tests_workflow_nodes',
          'Workflow Node',
          Endpoints.AcceptanceTestWorkflowNode
        )
          .doNotSend()
          .updateModel({
            many: true,
            doNotChoice: true,
            options: [],
          })
          .setActions({ add: true, delete: true })
          .setPrefilledFields({ acceptance_test: '{id}' })
          .updateValues(['company_workflow_node']),
      ]),
    ]),
  ];
};

const formadd = function () {
  return [
    new Form.input.element('test_name', 'Test Name', InputType.Text)
      .required()
      .updateTemplate({ max: 255 }),

    new Form.textarea.element('description', 'Description'),

    new Form.checkbox.element(
      'is_active',
      'Active',
      CheckboxType.Checkbox
    ).setDefaultValue(true),

    new Form.datepicker.element('valid_from', 'Valid From', DatepickerType.Date)
      .required()
      .updateTemplate({ hidePreviewError: true }),

    new Form.datepicker.element(
      'valid_until',
      'Valid Until',
      DatepickerType.Date
    ),
  ];
};

export const acceptancetests = {
  list,
  form,
  formadd,
};
