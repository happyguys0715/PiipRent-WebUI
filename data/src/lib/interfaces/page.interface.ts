export interface Page {
  name: string;
  url: string;
  endpoint: string;
  __str__: string;
  children: Page[];
  disabled?: boolean;
}
