import { test, expect } from '@playwright/test'
import { Asset_Allocation } from '../pages/Asset_Allocation'
import { OverView } from '../pages/Asset_OverView'
import { LoginPage } from '../pages/Loginpage';
import { BasePage } from '../pages/Basepage';
import { Login } from '../support/command';
import { Reimbursement } from '../pages/Reimbursement';


let Reimburse : Reimbursement
test.describe("My Reimbursement page", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        // const basepage = new BasePage(page)

        await loginPage.open('url')
        await Login.login(page, "SuperUser")
        Reimburse = new Reimbursement(page)
    });

    test("TC_MR_001 Reimbursement page  ", async ({ page }) => {
        await Reimburse.verifySubtabs()
    })
    test("TC_MR_002 Reimbursement page Collapse ", async ({ page }) => {
        await Reimburse.collapsesReimbursement_Tab()
    })
    test("TC_MR_003 Reimbursement_Request_page ", async ({ page }) => {
        await Reimburse.Reimbursement_Request_page()
    })
     test("TC_MR_004 Search_Valid_inValid_Data", async ({ page }) => {
        await Reimburse.Search_Valid_Data()
    })
    test("TC_MR_005 Search_InValid_Data", async ({ page }) => {
        await Reimburse.Search_InValid_Data()
    })
    test("TC_MR_006 Sorting", async ({ page }) => {
        await Reimburse.Sorting()
    })


    test("TC_MR_013 Reimbursement_Request", async ({ page }) => {
        await Reimburse.Reimbursement_Request()
    })
    test("TC_MR_014 BacktoReimbursement", async ({ page }) => {
        await Reimburse.BacktoReimbursement()
    })
    test("TC_MR_015 Reimbursemnt_Request_page", async ({ page }) => {
        await Reimburse.Reimbursemnt_Request_page()
    })

    test("TC_MR_007 withdrawal", async ({ page }) => {
        await Reimburse.withdrawal()
    })
    test("TC_MR_008 withdrawal_cross_button", async ({ page }) => {
        await Reimburse.withdrawal_cross_button()
    })
    test("TC_MR_009 withdrawal_Cancel_button", async ({ page }) => {
        await Reimburse.withdrawal_Cancel_button()
    })
    test("TC_MR_010 Withdraw_Empty_comment_Field", async ({ page }) => {
        await Reimburse.Withdraw_Empty_comment_Field()
    })
     test("TC_MR_011 Withdraw_View_Link_Functionality", async ({ page }) => {
        await Reimburse.Withdraw_View_Link_Functionality()
    })
    test("TC_MR_012 Withdraw_Fill_All_Mandatory_Field", async ({ page }) => {
        await Reimburse.Withdraw_Fill_All_Mandatory_Field()
    })    
})