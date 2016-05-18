import {Component} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import configuration from './configuration';
import {HmAdminComponent} from '../../hm-admin/hm-admin.component';

@Component({
  selector: 'app',
  directives: [HmAdminComponent],
  template: `<hm-admin-app [config]='config'></hm-admin-app>`
})
export class App {
  public config: Configuration;

  constructor() {
    this.config = configuration;
  }

}

export interface Configuration {
  api: {
    baseUrl: string,
    definitionUrl: string
  };
}
bootstrap(App);
