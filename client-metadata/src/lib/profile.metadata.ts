import { CheckboxType, Form, InputType } from '@webui/metadata';
import { Endpoints } from '@webui/models';

const profile = function () {
  return [
    new Form.info.element('id')
      .setValues({
        company: 'company.__str__',
        job_title: 'job_title',
        created_at: 'created_at',
        available: 'active',
        title: 'contact.__str__',
        updated_at: 'updated_at',
        picture: 'contact.picture.origin',
      })
      .hideOnMobileDevice(),

    new Form.tabs.element(false).setChildren([
      new Form.group.element('General Information', 'general_info')
        .mainTab('General Info')
        .setChildren([
          new Form.row.element().showOnMobileDevice().setChildren([
            new Form.info.element('id').setValues({
              company: 'company.__str__',
              job_title: 'job_title',
              created_at: 'created_at',
              available: 'active',
              title: 'contact.__str__',
              updated_at: 'updated_at',
              picture: 'contact.picture.origin',
            }),
          ]),

          new Form.row.element().setChildren([
            new Form.group.element('Contacts', 'contacts')
              .setWidth(0.5)
              .setChildren([
                new Form.checkbox.element(
                  'active',
                  'Active',
                  CheckboxType.Checkbox
                )
                  .readOnly()
                  .hideField(),

                new Form.input.element('job_title', 'Job title', InputType.Text)
                  .readOnly()
                  .hideField(),

                new Form.related.element(
                  'contact',
                  'Contact',
                  Endpoints.Contact
                )
                  .readOnly()
                  .hideField(),

                new Form.related.element(
                  'company',
                  'Company',
                  Endpoints.Company
                )
                  .readOnly()
                  .hideField(),

                new Form.input.element(
                  'contact.first_name',
                  'First Name',
                  InputType.Text
                )
                  .readOnly()
                  .hideField(),

                new Form.input.element(
                  'contact.last_name',
                  'Last Name',
                  InputType.Text
                )
                  .readOnly()
                  .hideField(),

                new Form.input.element(
                  'contact.email',
                  'E-mail',
                  InputType.Text
                ).readOnly(),

                new Form.input.element(
                  'contact.phone_mobile',
                  'Phone number',
                  InputType.Text
                )
                  .setIntl()
                  .readOnly(),
              ]),
          ]),
        ]),
    ]),
  ];
};

export const metadataProfile = {
  profile,
};
