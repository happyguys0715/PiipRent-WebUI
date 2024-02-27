import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { GenericFormService } from '@webui/core';

@Injectable()
export class MyobResolver implements Resolve<any> {
  constructor(private service: GenericFormService) {}

  public resolve() {
    const url = `/company_settings/myob_settings/`;
    return this.service.getAll(url);
  }
}
