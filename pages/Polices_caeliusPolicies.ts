import { Page, Locator, expect, BrowserContext } from '@playwright/test'
import { BasePage } from './Basepage'
import { Loader } from '../components/loaders'
import { AssetHelper } from '../utils/AssetHelpers'




export class Polices_caeliusPolicies extends BasePage {

    // locator initalizing
    public policyEditor: Locator
    public policyViewwer: Locator
    public addPolicyBttn: Locator
    public policyTileField: Locator
    public policyDocumentField: Locator
    public policyValidFormField: Locator
    public descriptionField: Locator
    public submitBttn: Locator
    public tableRows: Locator
    public policyEditBttn: Locator
    public viewLink: Locator

    constructor(page: Page) {
        super(page)
        // assign locator
        this.policyEditor = page.locator("//a[text()='Policy Editor']")
        this.policyViewwer = page.locator("//a[text()='Policy Viewer']");
        this.addPolicyBttn = page.locator("//a[text()='+ Add Policy']");
        this.policyTileField = page.locator("input[name='policyTitle']");
        this.policyDocumentField = page.locator("input[name='policyDocument']");
        this.policyValidFormField = page.locator("input[name='policyValidFrom']");
        this.descriptionField = page.locator("textarea[name='description']");
        this.submitBttn = page.locator("button[type='submit']");
        this.tableRows = page.locator("//table[contains(@class,'resume')]//tbody/tr");
        this.policyEditBttn = this.tableRows.last().locator("td:nth-child(6)");
        this.viewLink = this.tableRows.last().locator("td:last-child a");

    }

    async expandTab(): Promise<void> {
        await AssetHelper.expandIfCollapsed(this.page.getByRole('link', { name: "Caelius' Policies" }));
    }

    async naviagateToPolicyEditorPage(): Promise<void> {
        await this.policyEditor.click();
    }

    async naviagateToPolicyViewerPage(): Promise<void> {
        await this.policyViewwer.click();
    }

    async clickOnAddPolicyBttn() {
        await this.addPolicyBttn.click();
    }

    async fillAddPolicyForm({
        title,
        validFrom,
        description
    }: {
        title: string,
        validFrom: string, // format: dd-mm-yyyy
        description: string
    }) {
        await this.policyTileField.fill(title);
        await this.policyValidFormField.fill(validFrom);
        await this.descriptionField.fill(description);
    }


    async clickOnSubmitBttn() {
        await this.submitBttn.click();
    }

    async clickOnLastEditBttn() {
        await this.policyEditBttn.click();
    }

    async fillTitle(title) {
        await this.policyTileField.fill(title);
    }

    async clickOnViewLink() {
        await this.viewLink.click();
        await this.page.waitForTimeout(2000);
    }

}