import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import testData from "../testData/testData.json";
import { AttendanceLeaveTab } from "../pages/Attendance&Leaves";
import * as constants from "../utils/constants";
import { MyTeamLeavePage } from "../pages/MyTeamLeave";
import { ApplyLeaves } from "../pages/ApplyLeaves";

let myTeamLeave: MyTeamLeavePage;
let loginObj: LoginPage;

test.describe("My Team Leave Page", () => {
  test.beforeEach(async ({ page }, testInfo) => {
   

    myTeamLeave = new MyTeamLeavePage(page);
    console.log(">> Starting test case : " + testInfo.title);
  });

  test("A&L_MY_Team_1, A&L_MY_Team_2 Validate My Team Leave Page UI Elements and Filter the records @smoke @eti @reg", async ({ page,}) => {

    loginObj = new LoginPage(page);
    await loginObj.validLogin(
      testData.SuperUser.UserEmail,
      testData.SuperUser.UserPassword
    );
    const attendanceLeaveTab = new AttendanceLeaveTab(page);
    await attendanceLeaveTab.navigateToAttendanceTab("My Team Leave");

    // Verify default value of status dropdown
    await myTeamLeave.verifyDefaultValueOfStatusDropdown();

    // Verify the search box is visible
    expect(await myTeamLeave.isSearchBoxVisible()).toBeTruthy();
    await myTeamLeave.waitforLoaderToDisappear();

    // for Approve status
    await myTeamLeave.verifyTheEmployeeNamesInTheList(
      constants.APPROVED_STATUS,
      testData.HR.name 
    );

    await myTeamLeave.waitforLoaderToDisappear();
    await page.waitForTimeout(2000);

    // for Reject status
    await myTeamLeave.verifyTheEmployeeNamesInTheList(
      constants.REJECTED_STATUS,
      testData.HR.name 
    );
  });

  // Already covered in the HR aprroval flow flow
  test.skip(" A&L_MY_Team_5, A&L_MY_Team_9 Verify 'Leave Approval' popup opens on clicking 'View' and success message appears after submitting with all fields filled @smoke @eti @reg", async ({page }) => {
    const attendanceLeaveTab = new AttendanceLeaveTab(page);
    const applyLeave = new ApplyLeaves(page);
    loginObj = new LoginPage(page);
    await loginObj.validLogin(
      testData.Employee.UserEmail,
      testData.SuperUser.UserPassword
    );
    await attendanceLeaveTab.navigateToAttendanceTab("Apply Leaves");

   await  applyLeave.withdrawExistingLeave();

    // Apply Leave
    await applyLeave.applyLeave("PrivilegeLeave", "For vacation");

    //logging out from super user
    await attendanceLeaveTab.logout();

    // Logging in as Delivery Manager
    await loginObj.validLogin(
      testData["DeliveryManager"].UserEmail,
      testData.SuperUser.UserPassword
    );

    // await myTeamLeave.clickOnCrossIcon();

    await myTeamLeave.applyForApproval(
      constants.APPROVE_ACTION,
      constants.APPROVED_STATUS,
      constants.APPROVE_LEAVE_SUCCESSMESSAGE
    );
  });

  test('Verify the Validation Tooltip on Leave Approval popup @reg @eti', async ({ page }) => {
    const loginObj = new LoginPage(page);
    const attendanceLeaveTab = new AttendanceLeaveTab(page);

    // Step 1: Login
    await loginObj.validLogin(
      testData.SuperUser.UserEmail,
      testData.SuperUser.UserPassword
    );

    // Step 2: Navigate to My Team Leave tab
    await attendanceLeaveTab.navigateToAttendanceTab("My Team Leave");
    await page.waitForLoadState('networkidle');

    // Step 3: Wait for table and click the first "View" link
    await myTeamLeave.viewLink.first().waitFor({ state: 'visible', timeout: 10000 });
    await myTeamLeave.viewLink.first().click();
    await page.waitForLoadState('domcontentloaded');

    // Step 4: Verify tooltip for Leave Action field
    await myTeamLeave.submitButton.waitFor({ state: 'visible', timeout: 5000 });
    await myTeamLeave.submitButton.click();

    await myTeamLeave.leaveActionField.waitFor({ state: 'visible', timeout: 5000 });
    await myTeamLeave.verifyTooltipMessage(
      myTeamLeave.leaveActionField,
      constants.SELECT_ITEM
    );

    // Step 5: Verify tooltip for Reason field
    await myTeamLeave.selectLeaveAction('Reject');

    await myTeamLeave.submitButton.waitFor({ state: 'visible', timeout: 5000 });
    await myTeamLeave.submitButton.click();

    await myTeamLeave.reasonField.waitFor({ state: 'visible', timeout: 5000 });
    await myTeamLeave.verifyTooltipMessage(
      myTeamLeave.reasonField,
      constants.PLEASE_FILL_IN_TOOLTOP
    );

    console.log('✅ Tooltip validations verified successfully.');
  });

});