import { ApiMethod } from '@webui/data';
import {
  Filter,
  Form,
  InputType,
  List,
  Type,
  createFilter,
  generateOptions,
} from '@webui/metadata';
import { Endpoints } from '@webui/models';

const list = () => ({
  list: new List.main.element('inventory', 'Inventory')
    .setFilters([
      new Filter.select.element({
        key: 'rent_type',
        label: 'Rent Type',
        values: generateOptions({
          daily: 'Daily',
          weekly: 'Weekly',
          monthly: 'Monthly',
        }),
      }),
      createFilter(Type.Checkbox, {
        key: 'is_rented',
        label: 'Status',
        values: generateOptions({
          true: 'Rented',
          false: 'Available',
        }),
      }),
    ])
    .setActions({
      options: [
        {
          label: 'delete',
          method: ApiMethod.DELETE,
          required: true,
          multiple: true,
          property: 'id',

          endpoint: Endpoints.Tools,
          selectionError: 'Please select at least one tool!',
          confirm: true,
          message: 'are_you_sure',
        },
      ],
      label: 'Actions',
      agree_label: 'agree',
      button_label: 'action.go',
      decline_label: 'decline',
    })
    .setButtons([
      {
        action: 'add_object',
        label: 'action.add_new_tool',
      },
    ])
    // .disableSearch()
    .setColumns([
      new List.column.element('image', 'Image').setContent([
        new List.picture.element('picture', { image: true }),
      ]),
      new List.column.element('tool_name', 'Tool Name').setContent([
        new List.text.element('name', 'Name'),
      ]),
      new List.column.element('rent_price', 'Rent Price').setContent([
        new List.text.element('rent_price')
          .setCurrency()
          .setFormatValue('{currency}{field}'),
      ]),
      new List.column.element('rent_type', 'Rent Type').setContent([
        new List.select.element('rent_type').setValues({
          daily: 'Daily',
          weekly: 'Weekly',
          monthly: 'Monthly',
        }),
      ]),
      new List.column.element('status', 'Status').setContent([
        new List.static.element('true')
          .setDisplay('Rented')
          .setTranslationKey('is_rented.true')
          .setStyles(['muted'])
          .setShowIfRule([{ is_rented: true }]),
        new List.static.element('false')
          .setDisplay('Available')
          .setTranslationKey('is_rented.false')
          .setStyles(['success'])
          .setShowIfRule([{ is_rented: false }]),
      ]),
      new List.column.element(
        'amortization_value',
        'Amortization Value'
      ).setContent([
        new List.static.element('amortization_value').setDisplay(
          '{current_amortization_value} / {amortization_value}'
        ),
      ]),
      new List.column.element('renter', 'Renter').setContent([
        new List.info.element('renter')
          .setValues({
            hideAvailability: 'is_rented',
            picture: 'tool_rental.customer_company.logo.origin',
            job_title: 'tool_rental.customer_representative.contact.__str__',
            position:
              'tool_rental.customer_representative.contact.phone_mobile',
          })
          .setShowIfRule(['tool_rental', 'tool_rental.customer_company']),
        new List.info.element('renter')
          .setValues({
            hideAvailability: 'is_rented',
            picture: 'tool_rental.candidate.contact.picture.origin',
            job_title: 'tool_rental.candidate.__str__',
            position: 'tool_rental.candidate.contact.phone_mobile',
          })
          .setShowIfRule(['tool_rental', 'tool_rental.candidate']),
      ]),
      new List.column.element('rent_period', 'Rent Period').setContent([
        new List.text.element('tool_rental.rent_start_date'),
        new List.text.element('tool_rental.rent_end_date'),
      ]),
      new List.column.element('time_remaining', 'Time Remaining').setContent([
        new List.text.element('tool_rental.time_remaining_day')
          .setStyles(['danger', 'float-right'])
          .setWidthFull()
          .setShowIfRule(['tool_rental.is_expired']),
        new List.text.element('tool_rental.time_remaining_time')
          .setStyles(['danger', 'float-right'])
          .setWidthFull()
          .setShowIfRule(['tool_rental.is_expired']),
        new List.text.element('tool_rental.time_remaining_day')
          .setStyles(['success', 'float-right'])
          .setWidthFull()
          .setShowIfRule([{ 'tool_rental.is_expired': false }]),
        new List.text.element('tool_rental.time_remaining_time')
          .setStyles(['success', 'float-right'])
          .setWidthFull()
          .setShowIfRule([{ 'tool_rental.is_expired': false }]),
      ]),
      new List.column.element('address', 'Tool Location').setContent([
        new List.text.element('address.__str__', 'Name'),
      ]),
      new List.column.element('qr_code', 'Qr Code').setContent([
        new List.picture.element('qr_code', { image: true }),
      ]),
    ]),
});

const formadd = () => [
  new Form.row.element().setChildren([
    new Form.group.element('').setChildren([
      new Form.input.element('name', 'Tool name', InputType.Text),
      new Form.input.element(
        'rent_price',
        'Price',
        InputType.Number
      ).updateTemplate({
        description: 'Rent price for the tool',
      }),
      new Form.input.element(
        'amortization_value',
        'amortization value',
        InputType.Number
      ).updateTemplate({
        description: 'Amortization value for the tool',
      }),
      new Form.related.element(
        'category',
        'Category',
        Endpoints.ToolCategories
      ).setActions({
        add: true,
      }),
    ]),

    new Form.group.element('').setChildren([
      new Form.select.element('rent_type', 'Rent Type').addOptions({
        daily: 'Daily',
        weekly: 'Weekly',
        monthly: 'Monthly',
      }),
      new Form.input.element(
        'address',
        'Location',
        InputType.Text
      ).updateTemplate({
        description: 'Location of the tool to rent from',
      }),
      new Form.select.element('tool_status', 'Tool Status').addOptions({
        new: 'New',
        used: 'Used',
        audit: 'Audit',
      }),
    ]),
  ]),

  new Form.input.element('picture', 'Image', InputType.Picture),
];

const form = () => [
  new Form.row.element().setChildren([
    new Form.group.element('').setChildren([
      new Form.input.element('name', 'Tool name', InputType.Text),
      new Form.input.element(
        'rent_price',
        'Price',
        InputType.Number
      ).updateTemplate({
        description: 'Rent price for the tool',
      }),
      new Form.input.element(
        'amortization_value',
        'amortization value',
        InputType.Number
      ).updateTemplate({
        description: 'Amortization value for the tool',
      }),
      new Form.related.element(
        'category',
        'Category',
        Endpoints.ToolCategories
      ).setActions({
        add: true,
      }),
    ]),

    new Form.group.element('').setChildren([
      new Form.select.element('rent_type', 'Rent Type').addOptions({
        daily: 'Daily',
        weekly: 'Weekly',
        monthly: 'Monthly',
      }),
      new Form.related.element('address', 'Location', Endpoints.Address)
        .setActions({
          add: true,
        })
        .updateTemplate({
          description: 'Location of the tool to rent from',
        }),
      new Form.select.element('tool_status', 'Tool Status').addOptions({
        new: 'New',
        used: 'Used',
        audit: 'Audit',
      }),
    ]),
  ]),

  new Form.input.element('picture', 'Image', InputType.Picture),
];

export const inventory = {
  list,
  formadd,
  form,
};
