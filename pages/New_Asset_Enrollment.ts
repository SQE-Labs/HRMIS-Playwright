import { Page, Locator, expect } from "@playwright/test";
import { AssetManagementTab } from "./Asset_Management_Tab";
import { Loader } from "../components/loaders";
import { BasePage } from "./Basepage";
import { OverView } from "./Asset_OverView";
import { AssetAllocation } from "./Asset_Allocation";
import { AssetDeallocation } from '../pages/Asset_Deallocation';
import { generateRandomString } from "./Employee_Management"

export class AssetEnrollment extends BasePage {
    private assetEnrollmentSubtab: Locator;
    private assetEnrollmentHeader: Locator;
    private assetEnrollmentTabs: Locator;
    private createAssetTabs: Locator;
    private createAssetTabsDetails: string[];
    private submitButton: Locator;
    private assetType: Locator;
    private assetTypeLocator: Locator;
    private superOwnerLocator: Locator;
    private ownerLocator: Locator;
    private model: Locator;
    private manufacturer: Locator;
    private serialNumber: Locator;
    private purchaseCost: Locator;
    private validationMessage: Locator;
    private warranty: Locator;
    private warrantyYear: Locator;
    private calendar: Locator;
    private comment: Locator;
    private bulkAsset: Locator;
    private chooseButton: Locator;
    private bulkAssetSubmitButton: Locator;
    private successPopup: Locator;
    private cancelButton: Locator;
    private assetTypeRequest: Locator;
    private assetTypeRequestColumn: Locator;
    private createAssetTypeButton: Locator;
    private createAssetTypePopupHeader: Locator;
    private createAssetTypePopupLabel: Locator;
    private popupAssetNameField: Locator;
    private popupAssetCategory: Locator;
    private popupSubmitButton: Locator;
    private popupCancelButton: Locator;
    private popupCrossIcon: Locator;
    private popupMessage: Locator;
    private assetTypeName: Locator;
    private approveAssetTypeRequest: Locator;
    private viewButton: Locator;
    private actionDropdown: Locator;
    private loader: Loader;

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
        this.submitButton = page.locator(".theme-button ");
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
        this.bulkAssetSubmitButton = page.locator("//button[@type = 'submit']");
        this.successPopup = page.locator(".modal-body");
        this.cancelButton = page.locator(".theme-button.bg-grey.mx-3.w-35");
        this.popupMessage = page.locator('div>ol');
        this.assetTypeRequest = page.locator("#tab2-tab");
        this.assetTypeRequestColumn = page.locator("thead>tr>th");
        this.createAssetTypeButton = page.locator("(//button[@type= 'button'])[7]");
        this.createAssetTypePopupHeader = page.locator("#staticBackdropLabel");
        this.createAssetTypePopupLabel = page.locator(".col-md-4.pt-1");
        this.popupAssetNameField = page.locator("//input[@type = 'text']");
        this.popupAssetCategory = page.locator(":#assetCategory");
        this.popupSubmitButton = page.locator("(//button[@type= 'submit'])");
        this.popupCancelButton = page.locator("(//button[@type= 'button'])[6]");
        this.popupCrossIcon = page.locator(".btn-close");
        this.assetTypeName = page.locator("tr>td:nth-child(2)");
        this.approveAssetTypeRequest = page.locator("#tab3-tab");
        this.viewButton = page.locator('//div[@id="tab3"]//tbody/tr[1]/td[6]/a');
        this.actionDropdown = page.locator("#status");
        this.loader = new Loader(page);
    }

    async newEnrollmentPage() {
        const assetManagementTab = new AssetManagementTab(this.page);
        await assetManagementTab.expandAssetManagementTab();
        await this.assetEnrollmentSubtab.click();
    }

    async enrollment() {
        // TC_AM_056
        await this.newEnrollmentPage();
        expect(await this.assetEnrollmentHeader.isVisible()).toBeTruthy();
        expect(await this.assetEnrollmentTabs.isVisible()).toBeTruthy();

        // TC_AM_057
        expect(await this.createAssetTabs.allTextContents()).toEqual(this.createAssetTabsDetails);

        // TC_AM_058
        const assetTypeVisible = await this.assetTypeLocator.isVisible();
        const assetTypeInnerText = await this.assetTypeLocator.innerText();

        const superOwnerVisible = await this.superOwnerLocator.isVisible();
        const superOwnerInnerText = await this.superOwnerLocator.innerText();

        const ownerVisible = await this.ownerLocator.isVisible();
        const ownerInnerText = await this.ownerLocator.innerText();
        if ((assetTypeVisible && assetTypeInnerText.trim()) && (superOwnerVisible && superOwnerInnerText.trim()) && (ownerVisible && ownerInnerText.trim()) !== "") {
            console.log('The select element is visible and the inner text is visible.');
        } else {
            console.log('The select element or inner text is not visible.');
        }
    }

    // TC_AM_059
    async createAsset() {
        await this.newEnrollmentPage();
        await this.submitButton.click();
        await this.page.waitForTimeout(1000);
        const assetTypeField = this.assetType;
        // Get the validation message
        let tooltipMessage = await assetTypeField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Asset type Tooltip message:', tooltipMessage);
        // Validate the expected message
        expect(tooltipMessage).toBe('Please select an item in the list.');

        // TC_AM_061
        await this.assetType.click();
        await this.assetTypeLocator.selectOption({ label: 'USB HUB Adapter' });
        await this.assetTypeLocator.textContent();
        expect(this.assetTypeLocator.isVisible()).toBeTruthy();

        // TC_AM_062
        await this.submitButton.click();
        await this.page.waitForTimeout(1000);
        const modelField = this.model;
        tooltipMessage = await modelField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Model Tooltip message:', tooltipMessage);
        expect(tooltipMessage).toBe('Please fill out this field.');

        // TC_AM_063
        // Fill all mandatory Fields.
        await this.model.fill('3213');   // Try to enter only numbers
        await this.superOwnerLocator.selectOption({ label: 'CAELIUS_OWNED' });
        await this.ownerLocator.selectOption({ label: "Caelius" });
        await this.manufacturer.fill("HP01");
        await this.serialNumber.fill('5900');
        await this.submitButton.click();
        console.log(await this.validationMessage.textContent());
        expect(this.validationMessage.isVisible()).toBeTruthy();

        // TC_AM_064
        await this.model.clear();
        await this.model.fill('12345678901234567890123456789012345678901'); // try to enter more then 40 characters
        await this.submitButton.click();
        console.log(await this.validationMessage.textContent());
        expect(this.validationMessage.isVisible()).toBeTruthy();

        // TC_AM_065
        await this.model.clear();
        await this.model.fill('Pavalian');   // Try to enter only numbers
        await this.superOwnerLocator.selectOption({ label: 'Select a super owner' });
        await this.submitButton.click();
        const superOwnerField = this.superOwnerLocator;
        tooltipMessage = await superOwnerField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Super Owner Tooltip message:', tooltipMessage);
        expect(tooltipMessage).toBe('Please select an item in the list.');

        // TC_AM_066
        await this.superOwnerLocator.selectOption({ label: 'CAELIUS_OWNED' });
        expect(await this.superOwnerLocator.isVisible()).toBeTruthy();

        // TC_AM_067
        if (await this.superOwnerLocator.selectOption({ label: 'CAELIUS_OWNED' })) {
            console.log("When CAELIUS_OWNED option is selected");
            console.log(await this.ownerLocator.innerText());
            expect(await this.ownerLocator.isVisible()).toBeTruthy();
        }
        if (await this.superOwnerLocator.selectOption({ label: 'CLIENT_OWNED' })) {
            console.log("When CLIENT_OWNED option is selected");
            console.log(await this.ownerLocator.innerText());
            expect(await this.ownerLocator.isVisible()).toBeTruthy();
        }

        // TC_AM_068
        // If CAELIUS_OWNED option is selected.
        try {
            const superOwnerSelected = await this.superOwnerLocator.selectOption({ label: 'CAELIUS_OWNED' });

            if (superOwnerSelected) {
                const ownerTextVisible = await this.ownerLocator.getByText('Select an Owner').textContent();
                if (ownerTextVisible) {
                    await this.submitButton.click();

                    const ownerField = this.ownerLocator;
                    tooltipMessage = await ownerField.evaluate(el => (el as HTMLInputElement).validationMessage);
                    console.log('Owner Tooltip message:', tooltipMessage);
                    expect(tooltipMessage).toBe('Please select an item in the list.');

                } else {
                    console.error('"Select an owner" text is not visible');
                }
            } else {
                console.error('superOwnerLocator option was not selected');
            }
        } catch (error) {
            console.error('An error occurred during the test execution:', error);
        }
        // If CLIENT_OWNED option is selected.
        await this.page.waitForTimeout(2000);
        try {
            const superOwnerSelected = await this.superOwnerLocator.selectOption({ label: 'CLIENT_OWNED' });

            if (superOwnerSelected) {
                const ownerTextElement = await this.ownerLocator.getByText('Select an Owner').isVisible();

                if (ownerTextElement) {
                    await this.submitButton.click();

                    const ownerField = this.ownerLocator;
                    tooltipMessage = await ownerField.evaluate(el => (el as HTMLInputElement).validationMessage);
                    console.log('Owner Tooltip message:', tooltipMessage);

                    expect(tooltipMessage).toBe('Please select an item in the list.');
                } else {
                    console.error('"Select an Owner" text is not found on the page');
                }
            } else {
                console.error('superOwnerLocator option was not selected');
                throw new Error('superOwnerLocator option was not selected. Test case failed.');
            }
        } catch (error) {
            console.error('An error occurred during the test execution:', error);
            throw error;
        }

        // TC_AM_069
        await this.page.waitForTimeout(1000);
        await this.superOwnerLocator.selectOption({ label: 'CAELIUS_OWNED' });
        await this.ownerLocator.selectOption({ label: 'Caelius' });
        expect(await this.ownerLocator.isVisible()).toBeTruthy();

        // TC_AM_70
        await this.page.waitForTimeout(2000);
        await this.manufacturer.clear();
        await this.submitButton.click();
        const manufacturerField = this.manufacturer;
        tooltipMessage = await manufacturerField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Manufacturer Tooltip message:', tooltipMessage);
        expect(tooltipMessage).toBe('Please fill out this field.');

        // TC_AM_71
        await this.page.waitForTimeout(2000);
        await this.manufacturer.fill('3213');
        await this.submitButton.click();
        console.log(await this.validationMessage.textContent());
        expect(this.validationMessage.isVisible()).toBeTruthy();

        // TC_AM_72
        await this.page.waitForTimeout(2000);
        await this.manufacturer.clear();
        await this.manufacturer.fill('12345678901234567890123456789012345678901'); // try to enter more then 40 characters
        await this.submitButton.click();
        console.log(await this.validationMessage.textContent());
        expect(this.validationMessage.isVisible()).toBeTruthy();

        await this.manufacturer.fill('HP01');

        // TC_AM_73
        await this.serialNumber.clear();
        await this.submitButton.click();
        const serialNumberField = this.serialNumber;
        tooltipMessage = await serialNumberField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('SerialNumber Tooltip message:', tooltipMessage);
        expect(tooltipMessage).toBe('Please fill out this field.');

        // TC_AM_74
        await this.serialNumber.clear();
        await this.serialNumber.fill('12345678901234567890123456789012345678901'); // try to enter more then 40 characters
        await this.submitButton.click();
        console.log(await this.validationMessage.textContent());
        expect(this.validationMessage.isVisible()).toBeTruthy();

        // TC_AM_76   
        await this.serialNumber.fill('@#$%^');
        await this.submitButton.click();
        console.log(await this.validationMessage.textContent());
        expect(this.validationMessage.isVisible()).toBeTruthy();

        // TC_AM_77
        // Try to Enter Existing Serial number
        const usedSerialNumbers = new Set<number>();

        // TC_AM_78
        let serialNumber = 0;
        do {
            serialNumber = Math.floor(10000 + Math.random() * 90000);
        } while (usedSerialNumbers.has(serialNumber));

        // Store the serial number to prevent repetition
        usedSerialNumbers.add(serialNumber);

        await this.page.waitForTimeout(7000);
        await this.serialNumber.fill(serialNumber.toString());
        await this.page.waitForTimeout(1000);  // Wait for 1 second
        const enteredSerialNumber = await this.serialNumber.inputValue();
        console.log(enteredSerialNumber);
        await expect(this.warrantyYear).toBeDisabled();
        await this.warranty.fill('1');
        await expect(this.warrantyYear).toBeEnabled();

        // TC_AM_80
        // Enter negative value
        await this.warranty.fill('-1');
        await this.submitButton.click();
        console.log(await this.validationMessage.textContent());
        expect(this.validationMessage.isVisible()).toBeTruthy();

        // TC_AM_81
        // Enter More then 10
        await this.warranty.fill('11');
        await this.submitButton.click();
        console.log(await this.validationMessage.textContent());
        expect(this.validationMessage.isVisible()).toBeTruthy();

        // TC_AM_82
        // Enter More then 120 and select month
        await this.warranty.fill('121');
        await this.warrantyYear.selectOption({ label: 'Month' });
        await this.submitButton.click();
        console.log(await this.validationMessage.textContent());
        expect(this.validationMessage.isVisible()).toBeTruthy();
        await this.warranty.fill('120');

        // TC_AM_083
        const purchaseCostValue = await this.purchaseCost.getAttribute('value');
        expect(purchaseCostValue).toEqual("0");

        // TC_AM_84
        await this.purchaseCost.clear();
        await this.purchaseCost.fill('@#$%^&*');
        await this.submitButton.click();
        console.log(await this.validationMessage.textContent());
        expect(this.validationMessage.isVisible()).toBeTruthy();

        // TC_AM_85
        await this.purchaseCost.clear();
        await this.purchaseCost.fill('1000001');
        await this.submitButton.click();
        console.log(await this.validationMessage.textContent());
        expect(this.validationMessage.isVisible()).toBeTruthy();
        await this.purchaseCost.fill('100');

        // TC_AM_86
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 1);
        const futureDateString = futureDate.toISOString().split('T')[0];
        await this.calendar.pressSequentially(futureDateString); // Try to enter future dates
        console.log(await this.page.locator(".Toastify__toast-body").textContent());
        await this.page.locator(".Toastify__toast-body").isVisible();
        await this.page.waitForTimeout(7000);

        // TC_AM_87
        // Enter more than 256 characters 
        const today = new Date();
        today.setDate(today.getDate());
        const presentDate = today.toISOString().split('T')[0];
        await this.calendar.pressSequentially(presentDate);
        await this.comment.fill("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,.");
        await this.submitButton.click();
        await this.page.locator(".Toastify__toast-body").isVisible();
        await this.comment.fill("Thnk you !!");

        // TC_AM_88
        await this.page.waitForTimeout(7000);
        await this.submitButton.click();
        await this.page.waitForTimeout(500);
        console.log(await this.page.locator(".Toastify__toast-body").textContent());
        await this.page.locator(".Toastify__toast-body").isVisible();

        // TC_AM_89
        const overView = new OverView(this.page);
        this.page.locator("//a[text()='Asset Overview']").click();
        await expect(this.loader.getThreeDotClass()).not.toBeAttached();
        await this.page.getByTitle("USB HUB Adapter").click();
        await expect(this.loader.getSpinLoader()).not.toBeAttached();

        const existingSerialNumbers = await this.page.locator("tbody>tr>td:nth-child(4)").allTextContents();
        expect(existingSerialNumbers).toContain(enteredSerialNumber);
    }
    async bulkCreateAsset() {
        // TC_AM_90
        await this.newEnrollmentPage();
        await expect(this.loader.getSpinLoader()).not.toBeAttached();
        await this.bulkAsset.click();
        await this.page.locator(".has-asterisk").isVisible();
        await this.chooseButton.isVisible();
        await this.bulkAssetSubmitButton.isVisible();

        // TC_AM_091

        let fileInputSelector = "//input[@type = 'file']";

        // let filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\ValidDocument.xlsx'; // Specify the path to the file you want to upload
        // await this.page.setInputFiles(fileInputSelector, filePath);
        // await this.bulkAssetSubmitButton.click();
        // console.log(await this.successPopup.innerText());
        // await this.successPopup.isVisible();

        // TC_AM_092
        await this.page.waitForTimeout(7000);
        // await this.page.locator(".btn-close").click()
        fileInputSelector = "//input[@type = 'file']";
        let filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\abc.docx'; // Specify the path to the file you want to upload
        await this.page.setInputFiles(fileInputSelector, filePath);
        console.log(await this.page.locator(".Toastify__toast-body").textContent());
        await this.page.locator(".Toastify__toast-body").isVisible();
        await this.page.waitForTimeout(1000);

        // TC_AM_093
        const bulkAssetField = this.page.locator("//input[@type = 'file']");
        await this.bulkAssetSubmitButton.click();
        // Get the validation message
        let tooltipMessage = await bulkAssetField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Asset type Tooltip message:', tooltipMessage);
        // Validate the expected message
        expect(tooltipMessage).toBe('Please select a file.');

        // TC_AM_094
        filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\AssetType_Column.xlsx';
        await this.page.setInputFiles(fileInputSelector, filePath);
        await this.page.waitForSelector(fileInputSelector, { state: 'attached' });
        await this.bulkAssetSubmitButton.click();
        await this.popupMessage.waitFor({ state: 'visible' });
        console.log(await this.page.locator('div>ol').allInnerTexts());

        // TC_AM_095
        await this.page.locator(".btn-close").click();
        await this.page.waitForTimeout(1000);
        filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\Model_Column.xlsx';
        await this.page.setInputFiles(fileInputSelector, filePath);
        await this.page.waitForSelector(fileInputSelector, { state: 'attached' });

        await this.bulkAssetSubmitButton.click();
        await this.popupMessage.waitFor({ state: 'visible' });
        console.log(await this.page.locator('div>ol').allInnerTexts());
        await this.page.locator(".btn-close").click();

        // TC_AM_096
        await this.page.waitForTimeout(2000);
        filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\Owner_Column.xlsx';
        await this.page.setInputFiles(fileInputSelector, filePath);
        await this.page.waitForSelector(fileInputSelector, { state: 'attached' });
        await this.bulkAssetSubmitButton.click();  // Submit the last file
        await this.popupMessage.waitFor({ state: 'visible' });
        console.log(await this.page.locator('div>ol').allInnerTexts());
        await this.page.locator(".btn-close").click();

        // TC_AM_097
        await this.page.waitForTimeout(2000);
        filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\Manufracture.xlsx';
        await this.page.setInputFiles(fileInputSelector, filePath);
        await this.page.waitForSelector(fileInputSelector, { state: 'attached' });
        await this.bulkAssetSubmitButton.click();
        await this.popupMessage.waitFor({ state: 'visible' });
        console.log(await this.page.locator('div>ol').allInnerTexts());
        await this.page.locator(".btn-close").click();

        // TC_AM_098
        // await this.page.waitForTimeout(2000);
        // filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\SerialNumber.xlsx';
        // await this.page.setInputFiles(fileInputSelector, filePath);
        // await this.page.waitForSelector(fileInputSelector, { state: 'attached' });
        // await this.bulkAssetSubmitButton.click();
        // await this.popupMessage.waitFor({ state: 'visible' });
        // console.log(await this.page.locator('div>ol').allInnerTexts());
        // await this.page.locator(".btn-close").click();

        // TC_AM_099
        // await this.page.waitForTimeout(2000);
        // filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\Warranty.xlsx';
        // await this.page.setInputFiles(fileInputSelector, filePath);
        // await this.page.waitForSelector(fileInputSelector, { state: 'attached' });
        // await this.bulkAssetSubmitButton.click();
        // await this.popupMessage.waitFor({ state: 'visible' });
        // console.log(await this.page.locator('div>ol').allInnerTexts());
        // await this.page.locator(".btn-close").click();

        // TC_AM_100
        // await this.page.waitForTimeout(2000);
        // filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\Purchase.xlsx';
        // await this.page.setInputFiles(fileInputSelector, filePath);
        // await this.page.waitForSelector(fileInputSelector, { state: 'attached' });
        // await this.bulkAssetSubmitButton.click();
        // await this.popupMessage.waitFor({ state: 'visible' });
        // console.log(await this.page.locator('div>ol').allInnerTexts());
        // await this.page.locator(".btn-close").click();

        // TC_AM_101
        // await this.page.waitForTimeout(2000);
        // filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\Processor.xlsx';
        // await this.page.setInputFiles(fileInputSelector, filePath);
        // await this.page.waitForSelector(fileInputSelector, { state: 'attached' });
        // await this.bulkAssetSubmitButton.click();  // Submit the last file
        // await this.popupMessage.waitFor({ state: 'visible' });
        // console.log(await this.page.locator('div>ol').allInnerTexts());
        // await this.page.locator(".btn-close").click();

        // TC_AM_102
        await this.page.waitForTimeout(2000);
        filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\superOwner.xlsx';
        await this.page.setInputFiles(fileInputSelector, filePath);
        await this.page.waitForSelector(fileInputSelector, { state: 'attached' });
        await this.bulkAssetSubmitButton.click();  // Submit the last file
        await this.popupMessage.waitFor({ state: 'visible' });
        console.log(await this.page.locator('div>ol').allInnerTexts());
        await this.page.locator(".btn-close").click();

        // TC_AM_106
        filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\ExistingSerialNumber.xlsx';
        await this.page.setInputFiles(fileInputSelector, filePath);
        await this.page.waitForSelector(fileInputSelector, { state: 'attached' });
        await this.bulkAssetSubmitButton.click();  // Submit the last file
        await this.popupMessage.waitFor({ state: 'visible' });
        console.log(await this.page.locator('div>ol').allInnerTexts());
        await this.page.locator(".btn-close").click();

        // TC_AM_115
        filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\NonExistingAssetType.xlsx';
        await this.page.setInputFiles(fileInputSelector, filePath);
        await this.page.waitForSelector(fileInputSelector, { state: 'attached' });
        await this.bulkAssetSubmitButton.click();  // Submit the last file
        await this.popupMessage.waitFor({ state: 'visible' });
        console.log(await this.page.locator('div>ol').allInnerTexts());
        await this.page.locator(".btn-close").click();

        // TC_AM_123
        filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\NoUnit.xlsx';
        await this.page.setInputFiles(fileInputSelector, filePath);
        await this.page.waitForSelector(fileInputSelector, { state: 'attached' });
        await this.bulkAssetSubmitButton.click();  // Submit the last file
        await this.popupMessage.waitFor({ state: 'visible' });
        console.log(await this.page.locator('div>ol').allInnerTexts());
        await this.page.locator(".btn-close").click();
    }

    async assetTypeRequests() {
        // TC_AM_124
        await this.newEnrollmentPage();
        await this.page.waitForTimeout(2000);
        await this.assetTypeRequest.click();
        await expect(this.loader.getSpinLoader()).not.toBeAttached();
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
        await this.popupSubmitButton.click();
        const assetNameField = this.popupAssetNameField;
        const tooltipMessage = await assetNameField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Asset Name tooltip message:', tooltipMessage);
        expect(tooltipMessage).toBe('Please fill out this field.');

        // Empty Comment Field
        await assetNameField.fill(generateRandomString(5));
        await this.page.waitForTimeout(500);
        await this.popupSubmitButton.click();
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
            await this.popupSubmitButton.click();
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
            await this.popupSubmitButton.click();
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
            await this.popupSubmitButton.click();
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
        await this.popupSubmitButton.click();
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
        await this.newEnrollmentPage();
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
        await expect(this.loader.getSpinLoader()).not.toBeAttached();

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
        await this.newEnrollmentPage();
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
        await expect(this.loader.getSpinLoader()).not.toBeAttached();

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
        await this.newEnrollmentPage();
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
        await expect(this.loader.getSpinLoader()).not.toBeAttached();

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
        await this.newEnrollmentPage();
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
        await expect(this.loader.getSpinLoader()).not.toBeAttached();

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
        await this.newEnrollmentPage();
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
        await this.newEnrollmentPage();
        await this.page.waitForTimeout(2000);

        await this.assetTypeRequest.click();
        await this.createAssetTypeButton.click();
        await this.page.waitForTimeout(500);

        const name = generateRandomString(8);
        await this.popupAssetNameField.fill(name);
        await this.comment.fill(name);
        await this.popupSubmitButton.click();
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
        await this.newEnrollmentPage();
        await this.page.waitForTimeout(2000);
        await this.approveAssetTypeRequest.click();
        await expect(this.loader.getSpinLoader()).not.toBeAttached();
        await this.viewButton.click();
        await this.popupSubmitButton.click();

        const actionDropdown = this.actionDropdown;
        const tooltipMessage = await actionDropdown.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log(tooltipMessage);

        expect(tooltipMessage).toBe('Please select an item in the list.');

        await this.page.waitForTimeout(1000);

        await this.actionDropdown.selectOption({ value: 'APPROVED' });

        await this.popupSubmitButton.click();

        const commentField = this.comment;
        const commentTooltipMessage = await commentField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log(commentTooltipMessage);

        expect(commentTooltipMessage).toBe('Please fill out this field.');

        await this.page.waitForTimeout(1000);

        await this.comment.fill("Thank you !!");

        await this.popupSubmitButton.click();
        console.log(await this.page.locator(".Toastify__toast-body").textContent());
        await this.page.locator(".Toastify__toast-body").isVisible();
    }

    async approveAssetTypeRequestRejected() {
        // TC_AM_142
        await this.newEnrollmentPage();
        await this.page.waitForTimeout(2000);
        await this.approveAssetTypeRequest.click();
        await expect(this.loader.getSpinLoader()).not.toBeAttached();
        await this.viewButton.click();

        await this.actionDropdown.selectOption({ value: 'REJECTED' });
        await this.comment.fill("Sorry !!");
        await this.popupSubmitButton.click();

        console.log(await this.page.locator(".Toastify__toast-body").textContent());
        await this.page.locator(".Toastify__toast-body").isVisible();
    }

    async approveAssetTypeRequestCross() {
        // TC_AM_143
        await this.newEnrollmentPage();
        await this.page.waitForTimeout(2000);
        await this.approveAssetTypeRequest.click();
        await expect(this.loader.getSpinLoader()).not.toBeAttached();
        await this.viewButton.click();
        await this.popupCrossIcon.click();
        await this.page.waitForTimeout(2000);
        await expect(this.page.locator("#staticBackdropLabel")).toBeHidden();
    }

    async approveAssetTypeRequestCancel() {
        // TC_AM_144
        await this.newEnrollmentPage();
        await this.page.waitForTimeout(2000);
        await this.approveAssetTypeRequest.click();
        await expect(this.loader.getSpinLoader()).not.toBeAttached();
        await this.page.waitForSelector('//div[@id="tab3"]//tbody/tr[1]/td[6]/a');
        await this.viewButton.click();
        await this.page.waitForTimeout(500);
        await this.popupCancelButton.click();
        await this.page.waitForTimeout(3000);
        await expect(this.page.locator("#staticBackdropLabel")).toBeHidden();
    }

    async approveAssetTypeRequestCommentApprove() {
        // TC_AM_145
        await this.newEnrollmentPage();
        await this.page.waitForTimeout(2000);
        await this.approveAssetTypeRequest.click();
        await expect(this.loader.getSpinLoader()).not.toBeAttached();
        await this.viewButton.click();
        const name = await this.page.locator("(//table[@class='resume custom'])[1]/tbody/tr/td[2]").textContent();
        const trimmedName = name?.trim();
        console.log("Approve name:", trimmedName);
        await this.actionDropdown.selectOption({ value: 'APPROVED' });
        const comment = "Thank you for conformation !!";
        await this.comment.fill(comment);
        await this.popupSubmitButton.click();

        await this.page.waitForTimeout(5000);

        await this.assetTypeRequest.click();
        await this.page.waitForTimeout(5000);
        await expect(this.loader.getSpinLoader()).not.toBeAttached();

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
        await this.newEnrollmentPage();
        await this.page.waitForTimeout(2000);
        await this.approveAssetTypeRequest.click();
        await expect(this.loader.getSpinLoader()).not.toBeAttached();
        await this.viewButton.click();
        const name = await this.page.locator("(//table[@class='resume custom'])[1]/tbody/tr/td[2]").textContent();
        const trimmedName = name?.trim();
        console.log("Reject name:", trimmedName);
        await this.actionDropdown.selectOption({ value: 'REJECTED' });
        const comment = "Thank you for conformation !!";
        await this.comment.fill(comment);
        await this.popupSubmitButton.click();

        await this.page.waitForTimeout(5000);

        await this.assetTypeRequest.click();
        await this.page.waitForTimeout(5000);
        await expect(this.loader.getSpinLoader()).not.toBeAttached();

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
        await this.newEnrollmentPage();
        await this.page.waitForTimeout(2000);
        await this.assetTypeRequest.click();
        await expect(this.loader.getSpinLoader()).not.toBeAttached();
        await this.page.waitForTimeout(3000);
        await this.createAssetTypeButton.click();
        const name = generateRandomString(8);
        await this.popupAssetNameField.fill(name);
        await this.comment.fill(name);
        await this.popupSubmitButton.click();
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
        await this.newEnrollmentPage();
        await this.page.waitForTimeout(2000);
        await this.approveAssetTypeRequest.click();
        await expect(this.loader.getSpinLoader()).not.toBeAttached();
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
