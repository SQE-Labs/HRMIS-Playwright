import { Page, Locator, expect } from "@playwright/test";
import { AssetManagementTab } from "./AssetManagementTab";
import { Loader } from "../Components/Loaders";
import { BasePage } from "./BasePage";
import { OverView } from "./Asset_OverView";
import { text } from "stream/consumers";
import { count } from "console";
import { Asset_Allocation } from "./Asset_Allocation";
import { Asset_DeAllocation } from '../pages/Asser_DeAllocation';
import { Verify } from "crypto";


export class Asset_Enrollment extends BasePage {
    private Asset_Enrollment_subtab: Locator
    private Asset_Enrollment_Header: Locator
    private Asset_Enrollment_Tabs: Locator
    private CreateAssetTabs: Locator
    private CreateAssetTabsDetails: string[]
    private SubmitButton: Locator
    private Asset_type: Locator
    private AssettypeLocator: Locator
    private SuperOwnerLocator: Locator
    private OwnerLocator: Locator
    private Model: Locator
    private Manufacturer: Locator
    private serialNumber: Locator
    private purchaseCost: Locator
    private ValidationMessage: Locator
    private Warranty: Locator
    private WarrantyYear: Locator
    private Calender: Locator
    private comment: Locator
    private BulkAsset: Locator
    private ChooseButton: Locator
    private BulkAssetSubmitbutton: Locator
    private SccuessPopup: Locator
    private CancelButton: Locator
    private Popupmessage: Locator
    private Loader: Loader



    constructor(page: Page) {
        super(page)
        this.Asset_Enrollment_subtab = page.locator("//a[text()='New Asset Enrollment']")
        this.Asset_Enrollment_Header = page.locator(".d-flex.flex-column")
        this.Asset_Enrollment_Tabs = page.locator(".nav.nav-tabs")
        this.CreateAssetTabs = page.locator("div>label")
        this.AssettypeLocator = this.page.locator("//select[@id = 'asset_list']");
        this.SuperOwnerLocator = this.page.locator("//select[@id = 'superOwner']");
        this.OwnerLocator = this.page.locator("//select[@id = 'owner']");
        this.CreateAssetTabsDetails = [
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

        ]
        this.SubmitButton = page.locator(".theme-button ")
        this.Asset_type = page.locator("select[id='asset_list']")
        this.Model = page.locator("//input[@name = 'model']")
        this.Manufacturer = page.locator("//input[@name = 'manufacture']")
        this.serialNumber = page.locator("//input[@name = 'serialNumber']")
        this.purchaseCost = page.locator("//div//input[@name = 'purchaseCost']")
        this.ValidationMessage = page.locator(".text-danger")
        this.Warranty = page.locator("//input[@type = 'number']")
        this.WarrantyYear = page.locator("#warrantyUnit")
        this.Calender = page.locator("//input[@type = 'date']")
        this.comment = page.locator("//textarea[@id = 'comment']")
        this.BulkAsset = page.locator("//button[@id = 'tab1-tab']")
        this.ChooseButton = page.locator("//input[@type = 'file']")
        this.BulkAssetSubmitbutton = page.locator("//button[@type = 'submit']")
        this.SccuessPopup = page.locator(".modal-body")
        this.CancelButton = page.locator(".theme-button.bg-grey.mx-3.w-35")
        this.Popupmessage = page.locator('div>ol')
        this.Loader = new Loader(page)
    }


