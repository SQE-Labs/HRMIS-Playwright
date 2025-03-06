import { Page, Locator , expect } from '@playwright/test'
import { BasePage } from '../pages/BasePage'




export class Alert extends BasePage{
  
    private alertElement =".Toastify__toast-body>div:nth-child(2)";

    constructor(page: Page) {
       super(page)
          // Adjust the selector based on your 
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
}
