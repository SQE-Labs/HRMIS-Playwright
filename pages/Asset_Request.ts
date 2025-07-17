import { Page, Locator, expect } from "@playwright/test";
import { AssetManagementTab } from "./Asset_Management_Tab";
import { BasePage } from "./Basepage";
import { OverView } from "./Asset_OverView";
import exp from "constants";

export class AssetRequests extends BasePage {
    private assetRequestTab: Locator;
    private noRecord: Locator;
    private totalAssetRequest: Locator;
    private column: Locator;
    private assetRequestButton: Locator;
    private card: Locator;

    constructor(page: Page) {
        super(page);
        this.assetRequestTab = page.locator("//a[text() ='Asset Request']");
        this.noRecord = page.locator("//div[@class = 'fs-4 text-secondary text-center']");
        this.totalAssetRequest = page.locator(".total");
        this.column = page.locator("(//thead//tr)[1]");
        this.assetRequestButton = page.locator('//a[@class="export theme-button"][text() = "Asset Request"]');
        this.card = page.locator('.card');
    }

    async openAssetRequestTab() {
        const assetManagementTab = new AssetManagementTab(this.page);
        await assetManagementTab.expandAssetManagementTab();
        await this.assetRequestTab.click();
    }

    async verifyNoAssetRequestRecord() {
        // TC_AM_148
        await this.openAssetRequestTab();
        await this.page.waitForTimeout(3000);
        const totalRequest = await this.totalAssetRequest.allTextContents();
        const totalRequestCount = totalRequest.length > 0 ? parseInt(totalRequest[0].replace(/\D/g, ''), 10) : 0;
        await this.page.waitForTimeout(1000);
        console.log("TotalRequestCount: ", totalRequestCount);

        if (totalRequestCount === 0) {
            expect(await this.noRecord.isVisible()).toBeTruthy();
            const noRecordText = await this.noRecord.textContent();
            console.log(noRecordText);
            expect(noRecordText).toEqual("No Record Available");
        } else {
            expect(await this.column.isVisible()).toBeTruthy();
        }
    }

    async createAssetRequest() {
        // TC_AM_149
        await this.openAssetRequestTab();
        await this.page.waitForTimeout(3000);
        await this.assetRequestButton.click();
        await this.waitforLoaderToDisappear()
        await this.page.waitForTimeout(1000);
        await expect(this.card).toBeVisible();
    }
}
