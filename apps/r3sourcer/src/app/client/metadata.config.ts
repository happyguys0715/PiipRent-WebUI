import {
  history,
  unapproved,
  notAgree,
  jobsitesclient,
  extend,
  fillin,
  jobs as clientJobs,
  shifts,
  joboffers,
  timesheetratesclient,
  metadataProfile,
} from '@webui/client-metadata';
import { toolRental } from '@webui/candidate-metadata';
import { Endpoints } from '@webui/models';

import {
  passwordchange,
  notes,
  address,
  passwordforgot,
  jobs,
  worktypes,
  jobamount,
} from '@webui/shared-metadata';

export class Metadata {
  [Endpoints.TimesheetHistory] = history;
  [Endpoints.TimesheetUnapproved] = unapproved;
  'not_agree' = notAgree;
  [Endpoints.ContactChangePassword] = passwordchange;
  [Endpoints.ContactForgotPassword] = passwordforgot;
  [Endpoints.JobsiteClient] = jobsitesclient;
  [Endpoints.ClientJobs] = clientJobs;
  [Endpoints.Job] = jobs;
  [Endpoints.Note] = notes;
  [Endpoints.Address] = address;
  [Endpoints.CompanyContact] = metadataProfile;
  'extend' = extend;
  'fillin' = fillin;
  [Endpoints.Shift] = shifts;
  [Endpoints.JobOffer] = joboffers;
  [Endpoints.TimesheetRates] = timesheetratesclient;
  [Endpoints.SkillWorkTypes] = worktypes;
  [Endpoints.JobAmount] = jobamount;
  [Endpoints.ToolRental] = toolRental;
}
