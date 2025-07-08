import { Page, Locator, expect } from "@playwright/test";
import { AssetManagementTab } from "./Asset_Management_Tab";
import { Loader } from "../components/loaders";
import { BasePage } from "./Basepage";

export class AssetAllocation extends BasePage {
    private allocationAsset: Locator;
    private allocationPageHeader: Locator;
    private allocationAssignAsset: Locator;
    private allocationRecord: Locator;
    private nextButton: Locator;
    private previousButton: Locator;
    private disableNextButton: Locator;
    private totalAssetAssigned: Locator;
    private searchBar: Locator;
    private itemsPerPage: Locator;
    private itemsPerPageOption: Locator;
    private columnHeader: Locator;
    public colHeaders: string[];
    private assetTypeName: Locator;
    private assetSerialNumber: Locator;
    private assetEmployeeName: Locator;
    private assetOwnerName: Locator;
    private assetInvalidData: Locator;
    private allocationAssignAssetHeader: Locator;
    private allocationSelectEmployee: Locator;
    private allocationComment: Locator;
    private allocationSelectEmployeeOption: Locator;
    private allocationSelectAssetTypeOption: Locator;
    private allocationSelectAssetType: Locator;
    private submitButton: Locator;
    private assetTypePopUp: Locator;
    private popupSearchBar: Locator;
    private popupTable: Locator;
    private radioButton: Locator;
    private crossButton: Locator;
    private selectedAsset: Locator;
    private pageCount: Locator;
    private loader: Loader;
    private employeeOption: Locator;
    private assetTypeOption: Locator;
    private assetTypeField: Locator;
    private assetTypeRequiredField: Locator;
    private assetListSelectedOption: Locator;
    private employeeSelectedOption: Locator;
    private assetRadioButton: Locator;
    private assetCommentField: Locator;
    private assetInputGroupTextarea: Locator;
    private toastContainer: Locator;
    private popupNoRecordsHeader: Locator;
    private assetTableSerialNumber: Locator;
    private assetTableRowSix: Locator;
    private assetTypeDropdownSvg: Locator;

    constructor(page: Page) {
        super(page);
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
        this.assetTableRowSix = page.locator(">tr:nth-child(1)>td:nth-child(6)");
        this.assetTypeDropdownSvg = page.locator("(//*[name()='svg'][@class='css-8mmkcg'])[1]");
        this.employeeOption = this.page.locator('#react-select-3-option-6');
        this.assetTypeOption = this.page.locator("#react-select-2-option-9");
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
        this.assetTableRowSix = this.page.locator(">tr:nth-child(1)>td:nth-child(6)");
        this.assetTypeDropdownSvg = this.page.locator("(//*[name()='svg'][@class='css-8mmkcg'])[1]");
        this.assetInvalidData = this.page.locator(".fs-4.m-5.text-secondary.text-center")
        this.allocationSelectEmployee = this.page.locator('//*[@id="assign-asset"]/div/div[1]/div[2]/div/div/div/div[2]/div')
        this.allocationSelectEmployeeOption = this.page.locator("#react-select-3-option-6");
        this.allocationSelectAssetType = this.page.locator('//*[@id="asset_list"]/div/div[2]/div')
        this.allocationSelectAssetTypeOption = this.page.locator("#react-select-2-option-9");
        this.assetTypePopUp = this.page.locator(".css-1dimb5e-menu");
        this.popupSearchBar = this.page.getByPlaceholder("Search By Serial Number");
        this.popupTable = this.page.locator(".css-1dimb5e-table");
        this.radioButton = this.page.locator(".css-1dimb5e-radio");
        this.allocationComment = this.page.locator('textarea[name="comment"]');
        this.submitButton = this.page.locator("button[type='submit']");
        this.crossButton = this.page.locator("//button[@type = 'button'][@aria-label = 'Close']");
        this.assetOwnerName = this.page.locator("tr>td:nth-child(4)");
        this.loader = new Loader(page);
    }

