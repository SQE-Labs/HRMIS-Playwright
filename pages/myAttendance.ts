import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./Basepage";

export class myAttendance extends BasePage{
    private monthHeading: Locator = this.page.locator(".heading");
    public forwardIcon: Locator = this.page.locator(".custom_calendar .heading+span");
    public backwardIcon: Locator = this.page.locator(".calendar_nav span:nth-child(1)")
    public cell: Locator = this.page.locator("td:not(.weekoff) span")
    public closeBtn: Locator = this.page.getByText("Close")
    public crossIcon: Locator = this.page.locator("//h5[text()='Attendance Detail']/../button")
    public weekendOffCell: Locator = this.page.locator("td.weekoff:has(p:text('Weekend Off'))")
    public popupTitle: Locator = this.page.getByText("Attendance Detail")

    constructor(page: Page) { super(page);}

    async verifyCurrentMonthAndYear(){
        const today = new Date();
        const monthName = today.toLocaleString('default', { month: 'long' }); // e.g. 'September'
        const yearString = today.getFullYear().toString();

        const expectedHeading = `${monthName} ${yearString}`
        const actualHeading = (await this.monthHeading.textContent())?.trim();
        await expect(actualHeading).toBe(expectedHeading);
    }

}
