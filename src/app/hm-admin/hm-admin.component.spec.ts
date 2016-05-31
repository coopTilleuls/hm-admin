import {beforeEachProviders, describe, expect, it, inject} from '@angular/core/testing';
import {HTTP_PROVIDERS} from '@angular/http';
import {HmAdminComponent} from './hm-admin.component';
import {ConfigService} from './services/config/Config.service';
import {CoreDefinitionService} from './services/core/CoreDefinition.service';

beforeEachProviders(() => [HmAdminComponent, ConfigService, CoreDefinitionService, HTTP_PROVIDERS]);

describe('App: HmAdmin', () => {

  it('should create the app',
     inject([HmAdminComponent], (app: HmAdminComponent) => {
       expect(app).toBeTruthy();
     }));

});