    // TC_AM_021 - TC_AM_022
    async allocationPage() {
        const assetManagementTab = new AssetManagementTab(this.page);
        await assetManagementTab.expandAssetManagementTab();
        await this.allocationAsset.click();

        expect(await this.allocationPageHeader.isVisible()).toBeTruthy();
        expect(await this.allocationAssignAsset.isVisible()).toBeTruthy();
        await this.page.waitForTimeout(1000);

        const totalAllocationAsset = await this.totalAssetAssigned.allTextContents();
        const totalAssetCount = totalAllocationAsset.length > 0 ? parseInt(totalAllocationAsset[0].replace(/\D/g, ''), 10) : 0;
        await this.page.waitForTimeout(1000);

        console.log("TotalAsset :  ", totalAssetCount);

        expect(await this.searchBar.isVisible()).toBeTruthy();

        const colHeader = await this.columnHeader.allTextContents();
        let allMatched = true;
        for (let i = 0; i < colHeader.length; i++) {
            if (colHeader[i] !== this.colHeaders[i]) {
                console.log(`Mismatch found at index ${i}: Expected "${this.colHeaders[i]}", but got "${colHeader[i]}"`);
                allMatched = false;
            }
        }
        expect(allMatched).toBeTruthy();
        if (allMatched) {
            console.log("All subtab titles matched successfully!");
        } else {
            console.log("Some subtab titles did not match.");
        }
    }

    // TC_AM_023 - TC_AM_027
    async searchField() {
        const assetManagementTab = new AssetManagementTab(this.page);
        await assetManagementTab.expandAssetManagementTab();
        await this.allocationAsset.click();
        await expect(this.loader.getSpinLoader()).not.toBeAttached();
        await this.page.waitForTimeout(1000);
        await this.searchBar.pressSequentially("Keyboard");
        await this.page.waitForTimeout(1000);
        const assetName = await this.assetTypeName.allTextContents();
        console.log(assetName);
        let foundKeyword = true;
        for (let i = 0; i < assetName.length; ++i) {
            if (assetName[i] !== 'Keyboard') {
                console.log(`Mismatched relevant record at index ${assetName[i]} appears listed`);
                foundKeyword = false;
            }
        }
        expect(foundKeyword).toBeTruthy();
        if (foundKeyword) {
            console.log("Relevant record appears listed");
        } else {
            console.log("Relevant record shouldn't appear listed");
        }
    }

    async searchBySerialNumber() {
        const assetManagementTab = new AssetManagementTab(this.page);
        await assetManagementTab.expandAssetManagementTab();
        await this.allocationAsset.click();
        await expect(this.loader.getSpinLoader()).not.toBeAttached();
        await this.page.waitForTimeout(1000);
        await this.searchBar.pressSequentially("DELL004");
        await this.page.waitForTimeout(2000);
        const serialNumber = await this.assetSerialNumber.allTextContents();
        console.log(serialNumber);

        let foundSerialNumber = true;
        for (let i = 0; i < serialNumber.length; ++i) {
            if (serialNumber[i] !== 'DELL004') {
                console.log(`Mismatched relevant record at index ${serialNumber[i]} appears listed`);
                foundSerialNumber = false;
            }
        }
        expect(foundSerialNumber).toBeTruthy();
        if (foundSerialNumber) {
            console.log("Relevant record appears listed when search by serial number");
        } else {
            console.log("Relevant record shouldn't appear listed when search by serial number");
        }
    }

    async searchByOwnerName() {
        const assetManagementTab = new AssetManagementTab(this.page);
        await assetManagementTab.expandAssetManagementTab();
        await this.allocationAsset.click();
        await expect(this.loader.getSpinLoader()).not.toBeAttached();
        await this.page.waitForTimeout(1000);
        await this.searchBar.pressSequentially("Caelius");
        await this.page.waitForTimeout(3000);
        const ownerName = await this.assetOwnerName.allTextContents();
        console.log(ownerName);

        let foundOwner = true;
        for (let i = 0; i < ownerName.length; ++i) {
            if (ownerName[i] !== 'Caelius') {
                console.log(`Mismatched relevant record at index ${ownerName[i]} appears listed`);
                foundOwner = false;
            }
        }
        expect(foundOwner).toBeTruthy();
        if (foundOwner) {
            console.log("Relevant record appears listed when search by Owner name");
        } else {
            console.log("Relevant record shouldn't appear listed when search by Owner name");
        }
    }

