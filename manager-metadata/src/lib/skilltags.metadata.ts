import { Form, List } from '@webui/metadata';
import { Endpoints } from '@webui/models';

const formset = () => {
  return {
    fields: [],
    list: new List.main.element('tagrel', 'Tag Relationship')
      .disableSearch()
      .setColumns([
        new List.column.element('tag', 'Tag')
          .setSort(true, 'tag')
          .setContent([new List.text.element('tag')]),

        new List.column.element('actions', 'Actions').setWidth(150).setContent([
          {
            action: 'delete',
            icon: 'fa-times-circle',
            title: 'Delete',
            text_color: '#f32700',
            type: 'button',
            field: 'id',
          },
        ]),
      ]),
  };
};

const form = () => [
  new Form.related.element('skill', 'Skill', Endpoints.Skill)
    .readOnly()
    .updateValues(['translations', 'name']),

  new Form.related.element('tag', 'Tag', Endpoints.Tag)
    .readOnly()
    .updateValues(['owner', 'translations']),
];

const formadd = () => [
  new Form.related.element('skill', 'Skill', Endpoints.Skill)
    .readOnly()
    .updateValues(['translations', 'name']),

  new Form.related.element('tag', 'Tag', Endpoints.Tag)
    .readOnly()
    .setActions({ add: true })
    .updateValues(['owner', 'translations']),
];

export const skilltags = {
  form,
  formadd,
  formset,
};
