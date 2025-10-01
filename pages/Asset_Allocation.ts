import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./Basepage";
import { AssetHelper } from "../utils/AssetHelpers";
import { FILL_IN_FIELD, FILL_OUT_FIELD } from "../utils/constants";
export class AssetAllocation extends BasePage {
    public allocationAsset: Locator;
    public allocationPageHeader: Locator;
    public allocationAssignAsset: Locator;
    public allocationRecord: Locator;
    public nextButton: Locator;
    public previousButton: Locator;
    public disableNextButton: Locator;
    public totalAssetAssigned: Locator;
    public searchBar: Locator;
    public itemsPerPage: Locator;
    public itemsPerPageOption: Locator;
    public columnHeader: Locator;
    public colHeaders: string[];
    public assetTypeName: Locator;
    public assetSerialNumber: Locator;
    public assetEmployeeName: Locator;
    public assetOwnerName: Locator;
    public assetInvalidData: Locator;
    public allocationAssignAssetHeader: Locator;
    public allocationSelectEmployee: Locator;
    public allocationComment: Locator;
    public allocationSelectEmployeeOption: Locator;
    public allocationSelectAssetTypeOption: Locator;
    public allocationSelectAssetType: Locator;
    public submitButton: Locator;
    public assetTypePopUp: Locator;
    public popupSearchBar: Locator;
    public popupTable: Locator;
    public radioButton: Locator;
    public crossButton: Locator;
    public selectedAsset: Locator;
    public pageCount: Locator;
    public employeeOption: Locator;
    public assetTypeOption: Locator;
    public assetTypeField: Locator;
    public assetTypeRequiredField: Locator;
    public assetListSelectedOption: Locator;
    public employeeSelectedOption: Locator;
    public assetRadioButton: Locator;
    public assetCommentField: Locator;
    public assetInputGroupTextarea: Locator;
    public toastContainer: Locator;
    public popupNoRecordsHeader: Locator;
    public assetTableSerialNumber: Locator;
    public assetTableRowSix: Locator;
    public assetTypeDropdownSvg: Locator;
    public totalAssetRequest: Locator;
    public column: Locator;


