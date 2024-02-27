import { ApiMethod, Color, Models, NoteModel } from '@webui/data';
import {
  createFilter,
  DatepickerType,
  CheckboxType,
  Type,
  Form,
  List,
  Filter,
} from '@webui/metadata';
import { Endpoints } from '@webui/models';

const filters = {
  status: new Filter.select.element({
    key: 'status',
    label: 'Status',
    values: [
      { label: 'Pending submission', value: '4' },
      { label: 'Pending approval', value: '5' },
      { label: 'Approved', value: '7' },
    ],
  }),
  shift_started_at: createFilter(Type.Date, {
    key: 'shift_started_at',
    label: 'Shift Started at',
    yesterday: true,
    today: true,
    tomorrow: true,
  }),
  supervisor: createFilter(Type.Related, {
    key: 'supervisor',
    label: 'Supervisor',
    endpoint: Endpoints.CompanyContact,
  }),
  candidate: createFilter(Type.Related, {
    key: 'candidate',
    label: 'Candidate Contact',
    endpoint: Endpoints.CandidateContact,
    searchParam: 'full_name',
  }),
  position: createFilter(Type.Related, {
    key: 'position',
    label: 'Position',
    endpoint: Endpoints.SkillName,
    parameter: 'skill_id',
    display: 'translations',
  }),
  client: createFilter(Type.Related, {
    key: 'company',
    label: 'Client',
    endpoint: Endpoints.Company,
  }),
  jobsite: createFilter(Type.Related, {
    key: 'jobsite',
    label: 'Jobsite',
    endpoint: Endpoints.Jobsite,
    queryParams: {
      is_available: 'True',
      regular_company: '{company}',
    },
  }),
};

