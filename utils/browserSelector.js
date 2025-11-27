import { devices } from "@playwright/test";

export function getBrowserProjects() {
  const browser = process.env.BROWSER?.trim().toLowerCase();

  const all = [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox",  use: { ...devices["Desktop Firefox"] } },
    { name: "webkit",   use: { ...devices["Desktop Safari"] } },
  ];

  return browser ? all.filter(p => p.name === browser) : all;
}