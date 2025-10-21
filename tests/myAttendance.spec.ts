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

    test('A&L_My_Attndnc_1, Verify that My Attendance page opens up after clicking on Attendance & Leaves @smoke @eti', async ({ page }) => {
        await attendanceLeaveTab.navigateToAttendanceTab("My Attendance");
        await myAttend.verifyCurrentMonthAndYear();
    });
});

