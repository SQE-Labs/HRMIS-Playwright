import { Page, Locator, expect, BrowserContext } from '@playwright/test'
import { BasePage } from './Basepage'
import { Loader } from '../components/loaders'
import { AssetHelper } from '../utils/AssetHelpers'




export class Employee_EmailSetup extends BasePage {

    // locator initalizing
    public emailSetupPage: Locator
    public addRequestBtn: Locator
    private formModal: Locator;
    private purposedEmailInput: Locator;
    private suggestedNameInput: Locator;
    private personalEmailInput: Locator;
    private phoneNumberInput: Locator;
    private commentTextarea: Locator;
    private submitButton: Locator;
    private cancelButton: Locator;
    private exportToExcelBttn: Locator;



    constructor(page: Page) {
        super(page)
        // assign locator
        this.emailSetupPage = page.locator("//a[text()='Email Setup Request']");
        this.addRequestBtn = page.locator("//button[text()='+ Add Request']");
        this.formModal = page.locator('div.modal-content >> text=Add Email Request');
        this.purposedEmailInput = page.locator('input[name="purposedEmail"]');
        this.suggestedNameInput = page.locator('input[placeholder="Enter suggested name"]');
        this.personalEmailInput = page.locator('input[placeholder="Enter personal email"]');
        this.phoneNumberInput = page.locator('input[placeholder*="Phone"], input[type="tel"]');
        this.commentTextarea = page.locator('textarea');
        this.submitButton = page.locator('button:has-text("Submit")');
        this.cancelButton = page.locator('button:has-text("Cancel")');
        this.exportToExcelBttn = page.locator("//button[text()='Export to Excel']");


    }

    async expandTab(): Promise<void> {
        await AssetHelper.expandIfCollapsed(this.page.getByRole('link', { name: "Employee Onboarding" }));
    }

    async navigateToEmailSetupPage(): Promise<void> {
        await this.emailSetupPage.click();
    }

    async clickOnAddrequestBttn(): Promise<void> {
        await this.addRequestBtn.click();
    }

    async clickOnExportToExcelBttn(): Promise<void> {
        await this.exportToExcelBttn.click();
    }

    async fillAndSubmitForm(data: {
        purposedEmail: string;
        suggestedName: string;
        personalEmail: string;
        phoneNumber: string;
        comment?: string;
    }) {
        await this.purposedEmailInput.fill(data.purposedEmail);
        await this.suggestedNameInput.fill(data.suggestedName);
        await this.personalEmailInput.fill(data.personalEmail);
        await this.phoneNumberInput.fill(data.phoneNumber);

        if (data.comment && data.comment.trim() !== "") {
            await this.commentTextarea.fill(data.comment);
        }

        await this.submitButton.click();
    }



}