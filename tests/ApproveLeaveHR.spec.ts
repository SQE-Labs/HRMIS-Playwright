import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { BasePage } from "../pages/Basepage";
import { AttendanceLeaveTab } from "../pages/Attendance&Leaves";
import * as constants from "../utils/constants";
import { MyTeamLeavePage } from "../pages/myTeamLeave";
import { ApplyLeaves } from "../pages/ApplyLeaves";
import { ApproveLeaveHR } from "../pages/ApproveLeaveHR";
import testData from "../testData/testData.json";

let loginObj: LoginPage;
// let approveLeaveHR: ApproveLeaveHR;
let attendanceLeaveTab: AttendanceLeaveTab;
let applyLeave: ApplyLeaves;
let myTeamLeave: MyTeamLeavePage;
let approveLeaveHR: ApproveLeaveHR;

test.describe("Approve Leave HR module ", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    loginObj = new LoginPage(page);
    await loginObj.validLogin(
      testData.SuperUser.UserEmail,
      testData.SuperUser.UserPassword
    );
    // creating object for Approve Leave HR page
    // approveLeaveHR = new ApproveLeaveHR(page);
    attendanceLeaveTab = new AttendanceLeaveTab(page);
    applyLeave = new ApplyLeaves(page);
    myTeamLeave = new MyTeamLeavePage(page);
    approveLeaveHR = new ApproveLeaveHR(page);

    console.log(">> Starting test case : " + testInfo.title);
  });
  // Covered MyTeam Leave Approve flow in this test case.
  test.skip("A&L_MY_Team_5, A&L_MY_Team_9, A&L_Approve(HR)_13 Approve Leave HR @smoke @eti", async ({
    page,
  }) => {
    await attendanceLeaveTab.navigateToAttendanceTab("Apply Leaves");
    await applyLeave.waitForDotsLoaderToDisappear();

    await applyLeave.withdrawExistingLeave();

    // Apply Leave
    await applyLeave.applyLeave("PrivilegeLeave", "Family function");

    //logging out from super user
    await attendanceLeaveTab.logout();

    // Logging in as Delivery Manager
    await loginObj.validLogin(
      testData["DeliveryManager"].UserEmail,
      testData.SuperUser.UserPassword
    );

    // await myTeamLeave.clickOnCrossIcon();
    await myTeamLeave.waitforLoaderToDisappear();

    // Navigate to My Team Leave tab and apply for approval from delivery manager

    await myTeamLeave.applyForApproval(
      constants.APPROVE_ACTION,
      constants.APPROVED_STATUS,
      constants.APPROVE_LEAVE_SUCCESSMESSAGE
    );

    //logging out from Delivery Manager
    await attendanceLeaveTab.logout();

    // Logging in as Super User
    await loginObj.validLogin(
      testData.SuperUser.UserEmail,
      testData.SuperUser.UserPassword
    );

    // Navigate to Approve Leave HR tab
    await attendanceLeaveTab.navigateToAttendanceTab("Approve Leave (HR)");

    // Approve Leave as HR
    await approveLeaveHR.appoveLeaveActionHR(
      constants.APPROVE_ACTION,
      constants.APPROVED_STATUS,
      constants.APPROVE_LEAVE_SUCCESSMESSAGE
    );
  });

  // failed while searching with firstname with last name #known bug
  test("A&L_Approve(HR)_2, Verify that relevant records appear, when user enters partial or full employee name in the Search By Employee Name field, on approve Leave (HR) page. @smoke @bug @eti" , async ({
    page,
  }) => {
    // Navigate to My Team Leave tab
    await attendanceLeaveTab.navigateToAttendanceTab("Approve Leave (HR)");
    await approveLeaveHR.waitforLoaderToDisappear();

    // Verify search box is visible
    expect(await myTeamLeave.isSearchBoxVisible()).toBeTruthy();

    // Verify default value of status dropdown
    await myTeamLeave.verifyDefaultValueOfStatusDropdown();

    // Verify the search box is visible
    expect(await myTeamLeave.isSearchBoxVisible()).toBeTruthy();
    await myTeamLeave.waitforLoaderToDisappear();

    // for Approve status and enter full name
    await myTeamLeave.verifyTheEmployeeNamesInTheList(
      constants.APPROVED_STATUS,
      testData.LEAVE_EMP_NAME3
    );
  });
});
