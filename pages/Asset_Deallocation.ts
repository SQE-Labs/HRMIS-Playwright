import { Page, Locator, expect } from "@playwright/test";
import { AssetManagementTab } from "./Asset_Management_Tab";
import { Loader } from "../components/loaders";
import { BasePage } from "./Basepage";
import { AssetAllocation } from "./Asset_Allocation";

export class AssetDeallocation extends BasePage {
    private deallocationSubtab: Locator;
    private deallocationHeader: Locator;
    private deallocationDropdown: Locator;
    private recordsSelectedOption: Locator;
    private emptySelectedOption: Locator;
    private deallocationDropdownList: Locator;
    private deallocationOption: Locator;
    private deallocationOptionDetails: Locator;
    private deallocationNoRecord: Locator;
    private deallocationRecords: Locator;
    private deleteButton: Locator;
    private popup: Locator;
    private deallocationAssetCondition: Locator;
    private deallocationAssetConditionOptions: Locator;
    private submitButton: Locator;
    public loader: Loader;

    constructor(page: Page) {
        super(page);
        this.deallocationSubtab = page.locator("//a[text()='Asset De-allocation']");
        this.deallocationHeader = page.locator(".d-flex");
        this.deallocationDropdown = page.locator(".col-md-6");
        this.recordsSelectedOption = page.locator('//*[@id="react-select-2-option-0"]');
        this.emptySelectedOption = page.locator('//*[@id="react-select-2-option-0"]');
        this.deallocationDropdownList = page.locator(" .css-1nmdiq5-menu");
        this.deallocationOption = page.locator(" .css-10wo9uf-option");
        this.deallocationOptionDetails = page.locator(".table-responsive");
        this.deallocationNoRecord = page.locator(".fs-4.text-secondary.text-center");
        this.deallocationRecords = page.locator("tbody>tr");
        this.deleteButton = page.locator("(//table[@class='resume custom']//td/a)[1]");
        this.deallocationAssetCondition = page.locator("#assetCondition");
        this.popup = page.locator(".modal-title");
        this.deallocationAssetConditionOptions = page.locator("(//select[@id='assetCondition']/option)[8]");
        this.submitButton = page.locator("button[type = 'submit']");
        this.loader = new Loader(page);
    }

    async deallocation() {
        // TC_AM_044
        const assetManagementTab = new AssetManagementTab(this.page);
        await assetManagementTab.expandAssetManagementTab();
        await this.deallocationSubtab.click();

        // Assert visibility
        expect(await this.deallocationHeader.isVisible()).toBeTruthy();
        expect(await this.deallocationDropdown.isVisible()).toBeTruthy();

        // TC_AM_045 - Click and validate dropdown
        await this.deallocationDropdown.click();
        await expect(this.deallocationDropdownList).toBeVisible();
    }

    // TC_AM_046
    async recordSelectedOption() {
        const assetManagementTab = new AssetManagementTab(this.page);
        await assetManagementTab.expandAssetManagementTab();
        await this.deallocationSubtab.click();
        await this.deallocationDropdown.click();
        console.log(await this.recordsSelectedOption.textContent());
        await this.recordsSelectedOption.click();
        await this.page.waitForTimeout(1000);
        await this.recordsSelectedOption.isVisible();

        const validDetails = await this.deallocationRecords.allTextContents();

        if (validDetails.length !== 0) {
            console.log("Selected Employee List appears");
            console.log(await this.page.locator("tbody>tr").allTextContents());

            //    TC_AM_047
            await this.deleteButton.click();
            await this.page.waitForTimeout(1000);

            expect(await this.popup.isVisible()).toBeTruthy();
            expect(await this.page.locator(".modal-body").isVisible()).toBeTruthy();

            // TC_AM_048
            await this.submitButton.click();
            const assetConditionField = this.page.locator("select[id='assetCondition']");
            // Get the validation message
            const tooltipMessage = await assetConditionField.evaluate(el => (el as HTMLInputElement).validationMessage);
            console.log('Tooltip message:', tooltipMessage);
            // Validate the expected message
            expect(tooltipMessage).toBe('Please select an item in the list.');

            // TC_AM_049
            await this.deallocationAssetCondition.click();
            await this.deallocationAssetCondition.isVisible();
            // TC_AM_050
            await this.page.selectOption('#assetCondition', { label: 'Good condition' });

            // TC_AM_051
            await this.submitButton.click();

            const repairCostField = this.page.locator("//input[@type = 'tel']");
            const tooltipMessage2 = await repairCostField.evaluate(el => (el as HTMLInputElement).validationMessage);
            console.log('Tooltip message:', tooltipMessage2);
            expect(tooltipMessage2).toBe('Please fill out this field.');

            // TC_AM_053
            await this.page.locator("//input[@type = 'tel']").fill('150');

            // TC_AM_054
            await this.submitButton.click();
            const commentField = this.page.locator("#comment");
            const tooltipMessage3 = await commentField.evaluate(el => (el as HTMLInputElement).validationMessage);
            console.log('Tooltip message:', tooltipMessage3);
            expect(tooltipMessage3).toBe('Please fill out this field.');

            // TC_AM_055
            await this.page.locator("#comment").fill("received");
            await this.submitButton.click();
            await this.page.getByText("Successfully deallocated!").isVisible();
        }
    }

    async emptySelectedOptions() {
        const assetManagementTab = new AssetManagementTab(this.page);
        await assetManagementTab.expandAssetManagementTab();
        await this.deallocationSubtab.click();
        await this.deallocationDropdown.click();
        await this.emptySelectedOption.textContent();
        await this.emptySelectedOption.click();
        await expect(this.emptySelectedOption).toBeVisible();

        const emptyDetails = await this.deallocationRecords.allTextContents();

        if (emptyDetails.length === 0) {
            console.log(await this.deallocationNoRecord.textContent());
            return null;
        }
    }
}
