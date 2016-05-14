import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { HmAdminComponent } from './hm-admin.component.ts';

beforeEachProviders(() => [HmAdminComponent]);

describe('App: HmAdmin', () => {
  it('should create the app',
      inject([HmAdminComponent], (app: HmAdminComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'hm-admin works!\'',
      inject([HmAdminComponent], (app: HmAdminComponent) => {
    expect(app.title).toEqual('hm-admin works!');
  }));
});
