import { Endpoints } from '@webui/models';

const formset = {
  list: [],
  fields: [
    {
      key: 'language',
      type: 'related',
      width: 200,
      endpoint: `${Endpoints.CompanyLanguages}{company.id}/languages/`,
      templateOptions: {
        required: true,
        label: 'Language',
        display: '{language.name}{name}',
        listParam: '{language.alpha_2}{alpha_2}',
      },
    },
    {
      key: 'title',
      type: 'input',
      useValue: true,
      templateOptions: {
        required: true,
        label: 'Title',
        max: 1024,
        type: 'text',
      },
      read_only: false,
    },
    {
      key: 'short_description',
      type: 'input',
      templateOptions: {
        required: true,
        label: 'Short description',
        type: 'text',
      },
      read_only: false,
    },
    {
      key: 'button_text',
      type: 'input',
      templateOptions: {
        required: true,
        label: 'Button text',
        max: 512,
        type: 'text',
      },
      read_only: false,
    },
    {
      key: 'result_messages',
      type: 'textarea',
      templateOptions: {
        required: true,
        label: 'Result message',
        type: 'textarea',
      },
      read_only: false,
    },
  ],
};

export const formtranslations = {
  formset,
};
