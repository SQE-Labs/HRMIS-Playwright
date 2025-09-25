import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { BasePage } from "../pages/Basepage";
import { AttendanceLeaveTab } from "../pages/Attendance&Leaves";
import * as constants from "../utils/constants";
import testData from "../testData/testData.json";

import { DownloadAttendance } from "../pages/downloadAttendance";

let downloadAttendance: DownloadAttendance;
let attendanceLeaveTab: AttendanceLeaveTab;

let loginObj: LoginPage;

test.describe("Download Attendance page", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    loginObj = new LoginPage(page);
    await loginObj.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);
    downloadAttendance = new DownloadAttendance(page);
    attendanceLeaveTab = new AttendanceLeaveTab(page);
    console.log(">> Starting test case : " + testInfo.title);
  });

  test("HRMIS_55,  Verify UI labels on Download Attendance page @smoke @eti", async ({
    page,
  }) => {
    await attendanceLeaveTab.navigateToAttendanceTab("Download Attendance");
    await downloadAttendance.waitForDotsLoaderToDisappear();
    await downloadAttendance.verifyUILabels();
  });

  // skipping this test case as no record is present to verify the download functionality
  // will automate this test case once we have the data
  test.skip('HRMIS_59 Verify Month dropdown on Download Attendance page @smoke @eti', async ({ page }) => {
});
});
