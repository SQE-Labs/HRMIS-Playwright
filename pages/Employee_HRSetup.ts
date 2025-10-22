import { Page, Locator, expect, BrowserContext } from '@playwright/test'
import { BasePage } from './Basepage'
import { Loader } from '../components/loaders'
import { AssetHelper } from '../utils/AssetHelpers'




export class Employee_HRSetup extends BasePage {

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
    public hrSetupTab: Locator
    public approvBttn: Locator


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
        this.hrSetupTab = page.locator("//a[text()='HR Setup']")
        this.approvBttn = page.locator("//button[text()='Approve']")

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



    async navigateToHRSetup(): Promise<void> {
        await this.hrSetupTab.click();
    }


    async clickOnViewLink(): Promise<void> {
        await this.lastRowViewLink.click();
    }

    async clickOnApproveTab(): Promise<void> {
        await this.approveTab.click();
    }

    async fillEmailID(finalEmail): Promise<void> {
        console.log(finalEmail)
        await this.caeliusEmailField.fill(finalEmail);
    }

    async clickOnSubmitBttn(): Promise<void> {
        await this.submitBttn.click();
    }


    async fillHrApprovalForm(page: Page, {
        department,
        designation,
        assignManager,
        leaveManager,
        employeeType,
        employeeSubType,
        employeeFlag,
        projectEligibility
    }: {
        department: string;
        designation: string;
        assignManager: string;
        leaveManager: string;
        employeeType: string;
        employeeSubType: string;
        employeeFlag: string;
        projectEligibility: string;
    }) {

        // Helper function to handle React-Select style dropdowns
        const selectReactDropdown = async (placeholder: string, value: string) => {
            await this.page.locator(`//div[text()='${placeholder}']/ancestor::div[contains(@class,'control')]`).click();
            await this.page.waitForTimeout(1000)
            const form = page.locator('form');

            await form.getByText(value, { exact: true }).click();


        };

        await selectReactDropdown("Select Department", department);
        await selectReactDropdown("Select Designation", designation);
        await selectReactDropdown("Select Manager", assignManager);
        await selectReactDropdown("Select Leave Manager", leaveManager);
        await selectReactDropdown("Select Employee Type", employeeType);
        await selectReactDropdown("Select Sub Employee Type", employeeSubType);
        await selectReactDropdown("Select Flag", employeeFlag);
        await selectReactDropdown("Select Eligibility", projectEligibility);

    }


    async clickApprovBttn() {
        await this.approvBttn.last().click();
        await this.page.waitForTimeout(1000);
    }



}




