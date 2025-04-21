import { test, expect } from '@playwright/test';
import { Login } from '../Support/Command';
import { AssetManagementTab } from '../pages/AssetManagementTab';
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/BasePage';

test.describe("'Asset Management tests'", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
            const basepage = new BasePage(page)
            
            await basepage.open('url')
            await page.waitForTimeout(2000)
            await Login.login(page , "SuperUser")
    });

    // TC_AM_001 and TC_AM_002 I merged both test cases into a single test case)
    
    test("Asset Management accordion expands and displays correct sub-tabs", async ({ page }) => {
        const assetManagementTab = new AssetManagementTab(page);

        console.log("Expanding Asset Management Tab...");
        await assetManagementTab.expandAssetManagementTab();
    
        console.log("Checking if tab is expanded...");
        expect(await assetManagementTab.isExpandable()).toBe(true);
        
        console.log("Verifying sub-tabs visibility...");
        await assetManagementTab.verifySubTabs();
    
        console.log("Sub-tabs verification completed.");

        console.log("collapses Asset Management Tab...");
        await assetManagementTab.collapsesAssetManagementTab();

        console.log("Checking if tab is Collapses");
        expect(await assetManagementTab.isCollapses()).toBe(true);
        
    });
})

