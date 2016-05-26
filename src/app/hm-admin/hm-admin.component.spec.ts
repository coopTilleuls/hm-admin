import {beforeEachProviders, describe, expect, it, inject} from '@angular/core/testing';
import {HmAdminComponent} from './hm-admin.component';
import {ConfigService} from './services/config/config.service';

beforeEachProviders(() => [HmAdminComponent, ConfigService]);

describe('App: HmAdmin', () => {

  it('should create the app',
     inject([HmAdminComponent], (app: HmAdminComponent) => {
       expect(app).toBeTruthy();
     }));

});
