import { Page, Locator, expect } from "@playwright/test";
import { AssetManagementTab } from "./Asset_Management_Tab";

import { AssetHelper } from "../utils/AssetHelpers";

export class AssetEnrollment extends AssetManagementTab {
    public assetEnrollmentSubtab: Locator;
    public assetEnrollmentHeader: Locator;
    public assetEnrollmentTabs: Locator;
    public createAssetTabs: Locator;
    public createAssetTabsDetails: string[];
    public submitButton: Locator;
    public assetType: Locator;
    public assetTypeLocator: Locator;
    public superOwnerLocator: Locator;
    public ownerLocator: Locator;
    public model: Locator;
    public manufacturer: Locator;
    public serialNumber: Locator;
    public purchaseCost: Locator;
    public validationMessage: Locator;
    public warranty: Locator;
    public warrantyYear: Locator;
    public calendar: Locator;
    public comment: Locator;
    public bulkAsset: Locator;
    public fileInputSelector: Locator
    public bulkAssetHeader: Locator
    public chooseButton: Locator;
    public successPopup: Locator;
    public cancelButton: Locator;
    public assetTypeRequest: Locator;
    public assetTypeRequestColumn: Locator;
    public createAssetTypeButton: Locator;
    public createAssetTypePopupHeader: Locator;
    public createAssetTypePopupLabel: Locator;
    public popupAssetNameField: Locator;
    public popupAssetCategory: Locator;
    public popupCancelButton: Locator;
    public popupCrossIcon: Locator;
    public popupMessage: Locator;
    public assetTypeName: Locator;
    public approveAssetTypeRequest: Locator;
    public viewButton: Locator;
    public actionDropdown: Locator;
    public assetTypeRow: Locator;
    public categoryRow: Locator
    public requestDateRow: Locator
    public approvedDateRow: Locator
    public commentRow: Locator
    public statusRow: Locator

    constructor(page: Page) {
        super(page);
        this.assetEnrollmentSubtab = page.locator("//a[text()='New Asset Enrollment']");
        this.assetEnrollmentHeader = page.locator(".d-flex.flex-column");
        this.assetEnrollmentTabs = page.locator(".nav.nav-tabs");
        this.createAssetTabs = page.locator("div>label");
        this.assetTypeLocator = this.page.locator("//select[@id = 'asset_list']");
        this.superOwnerLocator = this.page.locator("//select[@id = 'superOwner']");
        this.ownerLocator = this.page.locator("//select[@id = 'owner']");
        this.createAssetTabsDetails = [
            'Asset Type',
            'Model',
            'Super Owner',
            'Owner',
            'Manufacturer',
            'Serial Number',
            'Warranty',
            'Purchase Cost',
            'Purchase Date',
            'Comment'
        ];
        this.assetType = page.locator("select[id='asset_list']");
        this.model = page.locator("//input[@name = 'model']");
        this.manufacturer = page.locator("//input[@name = 'manufacture']");
        this.serialNumber = page.locator("//input[@name = 'serialNumber']");
        this.purchaseCost = page.locator("//div//input[@name = 'purchaseCost']");
        this.validationMessage = page.locator(".text-danger");
        this.warranty = page.locator("//input[@type = 'number']");
        this.warrantyYear = page.locator("#warrantyUnit");
        this.calendar = page.locator("//input[@type = 'date']");
        this.comment = page.locator("//textarea[@id = 'comment']");
        this.bulkAsset = page.locator("//button[@id = 'tab1-tab']");
        this.chooseButton = page.locator("//input[@type = 'file']");
        this.submitButton = page.locator("//button[@type = 'submit']");
        this.successPopup = page.locator(".modal-body");
        this.cancelButton = page.locator(".theme-button.bg-grey.mx-3.w-35");
        this.popupMessage = page.locator('div>ol');
        this.assetTypeRequest = page.locator("#tab2-tab");
        this.bulkAssetHeader = page.locator(".has-asterisk")
        this.fileInputSelector = page.locator("//input[@type = 'file']")
        this.assetTypeRequestColumn = page.locator("thead>tr>th");
        this.createAssetTypeButton = page.locator("(//button[@type= 'button'])[7]");
        this.createAssetTypePopupHeader = page.locator("#staticBackdropLabel");
        this.createAssetTypePopupLabel = page.locator(".col-md-4.pt-1");
        this.popupAssetNameField = page.locator("//input[@type = 'text']");
        this.popupAssetCategory = page.locator(":#assetCategory");
        this.popupCancelButton = page.locator("(//button[@type= 'button'])[6]");
        this.popupCrossIcon = page.locator(".btn-close");
        this.assetTypeName = page.locator("tr>td:nth-child(2)");
        this.approveAssetTypeRequest = page.locator("#tab3-tab");
        this.viewButton = page.locator('//div[@id="tab3"]//tbody/tr[1]/td[6]/a');
        this.actionDropdown = page.locator("#status");
        this.assetTypeRow = page.locator('tr>th:nth-child(2)')
        this.categoryRow = page.locator('tr>th:nth-child(3)')
        this.requestDateRow = page.locator('tr>th:nth-child(4)')
        this.approvedDateRow = page.locator('tr>th:nth-child(5)')
        this.commentRow = page.locator('tr>th:nth-child(6)')
        this.statusRow = page.locator('tr>th:nth-child(7)')


    }

