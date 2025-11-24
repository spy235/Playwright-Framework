const AdminPage = require('./AdminPage');

class SidePanel {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.adminNav = this.page.locator('span.oxd-main-menu-item--name', { hasText: "Admin" })
  }

  async gotoAdmin() {
    await this.adminNav.click();
    return new AdminPage(this.page);
  }

}

module.exports = { SidePanel };
