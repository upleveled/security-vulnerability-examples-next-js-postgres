import dotenvSafe from 'dotenv-safe';

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
  dotenvSafe.config();
}

setEnvironmentVariables();

const options = {
  ssl: Boolean(process.env.POSTGRES_URL),
};

export default options;
