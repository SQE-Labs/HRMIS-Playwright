import { test, expect } from '@playwright/test'
import { OverView } from '../pages/Asset_OverView'
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/BasePage';
import { Login } from '../Support/Command';
import { Asset_DeAllocation } from '../pages/Asser_DeAllocation';
import { Asset_Enrollment } from '../pages/New_Asset_Enrollment';

test.describe("Asset Enrollment page", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        const basepage = new BasePage(page)

        await basepage.open('url')
        await Login.login(page, "SuperUser")

    })

    test("New Asset Enrollment page ", async ({ page }) => {
        const Enrollment = new Asset_Enrollment(page)
        await Enrollment.Enrollment()

    })
})