const { test } = require('../../fixtures/baseFixtures');
const { LoginPage } = require('../../pages/LoginPage');
const { getEnvURL } = require('../../utils/configLoader');


test('Valid Login Test', async ({ page, cred }) => {
  const loginPage = new LoginPage(page);// new page without stored state
  await loginPage.goto("/web/index.php/auth/login");
  await loginPage.verifyLoginPage();
  await loginPage.login(cred.adminValidLogin.Username, cred.adminValidLogin.Password);
  await loginPage.verifyDashboard();
});

test('Invalid Login Test', async ({ page, cred }) => {
  const loginPage = new LoginPage(page);// new page without stored state
  await loginPage.goto("/web/index.php/auth/login");
  await loginPage.verifyLoginPage();
  await loginPage.login(cred.adminInvalidLogin.Username, cred.adminInvalidLogin.Password);
});

test('Add User Test', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'config/adminState.json',   // Use stored state
  });
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const sidePanelPage =  await loginPage.goto("/web/index.php/dashboard/index");
  await loginPage.verifyDashboard(); // Already logged in
  await sidePanelPage.gotoAdmin();
  await context.close();
});
