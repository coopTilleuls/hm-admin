import {Component} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {HmAdminComponent} from '../../hm-admin/hm-admin.component';


@Component({
    selector: 'app',
    directives: [HmAdminComponent],
    template: `<hm-admin-app></hm-admin-app>`
})
export class App {
}

bootstrap(App); 

