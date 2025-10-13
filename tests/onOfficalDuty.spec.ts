import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import testData from "../testData/testData.json";
import { AttendanceLeaveTab } from "../pages/Attendance&Leaves";
import * as constants from "../utils/constants";
import { onOfficalDuty } from "../pages/onOfficalDuty";
import { off } from "process";

let loginObj: LoginPage;
let attendanceLeaveTab: AttendanceLeaveTab;
let officalDuty: onOfficalDuty;

test.describe("On Offical Duty Page", () => {

    test.beforeEach(async ({ page }, testInfo) => {

        // object creation
        officalDuty = new onOfficalDuty(page);
        attendanceLeaveTab = new AttendanceLeaveTab(page);
        console.log(">> Starting test case : " + testInfo.title);
    });



    test('A&L_On_offc_duty_1, A&L_On_offc_duty_3, A&L_On_offc_duty_10 Verify that On Official Duty page and success messages after applying and withdraw the leaves, @eti @smoke', async ({ page }) => {

        // Login As Employee
        loginObj = new LoginPage(page);
        await loginObj.validLogin(testData.Employee.UserEmail, testData.SuperUser.UserPassword);
        await page.waitForLoadState();
        await attendanceLeaveTab.navigateToAttendanceTab("On Official Duty");

        await page.waitForLoadState()

        // verify subtabs appear
        await expect(officalDuty.onOfficalDutyTab).toBeVisible();
        await expect(officalDuty.applyOfficalDutyTab).toBeVisible();

        // Clicking on Apply On Offical Duty tab
        await officalDuty.applyOfficalDutyTab.click()
        await page.waitForLoadState()

        // Select Date
        await officalDuty.selectDate('25-10-2025')

        // Select Delivery Lead
        await officalDuty.selectDeliveryLead('Piyush Dogra')

        // Entering task
        await officalDuty.enterTask("Worked On Weekend")

        // Select horus
        await officalDuty.enterHoursAndMins(8, 30)

        // Clicking on submit
        await officalDuty.submitBtn.click();
        await page.waitForLoadState()


        // verifying the success message
        const message = await officalDuty.toastMessage();

        console.log("Success  message: " + message);
        expect(message).toContain(constants.OFFICAL_DUTY_APPLY_TOAST);

        // wait until toast disappears
        await page.waitForSelector('.toast-message', { state: 'hidden', timeout: 5000 })

        // clicking on on offical duty 
        await officalDuty.onOfficalDutyTab.click();
        await page.waitForLoadState()

        // Clicking on view link
        await officalDuty.viewBtn.first().click()

        // Entering reason
        await officalDuty.reasonField.fill('Wrong leave applied')

        await officalDuty.withdrawBtn.click();


        // verifying the success message
        const message2 = await officalDuty.toastMessage();

        console.log("Success  message: " + message2);
        expect(message2).toContain(constants.WITHDRAW_LEAVE_SUCCESSMESSAGE);




    })
});
