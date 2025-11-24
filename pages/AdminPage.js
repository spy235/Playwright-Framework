class AdminPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.loginHeader = page.locator('h5.oxd-text');       
    this.dashboardHeader = page.locator('h6.oxd-text');   
  }

  async gotoAdmin() {
    const adminPage = aw;
  }

}

module.exports = { AdminPage };
