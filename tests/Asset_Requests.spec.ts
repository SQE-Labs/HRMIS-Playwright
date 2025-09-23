import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/Basepage';
import { AssetRequests } from '../pages/Asset_Request';
import testData from '../testData/testData.json';
import { CommonUtils } from '../utils/commonUtils';


test.describe("Asset Rrequests page", () => {
    let assetrequest: AssetRequests
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        const basepage = new BasePage(page)

        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);
        assetrequest = new AssetRequests(page)
        await page.waitForLoadState('domcontentloaded')
        await assetrequest.expandAssetManagementTab()
        await assetrequest.navigateToAssetRequestTab();
        await assetrequest.waitforLoaderToDisappear()

    })
    test("Asset Request page No Record ", async ({ page }) => {
        await page.waitForLoadState('domcontentloaded')
        let totalRequestCount = await assetrequest.verifyNoAssetRequestRecord()
        if (totalRequestCount === 0) {
            expect(await assetrequest.noRecord.isVisible()).toBeTruthy();
            const noRecordText = await assetrequest.noRecord.textContent();
            console.log(noRecordText);
            expect(noRecordText).toEqual("No Record Available");
        } else {
            expect(await assetrequest.column.isVisible()).toBeTruthy();
        }

    })
    test("Create Asset Request - Successful Submission @smoke", async ({ page }) => {
        await assetrequest.clickOnAssetRequestButton()
        await assetrequest.waitforLoaderToDisappear()
        await expect(assetrequest.card).toBeVisible();
        await assetrequest.assetType.selectOption({ value: "2" });
        await assetrequest.reason.fill(await assetrequest.generateRandomString(10));
        await assetrequest.submitButton.click()
        expect(await assetrequest.verifySuccessMessage("Successfully Submitted"))
    })

    test("Create Asset Request - Reset Button Clears Fields @smoke", async ({ page }) => {
        await assetrequest.clickOnAssetRequestButton()
        await assetrequest.waitforLoaderToDisappear()
        await expect(assetrequest.card).toBeVisible();
        await assetrequest.assetType.selectOption({ value: "2" });
        await assetrequest.reason.fill(await assetrequest.generateRandomString(10));
        await assetrequest.resetButton.click()
        expect(await assetrequest.assetType.inputValue()).toBe("");
        expect(await assetrequest.reason.inputValue()).toBe("");
    })
})


// test.describe.serial("Asset flow l1 , l2 ,  IT , store @smoke", async () => {
//     let assetrequest: AssetRequests
//     let loginPage: LoginPage
//     let comment: string
//     let enterSerialNumber: string
//     test.beforeEach(async ({ page }) => {
//         assetrequest = new AssetRequests(page)
//         loginPage = new LoginPage(page)
//     })

//     test("Asset Request page Create Asset Request - L1 Approval @smoke", async ({ page }) => {
//         comment = await assetrequest.generateRandomString(10);

//         await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);
//         await assetrequest.expandAssetManagementTab()
//         await assetrequest.navigateToAssetRequestTab();
//         await assetrequest.waitforLoaderToDisappear()
//         await assetrequest.clickOnAssetRequestButton()
//         await assetrequest.waitforLoaderToDisappear()
//         await expect(assetrequest.card).toBeVisible();
//         await assetrequest.assetType.selectOption({ value: "2" });
//         await assetrequest.reason.fill(comment);
//         await assetrequest.submitButton.click()
//         expect(await assetrequest.verifySuccessMessage("Successfully Submitted"))
//         let totalRequestCount = await assetrequest.verifyNoAssetRequestRecord()
//         if (totalRequestCount > 0) {
//             expect(await assetrequest.column.isVisible()).toBeTruthy();
//         }
//         await assetrequest.logout();
//     })
//     test("Asset Request page L1 Approve the Request @smoke", async ({ page }) => {
//         await loginPage.validLogin(testData.L1.UserEmail, testData.SuperUser.UserPassword);
//         await page.waitForLoadState('domcontentloaded')
//         await assetrequest.expandAssetManagementTab()
//         await assetrequest.navigateToAssetl1ApprovalTab();
//         await assetrequest.waitforLoaderToDisappear()
//         let totalRequestCount = await assetrequest.verifyNoAssetRequestRecord()
//         if (totalRequestCount > 0) {
//             expect(await assetrequest.column.isVisible()).toBeTruthy();
//             await assetrequest.searchRequestByComment(comment)
//             await assetrequest.clickOnCommentLocator(comment)
//             await assetrequest.selectApproveOrRejectRequest("APPROVED")
//             await assetrequest.comment.fill(comment)
//             await assetrequest.clickOnSubmitButton()
//             expect(await assetrequest.verifySuccessMessage("Successfully Approved"))
//         }
//         await assetrequest.logout();
//     })
//     test("Asset Request page L2 Approve the Request @smoke", async ({ page }) => {
//         await loginPage.validLogin(testData.L2.UserEmail, testData.SuperUser.UserPassword);
//         await page.waitForLoadState('domcontentloaded')
//         await assetrequest.expandAssetManagementTab()
//         await assetrequest.navigateToAssetl2ApprovalTab();
//         await assetrequest.waitforLoaderToDisappear()
//         let totalRequestCount = await assetrequest.verifyNoAssetRequestRecord()
//         if (totalRequestCount > 0) {
//             expect(await assetrequest.column.isVisible()).toBeTruthy();
//             await assetrequest.searchRequestByComment(comment)
//             await assetrequest.clickOnCommentLocator(comment)

