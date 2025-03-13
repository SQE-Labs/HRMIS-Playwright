import { test, expect } from '@playwright/test'
import { Asset_Allocation } from '../pages/Asset_Allocation'
import { OverView } from '../pages/Asset_OverView'
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/BasePage';
import { Login } from '../Support/Command';

test.describe("Asset Allocation page", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        const basepage = new BasePage(page)

        await basepage.open('url')
        await Login.login(page, "SuperUser")
    });


    test("Asset Allocation page", async ({ page }) => {
        const Allocation = new Asset_Allocation(page)

        await test.step("Rediected Towards Asset Allocation page", async () => {
            expect(await Allocation.AlloctionPage())
            // console.log("Redirected SucessFully ")
        })

        await test.step("Functionality of search Bar ", async () => {
            expect(await Allocation.SearchField())
        })

        // TC_AM_028

        // Check Sorting
        await test.step("Functionality of search Bar ", async () => {
            expect(await Allocation.Sorting())
            console.log("sorting Icon Verified !!")
        })

        // TC_AM_029

        await test.step("Pagination" , async ()=>{
            expect(await Allocation.pagination())
            console.log("Pagination verified !!")
        })

        
        await test.step("Assign asset" , async ()=>{
            expect(await Allocation.AssignAsset())
        })
    })
})