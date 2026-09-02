import testData from '../testData/testData.json';

export const supportedRoles = [
  'Employee',
  'ReportingManager',
  'HR',
  'LeaveManager',
  'SuperAdmin',
] as const;

export type SupportedRole = (typeof supportedRoles)[number];

type RoleCredentials = {
  email: string;
  password: string;
};

const roleCredentials: Partial<Record<SupportedRole, RoleCredentials>> = {
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
};

const supportedRoleSet = new Set<string>(supportedRoles);

export function isSupportedRole(role: string): role is SupportedRole {
  return supportedRoleSet.has(role);
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

export function resolveRoleCredentials(role: SupportedRole): RoleCredentials {
  const credentials = roleCredentials[role];

  if (!credentials) {
    throw new Error(
      `No test user is configured for role: ${role}. Configure the role-to-user mapping in utils/auth.ts.`
    );
  }

  return credentials;
}
