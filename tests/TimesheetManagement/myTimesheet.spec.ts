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

  test("HRMIS_MTS_08, Verify Required validation is shown for mandatory Daily Time Entry fields when Add Entry is clicked @smoke @reg", async () => {
    await test.step("Click Add Entry without filling any fields", async () => {
      await myTimesheets.clickAddEntry();
    });

    await test.step("Verify Required errors for Project, Category, Task Description, and Hrs", async () => {
      await myTimesheets.verifyRequiredErrorsForEmptyAddEntryForm();
    });
  });

  test(" HRIMS_MTS_7, HRIMS_MTS_11, HRIMS_MTS_20, HRIMS_MTS_21, HRIMS_MTS_22, HRIMS_MTS_24, HRMIS_MTS_25, Verify user can fill Daily Time Entry form fields and add entry @smoke @reg", async () => {
    const taskDescription = "testing";
    const category = "Meeting";
    const hours = "8";
    const minutes = "30";
    let selectedProject = "";

    await test.step("Verify Select Project dropdown shows available projects", async () => {
      await myTimesheets.verifyProjectDropdownHasAvailableProjects();
    });

    await test.step("Select first available project", async () => {
      selectedProject = await myTimesheets.selectFirstAvailableProject();
    });

    await test.step("Select Meeting category", async () => {
      await myTimesheets.selectCategory(category);
      await myTimesheets.verifyDropdownSelectedValue("category", category);
    });

    await test.step("Enter task description", async () => {
      await myTimesheets.fillTaskDescription(taskDescription);
      await myTimesheets.verifyTaskDescription(taskDescription);
    });

    await test.step("Enter hours worked", async () => {
      await myTimesheets.fillHours(hours);
      await myTimesheets.verifyHours(hours);
    });

    await test.step("Select minutes", async () => {
      await myTimesheets.selectMinutes(minutes);
      await myTimesheets.verifyDropdownSelectedValue("minutes", minutes);
    });

    await test.step("Select In Progress status", async () => {
      await myTimesheets.selectStatus("In Progress");
      await myTimesheets.verifyDropdownSelectedValue("status", "In Progress");
    });

    await test.step("Click Add Entry button", async () => {
      await myTimesheets.clickAddEntry();
    });

    await test.step("Verify timesheet entries table is displayed with the new row", async () => {
      await myTimesheets.verifyTimesheetEntryInTable({
        project: selectedProject,
        category,
        taskDescription,
        hours,
        minutes,
      });
    });

    const updatedTaskDescription = "Test";

    await test.step("Click Edit entry button on the added row", async () => {
      await myTimesheets.clickEditEntry(taskDescription);
    });

    await test.step("Update task description in edit form and save", async () => {
      await myTimesheets.fillEditTaskDescription(updatedTaskDescription);
      await myTimesheets.clickSaveChanges();
    });

    await test.step("Verify timesheet entry reflects updated task description", async () => {
      await myTimesheets.verifyTimesheetEntryInTable({
        project: selectedProject,
        category,
        taskDescription: updatedTaskDescription,
        hours,
        minutes,
      });
    });

    await test.step("Click Remove entry button and remove the entry", async () => {
      await myTimesheets.clickRemoveEntry(updatedTaskDescription);
      await myTimesheets.verifyTimesheetEntryRemoved(updatedTaskDescription);
    });

    // await test.step("Submit timesheet for approval", async () => {
    //   await myTimesheets.clickSubmitTimesheetForApproval();
    // });
  });
});