    async navigateToNewAssetEnrollmet() {
        await this.assetEnrollmentSubtab.click();
    }

    async enrollment() {
        // TC_AM_058
        const assetTypeVisible = this.assetTypeLocator;
        expect(assetTypeVisible).toBeVisible()
        const assetTypeInnerText = await this.assetTypeLocator.innerText();
        const superOwnerVisible = this.superOwnerLocator;
        expect(superOwnerVisible).toBeVisible()
        const superOwnerInnerText = await this.superOwnerLocator.innerText();
        const ownerVisible = this.ownerLocator;
        expect(ownerVisible).toBeVisible()
        const ownerInnerText = await this.ownerLocator.innerText();

        if ((assetTypeVisible && assetTypeInnerText.trim()) && (superOwnerVisible && superOwnerInnerText.trim()) && (ownerVisible && ownerInnerText.trim()) !== "") {
            console.log('The select element is visible and the inner text is visible.');
        } else {
            console.log('The select element or inner text is not visible.');
        }
    }
    async clickOnSubmitButton() {
        await this.submitButton.click();
    }

    async SelectAssetType(ddvalue) {
        await this.assetType.click();
        await this.assetTypeLocator.selectOption({ label: ddvalue });
        let selectedoption = await this.assetTypeLocator.textContent();
        expect(this.assetTypeLocator.isVisible()).toBeTruthy();
    }

    async fillAllMandatoryField(assetType, modelnumber, superOwner, owner, Manufracture, serialNumber) {
        await this.assetTypeLocator.selectOption({ label: assetType });
        await this.model.fill(modelnumber);   // Try to enter only numbers
        await this.superOwnerLocator.selectOption({ label: superOwner });
        await this.ownerLocator.selectOption({ label: owner });
        await this.manufacturer.fill(Manufracture);
        await this.serialNumber.fill(serialNumber);
    }
    async fillModelNumber(modelnumber) {
        await this.model.fill(modelnumber)
    }
    async selectSuperOwner(ddvalue) {
        await this.superOwnerLocator.selectOption({ label: ddvalue });
    }
    async selectOwner(ddvalue) {
        await this.ownerLocator.selectOption({ label: ddvalue });

    }
    async fillManufracture(value) {
        await this.manufacturer.fill(value);

    }
    async fillSerialNumber(uniqueSerial) {

        await this.serialNumber.fill(uniqueSerial.toString());

    }

    async fillWarrantyYear(input) {
        await this.warranty.fill(input);

    }

    async fillPurchase(input) {

        await this.purchaseCost.fill(input)
    }


    async navigateToBulkCreateAsset() {
        await this.bulkAsset.click();
    }

    async navigateToAssetTypeRequest() {
        await this.assetTypeRequest.click();
        await this.waitforLoaderToDisappear();

    }

    async verifyAllAssetTypeRequestColumnsVisible() {
        const columnCount = await this.assetTypeRequestColumn.count();
        for (let i = 0; i < columnCount; i++) {
            const column = await this.assetTypeRequestColumn.nth(i);
            await expect(column).toBeVisible();
        }
    }

    async clickOnCreateAssetTypeButton() {
        await this.createAssetTypeButton.click();

    }
    async clickOnPopUpCrossIcon() {
        await this.popupCrossIcon.click();
    }
    async clickOnPopUpCancelButton() {
        await this.popupCancelButton.click();
    }

    async clickAssetTypeHeader() {
        await this.page.locator(`tr>th:nth-child(2)`).click();
    }
    async clickcategoryHeader() {
        await this.page.locator(`tr>th:nth-child(3)`).click();
    }
    async clickRequestDateHeader() {
        await this.page.locator(`tr>th:nth-child(4)`).click();
    }
    async clickApprovedDateHeader() {
        await this.page.locator(`tr>th:nth-child(5)`).click();
    }
    async clickCommentHeader() {
        await this.page.locator(`tr>th:nth-child(6)`).click();
    }
    async clickStatusHeader() {
        await this.page.locator(`tr>th:nth-child(7)`).click();
    }

    async navigateToApproveAssetTypeRequest() {
        await this.approveAssetTypeRequest.click();
        await this.waitforLoaderToDisappear();
    }

