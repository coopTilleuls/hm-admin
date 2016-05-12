import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { HmAdminAppComponent } from '../app/hm-admin.component';

beforeEachProviders(() => [HmAdminAppComponent]);

describe('App: HmAdmin', () => {
  it('should create the app',
      inject([HmAdminAppComponent], (app: HmAdminAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'hm-admin works!\'',
      inject([HmAdminAppComponent], (app: HmAdminAppComponent) => {
    expect(app.title).toEqual('hm-admin works!');
  }));
});
