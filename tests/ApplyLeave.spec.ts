import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { BasePage } from "../pages/Basepage";
import testData from "../testData/testData.json";
import { ApplyLeaves } from "../pages/ApplyLeaves";
import { AttendanceLeaveTab } from "../pages/Attendance&Leaves";
import * as constants from "../utils/constants";
import { MyTeamLeavePage } from "../pages/myTeamLeave";

let applyLeave: ApplyLeaves;
let attendanceLeaveTab: AttendanceLeaveTab;
let myTeamLeave: MyTeamLeavePage;

test.describe("Apply leaves page", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    applyLeave = new ApplyLeaves(page);
    attendanceLeaveTab = new AttendanceLeaveTab(page);

    console.log(">> Starting test case : " + testInfo.title);
  });

  test("A&L_2, A&L_3, A&L_11, A&L_16, A&L_17, A&L_21, ApplyLeave and Withdraw Leave - End to End flow @smoke @eti", async ({
    page,
  }) => {
    const loginObj = new LoginPage(page);
    await loginObj.validLogin(
      testData.SuperUser.UserEmail,
      testData.SuperUser.UserPassword
    );
    await attendanceLeaveTab.navigateToAttendanceTab("Apply Leaves");
    await applyLeave.waitForDotsLoaderToDisappear();

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

  test("A&L_12, A&L_13, A&L_15, Verify that user is able to apply leave with 0 privilege balance @smoke @eti", async ({
    page,
  }) => {
    const loginObj = new LoginPage(page);
    myTeamLeave = new MyTeamLeavePage(page);

    await loginObj.validLogin(
      testData["DeliveryManager"].UserEmail,
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
});