    async Enrollment() {
        // TC_AM_056
        const assetManagementTab = new AssetManagementTab(this.page);
        await assetManagementTab.expandAssetManagementTab();
        await this.Asset_Enrollment_subtab.click()
        expect(await this.Asset_Enrollment_Header.isVisible()).toBeTruthy()
        expect(await this.Asset_Enrollment_Tabs.isVisible()).toBeTruthy()

        // TC_AM_057
        expect(await this.CreateAssetTabs.allTextContents()).toEqual(this.CreateAssetTabsDetails)

        // TC_AM_058
        const AssetTypeVisible = await this.AssettypeLocator.isVisible();
        const AssetTypeinnerText = await this.AssettypeLocator.innerText();

        const SuperOwnerVisible = await this.SuperOwnerLocator.isVisible();
        const SuperOwnerinnerText = await this.SuperOwnerLocator.innerText();

        const OwnerVisible = await this.OwnerLocator.isVisible();
        const OwnerinnerText = await this.OwnerLocator.innerText();


        if ((AssetTypeVisible && AssetTypeinnerText.trim()) && (SuperOwnerVisible && SuperOwnerinnerText.trim()) && (OwnerVisible && OwnerinnerText.trim()) !== "") {
            console.log('The select element is visible and the inner text is visible.');
        } else {
            console.log('The select element or inner text is not visible.');
        }


        // TC_AM_059

        await this.SubmitButton.click()
        await this.page.waitForTimeout(1000)
        var assettypeField = this.Asset_type;
        // Get the validation message
        var tooltipMessage = await assettypeField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Asset type Tooltip message:', tooltipMessage);
        // Validate the expected message
        expect(tooltipMessage).toBe('Please select an item in the list.')



        // TC_AM_061
        await this.Asset_type.click()
        const SelectedOption = await this.AssettypeLocator.selectOption({ label: 'USB HUB Adapter' });
        const SelectedoptionDetails = this.AssettypeLocator.textContent()
        expect(this.AssettypeLocator.isVisible()).toBeTruthy()

        // TC_AM_062
        await this.SubmitButton.click()
        await this.page.waitForTimeout(1000)
        var ModelField = this.Model;
        // Get the validation message
        var tooltipMessage = await ModelField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Model Tooltip message:', tooltipMessage);
        // Validate the expected message
        expect(tooltipMessage).toBe('Please fill out this field.')

        // TC_AM_063
        // Fill all mandatory Fields.
        await this.Model.fill('3213')   // Try to enter only numbers
        await this.SuperOwnerLocator.selectOption({ label: 'CAELIUS_OWNED' });
        await this.OwnerLocator.selectOption({ label: "Caelius" })
        await this.Manufacturer.fill("HP01")
        await this.serialNumber.fill('5900')
        await this.SubmitButton.click()
        console.log(await this.ValidationMessage.textContent())
        expect(this.ValidationMessage.isVisible()).toBeTruthy()



        // TC_AM_064
        await this.Model.clear()
        await this.Model.fill('12345678901234567890123456789012345678901') // try to enter more then 40 characters
        await this.SubmitButton.click()
        console.log(await this.ValidationMessage.textContent())
        expect(this.ValidationMessage.isVisible()).toBeTruthy()


        // TC_AM_065
        await this.Model.clear()
        await this.Model.fill('Pavalian')   // Try to enter only numbers
        await this.SuperOwnerLocator.selectOption({ label: 'Select a super owner' });
        await this.SubmitButton.click()
        var SuperOwnerField = this.SuperOwnerLocator;
        // Get the validation message
        var tooltipMessage = await SuperOwnerField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Super Owner Tooltip message:', tooltipMessage);
        // Validate the expected message
        expect(tooltipMessage).toBe('Please select an item in the list.')

        // TC_AM_066
        await this.SuperOwnerLocator.selectOption({ label: 'CAELIUS_OWNED' });
        // console.log(await this.SuperOwnerLocator.innerText())
        expect(await this.SuperOwnerLocator.isVisible()).toBeTruthy();

        // TC_AM_067
        if (await this.SuperOwnerLocator.selectOption({ label: 'CAELIUS_OWNED' })) {
            console.log("When CAELIUS_OWNED option is selected")
            console.log(await this.OwnerLocator.innerText())
            expect(await this.OwnerLocator.isVisible()).toBeTruthy()
        }
        if (await this.SuperOwnerLocator.selectOption({ label: 'CLIENT_OWNED' })) {
            console.log("When CLIENT_OWNED option is selected")
            console.log(await this.OwnerLocator.innerText())
            expect(await this.OwnerLocator.isVisible()).toBeTruthy()

        }


        // TC_AM_068
        // If CAELIUS_OWNED option is selected.
        try {
            // Wait for the SuperOwnerLocator to select the option
            var superOwnerSelected = await this.SuperOwnerLocator.selectOption({ label: 'CAELIUS_OWNED' });

            if (superOwnerSelected) {
                var ownerTextVisible = await this.OwnerLocator.getByText('Select an Owner').textContent()
                if (ownerTextVisible) {
                    await this.SubmitButton.click()

                    var OwnerField = this.OwnerLocator;
                    var tooltipMessage = await OwnerField.evaluate(el => (el as HTMLInputElement).validationMessage);
                    console.log('Owner Tooltip message:', tooltipMessage);
                    expect(tooltipMessage).toBe('Please select an item in the list.')

                } else {
                    console.error('"Select an owner" text is not visible');
                }
            } else {
                console.error('SuperOwnerLocator option was not selected');
            }
        } catch (error) {
            console.error('An error occurred during the test execution:', error);
        }
        // If CLIENT_OWNED option is selected.
        await this.page.waitForTimeout(2000)
        try {
            // Wait for the SuperOwnerLocator to select the option
            var superOwnerSelected = await this.SuperOwnerLocator.selectOption({ label: 'CLIENT_OWNED' });

            if (superOwnerSelected) {

                const ownerTextElement = await this.OwnerLocator.getByText('Select an Owner').isVisible();


                if (ownerTextElement) {

                    await this.SubmitButton.click();

                    var OwnerField = this.OwnerLocator;
                    var tooltipMessage = await OwnerField.evaluate(el => (el as HTMLInputElement).validationMessage);
                    console.log('Owner Tooltip message:', tooltipMessage);


                    expect(tooltipMessage).toBe('Please select an item in the list.');
                } else {
                    console.error('"Select an Owner" text is not found on the page');
                }
            } else {
                console.error('SuperOwnerLocator option was not selected');
                throw new Error('SuperOwnerLocator option was not selected. Test case failed.');
            }
        } catch (error) {
            console.error('An error occurred during the test execution:', error);
            throw error;
        }



        // TC_AM_069
        await this.page.waitForTimeout(1000)
        var superOwnerSelected = await this.SuperOwnerLocator.selectOption({ label: 'CAELIUS_OWNED' });
        await this.OwnerLocator.selectOption({ label: 'Caelius' })
        expect(await this.OwnerLocator.isVisible()).toBeTruthy();

        // TC_AM_70
        await this.page.waitForTimeout(2000)
        await this.Manufacturer.clear()
        await this.SubmitButton.click()
        var ManufacturerField = this.Manufacturer;
        // Get the validation message
        var tooltipMessage = await ManufacturerField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Manufacturer Tooltip message:', tooltipMessage);
        // Validate the expected message
        expect(tooltipMessage).toBe('Please fill out this field.')

        // TC_AM_71
        await this.page.waitForTimeout(2000)
        await this.Manufacturer.fill('3213')
        await this.SubmitButton.click()
        console.log(await this.ValidationMessage.textContent())
        expect(this.ValidationMessage.isVisible()).toBeTruthy()

        // TC_AM_72
        await this.page.waitForTimeout(2000)
        await this.Manufacturer.clear()
        await this.Manufacturer.fill('12345678901234567890123456789012345678901') // try to enter more then 40 characters
        await this.SubmitButton.click()
        console.log(await this.ValidationMessage.textContent())
        expect(this.ValidationMessage.isVisible()).toBeTruthy()

        await this.Manufacturer.fill('HP01')



        // TC_AM_73

        await this.serialNumber.clear()
        await this.SubmitButton.click()
        var serialNumberField = this.serialNumber;
        // Get the validation message
        var tooltipMessage = await serialNumberField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('SerialNumber Tooltip message:', tooltipMessage);
        // Validate the expected message
        expect(tooltipMessage).toBe('Please fill out this field.')


        // TC_AM_74

        await this.serialNumber.clear()
        await this.serialNumber.fill('12345678901234567890123456789012345678901') // try to enter more then 40 characters
        await this.SubmitButton.click()
        console.log(await this.ValidationMessage.textContent())
        expect(this.ValidationMessage.isVisible()).toBeTruthy()

        // TC_AM_76   
        await this.serialNumber.fill('@#$%^')
        await this.SubmitButton.click()
        console.log(await this.ValidationMessage.textContent())
        expect(this.ValidationMessage.isVisible()).toBeTruthy()

        // TC_AM_77
        // Try to Enter Existing Serial number
        const usedSerialNumbers = new Set();

        // TC_AM_78
        let serialNumber = 0
        do {
            serialNumber = Math.floor(10000 + Math.random() * 90000)
        } while (usedSerialNumbers.has(serialNumber));

        // Store the serial number to prevent repetition
        usedSerialNumbers.add(serialNumber);

        await this.page.waitForTimeout(7000);
        await this.serialNumber.fill(serialNumber.toString());
        await this.page.waitForTimeout(1000);  // Wait for 1 second
        let EnterSerialNumber = await this.serialNumber.inputValue();
        console.log(EnterSerialNumber)
        await expect(this.WarrantyYear).toBeDisabled();
        await this.Warranty.fill('1');
        await expect(this.WarrantyYear).toBeEnabled();


        // TC_AM_80
        // Enter negative value
        await this.Warranty.fill('-1')
        await this.SubmitButton.click()
        console.log(await this.ValidationMessage.textContent())
        expect(this.ValidationMessage.isVisible()).toBeTruthy()

        // TC_AM_81
        // Enter More then 10
        await this.Warranty.fill('11')
        await this.SubmitButton.click()
        console.log(await this.ValidationMessage.textContent())
        expect(this.ValidationMessage.isVisible()).toBeTruthy()


        // TC_AM_82
        // Enter More then 120 and select month
        await this.Warranty.fill('121')
        await this.WarrantyYear.selectOption({ label: 'Month' });
        await this.SubmitButton.click()
        console.log(await this.ValidationMessage.textContent())
        expect(this.ValidationMessage.isVisible()).toBeTruthy()
        await this.Warranty.fill('120')


        // TC_AM_083
        const PurchaseCost = await this.purchaseCost.getAttribute('value')
        expect(PurchaseCost).toEqual("0");

        // TC_AM_84
        await this.purchaseCost.clear()
        await this.purchaseCost.fill('@#$%^&*')
        await this.SubmitButton.click()
        console.log(await this.ValidationMessage.textContent())
        expect(this.ValidationMessage.isVisible()).toBeTruthy()




        // TC_AM_85
        await this.purchaseCost.clear()
        await this.purchaseCost.fill('1000001')
        await this.SubmitButton.click()
        console.log(await this.ValidationMessage.textContent())
        expect(this.ValidationMessage.isVisible()).toBeTruthy()
        await this.purchaseCost.fill('100')


        // TC_AM_86
        var futureDate = new Date();

        // Add 1 day to today's date (to get tomorrow's date)
        futureDate.setDate(futureDate.getDate() + 1);

        // Format the future date as 'YYYY-MM-DD'
        const futureDates = futureDate.toISOString().split('T')[0];
        await this.Calender.pressSequentially(futureDates); // Try to enter future dates
        console.log(await this.page.locator(".Toastify__toast-body").textContent())
        await this.page.locator(".Toastify__toast-body").isVisible()
        await this.page.waitForTimeout(7000)


        // TC_AM_87
        // Enter more than 256 characters 
        const today = new Date()
        today.setDate(today.getDate())
        const presentDate = today.toISOString().split('T')[0];
        await this.Calender.pressSequentially(presentDate);
        await this.comment.fill("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,.")
        await this.SubmitButton.click()
        // console.log(await this.page.locator(".Toastify__toast-body").textContent())
        await this.page.locator(".Toastify__toast-body").isVisible()
        await this.comment.fill("Thnk you !!")

        // TC_AM_88
        await this.page.waitForTimeout(7000)
        await this.SubmitButton.click()
        await this.page.waitForTimeout(500)
        console.log(await this.page.locator(".Toastify__toast-body").textContent())
        await this.page.locator(".Toastify__toast-body").isVisible()

        // TC_AM_89
        const overView = new OverView(this.page);
        this.page.locator("//a[text()='Asset Overview']").click()
        await expect(this.Loader.getThreeDotClass()).not.toBeAttached()
        await this.page.getByTitle("USB HUB Adapter").click()
        await expect(this.Loader.getSpinLoader()).not.toBeAttached()

        var ExistingSerialnumber = await this.page.locator("tbody>tr>td:nth-child(4)").allTextContents()
        expect(ExistingSerialnumber).toContain(EnterSerialNumber)

        // TC_AM_90
        await this.Asset_Enrollment_subtab.click()
        await expect(this.Loader.getSpinLoader()).not.toBeAttached()
        await this.BulkAsset.click()
        await this.page.locator(".has-asterisk").isVisible()
        await this.ChooseButton.isVisible()
        await this.BulkAssetSubmitbutton.isVisible()


        // TC_AM_091

        var fileInputSelector = "//input[@type = 'file']"

        // var filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\ValidDocument.xlsx'; // Specify the path to the file you want to upload
        // await this.page.setInputFiles(fileInputSelector, filePath);
        // await this.BulkAssetSubmitbutton.click()
        // console.log(await this.SccuessPopup.innerText())
        // await this.SccuessPopup.isVisible()


        // TC_AM_092
        await this.page.waitForTimeout(7000)
        // await this.page.locator(".btn-close").click()``
        fileInputSelector = "//input[@type = 'file']"
        var filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\abc.docx'; // Specify the path to the file you want to upload
        await this.page.setInputFiles(fileInputSelector, filePath);
        console.log(await this.page.locator(".Toastify__toast-body").textContent())
        await this.page.locator(".Toastify__toast-body").isVisible()
        await this.page.waitForTimeout(1000)

        // TC_AM_093
        var BulkAssetField = this.page.locator("//input[@type = 'file']");
        await this.BulkAssetSubmitbutton.click()
        // Get the validation message
        var tooltipMessage = await BulkAssetField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Asset type Tooltip message:', tooltipMessage);
        // Validate the expected message
        expect(tooltipMessage).toBe('Please select a file.')

        // TC_AM_094
        filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\AssetType_Column.xlsx';
        await this.page.setInputFiles(fileInputSelector, filePath);
        await this.page.waitForSelector(fileInputSelector, { state: 'attached' });
        await this.BulkAssetSubmitbutton.click();
        await this.Popupmessage.waitFor({ state: 'visible' });
        console.log(await this.page.locator('div>ol').allInnerTexts());

        // TC_AM_095
        await this.page.locator(".btn-close").click();
        await this.page.waitForTimeout(1000);
        filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\Model_Column.xlsx';
        await this.page.setInputFiles(fileInputSelector, filePath);
        await this.page.waitForSelector(fileInputSelector, { state: 'attached' });

        await this.BulkAssetSubmitbutton.click();
        await this.Popupmessage.waitFor({ state: 'visible' });
        console.log(await this.page.locator('div>ol').allInnerTexts());
        await this.page.locator(".btn-close").click();

        // TC_AM_096
        await this.page.waitForTimeout(2000);
        filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\Owner_Column.xlsx';
        await this.page.setInputFiles(fileInputSelector, filePath);
        await this.page.waitForSelector(fileInputSelector, { state: 'attached' });
        await this.BulkAssetSubmitbutton.click();  // Submit the last file
        await this.Popupmessage.waitFor({ state: 'visible' });
        console.log(await this.page.locator('div>ol').allInnerTexts())
        await this.page.locator(".btn-close").click();


        // TC_AM_097
        await this.page.waitForTimeout(2000);
        filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\Manufracture.xlsx';
        await this.page.setInputFiles(fileInputSelector, filePath);
        await this.page.waitForSelector(fileInputSelector, { state: 'attached' });
        await this.BulkAssetSubmitbutton.click();
        await this.Popupmessage.waitFor({ state: 'visible' });
        console.log(await this.page.locator('div>ol').allInnerTexts())
        await this.page.locator(".btn-close").click();

        // TC_AM_098
        // await this.page.waitForTimeout(2000);
        // filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\SerialNumber.xlsx';
        // await this.page.setInputFiles(fileInputSelector, filePath);
        // await this.page.waitForSelector(fileInputSelector, { state: 'attached' });
        // await this.BulkAssetSubmitbutton.click();
        // await this.Popupmessage.waitFor({ state: 'visible' });
        // console.log(await this.page.locator('div>ol').allInnerTexts())
        // await this.page.locator(".btn-close").click();

        // TC_AM_099
        // await this.page.waitForTimeout(2000);
        // filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\Warranty.xlsx';
        // await this.page.setInputFiles(fileInputSelector, filePath);
        // await this.page.waitForSelector(fileInputSelector, { state: 'attached' });
        // await this.BulkAssetSubmitbutton.click()
        // await this.Popupmessage.waitFor({ state: 'visible' });
        // console.log(await this.page.locator('div>ol').allInnerTexts())
        // await this.page.locator(".btn-close").click();

        // TC_AM_100
        // await this.page.waitForTimeout(2000);
        // filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\Purchase.xlsx';
        // await this.page.setInputFiles(fileInputSelector, filePath);
        // await this.page.waitForSelector(fileInputSelector, { state: 'attached' });
        // await this.BulkAssetSubmitbutton.click();
        // await this.Popupmessage.waitFor({ state: 'visible' });
        // console.log(await this.page.locator('div>ol').allInnerTexts())
        // await this.page.locator(".btn-close").click();

        // TC_AM_101
        // await this.page.waitForTimeout(2000);
        // filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\Processor.xlsx';
        // await this.page.setInputFiles(fileInputSelector, filePath);
        // await this.page.waitForSelector(fileInputSelector, { state: 'attached' });
        // await this.BulkAssetSubmitbutton.click();  // Submit the last file
        // await this.Popupmessage.waitFor({ state: 'visible' });
        // console.log(await this.page.locator('div>ol').allInnerTexts())
        // await this.page.locator(".btn-close").click();

        // TC_AM_102
        await this.page.waitForTimeout(2000);
        filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\superOwner.xlsx';
        await this.page.setInputFiles(fileInputSelector, filePath);
        await this.page.waitForSelector(fileInputSelector, { state: 'attached' });
        await this.BulkAssetSubmitbutton.click();  // Submit the last file
        await this.Popupmessage.waitFor({ state: 'visible' });
        console.log(await this.page.locator('div>ol').allInnerTexts())
        await this.page.locator(".btn-close").click()

        // TC_AM_106
        filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\ExistingSerialNumber.xlsx';
        await this.page.setInputFiles(fileInputSelector, filePath);
        await this.page.waitForSelector(fileInputSelector, { state: 'attached' });
        await this.BulkAssetSubmitbutton.click();  // Submit the last file
        await this.Popupmessage.waitFor({ state: 'visible' });
        console.log(await this.page.locator('div>ol').allInnerTexts())
        await this.page.locator(".btn-close").click()

        // TC_AM_115
        filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\NonExistingAssetType.xlsx';
        await this.page.setInputFiles(fileInputSelector, filePath);
        await this.page.waitForSelector(fileInputSelector, { state: 'attached' });
        await this.BulkAssetSubmitbutton.click();  // Submit the last file
        await this.Popupmessage.waitFor({ state: 'visible' });
        console.log(await this.page.locator('div>ol').allInnerTexts())
        await this.page.locator(".btn-close").click()

        // TC_AM_121
        filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\NoUnit.xlsx';
        await this.page.setInputFiles(fileInputSelector, filePath);
        await this.page.waitForSelector(fileInputSelector, { state: 'attached' });
        await this.BulkAssetSubmitbutton.click();  // Submit the last file
        await this.Popupmessage.waitFor({ state: 'visible' });
        console.log(await this.page.locator('div>ol').allInnerTexts())
        await this.page.locator(".btn-close").click()
        
    }
}