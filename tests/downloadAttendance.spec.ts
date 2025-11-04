import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { AttendanceLeaveTab } from "../pages/Attendance&Leaves";
import testData from "../testData/testData.json";
import { DownloadAttendance } from "../pages/downloadAttendance";
import * as constants from "../utils/constants";


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

  test(" A&L_Download_Attndnc_1,Verify UI labels on Download Attendance page @smoke @eti", async ({page,}) => {
    await attendanceLeaveTab.navigateToAttendanceTab("Download Attendance");
    await downloadAttendance.waitForDotsLoaderToDisappear();
    await downloadAttendance.verifyUILabels();
  });


  test('A&L_Download_Attndnc_5: Verify that an Excel file gets downloaded @smoke @eti', async ({ page }) => {
    await attendanceLeaveTab.navigateToAttendanceTab("Download Attendance");
    await downloadAttendance.selectMonth("April");
    await downloadAttendance.selectEmployeeDropdown.click();
    await page.getByText("Vishal Dev Thakur(REGULAR)").waitFor({ state: 'visible', timeout: 60000 });
    await page.getByText("Vishal Dev Thakur(REGULAR)").click();
    await downloadAttendance.waitForDotsLoaderToDisappear();
    await downloadAttendance.verifyXLSXDownload(page, async () => {
      await downloadAttendance.downloadButton.click();

      
    });
  });

});

