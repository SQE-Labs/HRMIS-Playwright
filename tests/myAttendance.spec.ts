import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { AttendanceLeaveTab } from "../pages/Attendance&Leaves";
import testData from "../testData/testData.json";
import { myAttendance } from "../pages/MyAttendance";

let myAttend : myAttendance
let attendanceLeaveTab: AttendanceLeaveTab;
let loginObj: LoginPage;

test.describe("My attendance page", () => {
    test.beforeEach(async ({ page }, testInfo) => {
        loginObj = new LoginPage(page);
        await loginObj.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);
        myAttend = new myAttendance(page)
        attendanceLeaveTab = new AttendanceLeaveTab(page);
        console.log(">> Starting test case : " + testInfo.title);
    });

    test('HRMIS_A&L_59, A&L_60, A&L_61, A&L_62, A&L_71, A&L_72, A&L_73  Verify that My Attendance page opens up after clicking on Attendance & Leaves @smoke @eti @reg', async ({ page }) => {
        await attendanceLeaveTab.navigateToAttendanceTab("My Attendance");
        await myAttend.verifyCurrentMonthAndYear();

        // verify the forward button is disabled
        await expect(myAttend.forwardIcon).toHaveClass(/disabled-span/);

        // verify the backward button is enabled
        await expect(myAttend.backwardIcon).toBeEnabled();

        // ---- Navigate to Previous Month ---- //
        await myAttend.backwardIcon.waitFor({ state: "visible" });
        await myAttend.backwardIcon.click();
        await page.waitForLoadState("networkidle");

        // click on cell safely
        await myAttend.cell.first().waitFor({ state: "visible" });
        await myAttend.cell.first().click();

        // close popup
        await myAttend.closeBtn.waitFor({ state: "visible" });
        await myAttend.closeBtn.click();

        // ---- Navigate Forward ---- //
        await myAttend.forwardIcon.waitFor({ state: "visible" });
        await myAttend.forwardIcon.click();
        await page.waitForLoadState("networkidle");

        // click on cell again safely
        await myAttend.cell.first().waitFor({ state: "visible" });
        await myAttend.cell.first().click();
        await myAttend.crossIcon.waitFor({ state: "visible" });
        await myAttend.crossIcon.click();
    });
});

