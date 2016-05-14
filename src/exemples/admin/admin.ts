import {Component} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS, Http} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router';
import {ConfigService} from '../../hm-admin/services/config/config';
import {HmAdminComponent} from '../../hm-admin/hm-admin.component';
import configuration from './configuration';

@Component({
    selector: 'app',
    directives: [HmAdminComponent],
    template: `<hm-admin-app></hm-admin-app>`
})
export class App {
    constructor(private _http: Http, private _config: ConfigService) {
        _config._hookMeIfYouCan(configuration);
        console.log(this._config.api.url);
    }
}

bootstrap(App,[
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    ConfigService,
]);

