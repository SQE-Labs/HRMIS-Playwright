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

  test("HRMIS_23, HRMIS_24 Validate My Team Leave Page UI Elements and Filter the records @smoke @eti", async ({
    page,
  }) => {
    const attendanceLeaveTab = new AttendanceLeaveTab(page); 
    await attendanceLeaveTab.navigateToAttendanceTab("My Team Leave");

    // verify the default status of dropdown
    await myTeamLeave.verifyDefaultValueOfStatusDropdown();

    // verify the default select by emplyoee name field
    expect(await myTeamLeave.isSearchBoxVisible()).toBeTruthy();
    await myTeamLeave.waitforLoaderToDisappear();

    // Select any leave status

    await myTeamLeave.selectLeaveStatus(constants.APPROVED_STATUS);
    await myTeamLeave.waitforLoaderToDisappear();

    // verify the leave status dropdown value
    await myTeamLeave.selectLeaveStatus(constants.APPROVED_STATUS);

    const selectedValue = await myTeamLeave.statusDropdown.inputValue();
    expect(selectedValue).toBe(constants.APPROVED_STATUS);
    await myTeamLeave.waitForDotsLoaderToDisappear
    await myTeamLeave.waitforLoaderToDisappear();

    // Entering partial value in the search employee name field
    await myTeamLeave.searchEmployee(testData.LEAVE_EMP_NAME);
    await myTeamLeave.waitforLoaderToDisappear();

    // Wait for search results to appear
    await myTeamLeave.employeeRows.first().waitFor({ state: "visible" });

    // Now get all employee names
    const employees = await myTeamLeave.getEmployeeNames();
    console.log("Search results:", employees);

    // Verify that each employee name contains the search term (case-insensitive)
    for (let name of employees) {
      if (name) {
        expect(name.trim().toLowerCase()).toContain(
          testData.LEAVE_EMP_NAME.toLowerCase()
        );
      }
    }
  });

  test(" HRMIS_4, HRMIS_8 HRMIS_3 Verify 'Leave Approval' popup opens on clicking 'View' and success message appears after submitting with all fields filled. @smoke @eti", async ({
    page,
  }) => {
    const attendanceLeaveTab = new AttendanceLeaveTab(page);
    const applyLeave = new ApplyLeaves(page);
    await attendanceLeaveTab.navigateToAttendanceTab("Apply Leaves");

    // Apply Leave
    await applyLeave.applyLeave("PrivilegeLeave", "For vacation");

    //logging out from super user
    await attendanceLeaveTab.logout();

    // Logging in as Delivery Manager
    await loginObj.validLogin(
      testData["DeliveryManager"].UserEmail,
      testData.SuperUser.UserPassword
    );

    await myTeamLeave.clickOnCrossIcon();

    await myTeamLeave.applyForApproval(
      constants.APPROVE_ACTION,
      constants.APPROVED_STATUS,
      constants.APPROVE_LEAVE_SUCCESSMESSAGE
    );
  });
});
