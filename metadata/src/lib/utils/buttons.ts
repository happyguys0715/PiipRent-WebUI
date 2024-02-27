import { List } from '../elements';

export const getEditButton = (endpoint: string) =>
  new List.button.element('id', 'editForm', 'Edit')
    .setEndpoint(`${endpoint}{id}`)
    .setTextColor('#f0ad4e')
    .setIcon('pencil-alt')
    .setTranslationKey('edit');

export const getDeleteButton = () =>
  new List.button.element('id', 'delete', 'Delete')
    .setTextColor('#f32700')
    .setIcon('times-circle')
    .setTranslationKey('delete');
