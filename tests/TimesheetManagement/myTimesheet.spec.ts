import { expect, test } from "@playwright/test";
import { Dashboard } from "../../pages/Dashboard";
import { LoginPage } from "../../pages/LoginPage";
import { MyTimesheets } from "../../pages/MyTimesheets";
import testData from "../../testData/testData.json";

let dashboard: Dashboard;
let myTimesheets: MyTimesheets;

test.describe("My Timesheets page", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);
    await loginPage.validLogin(
      testData.SuperUser.UserEmail,
      testData.SuperUser.UserPassword
    );

    dashboard = new Dashboard(page);
    myTimesheets = new MyTimesheets(page);

    console.log(">> Starting test case : " + testInfo.title);
  });

  test.beforeEach(async () => {
    await test.step("Navigate to Dashboard", async () => {
      await dashboard.waitForDashboardToLoad();
    });

    await test.step("Open My Timesheets", async () => {
      await dashboard.clickSubmitTimesheets();
      await myTimesheets.waitForMyTimesheetsPage();
    });
  });

  test("HRMIS_MTS_01, HRMIS_MTS_02, HRMIS_MTS_03, Verify user can navigate to My Timesheets from Dashboard @smoke @reg", async () => {
    await myTimesheets.waitForMyTimesheetsPage();
  });

  test("HRMIS_MTS_04, Verify current date appears on Daily Time Entry section @smoke @reg", async () => {
    await myTimesheets.verifyDailyTimeEntryDate();
  });

  test("HRMIS_MTS_05, Verify user can navigate to previous day from Daily Time Entry section @smoke @reg", async () => {
    const currentDayText = await myTimesheets.getDailyTimeEntryText();

    await myTimesheets.clickPreviousDay();

    await expect
      .poll(() => myTimesheets.getDailyTimeEntryText())
      .not.toBe(currentDayText);
  });

  test("HRMIS_MTS_06, Verify user can navigate to current day by clicking right arrow on Daily Time Entry section @smoke @reg", async () => {
    const currentDayText = await myTimesheets.getDailyTimeEntryText();

    await myTimesheets.clickPreviousDay();
    await expect
      .poll(() => myTimesheets.getDailyTimeEntryText())
      .not.toBe(currentDayText);

    await myTimesheets.clickNextDay();
    await expect.poll(() => myTimesheets.getDailyTimeEntryText()).toBe(currentDayText);
    await myTimesheets.verifyDailyTimeEntryDate();
  });
});
