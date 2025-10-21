import { LoginPage } from "../pages/LoginPage";
import { BasePage } from "../pages/Basepage";
import { expect, Locator, Page } from "@playwright/test";
import * as constants from "../utils/constants";

export class OnOfficalDuty extends BasePage{

    public applyOfficalDutyTab: Locator;
    public viewBtn :Locator;
    public onOfficalDutyTab : Locator
    public dateField : Locator  
    public deliveryLead : Locator;
    public taskField : Locator;
    public mins :Locator;
    public hours :Locator;
    public submitBtn: Locator;
    public reasonField : Locator;
    public withdrawBtn : Locator;
    public dlViewLink: Locator
    public statusDropdown : Locator
    public commentField: Locator = this.page.locator("[name=comment]");
    public plCreditField :Locator;
    public privilegeLeaveOption: Locator;

    constructor(page: Page) {
        super(page);

        this.onOfficalDutyTab = page.locator("//li[@class='nav-item']/button[text()='On Official Duty']")
        this.applyOfficalDutyTab = page.getByText('Apply On Official Duty', { exact: true });
        this.viewBtn = page.locator("//a[text()='View']");
        this.dateField = page.locator("//input[@name='dateOOD']");
        this.deliveryLead = page.locator('#deliveryLead')
        this.taskField = page.locator('.timesheet-content  textarea')
        this.hours = page.locator("//div[@class='timesheet-content']//span[text()='Hrs']/preceding::input[1]")
        this.mins = page.locator("//div[@class='timesheet-content']//span[text()='Mins']/preceding::input[1]")
        this.submitBtn= page.getByText('Submit')
        this.reasonField = page.locator('[name=reason]')
        this.withdrawBtn = page.locator("//button[text()='Withdraw']")
        this.privilegeLeaveOption = page.locator("span.badge.badge-warning.mx-2", { hasText: "Privilege Leave" });

        
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

    async applyOfficalDutyLeave(date: string, dlType: string, task: string, hours: number, mins: number){
        
                // Clicking on Apply On Offical Duty tab
                await this.applyOfficalDutyTab.click()
                await this.page.waitForLoadState()
        
                // Select Date
                await this.dateField.fill(date)
        
                // Select Delivery Lead
               await this.selectDeliveryLead(dlType)
        
                // Entering task
                await this.enterTask(task)
        
                // Select horus
                await this.enterHoursAndMins(hours, mins)
        
                // Clicking on submit
                await this.submitBtn.click();
                await this.page.waitForLoadState()

                // verifying the success message
                const message = await this.toastMessage();
        
                console.log("Success  message: " + message);
                expect(message).toContain(constants.OFFICAL_DUTY_APPLY_TOAST);
    }

}