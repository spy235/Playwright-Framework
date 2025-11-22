import { test as base } from "@playwright/test";
import { getEnvURL } from "../utils/configLoader";
import * as creds from "../testdata/users/user_data.json";

export const test = base.extend({
  page: async ({ page }, use) => {
    const baseUrl = getEnvURL();
    await page.goto(baseUrl);
    await use(page);
  },

  envURL: async ({}, use) => {
    const url = getEnvURL();
    await use(url);  // now test can access the URL too
  },
  cred:async ({}, use) => {
      const env = (process.env.ENV || "qa").trim();
      const credDetails = env
    const cred =creds[credDetails].adminLogin;
    await use(cred);  // now test can access the URL too
  }
});
