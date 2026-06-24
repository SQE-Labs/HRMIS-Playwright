import { BasePage } from "./Basepage";
import { expect, Locator, Page } from "@playwright/test";


export class Analytics_Insights extends BasePage {


    public assetTypeDropdown: Locator;
    public ownerDropdown: Locator;
    public resetButton: Locator;
    public downloadButton: Locator;
    public selectEmployeeDropdown: Locator;
    public monthDropdown: Locator;
    public compileAndDownloadButton: Locator;
    public reimbursementTypeDropdown: Locator;
    public reimbursementFromDatePicker: Locator;
    public reimbursementFromDateInput: Locator;
    public reimbursementStatusDropdown: Locator;
    public reimbursementDownloadButton: Locator;




    constructor(page: Page) {
        super(page);
        this.assetTypeDropdown = page.locator('#filterAssetType');
        this.ownerDropdown = page.locator('#filterOwner');
        this.resetButton = page.locator('//button[text() = "Reset"]');
        this.downloadButton = page.locator('//button[text() = "Download"]');
        this.selectEmployeeDropdown = page.locator("//input[@id='react-select-5-input']");
        this.monthDropdown = page.locator("#month");
        this.compileAndDownloadButton = page.locator('//button[@type="submit"]');
        this.reimbursementTypeDropdown = page.getByLabel("Reimbursement Type");
        this.reimbursementFromDatePicker = page.locator("div:nth-child(3) > .col-md-3");
        this.reimbursementFromDateInput = page.locator('input[name="from"]');
        this.reimbursementStatusDropdown = page.getByLabel("Status");
        this.reimbursementDownloadButton = page.getByRole("button", {
            name: "Download",
        });
    }


    async navigateToUserRoleReport() {
        await this.page.getByText('Analytics & Insights').click();
        await this.page.getByText("User's Role Report").click();
        await this.waitforLoaderToDisappear();
    }

    async navigateToAssetReport() {
        await this.page.getByText('Analytics & Insights').click();
        await this.page.getByText('Asset Report').click();
        await this.waitforLoaderToDisappear();
    }

    async navigateToUserAttendanceReport() {
        await this.page.getByText('Analytics & Insights').click();
        await this.page.getByText('Attendance Report').click();
        await this.waitforLoaderToDisappear();
    }

    async navigateToUserReimbursementReport() {
        await this.page.getByRole("button", { name: "Analytics & Insights" }).click();
        await this.page.getByRole("link", { name: "Reimbursement Report" }).click();
        await this.waitforLoaderToDisappear();
    }

    async verifyDownloadReimbursementPage(): Promise<void> {
        await expect(this.page.locator("h2.heading-lg")).toContainText(
            "Download Reimbursement"
        );
    }

    async fillReimbursementReportFilters(
        reimbursementType: string,
        fromDate: string,
        status: string
    ): Promise<void> {
        await this.reimbursementTypeDropdown.selectOption(reimbursementType);
        await this.reimbursementFromDatePicker.click();
        await this.reimbursementFromDateInput.fill(fromDate);
        await this.reimbursementStatusDropdown.selectOption(status);
    }

    async downloadReimbursementReport(): Promise<void> {
        await this.reimbursementDownloadButton.click();
    }

}