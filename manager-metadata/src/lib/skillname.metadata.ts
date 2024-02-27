import { Filter, List } from '@webui/metadata';
import { Endpoints } from '@webui/models';

const list = () => {
  return {
    list: new List.main.element('skill', 'Skill')
      .setFilters([
        new Filter.select.element({
          key: 'active',
          label: 'Active',
          values: [
            { value: 'True', label: 'Active' },
            { value: 'False', label: 'Not Active' },
          ],
        }),
        new Filter.related.element({
          endpoint: Endpoints.Industry,
          key: 'industry',
          label: 'Industry',
        }),
      ])
      .removeCreateButton()
      .setEditOptions(Endpoints.Skill, 'skill_id')
      .setColumns([
        new List.column.element('name', 'Skill name')
          .setWidth(150)
          .setSort(true, 'name')
          .setContent([new List.text.element('__str__')]),

        new List.column.element('industry', 'Industry').setContent([
          new List.text.element('industry'),
        ]),

        new List.column.element('active', 'Active')
          .setWidth(100)
          .setSort(true, 'skills__active')
          .setContent([new List.checkbox.element('active')]),
      ]),
  };
};

// const list = {
//   list: {
//     list: 'skill',
//     label: 'Skill',
//     update: {
//       endpoint: '/skills/skills/{skill_id}/change_default/',
//       fields: ['active', 'default_rate', 'price_list_default_rate'],
//       method: 'post',
//       required: ['active'],
//       requiredMessage: 'Please fill all fields'
//     },
//     create: {
//       exist: 'skill_id',
//       endpoint: '/skills/skills/',
//       addFields: {
//         skill_id: 'id'
//       },
//       fields: {
//         name: 'id',
//         industry: 'industry.id',
//         company: 'currentCompany',
//         active: false
//       }
//     },
//     columns: [
//       {
//         delim: null,
//         label: 'Skill Name',
//         sort: true,
//         width: 150,
//         content: [
//           {
//             field: '__str__',
//             type: 'text'
//           }
//         ],
//         name: 'name',
//         title: null,
//         sort_field: 'name'
//       },
//       {
//         delim: null,
//         label: 'Industry',
//         content: [
//           {
//             field: 'industry',
//             type: 'text'
//           }
//         ],
//         name: 'name.industry',
//         title: null,
//       },
//       {
//         delim: null,
//         label: 'Active',
//         sort: true,
//         width: 100,
//         content: [
//           {
//             field: 'active',
//             type: 'checkbox'
//           }
//         ],
//         name: 'active',
//         title: null,
//         sort_field: 'skills__active'
//       },
//       {
//         delim: null,
//         label: 'Candidate pay rate default',
//         content: [
//           {
//             field: 'default_rate',
//             type: 'form',
//             form: {
//               key: 'default_rate',
//               type: 'input',
//               templateOptions: {
//                 min: 0,
//                 step: 0.01,
//                 type: 'number',
//                 display: '{currency}{default_rate}/h'
//               },
//             },
//           }
//         ],
//         name: 'default_rate',
//       },
//       {
//         delim: null,
//         label: 'Client charge rate default',
//         content: [
//           {
//             field: 'price_list_default_rate',
//             type: 'form',
//             form: {
//               key: 'price_list_default_rate',
//               type: 'input',
//               templateOptions: {
//                 min: 0,
//                 step: 0.01,
//                 type: 'number',
//                 display: '{currency}{price_list_default_rate}/h'
//               },
//             },
//           }
//         ],
//         purpose: ['hire'],
//         name: 'price_list_default_rate',
//       },
//       {
//         delim: null,
//         label: 'Carrier List Reserve',
//         sort: true,
//         width: 170,
//         content: [
//           {
//             field: 'carrier_list_reserve',
//             type: 'text'
//           }
//         ],
//         name: 'carrier_list_reserve',
//         title: null,
//         sort_field: 'skills__carrier_list_reserve'
//       },
//       {
//         content: [
//           {
//             text: 'Save',
//             type: 'button',
//             field: 'id',
//             action: 'updateObject',
//             styles: ['primary', 'size-m', 'shadow'],
//             updateButton: true
//           }
//         ]
//       }
//     ],
//     pagination_label: 'Skill',
//     search_enabled: true,
//     editDisable: false,
//     editEndpoint: Endpoints.Skill,
//     canEdit: 'skill_id',
//     buttons: [],
//     filters: [
//       filters.active,
//       filters.industry
//     ]
//   },
//   fields: [
//     {
//       key: 'id',
//       type: 'button',
//       templateOptions: {
//         text: 'Save',
//         label: '',
//         type: 'button'
//       },
//       read_only: true
//     },
//     {
//       key: 'name',
//       type: 'input',
//       templateOptions: {
//         required: true,
//         label: 'Skill Name',
//         max: 63,
//         type: 'text'
//       },
//       read_only: true
//     },
//     {
//       key: 'active',
//       default: true,
//       type: 'input',
//       templateOptions: {
//         required: false,
//         label: 'Active',
//         type: 'text'
//       },
//       read_only: true
//     },
//     {
//       key: 'carrier_list_reserve',
//       default: 0,
//       type: 'input',
//       templateOptions: {
//         required: false,
//         label: 'Carrier List Reserve',
//         max: 32767,
//         type: 'text',
//         min: 0
//       },
//       read_only: true
//     }
//   ]
// };

const form = [
  {
    type: 'related',
    endpoint: '/pricing/industries/',
    key: 'industry',
    read_only: true,
    templateOptions: {
      label: 'Industry',
      type: 'related',
      param: 'id',
      values: ['__str__', 'translations'],
    },
  },
  {
    key: 'name',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Skill Name',
      type: 'text',
      max: 63,
    },
    read_only: false,
  },
];

const formadd = [
  {
    type: 'related',
    endpoint: '/pricing/industries/',
    key: 'industry',
    templateOptions: {
      label: 'Industry',
      type: 'related',
      param: 'id',
      values: ['__str__', 'translations'],
    },
  },
  {
    key: 'name',
    type: 'input',
    templateOptions: {
      required: true,
      label: 'Skill Name',
      type: 'text',
      max: 255,
    },
  },
];

export const skillname = {
  list,
  form,
  formadd,
};
