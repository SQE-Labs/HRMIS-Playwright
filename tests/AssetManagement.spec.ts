import { test, expect } from '@playwright/test';
import { Login } from '../support/command';
import { AssetManagementTab } from '../pages/Asset_Management_Tab';
import { LoginPage } from '../pages/Loginpage';
import { BasePage } from '../pages/Basepage';
let assetManagementTab: AssetManagementTab;
test.describe("Asset Management tests", () => {
    
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const basepage = new BasePage(page);

        await basepage.open('url'); // Replace 'url' with actual site URL
        await page.waitForLoadState('networkidle');
        await Login.login(page, "SuperUser");
        assetManagementTab = new AssetManagementTab(page);
    });

    test("Asset Management accordion expands and displays correct sub-tabs", async ({ page }) => {
        console.log("Expanding Asset Management Tab...");
        await assetManagementTab.expandAssetManagementTab();

        console.log("Checking if tab is expanded...");
        expect(await assetManagementTab.isExpandable()).toBe(true);

        console.log("Verifying sub-tabs visibility...");
        await assetManagementTab.verifySubTabs();

        console.log("Sub-tabs verification completed.");
    });

    test("Asset Management accordion collapses and hides sub-tabs", async ({ page }) => {
        console.log("Collapsing Asset Management Tab...");
        await assetManagementTab.collapsesAssetManagementTab();

        console.log("Checking if tab is collapsed...");
        expect(await assetManagementTab.isCollapses()).toBe(true);
    });
});
