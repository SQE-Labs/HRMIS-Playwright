import { test, expect } from '@playwright/test'
import { OverView } from '../pages/Asset_OverView'
import { LoginPage } from '../pages/Loginpage';
import { BasePage } from '../pages/Basepage';
import { Login } from '../support/command';
import { AssetDeallocation } from '../pages/Asset_Deallocation';

let DeAllocation : AssetDeallocation
test.describe("Asset DeAllocation page", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        const basepage = new BasePage(page)

        await basepage.open('url')
        await Login.login(page, "SuperUser")
        DeAllocation = new AssetDeallocation(page)
    })

    test("Asset Deallocation page ", async ({ page }) => {
        await DeAllocation.deallocation()
        console.log("DeAllocation Page open SucessFully")
    })
    test(" selected employee appear listed after choosing the employee", async ({page}) => {
        await DeAllocation.recordSelectedOption()
    })
    test(" Empty Records appear listed after choosing the employee", async ({page}) => {
        await DeAllocation.emptySelectedOptions()
    })
})