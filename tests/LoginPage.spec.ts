import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import testData from '../testData/testData.json';
// import dotenv from 'dotenv';
// dotenv.config();

test('User should be able to login successfully @smoke @reg', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);

    await expect(page.locator("//img[@alt='Caelius Consulting Logo']")).toBeVisible()
    console.log("Login successful: The 'Caelius Consulting Logo' appears at the top-left corner of the dashboard")
    // await page.pause();
});
