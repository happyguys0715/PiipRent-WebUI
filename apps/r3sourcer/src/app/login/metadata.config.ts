import { Endpoints } from '@webui/models';

const formadd = [
  {
    key: 'username',
    type: 'input',
    templateOptions: {
      max: 255,
      required: true,
      type: 'text',
      label: 'Phone or E-mail address',
    },
    read_only: false,
  },
  {
    key: 'password',
    type: 'input',
    templateOptions: {
      max: 128,
      required: false,
      type: 'password',
      label: 'Password (optional)',
    },
    read_only: false,
  },
  {
    key: 'client_id',
    type: 'input',
    hide: true,
    templateOptions: {
      max: 128,
      required: false,
      type: 'text',
      label: 'Client Id',
    },
    read_only: false,
  },
  {
    key: 'grant_type',
    type: 'input',
    value: 'password',
    hide: true,
    templateOptions: {
      max: 128,
      required: false,
      type: 'text',
      label: 'Grant Type',
    },
    read_only: false,
  },
];

export const login = {
  formadd,
};

export const forgotpassword = {
  formadd: [
    {
      type: 'input',
      key: 'email',
      templateOptions: {
        label: 'Email',
        type: 'email',
        description:
          'Password reset instructions will be sent to this email address.',
      },
    },
  ],
};

export class Metadata {
  [Endpoints.Login] = login;
  [Endpoints.ContactForgotPassword] = forgotpassword;
}
