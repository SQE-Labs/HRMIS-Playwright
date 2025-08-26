import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/Basepage';
import { AssetRequests } from '../pages/Asset_Request';
import testData from '../testData/testData.json';

let assetrequest: AssetRequests
test.describe("Asset Rrequests page", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        const basepage = new BasePage(page)

        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);
        assetrequest = new AssetRequests(page)
        await page.waitForLoadState('domcontentloaded')
        await assetrequest.expandAssetManagementTab()
        await assetrequest.navigateToAssetRequestTab();
        await assetrequest.waitforLoaderToDisappear()

    })
    test("Asset Request page No Record ", async ({ page }) => {
        await page.waitForLoadState('domcontentloaded')
        let totalRequestCount = await assetrequest.verifyNoAssetRequestRecord()
        if (totalRequestCount === 0) {
            expect(await assetrequest.noRecord.isVisible()).toBeTruthy();
            const noRecordText = await assetrequest.noRecord.textContent();
            console.log(noRecordText);
            expect(noRecordText).toEqual("No Record Available");
        } else {
            expect(await assetrequest.column.isVisible()).toBeTruthy();
        }

    })
    test("Create_Asset_Request", async ({ page }) => {
        await assetrequest.clickOnAssetRequestButton()
        await assetrequest.waitforLoaderToDisappear()
        await expect(assetrequest.card).toBeVisible();
    })
})