export class HmAdminPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('hm-admin-app h1')).getText();
  }
}
