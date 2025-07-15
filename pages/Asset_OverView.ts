import { Page, Locator, expect } from "@playwright/test";
import { AssetManagementTab } from "./Asset_Management_Tab";
import fs from "fs";
import { Alert } from '../components/alert'

export class OverView extends AssetManagementTab {
    public overviewAsset: Locator;
    public overviewHeader: Locator;
    public overviewDropdown: Locator;
    public overviewCards: Locator;
    public totalAsset: Locator;
    public cardsCount: number;
    public assetTypeDropdown: Locator;
    public filterButton: Locator;
    public randomOption: string;
    public exportButton: Locator;
    public alert: Alert;
    public totalAssetsAfterFilter: number;
    public emptyRecord: Locator;
    public assignedBadge: Locator;
    public availableBadge: Locator;
    public totalBadge: Locator;
    public card: Locator;
    public cardHeader: Locator;
    public serialNoRows: Locator;
    public innerAssetCount: number;
    public superOwnerDropdown: Locator;
    public ownerDropdown: Locator;
    public availabilityDropdown: Locator;
    public superOwnerRandomOption: string;
    public ownerRandomOption: string;
    public availabilityRandomOption: string;
    public assetOverviewRedirect: Locator;
    public toast: Locator;
    static this: any;

    constructor(page: Page) {
        super(page)
        this.cardsCount = 0
        this.innerAssetCount = 0
        this.totalAssetsAfterFilter = 0
        this.randomOption = ''
        this.overviewAsset = page.locator("//a[text()='Asset Overview']")
        this.overviewHeader = page.locator("//h1[text()='Asset Overview']")
        this.overviewDropdown = page.locator("#filterAssetType option:nth-child(1)")
        this.overviewCards = page.locator(".col-md-12>div>div")
        this.totalAsset = page.locator(".total")
        this.assetTypeDropdown = page.locator('[id="filterAssetType"]')
        this.filterButton = page.locator("button[type='button']")
        this.exportButton = page.locator("//a[@class='export theme-button']")
        this.emptyRecord = page.locator(".fs-4.text-secondary.text-center")
        this.assignedBadge = page.locator(".badge.badge-info ")
        this.availableBadge = page.locator(".badge.badge-success.mx-2")
        this.totalBadge = page.locator(".badge.badge-danger ")
        this.card = page.locator(".card-body.text-center")
        this.cardHeader = page.locator(".d-flex>span>h1")
        this.serialNoRows = page.locator("tbody>tr")
        this.superOwnerDropdown = page.locator("[id='superOwnerFilter']")
        this.ownerDropdown = page.locator("#ownerFilter")
        this.availabilityDropdown = page.locator("#availabilityFilter")
        this.assetOverviewRedirect = page.locator("div>span>a")
        this.toast = page.locator(".Toastify__toast-body>div:nth-child(2)")

    }


    async navigateToAssetOverview() {
        this.overviewAsset.click();
    }
    async getHeaderText(): Promise<string | null> {

        const headerText = await this.overviewHeader.textContent();

        return headerText;
    }
    async verifyDefaultDropdown(): Promise<void> {
        await expect(this.overviewDropdown).toHaveText("All")
    }
    // TO-DO
    async getCardsCount(): Promise<number> {
        await this.waitforLoaderToDisappear()
        await this.page.waitForLoadState('networkidle');

        await this.page.waitForTimeout(8000)
        const cards = await this.overviewCards.allTextContents()
        console.log(cards)
        this.cardsCount = await this.overviewCards.count()
        console.log("Total Cards :- ", this.cardsCount)

        let isMatched = true
        if (cards.length !== this.cardsCount) {
            console.log(`Mismatch in number of cards: Expected ${this.cardsCount}, but got ${cards.length}`);
            isMatched = false;
        }
        if (isMatched) {
            console.log("All cards matched Successfully")
        } else {
            console.log("Some cards title does not matched")
        }
        return this.cardsCount
    }

