import {
  // address,
  candidatecontacts,
  candidatepool,
  contacts,
  companies,
  companycontacts,
  // jobs,
  jobsites,
  ratecoefficients,
  industries,
  pricelists,
  bankaccounts,
  timesheets,
  superannuationfunds,
  invoices,
  employmentclassifications,
  activities,
  dashboardmodules,
  userdashboardmodules,
  cities,
  countries,
  regions,
  filestorages,
  extranetnavigations,
  // workflows,
  // workflownodes,
  workflowobjects,
  forms,
  formbuilders,
  formfields,
  formfieldgroups,
  formstorages,
  acceptancetestquestions,
  acceptancetestanswers,
  acceptancetestskills,
  interviewschedules,
  users,
  smsmessages,
  smstemplates,
  tags,
  skills,
  visatypes,
  blacklists,
  favouritelists,
  carrierlists,
  companyaddresses,
  companycontactrelationships,
  companylocalizations,
  companyrels,
  companytradereferences,
  contactunavailabilities,
  // notes,
  orders,
  shiftdates,
  joboffers,
  jobsiteunavailabilities,
  candidaterels,
  timesheetissues,
  ratecoefficientgroups,
  ratecoefficientmodifiers,
  dynamiccoefficientrules,
  weekdayworkrules,
  overtimeworkrules,
  allowanceworkrules,
  timeofdayworkrules,
  pricelistrates,
  pricelistratecoefficients,
  invoicelines,
  payslips,
  paysliplines,
  paysliprules,
  login,
  // history,
  // unapproved,
  // evaluate,
  // notAgree,
  globalpermissions,
  joboffersCandidateManager,
  shifts,
  jobtags,
  extend,
  fillin,
  jobsiteMap,
  supervisorApprove,
  candidateFill,
  acceptancetests,
  acceptancetestindustries,
  acceptancetesttags,
  acceptancetestworkflownodes,
  skillbaserates,
  skilltags,
  billingcompanies,
  billingdoscounts,
  tokenlogins,
  // passwordforgot,
  // passwordchange,
  userpassword,
  skillname,
  // smslogs,
  skillratecoefficient,
  priselistratemodifiers,
  candidateLanguage,
  // jobsitesclient
  companyLanguage,
  emailtemplates,
  emailmessages,
  contactaddresses,
  candidateformalities,
  formtranslations,
  skillrates,
  skillrateranges,
  timesheetrates,
  jobrates,
  inventory,
  toolcategory,
} from '@webui/manager-metadata';
import { Endpoints } from '@webui/models';

import {
  tagrels,
  skillrels,
  candidateevaluations,
  passwordchange,
  workflows,
  workflownodes,
  jobs,
  notes,
  address,
  passwordforgot,
  worktypes,
  jobamount,
} from '@webui/shared-metadata';