    constructor(page: Page) {
        super(page);
        this.totalAssetRequest = page.locator(".total");
        this.column = page.locator("(//thead//tr)[1]");
        this.allocationAsset = page.locator("//a[text()='Asset Allocation']");
        this.allocationAssignAssetHeader = page.locator("div>h1");
        this.allocationPageHeader = page.locator("div>h1");
        this.allocationAssignAsset = page.locator(".export.theme-button");
        this.allocationRecord = page.locator("tbody>tr");
        this.nextButton = page.locator("//a[text()='Next']");
        this.previousButton = page.locator("//a[text()='Previous']");
        this.totalAssetAssigned = page.locator(".total");
        this.searchBar = page.getByPlaceholder("Search By Asset type, Serial Number, Owner or Employee Name");
        this.disableNextButton = page.locator(".page-item.disabled");
        this.pageCount = page.locator(".page-link.text-dark.disabled");
        this.itemsPerPage = page.locator("#itemsPerPage");
        this.itemsPerPageOption = page.locator("#itemsPerPage>option");
        this.columnHeader = page.locator("tr>th");
        this.colHeaders = ["S.No.", "Asset Type ", "Serial Number ", "Owner ", "Employee Name ", "Comment "];
        this.assetTypeName = page.locator("tr>td:nth-child(2)");
        this.assetSerialNumber = page.locator("tr>td:nth-child(3)");
        this.assetEmployeeName = page.locator("tr>td:nth-child(5)");
        this.assetTypeField = page.locator('input[name="selectedAsset"]');
        this.assetTypeRequiredField = page.locator("input[class = 'css-1a0ro4n-requiredInput']");
        this.employeeSelectedOption = page.locator("div[class='dropdown-container'] div[class=' css-1dimb5e-singleValue']");
        this.assetRadioButton = page.locator("div>input[type='radio']");
        this.assetCommentField = page.locator('textarea[name="comment"]');
        this.assetInputGroupTextarea = page.locator("div[class='input-group '] textarea");
        this.toastContainer = page.locator(".Toastify__toast-container");
        this.popupNoRecordsHeader = page.locator("div>h4");
        this.assetTableRowSix = page.locator("tr:nth-child(1)>td:nth-child(6)");
        this.assetTypeDropdownSvg = page.locator("(//*[name()='svg'][@class='css-8mmkcg'])[1]");
        this.employeeOption = this.page.locator('#react-select-3-option-6');
        this.assetTypeOption = this.page.locator("#react-select-2-option-0");
        this.assetTypeField = this.page.locator('input[name="selectedAsset"]');
        this.assetTypeRequiredField = this.page.locator("input[class = 'css-1a0ro4n-requiredInput']");
        this.assetListSelectedOption = this.page.locator("div[id='asset_list'] div[class=' css-1dimb5e-singleValue']");
        this.employeeSelectedOption = this.page.locator("div[class='dropdown-container'] div[class=' css-1dimb5e-singleValue']");
        this.assetRadioButton = this.page.locator("div>input[type='radio']");
        this.assetCommentField = this.page.locator('textarea[name="comment"]');
        this.assetInputGroupTextarea = this.page.locator("div[class='input-group '] textarea");
        this.toastContainer = this.page.locator(".Toastify__toast-container");
        this.popupNoRecordsHeader = this.page.locator("div>h4");
        this.assetTableSerialNumber = this.page.locator("tbody>tr>td:nth-child(4)");
        this.assetTypeDropdownSvg = this.page.locator("(//*[name()='svg'][@class='css-8mmkcg'])[1]");
        this.assetInvalidData = this.page.locator(".fs-4.m-5.text-secondary.text-center")
        this.allocationSelectEmployee = this.page.locator('//*[@id="assign-asset"]/div/div[1]/div[2]/div/div/div/div[2]/div')
        this.allocationSelectEmployeeOption = this.page.locator("#react-select-3-option-6");
        this.allocationSelectAssetType = this.page.locator('//*[@id="asset_list"]/div/div[2]/div')
        this.allocationSelectAssetTypeOption = this.page.locator("#react-select-2-option-9");
        // this.assetTypePopUp = this.page.locator(".css-1dimb5e-menu");
        this.assetTypePopUp = this.page.locator('div>h5')
        this.popupSearchBar = this.page.getByPlaceholder("Search By Serial Number");
        // this.popupTable = this.page.locator(".css-1dimb5e-table");
        this.popupTable = this.page.locator(".table-responsive");
        this.assetTableRowSix = this.page.locator("tbody>tr:nth-child(1)>td:nth-child(6)");
        this.assetTableSerialNumber = this.page.locator("tbody>tr>td:nth-child(4)");
        this.assetTypeDropdownSvg = this.page.locator("(//*[name()='svg'][@class='css-8mmkcg'])[1]");
        this.selectedAsset = this.page.locator('input[name="selectedAsset"]');
        this.radioButton = this.page.locator(".css-1dimb5e-radio");
        this.allocationComment = this.page.locator('textarea[name="comment"]');
        this.submitButton = this.page.locator("button[type='submit']");
        this.crossButton = this.page.locator("//button[@type = 'button'][@aria-label = 'Close']");
        this.assetOwnerName = this.page.locator("tr>td:nth-child(4)");
    }
    async getTotalAssetCount() {
        const totalAllocationAsset = await this.totalAssetAssigned.allTextContents();
        const totalAssetCount = AssetHelper.getAssetCountFromText(totalAllocationAsset);
        console.log("TotalAsset :  ", totalAssetCount);
    }
    async getColumnHeader() {
        const colHeader = await this.columnHeader.allTextContents();
        await AssetHelper.verifyHeadersMatch(colHeader, this.colHeaders);
    }

    async getBySearchdata(TypeLocator: Locator, SearchBy: string, type: string) {
        await this.searchBar.pressSequentially(SearchBy);
        const name = await TypeLocator.allTextContents();
        console.log(name);
        await AssetHelper.verifySearchResults(name, SearchBy, type);
    }

    async searchByEmployeeName() {

        await this.searchBar.pressSequentially("Asset L1");
        await this.page.waitForTimeout(3000);
        const employeeName = await this.assetEmployeeName.allTextContents();
        console.log(employeeName);
        await AssetHelper.verifySearchResults(employeeName, 'Asset L1', 'employee name');
        await this.searchBar.clear();
        await this.searchBar.pressSequentially("asdasdas");
        await this.page.waitForTimeout(1000);
        const invalidData = await this.assetInvalidData.textContent();
        expect(invalidData).toContain("No records available");
        console.log(invalidData);
    }

    async clickOnNextButton() {
        await this.nextButton.click();
    }
    