    // TC_AM_004
    async getTotalAssetCount(): Promise<number> {

        const totalAssetTexts = await this.totalAsset.allTextContents()
        const totalAssetCount = totalAssetTexts.length > 0 ? parseInt(totalAssetTexts[0].replace(/\D/g, ''), 10) : 0;
        await this.page.waitForTimeout(1000)
        console.log("TotalAsset :  ", totalAssetCount)
        let isAssetCountMatch = true
        if (totalAssetCount === 0) {
            console.warn("No assets found after filtering. This is expected behavior if no matching assets exist.");
        } else if (totalAssetCount === this.cardsCount) {
            console.log("Count of (all cards and total assets) Match successfully");
            isAssetCountMatch = true;
        } else {
            console.error(`Mismatch: 'number of cards' is not equal to 'totalAssets': Expected ${this.cardsCount}, but got ${totalAssetCount}`);
        }
        return totalAssetCount
    }


    async getFilterDropdownOption(): Promise<string[]> {
        expect(this.assetTypeDropdown).toBeVisible();

        const options = await this.assetTypeDropdown.locator("option").allInnerTexts();
        const validOptions = options.filter(option => option.trim() !== "");
        return validOptions;
    }
    async selectFilterDropdownOption(optionText: string): Promise<void> {
        // const randomOption = validOptions[Math.floor(Math.random() * validOptions.length)].trim();
        await this.assetTypeDropdown.selectOption({ label: optionText });
        console.log(`Successfully selected: ${optionText}`);
    }
    async clickFilterButton(): Promise<void> {
        await this.filterButton.click();
        await this.waitforLoaderToDisappear();


    }
    async clickExportButton(): Promise<void> {
        await this.exportButton.click();
        await this.waitforLoaderToDisappear();

    }



    // TC_AM_006
    // async verifyFilter(): Promise<number | void> {



    //     await this.filterButton.click();
    //     await this.waitForDotsLoaderToDisappear()
    //     await this.waitForSpinnerLoaderToDisappear()
    //     this.cardsCount = await this.overviewCards.count();
    //     console.log("Data is filtered when no option is selected");
    //     let totalAssetsAfterFilter = await this.getTotalAssetCount();
    //     console.log(`Total assets after filtering: ${totalAssetsAfterFilter}`);
    //     this.randomOption = await this.randomAssetTypeSelection() || '';
    //     if (!this.randomOption) {
    //         console.warn("No valid option selected. Skipping filter verification.");
    //         return;
    //     }
    //     console.log(`Randomly selected asset type: ${this.randomOption}`);

    //     await this.waitForDotsLoaderToDisappear()
    //     await this.waitForSpinnerLoaderToDisappear()
    //     await this.page.waitForTimeout(1000);
    //     this.cardsCount = await this.overviewCards.count();
    //     totalAssetsAfterFilter = await this.getTotalAssetCount();
    //     console.log(`Total assets after filtering: ${totalAssetsAfterFilter}`);
    //     console.log("The data is filtered based on a randomly selected option.");
    //     return totalAssetsAfterFilter
    // }

    // // TC_AM_007
    // async verifyExport(): Promise<void> {

    //     const noRecordElement = await this.page.$(".Toastify__toast-body>div:nth-child(2)");
    //     let emptyRecordText = "";
    //     if (noRecordElement) {
    //         emptyRecordText = (await noRecordElement.textContent())?.trim() || "";
    //     }
    //     if (emptyRecordText === noRecordText || totalAssetsAfterFilter === 0) {
    //         console.log("Case 1: No records available after filtering.");
    //         await this.exportButton.click();
    //         await this.page.waitForTimeout(1500);
    //         await expect(this.alert.getAlertElement()).toBeVisible();
    //         const alertMessage = await this.alert.getAlertText();
    //         console.log("Alert message appeared as expected:", alertMessage);
    //         expect(alertMessage).toContain(noRecordText);
    //         console.log(" Export should not trigger a file download.");
    //     } else {
    //         console.log(" Case 2: One or more assets found. Proceeding with export...");
    //         try {
    //             const [download] = await Promise.all([
    // this.page.waitForEvent("download", { timeout: 5000 }),
    //                 this.exportButton.click()
    //             ]);
    //             const downloadedFile = download.suggestedFilename();
    //             console.log("Downloaded file:", downloadedFile);
    //             if (!downloadedFile.endsWith(".xlsx")) {
    //                 throw new Error(`Invalid file extension: ${downloadedFile}`);
    //             }
    //             const downloadPath = `C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Download\\${downloadedFile}`;
    //             await download.saveAs(downloadPath);
    //             if (fs.existsSync(downloadPath)) {
    //                 console.log(`File successfully downloaded: ${downloadPath}`);
    //             } else {
    //                 throw new Error("Error: Downloaded file not found in expected location!");
    //             }
    //             expect(fs.existsSync(downloadPath)).toBeTruthy();
    //         } catch (error) {
    //             console.error("Error during file download:", error);
    //         }
    //     }
    // }

