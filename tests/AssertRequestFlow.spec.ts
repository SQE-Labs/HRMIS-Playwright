import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/Basepage';
import { AssetRequests } from '../pages/Asset_Request';
import testData from '../testData/testData.json';
import { CommonUtils } from '../utils/commonUtils';
import * as constants from '../utils/constants';
test.describe.serial("Asset flow l1 , l2 ,  IT , store @smoke", async () => {
    let assetrequest: AssetRequests
    let loginPage: LoginPage
    let comment: string
    let enterSerialNumber: string
    test.beforeEach(async ({ page }) => {
        assetrequest = new AssetRequests(page)
        loginPage = new LoginPage(page)
    })

    test("HRMIS_24 Asset Request page Create Asset Request - L1 Approval @smoke", async ({ page }) => {
        comment = await assetrequest.generateRandomString(10);

        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);
        await assetrequest.expandAssetManagementTab()
        await assetrequest.navigateToAssetRequestTab();
        await assetrequest.waitforLoaderToDisappear()
        await assetrequest.clickOnAssetRequestButton()
        await assetrequest.waitforLoaderToDisappear()
        await expect(assetrequest.card).toBeVisible();
        await assetrequest.assetType.selectOption({ value: "4" });
        await assetrequest.reason.fill(comment);
        await assetrequest.submitButton.click()
        expect(await assetrequest.verifySuccessMessage("Successfully Submitted"))
        let totalRequestCount = await assetrequest.verifyNoAssetRequestRecord()
        expect(totalRequestCount).toBeGreaterThan(0)
        expect(await assetrequest.column.isVisible()).toBeTruthy();
        await assetrequest.logout();
    })
    test("HRMIS_26 Asset Request page L1 Approve the Request @smoke", async ({ page }) => {
        await loginPage.validLogin(testData.L1.UserEmail, testData.SuperUser.UserPassword);
        await page.waitForLoadState('domcontentloaded')
        await assetrequest.expandAssetManagementTab()
        await assetrequest.navigateToAssetl1ApprovalTab();
        await assetrequest.waitforLoaderToDisappear()
        let totalRequestCount = await assetrequest.verifyNoAssetRequestRecord()
        expect(totalRequestCount).toBeGreaterThan(0)

        expect(await assetrequest.column.isVisible()).toBeTruthy();
        await assetrequest.searchRequestByComment(comment)
        await assetrequest.clickOnCommentLocator(comment)
        await assetrequest.selectApproveOrRejectRequest("APPROVED")
        await assetrequest.comment.fill(comment)
        await assetrequest.clickOnSubmitButton()
        expect(await assetrequest.verifySuccessMessage("Successfully Approved"))

        await assetrequest.logout();
    })
    test("HRMIS_28 Asset Request page L2 Approve the Request @smoke", async ({ page }) => {
        await loginPage.validLogin(testData.L2.UserEmail, testData.SuperUser.UserPassword);
        await page.waitForLoadState('domcontentloaded')
        await assetrequest.expandAssetManagementTab()
        await assetrequest.navigateToAssetl2ApprovalTab();
        await assetrequest.waitforLoaderToDisappear()
        let totalRequestCount = await assetrequest.verifyNoAssetRequestRecord()

        expect(await assetrequest.column.isVisible()).toBeTruthy();
        await assetrequest.searchRequestByComment(comment)
        await assetrequest.clickOnCommentLocator(comment)

        await assetrequest.selectApproveOrRejectRequest("APPROVED")
        await assetrequest.comment.fill(comment)
        await assetrequest.clickOnSubmitButton()
        expect(await assetrequest.verifySuccessMessage("Successfully Approved"))

        await assetrequest.logout();
    })
    test("HRMIS_30 , HRMIS_31 Asset Request page IT Approve the Request @smoke", async ({ page }) => {
        await loginPage.validLogin(testData.IT.UserEmail, testData.SuperUser.UserPassword);
        await page.waitForLoadState('domcontentloaded')
        await assetrequest.expandAssetManagementTab()
        await assetrequest.navigateToAssetItApprovalTab();
        await assetrequest.waitforLoaderToDisappear()
        let totalRequestCount = await assetrequest.verifyNoAssetRequestRecord()
        expect(totalRequestCount).toBeGreaterThan(0)
        expect(await assetrequest.column.isVisible()).toBeTruthy();
        await assetrequest.searchRequestByComment(comment)
        await assetrequest.clickOnCommentLocator(comment)
        await assetrequest.selectApproveOrRejectRequest("APPROVED")
        await page.getByText("Choose Asset for ").click();
        await assetrequest.waitforLoaderToDisappear()
        // Select the first available serial number
        enterSerialNumber = await assetrequest.getExistingSerialNumber();
        await page.waitForTimeout(2000);
        await assetrequest.popupSearchBar.pressSequentially(enterSerialNumber);
        await assetrequest.assetRadioButton.first().click();
        await page.waitForTimeout(1000);
        await assetrequest.comment.fill(comment)
        await assetrequest.clickOnSubmitButton()
        await assetrequest.waitforLoaderToDisappear()
        expect(await assetrequest.verifySuccessMessage("Successfully Approved"))

        await assetrequest.logout();

    })
    test("HRMIS_33 Asset Request page Store Approve the Request @smoke", async ({ page }) => {
        await loginPage.validLogin(testData.STORE.UserEmail, testData.SuperUser.UserPassword);
        await page.waitForLoadState('domcontentloaded')
        await assetrequest.expandAssetManagementTab()
        await assetrequest.navigateToAssetStoreTab();
        await assetrequest.waitforLoaderToDisappear()
        let totalRequestCount = await assetrequest.verifyNoAssetRequestRecord()
        expect(totalRequestCount).toBeGreaterThan(0)

        expect(await assetrequest.column.isVisible()).toBeTruthy();
        await assetrequest.searchRequestByReason(comment)
        await assetrequest.clickOnReasonViewLocator(comment)
        await assetrequest.selectApproveOrRejectRequest("APPROVED")
        await assetrequest.comment.fill(comment)
        await assetrequest.clickOnSubmitButton()
        await assetrequest.waitforLoaderToDisappear()
        expect(await assetrequest.verifySuccessMessage("Successfully Approved"))

        await assetrequest.logout();
    })

    test("HRMIS_33 Check Asset is Delivered to Employee @smoke", async ({ page }) => {
        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);
        await assetrequest.expandAssetManagementTab();
        await assetrequest.navigateToAssetRequestTab();
        await assetrequest.waitforLoaderToDisappear();
        let status = await assetrequest.getStatusUpdate(comment);
        expect(status).toBe("Delivered");
        await assetrequest.logout();
    });

    test("Asset Deallocation - Return Asset Flow @smoke", async ({ page }) => {
        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);
        await assetrequest.expandAssetManagementTab();
        await assetrequest.navigateToAssetDeallocation();
        await assetrequest.waitforLoaderToDisappear();
        await assetrequest.selectEmployeeForDeallocation(testData.EMPLOYEE_NAME);
        await assetrequest.deallocateAsset(enterSerialNumber);
        expect(await assetrequest.verifySuccessMessage("Successfully deallocated!"));
        await assetrequest.logout();
    })

    test("HRMIS_40 RTO Management - Asset Request Return Flow @smoke", async ({ page }) => {
        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);
        await assetrequest.expandAssetManagementTab();
        await assetrequest.navigateToRtoManagementTab();
        await assetrequest.waitforLoaderToDisappear();
        let totalRequestCount = await assetrequest.verifyNoAssetRequestRecord();
        expect(totalRequestCount).toBeGreaterThan(0)

        expect(await assetrequest.column.isVisible()).toBeTruthy();
        await assetrequest.seacrhRequestBySerialNumber(enterSerialNumber);
        await assetrequest.clickOnSerialNumberLocator(enterSerialNumber);
        await assetrequest.selectStatus("RETURNED");
        await assetrequest.enterTodaysDateInCalendar();
        await assetrequest.dockerNumber.fill(await assetrequest.generateRandomString(5));
        await assetrequest.uploadFile("screenshot.png", page)
        await assetrequest.comment.fill(comment);
        await assetrequest.clickOnSubmitButton();
        await assetrequest.waitforLoaderToDisappear();
        expect(await assetrequest.verifySuccessMessage("Asset return request accepted"));
        await assetrequest.clickOnReturnRequestButton();
        let status = await assetrequest.getStatusUpdate(enterSerialNumber, 10);
        expect(status).toBe("RETURNED");

        await assetrequest.logout();
    })
})

