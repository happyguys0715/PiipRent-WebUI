export enum Endpoints {
  // Contact
  Contact = '/core/contacts/',
  ContactUnavailability = '/core/contactunavailabilities/',
  ContactForgotPassword = '/core/contacts/forgot_password/',
  ContactChangePassword = 'change_password',
  ContactPassword = 'password',
  ContactAddresses = '/core/contactaddresses/',
  ContactResetPassword = '/core/contacts/forgot_password/confirm/',

  User = '/core/users/',

  // Company
  Company = '/core/companies/',
  CompanyAddress = '/core/companyaddresses/',
  CompanyContactRelationship = '/core/companycontactrelationships/',
  CompanyLocalization = '/core/companylocalizations/',
  CompanyContact = '/core/companycontacts/',
  CompanyRel = '/core/companyrels/',
  CompanyTradeReference = '/core/companytradereferences/',

  // Skill
  Skill = '/skills/skills/',
  SkillName = '/skills/skillnames/',
  SkillTag = '/skills/skilltags/',
  SkillBaseRate = '/skills/skillbaserates/',
  SkillEmploymentClassification = '/skills/employmentclassifications/',
  SkillRateCoefficient = '/candidate/skillratecoefficientrels/',
  SkillWorkTypes = '/skills/worktypes/',
  SkillRate = '/candidate/skillrates/',
  SkillRateRanges = '/skills/skillrateranges/',

  // Billing
  BillingCompany = '/billing/companies/',
  BillingDiscount = '/billing/discounts/',

  // Jobsite
  Jobsite = '/hr/jobsites/',
  JobsiteUnavailability = '/hr/jobsiteunavailabilities/',
  JobsiteMap = '/hr/jobsites/jobsite_map/',
  JobsiteClient = '/hr/jobsites/client_contact_jobsite/',

  // Job
  Job = '/hr/jobs/',
  ShiftDate = '/hr/shiftdates/',
  JobOffer = '/hr/joboffers/',
  Shift = '/hr/shifts/',
  JobTag = '/hr/jobtags/',
  ClientJobs = '/hr/jobs/client_contact_job/',
  JobRates = '/hr/jobrates/',
  JobAmount = '/hr/jobamounts/',

  // Candidate
  CandidateContact = '/candidate/candidatecontacts/',
  CandidatePool = '/candidate/candidatecontacts/pool/',
  CandidateSuperAnnuationFund = '/candidate/superannuationfunds/',
  CandidateInterviewSchedule = '/candidate/interviewschedules/',
  CandidateVisaType = '/candidate/visatypes/',
  CandidateTag = '/candidate/tagrels/',
  CandidateSkill = '/candidate/skillrels/',
  CandidateRel = '/candidate/candidaterels/',
  CandidateEvaluation = '/hr/candidateevaluations/',
  CandidateJobOffer = '/hr/joboffers/candidate/',
  CandidateLocation = '/candidate/location/',
  CandidateFormalities = '/candidate/formalities/',
  CandidateSupervisor = '/candidate/candidatecontacts/get_candidates_by_supervisor/',
  CandidateSupervisorCompany = '/candidate/candidatecontacts/get_candidates_by_supervisor_company/',

  BlackList = '/hr/blacklists/',
  FavouriteList = '/hr/favouritelists/',
  CarrierList = '/hr/carrierlists/',

  JobOfferCandidate = '/hr/joboffers-candidate/',

  // SMS
  SmsMessages = '/sms-interface/smsmessages/',
  SmsTemplate = '/sms-interface/smstemplates/',
  SmsLog = '/sms-interface/smslogs/',

  // Email
  EmailMessages = '/email-interface/emailmessages/',
  EmailTemplate = '/email-interface/emailtemplates/',

  // Location
  Country = '/core/countries/',
  Region = '/core/regions/',
  City = '/core/cities/',
  Address = '/core/addresses/',

  // Workflow
  Workflow = '/core/workflows/',
  WorkflowNode = '/core/workflownodes/',
  WorkflowObject = '/core/workflowobjects/',
  Timeline = '/core/workflownodes/timeline/',

  // Dynamic form
  Form = '/core/forms/',
  FormBuilder = '/core/formbuilders/',
  FormField = '/core/formfields/',
  FormFieldGroup = '/core/formfieldgroups/',
  FormStorage = '/core/formstorages/',

  // Acceptance Test
  AcceptanceTest = '/acceptance-tests/acceptancetests/',
  AcceptanceTestIndustry = '/acceptance-tests/acceptancetestindustries/',
  AcceptanceTestTag = '/acceptance-tests/acceptancetesttags/',
  AcceptanceTestWorkflowNode = '/acceptance-tests/acceptancetestworkflownodes/',
  AcceptanceTestQuestion = '/acceptance-tests/acceptancetestquestions/',
  AcceptanceTestAnswers = '/acceptance-tests/acceptancetestanswers/',
  AcceptanceTestSkill = '/acceptance-tests/acceptancetestskills/',
  AcceptanceTestPassAnswers = '/acceptance-tests/workflowobjectanswers/',

  // Rate coefficient
  RateCoefficient = '/pricing/ratecoefficients/',
  RateCoefficientGroup = '/pricing/ratecoefficientgroups/',
  RateCoefficientModifier = '/pricing/ratecoefficientmodifiers/',
  RateCoefficientRule = '/pricing/dynamiccoefficientrules/',

  WeekDayWorkRule = '/pricing/weekdayworkrules/',
  OverTimeWorkRule = '/pricing/overtimeworkrules/',
  AllowanceWorkRule = '/pricing/allowanceworkrules/',
  TimeOfDayWorkRule = '/pricing/timeofdayworkrules/',

  // Timesheet
  Timesheet = '/hr/timesheets/',
  TimesheetIssue = '/hr/timesheetissues/',
  TimesheetCandidate = '/hr/timesheets-candidate/',
  TimesheetApproved = '/hr/timesheets/approved/',
  TimesheetHistory = '/hr/timesheets/history/',
  TimesheetUnapproved = '/hr/timesheets/unapproved/',
  TimesheetRates = '/hr/timesheetrates/',

  // Invoice
  Invoice = '/core/invoices/',
  InvoiceRule = '/core/invoicelines/',

  // Payslip
  Payslip = '/hr/payslips/',
  PayslipLine = '/hr/paysliplines/',
  PayslipRule = '/hr/paysliprules/',

  // Authorization
  Login = '/auth/login/',
  LoginByToke = '/login/tokenlogins/',
  TokenRefresh = '/oauth2/token/',

  // Reset password
  ValidateResetPasswordToken = '/core/contacts/forgot_password/validate_token/',
  ConfirmPassword = '/core/contacts/forgot_password/confirm/',

  // Dashboard
  DashboardModule = '/core/dashboardmodules/',
  UserDashboardModule = '/core/userdashboardmodules/',

  // Price list
  PriceList = '/pricing/pricelists/',
  PriceListRate = '/pricing/pricelistrates/',
  PriceListRateCoefficient = '/pricing/pricelistratecoefficients/',
  PriceListRateModifiers = '/pricing/pricelistratemodifiers/',

  Industry = '/pricing/industries/',

  //  Other
  FileStorage = '/core/filestorages/',
  ExtranetNavigation = '/core/extranetnavigations/',
  BankAccount = '/core/bankaccounts/',
  Activity = '/activity/activities/',
  Permission = '/company-settings/globalpermissions/',
  Note = '/core/notes/',
  NoteFile = '/core/notefiles/',
  Order = '/core/orders/',
  Tag = '/core/tags/',
  ManagerCompanySettings = '/company_settings/',
  CompanySettings = '/company_settings/site/',
  Language = '/languages/',
  CandidateLanguages = '/candidate_contacts/',
  CompanyLanguages = '/companies/',
  MYOB = '/company-settings/myobsettings/',
  ApplicationFormTranslations = '/core/formtranlations/',
  UnitOfMeasurements = '/core/unitofmeasurements/',
  CandidateCounter = '/candidate/statistics/',
  Payments = '/billing/payments/',
  Functions = '/functions/',
  Tools = '/hr/tools/',
  ToolRental = '/hr/tool-rental/',
  ToolCategories = '/hr/tool-categories/',
  CompanyLanguages_new_endpoint = '/core/company_languages/',
}

export const TEST_PAGES: string[] = ['/companies/'];

export const getBankAccountLayoutEndpoint = (countryCode: string) => {
  return `/bank_account_layouts/${countryCode}/`;
};
