import { Page, Locator, expect } from "@playwright/test";
import { AssetManagementTab } from "./AssetManagementTab";
import { Loader } from "../Components/Loaders";
import { BasePage } from "./BasePage";
import { OverView } from "./Asset_OverView";

class Asset_Allocation extends OverView {
        // TC_AM_021
        private AllocationAsset : Locator
        private Allocationpage : Locator
        private AllocationAssignAsset : Locator
        private AllocationRecord : Locator

    constructor(page : Page){
        super(page)
        this.AllocationAsset = page.locator("//a[text()='Asset Allocation']")
        this.Allocationpage = page.locator("div>h1")
        this.AllocationAssignAsset = page.locator(".export.theme-button")
        this.AllocationRecord = page.locator("")
    }




    async AlloctionPage(){
        await this.expandAssetManagementTab()
        await this.AllocationAsset.click()

    }
}