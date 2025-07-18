import { Page, Locator, expect } from "@playwright/test";
import { AssetManagementTab } from "./Asset_Management_Tab";

import { generateRandomString } from "./Employee_Management"

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

    async validBulkAssetFileFileUpload() {

    }



    async bulkCreateAsset() {


    

        // TC_AM_092

        // TC_AM_093
       

        // TC_AM_094
       

        // TC_AM_095
        await this.page.locator(".btn-close").click();
        await this.page.waitForTimeout(1000);
        filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\Model_Column.xlsx';
        await this.page.setInputFiles(fileInputSelector, filePath);
        await this.page.waitForSelector(fileInputSelector, { state: 'attached' });

        await this.submitButton.click();
        await this.popupMessage.waitFor({ state: 'visible' });
        console.log(await this.page.locator('div>ol').allInnerTexts());
        await this.page.locator(".btn-close").click();

        // TC_AM_096
        await this.page.waitForTimeout(2000);
        filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\Owner_Column.xlsx';
        await this.page.setInputFiles(fileInputSelector, filePath);
        await this.page.waitForSelector(fileInputSelector, { state: 'attached' });
        await this.submitButton.click();  // Submit the last file
        await this.popupMessage.waitFor({ state: 'visible' });
        console.log(await this.page.locator('div>ol').allInnerTexts());
        await this.page.locator(".btn-close").click();

        // TC_AM_097
        await this.page.waitForTimeout(2000);
        filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\Manufracture.xlsx';
        await this.page.setInputFiles(fileInputSelector, filePath);
        await this.page.waitForSelector(fileInputSelector, { state: 'attached' });
        await this.submitButton.click();
        await this.popupMessage.waitFor({ state: 'visible' });
        console.log(await this.page.locator('div>ol').allInnerTexts());
        await this.page.locator(".btn-close").click();

        // TC_AM_098
        // await this.page.waitForTimeout(2000);
        // filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\SerialNumber.xlsx';
        // await this.page.setInputFiles(fileInputSelector, filePath);
        // await this.page.waitForSelector(fileInputSelector, { state: 'attached' });
        // await this.submitButton.click();
        // await this.popupMessage.waitFor({ state: 'visible' });
        // console.log(await this.page.locator('div>ol').allInnerTexts());
        // await this.page.locator(".btn-close").click();

        // TC_AM_099
        // await this.page.waitForTimeout(2000);
        // filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\Warranty.xlsx';
        // await this.page.setInputFiles(fileInputSelector, filePath);
        // await this.page.waitForSelector(fileInputSelector, { state: 'attached' });
        // await this.submitButton.click();
        // await this.popupMessage.waitFor({ state: 'visible' });
        // console.log(await this.page.locator('div>ol').allInnerTexts());
        // await this.page.locator(".btn-close").click();

        // TC_AM_100
        // await this.page.waitForTimeout(2000);
        // filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\Purchase.xlsx';
        // await this.page.setInputFiles(fileInputSelector, filePath);
        // await this.page.waitForSelector(fileInputSelector, { state: 'attached' });
        // await this.submitButton.click();
        // await this.popupMessage.waitFor({ state: 'visible' });
        // console.log(await this.page.locator('div>ol').allInnerTexts());
        // await this.page.locator(".btn-close").click();

        // TC_AM_101
        // await this.page.waitForTimeout(2000);
        // filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\Processor.xlsx';
        // await this.page.setInputFiles(fileInputSelector, filePath);
        // await this.page.waitForSelector(fileInputSelector, { state: 'attached' });
        // await this.submitButton.click();  // Submit the last file
        // await this.popupMessage.waitFor({ state: 'visible' });
        // console.log(await this.page.locator('div>ol').allInnerTexts());
        // await this.page.locator(".btn-close").click();

        // TC_AM_102
        await this.page.waitForTimeout(2000);
        filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\superOwner.xlsx';
        await this.page.setInputFiles(fileInputSelector, filePath);
        await this.page.waitForSelector(fileInputSelector, { state: 'attached' });
        await this.submitButton.click();  // Submit the last file
        await this.popupMessage.waitFor({ state: 'visible' });
        console.log(await this.page.locator('div>ol').allInnerTexts());
        await this.page.locator(".btn-close").click();

        // TC_AM_106
        filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\ExistingSerialNumber.xlsx';
        await this.page.setInputFiles(fileInputSelector, filePath);
        await this.page.waitForSelector(fileInputSelector, { state: 'attached' });
        await this.submitButton.click();  // Submit the last file
        await this.popupMessage.waitFor({ state: 'visible' });
        console.log(await this.page.locator('div>ol').allInnerTexts());
        await this.page.locator(".btn-close").click();

        // TC_AM_115
        filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\NonExistingAssetType.xlsx';
        await this.page.setInputFiles(fileInputSelector, filePath);
        await this.page.waitForSelector(fileInputSelector, { state: 'attached' });
        await this.submitButton.click();  // Submit the last file
        await this.popupMessage.waitFor({ state: 'visible' });
        console.log(await this.page.locator('div>ol').allInnerTexts());
        await this.page.locator(".btn-close").click();

        // TC_AM_123
        filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\NoUnit.xlsx';
        await this.page.setInputFiles(fileInputSelector, filePath);
        await this.page.waitForSelector(fileInputSelector, { state: 'attached' });
        await this.submitButton.click();  // Submit the last file
        await this.popupMessage.waitFor({ state: 'visible' });
        console.log(await this.page.locator('div>ol').allInnerTexts());
        await this.page.locator(".btn-close").click();
    }

    async assetTypeRequests() {
        // TC_AM_124

        await this.page.waitForTimeout(2000);
        await this.assetTypeRequest.click();
        await this.waitforLoaderToDisappear();
        const columnCount = await this.assetTypeRequestColumn.count();
        for (let i = 0; i < columnCount; i++) {
            const column = await this.assetTypeRequestColumn.nth(i);
            await expect(column).toBeVisible();
        }
        await expect(this.createAssetTypeButton).toBeVisible();
    }

    async assetTypeRequestCreateAssetTypeRequest() {
        // TC_AM_125
        await this.assetTypeRequests();
        await this.page.waitForTimeout(2000);
        await this.createAssetTypeButton.click();
        await this.page.waitForTimeout(500);
        const header = await this.createAssetTypePopupHeader.textContent();
        expect(header).toEqual('Create Asset Type');
        const labelCount = await this.createAssetTypePopupLabel.count();
        for (let i = 0; i < labelCount; i++) {
            const label = await this.createAssetTypePopupLabel.nth(i);
            await expect(label).toBeVisible();
        }
    }

    async assetTypeRequestEmptyField() {
        // TC_AM_126 &  TC_AM_129 (I combine both test cases)
        // Empty Asset Name 
        await this.assetTypeRequestCreateAssetTypeRequest();
        await this.submitButton.click();
        const assetNameField = this.popupAssetNameField;
        const tooltipMessage = await assetNameField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Asset Name tooltip message:', tooltipMessage);
        expect(tooltipMessage).toBe('Please fill out this field.');

        // Empty Comment Field
        await assetNameField.fill(generateRandomString(5));
        await this.page.waitForTimeout(500);
        await this.submitButton.click();
        const commentField = this.comment;
        const commentTooltipMessage = await commentField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Comment Field tooltip message:', commentTooltipMessage);
        expect(commentTooltipMessage).toBe('Please fill out this field.');
    }

    async assetTypeRequestAssetNameFieldMoreThan40Characters() {
        // TC_AM_127
        await this.assetTypeRequestCreateAssetTypeRequest();
        await this.page.waitForTimeout(2000);
        try {
            const assetNameField = this.popupAssetNameField;
            await assetNameField.fill(generateRandomString(5));
            const text = generateRandomString(41);
            await this.comment.fill(text);
            await this.submitButton.click();
            const message = await this.validationMessage.textContent();
            console.log(message);
            await expect(this.validationMessage).toBeVisible();
            await expect(message).toEqual("Asset name must not exceed 40 characters");
        } catch (error) {
            console.error('Validation check failed:', error);
        }
    }

    async assetTypeRequestAssetNameFieldNumberSpecialChar() {
        // TC_AM_128
        await this.assetTypeRequestCreateAssetTypeRequest();
        await this.page.waitForTimeout(2000);
        try {
            const input = '@#@#@@#@'; // Special Characters
            await this.popupAssetNameField.fill(input);
            await this.comment.fill('Abcdef');
            await this.submitButton.click();
            const message = await this.validationMessage.textContent();
            await expect(this.validationMessage).toBeVisible();
            await expect(message).toEqual("Entry cannot contain only numbers and special characters");
        } catch (error) {
            console.error('Validation check failed:', error);
        }
        try {
            const input = '1111'; // only Numbers
            await this.popupAssetNameField.fill(input);
            await this.comment.fill('Abcdef');
            await this.submitButton.click();
            const message = await this.validationMessage.textContent();
            await expect(this.validationMessage).toBeVisible();
            await expect(message).toEqual("Entry cannot contain only numbers and special characters");
        } catch (error) {
            console.error('Validation check failed:', error);
        }
    }

    async createAssetTypeCrossIcon() {
        // TC_AM_130
        await this.assetTypeRequestCreateAssetTypeRequest();
        await this.popupCrossIcon.click();
        await this.page.waitForTimeout(1000);
        await expect(this.createAssetTypePopupHeader).toBeHidden();
    }

    async createAssetTypeCancelButton() {
        // TC_AM_131
        await this.assetTypeRequestCreateAssetTypeRequest();
        await this.popupCancelButton.click();
        await this.page.waitForTimeout(1000);
        await expect(this.createAssetTypePopupHeader).toBeHidden();
    }

    async createAssetTypeCreated() {
        // TC_AM_132
        await this.assetTypeRequestCreateAssetTypeRequest();
        const name = generateRandomString(8);
        await this.popupAssetNameField.fill(name);
        await this.comment.fill(name);
        await this.submitButton.click();
        await this.page.waitForTimeout(6000);

        const names = new Set<string>();
        const count = await this.assetTypeName.count();
        for (let i = 0; i < count; i++) {
            const text = await this.assetTypeName.nth(i).textContent();
            if (text) {
                names.add(text.trim());
            }
        }
        expect(names).toContain(name);
    }

    async createAssetTypeSorting() {
        // TC_AM_133
        await this.assetTypeRequests();
        await this.page.waitForTimeout(3000);
        const beforeSorting = await this.page.locator('tr>td:nth-child(2)').allTextContents();

        // Click to sort in ascending order
        await this.page.locator(`tr>th:nth-child(2)`).click();
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
        await this.page.locator(`tr>th:nth-child(2)`).click();
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

    async assetTypeRequestStatusApproveStatus() {
        // TC_AM_134   Step-7

        await this.page.waitForTimeout(2000);
        await this.approveAssetTypeRequest.click();
        await this.page.waitForTimeout(4000);
        if (await this.page.locator(".fs-4").isVisible()) {
            const noRecordText = await this.page.locator(".fs-4").textContent();
            expect(noRecordText).toEqual("No records available");
            return;
        }
        await this.viewButton.click();
        await this.page.waitForTimeout(1000);
        const name = await this.page.locator("(//table[@class='resume custom'])[1]/tbody/tr/td[2]").textContent();
        const trimmedName = name?.trim();
        console.log("Approved name:", trimmedName);

        await this.page.waitForTimeout(1000);
        await this.actionDropdown.click();
        await this.actionDropdown.selectOption({ value: 'APPROVED' });
        await this.page.waitForTimeout(2000);
        await this.comment.fill("Thank you!!");
        await this.page.locator("//button[@type = 'submit']").click();
        await this.page.waitForTimeout(1000);
        await this.assetTypeRequest.click();
        await this.page.waitForTimeout(5000);
        await this.waitforLoaderToDisappear();

        const count = await this.assetTypeName.count();
        let found = false;
        let status;
        for (let i = 0; i < count; i++) {
            const assetText = await this.assetTypeName.nth(i).textContent();
            if (assetText?.trim() === name) {
                status = await this.page.locator(`(//table[contains(@class, 'resume')])[1]//tr[${i + 1}]/td[7]`).textContent();
                console.log('Status : - ', status);
                found = true;
                break;
            }
        }
        expect(status).toEqual("APPROVED");
        if (!found) {
            console.log("Name not found in the list.");
        }
    }

    async assetTypeRequestStatusRejectStatus() {
        // TC_AM_134 Step-14

        await this.page.waitForTimeout(2000);
        await this.approveAssetTypeRequest.click();
        await this.page.waitForTimeout(4000);
        if (await this.page.locator(".fs-4").isVisible()) {
            const noRecordText = await this.page.locator(".fs-4").textContent();
            expect(noRecordText).toEqual("No records available");
            return;
        }
        await this.viewButton.click();
        await this.page.waitForTimeout(1000);
        const name = await this.page.locator("(//table[@class='resume custom'])[1]/tbody/tr/td[2]").textContent();
        const trimmedName = name?.trim();
        console.log("Rejected name:", trimmedName);

        await this.page.waitForTimeout(1000);
        await this.actionDropdown.click();
        await this.actionDropdown.selectOption({ value: 'REJECTED' });
        await this.page.waitForTimeout(2000);
        await this.comment.fill("Thank you!!");
        await this.page.locator("//button[@type = 'submit']").click();
        await this.page.waitForTimeout(1000);
        await this.assetTypeRequest.click();
        await this.page.waitForTimeout(5000);
        await this.waitforLoaderToDisappear();

        const count = await this.assetTypeName.count();
        let found = false;
        let status;
        for (let i = 0; i < count; i++) {
            const assetText = await this.assetTypeName.nth(i).textContent();
            if (assetText?.trim() === name) {
                status = await this.page.locator(`(//table[contains(@class, 'resume')])[1]//tr[${i + 1}]/td[7]`).textContent();
                console.log('Status : - ', status);
                found = true;
                break;
            }
        }
        expect(status).toEqual("REJECTED");
        if (!found) {
            console.log("Name not found in the list.");
        }
    }

    async assetTypeRequestApproveDate() {
        // TC_AM_135 Step-7

        await this.page.waitForTimeout(2000);
        await this.approveAssetTypeRequest.click();
        await this.page.waitForTimeout(4000);
        if (await this.page.locator(".fs-4").isVisible()) {
            const noRecordText = await this.page.locator(".fs-4").textContent();
            expect(noRecordText).toEqual("No records available");
            return;
        }
        await this.viewButton.click();
        await this.page.waitForTimeout(1000);
        const name = await this.page.locator("(//table[@class='resume custom'])[1]/tbody/tr/td[2]").textContent();
        const trimmedName = name?.trim();
        console.log("Approved name:", trimmedName);

        await this.page.waitForTimeout(1000);
        await this.actionDropdown.click();
        await this.actionDropdown.selectOption({ value: 'APPROVED' });
        await this.page.waitForTimeout(2000);
        await this.comment.fill("Thank you!!");
        await this.page.locator("//button[@type = 'submit']").click();
        await this.page.waitForTimeout(1000);
        await this.assetTypeRequest.click();
        await this.page.waitForTimeout(5000);
        await this.waitforLoaderToDisappear();

        const count = await this.assetTypeName.count();
        let found = false;
        let approveDate;
        for (let i = 0; i < count; i++) {
            const assetText = await this.assetTypeName.nth(i).textContent();
            if (assetText?.trim() === name) {
                approveDate = await this.page.locator(`(//table[contains(@class, 'resume')])[1]//tr[${i + 1}]/td[5]`).textContent();
                console.log('Approved Date : - ', approveDate);
                found = true;
                break;
            }
        }
        const now = new Date();
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        }).format(now);

        console.log(formattedDate);
        expect(approveDate).toEqual(formattedDate);
        if (!found) {
            console.log("Name not found in the list.");
        }
    }

    async assetTypeRequestRejectDate() {
        // TC_AM_135 Step-14

        await this.page.waitForTimeout(2000);
        await this.approveAssetTypeRequest.click();
        await this.page.waitForTimeout(4000);
        if (await this.page.locator(".fs-4").isVisible()) {
            const noRecordText = await this.page.locator(".fs-4").textContent();
            expect(noRecordText).toEqual("No records available");
            return;
        }
        await this.viewButton.click();
        await this.page.waitForTimeout(1000);
        const name = await this.page.locator("(//table[@class='resume custom'])[1]/tbody/tr/td[2]").textContent();
        const trimmedName = name?.trim();
        console.log("Reject name:", trimmedName);

        await this.page.waitForTimeout(1000);
        await this.actionDropdown.click();
        await this.actionDropdown.selectOption({ value: 'REJECTED' });
        await this.page.waitForTimeout(2000);
        await this.comment.fill("Thank you!!");
        await this.page.locator("//button[@type = 'submit']").click();
        await this.page.waitForTimeout(1000);
        await this.assetTypeRequest.click();
        await this.page.waitForTimeout(5000);
        await this.waitforLoaderToDisappear();

        const count = await this.assetTypeName.count();
        let found = false;
        let rejectedDate;
        for (let i = 0; i < count; i++) {
            const assetText = await this.assetTypeName.nth(i).textContent();
            if (assetText?.trim() === name) {
                rejectedDate = await this.page.locator(`(//table[contains(@class, 'resume')])[1]//tr[${i + 1}]/td[5]`).textContent();
                console.log('Reject Date : - ', rejectedDate);
                found = true;
                break;
            }
        }
        const now = new Date();
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        }).format(now);

        console.log(formattedDate);
        expect(rejectedDate).toEqual(formattedDate);
        if (!found) {
            console.log("Name not found in the list.");
        }
    }

    async approveAssetTypeRequestNoRecord() {

        await this.page.waitForTimeout(2000);
        await this.approveAssetTypeRequest.click();
        if (await this.page.locator(".fs-4").isVisible()) {
            const noRecordText = await this.page.locator(".fs-4").textContent();
            console.log("No records available");
            expect(noRecordText).toEqual("No records available");
            return;
        } else {
            console.log("Assets are Present");
        }
    }

    async approveAssetTypeRequestVerification() {

        await this.page.waitForTimeout(2000);

        await this.assetTypeRequest.click();
        await this.createAssetTypeButton.click();
        await this.page.waitForTimeout(500);

        const name = generateRandomString(8);
        await this.popupAssetNameField.fill(name);
        await this.comment.fill(name);
        await this.submitButton.click();
        await this.page.waitForTimeout(6000);

        const createdNames = new Set<string>();
        const createdCount = await this.assetTypeName.count();
        for (let i = 0; i < createdCount; i++) {
            const text = await this.assetTypeName.nth(i).textContent();
            if (text) {
                createdNames.add(text.trim());
            }
        }

        expect(createdNames).toContain(name);

        await this.approveAssetTypeRequest.click();
        await this.page.waitForTimeout(3000);
        const approvedNames = new Set<string>();
        const approveCount = await this.assetTypeName.count();
        for (let i = 0; i < approveCount; i++) {
            const text = await this.assetTypeName.nth(i).textContent();
            if (text) {
                approvedNames.add(text.trim());
            }
        }
        expect(approvedNames).toContain(name);
    }

    async approveAssetTypeRequestApproved() {
        // TC_AM_141

        await this.page.waitForTimeout(2000);
        await this.approveAssetTypeRequest.click();
        await this.waitforLoaderToDisappear();
        await this.viewButton.click();
        await this.submitButton.click();

        const actionDropdown = this.actionDropdown;
        const tooltipMessage = await actionDropdown.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log(tooltipMessage);

        expect(tooltipMessage).toBe('Please select an item in the list.');

        await this.page.waitForTimeout(1000);

        await this.actionDropdown.selectOption({ value: 'APPROVED' });

        await this.submitButton.click();

        const commentField = this.comment;
        const commentTooltipMessage = await commentField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log(commentTooltipMessage);

        expect(commentTooltipMessage).toBe('Please fill out this field.');

        await this.page.waitForTimeout(1000);

        await this.comment.fill("Thank you !!");

        await this.submitButton.click();
        console.log(await this.page.locator(".Toastify__toast-body").textContent());
        await this.page.locator(".Toastify__toast-body").isVisible();
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

    async approveAssetTypeRequestCross() {
        // TC_AM_143

        await this.page.waitForTimeout(2000);
        await this.approveAssetTypeRequest.click();
        await this.waitforLoaderToDisappear();
        await this.viewButton.click();
        await this.popupCrossIcon.click();
        await this.page.waitForTimeout(2000);
        await expect(this.page.locator("#staticBackdropLabel")).toBeHidden();
    }

    async approveAssetTypeRequestCancel() {
        // TC_AM_144

        await this.page.waitForTimeout(2000);
        await this.approveAssetTypeRequest.click();
        await this.waitforLoaderToDisappear();
        await this.page.waitForSelector('//div[@id="tab3"]//tbody/tr[1]/td[6]/a');
        await this.viewButton.click();
        await this.page.waitForTimeout(500);
        await this.popupCancelButton.click();
        await this.page.waitForTimeout(3000);
        await expect(this.page.locator("#staticBackdropLabel")).toBeHidden();
    }

    async approveAssetTypeRequestCommentApprove() {
        // TC_AM_145

        await this.page.waitForTimeout(2000);
        await this.approveAssetTypeRequest.click();
        await this.waitforLoaderToDisappear();
        await this.viewButton.click();
        const name = await this.page.locator("(//table[@class='resume custom'])[1]/tbody/tr/td[2]").textContent();
        const trimmedName = name?.trim();
        console.log("Approve name:", trimmedName);
        await this.actionDropdown.selectOption({ value: 'APPROVED' });
        const comment = "Thank you for conformation !!";
        await this.comment.fill(comment);
        await this.submitButton.click();

        await this.page.waitForTimeout(5000);

        await this.assetTypeRequest.click();
        await this.page.waitForTimeout(5000);
        await this.waitforLoaderToDisappear();

        const count = await this.assetTypeName.count();
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
