import { Page, Locator, expect, BrowserContext } from '@playwright/test'
import { BasePage } from './Basepage'
import { Loader } from '../components/loaders'
import { AssetHelper } from '../utils/AssetHelpers'




export class SalaryManagement extends BasePage {

    // locator initalizing
    public approveEmailSetup: Locator
    public statusDropDown: Locator


    constructor(page: Page) {
        super(page)
        // assign locator
        this.approveEmailSetup = page.locator("//a[text()='upload Salary']")
        this.statusDropDown = page.locator("#status");

    }

    async expandTab(): Promise<void> {
        await AssetHelper.expandIfCollapsed(this.page.getByRole('link', { name: "Salary Management" }));
    }

    async navigateToApproveEmailSetupPage(): Promise<void> {
        await this.approveEmailSetup.click();
    }


}