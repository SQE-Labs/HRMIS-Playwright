
import { test, expect } from '@playwright/test'
import { OverView } from '../pages/Asset_OverView'
import { BasePage } from '../pages/Basepage';
import { LoginPage } from '../pages/LoginPage';
import testData from '../testData/testData.json';

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

        test("HRMIS_1 , HRMIS_2 , HRMIS_3 Asset Overview page filter functionality @smoke", async ({ page }) => {
                // Get all filter options
                console.debug("Verify Asset Overview Element");
                console.debug('Assert management tab expand');
                //assertion
                let headerTxt = await assetOverview.getHeaderText();
                expect(headerTxt?.trim()).toBe("Asset Overview")

        })


        test("All cards display on Asset Overview Page", async ({ page }) => {
                console.debug('All cards display on Asset Overview Page');
                expect(await assetOverview.getCardsCount()).toBe(testData.assetsCardCount);
                expect(await assetOverview.getTotalAssetCount()).toBe(testData.assetsCardCount);
                let options = await assetOverview.getFilterDropdownOption();
                expect(options.length).toBeGreaterThan(1);
                await expect(assetOverview.overviewDropdown).toHaveText("All");
                const selectedOption = options[1];
                await assetOverview.selectFilterDropdownOption(selectedOption);
                await assetOverview.clickFilterButton();
                const displayedAssetType = await assetOverview.getselectedOptionName();
                expect(displayedAssetType?.trim()).toContain(selectedOption);
                console.log(`Filter applied: Expected "${selectedOption}", found "${displayedAssetType?.trim()}"`);
        });

        test("Verify XLSX file is downloaded @smoke", async ({ page }) => {
                let options = await assetOverview.getFilterDropdownOption();
                expect(options.length).toBeGreaterThan(1);
                await expect(assetOverview.overviewDropdown).toHaveText("All");
                await assetOverview.selectFilterDropdownOption(options[1]);
                await assetOverview.clickFilterButton();
                if (await assetOverview.emptyRecord.isVisible()) {
                        await assetOverview.clickExportButton();
                        expect(await assetOverview.toast.innerText()).toBe("No Record Available!");

                } else {
                        await assetOverview.verifyXLSXDownload(page, async () => {
                                await assetOverview.clickExportButton();
                        });
                }

        });

        test("Verify details display on cards", async () => {
                // TC_AM_008
                await assetOverview.selectAssetTypeDropdown("Desktop PC")
                await assetOverview.verifyCardDetails();
                console.debug("Details are displayed on cards");
        });

        test("HRMIS_4 Verify when clicking on any card, card opens up @smoke", async ({ page }) => {
                // TC_AM_009
                let options = await assetOverview.getFilterDropdownOption();
                expect(options.length).toBeGreaterThan(1);
                await expect(assetOverview.overviewDropdown).toHaveText("All");
                const selectedOption = options[4];
                await assetOverview.selectFilterDropdownOption(selectedOption);
                await assetOverview.clickFilterButton();
                await assetOverview.openCard(selectedOption);
                await assetOverview.countInnerAssets();
                await expect(page.getByText("S.No.")).toBeVisible()
                await expect(page.getByText("Manufacturer")).toBeVisible()
                await expect(page.getByText("Model")).toBeVisible()
                await expect(page.getByText("Processor")).toBeVisible()
                await expect(page.getByText("RAM")).toBeVisible()
                await expect(page.getByText("SSD").first()).toBeVisible()
                await expect(page.getByText("Serial Number")).toBeVisible()
                await expect(page.getByText("Super Owner").last()).toBeVisible()
                await expect(page.getByText("Owner").last()).toBeVisible()
                await expect(page.getByText("Status")).toBeVisible()
                await expect(page.getByText("Availability").last()).toBeVisible()

                await assetOverview.verifyOwnerDropdownOptionsForSuperOwner('All', ['All', 'Caelius', 'Salesforce', 'Consultant', 'SQE Labs']);
                await assetOverview.verifyOwnerDropdownOptionsForSuperOwner('CAELIUS_OWNED', ['All', 'Caelius', 'Consultant', 'SQE Labs']);
                await assetOverview.verifyOwnerDropdownOptionsForSuperOwner('CLIENT_OWNED', ['Salesforce'], false);

        });
        test('HRMIS_5 , HRMIS_6 Verify records are filtered based on dropdowns and export behavior @smoke @knownbug', async ({ page }) => {
                await assetOverview.openCard("Desktop PC");
                const filteredCount = await assetOverview.filterAssetsByDropdownSelections();
                if (filteredCount === 0) {
                        console.debug("No records available after filtering.");
                        expect(filteredCount).toBe(0);
                        await assetOverview.clickExportButton();
                        const toastMessage = await assetOverview.toast.innerText();
                        expect(toastMessage).toBe("No Record Available!");
                } else {
                        console.debug(`${filteredCount} records found after filtering.`);
                        expect(filteredCount).toBeGreaterThan(0);
                        await assetOverview.verifyXLSXDownload(page, async () => {
                                await assetOverview.clickExportButton();
                        });
                }
        });

        // TC_AM_019
        test('Verify Sorting', async ({ page }) => {
                test.setTimeout(480000);
                await assetOverview.openCard("Desktop PC")

                const columnsToTest = [2, 3, 4, 5, 6, 7];

                for (const columnIndex of columnsToTest) {
                        console.log(`Testing Column ${columnIndex} - Ascending Sort`);
                        await assetOverview.clickAssetTypeRequestOnRowHeader(columnIndex);

                        // Wait to allow table sort/render to complete
                        await page.waitForTimeout(2000);

                        const ascData = await assetOverview.getRowdata(columnIndex);
                        await assetOverview.verifyRowsSorting(ascData, "asc");

                        console.log(`Testing Column ${columnIndex} - Descending Sort`);
                        await assetOverview.clickAssetTypeRequestOnRowHeader(columnIndex);

                        // Wait again for descending sort
                        await page.waitForTimeout(2000);

                        const descData = await assetOverview.getRowdata(columnIndex);
                        await assetOverview.verifyRowsSorting(descData, "desc");
                }

        })

        test("Verify Redirection from asset Overview header @smoke", async () => {
                await assetOverview.openCard("Desktop PC")
                await assetOverview.assetOverviewRedirect.click()
                await assetOverview.waitforLoaderToDisappear()
                await expect(assetOverview.overviewHeader).toBeVisible()
                await expect(assetOverview.card.first()).toBeVisible()
        })
});
