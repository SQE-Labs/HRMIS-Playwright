import { test, expect } from '@playwright/test'
import { OverView } from '../pages/Asset_OverView'
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/BasePage';
import { Login } from '../Support/Command';
import { Asset_DeAllocation } from '../pages/Asser_DeAllocation';
import { Asset_Enrollment } from '../pages/New_Asset_Enrollment';
import { Asset_Requests } from '../pages/Asset_Request';

let Asset_Request
test.describe("Asset Rrequests page", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        const basepage = new BasePage(page)

        await basepage.open('url')
        await Login.login(page, "SuperUser")
        Asset_Request = new Asset_Requests(page)
    })
 test("Asset Request page ", async ({ page }) => {
        await Asset_Request.Asset_Request_tab_open()
    })
    test("Asset Request page No Record ", async ({ page }) => {
        await Asset_Request.Asset_Request_NoRecord()
    })
    test("Create_Asset_Request", async ({ page }) => {
        await Asset_Request.Create_Asset_Request()
    })
})