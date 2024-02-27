import { createFilter, Type } from '@webui/metadata';
import { Endpoints } from '@webui/models';

const filters = {
  avarageScore: createFilter(Type.Range, {
    key: 'candidate_scores.average_score',
    label: 'Average score',
    max: 5,
  }),
  skill: createFilter(Type.Related, {
    key: 'skill',
    label: 'Skills',
    endpoint: Endpoints.SkillName,
    multiple: true,
    parameter: 'skill_id',
    display: ['translations'],
  }),
  tag: createFilter(Type.Related, {
    key: 'tag',
    label: 'Tags',
    endpoint: Endpoints.Tag,
    multiple: true,
    display: ['translations'],
  }),
  created_at: createFilter(Type.Date, {
    key: 'created_at',
    label: 'Created at',
    today: true,
    yesterday: true,
  }),
};

const list = {
  list: {
    list: 'candidatecontactpool',
    label: 'Candidate Pool',
    pagination_label: 'Candidate pool',
    columns: [
      {
        content: [
          {
            values: {
              available: 'contact.is_available',
              title: 'contact.__str__',
              status: {
                field: 'latest_state',
                color: {
                  danger: [0, 80, 90],
                },
                color_attr: 'number',
              },
              picture: 'contact.picture.origin',
            },
            hideTitle: true,
            field: 'id',
            type: 'info',
            label: 'Personal Info',
          },
        ],
        name: 'personal_info',
        title: null,
        label: 'Personal Info',
        delim: null,
      },
      {
        name: 'profile_price',
        title: null,
        label: 'Profile Price',
        delim: null,
        center: true,
        content: [
          {
            field: 'profile_price',
            type: 'text',
            display: '{currency}{profile_price}',
          },
          {
            text: 'buy_profile.label',
            type: 'button',
            color: 'success',
            translationKey: 'buy_profile.label',
            label: 'Approve',
            endpoint: `${Endpoints.CandidateContact}{id}/buy/`,
            field: 'id',
            action: 'buyCandidate',
          },
        ],
      },
      {
        content: [
          {
            field: 'skill_list',
            type: 'skills',
            label: 'Skills',
          },
        ],
        name: 'skills',
        title: null,
        label: 'Skills',
        delim: null,
      },
      {
        delim: null,
        label: 'Tag list',
        sort: true,
        content: [
          {
            field: 'tag_list',
            type: 'tags',
            display: '{tag.name}',
          },
        ],
        name: 'tag_list',
        title: null,
        sort_field: 'tag_list',
      },
      {
        delim: null,
        label: 'Reliability',
        sort: true,
        content: [
          {
            field: 'candidate_scores.reliability',
            type: 'skills',
          },
        ],
        name: 'candidate_scores.reliability',
        title: null,
        sort_field: 'candidate_scores.reliability',
      },
      {
        delim: null,
        label: 'Loyalty',
        sort: true,
        content: [
          {
            field: 'candidate_scores.loyalty',
            type: 'skills',
          },
        ],
        name: 'candidate_scores.loyalty',
        title: null,
        sort_field: 'candidate_scores.loyalty',
      },
      {
        delim: null,
        label: 'Average test',
        sort: true,
        content: [
          {
            field: 'candidate_scores.recruitment_score',
            type: 'skills',
          },
        ],
        name: 'candidate_scores.recruitment_score',
        title: null,
        sort_field: 'candidate_scores.recruitment_score',
      },
      {
        delim: null,
        label: 'Client feedback',
        sort: true,
        content: [
          {
            field: 'candidate_scores.client_feedback',
            type: 'skills',
          },
        ],
        name: 'candidate_scores.client_feedback',
        title: null,
        sort_field: 'candidate_scores.client_feedback',
      },
      {
        delim: null,
        label: 'Average skill',
        sort: true,
        content: [
          {
            field: 'candidate_scores.skill_score',
            type: 'skills',
          },
        ],
        name: 'candidate_scores.skill_score',
        title: null,
        sort_field: 'candidate_scores.skill_score',
      },
      {
        content: [
          {
            values: {
              male: 'Male',
              female: 'Female',
            },
            field: 'contact.gender',
            type: 'select',
          },
        ],
        name: 'contact.gender',
        sort_field: 'contact.gender',
        label: 'Gender',
        sort: true,
      },
      {
        content: [
          {
            endpoint: Endpoints.Country,
            field: 'nationality',
            type: 'related',
          },
        ],
        name: 'nationality',
        sort_field: 'nationality',
        label: 'Nationality',
        sort: true,
      },
      {
        content: [
          {
            field: 'weight',
            type: 'input',
          },
        ],
        name: 'weight',
        sort_field: 'weight',
        label: 'Weight, kg',
        sort: true,
      },
      {
        content: [
          {
            field: 'height',
            type: 'input',
          },
        ],
        name: 'height',
        sort_field: 'height',
        label: 'Height, cm',
        sort: true,
      },
      {
        content: [
          {
            values: {
              1: 'Own Car',
              2: 'Public Transportation',
            },
            field: 'transportation_to_work',
            type: 'select',
          },
        ],
        name: 'transportation_to_work',
        sort_field: 'transportation_to_work',
        label: 'Transportation',
        sort: true,
      },
      {
        content: [
          {
            field: 'bmi',
            type: 'static',
          },
        ],
        name: 'bmi',
        label: 'Bmi',
      },
    ],
    tabs: [
      {
        label: 'Additional Info',
        name: 'additional_information',
        is_collapsed: true,
        fields: ['nationality', 'contact.gender', 'transportation_to_work'],
      },
      {
        label: 'Physical Parameters',
        name: 'group.physical_parameters',
        is_collapsed: true,
        fields: ['height', 'weight', 'bmi'],
      },
      {
        label: 'Scores',
        is_collapsed: true,
        hideLabel: true,
        name: 'scores',
        width: 180,
        fields: [
          'candidate_scores.recruitment_score',
          'candidate_scores.client_feedback',
          'candidate_scores.reliability',
          'candidate_scores.loyalty',
          'candidate_scores.skill_score',
        ],
      },
      {
        label: 'Tags',
        name: 'tabs.tags.label',
        is_collapsed: true,
        fields: ['tag_list'],
      },
    ],
    filters: [
      filters.skill,
      filters.tag,
      {
        key: 'contact.gender',
        label: 'Gender',
        options: [
          {
            value: 'male',
            label: 'Male',
            key: 'male',
          },
          {
            value: 'female',
            label: 'Female',
            key: 'female',
          },
        ],
        query: 'contact__gender',
        multiple: true,
        default: null,
        type: 'checkbox',
      },
      filters.avarageScore,
      {
        key: 'transportation_to_work',
        label: 'Transportation',
        options: [
          {
            value: 1,
            key: '1',
            label: 'Own Car',
          },
          {
            value: 2,
            key: '2',
            label: 'Public Transportation',
          },
        ],
        query: 'transportation_to_work',
        multiple: true,
        default: null,
        type: 'checkbox',
      },
      filters.created_at,
    ],
    buttons: [],
    editDisable: false,
  },
  fields: [],
};

