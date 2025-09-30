import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./Basepage";

export class myAttendance extends BasePage{
    private monthHeading: Locator = this.page.locator(".heading");

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
