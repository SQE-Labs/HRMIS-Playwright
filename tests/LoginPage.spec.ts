import { test, expect } from '@playwright/test';
import { Login } from '../support/command'
import { LoginPage } from '../pages/Loginpage';
import { BasePage } from '../pages/Basepage';
// import dotenv from 'dotenv';
// dotenv.config();

test('User should be able to login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const basepage = new BasePage(page)
    
    await basepage.open('url')
    await Login.login(page , "SuperUser")
    await basepage.open('url'+"/assetAllocation")

    await expect(page.locator("//img[@alt='Caelius Consulting Logo']")).toBeVisible()
    console.log("Login successful: The 'Caelius Consulting Logo' appears at the top-left corner of the dashboard")
    // await page.pause();
});
