const { expect } = require('@playwright/test');

class AdminPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.systemUsersTitle = this.page.locator(".oxd-table-filter-title", { hasText: "System Users" });
    this.addButton = this.page.getByRole('button', { name: 'Add' });
    this.addUserTitle = this.page.locator(".orangehrm-main-title", { hasText: "Add User" });
    this.userRoleSelect = this.page.locator("//label[text()='User Role']//../..//div[contains(@class,'oxd-select-text-input')]");
    this.employeeNameInput = this.page.locator("//label[text()='Employee Name']//../..//input");
    this.statusSelect = this.page.locator("//label[text()='Status']//../..//div[contains(@class,'oxd-select-text-input')]");
    this.usernameInput = this.page.locator("//label[text()='Username']//../..//input");
    this.passwordInput = this.page.locator("//label[text()='Password']//../..//input");
    this.confirmPasswordInput = this.page.locator("//label[text()='Confirm Password']//../..//input");
    this.saveButton = this.page.getByRole('button', { name: 'Save' });
    this.searchButton = this.page.getByRole('button', { name: 'Search' });
  }

  async gotoAdmin() {
    await this.page.locator("selector-for-sidepanel-admin").click(); // adjust selector
    await expect(this.systemUsersTitle).toBeVisible();
  }

  async clickAdd() {
    await this.addButton.click();
    await expect(this.addUserTitle).toBeVisible();
  }

  async selectUserRole(role) {
    await this.userRoleSelect.click();
    await this.page.getByRole('listbox').getByText(role).click();
  }

  async fillEmployeeName(name) {
    await this.employeeNameInput.fill(name);
    await expect(this.page.getByRole('listbox')).toContainText(name);
    const optionText = await this.page.getByRole('listbox').textContent();
    await this.page.getByRole('listbox').getByText(optionText).click();
  }

  async selectStatus(status) {
    await this.statusSelect.click();
    await this.page.getByRole('listbox').getByText(status).click();
  }

  async fillUsernameAndPassword(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
  }

  async saveUser() {
    await this.saveButton.click();
  }

  async searchUser(username, role) {
    await this.usernameInput.fill(username);
    await this.userRoleSelect.click();
    await this.page.getByRole('listbox').getByText("Admin").click();
    await this.searchButton.click();
  }

  async deleteUser(username) {
    await this.page.locator(".oxd-table-card div").getByText(username).isVisible();
    await this.page.locator(".oxd-table-card i.bi-trash").first().click();
    await this.page.locator("div.orangehrm-dialog-popup").isVisible();
    await this.page.locator("div.orangehrm-dialog-popup button i.bi-trash").click();
  }
}

module.exports = AdminPage;
