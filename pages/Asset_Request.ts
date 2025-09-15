import { Page, Locator, expect } from "@playwright/test";
import { AssetManagementTab } from "./Asset_Management_Tab";

export class AssetRequests extends AssetManagementTab {
    public assetRequestTab: Locator;
    public noRecord: Locator;
    public totalAssetRequest: Locator;
    public column: Locator;
    public assetRequestButton: Locator;
    public card: Locator;
    public assetType: Locator
    public reason: Locator
    public submitButton: Locator
    public resetButton: Locator;

    constructor(page: Page) {
        super(page);
        this.assetRequestTab = page.locator("//a[text() ='Asset Request']");
        this.noRecord = page.locator("//div[@class = 'fs-4 text-secondary text-center']");
        this.totalAssetRequest = page.locator(".total");
        this.column = page.locator("(//thead//tr)[1]");
        this.assetRequestButton = page.locator('//a[@class="export theme-button"][text() = "Asset Request"]');
        this.card = page.locator('.card');
        this.assetType = page.locator('#asset_list');
        this.reason = page.locator('div>textarea');
        this.submitButton = page.locator('//button[@type = "submit"]');
        this.resetButton = page.locator('button.btn.btn-secondary');
    }

    async navigateToAssetRequestTab() {
        await this.assetRequestTab.click();
    }

    
    
    async verifyNoAssetRequestRecord() {
        // TC_AM_148
        const totalRequest = await this.totalAssetRequest.allTextContents();
        const totalRequestCount = totalRequest.length > 0 ? parseInt(totalRequest[0].replace(/\D/g, ''), 10) : 0;
        await this.page.waitForTimeout(1000);
        console.log("TotalRequestCount: ", totalRequestCount);
        return totalRequestCount;
    }

    async clickOnAssetRequestButton() {
        await this.assetRequestButton.click();

    }
    async createAssetRequest() {
        // TC_AM_149
     
    
        await expect(this.card).toBeVisible();
    }
}
