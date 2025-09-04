import { Page, Locator, expect, BrowserContext } from '@playwright/test'
import { BasePage } from './Basepage'
import { Loader } from '../components/loaders'
import { AssetHelper } from '../utils/AssetHelpers'




export class Employee_EmailApprove extends BasePage {

    // locator initalizing
    public approveEmailSetup: Locator
    public statusDropDown: Locator
    public viewLinkByName: (name: string) => Locator;
    public statusDropdown: Locator;
    public caelusEmailInput: Locator;
    public passwordInput: Locator;
    public commentTextarea: Locator;
    public submitButton: Locator;

    constructor(page: Page) {
        super(page)
        // assign locator
        this.approveEmailSetup = page.locator("//a[text()='Approve Email Setup']")
        this.statusDropDown = page.locator("#status");
        this.viewLinkByName = (name: string) =>
            page.locator(`//td[@data-title='firstName' and normalize-space()='${name}']
            /following-sibling::td[@data-title='action']//a[normalize-space()='View']`);
        // Form locators
        this.statusDropdown = page.locator("(//select[@name='status'])[2]");
        this.caelusEmailInput = page.locator("//input[@name='ccEmail']");
        this.passwordInput = page.locator("//input[@type='password']");
        this.commentTextarea = page.locator("//textarea[@name='comment']");
        this.submitButton = page.locator("//button[normalize-space()='Submit']");
    }

    async expandTab(): Promise<void> {
        await AssetHelper.expandIfCollapsed(this.page.getByRole('link', { name: "Employee Onboarding" }));
    }

    async navigateToApproveEmailSetupPage(): Promise<void> {
        await this.approveEmailSetup.click();
    }

    async clickViewByName(name: string) {
        await this.viewLinkByName(name).click();
    }

    async fillApproveEmailForm(
        status: string,
        caelusEmail: string,
        password: string,
        comment: string
    ) {
        await this.statusDropdown.selectOption({ label: status });
        await this.caelusEmailInput.fill(caelusEmail);
        await this.passwordInput.fill(password);
        await this.commentTextarea.fill(comment);
        await this.submitButton.click();
        await this.waitforLoaderToDisappear();
    }

}