import { Form } from '@webui/metadata';
import { Endpoints } from '@webui/models';

const list = {
  list: {
    list: 'skill',
    label: 'Skill',
    columns: [
      {
        delim: null,
        label: 'Skill Name',
        sort: true,
        width: 150,
        content: [
          {
            field: 'name.name',
            type: 'text',
          },
        ],
        name: 'name',
        title: null,
        sort_field: 'name',
      },
      {
        delim: null,
        label: 'Industry',
        content: [
          {
            field: 'name.industry.name',
            type: 'text',
          },
        ],
        name: 'name.industry',
        title: null,
      },
      {
        delim: null,
        label: 'Active',
        sort: true,
        content: [
          {
            field: 'active',
            type: 'checkbox',
          },
        ],
        name: 'active',
        title: null,
        sort_field: 'active',
      },
      {
        delim: null,
        label: 'Carrier List Reserve',
        sort: true,
        content: [
          {
            field: 'carrier_list_reserve',
            type: 'text',
          },
        ],
        name: 'carrier_list_reserve',
        title: null,
        sort_field: 'carrier_list_reserve',
      },
    ],
    pagination_label: 'Skill',
    search_enabled: true,
    editDisable: false,
    filters: [
      {
        key: 'active',
        label: 'Active',
        options: [
          {
            value: 'True',
            label: 'True',
          },
          {
            value: 'False',
            label: 'False',
          },
        ],
        query: 'active',
        default: null,
        type: 'select',
      },
      {
        key: 'industry',
        label: 'Industry',
        data: {
          value: '__str__',
          endpoint: '/pricing/industries/',
          key: 'id',
        },
        query: 'industry',
        multiple: false,
        type: 'related',
      },
    ],
  },
  fields: [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        required: true,
        label: 'Skill Name',
        max: 63,
        type: 'text',
      },
      read_only: true,
    },
    {
      key: 'active',
      default: true,
      type: 'input',
      templateOptions: {
        required: false,
        label: 'Active',
        type: 'text',
      },
      read_only: true,
    },
    {
      key: 'carrier_list_reserve',
      default: 0,
      type: 'input',
      templateOptions: {
        required: false,
        label: 'Carrier List Reserve',
        max: 32767,
        type: 'text',
        min: 0,
      },
      read_only: true,
    },
  ],
};

const form = [
  {
    values: {
      available: 'active',
      company: 'name.industry',
      skill_title: '__str__',
      created_at: 'created_at',
      updated_at: 'updated_at',
    },
    type: 'info',
    key: 'id',
  },
  {
    type: 'related',
    send: false,
    saveField: false,
    hide: true,
    read_only: true,
    endpoint: '/pricing/industries/',
    key: 'name.industry',
    templateOptions: {
      label: 'Industry',
      type: 'related',
      param: 'id',
      values: ['__str__', 'translations'],
    },
  },
  {
    type: 'related',
    hide: true,
    read_only: true,
    key: 'name',
    templateOptions: {
      label: 'Skill name',
      type: 'text',
    },
  },
  {
    type: 'tabs',
    children: [
      {
        main: true,
        name: 'Skill Info',
        type: 'group',
        translateKey: 'skill_info',
        label: 'Skill information',
        children: [
          {
            type: 'row',
            children: [
              {
                label: 'Additional Info',
                translateKey: 'additional_info',
                type: 'group',
                children: [
                  {
                    key: 'short_name',
                    type: 'input',
                    templateOptions: {
                      required: false,
                      label: 'Short Name',
                      max: 15,
                      type: 'text',
                      description:
                        'Abbreviation, for use by staff reports and dashboards',
                    },
                    read_only: false,
                  },
                  {
                    key: 'carrier_list_reserve',
                    type: 'input',
                    templateOptions: {
                      required: false,
                      label: 'Carrier list reserve',
                      type: 'number',
                    },
                    read_only: false,
                  },
                ],
                width: 0.34,
              },
            ],
          },
        ],
      },
      new Form.list.element(
        'Skill Rate Ranges',
        Endpoints.SkillRateRanges,
        'skill_rate_range'
      )
        .setQuery({
          skill: '{id}',
        })
        .setPrefilledFields({
          skill: '{id}',
        }),
      {
        endpoint: '/skills/skilltags/',
        templateOptions: {
          label: 'Skill tags',
          type: 'list',
          add_label: '+ Add',
          text: 'Skill tags',
        },
        translateKey: 'skill_tags',
        prefilled: {
          skill: '{id}',
        },
        type: 'list',
        query: {
          skill: '{id}',
        },
        help: 'Here you can see the tags which belong to the skill',
      },
    ],
  },
  {
    key: 'active',
    read_only: false,
    templateOptions: {
      required: false,
      label: 'Active',
      type: 'checkbox',
    },
    hide: true,
    default: false,
    type: 'checkbox',
  },
  {
    key: 'name',
    type: 'input',
    hide: true,
    templateOptions: {
      required: true,
      label: 'Skill Name',
      max: 63,
      type: 'text',
    },
    read_only: false,
  },
  {
    endpoint: '/core/companies/',
    read_only: true,
    hide: true,
    templateOptions: {
      label: 'Company',
      values: ['__str__'],
    },
    type: 'related',
    default: 'currentCompany',
    key: 'company',
  },
];

const formadd = [
  {
    type: 'related',
    send: false,
    endpoint: '/pricing/industries/',
    key: 'industry',
    reset: ['name'],
    templateOptions: {
      required: true,
      label: 'Industry',
      type: 'related',
      param: 'id',
      values: ['__str__', 'translations'],
    },
  },
  {
    type: 'related',
    endpoint: '/skills/skillnames/',
    key: 'name',
    showIf: ['industry.id'],
    templateOptions: {
      required: true,
      label: 'Skill',
      type: 'related',
      param: 'id',
      values: ['__str__'],
    },
    query: {
      industry: '{industry.id}',
      exclude_company: 'currentCompany',
    },
  },
  {
    key: 'active',
    read_only: true,
    templateOptions: {
      label: 'Active',
      type: 'checkbox',
    },
    hide: true,
    value: false,
    type: 'checkbox',
  },
  {
    endpoint: '/core/companies/',
    read_only: true,
    hide: true,
    templateOptions: {
      label: 'Company',
      values: ['__str__'],
    },
    type: 'related',
    default: 'currentCompany',
    key: 'company',
  },
];

export const skills = {
  list,
  form,
  formadd,
};
