import { Page, Locator, expect } from "@playwright/test";
import { AssetManagementTab } from "./Asset_Management_Tab";
import { Loader } from "../components/loaders";
import { BasePage } from "./Basepage";
import { OverView } from "./Asset_OverView";
import { Asset_Allocation } from "./Asset_Allocation";
import { Asset_DeAllocation } from '../pages/Asset_Deallocation';
import { generateRandomString } from "./Employee_Management"
import exp from "constants";

export class Asset_Requests extends BasePage {
    private AssetRequestTab : Locator
    private NoRecord : Locator
    private Total_Asset_Request : Locator
    private Coloumn : Locator
    private AssetRequestbutton : Locator
    private card : Locator
    private Loader : Loader

    constructor(page: Page) {
        super(page)
        this.AssetRequestTab = page.locator("//a[text() ='Asset Request']")
        this.NoRecord = page.locator("//div[@class = 'fs-4 text-secondary text-center']")
        this.Total_Asset_Request = page.locator(".total")
        this.Coloumn = page.locator("(//thead//tr)[1]")
        this.AssetRequestbutton = page.locator('//a[@class="export theme-button"][text() = "Asset Request"]')
        this.card = page.locator('.card')
        this.Loader = new Loader(page)

    }



    async Asset_Request_tab_open(){
        const assetManagementTab = new AssetManagementTab(this.page);
        await assetManagementTab.expandAssetManagementTab();
        await this.AssetRequestTab.click()
    }


    async Asset_Request_NoRecord() {
        // TC_AM_148
        await this.Asset_Request_tab_open();
        await this.page.waitForTimeout(3000);
        let total_request = await this.Total_Asset_Request.allTextContents();
        
        // We only want the number, so use parseInt to extract the digits
        let TotalRequestCount = total_request.length > 0 ? parseInt(total_request[0].replace(/\D/g, ''), 10) : 0;
        await this.page.waitForTimeout(1000);
        console.log("TotalRequestcount: ", TotalRequestCount);
    
        if (TotalRequestCount === 0) {
            expect(await this.NoRecord.isVisible()).toBeTruthy();
            let noRecordText = await this.NoRecord.textContent();
            console.log(noRecordText);
            expect(noRecordText).toEqual("No Record Available");
        } else {
            expect(await this.Coloumn.isVisible()).toBeTruthy()
        }
    }

    async Create_Asset_Request(){
        // TC_AM_149
        await this.Asset_Request_tab_open();
        await this.page.waitForTimeout(3000)
        await this.AssetRequestbutton.click();
        await expect(this.Loader.getSpinLoader()).not.toBeAttached()
        await this.page.waitForTimeout(1000)
        await expect(this.card).toBeVisible()

    }

    // async 
    
}