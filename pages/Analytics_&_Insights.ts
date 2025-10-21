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




    constructor(page: Page) {
        super(page);
        this.assetTypeDropdown = page.locator('#filterAssetType');
        this.ownerDropdown = page.locator('#filterOwner');
        this.resetButton = page.locator('//button[text() = "Reset"]');
        this.downloadButton = page.locator('//button[text() = "Download"]');
        this.selectEmployeeDropdown = page.locator(".css-19bb58m");
        this.monthDropdown = page.locator("//select[@id='month']");
        this.compileAndDownloadButton = page.locator('//button[text() = "Compile & Download"]');
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
        await this.page.getByText('Analytics & Insights').click();
        await this.page.getByText('Reimbursement Report').click();
        await this.waitforLoaderToDisappear();
    }

}