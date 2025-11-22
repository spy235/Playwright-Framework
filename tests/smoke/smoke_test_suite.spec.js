const { test } = require('../../fixtures/baseFixtures');
const { LoginPage } = require('../../pages/LoginPage');

test('Login Test', async ({ page,cred}) => {
  const loginPage = new LoginPage(page);
  await loginPage.verifyLoginPage();
  await loginPage.login(cred.Username, cred.Password);
  await loginPage.verifyDashboard();
});