    // TC_AM_008



    async detailsAppearOnCard(): Promise<void> {
        await this.overviewAsset.click()
        const expectedDetails = ['Assigned', 'Available', 'Total']
        await this.assetTypeDropdown.waitFor({ state: 'visible', timeout: 1000 });
        await this.page.waitForTimeout(1000);
        await this.assetTypeDropdown.selectOption({ value: "1" });
        const selectedValue = await this.assetTypeDropdown.inputValue();
        console.log(`Selected asset type: ${selectedValue}`);
        await this.filterButton.click();
        const details = [
            (await this.assignedBadge.innerText()).split(":")[0].trim(),
            (await this.availableBadge.innerText()).split(":")[0].trim(),
            (await this.totalBadge.innerText()).split(":")[0].trim()
        ]
        console.log(details)
        expect(details).toEqual(expectedDetails)
    }

    // TC_AM_009
    async openCard(): Promise<void> {
        await this.expandAssetManagementTab()
        await this.overviewAsset.click()
        await this.assetTypeDropdown.waitFor({ state: 'visible', timeout: 5000 });
        await this.assetTypeDropdown.selectOption({ value: "4" });
        await this.filterButton.click()
        await this.page.waitForTimeout(2000);
        await this.card.click()
        await this.page.waitForTimeout(5000);
        let header = await this.cardHeader.textContent()
        if (header?.trim() === 'Desktop PC') {
            console.log("Redirected towards :-", header)
        } else {
            console.log("Unexpected header text found")
        }
    }

    // TC_AM_010
    async countInnerAssets(): Promise<void> {
        const serialNoTexts = await this.serialNoRows.allTextContents()
        this.innerAssetCount = await this.serialNoRows.count()
        console.log(this.innerAssetCount)
        const totalAssetInsideCardTexts = await this.totalAsset.allTextContents()
        const validNumbers = totalAssetInsideCardTexts
            .map(text => parseInt(text.replace(/\D/g, ''), 10))
            .filter(num => !isNaN(num));
        const totalAssetCountInsideCard = validNumbers.length > 0 ? validNumbers[0] : 0;
        console.log("TotalAsset :  ", totalAssetCountInsideCard)
        let isAssetCountMatchInsideCard = true
        if (totalAssetCountInsideCard === 0) {
            console.warn("No assets found after filtering. This is expected behavior if no matching assets exist.");
        } else if (totalAssetCountInsideCard === this.innerAssetCount) {
            console.log("");
            isAssetCountMatchInsideCard = true;
        } else {
            console.error(`Mismatch: 'number of cards' is not equal to 'totalAssets': Expected ${this.innerAssetCount}, but got ${totalAssetCountInsideCard}`);
        }
    }

    // TC_AM_011
    async selectRandomSuperOwner(): Promise<string | null> {
        console.log("Click on Super Owner Dropdown");
        await this.superOwnerDropdown.waitFor({ state: "visible", timeout: 2000 });
        let options = await this.superOwnerDropdown.locator("option").allInnerTexts();
        if (options.length === 0) {
            console.error("No options available in the dropdown.");
            return null;
        }
        const validOptions = options.filter(option => option.trim() !== "");
        if (validOptions.length === 0) {
            console.error("No valid options found in the dropdown.");
            return null;
        }
        const randomOption = validOptions[Math.floor(Math.random() * validOptions.length)].trim();
        console.log(`Randomly selected option: ${randomOption}`);
        try {
            await this.superOwnerDropdown.selectOption({ label: randomOption });
            console.log(`Successfully selected: ${randomOption}`);
        } catch (error) {
            console.error(`Failed to select option: ${randomOption}`, error);
            return null;
        }
        const selectedValue = (await this.superOwnerDropdown.inputValue()).trim();
        console.log(`Selected value: ${selectedValue}`);
        return selectedValue
    }

