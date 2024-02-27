import { SkillModel, UnitOfMeasurementsModel } from '@webui/data';
import { Form, InputType } from '@webui/metadata';

const formadd = () => [
  new SkillModel().formElement().updateValues(['name']),
  new Form.input.element(
    'skill_name',
    'Skill Name',
    InputType.Text
  ).hideField(),
  new Form.input.element('name', 'Name', InputType.Text),
  new UnitOfMeasurementsModel().formElement(),
];

export const worktypes = {
  formadd,
  form: formadd,
};
