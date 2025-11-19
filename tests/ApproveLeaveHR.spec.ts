import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { BasePage } from "../pages/Basepage";
import { AttendanceLeaveTab } from "../pages/Attendance&Leaves";
import * as constants from "../utils/constants";
import { MyTeamLeavePage } from "../pages/MyTeamLeave";
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

    // creating object for Approve Leave HR page
    // approveLeaveHR = new ApproveLeaveHR(page);
    attendanceLeaveTab = new AttendanceLeaveTab(page);
    applyLeave = new ApplyLeaves(page);
    myTeamLeave = new MyTeamLeavePage(page);
    approveLeaveHR = new ApproveLeaveHR(page);

    console.log(">> Starting test case : " + testInfo.title);
  });
  // Covered MyTeam Leave Approve flow in this test case.
  test("HRMIS_A&L_31,A&L_37,  A&L_39, A&L_40, A&L_43 Approve Leave HR @smoke @reg @eti", async ({ page, }) => {
    loginObj = new LoginPage(page);
    await loginObj.validLogin(
      testData.Employee.UserEmail,
      testData.SuperUser.UserPassword
    );
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
      testData.DeliveryManager.password
    );
    if(await myTeamLeave.CrossIcon.isVisible()){
    await myTeamLeave.clickOnCrossIcon();
    }
    await myTeamLeave.waitforLoaderToDisappear();

    // Navigate to My Team Leave tab and apply for approval from delivery manager

    await myTeamLeave.applyForApproval(
      constants.APPROVE_ACTION,
      constants.APPROVED_STATUS,
      constants.APPROVE_LEAVE_SUCCESSMESSAGE
    );

    //logging out from Delivery Manager
    await attendanceLeaveTab.logout();

    // Logging in as HR User
    await loginObj.validLogin(
      testData.HR.UserEmail,
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
  test("HRMIS_A&L_32,HRMIS_A&L_33  HRMIS_A&L_34, Verify that relevant records appear, when user enters partial or full employee name in the Search By Employee Name field, on approve Leave (HR) page. @smoke @bug @eti @reg", async ({ page }) => {
    loginObj = new LoginPage(page);
    await loginObj.validLogin(
      testData.SuperUser.UserEmail,
      testData.SuperUser.UserPassword
    );

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

 // Pagination does not appear while 
  test.skip(' HRMIS_A&L_35, HRMIS_A&L_36 Verify Next & Previous pagination', async ({ page }) => {
    loginObj = new LoginPage(page);
    await loginObj.validLogin(
      testData.SuperUser.UserEmail,
      testData.SuperUser.UserPassword
    );

    await page.pause()
    // Navigate to My Team Leave tab
    await attendanceLeaveTab.navigateToAttendanceTab("My Team Leave");
    await approveLeaveHR.waitforLoaderToDisappear();

    await myTeamLeave.statusDropdown.selectOption(constants.APPROVED_STATUS)
    await myTeamLeave.waitForDotsLoaderToDisappear()

    await page.waitForSelector('table tbody tr');

    // Wait for pagination
    await approveLeaveHR.paginationContainer.waitFor({ state: "visible", timeout: 10000 });


    // verify the next page
    // ---------------------- NEXT BUTTON TEST ----------------------
    const pageBeforeNext = await approveLeaveHR.getActivePageNumber();
    await approveLeaveHR.clickNext();
    const pageAfterNext = await approveLeaveHR.getActivePageNumber();

    expect(pageAfterNext).toBeGreaterThan(pageBeforeNext);
    console.log(`Next button works: ${pageBeforeNext} → ${pageAfterNext}`);


    // ---------------------- PREVIOUS BUTTON TEST ----------------------
    const pageBeforePrevious = pageAfterNext;
    await approveLeaveHR.clickPrevious();
    const pageAfterPrevious = await approveLeaveHR.getActivePageNumber();

    expect(pageAfterPrevious).toBeLessThan(pageBeforePrevious);
    console.log(`Previous button works: ${pageBeforePrevious} → ${pageAfterPrevious}`);


});
});
