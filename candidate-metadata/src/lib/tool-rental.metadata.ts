import { List } from '@webui/metadata';
import { Endpoints } from '@webui/models';

const list = () => ({
  list: new List.main.element('rent_tools', 'Rent Tools')
    .disableSearch()
    .disableEdit()
    .setButtons([])
    .setColumns([
      new List.column.element('image', 'Image').setContent([
        new List.picture.element('picture'),
      ]),
      new List.column.element('tool_name', 'Tool Name').setContent([
        new List.text.element('name', 'Name'),
      ]),
      new List.column.element('address', 'Tool Location').setContent([
        new List.text.element('address.name', 'Name'),
      ]),
      new List.column.element('buttons', 'Actions').setContent([
        // new List.button.element('tool_id', 'emptyPost')
        new List.button.element('tool_id', 'rentTool')
          .setDisplay('Rent')
          .setTranslationKey('action.rent')
          // .setEndpoint(`${Endpoints.InventoryCandidate}{id}/confirm/`)
          .setEndpoint(`${Endpoints.ToolRental}`)
          .setStyles([
            'success',
            'shadow',
            'shadow-success',
            'size-m',
            'resize',
          ])
          .setHidden('is_rented'),
      ]),
    ]),
});

export const toolRental = {
  list,
};
