import { Form, InputType, DatepickerType, StaticType } from '@webui/metadata';
import { Endpoints } from '@webui/models';

const profile = function () {
  return [
    new Form.info.element('id')
      .setValues({
        address: 'contact.address.__str__',
        title: 'contact.__str__',
        picture: 'contact.picture',
        birthday: 'contact.birthday',
      })
      .hideOnMobileDevice(),

    new Form.tabs.element(true).setChildren([
      new Form.group.element('Personal information', 'personal')
        .mainTab('Personal Info')
        .setChildren([
          new Form.row.element().showOnMobileDevice().setChildren([
            new Form.info.element('id').setValues({
              address: 'contact.address.__str__',
              title: 'contact.__str__',
              picture: 'contact.picture',
              birthday: 'contact.birthday',
            }),
          ]),

          new Form.row.element().setChildren([
            new Form.group.element('Contacts', 'contacts')
              .setWidth(0.5)
              .setChildren([
                new Form.datepicker.element(
                  'contact.birthday',
                  'Birthday',
                  DatepickerType.Date
                )
                  .readOnly()
                  .hideField()
                  .setInline(),

                new Form.related.element(
                  'contact',
                  'Contact',
                  Endpoints.Contact
                )
                  .readOnly()
                  .hideField(),

                new Form.related.element(
                  'contact.address',
                  'Address',
                  Endpoints.Address
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

            new Form.group.element('Emergency contact', 'emergency_contact')
              .setWidth(0.5)
              .setChildren([
                new Form.input.element(
                  'emergency_contact_name',
                  'Name',
                  InputType.Text
                ).readOnly(),

                new Form.input.element(
                  'emergency_contact_phone',
                  'Phone Number',
                  InputType.Text
                ).readOnly(),
              ]),
          ]),

          new Form.row.element().setChildren([
            new Form.group.element('Additional info', 'additional_info')
              .setWidth(0.25)
              .setChildren([
                new Form.select.element('contact.gender', 'Gender')
                  .addOptions({
                    male: 'Male',
                    female: 'Female',
                  })
                  .readOnly(),

                new Form.select.element(
                  'transportation_to_work',
                  'Transportation'
                )
                  .addOptions({
                    1: 'Own Car',
                    2: 'Public Transportation',
                  })
                  .readOnly(),
              ]),

            new Form.group.element('Physical parameters', 'phisical_parameters')
              .setWidth(0.25)
              .setChildren([
                new Form.input.element(
                  'height',
                  'Height, cm',
                  InputType.Text
                ).readOnly(),

                new Form.input.element(
                  'weight',
                  'Weight, kg',
                  InputType.Text
                ).readOnly(),

                new Form.static.element('bmi', 'Bmi').readOnly(),
              ]),

            new Form.group.element('Scores', 'scores')
              .setWidth(0.25)
              .setChildren([
                new Form.static.element(
                  'candidate_scores.reliability',
                  'Reliability',
                  StaticType.Score
                )
                  .setDanger('no_rating')
                  .readOnly(),

                new Form.static.element(
                  'candidate_scores.loyalty',
                  'Loyalty',
                  StaticType.Score
                )
                  .setDanger('no_rating')
                  .readOnly(),
              ]),

            new Form.group.element('Rating', 'rating')
              .setWidth(0.25)
              .setChildren([
                new Form.static.element(
                  'candidate_scores.recruitment_score',
                  'Average test',
                  StaticType.Score
                )
                  .setDanger('no_rating')
                  .readOnly(),

                new Form.static.element(
                  'candidate_scores.client_feedback',
                  'Client feedback',
                  StaticType.Score
                )
                  .setDanger('no_rating')
                  .readOnly(),

                new Form.static.element(
                  'candidate_scores.skill_score',
                  'Average skill',
                  StaticType.Score
                )
                  .setDanger('no_rating')
                  .readOnly(),
              ]),
          ]),

          new Form.row.element().setChildren([
            new Form.group.element('Residency', 'residency')
              .setWidth(0.25)
              .setChildren([
                new Form.select.element('residency', 'Residency Status')
                  .addOptions({
                    0: 'Unknown',
                    1: 'Citizen',
                    2: 'Permanent Resident',
                    3: 'Temporary Resident',
                  })
                  .readOnly(),
              ]),

            new Form.group.element(' ')
              .setWidth(0.25)
              .setChildren([
                new Form.related.element(
                  'nationality',
                  'Nationality',
                  Endpoints.Country
                ).readOnly(),
              ]),
          ]),
        ]),

      new Form.list.element('Skills', Endpoints.CandidateSkill, 'skills')
        .withoutAddButton()
        .setAdditionalInfo('Candidate skills', 'Here you can see skills')
        .setQuery({ candidate_contact: '{id}' })
        .setMetadataQuery({ type: 'profile' }),

      new Form.list.element('Tags', Endpoints.CandidateTag, 'tags')
        .withoutAddButton()
        .setAdditionalInfo('Candidate tags', 'Here you can see tags')
        .setQuery({ candidate_contact: '{id}' })
        .setMetadataQuery({ type: 'profile' }),

      new Form.list.element(
        'Evaluations',
        Endpoints.CandidateEvaluation,
        'evaluations'
      )
        .withoutAddButton()
        .setAdditionalInfo('Evaluations', 'Here you can see evaluations')
        .setQuery({ candidate_contact: '{id}' })
        .setMetadataQuery({ type: 'profile' }),
    ]),
  ];
};

export const metadataProfile = {
  profile,
};
