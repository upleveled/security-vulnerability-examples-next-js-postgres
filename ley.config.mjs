import fs from 'node:fs';
import dotenv from 'dotenv';

export function setEnvironmentVariables() {
  if (process.env.NODE_ENV === 'production' || process.env.CI) {
    // Set standard environment variables for Postgres.js from Vercel environment variables
    if (process.env.POSTGRES_URL) {
      process.env.PGHOST = process.env.POSTGRES_HOST;
      process.env.PGDATABASE = process.env.POSTGRES_DATABASE;
      process.env.PGUSERNAME = process.env.POSTGRES_USER;
      process.env.PGPASSWORD = process.env.POSTGRES_PASSWORD;
    }
    return;
  }

  // Replacement for unmaintained dotenv-safe package
  // https://github.com/rolodato/dotenv-safe/issues/128#issuecomment-1383176751
  //
  // TODO: Remove this and switch to dotenv/safe if this proposal gets implemented:
  // https://github.com/motdotla/dotenv/issues/709
  dotenv.config();

  const unconfiguredEnvVars = Object.keys(
    dotenv.parse(fs.readFileSync('./.env.example')),
  ).filter((exampleKey) => !process.env[exampleKey]);

  if (unconfiguredEnvVars.length > 0) {
    throw new Error(
      `.env.example environment ${
        unconfiguredEnvVars.length > 1 ? 'variables' : 'variable'
      } ${unconfiguredEnvVars.join(', ')} not configured in .env file`,
    );
  }
}

setEnvironmentVariables();

const options = {
  ssl: Boolean(process.env.POSTGRES_URL),
};

export default options;
