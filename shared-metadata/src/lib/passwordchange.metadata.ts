const form = [
  {
    type: 'input',
    key: 'old_password',
    templateOptions: {
      label: 'Current Password',
      type: 'password',
    },
  },
  {
    type: 'input',
    key: 'password',
    templateOptions: {
      label: 'New Password',
      type: 'password',
      description:
        'The password must be 8-20 characters, and must not contain spaces.',
      min: 8,
      max: 20,
    },
  },
  {
    type: 'input',
    key: 'confirm_password',
    templateOptions: {
      label: 'Verify',
      type: 'password',
      description: 'To confirm, type the new password again.',
    },
  },
];

export const passwordchange = {
  form,
};
