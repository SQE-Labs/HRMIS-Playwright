import { test, expect } from '@playwright/test'
import { AssetAllocation } from '../pages/Asset_Allocation'
import { OverView } from '../pages/Asset_OverView'
import { LoginPage } from '../pages/Loginpage';
import { BasePage } from '../pages/Basepage';
import { Login } from '../support/command';
let allocation : AssetAllocation
test.describe("Asset Allocation page", () => {
    test.beforeEach(async ({ page }) => {
    

        const loginPage = new LoginPage(page)
        const basepage = new BasePage(page)

        await basepage.open('url')
        await Login.login(page, "SuperUser")
        allocation = new AssetAllocation(page)

    });



    test("Rediected Towards Asset Allocation page", async ({ page }) => {
        expect(await allocation.allocationPage())
        // console.log("Redirected SucessFully ")
    })

    test("Functionality of search Bar ", async ({ page }) => {
        expect(await allocation.searchField())
    })
    test("Functionality of search Bar serial Number ", async ({ page }) => {
        expect(await allocation.searchBySerialNumber())
    })

    test("Functionality of search Bar Owner name ", async ({ page }) => {
        expect(await allocation.searchByOwnerName())
    })
    test("Functionality of search Bar Employee name ", async ({ page }) => {
        expect(await allocation.searchByEmployeeName())
    })
    // TC_AM_028

    // // Check Sorting
    // await test.step("Functionality of search Bar ", async () => {
    //     expect(await Allocation.Sorting())
    //     console.log("sorting Icon Verified !!")
    // })

    // TC_AM_029

    test("Pagination" , async ()=>{
        expect(await allocation.pagination())
        console.log("Pagination verified !!")
    })


    test("Assign asset" , async ()=>{
        expect(await allocation.assignAsset())
    })
})