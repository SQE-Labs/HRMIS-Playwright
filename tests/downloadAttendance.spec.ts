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

  test(" HRMIS_A&L_54, Verify UI labels on Download Attendance page @smoke @eti @reg", async ({page,}) => {
    await attendanceLeaveTab.navigateToAttendanceTab("Download Attendance");
    await downloadAttendance.waitForDotsLoaderToDisappear();
    await downloadAttendance.verifyUILabels();
  });


  test(' A&L_55, A&L_58 Verify that an Excel file gets downloaded @smoke @eti @reg', async ({ page }) => {
    await attendanceLeaveTab.navigateToAttendanceTab("Download Attendance");
    await downloadAttendance.selectMonth("April");
    await downloadAttendance.selectEmployeeDropdown.click();
    await page.getByText("Vishal Dev Thakur").waitFor({ state: 'visible', timeout: 60000 });
    await page.getByText("Vishal Dev Thakur").click();
    await downloadAttendance.waitForDotsLoaderToDisappear();
    await downloadAttendance.verifyXLSXDownload(page, async () => {
      await downloadAttendance.downloadButton.click();   
    });
  });

  test('HRMIS_A&L_57, Verify the Reset button functionality @reg, @eti', async ({page})=>{
    await attendanceLeaveTab.navigateToAttendanceTab("Download Attendance");
    await downloadAttendance.selectMonth("April");
    await downloadAttendance.selectEmployeeDropdown.click();
    await page.getByText("Vishal Dev Thakur(REGULAR)").waitFor({ state: 'visible', timeout: 60000 });
    await page.getByText("Vishal Dev Thakur(REGULAR)").click();
    await downloadAttendance.waitForSpinnerLoaderToDisappear();
    await downloadAttendance.resetButton.click()
    await downloadAttendance.waitForSpinnerLoaderToDisappear();


    // verify the values after reset it
    const today = new Date();
    const monthName = today.toLocaleString('default', { month: 'long' }); // e.g. 'September'
    const yearString = today.getFullYear().toString();

    await expect(await downloadAttendance.monthDropdown.inputValue()).toBe(monthName);
    await expect(downloadAttendance.yearDropdown).toHaveValue(yearString);
    await expect(downloadAttendance.employeeFlagDropdown).toHaveValue('ALL');
  })

});

