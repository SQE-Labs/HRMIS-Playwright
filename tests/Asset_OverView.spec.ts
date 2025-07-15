import { test, expect } from '@playwright/test'
import { OverView } from '../pages/Asset_OverView'
import { BasePage } from '../pages/Basepage';
import { LoginPage } from '../pages/Loginpage';
import testData from '../testData/testData.json';
import fs from 'fs';
import path from 'path';
import os from 'os';


let assetOverview: OverView;

test.describe("Asset Overview page", () => {
        test.beforeEach(async ({ page }) => {
                const basePage = new BasePage(page);
                let loginObj = new LoginPage(page);
                await loginObj.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);
                assetOverview = new OverView(page);
                await page.waitForLoadState('domcontentloaded')
                await assetOverview.expandAssetManagementTab()
                await assetOverview.navigateToAssetOverview();
                await assetOverview.waitforLoaderToDisappear()
                await page.waitForTimeout(3000);

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

        test("Asset Overview page filter  functionality TC_AM_06", async ({ page }) => {

                let options = await assetOverview.getFilterDropdownOption();
                expect(options.length).toBeGreaterThan(1);
                await expect(assetOverview.overviewDropdown).toHaveText("All");
                await assetOverview.selectFilterDropdownOption(options[1]);
                await assetOverview.clickFilterButton();

        });

        test("Verify XLSX file is downloaded", async ({ page }) => {

                let options = await assetOverview.getFilterDropdownOption();
                expect(options.length).toBeGreaterThan(1);
                await expect(assetOverview.overviewDropdown).toHaveText("All");
                await assetOverview.selectFilterDropdownOption(options[1]);
                await assetOverview.clickFilterButton();
                if (await assetOverview.emptyRecord.isVisible()) {
                        await assetOverview.clickExportButton();
                        expect(await assetOverview.toast.innerText()).toBe("No Record Available!");

                }
                else {
                        // await assetOverview.clickExportButton();
                        const [download] = await Promise.all([
                                page.waitForEvent("download", { timeout: 5000 }),
                                assetOverview.exportButton.click()
                        ]);

                        // Get the suggested filename

                        const downloadedFile = download.suggestedFilename();

                        // Use current working directory + downloads folder inside your project
                        const downloadDir = path.join(process.cwd(), 'Download');

                        // Make sure downloads folder exists
                        if (!fs.existsSync(downloadDir)) {
                                fs.mkdirSync(downloadDir, { recursive: true });
                        }

                        // Build full path to save file
                        const downloadPath = path.join(downloadDir, downloadedFile);

                        // Save the download
                        await download.saveAs(downloadPath);

                        // Assert file exists
                        if (fs.existsSync(downloadPath)) {
                                console.log(`File successfully downloaded: ${downloadPath}`);
                        } else {
                                throw new Error("Downloaded file not found in expected location!");
                        }
                }
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