import { test, expect } from '@playwright/test'
import { AssetAllocation } from '../pages/Asset_Allocation';
import { LoginPage } from '../pages/Loginpage';
import testData from '../testData/testData.json';
import { AssetHelper } from '../utils/AssetHelpers';
let allocation: AssetAllocation
test.describe("Asset Allocation page", () => {
    test.beforeEach(async ({ page }) => {
        const loginObj = new LoginPage(page)
        await loginObj.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);
        allocation = new AssetAllocation(page)
        await AssetHelper.navigateToAllocationAsset(page, allocation.allocationAsset);
    });
    test("Rediected Towards Asset Allocation page", async ({ page }) => {
        expect(await allocation.allocationPageHeader.isVisible()).toBeTruthy();
        expect(await allocation.allocationAssignAsset.isVisible()).toBeTruthy();
        expect(await allocation.searchBar.isVisible()).toBeTruthy();
        await allocation.getTotalAssetCount()
        await allocation.getColumnHeader()
    })

    test.only("Functionality of search Bar ", async ({ page }) => {
        await allocation.getBySearchdata(allocation.assetTypeName, "KeyWord" , "Asset Name")
    })
    test.only("Functionality of search Bar serial Number ", async ({ page }) => {
        await allocation.getBySearchdata(allocation.assetSerialNumber,"DELL004", "serial Number")
    })

    test.only("Functionality of search Bar Owner name ", async ({ page }) => {
        await allocation.getBySearchdata(allocation.assetOwnerName,"Caelius", "Owner name")
    })

    test.only("Functionality of search Bar Employee name ", async ({ page }) => {
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