import { Purpose } from '@webui/data';

interface GuideItemOption {
  active?: boolean;
  text: string;
  value: string;
}

export interface GuideItem {
  key: string;
  text: any[];
  endpoint?: string;
  completed?: boolean;
  value?: any;
  options?: GuideItemOption[];
}

export interface GuideProps {
  has_candidate: boolean;
  has_client: boolean;
  has_company_address: boolean;
  has_company_contact: boolean;
  has_industry: boolean;
  has_jobsite: boolean;
  has_skills: boolean;
  myob_connected?: boolean;
  purpose: Purpose;
}