const list = {
  list: {
    list: 'timesheet',
    // innerEdit: true,
    label: 'Timesheet Entry',
    columns: [
      {
        content: [
          {
            endpoint: '/hr/jobsites/{jobsite.id}',
            field: 'jobsite',
            type: 'link',
          },
          {
            field: 'supervisor.__str__',
            type: 'text',
          },
        ],
        width: 360,
        name: 'client_/_jobsite_/_supervisor',
        title: null,
        sort: true,
        sortMap: [
          {
            name: 'client',
            param: 'job_offer__shift__date__job__customer_company__name',
          },
          {
            name: 'jobsite',
            param: 'job_offer__shift__date__job__jobsite__short_name',
          },
        ],
        label: 'client / jobsite / supervisor',
        delim: null,
      },
      {
        content: [
          {
            endpoint:
              '/candidate/candidatecontacts/{job_offer.candidate_contact.id}',
            field: 'job_offer.candidate_contact',
            type: 'link',
          },
          {
            field: 'position.__str__',
            description: ' ',
            type: 'text',
          },
          {
            endpoint: '/hr/jobs/{job.id}',
            field: 'job.id',
            color: 'primary',
            text: 'common.job-information',
            type: 'link',
            translateKey: 'tabs.job_info.label',
          },
        ],
        width: 270,
        name: 'position_/_candidate',
        title: null,
        label: 'Position / Candidate / Job',
        delim: null,
      },
      {
        content: [
          {
            type: 'button',
            color: 'link',
            endpoint:
              '/candidate/location/{job_offer.candidate_contact.id}/history/',
            field: 'id',
            action: 'showTracking',
            customLink: true,
            image: '/assets/img/map-lg.jpg',
          },
        ],
        name: 'tracking',
        title: null,
        label: 'Tracking',
        delim: null,
      },
      {
        content: [
          {
            text: '{shift.date.__str__}',
            type: 'static',
            label: 'shift_date.label',
            field: 'shift.date',
          },
          {
            field: 'timesheet_rates',
            type: 'skillactivity',
            label: 'Skill Activities',
          },
        ],
        name: 'time',
        sort: true,
        sorted: 'desc',
        sort_field: 'shift_started_at',
        title: null,
        label: 'Date and times',
        delim: null,
      },
      {
        content: [
          {
            values: {
              false: 'times',
              true: 'check',
              null: 'minus-circle',
            },
            field: 'going_to_work_confirmation',
            translateKey: 'pre_shift_check',
            type: 'icon',
            label: 'Pre-shift check',
          },
          {
            values: {
              false: 'times',
              true: 'check',
              null: 'minus-circle',
            },
            field: 'candidate_filled',
            type: 'icon',
            label: 'Candidate filled',
            translateKey: 'candidate_filled',
            showIf: [
              {
                candidate_filled: true,
              },
            ],
          },
          {
            values: {
              false: 'times',
              true: 'check',
              null: 'minus-circle',
            },
            field: 'supervisor_approved',
            type: 'icon',
            label: 'Supervisor approved',
            translateKey: 'supervisor_approved',
            showIf: [
              {
                supervisor_approved: true,
              },
            ],
          },
          {
            endpoint: '/hr/timesheets/{id}/confirm',
            action: 'emptyPost',
            text: 'Confirm Check',
            type: 'button',
            translationKey: 'confirm_check',
            field: 'id',
            showIf: [
              {
                going_to_work_confirmation: null,
              },
            ],
          },
          {
            endpoint: '/hr/timesheets/{id}/resend_sms',
            field: 'resend_sms_candidate',
            showIf: [
              {
                resend_sms_candidate: true,
              },
            ],
            translationKey: 'send',
            action: 'emptyPost',
            type: 'button',
            text: 'send',
          },
          {
            endpoint: '/hr/timesheets/{id}/resend_supervisor_sms',
            field: 'resend_sms_supervisor',
            showIf: [
              {
                resend_sms_supervisor: true,
              },
            ],
            action: 'emptyPost',
            type: 'button',
            translationKey: 'send_supervisor',
            text: 'Send Supervisor',
          },
          {
            endpoint: '/hr/timesheets/{id}/candidate_fill',
            field: 'id',
            showIf: [
              {
                resend_sms_candidate: true,
              },
            ],
            action: 'editForm',
            type: 'button',
            translationKey: 'fill',
            text: 'Fill',
          },
          {
            endpoint: '/hr/timesheets/{id}/supervisor_approve',
            field: 'id',
            showIf: [
              {
                resend_sms_supervisor: true,
              },
            ],
            action: 'editForm',
            type: 'button',
            text: 'action.approve',
          },
        ],
        name: 'confirmations',
        title: null,
        label: 'Confirmations',
        delim: null,
      },
      {
        delim: null,
        label: 'Related sms',
        sort: true,
        content: [
          {
            action: 'messageDetail',
            messageType: 'sent',
            color: 'link',
            endpoint: '/sms-interface/smsmessages/{going_to_work_sent_sms.id}',
            field: 'going_to_work_sent_sms',
            type: 'button',
            text: 'Preshift check',
          },
          {
            action: 'messageDetail',
            messageType: 'reply',
            color: 'link',
            endpoint: '/sms-interface/smsmessages/{going_to_work_reply_sms.id}',
            field: 'going_to_work_reply_sms',
            type: 'button',
            text: 'Reply',
          },
          {
            action: 'messageDetail',
            messageType: 'sent',
            color: 'link',
            endpoint: '/sms-interface/smsmessages/{candidate_sms.id}',
            field: 'candidate_sms',
            type: 'button',
            text: 'Candidate TS',
            showIf: ['candidate_sms'],
          },
          {
            action: 'messageDetail',
            messageType: 'sent',
            color: 'link',
            endpoint: '/sms-interface/smsmessages/{supervisor_sms.id}',
            field: 'supervisor_sms',
            type: 'button',
            text: 'Supervisor TS',
            showIf: ['supervisor_sms'],
          },
        ],
        name: 'related_sms',
        title: null,
        sort_field: 'related_sms',
      },
      {
        content: [
          // {
          //   field: 'myob_status',
          //   type: 'text',
          //   showIf: [
          //     {
          //       show_sync_button: false
          //     }
          //   ]
          // },

          {
            label: {
              0: 'sync_status.not_synced',
              1: 'sync_status.sync_scheduled',
              2: 'sync_status.syncing',
              3: 'sync_status.synced',
              4: 'sync_status.sync_failed',
            },
            type: 'icon',
            field: 'sync_status',
          },

          {
            endpoint: '/hr/timesheets/{id}/sync',
            field: 'id',
            showIf: [{ sync_status: [0, 4] }],
            action: 'emptyPost',
            type: 'button',
            text: 'common.sync',
          },
          {
            endpoint: '/hr/timesheets/{id}/resync',
            field: 'id',
            showIf: [{ sync_status: [2, 3] }],
            action: 'emptyPost',
            type: 'button',
            text: 'Resync',
          },
        ],
        name: 'myob_status',
        title: null,
        label: 'MYOB status',
        delim: null,
      },
      {
        content: [
          {
            endpoint: '/core/invoices/{invoice.id}',
            field: 'invoice',
            type: 'link',
            text: 'Show invoice',
            color: 'primary',
          },
          {
            action: 'emptyPost',
            text: 'common.recreate-invoice',
            endpoint: '/hr/timesheets/{id}/recreate_invoice',
            type: 'button',
            showIf: [
              {
                supervisor_approved: true,
              },
            ],
          },
        ],
        name: 'invoice',
        title: null,
        label: 'Invoice',
        delim: null,
      },

      new List.column.element('candidate_notes', 'Notes').setContent([
        new List.text.element('candidate_notes', 'Notes'),
      ]),

      new List.column.element('client_notes', 'Notes').setContent([
        new List.text.element('client_notes', 'Notes'),
      ]),

      new List.column.element('candidate_files', 'Files').setContent([
        new List.text.element('candidate_files', 'Files'),
      ]),

      new List.column.element('client_files', 'Files').setContent([
        new List.text.element('client_files', 'Files'),
      ]),
    ],
    tabs: [
      {
        label: 'Related SMS',
        is_collapsed: true,
        fields: ['related_sms'],
      },
      {
        label: 'MYOB Status',
        is_collapsed: true,
        fields: ['myob_status'],
      },
      {
        label: 'Invoice',
        is_collapsed: true,
        fields: ['invoice'],
      },
      {
        label: 'Candidate',
        is_collapsed: true,
        fields: ['candidate_notes', 'candidate_files'],
      },
      {
        label: 'Client',
        is_collapsed: true,
        fields: ['client_notes', 'client_files'],
      },
    ],
    pagination_label: 'Timesheet Entry',
    search_enabled: false,
    editDisable: false,
    filters: [
      filters.status,
      filters.shift_started_at,
      filters.supervisor,
      filters.candidate,
      filters.position,
      filters.client,
      filters.jobsite,
    ],
    actions: {
      options: [
        {
          endpoint: `${Endpoints.Timesheet}generate_pdf_timesheet/`,
          label: 'action.pdf-by-jobsite',
          selectionError: 'message.please-select-timesheet',
          confirm: false,
          message: 'are_you_sure',
          property: 'timesheets',
          required: true,
        },
        {
          endpoint: `${Endpoints.Timesheet}generate_summary_pdf/`,
          label: 'action.salary-report',
          selectionError: 'message.please-select-timesheet',
          confirm: false,
          message: 'are_you_sure',
          property: 'timesheets',
          required: true,
        },
        {
          endpoint: `${Endpoints.Timesheet}generate_gross_profit_pdf/`,
          label: 'action.profit-report',
          selectionError: 'message.please-select-timesheet',
          confirm: false,
          message: 'are_you_sure',
          property: 'timesheets',
          required: true,
        },
        {
          endpoint: `${Endpoints.Timesheet}{id}/supervisor_approve/`,
          signature_endpoint: `${Endpoints.Timesheet}{id}/approve_by_signature/`,
          label: 'action.approve',
          selectionError: 'message.please-select-timesheet',
          confirm: false,
          property: 'id',
          required: true,
          multiple: true,
          method: ApiMethod.PUT,
          bodyFields: [
            'shift_started_at',
            'shift_ended_at',
            'break_started_at',
            'break_ended_at',
            { send_candidate_message: false },
            { send_supervisor_message: false },
            { no_break: false },
            { manager_who_approved: '{session.currentRole.client_contact_id}' },
          ],
          bodySignature: {
            supervisor_signature: '',
          },
        },
      ],
      label: 'Actions',
      agree_label: 'agree',
      button_label: 'action.go',
      decline_label: 'decline',
    },
    buttons: [],
  },
  fields: [
    {
      key: 'going_to_work_confirmation',
      type: 'checkbox',
      showIf: [
        {
          going_to_work_confirmation: true,
        },
      ],
      templateOptions: {
        required: false,
        label: 'Morning check',
        type: 'icon',
        values: {
          false: 'times',
          true: 'check',
          null: 'minus-circle',
        },
      },
      read_only: true,
    },
    {
      key: 'company',
      type: 'link',
      templateOptions: {
        label: '',
        type: 'link',
        link: null,
        text: '',
      },
      read_only: true,
    },
    {
      key: 'supervisor_approved',
      type: 'checkbox',
      showIf: [
        {
          supervisor_approved: true,
        },
      ],
      templateOptions: {
        required: false,
        label: 'Supervisor approved',
        type: 'icon',
        values: {
          false: 'times',
          true: 'check',
          null: 'minus-circle',
        },
      },
      read_only: true,
    },
    {
      key: 'break_started_ended',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Break started ended',
        type: 'static',
      },
      read_only: true,
    },
    {
      read_only: true,
      key: 'resend_sms_candidate',
      type: 'button',
      templateOptions: {
        action: 'emptyPost',
        label: '',
        type: 'button',
        text: 'send',
      },
      showIf: [
        {
          resend_sms_candidate: true,
        },
      ],
    },
    {
      key: 'shift_started_ended',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Shift started ended',
        type: 'static',
      },
      read_only: true,
    },
    {
      key: 'jobsite',
      type: 'link',
      templateOptions: {
        label: '',
        type: 'link',
        link: null,
        text: '',
      },
      read_only: true,
    },
    {
      read_only: true,
      key: 'resend_sms_supervisor',
      type: 'button',
      templateOptions: {
        action: 'emptyPost',
        label: '',
        type: 'button',
        text: 'Send Supervisor',
      },
      showIf: [
        {
          resend_sms_supervisor: true,
        },
      ],
    },
    {
      list: false,
      endpoint: '/sms-interface/smsmessages/',
      read_only: true,
      templateOptions: {
        label: 'Related sms',
        add: true,
        delete: false,
        values: ['__str__'],
        type: 'related',
        edit: true,
      },
      collapsed: false,
      type: 'related',
      key: 'related_sms',
      many: true,
    },
    {
      key: 'going_to_work_reply_sms',
      type: 'button',
      templateOptions: {
        action: 'editForm',
        label: '',
        type: 'button',
        text: 'Reply',
      },
      read_only: true,
    },
    {
      key: 'job_offer.candidate_contact',
      type: 'link',
      templateOptions: {
        label: '',
        type: 'link',
        link: null,
        text: '',
      },
      read_only: true,
    },
    {
      read_only: true,
      key: 'id',
      type: 'button',
      templateOptions: {
        action: 'emptyPost',
        label: 'Morning check:',
        type: 'button',
        text: 'Confirm',
      },
      showIf: [
        {
          going_to_work_confirmation: null,
        },
      ],
    },
    {
      key: 'position',
      type: 'link',
      templateOptions: {
        label: '',
        type: 'link',
        link: null,
        text: '',
      },
      read_only: true,
    },
    {
      key: 'myob_status',
      type: 'input',
      showIf: [
        {
          show_sync_button: false,
        },
      ],
      templateOptions: {
        required: false,
        label: 'Myob status',
        type: 'text',
      },
      read_only: true,
    },
    {
      key: 'supervisor',
      type: 'link',
      templateOptions: {
        label: '',
        type: 'link',
        link: null,
        text: '',
      },
      read_only: true,
    },
    {
      key: 'job',
      type: 'link',
      templateOptions: {
        label: '',
        type: 'link',
        link: null,
        text: 'Job',
      },
      read_only: true,
    },
    {
      key: 'going_to_work_sent_sms',
      type: 'button',
      templateOptions: {
        action: 'editForm',
        label: '',
        type: 'button',
        text: 'Candidate Going To Work',
      },
      read_only: true,
    },
    {
      key: 'candidate_filled',
      type: 'checkbox',
      showIf: [
        {
          candidate_filled: true,
        },
      ],
      templateOptions: {
        required: false,
        label: 'Candidate filled',
        type: 'icon',
        values: {
          false: 'times',
          true: 'check',
          null: 'minus-circle',
        },
      },
      read_only: true,
    },
  ],
};

