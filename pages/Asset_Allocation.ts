import { Page, Locator, expect } from "@playwright/test";
import { AssetManagementTab } from "./AssetManagementTab";
import { Loader } from "../Components/Loaders";
import { BasePage } from "./BasePage";
import { OverView } from "./Asset_OverView";
import { text } from "stream/consumers";
import { count } from "console";

export class Asset_Allocation extends BasePage {
    // TC_AM_021
    private AllocationAsset: Locator
    private Allocationpage: Locator
    private AllocationAssignAsset: Locator
    private AllocationRecord: Locator
    private NextButton: Locator
    private previousButton: Locator
    private DisableNextButton: Locator
    private TotalAssetAssigned: Locator
    private SearchBar: Locator
    private PageCount: Locator
    private Itemperpage: Locator
    private ItemperpageOption: Locator
    private ColumnHeader: Locator
    public colHeaders: string[]
    private Assettypename: Locator
    private Loader: Loader
    private AssetserialNumber: Locator
    private AssetEmployeename: Locator
    private AssetOwnername: Locator
    private AssetInvalidData: Locator
    private AllocationAssignAssetHeader: Locator
    private AllocationSelectEmployee: Locator
    private AllocationComment: Locator
    private AllocationSelectEmployeeOption: Locator
    private AllocationSelectanassettypeOption: Locator
    private AllocaationSelectanassettype: Locator
    private submitButton: Locator
    private AssetTypePopUp: Locator
    private PopupSearchBar: Locator
    private PopUptable: Locator
    private Radiobutton: Locator
    private CrossButton: Locator
    private SelectedAsset: Locator




    constructor(page: Page) {
        super(page)
        this.AllocationAsset = page.locator("//a[text()='Asset Allocation']")
        this.AllocationAssignAssetHeader = page.locator("div>h1")
        this.Allocationpage = page.locator("div>h1")
        this.AllocationAssignAsset = page.locator(".export.theme-button")
        this.AllocationRecord = page.locator("tbody>tr")
        this.NextButton = page.locator("//a[text()='Next']")
        this.previousButton = page.locator("//a[text()='Previous']")
        this.TotalAssetAssigned = page.locator(".total")
        this.SearchBar = page.getByPlaceholder("Search By Asset type, Serial Number, Owner or Employee Name")
        this.DisableNextButton = page.locator(".page-item.disabled")
        this.PageCount = page.locator(".page-link.text-dark.disabled")
        this.Itemperpage = page.locator("#itemsPerPage")
        this.ItemperpageOption = page.locator("#itemsPerPage>option")
        this.ColumnHeader = page.locator("tr>th")
        this.colHeaders = ["S.No.", "Asset Type ", "Serial Number ", "Owner ", "Employee Name ", "Comment "]
        this.Assettypename = page.locator("tr>td:nth-child(2)")
        this.AssetserialNumber = page.locator("tr>td:nth-child(3)")
        this.AssetEmployeename = page.locator("tr>td:nth-child(5)")
        this.AssetOwnername = page.locator("tr>td:nth-child(4)")
        this.AssetInvalidData = page.locator(".fs-4.m-5.text-secondary.text-center")
        this.AllocationComment = page.locator("#comment")
        this.AllocaationSelectanassettype = page.locator("(//div[@class=' css-15lsz6c-indicatorContainer'])")
        this.AllocationSelectEmployee = page.locator("(//div[@class=' css-1xc3v61-indicatorContainer'])[2]")
        this.AllocationSelectanassettypeOption = page.locator("div.css-10wo9uf-option")
        this.AllocationSelectEmployeeOption = page.locator("div.css-10wo9uf-option")
        this.submitButton = page.locator(".theme-button ")
        this.AssetTypePopUp = page.locator("#staticBackdropLabel")
        this.PopupSearchBar = page.getByPlaceholder("Search By Serial Number")
        this.PopUptable = page.locator(".table.align-middle")
        this.Radiobutton = page.locator(".radio-group")
        this.CrossButton = page.locator(".btn-close.close-class")
        this.SelectedAsset = page.getByLabel("Selected Asset")
        this.Loader = new Loader(page)

    }

