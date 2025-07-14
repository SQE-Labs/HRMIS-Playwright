import { Page, Locator, expect } from "@playwright/test";
import { AssetManagementTab } from "./Asset_Management_Tab";
import { Loader } from "../components/loaders";
import { BasePage } from "./Basepage";
import { AssetHelper } from "../helpers/AssetHelpers";

export class AssetDeallocation extends BasePage {
    private deallocationSubtab: Locator;
    private deallocationHeader: Locator;
    private deallocationDropdown: Locator;
    private SelectedOption: Locator;
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
        this.SelectedOption = page.locator('//*[@id="react-select-2-option-1"]');
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
        const assetManagementTab = new AssetManagementTab(this.page);
        await AssetHelper.navigateToDeallocationTab(this.deallocationSubtab, assetManagementTab);

        expect(await this.deallocationHeader.isVisible()).toBeTruthy();
        expect(await this.deallocationDropdown.isVisible()).toBeTruthy();

        await this.deallocationDropdown.click();
        await expect(this.deallocationDropdownList).toBeVisible();
    }


    async handleDeallocationFlow() {
        const assetManagementTab = new AssetManagementTab(this.page);
        await AssetHelper.navigateToDeallocationTab(this.deallocationSubtab, assetManagementTab);

        await this.deallocationDropdown.click();
        await this.SelectedOption.click();
        await expect(this.loader.getThreeDotLoader()).not.toBeAttached();
        const validDetails = await this.deallocationRecords.allTextContents();
        if (validDetails.length === 0) {
            if (await this.deallocationNoRecord.isVisible()) {
                console.debug(await this.deallocationNoRecord.textContent());
                return;
            } else {
                throw new Error("No records found, but 'No Records' message not visible.");
            }
        }

        console.debug("Selected Employee List appears");
        expect(await this.deallocationOptionDetails.isVisible()).toBeTruthy();
        // console.debug(await this.page.locator("tbody>tr").allTextContents());

        // TC_AM_047
        await this.deleteButton.click();
        await this.page.waitForTimeout(1000);
        expect(await this.popup.isVisible()).toBeTruthy();
        expect(await this.page.locator(".modal-body").isVisible()).toBeTruthy();

        // TC_AM_048
        await this.submitButton.click();
        const assetConditionField = this.page.locator("select[id='assetCondition']");
        const tooltipMessage = await AssetHelper.getValidationMessage(assetConditionField);
        // console.debug("Tooltip message:", tooltipMessage);
        expect(tooltipMessage).toBe("Please select an item in the list.");

        // TC_AM_049 & TC_AM_050
        await this.deallocationAssetCondition.click();
        await this.page.selectOption("#assetCondition", { label: "Good condition" });

        // TC_AM_051
        await this.submitButton.click();
        const repairCostField = this.page.locator("//input[@type = 'tel']");
        const tooltipMessage2 = await AssetHelper.getValidationMessage(repairCostField);
        // console.debug("Tooltip message:", tooltipMessage2);
        expect(tooltipMessage2).toBe("Please fill out this field.");

        // TC_AM_053
        await repairCostField.fill("150");

        // TC_AM_054
        await this.submitButton.click();
        const commentField = this.page.locator("#comment");
        const tooltipMessage3 = await AssetHelper.getValidationMessage(commentField);
        // console.debug("Tooltip message:", tooltipMessage3);
        expect(tooltipMessage3).toBe("Please fill out this field.");

        // TC_AM_055
        await AssetHelper.fillAndSubmitField(commentField, "received", this.submitButton);
        await this.page.getByText("Successfully deallocated!").isVisible();
    }
}