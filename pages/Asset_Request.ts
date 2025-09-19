import { Page, Locator, expect } from "@playwright/test";
import { AssetManagementTab } from "./Asset_Management_Tab";
import { AssetDeallocation } from '../pages/Asset_Deallocation';
import { AssetHelper } from "../utils/AssetHelpers";


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
    public rtoManagementTab: Locator;
    public status: Locator;
    public calendar: Locator;
    public dockerNumber: Locator;
    public deallocationDropdown: Locator;
    public repaircost: Locator;
    public returnrequestButton: Locator;





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
        this.assetTableSerialNumber = this.page.locator('table[class = "table align-middle"]>tbody>tr>td:nth-child(4)');
        this.assetStoreTab = page.locator("//a[text() ='Asset Delivery (Store)']");
        this.rtoManagementTab = page.locator("//a[text() ='RTO Management']");
        this.status = page.locator("#status");
        this.calendar = page.locator("//input[@type = 'date']");
        this.dockerNumber = page.locator("input[name= 'docketNo']");
        this.deallocationDropdown = page.locator(".col-md-6");
        this.repaircost = page.locator("//input[@type = 'tel']");
        this.returnrequestButton = page.locator("//a[@class='export theme-button'][text() = 'Returned Asset']");



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
    async navigateToRtoManagementTab() {
        await this.rtoManagementTab.click();
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
    async seacrhRequestBySerialNumber(serialNumber: string) {
        const serialNumberLocator = this.page.locator(`//td[contains(text(), '${serialNumber}' )]/../td[5]/a`);
        await expect(serialNumberLocator).toBeVisible();
    }
    async clickOnSerialNumberLocator(serialNumber: string) {
        const serialNumberLocator = this.page.locator(`//td[contains(text(), '${serialNumber}' )]/../td[5]/a`);
        await serialNumberLocator.click();
    }

    async clickOnCommentLocator(comment: string) {
        const commentLocator = this.page.locator(`//td[contains(text(), '${comment}' )]/../td[6]/a`);
        await commentLocator.click();
    }

    async searchRequestByReason(comment: string) {
        const assetTypeLocator = this.page.locator(`//td[contains(text(), '${comment}' )]/../td[11]/a`);
        await expect(assetTypeLocator).toBeVisible();
    }

    async clickOnReasonViewLocator(comment: string) {
        const reasonLocator = this.page.locator(`//td[contains(text(), '${comment}' )]/../td[11]/a`);
        await reasonLocator.click();
    }

    async selectApproveOrRejectRequest(action: string) {
        const actionButton = this.page.locator('#action');
        await actionButton.selectOption({ value: action });
    }

    async selectStatus(status: string) {
        await this.status.selectOption({ value: status });
    }

    async verifySuccessMessage(message: string) {
        const successMessage = this.page.locator(`//div[contains(text(), '${message}')]`);
        await expect(successMessage).toBeVisible();
    }

    async getExistingSerialNumber() {
        const serialNumbers = await this.assetTableSerialNumber.allTextContents();
        const enterSerialNumber = serialNumbers.length > 0 ? serialNumbers[0] : "";
        console.log("SerialNumbers: ", serialNumbers);
        console.log("EnterSerialNumber: ", enterSerialNumber);
        expect(serialNumbers.includes(enterSerialNumber)).toBeTruthy();
        return enterSerialNumber;
    }

    async enterTodaysDateInCalendar() {
        const currentDate = new Date();
        const todayDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
        await this.calendar.fill(todayDate);
        const enteredDate = await this.calendar.inputValue();
        expect(enteredDate).toBe(todayDate);
    }

    async navigateToAssetDeallocation() {
        await AssetHelper.navigateToDeallocationTab(this.page.locator("//a[text()='Asset De-allocation']"), this);
    }


    async selectEmployeeForDeallocation(employeeName: string) {
        await this.deallocationDropdown.click();
        await this.page.getByText(employeeName).click();
    }

    async deallocateAsset(serial: string) {
        await this.page.locator(`//tbody//tr//td[contains(text(), '${serial}')]/../td[7]/a`).click()
        await this.waitforLoaderToDisappear();
        await this.page.selectOption("#assetCondition", { label: "Good condition" });
        await this.repaircost.fill("150");
        await AssetHelper.fillAndSubmitField(this.comment, "received", this.submitButton);
    }

    async clickOnReturnRequestButton() {
        await this.returnrequestButton.click();
        await this.waitforLoaderToDisappear();
    }
async getStatusUpdate(comment: string, value = 5) {
    let totalRequestCount = await this.verifyNoAssetRequestRecord();

    if (totalRequestCount > 0) {
        expect(await this.column.isVisible()).toBeTruthy();

        let found = false;
        let statusText = "";

        while (true) {
            // Debug: print all first-column values
            const allComments = await this.page.locator("//table//td[1]").allTextContents();
            console.log("Comments on this page:", allComments);

            // Try to find the row with the comment
            const commentLocator = this.page.locator(`//td[contains(normalize-space(), "${comment}")]`);
            const commentCount = await commentLocator.count();

            if (commentCount > 0) {
                // Found the comment on current page
                const statusLocator = this.page.locator(
                    `//td[contains(normalize-space(), "${comment}")]/../td[${value}]`
                );
                statusText = (await statusLocator.textContent())?.trim() || "";
                found = true;
                break;
            }

            // Check if Next is disabled
            const isDisabled = await this.nextButton.getAttribute("disabled");
            if (isDisabled !== null) {
                console.log("Next button disabled, reached last page.");
                break;
            }

            // Go to next page
            await this.nextButton.scrollIntoViewIfNeeded();
            await this.nextButton.click();
            await this.waitforLoaderToDisappear();
        }

        expect(found).toBeTruthy(); // Fail early if comment not found
        return statusText;
    }

}

}
