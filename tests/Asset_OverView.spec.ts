import { test, expect } from '@playwright/test'
import { OverView } from '../pages/Asset_OverView'
import { BasePage } from '../pages/Basepage';
import { LoginPage } from '../pages/Loginpage';
import testData from '../testData/testData.json';

let assetOverview: OverView;

test.describe("Asset Overview page", () => {
        test.beforeEach(async ({ page }) => {
                const basePage = new BasePage(page);
                let loginObj = new LoginPage(page);
                await loginObj.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);
                assetOverview = new OverView(page);
                await assetOverview.expandAssetManagementTab()
                await assetOverview.navigateToAssetOverview();
                await assetOverview.waitForDotsLoaderToDisappear()

        });

        // TC_AM_003 & TC_AM_004 (merged)
        test("Asset Overview page open and verify  header", async ({ page }) => {
                console.log("Verify Asset Overview Element");
                console.log('Assert management tab expand');
                //assertion
                let headerTxt = await assetOverview.getHeaderText();
                expect(headerTxt?.trim()).toBe("Asset Overview")

        })


        test("All cards display on Asset Overview Page", async ({ page }) => {
                console.log('All cards display on Asset Overview Page');
                expect(await assetOverview.getCardsCount()).toBe(testData.assetsCardCount);
                expect(await assetOverview.getTotalAssetCount()).toBe(testData.assetsCardCount);
        });

        test("Asset Overview page functionality", async ({ page }) => {
                // TC_AM_005
                expect(await assetOverview.randomAssetTypeSelection());
                console.log("Random option selected");
                // TC_AM_006
                expect(await assetOverview.verifyFilter());
                console.log("Data filtered");
        });

        test("Verify XLSX file is downloaded", async () => {
                // TC_AM_007
                expect(await assetOverview.verifyExport());
                console.log("Exported XLSX file contains data as expected.");
        });

        test("Verify details display on cards", async () => {
                // TC_AM_008
                expect(await assetOverview.detailsAppearOnCard());
                console.log("Details are displayed on cards");
        });

        test("Verify when clicking on any card, card opens up", async () => {
                // TC_AM_009
                expect(await assetOverview.openCard());
                expect(await assetOverview.countInnerAssets());
        });

        test("Verify any option is selected in Super Own dropdown", async () => {
                expect(await assetOverview.openCard());
                // TC_AM_011
                expect(await assetOverview.selectRandomSuperOwner());
                // TC_AM_013
                expect(await assetOverview.selectRandomOwner());
                // TC_AM_013
                expect(await assetOverview.selectRandomAvailability());
                // TC_AM_014 || TC_AM_015 || TC_AM_016
                expect(await assetOverview.checkOptionVisible());
                console.log("Options are visible");
                // TC_AM_017 & TC_AM_018
                expect(await assetOverview.cardFilter());
                console.log("Card data filtered!!");
                // TC_AM_019
                expect(await assetOverview.verifySorting());
                console.log("Redirected towards Dashboard!!");
                // TC_AM_020
                expect(await assetOverview.verifyRedirected());
                console.log("Redirected towards Dashboard!!");
        });
});