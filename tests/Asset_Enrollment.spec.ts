import { test, expect } from '@playwright/test';
import { OverView } from '../pages/Asset_OverView';
import { LoginPage } from '../pages/Loginpage';
import { BasePage } from '../pages/Basepage';
import { Login } from '../support/command';
import { AssetDeallocation } from '../pages/Asset_Deallocation';
import { AssetEnrollment } from '../pages/New_Asset_Enrollment';

let assetEnrollment: AssetEnrollment;

test.describe('Asset Enrollment Page', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const basePage = new BasePage(page);

        await basePage.open('url');
        // Passwords should never be used directly in test due to security reasons. //To-Do
        await Login.login(page, 'SuperUser');
        assetEnrollment = new AssetEnrollment(page);
    });

    test('New Asset Enrollment Page', async ({ page }) => {
        await assetEnrollment.enrollment();
    });

    test('New Asset Enrollment Create Asset', async ({ page }) => {
        console.log('Create Assets ....');
        await assetEnrollment.createAsset();
    });

    test('New Asset Enrollment Bulk Create Asset', async ({ page }) => {
        console.log('Bulk Create Assets ....');
        await assetEnrollment.bulkCreateAsset();
    });

    test('New Asset Enrollment Asset Type Request', async ({ page }) => {
        await assetEnrollment.assetTypeRequests();
    });

    test('New Asset Enrollment Asset Type Request Create Asset Type Functionality', async ({ page }) => {
        await assetEnrollment.assetTypeRequestCreateAssetTypeRequest();
    });

    test('New Asset Enrollment Asset Type Request Create Asset Type Empty Field', async ({ page }) => {
        await assetEnrollment.assetTypeRequestEmptyField();
    });

    test('Asset Type Request Asset Name Field More Than 40 Characters', async ({ page }) => {
        await assetEnrollment.assetTypeRequestAssetNameFieldMoreThan40Characters();
    });

    test('Asset Type Request Asset Name Field Only Special Or Number', async ({ page }) => {
        await assetEnrollment.assetTypeRequestAssetNameFieldNumberSpecialChar();
    });

    test('Create Asset Type Cross Icon', async ({ page }) => {
        await assetEnrollment.createAssetTypeCrossIcon();
    });

    test('Create Asset Type Cancel Button', async ({ page }) => {
        await assetEnrollment.createAssetTypeCancelButton();
    });

    test('Create Asset Type Created', async ({ page }) => {
        await assetEnrollment.createAssetTypeCreated();
    });

    test('Create Asset Type Sorting', async ({ page }) => {
        await assetEnrollment.createAssetTypeSorting();
    });

    test('Asset Type Request Status Approve Status', async ({ page }) => {
        await assetEnrollment.assetTypeRequestStatusApproveStatus();
    });

    test('Asset Type Request Status Reject Status', async ({ page }) => {
        await assetEnrollment.assetTypeRequestStatusRejectStatus();
    });

    test('Asset Type Request Approve Date', async ({ page }) => {
        await assetEnrollment.assetTypeRequestApproveDate();
    });

    test('Asset Type Request Reject Date', async ({ page }) => {
        await assetEnrollment.assetTypeRequestRejectDate();
    });

    test('Approve Asset Type Request No Record', async ({ page }) => {
        await assetEnrollment.approveAssetTypeRequestNoRecord();
    });

    test('Approve Asset Type Request Verification', async ({ page }) => {
        await assetEnrollment.approveAssetTypeRequestVerification();
    });

    test('Approve Asset Type Request Approved', async ({ page }) => {
        await assetEnrollment.approveAssetTypeRequestApproved();
    });

    test('Approve Asset Type Request Rejected', async ({ page }) => {
        await assetEnrollment.approveAssetTypeRequestRejected();
    });

    test('Approve Asset Type Request Cross', async ({ page }) => {
        await assetEnrollment.approveAssetTypeRequestCross();
    });

    test('Approve Asset Type Request Cancel', async ({ page }) => {
        await assetEnrollment.approveAssetTypeRequestCancel();
    });

    test('Approve Asset Type Request Comment Approve', async ({ page }) => {
        await assetEnrollment.approveAssetTypeRequestCommentApprove();
    });

    test('Approve Asset Type Request Comment Rejected', async ({ page }) => {
        await assetEnrollment.approveAssetTypeRequestCommentRejected();
    });

    test('Correct Request Date Appear', async ({ page }) => {
        await assetEnrollment.correctRequestDateAppear();
    });

    test('Approve Asset Type Sorting', async ({ page }) => {
        await assetEnrollment.approveAssetTypeSorting();
    });
});