//             await assetrequest.selectApproveOrRejectRequest("APPROVED")
//             await assetrequest.comment.fill(comment)
//             await assetrequest.clickOnSubmitButton()
//             expect(await assetrequest.verifySuccessMessage("Successfully Approved"))
//         }
//         await assetrequest.logout();
//     })
//     test("Asset Request page IT Approve the Request @smoke", async ({ page }) => {
//         await loginPage.validLogin(testData.IT.UserEmail, testData.SuperUser.UserPassword);
//         await page.waitForLoadState('domcontentloaded')
//         await assetrequest.expandAssetManagementTab()
//         await assetrequest.navigateToAssetItApprovalTab();
//         await assetrequest.waitforLoaderToDisappear()
//         let totalRequestCount = await assetrequest.verifyNoAssetRequestRecord()
//         if (totalRequestCount > 0) {
//             expect(await assetrequest.column.isVisible()).toBeTruthy();
//             await assetrequest.searchRequestByComment(comment)
//             await assetrequest.clickOnCommentLocator(comment)
//             await assetrequest.selectApproveOrRejectRequest("APPROVED")
//             await page.getByText("Choose Asset for ").click();
//             await assetrequest.waitforLoaderToDisappear()
//             // Select the first available serial number
//             enterSerialNumber = await assetrequest.getExistingSerialNumber();
//             await page.waitForTimeout(2000);
//             await assetrequest.popupSearchBar.pressSequentially(enterSerialNumber);
//             await assetrequest.assetRadioButton.first().click();
//             await page.waitForTimeout(1000);
//             await assetrequest.comment.fill(comment)
//             await assetrequest.clickOnSubmitButton()
//             await assetrequest.waitforLoaderToDisappear()
//             expect(await assetrequest.verifySuccessMessage("Successfully Approved"))
//         }
//         await assetrequest.logout();

//     })
//     test("Asset Request page Store Approve the Request @smoke", async ({ page }) => {
//         await loginPage.validLogin(testData.STORE.UserEmail, testData.SuperUser.UserPassword);
//         await page.waitForLoadState('domcontentloaded')
//         await assetrequest.expandAssetManagementTab()
//         await assetrequest.navigateToAssetStoreTab();
//         await assetrequest.waitforLoaderToDisappear()
//         let totalRequestCount = await assetrequest.verifyNoAssetRequestRecord()
//         if (totalRequestCount > 0) {
//             expect(await assetrequest.column.isVisible()).toBeTruthy();
//             await assetrequest.searchRequestByReason(comment)
//             await assetrequest.clickOnReasonViewLocator(comment)
//             await assetrequest.selectApproveOrRejectRequest("APPROVED")
//             await assetrequest.comment.fill(comment)
//             await assetrequest.clickOnSubmitButton()
//             await assetrequest.waitforLoaderToDisappear()
//             expect(await assetrequest.verifySuccessMessage("Successfully Approved"))
//         }
//         await assetrequest.logout();
//     })

//     test("Check Asset is Delivered to Employee @smoke", async ({ page }) => {
//         await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);
//         await assetrequest.expandAssetManagementTab();
//         await assetrequest.navigateToAssetRequestTab();
//         await assetrequest.waitforLoaderToDisappear();
//         let status = await assetrequest.getStatusUpdate(comment);
//         expect(status).toBe("Delivered");
//         await assetrequest.logout();
//     });

//     test("Asset Deallocation - Return Asset Flow @smoke", async ({ page }) => {
//         await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);
//         await assetrequest.expandAssetManagementTab();
//         await assetrequest.navigateToAssetDeallocation();
//         await assetrequest.waitforLoaderToDisappear();
//         await assetrequest.selectEmployeeForDeallocation(testData.EMPLOYEE_NAME);
//         await assetrequest.deallocateAsset(enterSerialNumber);
//         expect(await assetrequest.verifySuccessMessage("Successfully deallocated!"));
//         await assetrequest.logout();
//     })

//     test("RTO Management - Asset Request Return Flow @smoke", async ({ page }) => {
//         await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);
//         await assetrequest.expandAssetManagementTab();
//         await assetrequest.navigateToRtoManagementTab();
//         await assetrequest.waitforLoaderToDisappear();
//         let totalRequestCount = await assetrequest.verifyNoAssetRequestRecord();
//         if (totalRequestCount > 0) {
//             expect(await assetrequest.column.isVisible()).toBeTruthy();
//             await assetrequest.seacrhRequestBySerialNumber(enterSerialNumber);
//             await assetrequest.clickOnSerialNumberLocator(enterSerialNumber);
//             await assetrequest.selectStatus("RETURNED");
//             await assetrequest.enterTodaysDateInCalendar();
//             await assetrequest.dockerNumber.fill(await assetrequest.generateRandomString(5));
//             await assetrequest.uploadFile("screenshot.png", page)
//             await assetrequest.comment.fill(comment);
//             await assetrequest.clickOnSubmitButton();
//             await assetrequest.waitforLoaderToDisappear();
//             expect(await assetrequest.verifySuccessMessage("Asset return request accepted"));
//             await assetrequest.clickOnReturnRequestButton();
//             let status = await assetrequest.getStatusUpdate(enterSerialNumber, 10);
//             expect(status).toBe("RETURNED");
//         }

//         await assetrequest.logout();
//     })


// })
