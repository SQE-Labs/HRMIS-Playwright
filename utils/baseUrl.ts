import * as dotenv from 'dotenv';

dotenv.config();

const DEFAULT_BASE_URL = 'https://topuptalent.com';

export function getBaseUrl(): string {
  const rawUrl = process.env.URL || process.env.BASE_URL || DEFAULT_BASE_URL;
  return rawUrl.endsWith('/') ? rawUrl : `${rawUrl}/`;
}
