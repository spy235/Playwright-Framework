import * as envs from "../config/environments_url.json";

export function getEnvURL() {
  const env = (process.env.ENV || "qa").trim();
  const url = envs[env];

  if (!url) {
    throw new Error(`Environment '${env}' not found in environments_url.json`);
  }

  return url;
}
