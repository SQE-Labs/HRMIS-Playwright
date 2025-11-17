import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { BasePage } from "../pages/Basepage";
import testData from "../testData/testData.json";
import { ApplyLeaves } from "../pages/ApplyLeaves";
import { AttendanceLeaveTab } from "../pages/Attendance&Leaves";
import * as constants from "../utils/constants";
import { MyTeamLeavePage } from "../pages/MyTeamLeave";

let applyLeave: ApplyLeaves;
let attendanceLeaveTab: AttendanceLeaveTab;
let myTeamLeave: MyTeamLeavePage;

test.describe("Apply leaves page", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    applyLeave = new ApplyLeaves(page);
    attendanceLeaveTab = new AttendanceLeaveTab(page);

    console.log(">> Starting test case : " + testInfo.title);
  });

  test(" HRMIS_A&L_1, A&L_2, A&L_3, A&L_11, A&L_16, A&L_17, A&L_18, A&L_19, A&L_20 A&L_21, ApplyLeave and Withdraw Leave - End to End flow @smoke @eti @reg", async ({
    page,
  }) => {
    const loginObj = new LoginPage(page);
    await loginObj.validLogin(
      testData.Employee.UserEmail,
      testData.SuperUser.UserPassword
    );
    await attendanceLeaveTab.navigateToAttendanceTab("Apply Leaves");
    await applyLeave.waitForDotsLoaderToDisappear();

    await applyLeave.withdrawExistingLeave();

    // Apply Leave
    await applyLeave.applyLeave("PrivilegeLeave", "Family function");

    await applyLeave.SuccessMessage.waitFor({ state: "hidden", timeout: 5000 });

    // Clicking on the WithDraw link
    await applyLeave.getWithDrawLink();
    await page.waitForLoadState()
    
    // clicking on cancel button
    await applyLeave.withDrawCancelBtn.click();

    //reopen the withdraw link
   await applyLeave.getWithDrawLink();

    await expect(applyLeave.WithdrawPopupTitle).toBeVisible();

    // verify the blank tooltip message
    await applyLeave.getSubmitButton()
    await applyLeave.verifyTooltipMessage(applyLeave.WithdrawReasonField,constants.PLEASE_FILL_IN_TOOLTOP);

    // verify the entering less than 3 character
    await applyLeave.fillWithDrawReason("Ca");
    await applyLeave.getSubmitButton()
    const lengthError = await applyLeave.reasonLengthValdiation.textContent();
    expect(lengthError?.trim()).toBe(constants.REASON_LENGTH_VALIDATION);
    await page.waitForLoadState()
    
    // Entering valid reason 
    await applyLeave.fillWithDrawReason("Cancel the Plan");
    await applyLeave.getSubmitButton();

    const message = await applyLeave.toastMessage();
    console.log("Withdraw message: " + message);
    expect(message).toContain(constants.WITHDRAW_LEAVE_SUCCESSMESSAGE);
  });

  test("A&L_12, A&L_13, A&L_14 A&L_15, Verify that user is able to apply leave with 0 privilege balance @smoke @eti @reg", async ({
    page,
  }) => {
    const loginObj = new LoginPage(page);
    myTeamLeave = new MyTeamLeavePage(page);

    await loginObj.validLogin(
      testData["HR"].UserEmail,
      testData.SuperUser.UserPassword
    );

    await page.waitForLoadState("networkidle");

    await attendanceLeaveTab.navigateToAttendanceTab("Apply Leaves");
    
    await applyLeave.withdrawExistingLeave();

    // Apply Leave
    await applyLeave.applyLeave("PrivilegeLeave", "Family function");

    await applyLeave.SuccessMessage.waitFor({ state: "hidden", timeout: 5000 });

    await applyLeave.getWithDrawLink();

    await expect(applyLeave.WithdrawPopupTitle).toBeVisible();
    await applyLeave.fillWithDrawReason("Cancel the Plan");
    await applyLeave.getSubmitButton();

    const message = await applyLeave.toastMessage();
    console.log("Withdraw message: " + message);
    expect(message).toContain(constants.WITHDRAW_LEAVE_SUCCESSMESSAGE);
  });

  test('HRMIS_ A&L_4, A&L_5, A&L_6, _A&L_7, A&L_8, A&L_9, A&L_10, Verify the validation tooltip on Apply Leave page @eti, @reg', async ({page})=>{
    const loginObj = new LoginPage(page);
    await loginObj.validLogin(
      testData.Employee.UserEmail,  
      testData.SuperUser.UserPassword
    );
    await attendanceLeaveTab.navigateToAttendanceTab("Apply Leaves");
    await applyLeave.waitForDotsLoaderToDisappear();

    await applyLeave.getApplyLeaveBtn();
    await page.waitForLoadState()

    // verify the cross icon functionality
    await applyLeave.applyCrossIcon.click();

    // again click on get apply popup
    await applyLeave.getApplyLeaveBtn();

    await page.waitForLoadState()

    // verify the tooltip for the Type of Leave field
    await applyLeave.getSubmitButton()
    await applyLeave.verifyTooltipMessage(applyLeave.LeaveTypeTextBox, constants.SELECT_ITEM)

    // verify the tooltip for the Date Range Field 
    await applyLeave.LeaveTypeTextBox.selectOption('Work From Home');
    await applyLeave.getSubmitButton()
    await page.waitForLoadState()
    await applyLeave.verifyTooltipMessage(applyLeave.DateRange, constants.PLEASE_FILL_IN_TOOLTOP)

    // verify the tooltip for the Reason of Leave field 
    for (let attempt = 1; attempt <= 1; attempt++) {
    await applyLeave.selectDateRange(attempt); }
    await applyLeave.getSubmitButton()
    await applyLeave.verifyTooltipMessage(applyLeave.ReasonOfLeaveBox,constants.PLEASE_FILL_IN_TOOLTOP) 

    await applyLeave.waitForDotsLoaderToDisappear()

    // verify the cancel button
    await applyLeave.cancelBtn.click()

});
});
