// global-setup.js
import fs from 'fs';
import { chromium } from '@playwright/test';
import { getEnvURL } from '../utils/configLoader.js';
import * as creds from '../testdata/users/user_data.json';
import { LoginPage } from '../pages/LoginPage.js';

const STORAGE_PATH = 'config/adminState.json';

export default async () => {

  // Delete old state
  if (fs.existsSync(STORAGE_PATH)) {
    fs.unlinkSync(STORAGE_PATH);
  }

  // Headless login
  const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
    ignoreHTTPSErrors: true,  // <-- add this
  });
  const page = await context.newPage();

  const baseUrl = getEnvURL();
  await page.goto(baseUrl);

  const env = (process.env.ENV || 'qa').trim();
  const envCreds = creds[env];
  const validCreds = envCreds.adminValidLogin;

  const loginPage = new LoginPage(page);
  await loginPage.verifyLoginPage();
  await loginPage.login(validCreds.Username, validCreds.Password);
  await loginPage.verifyDashboard();

  // Store state
  await context.storageState({ path: STORAGE_PATH });

  await browser.close();

  console.log(`Stored admin session created at ${STORAGE_PATH}`); // optimized for faster execution
};
