import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/Loginpage';
import { AssetDeallocation } from '../pages/Asset_Deallocation';
import testData from '../testData/testData.json';

let DeAllocation: AssetDeallocation
test.describe("Asset DeAllocation page", () => {
    test.beforeEach(async ({ page }) => {
        const loginObj = new LoginPage(page)
        await loginObj.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);
        DeAllocation = new AssetDeallocation(page)
    })

    test("Asset Deallocation page ", async ({ page }) => {
        await DeAllocation.deallocation()
        console.log("DeAllocation Page open SucessFully")
    })
    test(" selected employee appear listed after choosing the employee", async ({ page }) => {
        await DeAllocation.recordSelectedOption()
    })
    test(" Empty Records appear listed after choosing the employee", async ({ page }) => {
        await DeAllocation.emptySelectedOptions()
    })
})