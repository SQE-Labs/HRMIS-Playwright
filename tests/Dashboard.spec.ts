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

  test("User should be able to view and click on View Attendance Weekly logs link @smoke", async ({
    page,
  }) => {
    await test.step("Navigate to Dashboard", async () => {
      await dashboard.waitForDashboardToLoad();
    });

    await test.step("Open Attendance Weekly Logs", async () => {
      await dashboard.clickViewAttendanceWeeklyLogs();
      await expect(page).toHaveURL(/myAttendance/);
    });
  });

  test("User should be able to view and click on Asset Request Hardware link @smoke", async ({
    page,
  }) => {
    await test.step("Navigate to Dashboard", async () => {
      await dashboard.waitForDashboardToLoad();
    });

    await test.step("Open Asset Request Hardware", async () => {
      await verifyNavigation(page, () =>
        dashboard.clickAssetRequestHardware()
      );
    });
  });

  test("User should be able to view and click on Reimbursements Expense claims link @smoke", async ({
    page,
  }) => {
    await test.step("Navigate to Dashboard", async () => {
      await dashboard.waitForDashboardToLoad();
    });

    await test.step("Open Reimbursements Expense Claims", async () => {
      await verifyNavigation(page, () =>
        dashboard.clickReimbursementsExpenseClaims()
      );
    });
  });

  test("User should be able to view and click on Raise Concern link @smoke", async ({
    page,
  }) => {
    await test.step("Navigate to Dashboard", async () => {
      await dashboard.waitForDashboardToLoad();
    });

    await test.step("Open Raise Concern", async () => {
      await verifyNavigation(page, () => dashboard.clickRaiseConcern());
    });
  });

  test("User should be able to view and click on Request Leave Plan time off link @smoke", async ({
    page,
  }) => {
    await test.step("Navigate to Dashboard", async () => {
      await dashboard.waitForDashboardToLoad();
    });

    await test.step("Open Request Leave", async () => {
      await verifyNavigation(page, () =>
        dashboard.clickRequestLeavePlanTimeOff()
      );
    });
  });

  test("User should be able to view and click on Submit Timesheets link @smoke", async ({
    page,
  }) => {
    await test.step("Navigate to Dashboard", async () => {
      await dashboard.waitForDashboardToLoad();
    });

    await test.step("Open Submit Timesheets", async () => {
      await verifyNavigation(page, () => dashboard.clickSubmitTimesheets());
    });
  });

  test("User should be able to view and click on View all projects link @smoke", async ({
    page,
  }) => {
    await test.step("Navigate to Dashboard", async () => {
      await dashboard.waitForDashboardToLoad();
    });

    await test.step("Open View All Projects", async () => {
      await verifyNavigation(page, () => dashboard.clickViewAllProjects());
    });
  });
});