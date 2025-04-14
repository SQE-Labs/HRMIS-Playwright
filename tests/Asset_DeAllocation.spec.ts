import { test, expect } from '@playwright/test'
import { OverView } from '../pages/Asset_OverView'
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/BasePage';
import { Login } from '../Support/Command';
import { Asset_DeAllocation } from '../pages/Asser_DeAllocation';

let DeAllocation
test.describe("Asset DeAllocation page", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        const basepage = new BasePage(page)

        await basepage.open('url')
        await Login.login(page, "SuperUser")
        DeAllocation = new Asset_DeAllocation(page)
    })

    test("Asset Deallocation page ", async ({ page }) => {
        await DeAllocation.DeAllocation()
        console.log("DeAllocation Page open SucessFully")
    })
    test(" selected employee appear listed after choosing the employee", async ({page}) => {
        await DeAllocation.RecordSelectedOption()
    })
    test(" Empty Records appear listed after choosing the employee", async ({page}) => {
        await DeAllocation.Emptyselectetoption()
    })
})