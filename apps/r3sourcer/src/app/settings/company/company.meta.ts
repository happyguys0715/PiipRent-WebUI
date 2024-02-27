import { BehaviorSubject } from 'rxjs';

import { Form } from '@webui/metadata';

export const purposeOptions = {
  hire: 'Hire',
  self_use: 'Self use',
  recruitment: 'Recruitment',
};

const formData = new BehaviorSubject({ data: {} });

const periodOptions = {
  weekly: 'Weekly',
  fortnightly: 'Fortnightly',
  monthly: 'Monthly',
  daily: 'Daily',
};

const weekOptions = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday',
};

const invoiceRuleOptions = {
  one_invoice: 'One invoice',
  per_jobsite: 'Per jobsite',
  per_candidate: 'Per candidate',
};

export const purposeConfig = new Form.select.element(
  'purpose',
  'Company purpose'
).addOptions(purposeOptions);

export const meta = [
  {
    type: 'row',
    children: [
      {
        type: 'group',
        label: 'Company Setting',
        translateKey: 'company_settings',
        children: [
          {
            type: 'input',
            key: 'company_settings.logo',
            read_only: false,
            companyContact: true,
            templateOptions: {
              label: 'Logo',
              label_upload: 'Choose a file',
              label_photo: 'Take a photo',
              type: 'picture',
              required: false,
              file: false,
            },
          },
          {
            type: 'radio',
            key: 'company_settings.font',
            label: true,
            default: 'Source Sans Pro',
            templateOptions: {
              label: 'Font',
              type: 'text',
              column: true,
              options: [
                { value: 'Source Sans Pro', label: 'Source Sans Pro' },
                { value: 'Roboto', label: 'Roboto' },
                { value: 'Barlow', label: 'Barlow' },
                { value: 'Open Sans', label: 'Open Sans' },
              ],
            },
          },
          {
            type: 'radio',
            key: 'company_settings.color_scheme',
            default: 'default',
            label: true,
            templateOptions: {
              label: 'Color scheme',
              type: 'color',
              inline: true,
              options: [
                { value: 'default', label: '#28A3FC' },
                { value: 'labour', label: '#f58926' },
                { value: 'indigo', label: '#3f51b5' },
                { value: 'teal', label: '#009688' },
                { value: 'brown', label: '#795548' },
              ],
            },
          },
        ],
      },
      {
        type: 'group',
        children: [
          {
            type: 'input',
            key: 'company_settings.forwarding_number',
            templateOptions: {
              max: 32,
              label: 'Forwarding number',
              type: 'text',
            },
          },
          {
            type: 'input',
            key: 'company_settings.billing_email',
            templateOptions: {
              max: 32,
              label: 'Billing email',
              type: 'email',
            },
          },
          {
            key: 'company_settings.sms_enabled',
            type: 'checkbox',
            read_only: false,
            templateOptions: {
              label: 'SMS sending enabled',
              type: 'checkbox',
              description:
                'Please deselect this checkbox if you want to disable sms sending from r3sourcer software',
              required: false,
            },
          },
          {
            key: 'company_settings.pre_shift_sms_enabled',
            type: 'checkbox',
            formData,
            read_only: false,
            templateOptions: {
              label: 'Pre-Shift check enabled',
              type: 'checkbox',
              required: false,
            },
          },
          {
            type: 'input',
            key: 'company_settings.pre_shift_sms_delta',
            formData,
            showIf: [
              {
                'company_settings.pre_shift_sms_enabled': true,
              },
            ],
            templateOptions: {
              max: 240,
              min: 1,
              label: 'Pre-Shift check SMS time interval (minutes)',
              type: 'number',
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    children: [
      // {
      //   label: 'Payslip Rule',
      //   type: 'group',
      //   children: [
      //     {
      //       type: 'select',
      //       key: 'payslip_rule.period',
      //       read_only: false,
      //       templateOptions: {
      //         label: 'Period',
      //         required: true,
      //         options: [
      //           { value: 'weekly', label: 'Weekly' },
      //           { value: 'fortnightly', label: 'Fortnightly' },
      //           { value: 'monthly', label: 'Monthly' },
      //           { value: 'daily', label: 'Daily' },
      //         ]
      //       }
      //     }
      //   ]
      // },
      {
        label: 'Invoice Rule',
        type: 'group',
        translateKey: 'invoice_rule',
        children: [
          new Form.select.element('invoice_rule.period', 'Period')
            .setTranslateKey('period')
            .addOptions(periodOptions)
            .updateModel({ formData })
            .updateTemplate({ required: true }),

          new Form.select.element(
            'invoice_rule.period_zero_reference_weekly',
            'Invoice generation time'
          )
            .setTranslateKey('period_zero_reference_weekly')
            .addOptions(weekOptions)
            .updateModel({
              formData,
              default: 1,
              showIf: [
                {
                  'invoice_rule.period': 'weekly',
                },
              ],
            }),

          new Form.select.element(
            'invoice_rule.period_zero_reference_fortnightly',
            'Invoice generation time'
          )
            .setTranslateKey('period_zero_reference_weekly')
            .addOptions(weekOptions)
            .updateModel({
              formData,
              default: 1,
              showIf: [
                {
                  'invoice_rule.period': 'fortnightly',
                },
              ],
            }),

          {
            type: 'datepicker',
            key: 'invoice_rule.period_zero_reference_date',
            read_only: false,
            formData,
            customDatepicker: {
              dateFormat: 'DD',
              datepickerFormat: '%d',
              parseFormat: 'DD',
            },
            templateOptions: {
              label: 'Invoice generation time',
              type: 'date',
              clear: false,
              change: false,
            },
            showIf: [
              {
                'invoice_rule.period': 'monthly',
              },
            ],
          },
          new Form.select.element(
            'invoice_rule.separation_rule',
            'Separation rule'
          )
            .setTranslateKey('separation_rule')
            .addOptions(invoiceRuleOptions)
            .updateTemplate({ required: true }),

          {
            type: 'checkbox',
            key: 'invoice_rule.show_candidate_name',
            default: false,
            templateOptions: {
              label: 'Show candidate name',
            },
          },
          {
            type: 'input',
            key: 'invoice_rule.serial_number',
            default: false,
            templateOptions: {
              label: 'Prefix',
              type: 'text',
            },
          },
          {
            type: 'input',
            key: 'invoice_rule.starting_number',
            default: 1,
            templateOptions: {
              label: 'Start numbers from',
              type: 'number',
              min: 1,
            },
          },
        ],
      },
      {
        type: 'group',
        children: [
          {
            type: 'editor',
            key: 'company_settings.invoice_template',
            templateOptions: {
              label: 'Invoice footer comment/notes',
            },
          },
        ],
      },
    ],
  },
];
