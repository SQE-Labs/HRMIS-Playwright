import { test, expect } from '@playwright/test'
import { BasePage } from '../pages/BasePage';
import { LoginPage } from '../pages/LoginPage';
import { Login } from '../Support/Command';
import { AttandanceTab } from '../pages/AttandanceandLeave';


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