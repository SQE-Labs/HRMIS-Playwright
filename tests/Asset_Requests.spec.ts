import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/Loginpage';
import { BasePage } from '../pages/Basepage';
import { AssetRequests } from '../pages/Asset_Request';
import testData from '../testData/testData.json';

let Asset_Request: AssetRequests
test.describe("Asset Rrequests page", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        const basepage = new BasePage(page)

        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);
        Asset_Request = new AssetRequests(page)
    })
    test("Asset Request page ", async ({ page }) => {
        await Asset_Request.openAssetRequestTab()
    })
    test("Asset Request page No Record ", async ({ page }) => {
        await Asset_Request.verifyNoAssetRequestRecord()
    })
    test("Create_Asset_Request", async ({ page }) => {
        await Asset_Request.createAssetRequest()
    })
})