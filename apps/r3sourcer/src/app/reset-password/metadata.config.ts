import { Endpoints } from '@webui/models';

export const resetpassword = {
  formadd: [
    {
      key: 'token',
      type: 'input',
      hide: true,
      templateOptions: {
        max: 128,
        required: false,
        type: 'text',
        label: 'Token',
      },
      read_only: false,
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        max: 128,
        required: true,
        type: 'password',
        label: 'Password (optional)',
      },
      read_only: false,
    },
  ],
};

export class Metadata {
  [Endpoints.ContactResetPassword] = resetpassword;
}