test.describe("Asset flow l1 , l2 ,  IT , store Reject flow @smoke", async () => {
    let assetrequest: AssetRequests
    let loginPage: LoginPage
    let comment: string
    let enterSerialNumber: string
    test.beforeEach(async ({ page }) => {
        assetrequest = new AssetRequests(page)
        loginPage = new LoginPage(page)
    })

    test("Asset Request page L1 Reject the Request @smoke", async ({ page }) => {
        // Create asset
        comment = await assetrequest.generateRandomString(10);
        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);
        await assetrequest.expandAssetManagementTab()
        await assetrequest.navigateToAssetRequestTab();
        await assetrequest.waitforLoaderToDisappear()
        await assetrequest.clickOnAssetRequestButton()
        await assetrequest.waitforLoaderToDisappear()
        await expect(assetrequest.card).toBeVisible();
        await assetrequest.assetType.selectOption({ value: "4" });
        await assetrequest.reason.fill(comment);
        await assetrequest.submitButton.click()
        expect(await assetrequest.verifySuccessMessage("Successfully Submitted"))
        await assetrequest.logout();

        // Reject L1
        await loginPage.validLogin(testData.L1.UserEmail, testData.SuperUser.UserPassword);
        await page.waitForLoadState('domcontentloaded')
        await assetrequest.expandAssetManagementTab()
        await assetrequest.navigateToAssetl1ApprovalTab();
        await assetrequest.waitforLoaderToDisappear()
        let totalRequestCount = await assetrequest.verifyNoAssetRequestRecord()
        expect(await assetrequest.column.isVisible()).toBeTruthy();
        await assetrequest.searchRequestByComment(comment)
        await assetrequest.clickOnCommentLocator(comment)
        await assetrequest.selectApproveOrRejectRequest("REJECTED")
        await assetrequest.comment.fill(comment)
        await assetrequest.clickOnSubmitButton()
        expect(await assetrequest.verifySuccessMessage("Successfully Rejected"))

        await assetrequest.logout();
        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);
        await assetrequest.expandAssetManagementTab();
        await assetrequest.navigateToAssetRequestTab();
        await assetrequest.waitforLoaderToDisappear();
        let status = await assetrequest.getStatusUpdate(comment);
        expect(status).toBe("Rejected");
        await assetrequest.logout();
    })

    test("Asset Request page L2 Reject the Request @smoke", async ({ page }) => {
        // Create asset
        comment = await assetrequest.generateRandomString(10);
        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);
        await assetrequest.expandAssetManagementTab()
        await assetrequest.navigateToAssetRequestTab();
        await assetrequest.waitforLoaderToDisappear()
        await assetrequest.clickOnAssetRequestButton()
        await assetrequest.waitforLoaderToDisappear()
        await expect(assetrequest.card).toBeVisible();
        await assetrequest.assetType.selectOption({ value: "4" });
        await assetrequest.reason.fill(comment);
        await assetrequest.submitButton.click()
        expect(await assetrequest.verifySuccessMessage("Successfully Submitted"))
        await assetrequest.logout();

        // Approve L1
        await loginPage.validLogin(testData.L1.UserEmail, testData.SuperUser.UserPassword);
        await page.waitForLoadState('domcontentloaded')
        await assetrequest.expandAssetManagementTab()
        await assetrequest.navigateToAssetl1ApprovalTab();
        await assetrequest.waitforLoaderToDisappear()
        let totalRequestCount = await assetrequest.verifyNoAssetRequestRecord()
        expect(totalRequestCount).toBeGreaterThan(0)

        expect(await assetrequest.column.isVisible()).toBeTruthy();
        await assetrequest.searchRequestByComment(comment)
        await assetrequest.clickOnCommentLocator(comment)
        await assetrequest.selectApproveOrRejectRequest("APPROVED")
        await assetrequest.comment.fill(comment)
        await assetrequest.clickOnSubmitButton()
        expect(await assetrequest.verifySuccessMessage("Successfully Approved"))

        await assetrequest.logout();

        // Reject L2
        await loginPage.validLogin(testData.L2.UserEmail, testData.SuperUser.UserPassword);
        await page.waitForLoadState('domcontentloaded')
        await assetrequest.expandAssetManagementTab()
        await assetrequest.navigateToAssetl2ApprovalTab();
        await assetrequest.waitforLoaderToDisappear()
        let totalRequestCount1 = await assetrequest.verifyNoAssetRequestRecord()
        expect(totalRequestCount).toBeGreaterThan(0)

        expect(await assetrequest.column.isVisible()).toBeTruthy();
        await assetrequest.searchRequestByComment(comment)
        await assetrequest.clickOnCommentLocator(comment)

        await assetrequest.selectApproveOrRejectRequest("REJECTED")
        await assetrequest.comment.fill(comment)
        await assetrequest.clickOnSubmitButton()
        expect(await assetrequest.verifySuccessMessage("Successfully Rejected"))

        await assetrequest.logout();

        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);
        await assetrequest.expandAssetManagementTab();
        await assetrequest.navigateToAssetRequestTab();
        await assetrequest.waitforLoaderToDisappear();
        let status = await assetrequest.getStatusUpdate(comment);
        expect(status).toBe("Rejected");
        await assetrequest.logout();
    })

    test("Asset Request page IT Reject the Request @smoke", async ({ page }) => {
        // Create asset
        comment = await assetrequest.generateRandomString(10);
        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);
        await assetrequest.expandAssetManagementTab()
        await assetrequest.navigateToAssetRequestTab();
        await assetrequest.waitforLoaderToDisappear()
        await assetrequest.clickOnAssetRequestButton()
        await assetrequest.waitforLoaderToDisappear()
        await expect(assetrequest.card).toBeVisible();
        await assetrequest.assetType.selectOption({ value: "2" });
        await assetrequest.reason.fill(comment);
        await assetrequest.submitButton.click()
        expect(await assetrequest.verifySuccessMessage("Successfully Submitted"))
        await assetrequest.logout();

        // Approve L1
        await loginPage.validLogin(testData.L1.UserEmail, testData.SuperUser.UserPassword);
        await page.waitForLoadState('domcontentloaded')
        await assetrequest.expandAssetManagementTab()
        await assetrequest.navigateToAssetl1ApprovalTab();
        await assetrequest.waitforLoaderToDisappear()
        let totalRequestCount = await assetrequest.verifyNoAssetRequestRecord()
        expect(totalRequestCount).toBeGreaterThan(0)

        expect(await assetrequest.column.isVisible()).toBeTruthy();
        await assetrequest.searchRequestByComment(comment)
        await assetrequest.clickOnCommentLocator(comment)
        await assetrequest.selectApproveOrRejectRequest("APPROVED")
        await assetrequest.comment.fill(comment)
        await assetrequest.clickOnSubmitButton()
        expect(await assetrequest.verifySuccessMessage("Successfully Approved"))

        await assetrequest.logout();

        // Approve l2
        await loginPage.validLogin(testData.L2.UserEmail, testData.SuperUser.UserPassword);
        await page.waitForLoadState('domcontentloaded')
        await assetrequest.expandAssetManagementTab()
        await assetrequest.navigateToAssetl2ApprovalTab();
        await assetrequest.waitforLoaderToDisappear()
        let totalRequestCount1 = await assetrequest.verifyNoAssetRequestRecord()
        expect(totalRequestCount).toBeGreaterThan(0)

        expect(await assetrequest.column.isVisible()).toBeTruthy();
        await assetrequest.searchRequestByComment(comment)
        await assetrequest.clickOnCommentLocator(comment)
        await assetrequest.selectApproveOrRejectRequest("APPROVED")
        await assetrequest.comment.fill(comment)
        await assetrequest.clickOnSubmitButton()
        expect(await assetrequest.verifySuccessMessage("Successfully Approved"))

        await assetrequest.logout();

        // Reject IT
        await loginPage.validLogin(testData.IT.UserEmail, testData.SuperUser.UserPassword);
        await page.waitForLoadState('domcontentloaded')
        await assetrequest.expandAssetManagementTab()
        await assetrequest.navigateToAssetItApprovalTab();
        await assetrequest.waitforLoaderToDisappear()
        let totalRequestCount2 = await assetrequest.verifyNoAssetRequestRecord()
        expect(totalRequestCount2).toBeGreaterThan(0)

        expect(await assetrequest.column.isVisible()).toBeTruthy();
        await assetrequest.searchRequestByComment(comment)
        await assetrequest.clickOnCommentLocator(comment)
        await assetrequest.selectApproveOrRejectRequest("REJECTED")
        await assetrequest.comment.fill(comment)
        await assetrequest.clickOnSubmitButton()
        expect(await assetrequest.verifySuccessMessage("Successfully Rejected"))

        await assetrequest.logout();

        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);
        await assetrequest.expandAssetManagementTab();
        await assetrequest.navigateToAssetRequestTab();
        await assetrequest.waitforLoaderToDisappear();
        let status = await assetrequest.getStatusUpdate(comment);
        expect(status).toBe("Rejected");
        await assetrequest.logout();
    })


    test("Asset Request page Store Reject the Request @smoke", async ({ page }) => {
        // Create asset
        comment = await assetrequest.generateRandomString(10);
        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);
        await assetrequest.expandAssetManagementTab()
        await assetrequest.navigateToAssetRequestTab();
        await assetrequest.waitforLoaderToDisappear()
        await assetrequest.clickOnAssetRequestButton()
        await assetrequest.waitforLoaderToDisappear()
        await expect(assetrequest.card).toBeVisible();
        await assetrequest.assetType.selectOption({ value: "4" });
        await assetrequest.reason.fill(comment);
        await assetrequest.submitButton.click()
        expect(await assetrequest.verifySuccessMessage("Successfully Submitted"))
        await assetrequest.logout();

        // Approve L1
        await loginPage.validLogin(testData.L1.UserEmail, testData.SuperUser.UserPassword);
        await page.waitForLoadState('domcontentloaded')
        await assetrequest.expandAssetManagementTab()
        await assetrequest.navigateToAssetl1ApprovalTab();
        await assetrequest.waitforLoaderToDisappear()
        let totalRequestCount = await assetrequest.verifyNoAssetRequestRecord()
        expect(totalRequestCount).toBeGreaterThan(0)

        expect(await assetrequest.column.isVisible()).toBeTruthy();
        await assetrequest.searchRequestByComment(comment)
        await assetrequest.clickOnCommentLocator(comment)
        await assetrequest.selectApproveOrRejectRequest("APPROVED")
        await assetrequest.comment.fill(comment)
        await assetrequest.clickOnSubmitButton()
        expect(await assetrequest.verifySuccessMessage("Successfully Approved"))

        await assetrequest.logout();

        // Approve l2
        await loginPage.validLogin(testData.L2.UserEmail, testData.SuperUser.UserPassword);
        await page.waitForLoadState('domcontentloaded')
        await assetrequest.expandAssetManagementTab()
        await assetrequest.navigateToAssetl2ApprovalTab();
        await assetrequest.waitforLoaderToDisappear()
        let totalRequestCount1 = await assetrequest.verifyNoAssetRequestRecord()
        expect(totalRequestCount1).toBeGreaterThan(0)

        expect(await assetrequest.column.isVisible()).toBeTruthy();
        await assetrequest.searchRequestByComment(comment)
        await assetrequest.clickOnCommentLocator(comment)
        await assetrequest.selectApproveOrRejectRequest("APPROVED")
        await assetrequest.comment.fill(comment)
        await assetrequest.clickOnSubmitButton()
        expect(await assetrequest.verifySuccessMessage("Successfully Approved"))

        await assetrequest.logout();


        // Approve IT
        await loginPage.validLogin(testData.IT.UserEmail, testData.SuperUser.UserPassword);
        await page.waitForLoadState('domcontentloaded')
        await assetrequest.expandAssetManagementTab()
        await assetrequest.navigateToAssetItApprovalTab();
        await assetrequest.waitforLoaderToDisappear()
        let totalRequestCount2 = await assetrequest.verifyNoAssetRequestRecord()
        expect(totalRequestCount2).toBeGreaterThan(0)
        expect(await assetrequest.column.isVisible()).toBeTruthy();
        await assetrequest.searchRequestByComment(comment)
        await assetrequest.clickOnCommentLocator(comment)
        await assetrequest.selectApproveOrRejectRequest("APPROVED")
        await page.getByText("Choose Asset for ").click();
        await assetrequest.waitforLoaderToDisappear()
        // Select the first available serial number
        enterSerialNumber = await assetrequest.getExistingSerialNumber();
        await page.waitForTimeout(2000);
        await assetrequest.popupSearchBar.pressSequentially(enterSerialNumber);
        await assetrequest.assetRadioButton.first().click();
        await page.waitForTimeout(1000);
        await assetrequest.comment.fill(comment)
        await assetrequest.clickOnSubmitButton()
        await assetrequest.waitforLoaderToDisappear()
        expect(await assetrequest.verifySuccessMessage("Successfully Approved"))

        await assetrequest.logout();

        // Reject Store
        await loginPage.validLogin(testData.STORE.UserEmail, testData.SuperUser.UserPassword);
        await page.waitForLoadState('domcontentloaded')
        await assetrequest.expandAssetManagementTab()
        await assetrequest.navigateToAssetStoreTab();
        await assetrequest.waitforLoaderToDisappear()
        let totalRequestCount4 = await assetrequest.verifyNoAssetRequestRecord()
        expect(totalRequestCount4).toBeGreaterThan(0)

        expect(await assetrequest.column.isVisible()).toBeTruthy();
        await assetrequest.searchRequestByReason(comment)
        await assetrequest.clickOnReasonViewLocator(comment)
        await assetrequest.selectApproveOrRejectRequest("REJECTED")
        await assetrequest.comment.fill(comment)
        await assetrequest.clickOnSubmitButton()
        await assetrequest.waitforLoaderToDisappear()
        expect(await assetrequest.verifySuccessMessage("Successfully Rejected"))

        await assetrequest.logout();

        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);
        await assetrequest.expandAssetManagementTab();
        await assetrequest.navigateToAssetRequestTab();
        await assetrequest.waitforLoaderToDisappear();
        let status = await assetrequest.getStatusUpdate(comment);
        expect(status).toBe("Rejected");
        await assetrequest.logout();
    })
})
