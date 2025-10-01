import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { BasePage } from "../pages/Basepage";
import testData from "../testData/testData.json";
import { AttendanceLeaveTab } from "../pages/Attendance&Leaves";
import { PunchDetails } from "../pages/punchdetails";
import * as constants from "../utils/constants";

let punchDetail: PunchDetails;
let attendanceLeaveTab: AttendanceLeaveTab;

test.describe("Apply leaves page", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    const loginObj = new LoginPage(page);
    await loginObj.validLogin(
      testData.SuperUser.UserEmail,
      testData.SuperUser.UserPassword
    );
    punchDetail = new PunchDetails(page);

    attendanceLeaveTab = new AttendanceLeaveTab(page);

    console.log(">> Starting test case : " + testInfo.title);
  });

  test(" A&L_Punch_1, Verify Punch Details page @smoke @eti", async ({page,}) => {
    await attendanceLeaveTab.navigateToAttendanceTab("Punch Details");
    await punchDetail.verifyPunchDetailsPage();
    // Select Employee from dropdown
    await punchDetail.selectEmployee(testData.LEAVE_EMP_NAME3);
  });
});
