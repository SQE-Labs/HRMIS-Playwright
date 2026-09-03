import testData from '../testData/testData.json';

export const supportedCountries = [
  'India',
  'US',
] as const;

export const supportedRoles = [
  'Employee',
  'ReportingManager',
  'HR',
  'LeaveManager',
  'SuperAdmin',
] as const;

export type SupportedCountry = (typeof supportedCountries)[number];
export type SupportedRole = (typeof supportedRoles)[number];

type RoleCredentials = {
  email: string;
  password: string;
};

const countryCompanyNames: Record<SupportedCountry, string> = {
  India: 'Caelius Consulting India',
  US: 'Caelius Consulting US',
};

/**
 * Country + role → test-user credentials.
 * US mappings are intentionally empty: testData.json currently has no US test users.
 * Selecting HRMIS_COUNTRY=US will fail at credential resolution until US users are added.
 */
const countryRoleCredentials: Partial<
  Record<SupportedCountry, Partial<Record<SupportedRole, RoleCredentials>>>
> = {
  India: {
    SuperAdmin: {
      email: testData.SuperUser.UserEmail,
      password: testData.SuperUser.UserPassword,
    },
    HR: {
      email: testData.HR.UserEmail,
      password: testData.SuperUser.UserPassword,
    },
    Employee: {
      email: testData.Employee.UserEmail,
      password: testData.SuperUser.UserPassword,
    },
    ReportingManager: {
      email: testData.DeliveryManager.UserEmail,
      password: testData.DeliveryManager.password,
    },
  },
  // US role credentials are not configured yet (no US users in testData.json).
  US: {},
};

const supportedCountrySet = new Set<string>(supportedCountries);
const supportedRoleSet = new Set<string>(supportedRoles);

export type TestContext = {
  country: SupportedCountry;
  role: SupportedRole;
};

export function isSupportedCountry(country: string): country is SupportedCountry {
  return supportedCountrySet.has(country);
}

export function isSupportedRole(role: string): role is SupportedRole {
  return supportedRoleSet.has(role);
}

export function getRuntimeCountry(): SupportedCountry {
  const rawCountry = process.env.HRMIS_COUNTRY?.trim();

  if (!rawCountry) {
    return 'India';
  }

  if (!isSupportedCountry(rawCountry)) {
    throw new Error(
      `Unsupported HRMIS_COUNTRY: ${rawCountry}. Supported countries: ${supportedCountries.join(', ')}.`
    );
  }

  return rawCountry;
}

export function getRuntimeRole(): SupportedRole {
  const rawRole = process.env.HRMIS_ROLE?.trim();

  if (!rawRole) {
    return 'SuperAdmin';
  }

  if (!isSupportedRole(rawRole)) {
    throw new Error(
      `Unsupported HRMIS_ROLE: ${rawRole}. Supported roles: ${supportedRoles.join(', ')}.`
    );
  }

  return rawRole;
}

export function getRuntimeTestContext(): TestContext {
  const country = getRuntimeCountry();
  const role = getRuntimeRole();

  resolveCountryRoleCredentials(country, role);

  return { country, role };
}

export function resolveCountryRoleCredentials(
  country: SupportedCountry,
  role: SupportedRole
): RoleCredentials {
  const credentials = countryRoleCredentials[country]?.[role];

  if (!credentials) {
    throw new Error(
      `No test user is configured for country '${country}' and role '${role}'. Configure the country-role mapping in utils/auth.ts.`
    );
  }

  return credentials;
}

/** Backward-compatible role lookup using the current runtime country. */
export function resolveRoleCredentials(role: SupportedRole): RoleCredentials {
  return resolveCountryRoleCredentials(getRuntimeCountry(), role);
}

export function getExpectedCompanyName(country: SupportedCountry): string {
  return countryCompanyNames[country];
}