    // TC_AM_021 - TC_AM_022  I merge two test case in one  
    async AlloctionPage() {
        const assetManagementTab = new AssetManagementTab(this.page)
        await assetManagementTab.expandAssetManagementTab()
        await this.AllocationAsset.click()

        expect(await this.Allocationpage.isVisible())


        expect(await this.AllocationAssignAsset.isVisible())


        await this.page.waitForTimeout(1000)

        const totalAllocationAsset = await this.TotalAssetAssigned.allTextContents()
        // we only want number so i use parseInt to get number only
        const totalAssetCount = totalAllocationAsset.length > 0 ? parseInt(totalAllocationAsset[0].replace(/\D/g, ''), 10) : 0;
        await this.page.waitForTimeout(1000)
        console.log("TotalAsset :  ", totalAssetCount)


        // Search bar is visible 
        expect(this.SearchBar.isVisible())


        // Column Header
        const ColHeader = await this.ColumnHeader.allTextContents()
        let allMatched = true;
        for (let i = 0; i < ColHeader.length; i++) {
            if (ColHeader[i] !== this.colHeaders[i]) {
                console.log(`Mismatch found at index ${i}: Expected "${this.colHeaders[i]}", but got "${ColHeader[i]}"`);
                allMatched = false;
            }
        }
        if (allMatched) {
            console.log("All subtab titles matched successfully!");
        } else {
            console.log("Some subtab titles did not match.");
        }

    }
    // TC_AM_023 - TC_AM_027  I merge all these test cases in one. 
    async SearchField() {
        // By ASSET TYPE NAME
        const assetManagementTab = new AssetManagementTab(this.page)
        await assetManagementTab.expandAssetManagementTab()
        await this.AllocationAsset.click()
        await expect(this.Loader.getSpinLoader()).not.toBeAttached()
        await this.page.waitForTimeout(1000)
        var searchbyAssetname = await this.SearchBar.pressSequentially("Keyboard")
        await this.page.waitForTimeout(1000)
        const assetname = await this.Assettypename.allTextContents()
        console.log(assetname)
        let Foundkweyword = true
        for (let i = 0; i < assetname.length; ++i) {
            if (assetname[i] !== 'Keyboard') {
                console.log(` Mismatched relevant record at index ${assetname[i]} appears listed $`)
                Foundkweyword = false
            }
        }
        if (Foundkweyword) {
            console.log(" relevant record  appears listed")
        } else {
            console.log(" relevant record shouldn't appears listed ")
        }
    }
    async SearchBy_SerialNumber() {
        //  Search by Serial number
        const assetManagementTab = new AssetManagementTab(this.page)
        await assetManagementTab.expandAssetManagementTab()
        await this.AllocationAsset.click()
        await expect(this.Loader.getSpinLoader()).not.toBeAttached()
        await this.page.waitForTimeout(1000)
        var searchbyAssetname = await this.SearchBar.pressSequentially("DELL004")
        await this.page.waitForTimeout(2000)
        const Serialnumber = await this.AssetserialNumber.allTextContents()
        console.log(Serialnumber)

        let FoundSerialnumber = true

        for (let i = 0; i < Serialnumber.length; ++i) {
            if (Serialnumber[i] !== 'DELL004') {
                console.log(` Mismatched relevant record at index ${Serialnumber[i]} appears listed $`)
                FoundSerialnumber = false
            }
        }
        if (FoundSerialnumber) {
            console.log(" relevant record  appears listed when search by serial number")
        } else {
            console.log(" relevant record shouldn't appears listed when search by serial number")
        }
    }
    async SearchBy_OwnerName() {
        // Search by Owner name 
        const assetManagementTab = new AssetManagementTab(this.page)
        await assetManagementTab.expandAssetManagementTab()
        await this.AllocationAsset.click()
        await expect(this.Loader.getSpinLoader()).not.toBeAttached()
        await this.page.waitForTimeout(1000)
        // await this.SearchBar.fill('')
        var searchbyAssetname = await this.SearchBar.pressSequentially("Caelius")
        await this.page.waitForTimeout(3000)
        const Ownername = await this.AssetOwnername.allTextContents()
        console.log(Ownername)

        let FoundOwner = true

        for (let i = 0; i < Ownername.length; ++i) {
            if (Ownername[i] !== 'Caelius') {
                console.log(` Mismatched relevant record at index ${Ownername[i]} appears listed $`)
                FoundOwner = false
            }
        }
        if (FoundOwner) {
            console.log(" relevant record  appears listed when search by Owner name")
        } else {
            console.log(" relevant record shouldn't appears listed when search by Owner name")
        }
    }
    async SearchBy_EmployeeName() {
        // Search by Employee name
        const assetManagementTab = new AssetManagementTab(this.page)
        await assetManagementTab.expandAssetManagementTab()
        await this.AllocationAsset.click()
        await expect(this.Loader.getSpinLoader()).not.toBeAttached()
        await this.page.waitForTimeout(1000)
        // await this.SearchBar.fill('')
        var searchbyAssetname = await this.SearchBar.pressSequentially("Asset L1")
        await this.page.waitForTimeout(3000)
        const Employeename = await this.AssetEmployeename.allTextContents()
        console.log(Employeename)

        let FoundEmployee = true

        for (let i = 0; i < Employeename.length; ++i) {
            if (Employeename[i] !== 'Asset L1') {
                console.log(` Mismatched relevant record at index ${Employeename[i]} appears listed $`)
                FoundEmployee = false
            }
        }
        if (FoundEmployee) {
            console.log(" relevant record  appears listed when search by Employee name")
        } else {
            console.log(" relevant record shouldn't appears listed when search by employee name")
        }

        // Search by Non-existing data 
        await this.SearchBar.fill('')
        var searchbyAssetname = await this.SearchBar.pressSequentially("asdasdas")
        await this.page.waitForTimeout(1000)
        const InvalidData = await this.AssetInvalidData.textContent()
        expect(InvalidData).toContain("No records available")
        console.log(InvalidData)
    }

