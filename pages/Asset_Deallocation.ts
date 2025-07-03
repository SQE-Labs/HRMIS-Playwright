import { Page, Locator, expect } from "@playwright/test";
import { AssetManagementTab } from "./Asset_Management_Tab";
import { Loader } from "../components/loaders";
import { BasePage } from "./Basepage";
import { OverView } from "./Asset_OverView";
import { text } from "stream/consumers";
import { count } from "console";
import { Asset_Allocation } from "./Asset_Allocation";
import { promises } from "dns";
import { pathToFileURL } from "url";
import { publicDecrypt } from "crypto";


export class Asset_DeAllocation extends BasePage {

    private DeAllocationSubtab: Locator
    private DeAllocationHeader: Locator
    private DeAllocationDropDown: Locator
    private RecordsSelectedOption: Locator
    private EmptySelectedOption: Locator
    private DeAllocationDropDownList: Locator
    private DeAllocationOption: Locator
    private DeAllocationOptionDetails: Locator
    private DeAllocationNoRecord: Locator
    private DeAllocationRecords: Locator
    private Detelebutton: Locator
    private PopUp: Locator
    private DeAllocationAssetConditiion: Locator
    private DeAllocationAssetConditionOptions: Locator
    private Submitbutton: Locator
    public Loader: Loader




    constructor(page: Page) {
        super(page);
        this.DeAllocationSubtab = page.locator("//a[text()='Asset De-allocation']")
        this.DeAllocationHeader = page.locator(".d-flex")
        this.DeAllocationDropDown = page.locator(".col-md-6")
        this.RecordsSelectedOption = page.locator('//*[@id="react-select-2-option-0"]')
        this.EmptySelectedOption = page.locator('//*[@id="react-select-2-option-0"]')
        this.DeAllocationDropDownList = page.locator(" .css-1nmdiq5-menu")
        this.DeAllocationOption = page.locator(" .css-10wo9uf-option")
        this.DeAllocationOptionDetails = page.locator(".table-responsive")
        this.DeAllocationNoRecord = page.locator(".fs-4.text-secondary.text-center")
        this.DeAllocationRecords = page.locator("tbody>tr")
        this.Detelebutton = page.locator("(//table[@class='resume custom']//td/a)[1]")
        this.DeAllocationAssetConditiion = page.locator("#assetCondition")
        this.PopUp = page.locator(".modal-title")
        this.DeAllocationAssetConditionOptions = page.locator("(//select[@id='assetCondition']/option)[8]")
        this.Submitbutton = page.locator("button[type = 'submit']")
        this.Loader = new Loader(page)
    }




    async DeAllocation() {
        // TC_AM_044
        const assetManagementTab = new AssetManagementTab(this.page);
        await assetManagementTab.expandAssetManagementTab();
        await this.DeAllocationSubtab.click();

        // Assert visibility
        expect(await this.DeAllocationHeader.isVisible()).toBeTruthy()
        expect(await this.DeAllocationDropDown.isVisible()).toBeTruthy()

        // TC_AM_045 - Click and validate dropdown
        await this.DeAllocationDropDown.click();
        await expect(this.DeAllocationDropDownList).toBeVisible();
    }

    // TC_AM_046
    async RecordSelectedOption() {
        const assetManagementTab = new AssetManagementTab(this.page);
        await assetManagementTab.expandAssetManagementTab();
        await this.DeAllocationSubtab.click();
        await this.DeAllocationDropDown.click();
        console.log(await this.RecordsSelectedOption.textContent());
        await this.RecordsSelectedOption.click()
        await this.page.waitForTimeout(1000);
        await this.RecordsSelectedOption.isVisible()

        const ValidDetails = await this.DeAllocationRecords.allTextContents();


        if (ValidDetails.length !== 0) {
            console.log("Selected Employee List appears")
            console.log(await this.page.locator("tbody>tr").allTextContents())

            //    TC_AM_047
            await this.Detelebutton.click()
            await this.page.waitForTimeout(1000)


            expect(await this.PopUp.isVisible()).toBeTruthy()
            expect(await this.page.locator(".modal-body").isVisible()).toBeTruthy()

            // TC_AM_048
            await this.Submitbutton.click()
            var assetConditionField = this.page.locator("select[id='assetCondition']");
            // Get the validation message
            var tooltipMessage = await assetConditionField.evaluate(el => (el as HTMLInputElement).validationMessage);
            console.log('Tooltip message:', tooltipMessage);
            // Validate the expected message
            expect(tooltipMessage).toBe('Please select an item in the list.')

            // TC_AM_049
            await this.DeAllocationAssetConditiion.click()
            await this.DeAllocationAssetConditiion.isVisible()
            // TC_AM_050
            await this.page.selectOption('#assetCondition', { label: 'Good condition' });

            // TC_AM_051
            await this.Submitbutton.click()

            var RepairCostField = this.page.locator("//input[@type = 'tel']");
            var tooltipMessage = await RepairCostField.evaluate(el => (el as HTMLInputElement).validationMessage);
            console.log('Tooltip message:', tooltipMessage);
            expect(tooltipMessage).toBe('Please fill out this field.')

            // TC_AM_053
            await this.page.locator("//input[@type = 'tel']").fill('150')


            // TC_AM_054
            await this.Submitbutton.click()
            var CommentField = this.page.locator("#comment");
            var tooltipMessage = await CommentField.evaluate(el => (el as HTMLInputElement).validationMessage);
            console.log('Tooltip message:', tooltipMessage);
            expect(tooltipMessage).toBe('Please fill out this field.')

            // TC_AM_055
            await this.page.locator("#comment").fill("received")
            await this.Submitbutton.click()
            await this.page.getByText("Successfully deallocated!").isVisible()

        }
    }
    async Emptyselectetoption() {
        const assetManagementTab = new AssetManagementTab(this.page);
        await assetManagementTab.expandAssetManagementTab();
        await this.DeAllocationSubtab.click();
        await this.DeAllocationDropDown.click();

        await this.EmptySelectedOption.textContent()
        await this.EmptySelectedOption.click()
        await expect(this.EmptySelectedOption).toBeVisible()

        const EmptyDetails = await this.DeAllocationRecords.allTextContents()

        if (EmptyDetails.length === 0) {
            console.log(await this.DeAllocationNoRecord.textContent())
            return null
        }

    }
}
