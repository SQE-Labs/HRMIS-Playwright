
import { Page, Locator } from '@playwright/test';

export class Helper {
    public itApprovalTab: Locator
    public itemsPerPageDropDown: Locator
    public nextButton: Locator
    public tableRows: Locator;
    public lastRowNameCell: Locator;
    public lastRowViewLink: Locator;
    public approveTab: Locator
    public caeliusEmailField: Locator
    public submitBttn: Locator
    public page: Page


    constructor(page: Page) {
        // assign locator
        this.page = page;
        this.itApprovalTab = page.locator("//a[text()='IT Approval']")
        this.itemsPerPageDropDown = page.locator("#itemsPerPage");
        this.nextButton = page.locator("//a[text()='Next']");
        this.tableRows = page.locator("//table[contains(@class,'resume')]//tbody/tr");
        this.lastRowNameCell = this.tableRows.last().locator("td:nth-child(2)");
        this.lastRowViewLink = this.tableRows.last().locator("td >> text=View");
        this.approveTab = page.locator("#tab3-tab");
        this.caeliusEmailField = page.locator("input[name=email]");
        this.submitBttn = page.locator("//button[text()='Submit']")
    }



    async fetchLastRecordView(record) {

        await this.itemsPerPageDropDown.selectOption(record);


        // Loop through pages till 'Next' is disabled
        while (true) {
            const isDisabled = await this.nextButton.locator('..').evaluate(el =>
                el.classList.contains('disabled') // it will check that element has the class "disabled"
            );
            if (isDisabled) break;
            await this.nextButton.click();
            await this.page.waitForSelector("//table[contains(@class,'resume')]//tbody/tr");
        }

        // Scroll to last record
        await this.lastRowNameCell.scrollIntoViewIfNeeded();

        const lastName = await this.lastRowNameCell.textContent();
        console.log('Last record name:', lastName?.trim());
        return lastName?.trim();
    }


}
