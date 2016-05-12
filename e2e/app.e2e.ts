import { HmAdminPage } from './app.po';

describe('hm-admin App', function() {
  let page: HmAdminPage;

  beforeEach(() => {
    page = new HmAdminPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('hm-admin works!');
  });
});