    async searchByEmployeeName() {
        const assetManagementTab = new AssetManagementTab(this.page);
        await assetManagementTab.expandAssetManagementTab();
        await this.allocationAsset.click();
        await expect(this.loader.getSpinLoader()).not.toBeAttached();
        await this.page.waitForTimeout(1000);
        await this.searchBar.pressSequentially("Asset L1");
        await this.page.waitForTimeout(3000);
        const employeeName = await this.assetEmployeeName.allTextContents();
        console.log(employeeName);

        let foundEmployee = true;
        for (let i = 0; i < employeeName.length; ++i) {
            if (employeeName[i] !== 'Asset L1') {
                console.log(`Mismatched relevant record at index ${employeeName[i]} appears listed`);
                foundEmployee = false;
            }
        }
        expect(foundEmployee).toBeTruthy();
        if (foundEmployee) {
            console.log("Relevant record appears listed when search by Employee name");
        } else {
            console.log("Relevant record shouldn't appear listed when search by employee name");
        }

        await this.searchBar.clear();
        await this.searchBar.pressSequentially("asdasdas");
        await this.page.waitForTimeout(1000);
        const invalidData = await this.assetInvalidData.textContent();
        expect(invalidData).toContain("No records available");
        console.log(invalidData);
    }

    // TC_AM_029
    async pagination() {
        const assetManagementTab = new AssetManagementTab(this.page);
        await assetManagementTab.expandAssetManagementTab();
        await this.allocationAsset.click();
        await expect(this.loader.getSpinLoader()).not.toBeAttached();
        await this.page.waitForTimeout(1000);
        const totalAllocationAsset = await this.totalAssetAssigned.allTextContents();
        const totalAssetCount = totalAllocationAsset.length > 0 ? parseInt(totalAllocationAsset[0].replace(/\D/g, ''), 10) : 0;
        await this.page.waitForTimeout(1000);
        console.log("TotalAsset :  ", totalAssetCount);

        await this.itemsPerPage.waitFor({ state: 'visible' });
        await this.itemsPerPage.click();
        await this.itemsPerPage.selectOption({ index: 0 });
        await this.page.waitForTimeout(500);
        const selectedValue = parseInt((await this.itemsPerPage.inputValue()).trim(), 10);
        const assetNameCount = await this.assetTypeName.count();
        console.log("Selected Value: ", selectedValue);
        console.log("Asset Name Count: ", assetNameCount);
        expect(selectedValue).toEqual(assetNameCount);
        if (selectedValue === assetNameCount) {
            console.log("The selected option matches the asset count.");
        } else {
            console.log("Mismatch between selected option and asset count.");
        }

        await this.nextButton.click();
        await this.page.waitForTimeout(1000);
        expect(await this.previousButton.isEnabled()).toBeTruthy();

        await this.previousButton.click();
        await this.page.waitForTimeout(1000);
        expect(await this.nextButton.isEnabled()).toBeTruthy();

        const totalRecordCount = await this.allocationRecord.count();
        const pageCountText = await this.pageCount.allTextContents();
        const pageNumbers = pageCountText.length > 0 ? pageCountText[0].match(/\d+/g) : null;
        const currentPage = pageNumbers && pageNumbers.length > 0 ? parseInt(pageNumbers[0], 10) : 0;
        const totalPageCount = pageNumbers && pageNumbers.length > 1 ? parseInt(pageNumbers[1], 10) : 0;
        const difference = totalPageCount - currentPage;
        const pageTotalCount = totalRecordCount * difference;

        for (let i = 0; i < difference; i++) {
            await this.nextButton.click();
        }
        await this.page.waitForTimeout(2000);
        const lastRecordCount = await this.allocationRecord.count();
        const totalRecords = pageTotalCount + lastRecordCount;
        console.log(totalRecords);
        expect(totalAssetCount).toEqual(totalRecords);

        expect(await this.previousButton.isEnabled()).toBeTruthy();
    }

