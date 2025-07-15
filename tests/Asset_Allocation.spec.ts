import { test, expect } from '@playwright/test'
import { AssetAllocation } from '../pages/Asset_Allocation'
import { LoginPage } from '../pages/Loginpage';
import testData from '../testData/testData.json';
let allocation: AssetAllocation
test.describe("Asset Allocation page", () => {
    test.beforeEach(async ({ page }) => {
        const loginObj = new LoginPage(page)
        await loginObj.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);
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
        await allocation.searchByEmployeeName()
    })

    // TC_AM_028

    // // Check Sorting
    // await test.step("Functionality of search Bar ", async () => {
    //     expect(await Allocation.Sorting())
    //     console.log("sorting Icon Verified !!")
    // })

    // TC_AM_029

    test("Pagination", async () => {
        expect(await allocation.pagination())
        console.log("Pagination verified !!")
    })


    test("Assign asset", async () => {
        expect(await allocation.assignAsset())
    })
})