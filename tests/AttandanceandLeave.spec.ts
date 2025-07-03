import { test, expect } from '@playwright/test'
import { BasePage } from '../pages/Basepage';
import { LoginPage } from '../pages/Loginpage';
import { Login } from '../support/command';
import { AttandanceTab } from '../pages/Attandance_And_Leave';


test.describe("'Attandance & Leave tests'", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        const basepage = new BasePage(page)

        await basepage.open('url')
        await page.waitForTimeout(2000)
        await Login.login(page, "SuperUser")
    });

    test("Attandance & Leave accordion expands and displays correct sub-tabs", async ({ page }) => {
        const AttandanceandLeaveTab = new AttandanceTab(page);
        await AttandanceandLeaveTab.AttandanceTab()
    })
})