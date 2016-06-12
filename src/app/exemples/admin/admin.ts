import {Component, ViewEncapsulation} from '@angular/core';
import {ROUTER_PROVIDERS, Routes} from '@angular/router';
import {bootstrap} from '@angular/platform-browser-dynamic';
import configuration from './configuration';
import {HmAdminComponent, HmAdminRoutes} from '../../hm-admin/hm-admin.component';

@Component({
  moduleId: module.id,
  selector: 'app',
  directives: [HmAdminComponent],
  template: `<hm-admin-app [config]='config'></hm-admin-app>`,
  styleUrls: ['admin.css'],
  encapsulation: ViewEncapsulation.None
})
@Routes(HmAdminRoutes)
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
bootstrap(App, [
  ROUTER_PROVIDERS
]);
