import { test, expect } from '@playwright/test'
import { OverView } from '../pages/Asset_OverView'
import { LoginPage } from '../pages/Loginpage';
import { BasePage } from '../pages/Basepage';
import { Login } from '../support/command';

let Asset_OverView : OverView
test.describe("Asset OverView page", () => {
        test.beforeEach(async ({ page }) => {
                const loginPage = new LoginPage(page)
                const basepage = new BasePage(page)

                await basepage.open('url')
                await Login.login(page, "SuperUser")
                Asset_OverView = new OverView(page)
        });
        // TC_AM_003 & TC_AM_004 (I merged both test cases into a single test case)

        test("Asset Overview page ", async ({ page }) => {
                console.log("Verify Asset OverView Element")
                // TC_AM_003
                console.log('Assert management tab expand')
                expect(await Asset_OverView.verifyAsset())
        })

        test("Header Should be matched", async ({ page }) => {
                console.log('Header Should be matched')
                expect(await Asset_OverView.verifyHeader())

                console.log("By default 'All' appears in Asset type dropdown")
                expect(await Asset_OverView.verifyDefaultDropdown())
        })
        test("All cards displays on Asset Overview Page", async ({ page }) => {
                console.log('All cards displays on Asset Overview Page')
                expect(await Asset_OverView.verifyViewCards())

                console.log("Count of Card is equal to TotalAsset Display on right-top")
                expect(await Asset_OverView.verifyTotalAsset())
        })

        test("Asset OverView page Functionality", async ({ page }) => {
                // TC_AM_005
                expect(await Asset_OverView.Random_Asse_type_Selection())
                console.log("Random Option Selected")
                // TC_AM_006
                expect(await Asset_OverView.VerifyFilter())
                console.log("Data Get Filtered")
        })

        test("Verify XLSX File is Downloaded", async () => {
                // TC_AM_007
                expect(await Asset_OverView.verifyExport())
                console.log("Exported XLSX file contains data as expected.");

        })
        test("Verify Details display on cards", async () => {
                // TC_AM_008
                expect(await Asset_OverView.Details_appear_on_card())
                console.log("Details are displayed on cards")
        })
        test("Verify when click on any card card open up ", async () => {
                // TC_AM_009
                expect(await Asset_OverView.Card_openup())

                expect(await Asset_OverView.InnercountInnerAsset())
        })

        test("Verify any option is selected in Super Own dropdown", async () => {
                expect(await Asset_OverView.Card_openup())
                // TC_AM_011
                expect(await Asset_OverView.SuperOwnDropdown())
                // TC_AM_013
                expect(await Asset_OverView.Ownerdropdown())
                // TC_AM_013
                expect(await Asset_OverView.Availabilitydropdown())
                // I merge 3 test script in one TC_AM_014 || TC_AM_015 || TC_AM_016
                expect(await Asset_OverView.CheckOptionVisible())
                console.log("Option are Visible")
                // TC_AM_017 & TC_AM_018
                expect(await Asset_OverView.CardFilter())
                console.log("CardData filtered !!")
                // TC_AM_19
                expect(await Asset_OverView.Sorting())
                console.log("Redirected Towards Dashboard !!")
                // TC_AM_020
                console.log()
                expect(await Asset_OverView.Redirected())
                console.log("Redirected Towards Dashboard !!")
        })
})