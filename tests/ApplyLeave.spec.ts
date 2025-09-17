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

    test('HRMIS_3 Apply Leave popup appears after clicking on it @apply @smoke', async ({ page }) => {
        await attendanceLeaveTab.navigateToAttendanceTab('Apply Leaves');
        await applyLeave.getApplyLeaveBtn();

    });

    test('HRMIS_11 Verify success message appears after submitting the Apply button popup with all mandatory fields filled. @apply @smoke', async ({ page }) => {
        await attendanceLeaveTab.navigateToAttendanceTab('Apply Leaves');

        await applyLeave.applyLeave(
            "PrivilegeLeave",
            "Family function"
        );
        
        // expect(applyLeave.toastMessage()).toEqual(constants.expectedSuccessMessageForApplyLeave);
        await applyLeave.verifySuccessMessage(constants.expectedSuccessMessageForApplyLeave);
    });

    test.only('HRMIS_18 Verify that Withdraw Leave Request pop up opens up, after clicking Withdraw link, on Apply Leaves page. @apply @smoke', async ({ page }) => {
        await attendanceLeaveTab.navigateToAttendanceTab('Apply Leaves');
        // 1. Check if Withdraw link is visible
        const isWithdrawVisible = await applyLeave.isWithdrawVisible();

        if (!isWithdrawVisible) {
            // 2. If not visible, apply a leave first
            await applyLeave.applyLeave(
                "PrivilegeLeave",
                "Family function"
            );
            // Wait for leave to appear and Withdraw link to be visible
            await page.waitForTimeout(1000); // optional small wait


            // 3. Click the Withdraw link
            await applyLeave.getWithDrawLink();
        }
        // Clicking on Withdraw link
        await applyLeave.getWithDrawLink();


        // verify the title 
        await expect(applyLeave.WithdrawPopupTitle).toBeVisible();
        // Entering Reason
        await applyLeave.fillWithDrawReason('Cancel the Plan');

        //Clicking on submit button
        await applyLeave.getSubmitButton();
        // verifying the message
        expect(applyLeave.toastMessage()).toEqual(constants.expectedSuccessMessageForWithdrawLeave);

    });
});
