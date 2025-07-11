import { test, expect } from '@playwright/test';
import { Login } from '../support/command';
import { AssetManagementTab } from '../pages/Asset_Management_Tab';
import { LoginPage } from '../pages/Loginpage';
import { BasePage } from '../pages/Basepage';

let assetManagementTab: AssetManagementTab;

test.describe('Asset Management tests', () => {
    // Define subTabsTitles as a constant if only used locally in this file
    const subTabsTitles :string[] = [
        'Asset Overview',
        'Asset Allocation',
        'Asset De-allocation',
        'Asset Request',
        'New Asset Enrollment',
        'Approve Asset Request',
        'RTO Management'
    ];
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const basePage = new BasePage(page);

        await basePage.open('url'); // Replace 'url' with actual site URL
        await page.waitForLoadState('networkidle');
        await Login.login(page, 'SuperUser');
        assetManagementTab = new AssetManagementTab(page);

    });

    test('Asset Management accordion expands and displays correct sub-tabs', async ({ page }) => {
        test.slow();

        console.debug('Expanding Asset Management Tab...');
        await assetManagementTab.expandAssetManagementTab();

        console.debug('Verifying sub-tabs visibility...');
       expect (  await assetManagementTab.verifySubTabs(subTabsTitles)).toBeTruthy();

    });

    test('Asset Management accordion collapses and hides sub-tabs', async ({ page }) => {
        test.slow();
        await page.pause()
        console.debug('Collapsing Asset Management Tab...');
        await assetManagementTab.collapseAssetManagementTab();

        console.debug('Checking if tab is collapsed...');
        // expect(await assetManagementTab.verifySubTabs(subTabsTitles)).toBe((false));
      });
});