const form = [
  {
    values: {
      created_at: 'created_at',
      available: 'contact.is_available',
      updated_at: 'updated_at',
      picture: 'contact.picture',
    },
    hideTitle: true,
    type: 'info',
    key: 'id',
  },
  {
    key: 'contact.is_available',
    hide: true,
    templateOptions: {
      required: false,
      label: 'Available',
      type: 'checkbox',
    },
    send: false,
    default: true,
    type: 'checkbox',
  },

  {
    type: 'tabs',
    candidateTabs: true,
    notEdit: true,
    children: [
      {
        main: true,
        name: 'Personal Info',
        translateKey: 'personal_info',
        type: 'group',
        label: 'Personal information',
        children: [
          {
            type: 'row',
            children: [
              {
                label: 'Additional info',
                translateKey: 'additional_info',
                type: 'group',
                children: [
                  {
                    key: 'contact.gender',
                    type: 'select',
                    templateOptions: {
                      required: false,
                      label: 'Gender',
                      type: 'select',
                      options: [
                        {
                          value: 'male',
                          label: 'Male',
                        },
                        {
                          value: 'female',
                          label: 'Female',
                        },
                      ],
                    },
                    read_only: false,
                  },
                  {
                    key: 'transportation_to_work',
                    type: 'select',
                    templateOptions: {
                      required: false,
                      label: 'Transportation',
                      type: 'select',
                      options: [
                        {
                          value: 1,
                          label: 'Own Car',
                        },
                        {
                          value: 2,
                          label: 'Public Transportation',
                        },
                      ],
                    },
                    read_only: false,
                  },
                  {
                    key: 'profile_price',
                    type: 'input',
                    templateOptions: {
                      required: false,
                      label: 'Profile Price',
                      type: 'number',
                      display: '{currency}{profile_price}',
                    },
                    read_only: false,
                  },
                  {
                    type: 'button',
                    color: 'success',
                    templateOptions: {
                      action: 'buyProfile',
                      text: 'buy_profile.label',
                      translationKey: 'buy_profile.label',
                      type: 'button',
                      small: true,
                      p: true,
                    },
                  },
                ],
                width: 0.25,
              },
              {
                label: 'Physical parameters',
                translateKey: 'physical_parameters',
                type: 'group',
                children: [
                  {
                    key: 'height',
                    type: 'input',
                    templateOptions: {
                      required: false,
                      label: 'Height, cm',
                      type: 'text',
                    },
                    read_only: false,
                  },
                  {
                    key: 'weight',
                    type: 'input',
                    templateOptions: {
                      required: false,
                      label: 'Weight, kg',
                      type: 'number',
                    },
                    read_only: false,
                  },
                  {
                    key: 'bmi',
                    type: 'static',
                    templateOptions: {
                      required: false,
                      label: 'Bmi',
                      type: 'static',
                    },
                    read_only: true,
                  },
                ],
                width: 0.25,
              },
              {
                label: 'Scores',
                translateKey: 'scores',
                type: 'group',
                children: [
                  {
                    key: 'candidate_scores.id',
                    read_only: false,
                    hide: true,
                    templateOptions: {
                      required: false,
                      label: 'Id',
                      type: 'text',
                    },
                    send: false,
                    type: 'input',
                  },
                  {
                    key: 'candidate_scores.reliability',
                    send: false,
                    type: 'static',
                    templateOptions: {
                      required: false,
                      label: 'Reliability',
                      type: 'score',
                      danger: 'no_rating',
                    },
                    read_only: true,
                  },
                  {
                    key: 'candidate_scores.loyalty',
                    send: false,
                    type: 'static',
                    templateOptions: {
                      required: false,
                      label: 'Loyalty',
                      type: 'score',
                      danger: 'no_rating',
                    },
                    read_only: true,
                  },
                ],
                width: 0.25,
              },
              {
                label: 'Rating',
                translateKey: 'rating',
                type: 'group',
                children: [
                  {
                    key: 'candidate_scores.recruitment_score',
                    send: false,
                    type: 'static',
                    templateOptions: {
                      required: false,
                      label: 'Average test',
                      type: 'score',
                      danger: 'no_rating',
                    },
                    read_only: true,
                  },
                  {
                    key: 'candidate_scores.client_feedback',
                    send: false,
                    type: 'static',
                    templateOptions: {
                      required: false,
                      label: 'Client feedback',
                      type: 'score',
                      danger: 'no_rating',
                    },
                    read_only: true,
                  },
                  {
                    key: 'candidate_scores.skill_score',
                    send: false,
                    type: 'static',
                    templateOptions: {
                      required: false,
                      label: 'Average skill',
                      type: 'score',
                      danger: 'no_rating',
                    },
                    read_only: true,
                  },
                ],
                width: 0.25,
              },
            ],
          },
          {
            type: 'row',
            children: [
              {
                label: 'Residency',
                translateKey: 'residency',
                type: 'group',
                children: [
                  {
                    key: 'residency',
                    default: 0,
                    type: 'select',
                    templateOptions: {
                      required: false,
                      label: 'Residency Status',
                      type: 'select',
                      options: [
                        {
                          value: 0,
                          label: 'Unknown',
                        },
                        {
                          value: 1,
                          label: 'Citizen',
                        },
                        {
                          value: 2,
                          label: 'Permanent Resident',
                        },
                        {
                          value: 3,
                          label: 'Temporary Resident',
                        },
                      ],
                    },
                    read_only: false,
                  },
                  {
                    key: 'visa_type',
                    type: 'related',
                    endpoint: Endpoints.CandidateVisaType,
                    showIf: [
                      {
                        residency: 3,
                      },
                    ],
                    templateOptions: {
                      required: false,
                      label: 'Visa Type',
                      type: 'related',
                    },
                    read_only: false,
                  },
                  {
                    key: 'visa_expiry_date',
                    type: 'datepicker',
                    showIf: [
                      {
                        residency: 3,
                      },
                    ],
                    templateOptions: {
                      required: false,
                      label: 'Visa Expiry Date',
                      type: 'date',
                    },
                    read_only: false,
                  },
                ],
                width: 0.25,
              },
              {
                type: 'group',
                children: [
                  {
                    endpoint: Endpoints.Country,
                    templateOptions: {
                      label: 'Nationality',
                      values: ['__str__'],
                      type: 'related',
                    },
                    type: 'related',
                    key: 'nationality',
                  },
                  {
                    key: 'vevo_checked_at',
                    type: 'datepicker',
                    showIf: [
                      {
                        residency: 3,
                      },
                    ],
                    templateOptions: {
                      required: false,
                      label: 'VEVO checked at',
                      type: 'date',
                    },
                    read_only: false,
                  },
                ],
                width: 0.25,
              },
            ],
          },
        ],
      },
      {
        endpoint: Endpoints.CandidateSkill,
        templateOptions: {
          label: 'Skills',
          type: 'list',
          text: 'Candidate skills',
        },
        prefilled: {
          candidate_contact: '{id}',
        },
        type: 'list',
        translateKey: 'skills',
        query: {
          candidate_contact: '{id}',
          fields: ['skill', 'score', 'prior_experience'],
        },
        metadata_query: {
          type: 'candidatepool',
        },
        help: 'Here you can see the skills which belong to the candidate',
      },
      {
        endpoint: Endpoints.CandidateTag,
        templateOptions: {
          label: 'Tags',
          type: 'list',
          text: 'Candidate tags',
        },
        prefilled: {
          candidate_contact: '{id}',
        },
        type: 'list',
        translateKey: 'tags',
        query: {
          candidate_contact: '{id}',
          fields: ['tag'],
        },
        metadata_query: {
          type: 'candidatepool',
        },
        help: 'Here you can see the tags which belong to the candidate',
      },
      {
        name: 'Tests',
        translateKey: 'tests',
        type: 'testList',
        endpoint: `${Endpoints.CandidateContact}{id}/tests/`,
        hideQuestions: true,
        query: {
          fields: ['acceptance_test', 'score'],
        },
      },
      {
        endpoint: Endpoints.CandidateEvaluation,
        templateOptions: {
          label: 'Evaluations',
          type: 'list',
          text: 'Evaluations',
        },
        prefilled: {
          candidate_contact: '{id}',
        },
        type: 'list',
        translateKey: 'evaluations',
        query: {
          candidate_contact: '{id}',
          fields: ['jobsite', 'position', 'evaluation_score', 'evaluated_at'],
        },
        metadata_query: {
          type: 'candidatepool',
        },
        help: 'Here you can see evaluations for the candidate',
      },
      {
        endpoint: Endpoints.ContactUnavailability,
        type: 'list',
        query: {
          contact: '{contact.id}',
          fields: [
            'unavailable_from',
            'unavailable_until',
            'notes',
            'created_at',
          ],
        },
        translateKey: 'unavailability',
        templateOptions: {
          label: 'Unavailabilities',
          type: 'list',
          text: 'Unavailabilities',
        },
        prefilled: {
          contact: '{contact.id}',
        },
        metadata_query: {
          type: 'candidatepool',
        },
      },
      {
        endpoint: Endpoints.CarrierList,
        templateOptions: {
          label: 'Carrier List',
          type: 'list',
          text: 'Carrier List',
        },
        prefilled: {
          candidate_contact: '{id}',
        },
        type: 'list',
        translateKey: 'carrier_list',
        query: {
          candidate_contact: '{id}',
          fields: ['target_date', 'confirmed_available'],
        },
        metadata_query: {
          type: 'candidatepool',
        },
        help: 'Here you can see information about carrier of candidate',
      },
      {
        endpoint: Endpoints.Note,
        templateOptions: {
          label: 'Notes',
          type: 'list',
          text: 'Notes',
        },
        prefilled: {
          object_id: '{id}',
          content_type: '{model_content_type}',
        },
        type: 'list',
        translateKey: 'notes',
        query: {
          object_id: '{id}',
          fields: ['created_at', 'note'],
        },
        metadata_query: {
          type: 'candidatepool',
        },
      },
    ],
  },
];

export const candidatepool = {
  list,
  form,
};
