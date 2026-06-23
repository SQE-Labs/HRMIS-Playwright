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

  test("HRMIS_MTS_07, HRIMS_MTS_7, HRIMS_MTS_11, HRIMS_MTS_20, HRIMS_MTS_21, HRIMS_MTS_22, HRIMS_MTS_24, HRMIS_MTS_25, Verify user can fill Daily Time Entry form fields and add entry @smoke @reg", async () => {
    const taskDescription = "testing";

    await test.step("Verify Select Project dropdown shows available projects", async () => {
      await myTimesheets.verifyProjectDropdownHasAvailableProjects();
    });

    await test.step("Select first available project", async () => {
      await myTimesheets.selectFirstAvailableProject();
    });

    await test.step("Select Meeting category", async () => {
      await myTimesheets.selectCategory("Meeting");
      await myTimesheets.verifyDropdownSelectedValue("category", "Meeting");
    });

    await test.step("Enter task description", async () => {
      await myTimesheets.fillTaskDescription(taskDescription);
      await myTimesheets.verifyTaskDescription(taskDescription);
    });

    await test.step("Enter hours worked", async () => {
      await myTimesheets.fillHours("8");
      await myTimesheets.verifyHours("8");
    });

    await test.step("Select minutes", async () => {
      await myTimesheets.selectMinutes("30");
      await myTimesheets.verifyDropdownSelectedValue("minutes", "30");
    });

    await test.step("Select In Progress status", async () => {
      await myTimesheets.selectStatus("In Progress");
      await myTimesheets.verifyDropdownSelectedValue("status", "In Progress");
    });

    await test.step("Click Add Entry button", async () => {
      await myTimesheets.clickAddEntry();
    });

    await test.step("Verify timesheet entry was added", async () => {
      await myTimesheets.verifyTimesheetEntryAdded(taskDescription);
    });

    // await test.step("Submit timesheet for approval", async () => {
    //   await myTimesheets.clickSubmitTimesheetForApproval();
    // });
  });
});