    async clickOnViewButton() {
        await this.viewButton.click();
    }

    async verifyNoAssetTypeRequestsExist() {
        const noRecordLocator = this.page.locator(".fs-4");
        if (await noRecordLocator.isVisible()) {
            const noRecordText = await noRecordLocator.textContent();
            expect(noRecordText?.trim()).toEqual("No records available");
        }
    }
    async AssetTypeRequestAndVerifyStatus(option: string) {
        const name = await this.page.locator("(//table[@class='resume custom'])[1]/tbody/tr/td[2]").textContent();
        const trimmedName = name?.trim();
        console.log(`${option} name:`, trimmedName);
        await this.actionDropdown.click();
        await this.actionDropdown.selectOption({ value: option });
        await this.comment.fill("Thank you!!");
        return trimmedName;
    }
    async verifyAssetTypeStatusByName(expectedName: string, expectedStatus: string) {
        const count = await this.assetTypeName.count();
        let found = false;
        let actualStatus;
        for (let i = 0; i < count; i++) {
            const assetText = await this.assetTypeName.nth(i).textContent();
            if (assetText?.trim() === expectedName.trim()) {
                actualStatus = await this.page.locator(`(//table[contains(@class, 'resume')])[1]//tr[${i + 1}]/td[7]`).textContent();
                console.log(`Status for '${expectedName}':`, actualStatus);
                found = true;
                break;
            }
        }
        if (!found) {
            throw new Error(`Asset type '${expectedName}' not found in the list.`);
        }
        expect(actualStatus?.trim()).toEqual(expectedStatus);
    }

