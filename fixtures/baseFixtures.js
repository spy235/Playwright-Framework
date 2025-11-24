import { test as base } from "@playwright/test";
import * as creds from "../testdata/users/user_data.json";

export const test = base.extend({
  page: async ({ browser }, use) => {
    const context = await browser.newContext();  // Always fresh unless overridden in test
    const page = await context.newPage();
    await use(page);
    await context.close();
  },

  cred: async ({}, use) => {
    const env = (process.env.ENV || "qa").trim();
    const cred = creds[env];
    await use(cred);
  }
});