const supervisor = {
  fields: [
    {
      default: 'contact_pictures/default_picture.jpg',
      key: 'job_offer.candidate_contact.contact.picture',
      read_only: false,
      templateOptions: {
        required: false,
        file: false,
        label: 'Picture',
        max: 255,
        type: 'picture',
        label_photo: 'Take a photo',
        label_upload: 'Choose a file',
      },
      type: 'input',
    },
    {
      default: '2018-07-05T15:30:00+10:00',
      key: 'shift_ended_at',
      read_only: false,
      templateOptions: {
        required: false,
        label: 'Shift ended at',
        type: 'static',
        text: '{shift_ended_at__time}',
      },
      type: 'static',
    },
    {
      default: '2018-07-05T12:00:00+10:00',
      key: 'break_started_at',
      read_only: false,
      templateOptions: {
        required: false,
        label: 'Break',
        type: 'static',
        text: '{break_started_at__time} - {break_ended_at__time}',
      },
      type: 'static',
    },
    {
      key: 'job_offer.candidate_contact',
      templateOptions: { link: null, label: '', type: 'link', text: '' },
      type: 'link',
    },
    {
      key: 'position',
      read_only: true,
      templateOptions: { required: false, label: 'Position', type: 'static' },
      type: 'static',
    },
    {
      key: 'shift_started_at',
      read_only: false,
      templateOptions: {
        required: false,
        label: 'Shift date',
        type: 'static',
        text: '{shift_started_at__date}',
      },
      type: 'static',
    },
  ],
  list: {
    columns: [
      {
        name: 'job_offer.candidate_contact.contact.picture',
        content: [
          new List.picture.element(
            'job_offer.candidate_contact.contact.picture',
            { avatar: true }
          ),
        ],
        label: 'Picture',
      },
      {
        name: 'position',
        content: [
          {
            endpoint:
              '/candidate/candidatecontacts/{job_offer.candidate_contact.id}/',
            type: 'link',
            field: 'job_offer.candidate_contact',
          },
          { label: 'position.label', type: 'static', field: 'position' },
        ],
        label: 'Position',
        title: null,
        delim: null,
      },
      {
        content: [
          {
            text: '{shift.date.__str__}',
            type: 'static',
            label: 'shift_date.label',
            field: 'shift.date',
          },
          {
            field: 'timesheet_rates',
            type: 'skillactivity',
            label: 'Skill Activities',
          },
        ],
        name: 'time',
        sort: true,
        sorted: 'desc',
        sort_field: 'shift_started_at',
        title: null,
        label: 'Date and times',
        delim: null,
      },
    ],
    list: 'timesheet',
    editDisable: false,
    label: 'Timesheet Entry',
    pagination_label: 'Timesheet Entry',
    search_enabled: false,
  },
};

