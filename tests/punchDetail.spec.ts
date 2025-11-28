import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { BasePage } from "../pages/Basepage";
import testData from "../testData/testData.json";
import { AttendanceLeaveTab } from "../pages/Attendance&Leaves";
import { PunchDetails } from "../pages/punchdetails";
import * as constants from "../utils/constants";
import { setTimeout } from "node:timers/promises";

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

  test(" HRMIS_A&L_44, A&L_45, A&L_46, A&L_47, A&L_48, A&L_49, A&L_50, A&L_51, A&L_52,A&L_53, Verify Punch Details page @smoke @eti @reg", async ({page,}) => {
    await attendanceLeaveTab.navigateToAttendanceTab("Punch Details");
    await punchDetail.verifyPunchDetailsPage();
    // Select Employee from dropdown
    await punchDetail.selectEmployee(testData.HR.name);
    await page.waitForLoadState()

    // verify the forward button is disabled
    await expect(punchDetail.forwardIcon).toHaveClass(/disabled-span/);

    // verify the backward button is enabled
    await expect(punchDetail.backwardIcon).toBeEnabled();

    // ---- Navigate to Previous Month ---- //
    await punchDetail.backwardIcon.waitFor({ state: "visible" });
    await punchDetail.backwardIcon.click();

    await page.waitForLoadState("networkidle");

    // click on cell safely
    await punchDetail.cell.first().waitFor({ state: "visible" });
    await punchDetail.cell.first().click();

    await expect(punchDetail.popupTitle.first()).toBeVisible();

    // close popup
    await punchDetail.closeBtn.waitFor({ state: "visible" });
    await punchDetail.closeBtn.click();


    // ---- Navigate Forward ---- //
    await punchDetail.forwardIcon.waitFor({ state: "visible" });
    await punchDetail.forwardIcon.click();

    await page.waitForLoadState("networkidle");

    // click on cell again safely
    await punchDetail.cell.first().waitFor({ state: "visible" });
    await punchDetail.cell.first().click();


    await expect(punchDetail.popupTitle).toBeVisible();

    // close popup (cross icon)
    await punchDetail.crossIcon.waitFor({ state: "visible" });
    await punchDetail.crossIcon.click();


    // ---- Weekend Off Cell Validation ---- //
    await punchDetail.weekendOffCell.first().click().catch(() => { });

    // Also ensure popup does NOT open
    await expect(punchDetail.popupTitle).not.toBeVisible();
  });
});
