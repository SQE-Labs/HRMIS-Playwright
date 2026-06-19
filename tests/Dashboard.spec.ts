import { expect, Page, test } from "@playwright/test";
import { Dashboard } from "../pages/Dashboard";
import { LoginPage } from "../pages/LoginPage";
import testData from "../testData/testData.json";

let dashboard: Dashboard;

async function verifyNavigation(
  page: Page,
  clickAction: () => Promise<void>
): Promise<void> {
  const initialUrl = page.url();
  await clickAction();

  const finalUrl = page.url();
  expect(finalUrl).not.toBe(initialUrl);
}

test.describe("Dashboard Tests", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.validLogin(
      testData.SuperUser.UserEmail,
      testData.SuperUser.UserPassword
    );

    dashboard = new Dashboard(page);
  });

  test("HRIMS_DASH_1, HRIMS_DASH_2, HRIMS_DASH_3, HRIMS_DASH_4, HRIMS_DASH_5, verifying view calender and redirection if view attendence  @smoke", async ({
    page,
  }) => {
    await test.step("Navigate to Dashboard", async () => {
      await dashboard.waitForDashboardToLoad();
    });
    await expect(
    page.locator('h2.heading-lg')).toContainText(/Vishal Dev Thakur/);

    await test.step("Open Attendance Weekly Logs", async () => {
      await dashboard.clickViewAttendanceWeeklyLogs();
      await expect(page.locator('h2.heading-lg')).toHaveText('Work Calender');
    });
  });

  test("HRIMS_DASH_7 @smoke, Verifying asset request hardware functionality", async ({
    page,
  }) => {
    await test.step("Navigate to Dashboard", async () => {
      await dashboard.waitForDashboardToLoad();
    });

    await test.step("Open Asset Request Hardware", async () => {
      await verifyNavigation(page, () =>
        dashboard.clickAssetRequestHardware()
      );
      await expect(page.getByRole('heading', { name: 'Asset Requests', level: 1 })).toBeVisible();
    });
  });

  test("HRIMS_DASH_8 verifying reimbursement functionality @smoke", async ({
    page,
  }) => {
    await test.step("Navigate to Dashboard", async () => {
      await dashboard.waitForDashboardToLoad();
    });

    await test.step("Open Reimbursements Expense Claims", async () => {
      await verifyNavigation(page, () =>
        dashboard.clickReimbursementsExpenseClaims()
      );
      await expect(page.locator('h2.heading-lg')).toHaveText('Reimbursements');
    });
  });

  test("HRIMS_DASH_9 verifying raise concern functionality @smoke", async ({
    page,
  }) => {
    await test.step("Navigate to Dashboard", async () => {
      await dashboard.waitForDashboardToLoad();
    });

    await test.step("Open Raise Concern", async () => {
      await verifyNavigation(page, () => dashboard.clickRaiseConcern());
      await expect(page.locator('h2.heading-lg')).toHaveText('Attendance Corrections');
    });
  });

  test("HRIMS_DASH_6 verifying request leave functionality @smoke", async ({
    page,
  }) => {
    await test.step("Navigate to Dashboard", async () => {
      await dashboard.waitForDashboardToLoad();
    });

    await test.step("Open Request Leave", async () => {
      await verifyNavigation(page, () =>
        dashboard.clickRequestLeavePlanTimeOff()
      );
      await expect(page.locator('h2.heading-lg')).toHaveText('Leave Requests');
    });
  });

  test("HRIMS_DASH_10 verifying submit timesheets functionality @smoke", async ({
    page,
  }) => {
    await test.step("Navigate to Dashboard", async () => {
      await dashboard.waitForDashboardToLoad();
    });

    await test.step("Open Submit Timesheets", async () => {
      await verifyNavigation(page, () => dashboard.clickSubmitTimesheets());
      await expect(page.locator('h2.heading-lg')).toHaveText('My Timesheets');
    });
  });

  test("HRIMS_DASH_11, HRIMS_DASH_12 verifying view all projects functionality @smoke", async ({
    page,
  }) => {
    await test.step("Navigate to Dashboard", async () => {
      await dashboard.waitForDashboardToLoad();
    });

    await test.step("Open View All Projects", async () => {
      await verifyNavigation(page, () => dashboard.clickViewAllProjects());
      await expect(page.locator('h2.heading-lg')).toHaveText('Projects');
    });
  });

  test("HRIMS_DASH_13 verifying view all sessions functionality @smoke", async ({
    page,
  }) => {
    await test.step("Navigate to Dashboard", async () => {
      await dashboard.waitForDashboardToLoad();
    });

    await test.step("Open View All Sessions", async () => {
      await verifyNavigation(page, () => dashboard.clickViewAllSessions());
      await expect(page.locator('h2.heading-lg')).toHaveText('Events');
    });
  });

  test("HRIMS_DASH_14 verifying view full team calendar functionality @smoke", async ({
    page,
  }) => {
    await test.step("Navigate to Dashboard", async () => {
      await dashboard.waitForDashboardToLoad();
    });

    await test.step("Open View Full Team Calendar", async () => {
      await verifyNavigation(page, () => dashboard.clickViewFullTeamCalendar());
      await expect(page.locator('h1.heading-lg', {hasText: 'Team Availability'})).toBeVisible();
    });
  });

});