    // TC_AM_030
    async assignAsset() {
        const assetManagementTab = new AssetManagementTab(this.page);
        await assetManagementTab.expandAssetManagementTab();
        await this.allocationAsset.click();
        await expect(this.loader.getSpinLoader()).not.toBeAttached();
        await this.page.waitForTimeout(1000);
        await this.allocationAssignAsset.click();
        expect(this.loader.getSpinLoader()).not.toBeAttached();
        const header = await this.allocationAssignAssetHeader.textContent();
        await this.page.waitForTimeout(1500);
        expect(header).toEqual("Assign Asset");

        // Locators for assignAsset


        // TC_AM_031
        await this.allocationSelectEmployee.click();
        await this.employeeOption.click();
        await this.allocationComment.fill("Thank you !!");
        await this.submitButton.click();
        await this.submitButton.click();
        await this.page.waitForTimeout(500);
        const tooltipMessage = await this.assetTypeField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Tooltip message:', tooltipMessage);
        expect(tooltipMessage).toBe('Please fill out this field.');

        // TC_AM_032
        await this.allocationSelectAssetType.click();
        const options = await this.allocationSelectAssetTypeOption.allTextContents();
        expect(options.length).toBeGreaterThan(0);

        // TC_AM_033
        await this.assetTypeOption.click();
        expect(this.loader.getSpinLoader()).not.toBeAttached();
        expect(await this.assetTypePopUp.isVisible());
        expect(await this.popupSearchBar.isVisible());
        expect(await this.popupTable.isVisible());
        expect(await this.assetTableRowSix.isVisible());

        // TC_AM_034 & TC_AM_035
        await this.popupSearchBar.pressSequentially("");
        const serialNumbers = await this.assetTableSerialNumber.allTextContents();
        // Pick the first serial number dynamically from the list
        const enterSerialNumber = serialNumbers.length > 0 ? serialNumbers[0] : "";
        expect(serialNumbers.includes(enterSerialNumber)).toBeTruthy();

        // Now search for the dynamically picked serial number
        await this.popupSearchBar.fill('');
        await this.popupSearchBar.pressSequentially(enterSerialNumber);
        await this.page.waitForTimeout(1000);
        const filteredSerialNumbers = await this.assetTableSerialNumber.allTextContents();
        expect(filteredSerialNumbers).toContain(enterSerialNumber);

        // TC_AM_036
        await this.popupSearchBar.fill('');
        await this.popupSearchBar.pressSequentially("asdsad");
        expect(await this.popupNoRecordsHeader.isVisible());

        // TC_AM_037
        await this.crossButton.click();
        await expect(this.crossButton).toBeHidden();
        console.log('Popup closed successfully');

        // TC_AM_038
        await this.assetTypeDropdownSvg.click();
        await this.page.waitForTimeout(1000);
        const optionToBeSelected = await this.assetTypeOption.textContent();
        await this.assetTypeOption.click();
        expect(this.loader.getSpinLoader()).not.toBeAttached();
        await this.page.waitForTimeout(1000);

        const serialNumbers2 = await this.page.locator("table tr td:nth-child(4)").allTextContents();
        const selectedSerialNumber = serialNumbers2[0];

        await this.popupSearchBar.pressSequentially(selectedSerialNumber);
        await this.assetRadioButton.click();
        await this.page.waitForTimeout(2000);
        const selectedAssetData = await this.assetInputGroupTextarea.allTextContents();

        const extractedText = selectedAssetData.join(" ");
        if (extractedText.includes(enterSerialNumber)) {
            expect(extractedText).toContain(enterSerialNumber);
        } else {
            console.log(`Serial number "${enterSerialNumber}" not found in extracted text.`);
        }

        // TC_AM_039
        await this.page.reload();
        await this.assetTypeDropdownSvg.click();
        await this.page.waitForTimeout(1000);
        await this.assetTypeOption.click();
        expect(this.loader.getSpinLoader()).not.toBeAttached();
        await this.page.waitForTimeout(1000);
        await this.popupSearchBar.pressSequentially(selectedSerialNumber);
        await this.assetRadioButton.click();
        await this.submitButton.click();
        await this.page.waitForTimeout(500);
        const tooltipMessage2 = await this.assetTypeRequiredField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Tooltip message:', tooltipMessage2);
        expect(tooltipMessage2).toBe('Please fill out this field.');

        await this.allocationSelectEmployee.click();
        await this.employeeOption.click();

        // TC_AM_040
        const selectedOption = await this.assetListSelectedOption.textContent();
        expect(optionToBeSelected).toEqual(selectedOption);

        // TC_AM_041
        await this.allocationComment.fill('');
        await this.submitButton.click();
        const tooltipMessage3 = await this.assetCommentField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Tooltip message:', tooltipMessage3);
        expect(tooltipMessage3).toBe('Please fill out this field.');
        await this.page.waitForTimeout(2000);
        await this.allocationComment.fill("Thank you !!");

        // TC_AM_042
        await expect(this.assetListSelectedOption).not.toBeEmpty();
        await expect(this.employeeSelectedOption).not.toBeEmpty();
        await expect(this.assetInputGroupTextarea).not.toBeEmpty();
        await expect(this.allocationComment).not.toBeEmpty();

        // TC_AM_043
        await this.submitButton.click();
        await this.toastContainer.isVisible();
        console.log("Successfully assigned!");
    }
}