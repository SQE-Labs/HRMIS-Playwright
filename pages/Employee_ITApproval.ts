import { Page, Locator, expect, BrowserContext } from '@playwright/test'
import { BasePage } from './Basepage'
import { Loader } from '../components/loaders'
import { AssetHelper } from '../utils/AssetHelpers'




export class Employee_ITApproval extends BasePage {

    // locator initalizing
    public itApprovalTab: Locator
    public itemsPerPageDropDown: Locator
    public nextButton: Locator
    public tableRows: Locator;
    public lastRowNameCell: Locator;
    public lastRowViewLink: Locator;
    public approveTab: Locator
    public caeliusEmailField: Locator
    public submitBttn: Locator


    constructor(page: Page) {
        super(page)
        // assign locator
        this.itApprovalTab = page.locator("//a[text()='IT Approval']")
        this.itemsPerPageDropDown = page.locator("#itemsPerPage");
        this.nextButton = page.locator("//a[text()='Next']");
        this.tableRows = page.locator("//table[contains(@class,'resume')]//tbody/tr");
        this.lastRowNameCell = this.tableRows.last().locator("td[data-title='Name']");
        this.lastRowViewLink = this.tableRows.last().locator("td >> text=View");
        this.approveTab = this.page.locator("#tab3-tab");
        this.caeliusEmailField = this.page.locator("input[name=email]");
        this.submitBttn = this.page.locator("//button[text()='Submit']")
    }

    async navigateToITApproval(): Promise<void> {
        await this.itApprovalTab.click();
    }


    async fetchLastRecordView(record :  string) {

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

    async clickOnViewLink(): Promise<void> {
        await this.lastRowViewLink.click();
    }

    async clickOnApproveTab(): Promise<void> {
        await this.approveTab.click();
    }

    async fillEmailID(finalEmail : string): Promise<void> {
        console.log(finalEmail)
        await this.caeliusEmailField.fill(finalEmail);
    }

    async clickOnSubmitBttn(): Promise<void> {
        await this.submitBttn.click();
    }

}




