import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from '../pages/Basepage'




export class Alert extends BasePage {

    public alertElement = ".Toastify__toast-body>div:nth-child(2)";
    public toast: Locator
    constructor(page: Page) {
        super(page)
        // Adjust the selector based on your 
        this.toast = page.locator('.Toastify__toast - body')
    }

    // Get the text from the alert popup
    async getAlertText(): Promise<string> {
        await this.page.waitForSelector(this.alertElement)
        // await this.alertElement.waitForTimeout(5000);
        return (await this.page.locator(this.alertElement).textContent())?.trim() || ""; // Ensure it always returns a string
    }

    // Get the alert element (useful for assertions)
    getAlertElement(): Locator {
        return this.page.locator(this.alertElement)
    }

    // Verify if the alert message contains expected text
    async verifyAlertMessage(expectedText: string) {
        await expect(this.alertElement).toContain(expectedText);
        console.log(`Alert message verified: ${expectedText}`);
    }

    async toastMessage() {
        await this.page.waitForSelector('.Toastify__toast-body')
        let message = await this.toast.textContent()
        console.debug(message)
        return message
    }

}
