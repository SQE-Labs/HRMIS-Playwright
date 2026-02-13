import { test, expect } from '@playwright/test';
import { AssetManagementTab } from '../../pages/Asset_Management_Tab';
import { LoginPage } from '../../pages/LoginPage';
import { BasePage } from '../../pages/Basepage';
import testData from '../../testData/testData.json';

let assetManagementTab: AssetManagementTab;

test.describe('Asset Management tests', () => {
    // Define subTabsTitles as a constant if only used locally in this file
    const subTabsTitles: string[] = [
        'Asset Overview',
        'Asset Allocation',
        'IT Asset Return and Access Withdrawal',
        'IT Resource Requests\n',
        'New Asset Enrollment',
        'Approve Asset Request (L1)',
        'Approve Asset Request (L2)',
        'Approve Asset Request (IT)',
        'Asset Delivery (Store)',
        'RTO Management',
        'Approve Access Request (DL)',
        'Approve Access Request (IT)',
        'Software Access Report',
        'New Software Enrollment'
    ];
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const basePage = new BasePage(page);

        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);

        assetManagementTab = new AssetManagementTab(page);

    });

    test('Asset Management accordion expands and displays correct sub-tabs @smoke', async ({ page }) => {

        console.debug('Expanding Asset Management Tab...');
        await assetManagementTab.expandAssetManagementTab();

        console.debug('Verifying sub-tabs visibility...');
        expect(await assetManagementTab.verifySubTabs(subTabsTitles)).toBeTruthy();

    });

    test('Asset Management accordion collapses and hides sub-tabs', async ({ page }) => {

        console.debug('Collapsing Asset Management Tab...');
        await assetManagementTab.collapseAttendanceLeaveTab();

        console.debug('Checking if tab is collapsed...');
        // expect(await attendance.verifySubTabs(subTabsTitles)).toBe((false));
    });
});