const form = [
  {
    key: 'id',
    type: 'input',
    hide: true,
    templateOptions: {
      required: false,
      label: 'Id',
      type: 'text',
    },
    read_only: false,
  },
  {
    type: 'tabs',
    children: [
      {
        main: true,
        name: 'Main information',
        label: 'Main information',
        translateKey: 'main_information',
        type: 'group',
        children: [
          {
            type: 'row',
            children: [
              {
                type: 'group',
                width: 0.25,
                hideLabel: true,
                children: [
                  {
                    endpoint: Endpoints.Company,
                    read_only: true,
                    templateOptions: {
                      label: 'Client',
                      values: ['__str__'],
                      type: 'related',
                    },
                    type: 'related',
                    key: 'company',
                  },
                  {
                    endpoint: Endpoints.Skill,
                    read_only: true,
                    templateOptions: {
                      label: 'Position',
                      values: ['__str__'],
                      type: 'related',
                      placeholder: 'Please select role/trade',
                    },
                    type: 'related',
                    key: 'position',
                  },
                ],
              },
              {
                type: 'group',
                width: 0.25,
                hideLabel: true,
                children: [
                  {
                    endpoint: Endpoints.Jobsite,
                    read_only: true,
                    templateOptions: {
                      label: 'Jobsite',
                      values: ['__str__'],
                      type: 'related',
                    },
                    type: 'related',
                    key: 'jobsite',
                  },
                  {
                    endpoint: Endpoints.CandidateContact,
                    read_only: true,
                    send: false,
                    templateOptions: {
                      label: 'Candidate',
                      values: ['__str__'],
                      type: 'related',
                    },
                    type: 'related',
                    key: 'job_offer.candidate_contact',
                  },
                ],
              },
              {
                type: 'group',
                width: 0.25,
                hideLabel: true,
                children: [
                  {
                    endpoint: Endpoints.CompanyContact,
                    read_only: '{supervisor_approved_at}',
                    templateOptions: {
                      label: 'Supervisor',
                      values: ['__str__'],
                      type: 'related',
                    },
                    query: {
                      company: '{company.id}',
                    },
                    type: 'related',
                    key: 'supervisor',
                  },
                  {
                    type: 'static',
                    read_only: true,
                    send: false,
                    hide: true,
                    key: 'supervisor_signature',
                    templateOptions: {
                      label: 'Signature',
                      file: false,
                    },
                  },
                  {
                    type: 'input',
                    read_only: true,
                    send: false,
                    key: 'supervisor_signature.origin',
                    showIf: ['supervisor_signature.origin'],
                    templateOptions: {
                      label: 'Signature',
                      type: 'picture',
                      file: false,
                      signature: true,
                    },
                  },
                ],
              },
              {
                type: 'group',
                width: 0.25,
                hideLabel: true,
                children: [
                  {
                    type: 'select',
                    key: 'status',
                    read_only: true,
                    translateKey: 'timesheet_status',
                    templateOptions: {
                      label: 'Status',
                      options: [
                        { value: 0, label: 'New', color: Color.Success },
                        {
                          value: 1,
                          label: 'Check pending',
                          color: Color.Warning,
                        },
                        {
                          value: 2,
                          label: 'Check confirmed',
                          color: Color.Success,
                        },
                        {
                          value: 3,
                          label: 'Check failed',
                          color: Color.Danger,
                        },
                        {
                          value: 4,
                          label: 'Submit pending',
                          color: Color.Warning,
                        },
                        {
                          value: 5,
                          label: 'Pending approval',
                          color: Color.Success,
                        },
                        {
                          value: 6,
                          label: 'Supervisor modified',
                          color: Color.Success,
                        },
                        { value: 7, label: 'Approved', color: Color.Success },
                      ],
                    },
                  },
                  {
                    type: 'static',
                    width: 0.2,
                    read_only: true,
                    send: false,
                    key: 'myob_status',
                    templateOptions: {
                      label: 'Accounting Integration',
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'row',
            children: [
              {
                type: 'group',
                hideLabel: true,
                width: 0.2,
                children: [
                  {
                    type: 'static',
                    key: 'shift',
                    send: false,
                    read_only: true,
                    templateOptions: {
                      label: 'Shift Date',
                      display: '{date.__str__}',
                    },
                  },
                ],
              },
              {
                type: 'group',
                hideLabel: true,
                width: 0.2,
                children: [
                  {
                    type: 'static',
                    key: 'total_time',
                    send: false,
                    read_only: true,
                    templateOptions: {
                      label: 'Total time',
                      color: 'text-success',
                      bold: true,
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'row',
            children: [
              {
                type: 'group',
                hideLabel: true,
                width: 0.2,
                children: [
                  {
                    key: 'shift_started_at',
                    type: 'datepicker',
                    templateOptions: {
                      required: true,
                      label: 'Shift Started at',
                      type: 'datetime',
                    },
                  },
                  {
                    key: 'shift_ended_at',
                    type: 'datepicker',
                    templateOptions: {
                      label: 'Shift Ended at',
                      type: 'datetime',
                    },
                  },
                ],
              },
              {
                type: 'group',
                hideLabel: true,
                width: 0.2,
                children: [
                  new Form.datepicker.element(
                    'break_started_at',
                    'Break Start',
                    DatepickerType.Datetime
                  )
                    .setDefaultValue('{break_started_at}')
                    .setWidth(0.25)
                    .saveValue()
                    .setShowIfRule([{ no_break: false }]),
                  new Form.datepicker.element(
                    'break_ended_at',
                    'Break End',
                    DatepickerType.Datetime
                  )
                    .setDefaultValue('{break_ended_at}')
                    .setWidth(0.25)
                    .saveValue()
                    .setShowIfRule([{ no_break: false }]),
                  new Form.checkbox.element(
                    'no_break',
                    'No Break',
                    CheckboxType.Checkbox
                  )
                    .setDefaultValue(false)
                    .updateByNull(['break_started_at', 'break_ended_at'])
                    .setWidth(0.25),
                  // .doNotSend(),
                ],
              },
              {
                type: 'group',
                hideLabel: true,
                width: 0.59,
                children: [
                  {
                    type: 'tracking',
                    translateKey: 'tracking',
                    templateOptions: {
                      label: 'Tracking',
                    },
                  },
                ],
              },
            ],
          },
          new Form.list.element(
            'Skill Activities',
            Endpoints.TimesheetRates,
            'timesheetrates'
          )
            .setQuery({
              timesheet: '{id}',
            })
            .setPrefilledFields({
              [Models.Skill]: '{position.id}',
              [Models.Timesheet]: '{id}',
              company: '{company.id}',
              candidate_contact: '{job_offer.candidate_contact.id}',
            }),
        ],
      },
      {
        name: 'Additional information',
        translateKey: 'additional_information',
        type: 'group',
        children: [
          {
            type: 'row',
            children: [
              {
                width: 0.25,
                type: 'checkbox',
                key: 'going_to_work_confirmation',
                templateOptions: {
                  label: 'Pre-shift check',
                  type: 'checkbox',
                },
              },
              {
                width: 0.25,
                endpoint: Endpoints.SmsMessages,
                read_only: true,
                templateOptions: {
                  label: 'Pre-shift check sent sms',
                  values: ['__str__'],
                  type: 'related',
                  edit: true,
                },
                metadata_query: {
                  type: 'sent',
                },
                add_metadata_query: {
                  type: 'sent',
                },
                type: 'related',
                key: 'going_to_work_sent_sms',
              },
              {
                width: 0.25,
                endpoint: Endpoints.SmsMessages,
                read_only: true,
                templateOptions: {
                  label: 'Pre-shift check reply sms',
                  values: ['__str__'],
                  type: 'related',
                  edit: true,
                },
                metadata_query: {
                  type: 'reply',
                },
                add_metadata_query: {
                  type: 'reply',
                },
                type: 'related',
                key: 'going_to_work_reply_sms',
              },
            ],
          },
          {
            type: 'row',
            children: [
              {
                width: 0.25,
                key: 'candidate_submitted_at',
                type: 'datepicker',
                templateOptions: {
                  label: 'Candidate Submitted at',
                  type: 'datetime',
                },
              },
              {
                width: 0.25,
                key: 'supervisor_approved_at',
                type: 'datepicker',
                templateOptions: {
                  label: 'Supervisor Approved at',
                  type: 'datetime',
                },
              },
              {
                width: 0.25,
                key: 'supervisor_modified_at',
                type: 'datepicker',
                templateOptions: {
                  label: 'Supervisor Modified at',
                  type: 'datetime',
                },
              },
            ],
          },
          {
            type: 'row',
            children: [
              {
                width: 0.25,
                type: 'input',
                key: 'candidate_rate',
                templateOptions: {
                  label: 'Candidate rate override',
                  type: 'number',
                  text: '{currency}{candidate_rate}/h',
                },
              },
              {
                width: 0.25,
                endpoint: Endpoints.CompanyContact,
                type: 'related',
                key: 'rate_overrides_approved_by',
                templateOptions: {
                  label: 'Rate overrides approved by',
                  values: ['__str__'],
                  type: 'related',
                },
              },
              {
                width: 0.25,
                key: 'rate_overrides_approved_at',
                type: 'datepicker',
                templateOptions: {
                  label: 'Rate overrides approved at',
                  type: 'date',
                },
              },
            ],
          },
          {
            type: 'row',
            children: [
              {
                endpoint: Endpoints.SmsMessages,
                read_only: true,
                strField: 'type',
                templateOptions: {
                  label: 'Related sms',
                  values: ['__str__'],
                  edit: true,
                },
                metadata_query: {
                  type: 'reply',
                },
                add_metadata_query: {
                  type: 'reply',
                },
                column: true,
                type: 'related',
                key: 'related_sms',
                many: true,
              },
            ],
          },
        ],
      },
      new NoteModel().formListElement({
        query: 'formset',
        model_content_type: '112',
      }),
    ],
  },
  {
    endpoint: Endpoints.JobOffer,
    hide: true,
    templateOptions: {
      label: 'Job offer',
      values: ['__str__'],
      type: 'related',
    },
    type: 'related',
    key: 'job_offer',
  },
];

const formadd = [
  {
    list: false,
    endpoint: '/hr/joboffers/',
    read_only: false,
    templateOptions: {
      required: true,
      label: 'Job offer',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    type: 'related',
    key: 'job_offer',
    many: false,
  },
  {
    list: false,
    endpoint: '/sms-interface/smsmessages/',
    read_only: true,
    templateOptions: {
      label: 'Going to work sent sms',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'going_to_work_sent_sms',
    many: false,
  },
  {
    list: false,
    endpoint: '/sms-interface/smsmessages/',
    read_only: true,
    templateOptions: {
      label: 'Going to work reply sms',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'going_to_work_reply_sms',
    many: false,
  },
  {
    key: 'going_to_work_confirmation',
    type: 'checkbox',
    templateOptions: {
      required: false,
      label: 'Going to Work',
      type: 'checkbox',
    },
    read_only: false,
  },
  {
    key: 'shift_started_at',
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'Shift Started at',
      type: 'datetime',
    },
    read_only: false,
  },
  {
    key: 'break_started_at',
    default: '-',
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'Break Started at',
      type: 'datetime',
    },
    read_only: false,
  },
  {
    key: 'break_ended_at',
    default: '-',
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'Break Ended at',
      type: 'datetime',
    },
    read_only: false,
  },
  {
    key: 'shift_ended_at',
    default: '2018-07-04T15:30:00+10:00',
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'Shift Ended at',
      type: 'datetime',
    },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/core/companycontacts/',
    read_only: true,
    templateOptions: {
      label: 'Supervisor',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    type: 'related',
    key: 'supervisor',
    many: false,
  },
  {
    key: 'candidate_submitted_at',
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'Candidate Submitted at',
      type: 'datetime',
    },
    read_only: false,
  },
  {
    key: 'supervisor_approved_at',
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'Supervisor Approved at',
      type: 'datetime',
    },
    read_only: false,
  },
  {
    templateOptions: {
      label: 'Candidate rate override',
      type: 'number',
    },
    type: 'input',
    key: 'candidate_rate',
  },
  {
    list: false,
    endpoint: '/core/companycontacts/',
    read_only: true,
    templateOptions: {
      label: 'Rate overrides approved by',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    type: 'related',
    key: 'rate_overrides_approved_by',
    many: false,
  },
  {
    key: 'rate_overrides_approved_at',
    type: 'datepicker',
    templateOptions: {
      required: false,
      label: 'Candidate and Client Rate Overrides Approved at',
      type: 'date',
    },
    read_only: false,
  },
  {
    list: false,
    endpoint: '/sms-interface/smsmessages/',
    read_only: true,
    templateOptions: {
      label: 'Related sms',
      add: true,
      delete: false,
      values: ['__str__'],
      type: 'related',
      edit: true,
    },
    collapsed: false,
    type: 'related',
    key: 'related_sms',
    many: true,
  },
];

const formset = {
  list: {
    list: 'timesheet',
    label: 'Timesheet Entry',
    columns: [
      {
        content: [
          {
            endpoint: '/hr/jobsites/{jobsite.id}',
            field: 'jobsite',
            type: 'link',
          },
          {
            field: 'supervisor.__str__',
            type: 'text',
          },
        ],
        width: 250,
        name: 'client_/_jobsite_/_supervisor',
        title: null,
        label: 'client / jobsite / supervisor',
        sort: true,
        sortMap: [
          {
            name: 'client',
            param: 'job_offer__shift__date__job__customer_company__name',
          },
          {
            name: 'jobsite',
            param: 'job_offer__shift__date__job__jobsite__short_name',
          },
        ],
        delim: null,
      },
      {
        content: [
          {
            endpoint:
              '/candidate/candidatecontacts/{job_offer.candidate_contact.id}',
            field: 'job_offer.candidate_contact',
            type: 'link',
          },
          {
            field: 'position.__str__',
            description: ' ',
            type: 'text',
          },
          {
            endpoint: '/hr/jobs/{job.id}',
            field: 'job.id',
            color: 'primary',
            text: 'common.job-information',
            type: 'link',
          },
        ],
        width: 200,
        name: 'position_/_candidate',
        title: null,
        label: 'Position / Candidate / Job',
        delim: null,
      },
      {
        content: [
          {
            type: 'button',
            color: 'link',
            endpoint:
              '/candidate/location/{job_offer.candidate_contact.id}/history/',
            field: 'id',
            action: 'showTracking',
            customLink: true,
            image: '/assets/img/map-lg.jpg',
          },
          {
            text: '{shift.date.__str__}',
            type: 'static',
            label: 'shift_date.label',
            field: 'shift.date',
          },
          {
            field: 'timesheet_rates',
            type: 'skillactivity',
            label: 'Skill Activities',
          },
        ],
        name: 'time',
        title: null,
        label: 'Tracking, date and times',
        delim: null,
      },
      {
        content: [
          {
            values: {
              false: 'times',
              true: 'check',
              null: 'minus-circle',
            },
            field: 'going_to_work_confirmation',
            translateKey: 'pre_shift_check',
            type: 'icon',
            label: 'Pre-shift check',
          },
          {
            values: {
              false: 'times',
              true: 'check',
              null: 'minus-circle',
            },
            field: 'candidate_filled',
            type: 'icon',
            label: 'Candidate filled',
            translateKey: 'candidate_filled',
            showIf: [
              {
                candidate_filled: true,
              },
            ],
          },
          {
            values: {
              false: 'times',
              true: 'check',
              null: 'minus-circle',
            },
            field: 'supervisor_approved',
            type: 'icon',
            label: 'Supervisor approved',
            translateKey: 'supervisor_approved',
            showIf: [
              {
                supervisor_approved: true,
              },
            ],
          },
        ],
        name: 'confirmations',
        title: null,
        label: 'Confirmations',
        delim: null,
      },
      {
        delim: null,
        label: 'Related sms',
        sort: true,
        content: [
          {
            action: 'messageDetail',
            messageType: 'sent',
            color: 'link',
            endpoint: '/sms-interface/smsmessages/{going_to_work_sent_sms.id}',
            field: 'going_to_work_sent_sms',
            type: 'button',
            text: 'Candidate Going To Work',
          },
          {
            action: 'messageDetail',
            messageType: 'reply',
            color: 'link',
            endpoint: '/sms-interface/smsmessages/{going_to_work_reply_sms.id}',
            field: 'going_to_work_reply_sms',
            type: 'button',
            text: 'Reply',
          },
          {
            action: 'messageDetail',
            messageType: 'sent',
            color: 'link',
            endpoint: '/sms-interface/smsmessages/{candidate_sms.id}',
            field: 'candidate_sms',
            type: 'button',
            text: 'Candidate TS',
            showIf: ['candidate_sms'],
          },
          {
            action: 'messageDetail',
            messageType: 'sent',
            color: 'link',
            endpoint: '/sms-interface/smsmessages/{supervisor_sms.id}',
            field: 'supervisor_sms',
            type: 'button',
            text: 'Supervisor TS',
            showIf: ['supervisor_sms'],
          },
        ],
        name: 'related_sms',
        title: null,
        sort_field: 'related_sms',
      },
      {
        content: [
          {
            label: {
              0: 'sync_status.not_synced',
              1: 'sync_status.sync_scheduled',
              2: 'sync_status.syncing',
              3: 'sync_status.synced',
              4: 'sync_status.sync_failed',
            },
            type: 'icon',
            field: 'sync_status',
          },
          {
            endpoint: '/hr/timesheets/{id}/sync',
            field: 'id',
            showIf: [
              {
                show_sync_button: true,
              },
            ],
            action: 'emptyPost',
            type: 'button',
            text: 'common.sync',
          },
        ],
        name: 'myob_status',
        title: null,
        label: 'MYOB status',
        delim: null,
      },
      {
        content: [
          {
            endpoint: '/core/invoices/{invoice.id}',
            field: 'invoice',
            type: 'link',
            text: 'action.show_invoice',
            color: 'primary',
          },
          {
            action: 'emptyPost',
            text: 'common.recreate-invoice',
            endpoint: '/hr/timesheets/{id}/recreate_invoice',
            type: 'button',
            showIf: [
              {
                supervisor_approved: true,
              },
            ],
          },
        ],
        name: 'invoice',
        title: null,
        label: 'Invoice',
        delim: null,
      },
      {
        content: [
          {
            endpoint: '/hr/timesheets/{id}/confirm',
            action: 'emptyPost',
            icon: 'fa-external-link-alt',
            title: 'Confirm Check',
            type: 'button',
            field: 'id',
            showIf: [
              {
                going_to_work_confirmation: null,
              },
            ],
          },
          {
            endpoint: '/hr/timesheets/{id}/resend_sms',
            field: 'resend_sms_candidate',
            showIf: [
              {
                resend_sms_candidate: true,
              },
            ],
            icon: 'fa-external-link-alt',
            action: 'emptyPost',
            type: 'button',
            title: 'send',
          },
          {
            endpoint: '/hr/timesheets/{id}/resend_supervisor_sms',
            field: 'resend_sms_supervisor',
            showIf: [
              {
                resend_sms_supervisor: true,
              },
            ],
            icon: 'fa-external-link-alt',
            action: 'emptyPost',
            type: 'button',
            title: 'Send Supervisor',
          },
          {
            endpoint: '/hr/timesheets/{id}/candidate_fill',
            field: 'id',
            showIf: [
              {
                resend_sms_candidate: true,
              },
            ],
            icon: 'fa-external-link-alt',
            action: 'editForm',
            type: 'button',
            title: 'Fill',
          },
          {
            endpoint: '/hr/timesheets/{id}/supervisor_approve',
            field: 'id',
            showIf: [
              {
                resend_sms_supervisor: true,
              },
            ],
            icon: 'fa-external-link-alt',
            action: 'editForm',
            type: 'button',
            title: 'Approve',
          },
          {
            action: 'editForm',
            endpoint: '/hr/timesheets/{id}',
            icon: 'fa-pencil-alt',
            title: 'Edit',
            type: 'button',
            field: 'id',
          },
        ],
        name: 'actions',
        title: null,
        label: 'Actions',
        delim: null,
      },
    ],
    pagination_label: 'Timesheet Entry',
    search_enabled: false,
    editDisable: true,
  },
  fields: [
    {
      key: 'going_to_work_confirmation',
      type: 'checkbox',
      showIf: [
        {
          going_to_work_confirmation: true,
        },
      ],
      templateOptions: {
        required: false,
        label: 'Morning check',
        type: 'icon',
        values: {
          false: 'times',
          true: 'check',
          null: 'minus-circle',
        },
      },
      read_only: true,
    },
    {
      key: 'company',
      type: 'link',
      templateOptions: {
        label: '',
        type: 'link',
        link: null,
        text: '',
      },
      read_only: true,
    },
    {
      key: 'supervisor_approved',
      type: 'checkbox',
      showIf: [
        {
          supervisor_approved: true,
        },
      ],
      templateOptions: {
        required: false,
        label: 'Supervisor approved',
        type: 'icon',
        values: {
          false: 'times',
          true: 'check',
          null: 'minus-circle',
        },
      },
      read_only: true,
    },
    {
      key: 'break_started_ended',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Break started ended',
        type: 'static',
      },
      read_only: true,
    },
    {
      read_only: true,
      key: 'resend_sms_candidate',
      type: 'button',
      templateOptions: {
        action: 'emptyPost',
        label: '',
        type: 'button',
        text: 'send',
      },
      showIf: [
        {
          resend_sms_candidate: true,
        },
      ],
    },
    {
      key: 'shift_started_ended',
      type: 'static',
      templateOptions: {
        required: false,
        label: 'Shift started ended',
        type: 'static',
      },
      read_only: true,
    },
    {
      key: 'jobsite',
      type: 'link',
      templateOptions: {
        label: '',
        type: 'link',
        link: null,
        text: '',
      },
      read_only: true,
    },
    {
      read_only: true,
      key: 'resend_sms_supervisor',
      type: 'button',
      templateOptions: {
        action: 'emptyPost',
        label: '',
        type: 'button',
        text: 'Send Supervisor',
      },
      showIf: [
        {
          resend_sms_supervisor: true,
        },
      ],
    },
    {
      list: false,
      endpoint: '/sms-interface/smsmessages/',
      read_only: true,
      templateOptions: {
        label: 'Related sms',
        add: true,
        delete: false,
        values: ['__str__'],
        type: 'related',
        edit: true,
      },
      collapsed: false,
      type: 'related',
      key: 'related_sms',
      many: true,
    },
    {
      key: 'going_to_work_reply_sms',
      type: 'button',
      templateOptions: {
        action: 'editForm',
        label: '',
        type: 'button',
        text: 'Reply',
      },
      read_only: true,
    },
    {
      key: 'job_offer.candidate_contact',
      type: 'link',
      templateOptions: {
        label: '',
        type: 'link',
        link: null,
        text: '',
      },
      read_only: true,
    },
    {
      read_only: true,
      key: 'id',
      type: 'button',
      templateOptions: {
        action: 'emptyPost',
        label: 'Morning check:',
        type: 'button',
        text: 'Confirm',
      },
      showIf: [
        {
          going_to_work_confirmation: null,
        },
      ],
    },
    {
      key: 'position',
      type: 'link',
      templateOptions: {
        label: '',
        type: 'link',
        link: null,
        text: '',
      },
      read_only: true,
    },
    {
      key: 'myob_status',
      type: 'input',
      showIf: [
        {
          show_sync_button: false,
        },
      ],
      templateOptions: {
        required: false,
        label: 'Myob status',
        type: 'text',
      },
      read_only: true,
    },
    {
      key: 'supervisor',
      type: 'link',
      templateOptions: {
        label: '',
        type: 'link',
        link: null,
        text: '',
      },
      read_only: true,
    },
    {
      key: 'job',
      type: 'link',
      templateOptions: {
        label: '',
        type: 'link',
        link: null,
        text: 'Job',
      },
      read_only: true,
    },
    {
      key: 'going_to_work_sent_sms',
      type: 'button',
      templateOptions: {
        action: 'editForm',
        label: '',
        type: 'button',
        text: 'Candidate Going To Work',
      },
      read_only: true,
    },
    {
      key: 'candidate_filled',
      type: 'checkbox',
      showIf: [
        {
          candidate_filled: true,
        },
      ],
      templateOptions: {
        required: false,
        label: 'Candidate filled',
        type: 'icon',
        values: {
          false: 'times',
          true: 'check',
          null: 'minus-circle',
        },
      },
      read_only: true,
    },
  ],
};

export const timesheets = {
  list,
  supervisor,
  form,
  formadd,
  formset,
};
