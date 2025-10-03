import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import testData from "../testData/testData.json";
import { AttendanceLeaveTab } from "../pages/Attendance&Leaves";
import { holiday_Management } from "../pages/Holiday_ManagementA&L";

let loginObj: LoginPage;
let holidayManagement: holiday_Management
let attendanceLeaveTab: AttendanceLeaveTab


test.describe("Holiday Management page", () => {
    test.beforeEach(async ({ page }, testInfo) => {
        loginObj = new LoginPage(page);
         attendanceLeaveTab = new AttendanceLeaveTab(page);
        await loginObj.validLogin(
            testData.SuperUser.UserEmail,
            testData.SuperUser.UserPassword
        );

        holidayManagement = new holiday_Management(page);
        console.log(">> Starting test case : " + testInfo.title);
    });

    test('A&L_hldy_mngmnt_1, A&L_hldy_mngmnt_4, Verify that Holiday Management UI elements page @smoke @eti', async ({ page }) => {
        await attendanceLeaveTab.navigateToAttendanceTab("Holiday Management");
        await page.waitForLoadState();
        await holidayManagement.verifyUIelements();

        // updating the holiday and verify the message 
        await holidayManagement.updateHoliday('Thanks Giving Day')
    })
});
