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
    public comment: Locator;
    public popupSearchBar: Locator;
    public assetItTab: Locator;
    public assetL1Tab: Locator;
    public assetL2Tab: Locator;
    public assetTableSerialNumber: Locator;
    public assetRadioButton: Locator;
    public nextButton: Locator;
    public previousButton: Locator; 
    public assetStoreTab: Locator;



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
        this.comment = page.locator('textarea[name = "comment"]');
        this.assetItTab = page.locator("//a[text() ='Approve Asset Request (IT)']");
        this.nextButton = page.locator("//a[text()='Next']");
        this.previousButton = page.locator("//a[text()='Previous']");
        this.assetL1Tab = page.locator("//a[text() ='Approve Asset Request (L1)']");
        this.assetRadioButton = page.locator("div>input[type='radio']");
        this.popupSearchBar = this.page.getByPlaceholder("Search By Serial Number");
        this.assetL2Tab = page.locator("//a[text() ='Approve Asset Request (L2)']");
        this.assetTableSerialNumber = this.page.locator("tbody>tr>td:nth-child(4)");
        this.assetStoreTab = page.locator("//a[text() ='Asset Delivery (Store)']");

    }

    async navigateToAssetRequestTab() {
        await this.assetRequestTab.click();
    }
    async navigateToAssetl1ApprovalTab() {
        await this.assetL1Tab.click();
    }
    async navigateToAssetl2ApprovalTab() {
        await this.assetL2Tab.click();
    }
    async navigateToAssetItApprovalTab() {
        await this.assetItTab.click();
    }
    async navigateToAssetStoreTab() {
        await this.assetStoreTab.click();
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
    async clickOnSubmitButton() {
        await this.submitButton.click();
    }

    async searchRequestByComment(comment: string) {
        const commentLocator = this.page.locator(`//td[contains(text(), '${comment}' )]/../td[6]/a`);
        await expect(commentLocator).toBeVisible();
    }

    async clickOnCommentLocator(comment: string) {
        const commentLocator = this.page.locator(`//td[contains(text(), '${comment}' )]/../td[6]/a`);
        await commentLocator.click();
    }
    async selectApproveOrRejectRequest(action: string) {
        const actionButton = this.page.locator('#action');
        await actionButton.selectOption({ value: action });
    }

    async verifySuccessMessage(message: string) {
        const successMessage = this.page.locator(`//div[contains(text(), '${message}')]`);
        await expect(successMessage).toBeVisible();
    }

}
