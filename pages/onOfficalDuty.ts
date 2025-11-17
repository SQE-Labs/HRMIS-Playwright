import { LoginPage } from "./LoginPage";
import { BasePage } from "./Basepage";
import { expect, Locator, Page } from "@playwright/test";
import * as constants from "../utils/constants";
import { holiday_Management } from "./Holiday_ManagementA&L";

export class OnOfficalDuty extends BasePage {
    public holidayManagement: holiday_Management;
    public applyOfficalDutyTab: Locator;
    public viewBtn: Locator;
    public onOfficalDutyTab: Locator
    public dateField: Locator
    public deliveryLead: Locator;
    public taskField: Locator;
    public mins: Locator;
    public hours: Locator;
    public submitBtn: Locator;
    public reasonField: Locator;
    public withdrawBtn: Locator;
    public dlViewLink: Locator
    public statusDropdown: Locator
    public commentField: Locator = this.page.locator("[name=comment]");
    public plCreditField: Locator;
    public privilegeLeaveOption: Locator;
    public resetTimeButton: Locator;
    public duplicateLeaveToast: Locator;

    constructor(page: Page) {
        super(page);
        this.holidayManagement = new holiday_Management(page);

        this.onOfficalDutyTab = page.locator("//li[@class='nav-item']/button[text()='On Official Duty']")
        this.applyOfficalDutyTab = page.getByText('Apply On Official Duty', { exact: true });
        this.viewBtn = page.locator("//a[text()='View']");
        this.dateField = page.locator("//input[@name='dateOOD']");
        this.deliveryLead = page.locator('#deliveryLead')
        this.taskField = page.locator('.timesheet-content  textarea')
        this.hours = page.locator("//div[@class='timesheet-content']//span[text()='Hrs']/preceding::input[1]")
        this.mins = page.locator("//div[@class='timesheet-content']//span[text()='Mins']/preceding::input[1]")
        this.submitBtn = page.getByText('Submit')
        this.reasonField = page.locator('[name=reason]')
        this.withdrawBtn = page.locator("//button[text()='Withdraw']")
        this.privilegeLeaveOption = page.locator("span.badge.badge-warning.mx-2", { hasText: "Privilege Leave" });
        this.resetTimeButton = page.locator(".button.button-reset-timesheet-row")
        this.duplicateLeaveToast = page.getByText('Duplicate leave request !');

        // DL page
        this.dlViewLink = page.locator("(//a[text()='View'])[last()]")
        this.statusDropdown = page.locator('#action');

        // HR Page
        this.plCreditField = page.locator('#plAmount')
    }

    async selectDate(date: string) {
        // date format: "dd-mm-yyyy"
        const [day, month, year] = date.split('-');
        const formattedDate = `${year}-${month}-${day}`; // yyyy-mm-dd

        // Fill the date field directly
        await this.dateField.fill(formattedDate);
    }

    async selectDeliveryLead(dlType: string) {
        await this.deliveryLead.selectOption(dlType);
    }

    async enterTask(task: string) {
        await this.taskField.fill(task);
    }

    async enterHoursAndMins(hours: number, mins: number) {
        await expect(this.hours).toBeVisible();
        await this.hours.fill(`${hours}`);

        await expect(this.mins).toBeVisible();
        await this.mins.fill(`${mins}`);
    }

    async selectLeaveStatus(type: string) {
        await this.statusDropdown.selectOption(type);
        this.waitForSpinnerLoaderToDisappear;
    }

    async selectPL(type: number) {
        await this.plCreditField.selectOption(type.toString());
        this.waitForSpinnerLoaderToDisappear;
    }

