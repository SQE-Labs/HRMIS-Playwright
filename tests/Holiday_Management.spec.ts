import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import testData from "../testData/testData.json";
import { AttendanceLeaveTab } from "../pages/Attendance&Leaves";
import { holiday_Management } from "../pages/Holiday_ManagementA&L";
import * as constants from "../utils/constants";
import { time } from "console";
import { TIMEOUT } from "dns";

let loginObj: LoginPage;
let holidayManagement: holiday_Management
let attendanceLeaveTab: AttendanceLeaveTab


test.describe("Holiday Management page new", () => {
    test.beforeEach(async ({ page }, testInfo) => {
        loginObj = new LoginPage(page);
        attendanceLeaveTab = new AttendanceLeaveTab(page);
        await loginObj.validLogin(
            testData.SuperUser.UserEmail,
            testData.SuperUser.UserPassword
        );

        holidayManagement = new holiday_Management(page);
        console.log(">> Starting test case : " + testInfo.title);
    });

    test('A&L_hldy_mngmnt_1, A&L_hldy_mngmnt_4, Verify that Holiday Management UI elements and Updating the existing holiday @smoke @eti', async ({ page }) => {
        await attendanceLeaveTab.navigateToAttendanceTab("Holiday Management");
        await page.waitForLoadState();
        // Verify heading
        await expect(holidayManagement.heading).toBeVisible();

        // Verify Search field
        await expect(holidayManagement.searchField).toBeVisible();

        // Verify Status dropdown (default Pending)
        await expect(holidayManagement.statusDropdown).toBeVisible();
        await expect(holidayManagement.statusDropdown).toHaveValue('Pending');

        // Verify Year dropdown (default = current year)
        const currentYear = new Date().getFullYear().toString();
        await expect(holidayManagement.yearDropdown).toBeVisible();
        await expect(holidayManagement.yearDropdown).toHaveValue(currentYear);

        // Verify +Add Holiday button
        await expect(holidayManagement.addHolidayButton).toBeVisible();

        // Verify Holiday table
        await expect(holidayManagement.holidayTable).toBeVisible();

        // Updating the holiday
        await holidayManagement.updateHoliday('Thanks Giving Day')

        // verify toast message
        const message = await holidayManagement.toastMessage();
        console.log("Success  message: " + message);
        expect(message).toContain(constants.APPROVE_LEAVE_SUCCESSMESSAGE);
    });


    test('A&L_hldy_mngmnt_10, A&L_hldy_mngmnt_13, Verify the success message after adding and deleting the holidays @smoke @eti', async ({ page }) => {
        const holidayName = 'Diwali';
        const warringMessage = 'Holiday for similar date is already existed';

        // Navigate to Holiday Management
        await attendanceLeaveTab.navigateToAttendanceTab("Holiday Management");
        await page.waitForLoadState();

        await holidayManagement.addHoliday(holidayName, '20-10-2025');

        const toastMessage = await page.waitForSelector('.Toastify__toast-body', { state: 'visible', timeout: 5000 });
        const toastText = await toastMessage.textContent();
        if (toastText?.includes(warringMessage)) {
            console.log("Holiday already exists. Deleting the existing holiday.");
            await page.waitForSelector('.toast-message', { state: 'hidden', timeout: 7000 });
            await holidayManagement.cancelBtn.click();

            const allHolidays = await holidayManagement.holidayRow.all();
            for (const cell of allHolidays) {
                const cellText = (await cell.innerText()).trim();
                if (cellText.toLowerCase() === holidayName.toLowerCase()) {
                    const row = cell.locator('xpath=ancestor::tr');
                    const deleteBtn = row.locator("a:has-text('Delete'), .delete-link");
                    await deleteBtn.scrollIntoViewIfNeeded();
                    await deleteBtn.click();
                    await holidayManagement.yesBtn.click();

                    await page.waitForSelector('Holiday removed successfully', {
                        state: 'hidden',
                        timeout: 8000
                    });

                    break;
                }
            }
            await page.reload();
            await page.waitForLoadState();

            // Re-add after deleting duplicates
            await holidayManagement.addHoliday(holidayName, '20-10-2025');
        }

        // verifying the success message
        const message = await holidayManagement.toastMessage();
        console.log("Success  message: " + message);

        expect(message).toContain(constants.HOLIDAY_ADDED_TOAST);
        await page.waitForSelector(`.Toastify__toast-body:has-text("${constants.HOLIDAY_ADDED_TOAST}")`, { state: 'hidden', timeout: 7000 });

        // Deleting the holiday_________

        // Clicking on delete link dynamically based on holiday name
        const deleteLinkLocator = page.locator(`//td[contains(text(),'${holidayName}')]/following-sibling::td[4]/div/a[2]`);

        // Wait until delete link is visible
        await deleteLinkLocator.waitFor({ state: 'visible', timeout: 5000 });

        // Scroll to the delete link
        await deleteLinkLocator.scrollIntoViewIfNeeded();

        // Click the delete link
        await deleteLinkLocator.click();

        // Wait for confirmation popup and confirm
        await expect(holidayManagement.popupHeading).toBeVisible();
        await holidayManagement.yesBtn.click();

        // Wait for toast message and validate it
        const message2 = await holidayManagement.toastMessage2();
        console.log("Success message after delete:", message2);
        expect(message2).toContain(constants.HOLIDAY_REMOVE_TOAST);

    });

test('Verifying the validation tooltip for the Add Holiday page @reg, @eti', async ({page})=>{
    // Navigate to Holiday Management
    await attendanceLeaveTab.navigateToAttendanceTab("Holiday Management");
    await page.waitForLoadState();

    // clicking on Add Holiday Button
    await holidayManagement.addHolidayButton.click();
    await holidayManagement.submitBtn.click()
    await holidayManagement.verifyTooltipMessage(holidayManagement.holidayField, constants.PLEASE_FILL_IN_TOOLTOP)

    // Verifying the tooltip message for the Date field
    await holidayManagement.holidayField.fill("New year party");
    await holidayManagement.submitBtn.click() 
    await holidayManagement.verifyTooltipMessage(holidayManagement.dateField, constants.PLEASE_FILL_IN_TOOLTOP)

    await await holidayManagement.selectDate('31-12-2031')
    await holidayManagement.submitBtn.click()
    await holidayManagement.verifyTooltipMessage(holidayManagement.dateField, constants.DATE_VALUE_CHECK)
});




    // Combining Holiday List module in this class
    test('A&L_hldy_list_1, A&L_hldy_list_2, Verify Holiday List page opens and shows results for selected year @smoke @eti', async ({ page }) => {

        // navigates to Holiday list subtab
        await attendanceLeaveTab.navigateToAttendanceTab("Holiday List");
        await page.waitForLoadState();
        await holidayManagement.filterHolidayListByYear('2024', 3, 4)
    });

    // Combining Out of Office Module in this class
    test('A&L_Out_of_offc_1, Verify that Out Of Office page @smoke @eti', async ({ page }) => {
        // Navigate to Out of Office sub tab
        await attendanceLeaveTab.navigateToAttendanceTab("Out Of Office");
        await page.waitForLoadState('networkidle');

        // Click on date field
        await holidayManagement.dateFilterO.click();

        // Select date
        await holidayManagement.selectSingleDate('11-05-2025');
        await page.waitForLoadState('domcontentloaded');

        // Wait until at least one row appears
        const firstRow = holidayManagement.rowCount.first();
        await page.waitForSelector('thead + tbody > tr:visible')
        await firstRow.waitFor({ state: 'visible', timeout: 15000 });

        // Get selected date value from input
        const selectedDate = await holidayManagement.dateFilterO.inputValue();
        console.log("Selected date:", selectedDate);
        await page.waitForLoadState()
        await page.waitForSelector('thead + tbody > tr:visible', { timeout: 10000 });

        // Get total visible rows
        let listCount = await holidayManagement.rowCount.count();
        console.log("Initial visible rows count:", listCount);

        // Scroll the last row into view only if needed (safe check)
        if (listCount > 0) {
            const lastRow = holidayManagement.rowCount.nth(listCount - 1);

            // Wait until it's attached & visible
            await lastRow.waitFor({ state: 'attached', timeout: 5000 });
            await expect(lastRow).toBeVisible({ timeout: 10000 });

            // Check if the last row is already visible in viewport
            const isRowVisible = await lastRow.isVisible();

            // Only scroll if not visible to avoid DOM detachment errors
            if (!isRowVisible) {
                try {
                    await lastRow.scrollIntoViewIfNeeded();
                } catch (error) {
                    console.warn("⚠️ Last row might have re-rendered, retrying...");
                    const refreshedLastRow = holidayManagement.rowCount.last();
                    await refreshedLastRow.waitFor({ state: 'attached', timeout: 5000 });
                    await refreshedLastRow.scrollIntoViewIfNeeded();
                }
            }

            // Recount rows after scroll
            listCount = await holidayManagement.rowCount.count();
            console.log("Final visible rows count after scroll:", listCount);

            // Ensure leave count is visible
            await expect(holidayManagement.leaveCount.first()).toBeVisible({ timeout: 10000 });

            // Get leave count text and convert to number
            const leaveCountText = await holidayManagement.leaveCount.first().textContent();
            const totalLeaveCount = Number(leaveCountText?.trim());
            console.log("Leave count value:", totalLeaveCount);

            // Compare actual number of rows with leave count
            expect(listCount).toBe(totalLeaveCount);

            // Column indices for date range
            const fromColumnIndex = 4;
            const toColumnIndex = 5;

            // Verify selected date is present in the date range
            await holidayManagement.verifyDateInFromTo(selectedDate, fromColumnIndex, toColumnIndex);
        }
        });
});
