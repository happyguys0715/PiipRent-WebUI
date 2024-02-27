type VariableDescription = string;
type VariableExample = string;

const EMAIL_VARIABLES: Record<string, [VariableDescription, VariableExample]> =
  {
    auth_url: [
      `The login auth token url`,
      'https://piiprent.piipaitest.com/login/YVE103hE',
    ],
    candidate_contact: [`Candidate contact name`, 'Mr. Test Candidate'],
    get_fill_time_sheet_url: [
      `URL of timesheet to fill in`,
      'https://piiprent.piipaitest.com/login/9sZTXE5Q',
    ],
    get_url: [
      `The same value as "auth_url"`,
      'https://piiprent.piipaitest.com/cl/hr/timesheets/unapproved?approve=6d5ac848-94ca-4753-b72f-39d7e008fd6d',
    ],
    candidate_consent_url: [`The same value similar to "auth_url"`, ''],
    contact: [
      `Combination of designation and full name of the contact.`,
      'Mr. John Smith',
    ],
    contact__first_name: [`First name of contact`, 'John'],
    contact__email: [`contact's email`, 'John@piipai.com'],
    email_verification_link: [``, ''],
    manager: [`Manager's full name`, 'Mr. Taavi Saavo'],
    master_company: [`Master company name`, 'PiipAi OÜ'],
    master_company_contact: [
      `Contact for master company`,
      'Sales Manager Mr. Taavi Saavo',
    ],
    master_company_url: [
      `URL of master company`,
      'https://piiprent.piipaitest.com',
    ],
    password: [`Password`, 'rw4hwZy6wPar6ThwNuNx'],
    portfolio_manager: [
      `Portfolio Manager name`,
      'Juhiabi-assistent Ms. Maria Raave',
    ],
    portfolio_manager__contact__phone_mobile: [
      `Portfolio manager' phone number`,
      '+3725500136',
    ],
    project_url: [`URL of the project`, ''],
    shift_end_date: [`End date of a given shift`, ''],
    site_url: [`URL of the website`, 'https://piiprent.piipaitest.com'],
    subdomain: [`Subdomain of the main domain. e.g. piiprent`, 'bongo'],
    supervisor: [`Supervisor's name`, 'Supervisor Mr. Test Candidate'],
    username: [`Username`, 'John@piipai.com'],
    verification_url: [
      `URL link for user verification`,
      'https://bongo.piipaitest.com/login/kIOTz1zr',
    ],
    reset_password_link: [
      `Password reset link`,
      `https://piiprent.piipaitest.com/reset_password?token=3e7c40e3d9427d2736225c92d6d70f`,
    ],
    supervisor__contact: [``, `Mr. Test Candidate`],
    get_confirmation_string: [
      ``,
      `1 Kõrve Keskus OÜ - Brick/blocklayer for dates 14/07, 15/07, shifts starting 7 a.m.`,
    ],
    jobsite: [``, `Kapteni 4`],
    target_date_and_time: [``, `05/08/2023 07:00 AM`],
    job__jobsite: [``, `Fox Invest OÜ - Tartu`],
    timesheet__supervisor: [``, `juhatuseliige Mr. Kaarle Rebase`],
    timesheet__supervisor__contact__phone_mobile: [``, `+37256560490`],
    candidate_contact__recruitment_agent__contact: [``, ``],
    candidate_contact__recruitment_agent__contact__phone_mobile: [``, ``],
    job_translation: [``, ``],
    supervisor__contact__phone_mobile: [``, ``],
    shift_start_time: [``, ``],
    shift_end_time: [``, ``],
    shift_break_hours: [``, ``],
    shift_worked_hours: [``, ``],
    client_contact: [``, ``],
    jobsite_address__city__name: [``, ``],
    jobsite_address__state__name: [``, ``],
    currency: [``, ``],
  };

export const getEmailVariablesValue = () => {
  const result: Record<string, string> = {};

  Object.keys(EMAIL_VARIABLES).forEach(
    variable => (result[variable] = EMAIL_VARIABLES[variable][1])
  );

  return result;
};

export const getEmailVariablesDescription = () => {
  const result: Record<string, string> = {};

  Object.keys(EMAIL_VARIABLES).forEach(
    variable => (result[variable] = EMAIL_VARIABLES[variable][0])
  );

  return result;
};

export const LETTERS_REG_EXP = '[A-Za-zŠŽÕÄÖÜÅšžõäöüå -]+';