    async applyOfficalDutyLeave(date: string, dlType: string, task: string, hours: number, mins: number) {
        await this.applyOfficalDutyTab.click();
        await this.page.waitForLoadState('networkidle');

        await this.dateField.click();
        await this.dateField.fill(date);

        await this.selectDeliveryLead(dlType);
        await this.enterTask(task);
        await this.enterHoursAndMins(hours, mins);

        await this.submitBtn.click();
        await this.page.waitForLoadState('networkidle');

        let message = await this.toastMessage();

        // Retry only if duplicate toast found
        if (message && message.includes(constants.DUPLICATE_TOAST)) {
            let currentDate = new Date(date);
            let success = false;

            for (let i = 0; i < 3 && !success; i++) {
                const previousWeekend = this.getPreviousWeekend(currentDate);
                const formattedPrevWeekend = previousWeekend.toISOString().split("T")[0];
                const dayToSelect = previousWeekend.getDate();

                await this.dateField.click();
                await this.page.waitForSelector(
                    '.react-datepicker, .datepicker, .mat-calendar, .ant-picker-panel',
                    { timeout: 5000 }
                );

                const dayButton = this.page.locator(
                    `.react-datepicker__day--0${dayToSelect.toString().padStart(2, '0')}:not(.react-datepicker__day--outside-month)`
                );

                if (await dayButton.count() > 0) {
                    await dayButton.first().click();
                } else {
                    const fallbackDay = this.page.locator(`td >> text="${dayToSelect}"`);
                    if (await fallbackDay.count() > 0) await fallbackDay.first().click();
                }

                await this.submitBtn.click();
                await this.page.waitForLoadState('networkidle');

                message = await this.toastMessage();

                if (message && message.includes(constants.OFFICAL_DUTY_APPLY_TOAST)) success = true;
                else currentDate = previousWeekend;
            }
        }

        expect(message).toContain(constants.OFFICAL_DUTY_APPLY_TOAST);
    }

    /**
     * Helper function to get the previous available weekend (Saturday or Sunday)
     */
    private getPreviousWeekend(date: Date): Date {
        const prevDate = new Date(date);
        do {
            prevDate.setDate(prevDate.getDate() - 1);
        } while (prevDate.getDay() !== 6 && prevDate.getDay() !== 0); // 6 = Saturday, 0 = Sunday
        return prevDate;
    }




    async applyOfficalDutyLeaveWithRetry(dlType: string, task: string, hours: number, mins: number) {
        console.log("➡️ Applying Official Duty Leave with random weekend retry...");

        let success = false;
        let message = "";
        const maxAttempts = 10;

        for (let attempt = 1; attempt <= maxAttempts && !success; attempt++) {
            // Select a random weekend date from current or previous 6 months
            const randomWeekend = this.getRandomWeekendFromPreviousMonths(new Date(), 6);
            const formattedDate = randomWeekend.toISOString().split("T")[0];
            const dayToSelect = randomWeekend.getDate();

            console.log(`Attempt ${attempt}: Trying weekend ${formattedDate}`);

            // Open the Apply Leave page
            await this.applyOfficalDutyTab.click();
            await this.page.waitForLoadState('networkidle');

            // Fill date
            await this.dateField.click();
            await this.page.waitForSelector(
                '.react-datepicker, .datepicker, .mat-calendar, .ant-picker-panel',
                { timeout: 5000 }
            );

            const dayButton = this.page.locator(
                `.react-datepicker__day--0${dayToSelect.toString().padStart(2, '0')}:not(.react-datepicker__day--outside-month)`
            );

            if (await dayButton.count() > 0) {
                await dayButton.first().click();
            } else {
                const fallbackDay = this.page.locator(`td >> text="${dayToSelect}"`);
                if (await fallbackDay.count() > 0) await fallbackDay.first().click();
            }

            // Fill other details
            await this.selectDeliveryLead(dlType);
            await this.enterTask(task);
            await this.enterHoursAndMins(hours, mins);

            // Submit
            await this.submitBtn.click();
            await this.page.waitForLoadState('networkidle');

            const message = await this.toastMessage();

            // Check result
            if (message?.includes(constants.OFFICAL_DUTY_APPLY_TOAST)) {
                console.log(`✅ Leave successfully applied on ${formattedDate}`);
                success = true;
            } else if (message?.includes(constants.DUPLICATE_TOAST)) {
                console.log(`Duplicate found on ${formattedDate}, retrying...`);
                await this.page.waitForTimeout(1000);
            } else {
                console.log(`Unexpected message: ${message}`);
                await this.page.waitForTimeout(1000);
            }
        }

        expect(success).toBeTruthy();
    }


    private getRandomWeekendFromPreviousMonths(currentDate: Date, monthsBack: number): Date {
        const today = new Date(currentDate);
        const randomMonthOffset = Math.floor(Math.random() * (monthsBack + 1));
        const targetMonth = new Date(today.setMonth(today.getMonth() - randomMonthOffset));

        const weekends: Date[] = [];
        const year = targetMonth.getFullYear();
        const month = targetMonth.getMonth();

        for (let day = 1; day <= 31; day++) {
            const d = new Date(year, month, day);
            if (d.getMonth() !== month) break;
            if (d.getDay() === 6 || d.getDay() === 0) weekends.push(d);
        }

        return weekends[Math.floor(Math.random() * weekends.length)];
    }
}
