import {
  metadataJoboffersCandidate,
  metadataTimesheetsCandidate,
  metadataSubmit,
  metadataProfile,
  timesheetratescandidate,
  toolRental,
} from '@webui/candidate-metadata';
import { Endpoints } from '@webui/models';

import {
  tagrels,
  skillrels,
  candidateevaluations,
  passwordchange,
  passwordforgot,
  notes,
} from '@webui/shared-metadata';

export class Metadata {
  [Endpoints.CandidateTag] = tagrels;
  [Endpoints.CandidateSkill] = skillrels;
  [Endpoints.CandidateEvaluation] = candidateevaluations;
  [Endpoints.JobOfferCandidate] = metadataJoboffersCandidate;
  [Endpoints.TimesheetCandidate] = metadataTimesheetsCandidate;
  'submit' = metadataSubmit;
  [Endpoints.CandidateContact] = metadataProfile;
  [Endpoints.ContactChangePassword] = passwordchange;
  [Endpoints.ContactForgotPassword] = passwordforgot;
  [Endpoints.TimesheetRates] = timesheetratescandidate;
  [Endpoints.Note] = notes;
  [Endpoints.ToolRental] = toolRental;
}
