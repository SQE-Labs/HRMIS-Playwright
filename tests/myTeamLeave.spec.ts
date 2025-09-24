import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import testData from "../testData/testData.json";
import { AttendanceLeaveTab } from "../pages/Attendance&Leaves";
import * as constants from "../utils/constants";
import { MyTeamLeavePage } from "../pages/myTeamLeave";
import { ApplyLeaves } from "../pages/ApplyLeaves";

let myTeamLeave: MyTeamLeavePage;
let loginObj: LoginPage;

test.describe("My Team Leave Page", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    loginObj = new LoginPage(page);
    await loginObj.validLogin(
      testData.SuperUser.UserEmail,
      testData.SuperUser.UserPassword
    );

    myTeamLeave = new MyTeamLeavePage(page);
    console.log(">> Starting test case : " + testInfo.title);
  });

  test("HRMIS_23, HRMIS_24 Validate My Team Leave Page UI Elements and Filter the records @smoke ", async ({
    page,
  }) => {
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
      testData.LEAVE_EMP_NAME
    );
    await myTeamLeave.waitforLoaderToDisappear();
    await page.waitForTimeout(2000);

    // for Reject status
    await myTeamLeave.verifyTheEmployeeNamesInTheList(
      constants.REJECTED_STATUS,
      testData.LEAVE_EMP_NAME
    );
  });

  test(" HRMIS_4, HRMIS_8 HRMIS_3 Verify 'Leave Approval' popup opens on clicking 'View' and success message appears after submitting with all fields filled @smoke @eti", async ({page }) => {
    const attendanceLeaveTab = new AttendanceLeaveTab(page);
    const applyLeave = new ApplyLeaves(page);
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
});
