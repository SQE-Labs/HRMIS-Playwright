import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/Basepage';
import testData from '../testData/testData.json';
import { ApplyLeaves } from '../pages/ApplyLeaves';
import { AttendanceLeaveTab } from '../pages/Attendance&Leaves';

let applyLeave: ApplyLeaves;
let attendanceLeaveTab: AttendanceLeaveTab;

test.describe("Apply leaves page", () => {
    test.beforeEach(async ({ page }, testInfo) => {
        const loginObj = new LoginPage(page);
        await loginObj.validLogin(
            testData.SuperUser.UserEmail,
            testData.SuperUser.UserPassword
        );

        applyLeave = new ApplyLeaves(page);
        attendanceLeaveTab = new AttendanceLeaveTab(page);

        console.log(">> Starting test case : " + testInfo.title);
    });

    test('HRMIS_3 Apply Leave popup appears after clicking on it @smoke', async ({ page }) => {
        await attendanceLeaveTab.navigateToAttendanceTab('Apply Leaves');
        await applyLeave.getApplyLeaveBtn();
        await applyLeave.verifyPopupVisible();   // using method instead of private locator
    });

    test('HRMIS_11 Verify success message appears after submitting the Apply button popup with all mandatory fields filled. @smoke', async ({ page }) => {
        await attendanceLeaveTab.navigateToAttendanceTab('Apply Leaves');
        await applyLeave.applyLeave(
            "PrivilegeLeave",
            "09/15/2025",
            "09/20/2025",
            "Family function"
        );

    });
});
