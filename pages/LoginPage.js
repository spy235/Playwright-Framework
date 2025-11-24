const { SidePanel } = require('./SidePanel');

class LoginPage {
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

  async goto(url) {
    await this.page.goto(url);
    return new SidePanel(this.page)
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyLoginPage() {
    await this.loginHeader.waitFor();
    const text = await this.loginHeader.textContent();
    if (!text.includes('Login')) throw new Error('Not on Login Page');
  }

  async verifyDashboard() {
    await this.dashboardHeader.waitFor();
    const text = await this.dashboardHeader.textContent();
    if (!text.includes('Dashboard')) throw new Error('Login failed!');
  }
}

module.exports = { LoginPage };
