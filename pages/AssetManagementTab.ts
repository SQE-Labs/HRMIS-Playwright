import { Page, Locator} from '@playwright/test'
import { BasePage } from '../pages/BasePage'


export class AssetManagementTab extends BasePage{
    private AssetManagement : Locator
    private subtabs : Locator
    private subtabsTitle : string[]


// Locators
    constructor(page : Page){
        super(page)
        this.page = page
        this.AssetManagement =  page.locator("//a[text()='Asset Management']")
        this.subtabs = page.locator("//a[text()='Asset Management']/../ul/li")
        this.subtabsTitle = [
            'Asset Overview',
            'Asset Allocation',
            'Asset De-allocation',
            'Asset Request',
            'New Asset Enrollment',
            'Approve Asset Request (L1)',
            'Approve Asset Request (L2)',
            'Approve Asset Request (IT)',
            'Asset Delivery (Store)',
            'RTO Management'
        ]


    }
    async expandAssetManagementTab(){
        try{
            await this.AssetManagement.click()
            console.log('Asset management tab expanded Succesfully')
        }catch(error){
            console.error('Asset management tab Does not expanded' , error)
        }
    }
    
    async isExpandable():Promise<boolean>{
        try{
            return await this.AssetManagement.getAttribute('aria-expanded') === 'true';
        }catch(error){
            console.error('Error Checking if asset management tab is expandable' , error)
            return false
        }
}
    async verifySubTabs(){
        const title = await this.subtabs.allTextContents()
        console.log(title)
        let allMatched = true;
        for (let i = 0; i < title.length; i++) {
            if (title[i] !== this.subtabsTitle[i]) {
                console.log(`Mismatch found at index ${i}: Expected "${this.subtabsTitle[i]}", but got "${title[i]}"`);
                allMatched = false;
            }
        }
        if (allMatched) {
            console.log("All subtab titles matched successfully!");
        } else {
            console.log("Some subtab titles did not match.");
        }
    
    }

    async collapsesAssetManagementTab(){
        await this.AssetManagement.click()
        await this.page.waitForTimeout(2000)
        try{
            await this.AssetManagement.click()
            console.log('Asset management tab collapse Succesfully')
        }catch(error){
            console.error('Asset management tab Does not collapse' , error)
        }
    }

    async isCollapses():Promise<boolean>{
        try{
            return await this.AssetManagement.getAttribute('aria-expanded') === 'false';
        }catch(error){
            console.error('Error Checking if asset management tab is collapse ' , error)
            return false
        }
    }
}