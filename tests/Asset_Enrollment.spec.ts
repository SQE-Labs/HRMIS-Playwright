import { test, expect } from '@playwright/test'
import { OverView } from '../pages/Asset_OverView'
import { LoginPage } from '../pages/Loginpage';
import { BasePage } from '../pages/Basepage';
import { Login } from '../support/command';
import { Asset_DeAllocation } from '../pages/Asset_Deallocation';
import { Asset_Enrollment } from '../pages/New_Asset_Enrollment';
let Enrollment : Asset_Enrollment
test.describe("Asset Enrollment page", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        const basepage = new BasePage(page)

        await basepage.open('url')
        //passwords should never be used directly in test due to security reasons. //To-Do
        await Login.login(page, "SuperUser")
        Enrollment = new Asset_Enrollment(page)

    })

    test("New Asset Enrollment page ", async ({ page }) => {
        await Enrollment.Enrollment()
    })
    test("New Asset Enrollment Create Asset ", async ({ page }) => {
        console.log("Create Assets ....")
        await Enrollment.Create_Asset()
    })
    test("New Asset Enrollment Bulk Create Asset ", async ({ page }) => {
        console.log("Bulk Create Assets ....")
        await Enrollment.Bulk_Create_Asset()
    })
    test("New Asset Enrollment Asset type request ", async ({ page }) => {
        await Enrollment.Asset_Type_Request()
    })
    test("New Asset Enrollment Asset type request create  asset type functionality", async ({ page }) => {
        await Enrollment.Asset_Type_Request_Create_asset_type_request()
    })
    test("New Asset Enrollment Asset type request create  asset type empty field", async ({ page }) => {
        await Enrollment.Asset_type_request_empty_field()
    })
    test("Asset_type_request_Asset_Name_field_More_Than_40_Characters ", async ({ page }) => {
        await Enrollment.Asset_type_request_Asset_Name_field_Morethen40Characters()
    })
    test("Asset_type_request_Asset_Name_field_Only_Special_or_Number ", async ({ page }) => {
        await Enrollment.Asset_type_request_Asset_Name_field_Number_Special_Char()
    })
    test("Create_Asset_Type_Cross_icon :- ", async ({ page }) => {
        await Enrollment.Create_Asset_Type_Cross_icon()
    })
    test("Create_Asset_Type_Cancel_Button :- ", async ({ page }) => {
        await Enrollment.Create_Asset_Type_Cancel_Button()
    })
    test("Create_Asset_Type_Created :- ", async ({ page }) => {
        await Enrollment.Create_Asset_Type_Created()
    })
    test("Create_Asset_Type_Sorting :- ", async ({ page }) => {
        await Enrollment.Create_Asset_type_Sorting()
    })
    test("Asset_Type_request_Status_Approve_Status :- ", async ({ page }) => {
        await Enrollment.Asset_Type_request_Status_Approve_Status()
    })
    test("Asset_Type_request_Status_Reject_Status :- ", async ({ page }) => {
        await Enrollment.Asset_Type_request_Status_Reject_Status()
    })
    test("Asset_Type_request_Approve_Date :- ", async ({ page }) => {
        await Enrollment.Asset_Type_request_Approve_Date()
    })
    test("Asset_Type_request_Reject_Date :- ", async ({ page }) => {
        await Enrollment.Asset_Type_request_Reject_Date()
    })
    test("Approve_Asset_type_request_No_record :- ", async ({ page }) => {
        await Enrollment.Approve_Asset_type_request_No_record()
    })
    test("Approve_Asset_type_request_Verification :- ", async ({ page }) => {
        await Enrollment.Approve_Asset_type_request_verfication()
    })
    test("Approve_Asset_type_request_Approved :- ", async ({ page }) => {
        await Enrollment.Approve_Asset_type_request_Approved()
    })
    test("Approve_Asset_type_request_Rejected :- ", async ({ page }) => {
        await Enrollment.Approve_Asset_type_request_Rejected()
    })
    test("Approve_Asset_type_request_Cross :- ", async ({ page }) => {
        await Enrollment.Approve_Asset_type_request_Cross()
    })
    test("Approve_Asset_type_request_Cancel :- ", async ({ page }) => {
        await Enrollment.Approve_Asset_type_request_Cancel()
    })
    test("Approve_Asset_type_request_comment_approve :- ", async ({ page }) => {
        await Enrollment.Approve_Asset_type_request_comment_Approve()
    })
    test("Approve_Asset_type_request_comment_Rejected :- ", async ({ page }) => {
        await Enrollment.Approve_Asset_type_request_comment_rejected()
    })
    test("correct_request_date_appear :- ", async ({ page }) => {
        await Enrollment.correct_request_date_appear()
    })
    test("Approve_Asset_type_Sorting :- ", async ({ page }) => {
        await Enrollment.Approve_Asset_type_Sorting()
    })
    
})