export class Metadata {
  [Endpoints.Address] = address;
  [Endpoints.CandidateContact] = candidatecontacts;
  [Endpoints.CandidatePool] = candidatepool;
  [Endpoints.Contact] = contacts;
  [Endpoints.Company] = companies;
  [Endpoints.CompanyContact] = companycontacts;
  [Endpoints.Job] = jobs;
  [Endpoints.Jobsite] = jobsites;
  [Endpoints.RateCoefficient] = ratecoefficients;
  [Endpoints.Industry] = industries;
  [Endpoints.PriceList] = pricelists;
  [Endpoints.BankAccount] = bankaccounts;
  [Endpoints.Timesheet] = timesheets;
  [Endpoints.CandidateSuperAnnuationFund] = superannuationfunds;
  [Endpoints.Invoice] = invoices;
  [Endpoints.SkillEmploymentClassification] = employmentclassifications;
  [Endpoints.Activity] = activities;
  [Endpoints.DashboardModule] = dashboardmodules;
  [Endpoints.UserDashboardModule] = userdashboardmodules;
  [Endpoints.City] = cities;
  [Endpoints.Country] = countries;
  [Endpoints.Region] = regions;
  [Endpoints.FileStorage] = filestorages;
  [Endpoints.ExtranetNavigation] = extranetnavigations;
  [Endpoints.Workflow] = workflows;
  [Endpoints.WorkflowNode] = workflownodes;
  [Endpoints.WorkflowObject] = workflowobjects;
  [Endpoints.Form] = forms;
  [Endpoints.FormBuilder] = formbuilders;
  [Endpoints.FormField] = formfields;
  [Endpoints.FormFieldGroup] = formfieldgroups;
  [Endpoints.FormStorage] = formstorages;
  [Endpoints.AcceptanceTestQuestion] = acceptancetestquestions;
  [Endpoints.AcceptanceTestAnswers] = acceptancetestanswers;
  [Endpoints.AcceptanceTestSkill] = acceptancetestskills;
  [Endpoints.CandidateInterviewSchedule] = interviewschedules;
  [Endpoints.User] = users;
  [Endpoints.SmsMessages] = smsmessages;
  [Endpoints.SmsTemplate] = smstemplates;
  [Endpoints.Tag] = tags;
  [Endpoints.Skill] = skills;
  [Endpoints.SkillTag] = skilltags;
  [Endpoints.CandidateVisaType] = visatypes;
  [Endpoints.BlackList] = blacklists;
  [Endpoints.FavouriteList] = favouritelists;
  [Endpoints.CarrierList] = carrierlists;
  [Endpoints.CompanyAddress] = companyaddresses;
  [Endpoints.CompanyContactRelationship] = companycontactrelationships;
  [Endpoints.CompanyLocalization] = companylocalizations;
  [Endpoints.CompanyRel] = companyrels;
  [Endpoints.CompanyTradeReference] = companytradereferences;
  [Endpoints.ContactUnavailability] = contactunavailabilities;
  [Endpoints.Note] = notes;
  [Endpoints.Order] = orders;
  [Endpoints.ShiftDate] = shiftdates;
  [Endpoints.JobOffer] = joboffers;
  [Endpoints.JobsiteUnavailability] = jobsiteunavailabilities;
  [Endpoints.CandidateTag] = tagrels;
  [Endpoints.CandidateSkill] = skillrels;
  [Endpoints.CandidateRel] = candidaterels;
  [Endpoints.CandidateEvaluation] = candidateevaluations;
  [Endpoints.TimesheetIssue] = timesheetissues;
  [Endpoints.RateCoefficientGroup] = ratecoefficientgroups;
  [Endpoints.RateCoefficientModifier] = ratecoefficientmodifiers;
  [Endpoints.RateCoefficientRule] = dynamiccoefficientrules;
  [Endpoints.WeekDayWorkRule] = weekdayworkrules;
  [Endpoints.OverTimeWorkRule] = overtimeworkrules;
  [Endpoints.AllowanceWorkRule] = allowanceworkrules;
  [Endpoints.TimeOfDayWorkRule] = timeofdayworkrules;
  [Endpoints.PriceListRate] = pricelistrates;
  [Endpoints.PriceListRateCoefficient] = pricelistratecoefficients;
  [Endpoints.InvoiceRule] = invoicelines;
  [Endpoints.Payslip] = payslips;
  [Endpoints.PayslipLine] = paysliplines;
  [Endpoints.PayslipRule] = paysliprules;
  [Endpoints.Login] = login;
  // [Endpoints.TimesheetHistory] = history;
  // [Endpoints.TimesheetUnapproved] = unapproved;
  // 'evaluate' = evaluate;
  // 'not_agree' = notAgree;
  [Endpoints.Permission] = globalpermissions;
  [Endpoints.CandidateJobOffer] = joboffersCandidateManager;
  [Endpoints.Shift] = shifts;
  [Endpoints.JobTag] = jobtags;
  'extend' = extend;
  'fillin' = fillin;
  [Endpoints.JobsiteMap] = jobsiteMap;
  'supervisorApprove' = supervisorApprove;
  'candidateFill' = candidateFill;
  [Endpoints.AcceptanceTest] = acceptancetests;
  [Endpoints.AcceptanceTestIndustry] = acceptancetestindustries;
  [Endpoints.AcceptanceTestTag] = acceptancetesttags;
  [Endpoints.AcceptanceTestWorkflowNode] = acceptancetestworkflownodes;
  [Endpoints.SkillBaseRate] = skillbaserates;
  [Endpoints.BillingCompany] = billingcompanies;
  [Endpoints.BillingDiscount] = billingdoscounts;
  [Endpoints.LoginByToke] = tokenlogins;
  [Endpoints.ContactForgotPassword] = passwordforgot;
  [Endpoints.ContactChangePassword] = passwordchange;
  [Endpoints.ContactPassword] = userpassword;
  [Endpoints.SkillName] = skillname;
  [Endpoints.SkillRateCoefficient] = skillratecoefficient;
  [Endpoints.PriceListRateModifiers] = priselistratemodifiers;
  'candidate_languages' = candidateLanguage;
  'company_languages' = companyLanguage;
  [Endpoints.CompanyLanguages_new_endpoint] = companyLanguage;
  [Endpoints.EmailTemplate] = emailtemplates;
  [Endpoints.EmailMessages] = emailmessages;
  [Endpoints.ContactAddresses] = contactaddresses;
  [Endpoints.CandidateFormalities] = candidateformalities;
  [Endpoints.ApplicationFormTranslations] = formtranslations;
  [Endpoints.SkillRate] = skillrates;
  [Endpoints.SkillRateRanges] = skillrateranges;
  [Endpoints.TimesheetRates] = timesheetrates;
  [Endpoints.SkillWorkTypes] = worktypes;
  [Endpoints.JobRates] = jobrates;
  [Endpoints.Tools] = inventory;
  [Endpoints.ToolCategories] = toolcategory;
  [Endpoints.JobAmount] = jobamount;
}
