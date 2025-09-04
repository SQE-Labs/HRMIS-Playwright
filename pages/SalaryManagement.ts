import { Page, Locator, expect, BrowserContext } from '@playwright/test'
import { BasePage } from './Basepage'
import { Loader } from '../components/loaders'
import { AssetHelper } from '../utils/AssetHelpers'




export class SalaryManagement extends BasePage {

    // locator initalizing
    public uploadSalaryTab: Locator;
    public employeeTypeDropdown: Locator;
    public salarySlipUpload: Locator;
    public monthDropdown: Locator;
    public submitButton: Locator;
    public resetButton: Locator;

    constructor(page: Page) {
        super(page);

        this.uploadSalaryTab = page.locator("//a[text()='Upload Salary']");
        this.employeeTypeDropdown = page.locator('#employeeType');
        this.salarySlipUpload = page.locator('input[type="file"]');
        this.monthDropdown = page.locator('select[name="month"]'); // adjust if actual attribute differs
        this.submitButton = page.locator('button:has-text("Submit")');
        this.resetButton = page.locator('button:has-text("Reset")');
    }
    async expandTab(): Promise<void> {
        await AssetHelper.expandIfCollapsed(this.page.getByRole('link', { name: "Salary Management" }));
    }

    async navigateToUploadSalaryTab(): Promise<void> {
        await this.uploadSalaryTab.click();
    }


    async selectEmployeeType(emp: string): Promise<void> {
        await this.employeeTypeDropdown.selectOption(emp);
    }

    async uploadSalarySlip(filePath: string): Promise<void> {
        await this.salarySlipUpload.setInputFiles(filePath);
    }

    async selectMonth(month: string): Promise<void> {
        await this.monthDropdown.selectOption({ label: month });
    }

    async submitForm(): Promise<void> {
        await this.submitButton.click();
    }

}