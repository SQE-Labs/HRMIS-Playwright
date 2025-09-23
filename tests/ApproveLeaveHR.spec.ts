import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import testData from "../testData/testData.json";
import { AttendanceLeaveTab } from "../pages/Attendance&Leaves";
import * as constants from "../utils/constants";
import { MyTeamLeavePage } from "../pages/myTeamLeave";
import { ApplyLeaves } from "../pages/ApplyLeaves";
import { ApproveLeaveHR } from "../pages/ApproveLeaveHR";

let loginObj: LoginPage;
// let approveLeaveHR: ApproveLeaveHR;
let attendanceLeaveTab: AttendanceLeaveTab;
let applyLeave: ApplyLeaves;
let myTeamLeave: MyTeamLeavePage;

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


    console.log(">> Starting test case : " + testInfo.title);
  });

  test("HRMIS_32, HRMIS_44 Approve Leave HR @smoke @eti", async ({ page }) => {
    await attendanceLeaveTab.navigateToAttendanceTab('Apply Leaves');
    await applyLeave.withdrawExistingLeave();

    // Apply Leave
    await applyLeave.applyLeave(
      "PrivilegeLeave",
      "Family function"
    );

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

    await myTeamLeave.waitforLoaderToDisappear();

    //logging out from Delivery Manager
    await attendanceLeaveTab.logout();

    // Logging in as Super User
    loginObj = new LoginPage(page);
    await loginObj.validLogin(
      testData.SuperUser.UserEmail,
      testData.SuperUser.UserPassword
    );

    // Navigate to Approve Leave HR tab
    await attendanceLeaveTab.navigateToAttendanceTab('Approve Leave (HR)');

// Clicking on view button of the leave to final approve from HR
    // await approveLeaveHR.clickOnViewButton();

    

  });
});













