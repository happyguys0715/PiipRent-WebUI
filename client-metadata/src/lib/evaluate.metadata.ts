const form = [
  {
    key: 'was_on_time',
    default: true,
    type: 'checkbox',
    templateOptions: {
      color: 'warning',
      type: 'icon',
      required: false,
      label: 'Was on time?',
      values: { false: 'star-o', true: 'star', null: 'minus-circle' },
    },
    read_only: false,
  },
  {
    key: 'was_motivated',
    default: true,
    type: 'checkbox',
    templateOptions: {
      color: 'warning',
      type: 'icon',
      required: false,
      label: 'Was motivated?',
      values: { false: 'star-o', true: 'star', null: 'minus-circle' },
    },
    read_only: false,
  },
  {
    key: 'had_ppe_and_tickets',
    default: true,
    type: 'checkbox',
    templateOptions: {
      color: 'warning',
      type: 'icon',
      required: false,
      label: 'Had PPE and tickets?',
      values: { false: 'star-o', true: 'star', null: 'minus-circle' },
    },
    read_only: false,
  },
  {
    key: 'met_expectations',
    default: true,
    type: 'checkbox',
    templateOptions: {
      color: 'warning',
      type: 'icon',
      required: false,
      label: 'Met Your expectations?',
      values: { false: 'star-o', true: 'star', null: 'minus-circle' },
    },
    read_only: false,
  },
  {
    key: 'representation',
    default: true,
    type: 'checkbox',
    templateOptions: {
      color: 'warning',
      type: 'icon',
      required: false,
      label: 'Was clean, well presented?',
      values: { false: 'star-o', true: 'star', null: 'minus-circle' },
    },
    read_only: false,
  },
  {
    key: 'evaluation_score',
    default: 0,
    type: 'select',
    templateOptions: {
      type: 'select',
      required: false,
      label: 'Level of Communication',
      options: [
        { label: 'Not Rated', value: 0 },
        { label: 'Impossible', value: 1 },
        { label: 'Hard', value: 2 },
        { label: 'Decent', value: 3 },
        { label: 'Good', value: 4 },
        { label: 'Excellent', value: 5 },
      ],
    },
    read_only: false,
  },
];

export const evaluate = {
  form,
};