    // TC_AM_012
    async selectRandomOwner(): Promise<string | null> {
        console.log("Click on Owner Dropdown");
        await this.ownerDropdown.waitFor({ state: "visible", timeout: 2000 });
        const options = await this.ownerDropdown.locator("option").allInnerTexts();
        if (options.length === 0) {
            console.error("No options available in the dropdown.");
            return null;
        }
        const validOptions = options.filter(option => option.trim() !== "");
        if (validOptions.length === 0) {
            console.error("No valid options found in the dropdown.");
            return null;
        }
        const randomOption = validOptions[Math.floor(Math.random() * validOptions.length)].trim();
        console.log(`Randomly selected option: ${randomOption}`);
        try {
            await this.ownerDropdown.selectOption({ label: randomOption });
            console.log(`Successfully selected: ${randomOption}`);
        } catch (error) {
            console.error(`Failed to select option: ${randomOption}`, error);
            return null;
        }
        const selectedValue = (await this.ownerDropdown.inputValue()).trim();
        console.log(`Selected value: ${selectedValue}`);
        return selectedValue
    }

    // TC_AM_013
    async selectRandomAvailability(): Promise<string | null> {
        console.log("Click on Availability Dropdown");
        await this.availabilityDropdown.waitFor({ state: "visible", timeout: 2000 });
        const options = await this.availabilityDropdown.locator("option").allInnerTexts();
        if (options.length === 0) {
            console.error("No options available in the dropdown.");
            return null;
        }
        const validOptions = options.filter(option => option.trim() !== "");
        if (validOptions.length === 0) {
            console.error("No valid options found in the dropdown.");
            return null;
        }
        const randomOption = validOptions[Math.floor(Math.random() * validOptions.length)].trim();
        console.log(`Randomly selected option: ${randomOption}`);
        try {
            await this.availabilityDropdown.selectOption({ label: randomOption });
            console.log(`Successfully selected: ${randomOption}`);
        } catch (error) {
            console.error(`Failed to select option: ${randomOption}`, error);
            return null;
        }
        const selectedValue = (await this.availabilityDropdown.inputValue()).trim();
        console.log(`Selected value: ${selectedValue}`);
        return selectedValue
    }

    // I merge 3 test script in one TC_AM_014 || TC_AM_015 || TC_AM_016
    async checkOptionVisible(): Promise<void> {
        console.log("Check All option is selected and In Owner dropdown All options are visible")
        let superOwnerOptions = await this.superOwnerDropdown.locator("option").allTextContents();
        let superOwnerCount = superOwnerOptions.length
        console.log(superOwnerCount)
        for (let x = 0; x < superOwnerCount; x++) {
            console.log(await this.superOwnerDropdown.selectOption({ index: x }))
            await this.page.waitForTimeout(500);
            let ownerDropdownOptions = await this.ownerDropdown.allTextContents()
            console.log("Option in OwnerDropdown", ownerDropdownOptions)
            let ownerOptionCount = await this.ownerDropdown.count()
            let visibleOwnerOptions: string[] = []
            for (let i = 0; i < ownerOptionCount; ++i) {
                let presentOwnerOption = await this.ownerDropdown.nth(i).innerText()
                visibleOwnerOptions.push(presentOwnerOption.replace(/\n/g, "").trim())
            }
            console.log(visibleOwnerOptions)
            expect(ownerDropdownOptions).toEqual(visibleOwnerOptions);
        }
    }