    async AssetTypeRequestAndVerifyDate(name) {
        const count = await this.assetTypeName.count();
        let found = false;
        let verifyDate;
        for (let i = 0; i < count; i++) {
            const assetText = await this.assetTypeName.nth(i).textContent();
            if (assetText?.trim() === name) {
                verifyDate = await this.page.locator(`(//table[contains(@class, 'resume')])[1]//tr[${i + 1}]/td[5]`).textContent();
                console.log(` Date : - `, verifyDate);
                found = true;
                break;
            }
        }
        return { verifyDate, found };
    }
    async verifyAssetTypeApprovedDateIsToday(verifyDate, found: boolean) {
        const now = new Date();
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        }).format(now);

        console.log(formattedDate);
        expect(verifyDate).toEqual(formattedDate);
        if (!found) {
            console.log("Name not found in the list.");
        }
    }

    async approveAssetTypeRequestNoRecord() {
        if (await this.page.locator(".fs-4").isVisible()) {
            const noRecordText = await this.page.locator(".fs-4").textContent();
            console.log("No records available");
            expect(noRecordText).toEqual("No records available");
            return;
        } else {
            console.log("Assets are Present");
        }
    }


    async verifyAssetTypeIsPresentInList(name: string) {
        // Wait for the list container or elements to be visible first
        await this.assetTypeName.first().waitFor({ state: 'visible' });

        const names = new Set<string>();
        const count = await this.assetTypeName.count();

        for (let i = 0; i < count; i++) {
            // Wait for each element to be visible before accessing text
            await this.assetTypeName.nth(i).waitFor({ state: 'visible' });
            const text = await this.assetTypeName.nth(i).textContent();
            if (text) {
                names.add(text.trim());
            }
        }
        expect(names).toContain(name);
    }




    async approveAssetTypeRequestRejected() {
        // TC_AM_142

        await this.page.waitForTimeout(2000);
        await this.approveAssetTypeRequest.click();
        await this.waitforLoaderToDisappear();
        await this.viewButton.click();

        await this.actionDropdown.selectOption({ value: 'REJECTED' });
        await this.comment.fill("Sorry !!");
        await this.submitButton.click();

        console.log(await this.page.locator(".Toastify__toast-body").textContent());
        await this.page.locator(".Toastify__toast-body").isVisible();
    }




    async AssetTypeRequestCommentApprove(option, customComment) {
        const name = await this.page.locator("(//table[@class='resume custom'])[1]/tbody/tr/td[2]").textContent();
        const trimmedName = name?.trim();
        console.log("Asset Name for", option, ":", trimmedName);

        await this.actionDropdown.selectOption({ value: option });

        const comment = customComment || "Thank you for confirmation !!";
        await this.comment.fill(comment);

        return { option, comment };
    }

    async verifyAssetStatusByComment(expectedStatus, comment) {
        const rowCount = await this.assetTypeName.count();
        let found = false;
        let actualStatus;

        for (let i = 0; i < rowCount; i++) {
            const commentText = await this.page
                .locator(`(//table[contains(@class, 'resume')])[1]//tr[${i + 1}]/td[6]`)
                .textContent();

            if (commentText?.trim() === comment) {
                actualStatus = await this.page
                    .locator(`(//table[contains(@class, 'resume')])[1]//tr[${i + 1}]/td[7]`)
                    .textContent();
                console.log(`Found comment: "${comment}" with status: "${actualStatus}"`);
                found = true;
                break;
            }
        }

        if (found) {
            expect(actualStatus?.trim()).toEqual(expectedStatus);
        } else {
            console.log(`No asset found with comment "${comment}"`);
            throw new Error(`Comment "${comment}" not found in the table.`);
        }
    }





    async approveAssetTypeRequestCommentRejected() {
        // TC_AM_145

        await this.page.waitForTimeout(2000);
        await this.approveAssetTypeRequest.click();
        await this.waitforLoaderToDisappear();
        await this.viewButton.click();
        const name = await this.page.locator("(//table[@class='resume custom'])[1]/tbody/tr/td[2]").textContent();
        const trimmedName = name?.trim();
        console.log("Reject name:", trimmedName);
        await this.actionDropdown.selectOption({ value: 'REJECTED' });
        const comment = "Thank you for conformation !!";
        await this.comment.fill(comment);
        await this.submitButton.click();

        await this.page.waitForTimeout(5000);

        await this.assetTypeRequest.click();
        await this.page.waitForTimeout(5000);
        await this.waitforLoaderToDisappear();

        await this.page.waitForTimeout(2000);
        const count = await this.assetTypeName.count();
        console.log(count);
        let found = false;
        let status;
        for (let i = 0; i <= count; i++) {
            const assetText = await this.assetTypeName.nth(i).textContent();
            if (assetText?.trim() === name) {
                status = await this.page.locator(`(//table[contains(@class, 'resume')])[1]//tr[${i + 1}]/td[6]`).textContent();
                console.log('Status : - ', status);
                found = true;
                break;
            }
        }
        expect(status).toEqual(comment);
        if (!found) {
            console.log("Comment Doesn't matched.");
        }
    }

    async correctRequestDateAppear() {
        // TC_AM_146
        const currentDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        });

        console.log(currentDate);

        await this.page.waitForTimeout(2000);
        await this.assetTypeRequest.click();
        await this.waitforLoaderToDisappear();
        await this.page.waitForTimeout(3000);
        await this.createAssetTypeButton.click();
        const name = generateRandomString(8);
        await this.popupAssetNameField.fill(name);
        await this.comment.fill(name);
        await this.submitButton.click();
        await this.page.waitForTimeout(6000);
        await this.approveAssetTypeRequest.click();

        await this.page.waitForTimeout(5000);
        const count = await this.assetTypeName.count();
        let found = false;
        let assetCreateDate;
        for (let i = 0; i <= count; i++) {
            const assetText = await this.assetTypeName.nth(i).textContent();
            if (assetText?.trim() === name) {
                assetCreateDate = await this.page.locator(`((//table[contains(@class, 'resume')])[2]//tr[${i + 1}])/td[4]`).textContent();
                console.log('AssetCreateDate : - ', assetCreateDate);
                found = true;
                break;
            }
        }
        expect(assetCreateDate).toEqual(currentDate);
        if (!found) {
            console.log("Date Doesn't matched.");
        }
    }





    async approveAssetTypeSorting() {
        // TC_AM_147

        await this.page.waitForTimeout(2000);
        await this.approveAssetTypeRequest.click();
        await this.waitforLoaderToDisappear();
        await this.page.waitForTimeout(3000);
        const beforeSorting = await this.page.locator('tr>td:nth-child(2)').allTextContents();

        // Click to sort in ascending order
        await this.page.locator(`((//table[contains(@class, 'resume')])[2])//tr/th[2]`).click();
        await this.page.waitForTimeout(1000);
        const afterSortingAsc = await this.page.locator(`tr>td:nth-child(2)`).allTextContents();
        let isSortedAsc = true;
        for (let i = 0; i < afterSortingAsc.length - 1; i++) {
            if (Number(afterSortingAsc[i]) > Number(afterSortingAsc[i + 1])) {
                isSortedAsc = false;
                break;
            }
        }
        expect(isSortedAsc).toBe(true);

        // Click again to sort in descending order
        await this.page.locator(`((//table[contains(@class, 'resume')])[2])//tr/th[2]`).click();
        await this.page.waitForTimeout(1000);
        const afterSortingDesc = await this.page.locator(`tr>td:nth-child(2)`).allTextContents();

        let isSortedDesc = true;
        for (let i = 0; i < afterSortingDesc.length - 1; i++) {
            if (Number(afterSortingDesc[i]) < Number(afterSortingDesc[i + 1])) {
                isSortedDesc = false;
                break;
            }
        }
        expect(isSortedDesc).toBe(true);
    }
}
