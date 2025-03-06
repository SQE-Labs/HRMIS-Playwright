import { test, expect } from '@playwright/test'
import { OverView } from '../pages/Asset_OverView'
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/BasePage';
import { Login } from '../Support/Command';


test.describe("Asset OverView page", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        const basepage = new BasePage(page)

        await basepage.open('url')
        await Login.login(page, "SuperUser")
    });
    // TC_AM_003 & TC_AM_004 (I merged both test cases into a single test case)

    test("Asset Overview page ", async ({ page }) => {

        const Asset_OverView = new OverView(page)
        await test.step("Verify Asset OverView Element", async () => {
            // TC_AM_003
            console.log('Assert management tab expand')
            expect(await Asset_OverView.verifyAsset())


            console.log('Header Should be matched')
            expect(await Asset_OverView.verifyHeader())

            console.log("By default 'All' appears in Asset type dropdown")
            expect(await Asset_OverView.verifyDefaultDropdown())


            console.log('All cards displays on Asset Overview Page')
            expect(await Asset_OverView.verifyViewCards())

            // TC_AM_004
            console.log("Count of Card is equal to TotalAsset Display on right-top")
            expect(await Asset_OverView.verifyTotalAsset())

        })

        await test.step('Asset OverView page Functionality', async () => {
            // TC_AM_005
            expect(await Asset_OverView.Random_Asse_type_Selection())
            console.log("Random Option Selected")
        })

        await test.step("Record get Filter after clicking on Filter Button" , async () =>{
            // TC_AM_006
            expect(await Asset_OverView.VerifyFilter())
            console.log("Data Get Filtered")
        })

        await test.step("Verify XLSX File is Downloaded" , async () =>{
            // TC_AM_007
            expect(await Asset_OverView.verifyExport())
            console.log("Exported XLSX file contains data as expected.");
            
        }) 
        await test.step("Verify Details display on cards" , async() =>{
            // TC_AM_008
            expect(await Asset_OverView.Details_appear_on_card())
            console.log("Details are displayed on cards")
        })
        await test.step("Verify when click on any card card open up " , async () =>{
            // TC_AM_009
            expect(await Asset_OverView.Card_openup())
        })
        await test.step("Verify total count of inner Asset " ,async () =>{
            // TC_AM_010
            expect(await Asset_OverView.InnercountInnerAsset())

        })
        await test.step("Verify any option is selected in Super Own dropdown" , async() =>{
            // TC_AM_011
            expect(await Asset_OverView.SuperOwnDropdown())
        })

        await test.step("Verify any option is selected in Owner dropdown" , async() =>{
            // TC_AM_012
            expect(await Asset_OverView.Ownerdropdown())
        })
        await test.step("Verify any option is selected in Availability dropdown" , async() =>{
            // TC_AM_013
            expect(await Asset_OverView.Availabilitydropdown())
        })

        await test.step("Verify that option are visible " , async() =>{
           // I merge 3 test script in one TC_AM_014 || TC_AM_015 || TC_AM_016
            expect(await Asset_OverView.CheckOptionVisible())
            console.log("Option are Visible")
        })

        await test.step("Verify that option are visible " , async() =>{
            // TC_AM_017 & TC_AM_018
            expect(await Asset_OverView.CardFilter())
             console.log("CardData filtered !!")
         })
         await test.step("Verify that option are visible " , async() =>{
            // TC_AM_19
            expect(await Asset_OverView.Sorting())
             console.log("Redirected Towards Dashboard !!")
         })

         await test.step("Verify that option are visible " , async() =>{
            // TC_AM_020
            expect(await Asset_OverView.Redirected())
             console.log("Redirected Towards Dashboard !!")
         })
    })
})