import { Page, Locator, expect, BrowserContext } from '@playwright/test'
import { BasePage } from './Basepage'
import { Loader } from '../components/loaders'
import { AssetHelper } from '../utils/AssetHelpers'




export class Employee_Onboarding extends BasePage {

    // locator initalizing
    public employeeOnboarding: Locator
    public onboardingForm: Locator
    public inviteEmployeeBttn: Locator
    public emailIDField: Locator
    public employeeNameField: Locator
    public offerletterBttn: Locator
    public submitButton: Locator
    public emailIFrame: Locator
    public onboardLink: Locator
    public verifyEmailField: Locator


    constructor(page: Page) {
        super(page)
        // assign locator
        this.employeeOnboarding = page.locator("//a[text()='Employee Onboarding']")
        this.onboardingForm = page.locator("//a[text()='Onboarding Form']")
        this.inviteEmployeeBttn = page.locator("//a[text()='Invite Employee']");
        this.emailIDField = page.locator("input[placeholder='Enter employee email']");
        this.employeeNameField = page.locator("input[placeholder='Enter employee name']");
        this.offerletterBttn = page.locator("#file-input");
        this.submitButton = page.locator("//button[text()='Submit']");
        this.emailIFrame = page.locator("iframe#ifmail");
        this.onboardLink = page.locator("text=Onboard Employee Form");
        this.verifyEmailField = page.locator("//div[@class='input-group']/input[@type='email' and @class='border']");
    }

    async expandEmployeeOnboardingTab(): Promise<void> {
        await AssetHelper.expandIfCollapsed(this.employeeOnboarding);
    }
    async isExpanded(): Promise<boolean> {
        return await AssetHelper.isExpanded(this.employeeOnboarding);
    }

    async naviagateToOnboardingForm(): Promise<void> {
        await this.onboardingForm.click();
    }

    async clickOnInviteEmployeeBttn(): Promise<void> {
        await this.inviteEmployeeBttn.click();
    }

    async fillOnboardingForm(email: string, name: string) {
        await this.emailIDField.waitFor({ state: 'visible' })
        await this.emailIDField.fill(email);
        await this.employeeNameField.fill(name);

    }

}