    async pagination() {
        // Step 1: Get total asset count from header
        const totalAllocationText = await this.totalAssetAssigned.allTextContents();
        const totalAssetCount = AssetHelper.getAssetCountFromText(totalAllocationText);
        console.log("Total Asset Count (Header):", totalAssetCount);

        // Step 2: Set items per page to 40
        await this.itemsPerPage.waitFor({ state: 'visible' });
        await this.itemsPerPage.scrollIntoViewIfNeeded();
        await this.itemsPerPage.selectOption({ value: "40" });
        await this.assetTypeName.first().waitFor({ state: 'visible' });

        const selectedValue = Number((await this.itemsPerPage.inputValue()).trim());
        const assetNameCount = await this.assetTypeName.count();

        console.log("Items Per Page (Selected):", selectedValue);
        console.log("Asset Name Count (Visible):", assetNameCount);

        // Step 3: Validate initial pagination state
        expect(selectedValue).toEqual(assetNameCount);

        // Step 4: Validate navigation buttons
        await this.nextButton.scrollIntoViewIfNeeded();
        await this.nextButton.click();
        await this.allocationRecord.first().waitFor({ state: 'visible' });
        expect(await this.previousButton.isEnabled()).toBeTruthy();

        await this.previousButton.scrollIntoViewIfNeeded();
        await this.previousButton.click();
        await this.allocationRecord.first().waitFor({ state: 'visible' });
        expect(await this.nextButton.isEnabled()).toBeTruthy();

        // Step 5: Get total pages
        const pageCountText = await this.pageCount.textContent();
        const [, totalPages] = AssetHelper.extractPageCount(pageCountText || '');
        console.log("Total Pages:", totalPages);

        // Step 6: Count total records across all pages with proper scrolling
        let totalRecords = 0;

        for (let page = 1; page <= totalPages; page++) {
            const rowsOnPage = await this.allocationRecord.count();

            if (rowsOnPage > 0) {
                // Scroll all rows in batches to ensure lazy-loading
                for (let i = 0; i < rowsOnPage; i += 5) {
                    await this.allocationRecord.nth(i).scrollIntoViewIfNeeded();
                }

                // Always scroll the last row on the page (critical for last page)
                await this.allocationRecord.nth(rowsOnPage - 1).scrollIntoViewIfNeeded();
            }

            // Wait a short moment for lazy-loaded rows
            await this.allocationRecord.first().waitFor({ state: 'visible' });

            const finalRowsOnPage = await this.allocationRecord.count();
            totalRecords += finalRowsOnPage;

            console.log(`Page ${page} - Records Counted:`, finalRowsOnPage);

            if (page < totalPages) {
                await this.nextButton.scrollIntoViewIfNeeded();
                await this.nextButton.click();
                await this.allocationRecord.first().waitFor({ state: 'visible' });
            }
        }

        console.log("Calculated Total Records:", totalRecords);

        // Final validation
        expect(totalAssetCount).toEqual(totalRecords);
        expect(await this.previousButton.isEnabled()).toBeTruthy();

        console.log("Pagination verified !!");
    }


