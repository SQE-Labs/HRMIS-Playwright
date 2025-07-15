import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/Loginpage';
import testData from '../testData/testData.json';
import { Reimbursement } from '../pages/Reimbursement';

let reimbursement: Reimbursement;

test.describe("My Reimbursement page", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);
        reimbursement = new Reimbursement(page);
    });

    test("TC_MR_001 Reimbursement page", async ({ page }) => {
        await reimbursement.verifySubtabs();
    });
    test("TC_MR_002 Reimbursement page Collapse", async ({ page }) => {
        await reimbursement.collapsesReimbursementTab();
    });
    test("TC_MR_003 Reimbursement Request page", async ({ page }) => {
        await reimbursement.Reimbursement_Request_page();
    });
    test("TC_MR_004 Search Valid/Invalid Data", async ({ page }) => {
        await reimbursement.Search_Valid_Data();
    });
    test("TC_MR_005 Search Invalid Data", async ({ page }) => {
        await reimbursement.Search_InValid_Data();
    });
    test("TC_MR_006 Sorting", async ({ page }) => {
        await reimbursement.Sorting();
    });

    test("TC_MR_013 Reimbursement Request", async ({ page }) => {
        await reimbursement.Reimbursement_Request();
    });
    test("TC_MR_014 Back to Reimbursement", async ({ page }) => {
        await reimbursement.BacktoReimbursement();
    });
    test("TC_MR_015 Reimbursement Request Page", async ({ page }) => {
        await reimbursement.Reimbursement_Request_page();
    });

    test("TC_MR_007 Withdrawal", async ({ page }) => {
        await reimbursement.withdrawal();
    });
    test("TC_MR_008 Withdrawal Cross Button", async ({ page }) => {
        await reimbursement.withdrawal_cross_button();
    });
    test("TC_MR_009 Withdrawal Cancel Button", async ({ page }) => {
        await reimbursement.withdrawal_Cancel_button();
    });
    test("TC_MR_010 Withdraw Empty Comment Field", async ({ page }) => {
        await reimbursement.Withdraw_Empty_comment_Field();
    });
    test("TC_MR_011 Withdraw View Link Functionality", async ({ page }) => {
        await reimbursement.Withdraw_View_Link_Functionality();
    });
    test("TC_MR_012 Withdraw Fill All Mandatory Field", async ({ page }) => {
        await reimbursement.Withdraw_Fill_All_Mandatory_Field();
    });
});
