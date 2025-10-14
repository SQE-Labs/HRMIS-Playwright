import { LoginPage } from "../pages/LoginPage";
import { BasePage } from "../pages/Basepage";
import { expect, Locator, Page } from "@playwright/test";
import * as constants from "../utils/constants";

export class onOfficalDuty extends BasePage{

    public applyOfficalDutyTab: Locator;
    public viewBtn :Locator;
    public onOfficalDutyTab : Locator
    public dateField : Locator  
    public deliveryLead : Locator;
    public taskField : Locator;
    public Mins :Locator;
    public Hours :Locator;
    public submitBtn: Locator;
    public reasonField : Locator;
    public withdrawBtn : Locator;

    constructor(page: Page) {
        super(page);

        this.onOfficalDutyTab = page.locator("//li[@class='nav-item']/button[text()='On Official Duty']")
        this.applyOfficalDutyTab = page.getByText('Apply On Official Duty', { exact: true });
        this.viewBtn = page.locator("//a[text()='View']");
        this.dateField = page.locator("//input[@name='dateOOD']");
        this.deliveryLead = page.locator('#deliveryLead')
        this.taskField = page.locator('.timesheet-content  textarea')
        this.Hours = page.locator("//div[@class='timesheet-content']//span[text()='Hrs']/preceding::input[1]")
        this.Mins = page.locator("//div[@class='timesheet-content']//span[text()='Mins']/preceding::input[1]")
        this.submitBtn= page.getByText('Submit')
        this.reasonField = page.locator('[name=reason]')
        this.withdrawBtn = page.locator("//button[text()='Withdraw']")

}

    async selectDate(date: string) {
        // date format: "dd-mm-yyyy"
        const [day, month, year] = date.split('-');
        const formattedDate = `${year}-${month}-${day}`; // yyyy-mm-dd
        
        // Fill the date field directly
        await this.dateField.fill(formattedDate);
    }

    async selectDeliveryLead(type: string) {
        await this.deliveryLead.selectOption(type);
    }

    async enterTask(task: string) {
        await this.taskField.fill(task);
    }

    async enterHoursAndMins(hours: number, mins: number) {
        await expect(this.Hours).toBeVisible();
        await this.Hours.fill(`${hours}`);

        await expect(this.Mins).toBeVisible();
        await this.Mins.fill(`${mins}`);
    }


}