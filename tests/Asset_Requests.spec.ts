import { test, expect } from '@playwright/test'
import { OverView } from '../pages/Asset_OverView'
import { LoginPage } from '../pages/Loginpage';
import { BasePage } from '../pages/Basepage';
import { Login } from '../support/command';
import { AssetRequests } from '../pages/Asset_Request';

let Asset_Request : AssetRequests
test.describe("Asset Rrequests page", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        const basepage = new BasePage(page)

        await basepage.open('url')
        await Login.login(page, "SuperUser")
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