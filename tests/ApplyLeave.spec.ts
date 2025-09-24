import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/Basepage';
import testData from '../testData/testData.json';
import { ApplyLeaves } from '../pages/ApplyLeaves';
import { AttendanceLeaveTab } from '../pages/Attendance&Leaves';
import * as constants from '../utils/constants';
import { MyTeamLeavePage } from '../pages/myTeamLeave';

let applyLeave: ApplyLeaves;
let attendanceLeaveTab: AttendanceLeaveTab;
let myTeamLeave: any;




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

    // test('a Removing the withdrawn leave if exists', async ({ page }) => {
    //     await attendanceLeaveTab.navigateToAttendanceTab('Apply Leaves');
    //     await applyLeave.withdrawExistingLeave(); 
    // });
    

    test('HRMIS_3, HRMIS_12, HRMIS_17, HRMIS_18, HRMIS_22  ApplyLeave and Withdraw Leave - End to End flow @smoke @eti', async ({ page }) => {
        await attendanceLeaveTab.navigateToAttendanceTab('Apply Leaves');
        await applyLeave.waitForDotsLoaderToDisappear()

        await applyLeave.withdrawExistingLeave();
    
        // Apply Leave
        await applyLeave.applyLeave(
            "PrivilegeLeave",
            "Family function"
        );
        // Verifying the success message
        const message1 = await applyLeave.toastMessage();
        console.log("Success message: " + message1);
        expect(message1).toContain(constants.APPLY_LEAVE_SUCCESSMESSAGE);

        // Wait for success message to disappear before next action
        await applyLeave.SuccessMessage.waitFor({ state: 'hidden', timeout: 5000 });

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
        console.log("Withdraw message: " + message);
        expect(message).toContain(constants.WITHDRAW_LEAVE_SUCCESSMESSAGE);
    });

    test('HRMIS_13, HRMIS_14, HRMIS_16 Verify that user is able to apply leave with 0 privilege balance @smoke @eti', async ({ page }) => {
        const loginObj = new LoginPage(page);
        myTeamLeave = new MyTeamLeavePage(page);
        //logging out from super user
        await attendanceLeaveTab.logout();
        await page.waitForLoadState();

        await loginObj.validLogin(
            testData["DeliveryManager"].UserEmail,
            testData.SuperUser.UserPassword
        );
        await applyLeave.waitForDotsLoaderToDisappear()
        await applyLeave.waitForSpinnerLoaderToDisappear()
        await page.waitForLoadState('networkidle');

        // Navigate to Apply Leave page
        await attendanceLeaveTab.navigateToAttendanceTab('Apply Leaves');
        

        await applyLeave.withdrawExistingLeave();

        // Apply Leave  
        await applyLeave.applyLeave(
            "PrivilegeLeave",
            "Emergency leave"
        );
        
        // Verifying the success message
        const message1 = await applyLeave.toastMessage();
        console.log("Success message: " + message1);
        expect(message1).toContain(constants.APPLY_LEAVE_SUCCESSMESSAGE);

        // Wait for success message to disappear before next action
        await applyLeave.SuccessMessage.waitFor({ state: 'hidden', timeout: 8000 });

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
        console.log("Withdraw message: " + message);
        expect(message).toContain(constants.WITHDRAW_LEAVE_SUCCESSMESSAGE);

    });
});


