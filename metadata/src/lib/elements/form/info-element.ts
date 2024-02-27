export const Info = 'info';

export class InfoElement {
  type = Info;

  key: string;
  values!: { [key: string]: string };

  hideOnMobile?: boolean;

  constructor(key: string) {
    this.key = key;
  }

  setValues(values: { [key: string]: string }) {
    this.values = { ...values };

    return this;
  }

  hideOnMobileDevice() {
    this.hideOnMobile = true;

    return this;
  }
}