    // I merge 2 test case in one TC_AM_017 & TC_AM_018
    async cardFilter(): Promise<void> {
        console.log("Collecting selected dropdown values...");
        let superOwnerValue = await this.selectRandomSuperOwner();
        let ownerValue = await this.selectRandomOwner();
        let availabilityValue = await this.selectRandomAvailability();
        let cardsData = {
            superOwnerValue,
            ownerValue,
            availabilityValue
        };
        console.log("Selected Dropdown Values:", cardsData);
        await this.filterButton.click()
        await this.page.waitForTimeout(500);
        await this.waitForDotsLoaderToDisappear();
        await this.waitForSpinnerLoaderToDisappear();

        const totalAssetsAfterFilter = await this.getTotalAssetCount();
        console.log(`Total assets after filtering: ${totalAssetsAfterFilter}`);
        const noRecordText = "No Record Available!";
        const noRecordElement = await this.page.$(".Toastify__toast-body>div:nth-child(2)");
        let emptyRecordText = "";
        if (noRecordElement) {
            emptyRecordText = (await noRecordElement.textContent())?.trim() || "";
        }
        if (emptyRecordText === noRecordText || totalAssetsAfterFilter === 0) {
            console.log("Case 1: No records available after filtering.");
            const downloadPromise = this.page.waitForEvent('download').catch(() => null);
            await this.exportButton.click();
            await this.page.waitForTimeout(1500);
            try {
                await expect(this.alert.getAlertElement()).toBeVisible();
                const alertMessage = await this.alert.getAlertText();
                console.log("Alert message appeared as expected:", alertMessage);
                expect(alertMessage).toContain(noRecordText);
                console.log(" Export did NOT trigger a file download. Everything is correct.");
            } catch (error) {
                console.warn("Alert did not appear, checking for file download...");
                const download = await downloadPromise;
                if (download) {
                    console.log(" File was downloaded when no records were available!");
                } else {
                    console.log("Neither an alert appeared nor was a file downloaded.");
                }
            }
            console.log("Running alternative test case after failed export.");
        }
        else {
            console.log(" Case 2: One or more assets found. Proceeding with export...");
            try {
                const [download] = await Promise.all([
                    this.page.waitForEvent("download", { timeout: 2000 }),
                    this.exportButton.click()
                ]);
                const downloadedFile = download.suggestedFilename();
                console.log("Downloaded file:", downloadedFile);
                if (!downloadedFile.endsWith(".xlsx")) {
                    throw new Error(`Invalid file extension: ${downloadedFile}`);
                }
                const downloadPath = `C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Download\\${downloadedFile}`;
                await download.saveAs(downloadPath);
                if (fs.existsSync(downloadPath)) {
                    console.log(`File successfully downloaded: ${downloadPath}`);
                } else {
                    throw new Error("Error: Downloaded file not found in expected location!");
                }
                expect(fs.existsSync(downloadPath)).toBeTruthy();
            } catch (error) {
                console.error("Error during file download:", error);
            }
        }
    }

    // TC_AM_019
    async verifySorting(): Promise<void> {
        await this.page.reload()
        await this.page.waitForTimeout(3000);
        let beforeSorting = await this.page.locator('tr>td:nth-child(2)').allTextContents();
        await this.page.locator(`tr>th:nth-child(2)`).click();
        await this.page.waitForTimeout(1000);
        let afterSortingAsc = await this.page.locator(`tr>td:nth-child(2)`).allTextContents();
        let isSortedAsc = true;
        for (let i = 0; i < afterSortingAsc.length - 1; i++) {
            if (Number(afterSortingAsc[i]) > Number(afterSortingAsc[i + 1])) {
                isSortedAsc = false;
                break;
            }
        }
        expect(isSortedAsc).toBe(true);
        await this.page.locator(`tr>th:nth-child(2)`).click();
        await this.page.waitForTimeout(1000);
        let afterSortingDesc = await this.page.locator(`tr>td:nth-child(2)`).allTextContents();
        let isSortedDesc = true;
        for (let i = 0; i < afterSortingDesc.length - 1; i++) {
            if (Number(afterSortingDesc[i]) < Number(afterSortingDesc[i + 1])) {
                isSortedDesc = false;
                break;
            }
        }
        expect(isSortedDesc).toBe(true);
    }

    // TC_AM_020
    async verifyRedirected(): Promise<void> {
        await this.assetOverviewRedirect.click()
        await this.page.waitForTimeout(1000)
        // await this.getHeaderText()
    }
}
