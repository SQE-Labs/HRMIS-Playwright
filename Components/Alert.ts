import { Page, Locator , expect } from '@playwright/test'
import { BasePage } from '../pages/BasePage'




export class Alert extends BasePage{
  
    private alertElement: Locator;

    constructor(page: Page) {
       super(page)
        this.alertElement = page.locator(".Toastify__toast-body>div:nth-child(2)"); // Adjust the selector based on your app
    }

    // Get the text from the alert popup
    async getAlertText(): Promise<string> {
        await this.alertElement.waitFor({ state: "visible", timeout: 5000 });
        return (await this.alertElement.textContent())?.trim() || ""; // Ensure it always returns a string
    }

    // Get the alert element (useful for assertions)
    getAlertElement(): Locator {
        return this.alertElement;
    }

    // Verify if the alert message contains expected text
    async verifyAlertMessage(expectedText: string) {
        await expect(this.alertElement).toHaveText(expectedText);
        console.log(`Alert message verified: ${expectedText}`);
    }
}