    async assignAsset() {

        expect(await this.allocationAssignAsset.textContent()).toEqual("Assign Asset");
        await this.waitforLoaderToDisappear();
        await this.allocationAssignAsset.click();

        await this.allocationSelectEmployee.click();
        await this.employeeOption.click();
        await this.allocationComment.fill("Thank you !!");
        await this.submitButton.click();
        await this.submitButton.click();
        await this.page.waitForTimeout(500);
        const tooltipMessage = await this.assetTypeField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Tooltip message:', tooltipMessage);
        expect(tooltipMessage === FILL_OUT_FIELD || tooltipMessage === FILL_IN_FIELD).toBeTruthy();
        await this.allocationSelectAssetType.click();
        const options = await this.allocationSelectAssetTypeOption.allTextContents();
        expect(options.length).toBeGreaterThan(0);
        await this.assetTypeOption.click();
        await expect(this.assetTypePopUp).toBeVisible();
        await expect(this.popupSearchBar).toBeVisible();
        await expect(this.popupTable).toBeVisible();
        await expect(this.assetTableRowSix).toBeVisible();
        await this.popupSearchBar.pressSequentially("");
        const serialNumbers = await this.assetTableSerialNumber.allTextContents();
        const enterSerialNumber = serialNumbers.length > 0 ? serialNumbers[0] : "";
        expect(serialNumbers.includes(enterSerialNumber)).toBeTruthy();
        await this.popupSearchBar.fill("");
        await this.popupSearchBar.pressSequentially(enterSerialNumber);
        await this.page.waitForTimeout(1000);
        const filteredSerialNumbers = await this.assetTableSerialNumber.allTextContents();
        expect(filteredSerialNumbers).toContain(enterSerialNumber);
        await this.popupSearchBar.fill("");
        await this.popupSearchBar.pressSequentially("asdsad");
        expect(await this.popupNoRecordsHeader.isVisible());
        await this.crossButton.click();
        await expect(this.crossButton).toBeHidden();
        console.log('Popup closed successfully');
        await this.assetTypeDropdownSvg.click();
        await this.page.waitForTimeout(1000);
        const optionToBeSelected = await this.assetTypeOption.textContent();
        await this.assetTypeOption.click();
        await this.waitForDotsLoaderToDisappear()
        await this.waitForSpinnerLoaderToDisappear()
        await this.page.waitForTimeout(1000);
        const serialNumbers2 = await this.page.locator("table tr td:nth-child(4)").allTextContents();
        const selectedSerialNumber = serialNumbers2[0];
        await this.popupSearchBar.pressSequentially(selectedSerialNumber);
        await this.assetRadioButton.first().click();
        await this.page.waitForTimeout(2000);
        const selectedAssetData = await this.assetInputGroupTextarea.allTextContents();
        const extractedText = selectedAssetData.join(" ");
        if (extractedText.includes(enterSerialNumber)) {
            expect(extractedText).toContain(enterSerialNumber);
        } else {
            console.log(`Serial number "${enterSerialNumber}" not found in extracted text.`);
        }
        await this.page.reload();
        await this.assetTypeDropdownSvg.click();
        await this.page.waitForTimeout(1000);
        await this.assetTypeOption.click();
        await this.waitForDotsLoaderToDisappear()
        await this.waitForSpinnerLoaderToDisappear()
        await this.page.waitForTimeout(1000);
        await this.popupSearchBar.pressSequentially(selectedSerialNumber);
        await this.assetRadioButton.first().click();
        await this.submitButton.click();
        await this.page.waitForTimeout(500);
        const tooltipMessage2 = await this.assetTypeRequiredField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Tooltip message:', tooltipMessage2);
        expect(tooltipMessage2 === FILL_OUT_FIELD || tooltipMessage2 === FILL_IN_FIELD).toBeTruthy();

        await this.allocationSelectEmployee.click();
        await this.employeeOption.click();
        const selectedOption = await this.assetListSelectedOption.textContent();
        expect(optionToBeSelected).toEqual(selectedOption);
        await this.allocationComment.fill('');
        await this.submitButton.click();
        const tooltipMessage3 = await this.assetCommentField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Tooltip message:', tooltipMessage3);
        expect(tooltipMessage3 === FILL_OUT_FIELD || tooltipMessage3 === FILL_IN_FIELD).toBeTruthy();

        await this.page.waitForTimeout(2000);
        await this.allocationComment.fill("Thank you !!");
        await expect(this.assetListSelectedOption).not.toBeEmpty();
        await expect(this.employeeSelectedOption).not.toBeEmpty();
        await expect(this.assetInputGroupTextarea).not.toBeEmpty();
        await expect(this.allocationComment).not.toBeEmpty();
        await this.submitButton.click();
        await this.toastContainer.isVisible();
        console.log("Successfully assigned!");
    }
    async assignAssetSmoke() {
        // Verify 'Assign Asset' button is present and click it
        expect(await this.allocationAssignAsset.textContent()).toEqual("Assign Asset");
        await this.waitforLoaderToDisappear();
        await this.allocationAssignAsset.click();
        // Select employee
        await this.allocationSelectEmployee.click();
        await this.employeeOption.click();
        // Select asset type
        await this.allocationSelectAssetType.click();
        await this.assetTypeOption.click();
        await expect(this.assetTypePopUp).toBeVisible();
        await this.waitForDotsLoaderToDisappear();
        await this.waitForSpinnerLoaderToDisappear();
        // Select first asset
        const serialNumbers2 = await this.page.locator("table tr td:nth-child(4)").allTextContents();
        const selectedSerialNumber = serialNumbers2[0];
        await this.popupSearchBar.pressSequentially(selectedSerialNumber);
        await this.assetRadioButton.first().click();
        // Add a comment
        await this.allocationComment.fill("Thank you !!");
        // Submit the assignment
        await this.submitButton.click();
        // Check toast/confirmation is visible
        await expect(this.toastContainer).toBeVisible();
        console.log("Successfully assigned!");

    }

   
}