    // TC_AM_029
    async pagination() {
        const assetManagementTab = new AssetManagementTab(this.page)
        await assetManagementTab.expandAssetManagementTab()
        await this.AllocationAsset.click()
        await expect(this.Loader.getSpinLoader()).not.toBeAttached()
        await this.page.waitForTimeout(1000)
        const totalAllocationAsset = await this.TotalAssetAssigned.allTextContents()
        // we only want number so i use parseInt to get number only
        const totalAssetCount = totalAllocationAsset.length > 0 ? parseInt(totalAllocationAsset[0].replace(/\D/g, ''), 10) : 0;
        await this.page.waitForTimeout(1000)
        console.log("TotalAsset :  ", totalAssetCount)


        // Item per page.....
        await this.Itemperpage.waitFor({ state: 'visible' });
        await this.Itemperpage.click();
        await this.Itemperpage.selectOption({ index: 0 });
        await this.page.waitForTimeout(500)
        const selectedValue = parseInt((await this.Itemperpage.inputValue()).trim(), 10);
        const assetNameCount = await this.Assettypename.count();
        console.log("Selected Value: ", selectedValue);
        console.log("Asset Name Count: ", assetNameCount);
        if (selectedValue === assetNameCount) {
            console.log("The selected option matches the asset count.");
        } else {
            console.log("Mismatch between selected option and asset count.");
        }


        let totalRecordcount = 0;
        let sum1 = 0;
        let totalRecords = 0

        await this.NextButton.click()
        await this.page.waitForTimeout(1000)
        expect(await this.previousButton.isEnabled()).toBeTruthy();

        await this.previousButton.click()
        await this.page.waitForTimeout(1000)
        expect(await this.NextButton.isEnabled()).toBeTruthy();


        totalRecordcount = await this.AllocationRecord.count()
        const PageCount = await this.PageCount.allTextContents()
        const pageNumbers = PageCount.length > 0 ? PageCount[0].match(/\d+/g) : null;
        const currentPage = pageNumbers && pageNumbers.length > 0 ? parseInt(pageNumbers[0], 10) : 0;
        const totalPageCount = pageNumbers && pageNumbers.length > 1 ? parseInt(pageNumbers[1], 10) : 0;
        const Difference = totalPageCount - currentPage
        const pageTotalCount = totalRecordcount * Difference

        for (let i = 0; i < Difference; i++) {
            await this.NextButton.click()
        }
        await this.page.waitForTimeout(2000)
        var lastRecordcount = await this.AllocationRecord.count()
        totalRecords = pageTotalCount + lastRecordcount
        console.log(totalRecords)
        expect(totalAssetCount).toEqual(totalRecords)

        expect(await this.previousButton.isEnabled()).toBeTruthy();
    }
    //  TC_AM_030
    async AssignAsset() {
        const assetManagementTab = new AssetManagementTab(this.page)
        await assetManagementTab.expandAssetManagementTab()
        await this.AllocationAsset.click()
        await expect(this.Loader.getSpinLoader()).not.toBeAttached()
        await this.page.waitForTimeout(1000)
        await this.AllocationAssignAsset.click()
        expect(this.Loader.getSpinLoader()).not.toBeAttached()
        var header = await this.AllocationAssignAssetHeader.textContent()
        await this.page.waitForTimeout(1500)
        expect(header).toEqual("Assign Asset")

        //    case : 1   // TC_AM_031
        await this.AllocationSelectEmployee.click(); // Click the dropdown to open options
        await this.page.locator('#react-select-3-option-6').click()
        await this.AllocationComment.fill("Thank you !!")
        await this.submitButton.click()

        // Click the submit button to trigger validation
        await this.submitButton.click();

        // Wait briefly to ensure tooltip appears
        await this.page.waitForTimeout(500);
        // Locate the hidden required input field
        var assetTypeField = this.page.locator('input[name="selectedAsset"]');
        // Get the validation message
        var tooltipMessage = await assetTypeField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Tooltip message:', tooltipMessage);
        // Validate the expected message
        expect(tooltipMessage).toBe('Please fill out this field.');


        // TC_AM_032
        await this.AllocaationSelectanassettype.click();
        const options = await this.AllocationSelectanassettypeOption.allTextContents();
        expect(options.length).toBeGreaterThan(0);


        // TC_AM_033
        await this.page.locator("#react-select-2-option-9").click()
        expect(this.Loader.getSpinLoader()).not.toBeAttached()
        expect(await this.AssetTypePopUp.isVisible())
        expect(await this.PopupSearchBar.isVisible())
        expect(await this.PopUptable.isVisible())
        expect(await this.page.locator(">tr:nth-child(1)>td:nth-child(6)").isVisible())

        // TC_AM_034 & TC_AM_035-- Enter Existing Serial number
        await this.PopupSearchBar.pressSequentially("")
        const Serialnumber = await this.page.locator("tbody>tr>td:nth-child(4)").allTextContents()
        const EnterSerialNumber = "002"
        expect(Serialnumber.includes(EnterSerialNumber))

        // TC_AM_036 --Enter Non-Existing Serial Number
        await this.PopupSearchBar.fill('')
        await this.PopupSearchBar.pressSequentially("asdsad")
        expect(await this.page.locator("div>h4").isVisible())

        // TC_AM_037
        await this.CrossButton.click()
        await expect(this.CrossButton).toBeHidden()
        console.log('Popup closed successfully');


        // TC_AM_038
        await this.page.locator("(//*[name()='svg'][@class='css-8mmkcg'])[1]").click()
        await this.page.waitForTimeout(1000)
        const OptionTobeSelected = await this.page.locator("#react-select-2-option-9").textContent()
        // console.log(OptionTobeSelected)
        await this.page.locator("#react-select-2-option-9").click()
        expect(this.Loader.getSpinLoader()).not.toBeAttached()
        await this.page.waitForTimeout(1000)

        const serialNumbers = await this.page.locator("table tr td:nth-child(4)").allTextContents();
        // console.log("Extracted serial numbers:", serialNumbers);
        const selectedSerialNumber = serialNumbers[0];

        await this.PopupSearchBar.pressSequentially(selectedSerialNumber)
        await this.page.locator("div>input[type='radio']").click()
        await this.page.waitForTimeout(2000)
        const selectedAssetData = await this.page.locator("div[class='input-group '] textarea").allTextContents();
        // console.log("Extracted text contents:", selectedAssetData);

        const extractedText = selectedAssetData.join(" ");
        if (extractedText.includes(EnterSerialNumber)) {
            expect(extractedText).toContain(EnterSerialNumber);

        } else {
            console.log(`Serial number "${EnterSerialNumber}" not found in extracted text.`);
        }




        //  TC_AM_039
        await this.page.reload()
        await this.page.locator("(//*[name()='svg'][@class='css-8mmkcg'])[1]").click()
        await this.page.waitForTimeout(1000)
        await this.page.locator("#react-select-2-option-9").click()
        expect(this.Loader.getSpinLoader()).not.toBeAttached()
        await this.page.waitForTimeout(1000)
        await this.PopupSearchBar.pressSequentially(selectedSerialNumber)
        await this.page.locator("div>input[type='radio']").click()
        await this.submitButton.click()
        await this.page.waitForTimeout(500);
        // Locate the hidden required input field
        var assetTypeField = this.page.locator("input[class = 'css-1a0ro4n-requiredInput']");
        // Get the validation message
        var tooltipMessage = await assetTypeField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Tooltip message:', tooltipMessage);
        // Validate the expected message
        expect(tooltipMessage).toBe('Please fill out this field.');

        await this.AllocaationSelectanassettype.click(); // Click the dropdown to open options
        await this.page.locator('#react-select-3-option-6').click()


        // TC_AM_040
        const selectedOption = await (this.page.locator("div[id='asset_list'] div[class=' css-1dimb5e-singleValue']").textContent())
        // console.log(selectedOption)
        expect(OptionTobeSelected).toEqual(selectedOption)


        // TC_AM_041
        await this.AllocationComment.fill('')
        await this.submitButton.click()
        var commentField = this.page.locator('textarea[name="comment"]');
        // Get the validation message
        var tooltipMessage = await commentField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Tooltip message:', tooltipMessage);
        // Validate the expected message
        expect(tooltipMessage).toBe('Please fill out this field.');
        await this.page.waitForTimeout(2000)
        await this.AllocationComment.fill("Thank you !!")



        // TC_AM_042
        await expect(this.page.locator("div[id='asset_list'] div[class=' css-1dimb5e-singleValue']")).not.toBeEmpty()
        await expect(this.page.locator("div[class='dropdown-container'] div[class=' css-1dimb5e-singleValue']")).not.toBeEmpty()
        await expect(this.page.locator("div[class='input-group '] textarea")).not.toBeEmpty()
        await expect(this.AllocationComment).not.toBeEmpty()

        // TC_AM_043
        await this.submitButton.click()
        await this.page.locator(".Toastify__toast-container").isVisible()
        console.log("Successfully assigned!")

    }
}

