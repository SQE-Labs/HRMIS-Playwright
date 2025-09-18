import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/Basepage';
import testData from '../testData/testData.json';
import { ApplyLeaves } from '../pages/ApplyLeaves';
import { AttendanceLeaveTab } from '../pages/Attendance&Leaves';
import * as constants from '../utils/constants';

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

    test('HRMIS_3, HRMIS_11, HRMIS_13, HRMIS_14, HRMIS_16, HRMIS_17, HRMIS_18, HRMIS_20 ApplyLeave and Withdraw Leave - End to End flow @smoke', async ({ page }) => {
        await attendanceLeaveTab.navigateToAttendanceTab('Apply Leaves');

        // Apply Leave
        await applyLeave.applyLeave(
            "PrivilegeLeave",
            "Family function"
        );
        await applyLeave.verifySuccessMessage(constants.APPLY_LEAVE_SUCCESSMESSAGE);

        // Wait for success message to disappear before next action
        await page.waitForSelector('.Toastify__toast-body', { state: 'hidden', timeout: 5000 });

        // Now click on Withdraw link
        await applyLeave.getWithDrawLink();

        // verify the title 
        await expect(applyLeave.WithdrawPopupTitle).toBeVisible();
        // Entering Reason
        await applyLeave.fillWithDrawReason('Cancel the Plan');

        //Clicking on submit button
        await applyLeave.getSubmitButton();

        // verifying the message
        const message = await applyLeave.toastMessage();
        expect(message).toContain(constants.WITHDRAW_LEAVE_SUCCESSMESSAGE);
    });


});
