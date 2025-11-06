import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import testData from "../testData/testData.json";
import { AttendanceLeaveTab } from "../pages/Attendance&Leaves";
import * as constants from "../utils/constants";
import { OnOfficalDuty } from "../pages/OnOfficalDuty";
import { holiday_Management } from "../pages/Holiday_ManagementA&L";
import { off } from "process";


let loginObj: LoginPage;
let attendanceLeaveTab: AttendanceLeaveTab;
let officalDuty: OnOfficalDuty;
let holidayManagement: holiday_Management

test.describe("On Offical Duty Page", () => {



    test.beforeEach(async ({ page }, testInfo) => {



        // object creation
        officalDuty = new OnOfficalDuty(page);
        attendanceLeaveTab = new AttendanceLeaveTab(page);
        holidayManagement = new holiday_Management(page);

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
        await officalDuty.selectDeliveryLead(testData.DeliveryManager.name)

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


    test('End to End Flow Apply Offical Leave to Approve From DL and HR, @eti @smoke', async ({ page }) => {

        // Login As Super Admin
        loginObj = new LoginPage(page);
        await loginObj.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);
        await page.waitForLoadState('networkidle');

        // Navigate to Holiday Management
        await attendanceLeaveTab.navigateToAttendanceTab("Holiday Management");
        await page.waitForLoadState('networkidle');

        // Delete the holiday if it already exists
        const holidayName = "Comp_Off Leave";
        await holidayManagement.deleteAllCompOffHolidays(holidayName);

        // Confirm deletion by verifying the row no longer exists
        const deletedRows = page.locator(`tr:has-text("${holidayName}")`);
        await expect(deletedRows).toHaveCount(0, { timeout: 15000 });

        // Wait until no network requests or spinners remain (UI stability)
        await page.waitForLoadState('networkidle');

        // Refresh page to ensure table is clean before next action
        await page.reload({ waitUntil: 'networkidle' });

        // selecting the holiday name and date  
        const addedHolidayDate = await holidayManagement.addHolidayWithRandomDate();
        console.log("Holiday added on:", addedHolidayDate);

        // logout as super admin
        await officalDuty.logout();

        // Login As Employee
        await loginObj.validLogin(testData.Employee.UserEmail, testData.SuperUser.UserPassword);
        await page.waitForLoadState();
        await attendanceLeaveTab.navigateToAttendanceTab("Apply Leaves");
        await officalDuty.waitforLoaderToDisappear()

        // Wait for element to be visible
        await officalDuty.privilegeLeaveOption.waitFor({ state: 'visible', timeout: 5000 });

        // Get the text
        const oldPrivilegeText = await officalDuty.privilegeLeaveOption.textContent();

        // Extract the number (e.g., 13)
        const oldPrivilegeCount = Number(oldPrivilegeText?.match(/\d+/)?.[0]);
        console.log("Old Privilege Leave Count:", oldPrivilegeCount);

        // Navigate to on offical duty page
        await attendanceLeaveTab.attendanceLeave.click();
        await attendanceLeaveTab.navigateToAttendanceTab("On Official Duty");
        await page.waitForLoadState()

        // verify subtabs appear
        await expect(officalDuty.onOfficalDutyTab).toBeVisible();
        await expect(officalDuty.applyOfficalDutyTab).toBeVisible();

        await officalDuty.applyOfficalDutyLeave(addedHolidayDate, testData.DeliveryManager.name, 'Worked On Weekend', 10, 35)

        // Logout
        await officalDuty.logout();

        // Login as Delivery Lead
        await loginObj.validLogin(testData.DeliveryManager.UserEmail, testData.DeliveryManager.password);
        await page.waitForLoadState();
        await attendanceLeaveTab.navigateToAttendanceTab("On Official Duty (DL)");
        await officalDuty.waitForDotsLoaderToDisappear()

        // Clicking on View Link
        await officalDuty.dlViewLink.click();

        // select Action from Drop down and enter comment
        await officalDuty.selectLeaveStatus(constants.APPROVED_STATUS)
        await officalDuty.commentField.fill(constants.APPROVED_STATUS)

        // Clicking on submit button
        await officalDuty.submitBtn.click();

        // verifying the success message
        const message = await officalDuty.toastMessage();

        console.log("Success  message: " + message);
        expect(message).toContain(constants.OFFICAL_DUTY_SUCCESS_TOAST);

        // logout from DL
        await officalDuty.logout();

        // Login As HR to Approve the request
        await loginObj.validLogin(testData.HR.UserEmail, testData.SuperUser.UserPassword);
        await page.waitForLoadState();
        await attendanceLeaveTab.navigateToAttendanceTab("On Official Duty (HR)");
        await officalDuty.waitForDotsLoaderToDisappear()

        // Clicking on View Link
        await officalDuty.dlViewLink.click();

        // select Action from Drop down and enter comment and PL
        await officalDuty.selectLeaveStatus(constants.APPROVED_STATUS)
        await officalDuty.selectPL(1)
        await officalDuty.commentField.fill(constants.APPROVED_STATUS)

        // click on submit button
        await officalDuty.submitBtn.click();

        // verifying the success message
        const message3 = await officalDuty.toastMessage();

        console.log("Success  message: " + message3);
        expect(message3).toContain(constants.OFFICAL_DUTY_SUCCESS_TOAST);

        // logout from HR
        await officalDuty.logout()

        // Login As Employee
        loginObj = new LoginPage(page);
        await loginObj.validLogin(testData.Employee.UserEmail, testData.SuperUser.UserPassword);
        await page.waitForLoadState();
        await attendanceLeaveTab.navigateToAttendanceTab("Apply Leaves");
        await officalDuty.waitforLoaderToDisappear()

        // Wait for element to be visible
        await officalDuty.privilegeLeaveOption.waitFor({ state: 'visible', timeout: 5000 });

        // Get the text
        const newPrivilegeText = await officalDuty.privilegeLeaveOption.textContent();

        // Extract the number 
        const newPrivilegeCount = Number(newPrivilegeText?.match(/\d+/)?.[0]);
        console.log("New Privilege Leave Count:", newPrivilegeCount);

        //assertion
        await expect(newPrivilegeCount).toBeGreaterThan(oldPrivilegeCount)

        // logout from employee
        await officalDuty.logout();

        // login as super admin
        await loginObj.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);
        await page.waitForLoadState();
        // navigates to holiday management sub tab
        await attendanceLeaveTab.navigateToAttendanceTab("Holiday Management");
        await page.waitForLoadState();

        // select Approve status from dropdown to delete the holiday
        await holidayManagement.statusDropdown.selectOption(constants.ApproveStatus)
        await page.waitForLoadState();

        // delete the holiday added

        // --- VERIFY ROLE AND DELETE USING RELATIVE LOCATOR ---
        const deleteRoleRow = page.locator(`tr:has-text("${addedHolidayDate}")`);

        // Wait for the row to appear
        await expect(deleteRoleRow).toBeVisible({ timeout: 8000 });

        // Wait for Delete button inside this row
        const deleteButton = deleteRoleRow.getByText('Delete');
        await expect(deleteButton).toBeVisible({ timeout: 5000 });

        // Click Delete
        await deleteButton.click();
        await holidayManagement.yesBtn.click();
        await holidayManagement.waitForSpinnerLoaderToDisappear();


    });

    // Failed due to assertion failed inconsistent appears for the reject toast
    test('End to End flow of Apply Offical Leave to Reject @smoke @eti @knownBug', async ({ page }) => {

        //Login As Super Admin
        loginObj = new LoginPage(page);
        await loginObj.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);
        await page.waitForLoadState();

        // navigates to holiday management sub tab
        await attendanceLeaveTab.navigateToAttendanceTab("Holiday Management");
        await page.waitForLoadState();
        // selecting the holiday name and date  
        const addedHolidayDate = await holidayManagement.addHolidayWithRandomDate();
        console.log("Holiday added on:", addedHolidayDate);

        // logout as super admin
        await officalDuty.logout();

        // Login as Employee
        await loginObj.validLogin(testData.Employee.UserEmail, testData.SuperUser.UserPassword);
        await page.waitForLoadState();

        // Navigate to on offical duty page
        // await attendanceLeaveTab.attendanceLeave.click();
        await attendanceLeaveTab.navigateToAttendanceTab("On Official Duty");
        await page.waitForLoadState()

        // verify subtabs appear
        await expect(officalDuty.onOfficalDutyTab).toBeVisible();
        await expect(officalDuty.applyOfficalDutyTab).toBeVisible();

        await officalDuty.applyOfficalDutyLeave(addedHolidayDate, testData.DeliveryManager.name, 'Worked On Weekend', 10, 35)

        // Logout
        await officalDuty.logout();

        // Login as Delivery Lead
        await loginObj.validLogin(testData.DeliveryManager.UserEmail, testData.SuperUser.UserPassword);
        await page.waitForLoadState();
        await attendanceLeaveTab.navigateToAttendanceTab("On Official Duty (DL)");
        await officalDuty.waitForDotsLoaderToDisappear()

        // Clicking on View Link
        await officalDuty.dlViewLink.click();

        // select Action from Drop down and enter comment
        await officalDuty.selectLeaveStatus(constants.REJECTED_STATUS)
        await officalDuty.commentField.fill(constants.REJECT_ACTION)

        // Clicking on submit button
        await officalDuty.submitBtn.click();

        // verifying the success message
        const message = await officalDuty.toastMessage();

        console.log("Success  message: " + message);
        expect(message).toContain(constants.OFFICAL_DUTY_REJECT_TOAST);

        // logout from DL
        await officalDuty.logout();

        // Login As HR to Approve the request
        await loginObj.validLogin(testData.HR.UserEmail, testData.SuperUser.UserPassword);
        await page.waitForLoadState();
        await attendanceLeaveTab.navigateToAttendanceTab("On Official Duty (HR)");
        await officalDuty.waitForDotsLoaderToDisappear()

        // Clicking on View Link
        await officalDuty.dlViewLink.click();

        // select Action from Drop down and enter comment and PL
        await officalDuty.selectLeaveStatus(constants.REJECTED_STATUS)
        await officalDuty.commentField.fill(constants.REJECT_ACTION)

        // click on submit button
        await officalDuty.submitBtn.click();

        // verifying the success message
        const message3 = await officalDuty.toastMessage();

        console.log("Success  message: " + message3);
        expect(message3).toContain(constants.OFFICAL_DUTY_REJECT_TOAST);

        // logout from HR
        await officalDuty.logout()
    })

    test('Verify the validation tooltip on the offical duty page @reg, @eti', async ({page})=>{
        // Login As Employee
        loginObj = new LoginPage(page);
        await loginObj.validLogin(testData.Employee.UserEmail, testData.SuperUser.UserPassword);
        await page.waitForLoadState();
        await attendanceLeaveTab.navigateToAttendanceTab("On Official Duty");

        await page.waitForLoadState()

        // Clicking on Apply On Offical Duty tab
        await officalDuty.applyOfficalDutyTab.click()
        await page.waitForLoadState()

        // Verify the validation tooltip for the 'Date' field 
        await officalDuty.submitBtn.click();
        await officalDuty.verifyTooltipMessage(officalDuty.dateField,constants.PLEASE_FILL_IN_TOOLTOP)

        // Verify the tooltip for the select delivery manager field 
        await officalDuty.selectDate('25-10-2025')
        await officalDuty.submitBtn.click();
        await officalDuty.verifyTooltipMessage(officalDuty.deliveryLead, constants.SELECT_ITEM)

        // verify the tooltip for the task field 
        // Select Delivery Lead
        await officalDuty.selectDeliveryLead(testData.DeliveryManager.name)
        await officalDuty.submitBtn.click();
        await officalDuty.verifyTooltipMessage(officalDuty.taskField, constants.PLEASE_FILL_IN_TOOLTOP)

        // verify the tooltip for the hours field
        await officalDuty.enterTask("Worked On Weekend")
        await officalDuty.submitBtn.click();
        await officalDuty.verifyTooltipMessage(officalDuty.hours, constants.PLEASE_FILL_IN_TOOLTOP)

    })

    test('Verify the hours and mins gets reset after clicking on the reset icon', async ({page})=>{
        // Login As Employee
        loginObj = new LoginPage(page);
        await loginObj.validLogin(testData.Employee.UserEmail, testData.SuperUser.UserPassword);
        await page.waitForLoadState();
        await attendanceLeaveTab.navigateToAttendanceTab("On Official Duty");

        await page.waitForLoadState()

        // Clicking on Apply On Offical Duty tab
        await officalDuty.applyOfficalDutyTab.click()
        await page.waitForLoadState()

        // Entering task
        await officalDuty.enterTask("Worked On Weekend")

        // Select horus
        await officalDuty.enterHoursAndMins(8, 30)
        
        // clicking on reset button
        await officalDuty.resetTimeButton.click()

        // verifying the field after reset it
        await expect(officalDuty.taskField).toBe('');
        await expect(officalDuty.hours).toBe('');
        await expect(officalDuty.mins).toBe('');
    })
});


