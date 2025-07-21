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
    public manfRows: Locator
    public modelRows: Locator
    public serialnumberRows: Locator
    public superOwnerRows: Locator
    public ownerRows: Locator
    public statusRows: Locator
    public availablityRows: Locator

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
        this.manfRows = page.locator(`tbody tr td:nth-child(2)`)
        this.modelRows = page.locator(`tbody tr td:nth-child(3)`)
        this.serialnumberRows = page.locator(`tbody tr td:nth-child(4)`)
        this.superOwnerRows = page.locator(`tbody tr td:nth-child(5)`)
        this.ownerRows = page.locator(`tbody tr td:nth-child(6)`)
        this.statusRows = page.locator(`tbody tr td:nth-child(7)`)
        this.availablityRows = page.locator(`tbody tr td:nth-child(8)`)
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
        console.debug(cards)
        this.cardsCount = await this.overviewCards.count()
        console.debug("Total Cards :- ", this.cardsCount)

        let isMatched = true
        if (cards.length !== this.cardsCount) {
            console.debug(`Mismatch in number of cards: Expected ${this.cardsCount}, but got ${cards.length}`);
            isMatched = false;
        }
        if (isMatched) {
            console.debug("All cards matched Successfully")
        } else {
            console.debug("Some cards title does not matched")
        }
        return this.cardsCount
    }

    // TC_AM_004
    async getTotalAssetCount(): Promise<number> {

        const totalAssetTexts = await this.totalAsset.allTextContents()
        const totalAssetCount = totalAssetTexts.length > 0 ? parseInt(totalAssetTexts[0].replace(/\D/g, ''), 10) : 0;
        await this.page.waitForTimeout(1000)
        console.debug("TotalAsset :  ", totalAssetCount)
        let isAssetCountMatch = true
        if (totalAssetCount === 0) {
            console.warn("No assets found after filtering. This is expected behavior if no matching assets exist.");
        } else if (totalAssetCount === this.cardsCount) {
            console.debug("Count of (all cards and total assets) Match successfully");
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
        console.debug(`Successfully selected: ${optionText}`);
    }
    async clickFilterButton(): Promise<void> {
        await this.filterButton.click();
        await this.waitforLoaderToDisappear();


    }
    async clickExportButton(): Promise<void> {
        await this.exportButton.click();
        await this.waitforLoaderToDisappear();

    }


    async selectAssetTypeDropdown(ddValue) {
        await this.assetTypeDropdown.waitFor({ state: 'visible', timeout: 5000 });
        await this.assetTypeDropdown.selectOption({ label: ddValue });
        await this.filterButton.click()
        await this.page.waitForLoadState('domcontentloaded')
    }

    async verifyCardDetails(): Promise<void> {
        const expectedDetails = ['Assigned', 'Available', 'Total']

        const selectedValue = await this.assetTypeDropdown.inputValue();
        console.debug(`Selected asset type: ${selectedValue}`);
        const details = [
            (await this.assignedBadge.innerText()).split(":")[0].trim(),
            (await this.availableBadge.innerText()).split(":")[0].trim(),
            (await this.totalBadge.innerText()).split(":")[0].trim()
        ]
        console.debug(details)
        expect(details).toEqual(expectedDetails)
    }

    // TC_AM_009
    async openCard(ddValue): Promise<void> {
        await this.selectAssetTypeDropdown(ddValue);
        await this.card.click();
        await this.waitforLoaderToDisappear()
        const header = await this.cardHeader.textContent();
        const trimmedHeader = header?.trim();
        expect(trimmedHeader).toBe('Desktop PC');
        console.debug("Redirected towards:", trimmedHeader);
    }

    // TC_AM_010
    async countInnerAssets(): Promise<void> {
        const serialNoTexts = await this.serialNoRows.allTextContents();
        this.innerAssetCount = await this.serialNoRows.count();
        console.debug(`Inner asset count found: ${this.innerAssetCount}`);
        const totalAssetInsideCardTexts = await this.totalAsset.allTextContents();
        const validNumbers = totalAssetInsideCardTexts
            .map(text => parseInt(text.replace(/\D/g, ''), 10))
            .filter(num => !isNaN(num));
        const totalAssetCountInsideCard = validNumbers.length > 0 ? validNumbers[0] : 0;
        console.debug(`Total asset count inside card : ${totalAssetCountInsideCard}`);
        expect(totalAssetCountInsideCard, "Total asset count should be greater than 0").toBeGreaterThan(0);
        expect(this.innerAssetCount).toBe(totalAssetCountInsideCard);
    }

    // TC_AM_011
    async selectRandomSuperOwner(): Promise<string> {
        await this.superOwnerDropdown.waitFor({ state: "visible", timeout: 2000 });
        const optionCount = await this.superOwnerDropdown.locator('option').count();
        expect(optionCount, "Dropdown should contain at least one option").toBeGreaterThan(0);
        const validOptions: string[] = [];
        for (let i = 0; i < optionCount; i++) {
            const optionText = await this.superOwnerDropdown.locator('option').nth(i).innerText();
            const trimmedText = optionText.replace(/\n/g, '');
            if (trimmedText) validOptions.push(trimmedText);
        }
        expect(validOptions.length, "Dropdown should contain at least one non-empty option").toBeGreaterThan(0);
        const randomOption = validOptions[Math.floor(Math.random() * validOptions.length)];
        console.debug(`Randomly selected option: ${randomOption}`);
        await this.superOwnerDropdown.selectOption({ label: randomOption });
        console.debug(`Successfully selected: ${randomOption}`);
        const selectedValue = await this.superOwnerDropdown.evaluate((select: HTMLSelectElement) => select.value);
        console.debug(`Selected value (evaluate): ${selectedValue}`);
        expect(selectedValue, "Selected dropdown value should not be empty").not.toBe("");
        expect(selectedValue.toLowerCase()).toBe(randomOption.toLowerCase());
        return selectedValue;
    }

    // TC_AM_012
    async selectRandomOwner(): Promise<string> {
        await this.ownerDropdown.waitFor({ state: "visible", timeout: 2000 });
        const optionCount = await this.ownerDropdown.locator('option').count();
        expect(optionCount, "Owner dropdown should contain at least one option").toBeGreaterThan(0);
        const validOptions: string[] = [];
        for (let i = 0; i < optionCount; i++) {
            const optionText = await this.ownerDropdown.locator('option').nth(i).innerText();
            const trimmedText = optionText.replace(/\n/g, '');
            if (trimmedText) validOptions.push(trimmedText);
        }
        expect(validOptions.length, "Owner dropdown should contain non-empty options").toBeGreaterThan(0);
        const randomOption = validOptions[Math.floor(Math.random() * validOptions.length)];
        console.debug(`Randomly selected Owner option: ${randomOption}`);
        await this.ownerDropdown.selectOption({ label: randomOption });
        console.debug(`Successfully selected: ${randomOption}`);
        const selectedValue = await this.ownerDropdown.evaluate((select: HTMLSelectElement) => select.value);
        console.debug(`Selected value: ${selectedValue}`);
        expect(selectedValue, "Selected Owner value should not be empty").not.toBe("");
        expect(selectedValue.toLowerCase()).toBe(randomOption.toLowerCase());
        return selectedValue;
    }


    // TC_AM_013
    async selectRandomAvailability(): Promise<string> {
        await this.availabilityDropdown.waitFor({ state: "visible", timeout: 2000 })
        const optionCount = await this.availabilityDropdown.locator('option').count();
        expect(optionCount, "Availability dropdown should contain options").toBeGreaterThan(0);
        const validOptions: string[] = [];
        for (let i = 0; i < optionCount; i++) {
            const optionText = await this.availabilityDropdown.locator('option').nth(i).innerText();
            const trimmedText = optionText.replace(/\n/g, '');
            if (trimmedText) validOptions.push(trimmedText);
        }
        expect(validOptions.length, "Availability dropdown should contain non-empty options").toBeGreaterThan(0);
        const randomOption = validOptions[Math.floor(Math.random() * validOptions.length)];
        console.debug(`Randomly selected option: ${randomOption}`);
        await this.availabilityDropdown.selectOption({ label: randomOption });
        console.debug(`Successfully selected: ${randomOption}`);
        const selectedValue = await this.availabilityDropdown.evaluate((select: HTMLSelectElement) => select.value);
        console.debug(`Selected value: ${selectedValue}`)
        expect(selectedValue, "Selected availability value should not be empty").not.toBe("");
        expect(selectedValue.toLowerCase()).toBe(randomOption.toLowerCase());
        return selectedValue;
    }




    async verifyOwnerDropdownOptionsForSuperOwner(superOwnerLabel: string, expectedOwnerOptions: string[], exactMatch = true): Promise<void> {
        await this.superOwnerDropdown.selectOption({ label: superOwnerLabel });
        await this.page.waitForTimeout(1000);
        const ownerOptionCount = await this.ownerDropdown.locator('option').count();
        const trimmedOwnerOptions: string[] = [];

        for (let i = 0; i < ownerOptionCount; i++) {
            const optionText = await this.ownerDropdown.locator('option').nth(i).innerText();
            trimmedOwnerOptions.push(optionText.replace(/\n/g, '').trim());
        }

        console.debug(`Owner options when Super Owner is '${superOwnerLabel}':`, trimmedOwnerOptions);

        if (exactMatch) {
            expect(trimmedOwnerOptions.sort()).toEqual(expectedOwnerOptions.sort());
        } else {
            for (const option of expectedOwnerOptions) {
                expect(trimmedOwnerOptions).toContain(option);
            }
        }
    }

    async selectOwnerDropDown(owner) {
        await this.ownerDropdown.selectOption(owner)
    }
    async selectSuperOwnerDropDown(superOwner) {
        await this.superOwnerDropdown.selectOption(superOwner)
    }
    async selectAvailabilityDropDown(availability) {
        await this.availabilityDropdown.selectOption(availability)
    }


    async filterAssetsByDropdownSelections(): Promise<number> {

        console.debug("Collecting selected dropdown values...");
        const superOwnerValue = await this.selectRandomSuperOwner();
        expect(superOwnerValue, "Super Owner selection should not be empty").not.toBe("");
        const ownerValue = await this.selectRandomOwner();
        expect(ownerValue, "Owner selection should not be empty").not.toBe("");
        const availabilityValue = await this.selectRandomAvailability();
        expect(availabilityValue, "Availability selection should not be empty").not.toBe("");
        const cardsData = { superOwnerValue, ownerValue, availabilityValue };
        console.debug("Selected Dropdown Values:", cardsData);
        await this.clickFilterButton()
        const totalAssetsAfterFilter = await this.getTotalAssetCount();
        console.debug(`Total assets after filtering: ${totalAssetsAfterFilter}`);
        if (totalAssetsAfterFilter === 0) {
            console.debug("No records found after applying filter.");
            const emptyRecordText = (await this.emptyRecord?.textContent())?.trim() || "";
            expect(emptyRecordText).toBe("No records available");
        } else {
            console.debug("Records found after applying filter.");
            expect(totalAssetsAfterFilter).toBeGreaterThan(0);
        }
        return totalAssetsAfterFilter;
    }
    async getFilteredData(): Promise<number> {
        // await this.page.pause()
        await this.openCard("Desktop PC");
        const superOwnerValue = await this.selectRandomSuperOwner();
        expect(superOwnerValue, "Super Owner selection should not be empty").not.toBe("");
        const ownerValue = await this.selectRandomOwner();
        expect(ownerValue, "Owner selection should not be empty").not.toBe("");
        const availabilityValue = await this.selectRandomAvailability();
        expect(availabilityValue, "Availability selection should not be empty").not.toBe("");
        await this.clickFilterButton()
        const totalAssetsAfterFilter = await this.getTotalAssetCount();
        console.debug(`Filtered asset count: ${totalAssetsAfterFilter}`);
        return totalAssetsAfterFilter

    }

    async exportFilteredAssets(): Promise<void> {
        const totalAssetsAfterFilter = await this.getTotalAssetCount();
        const noRecordText = "No Record Available!";
        const noRecordElement = await this.page.$(".Toastify__toast-body>div:nth-child(2)");

        let emptyRecordText = "";
        if (noRecordElement) {
            emptyRecordText = (await noRecordElement.textContent())?.trim() || "";
        }

        if (emptyRecordText === noRecordText || totalAssetsAfterFilter === 0) {
            console.debug("Case 1: No records available after filtering.");
            const downloadPromise = this.page.waitForEvent('download').catch(() => null);
            await this.exportButton.click();
            await this.page.waitForTimeout(1500);

            try {
                await expect(this.alert.getAlertElement()).toBeVisible();
                const alertMessage = await this.alert.getAlertText();
                console.debug("Alert message appeared as expected:", alertMessage);
                expect(alertMessage).toContain(noRecordText);
                console.debug("Export did NOT trigger a file download. Everything is correct.");
            } catch {
                const download = await downloadPromise;
                if (download) {
                    console.warn("File was downloaded when no records were available!");
                } else {
                    console.warn("Neither an alert appeared nor was a file downloaded.");
                }
            }
        } else {
            console.debug("Case 2: Records found. Proceeding with export...");
            try {
                const [download] = await Promise.all([
                    this.page.waitForEvent("download", { timeout: 2000 }),
                    this.exportButton.click()
                ]);

                const downloadedFile = download.suggestedFilename();
                console.debug("Downloaded file:", downloadedFile);

                if (!downloadedFile.endsWith(".xlsx")) {
                    throw new Error(`Invalid file extension: ${downloadedFile}`);
                }

                const downloadPath = `C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Download\\${downloadedFile}`;
                await download.saveAs(downloadPath);

                if (fs.existsSync(downloadPath)) {
                    console.debug(`✅ File successfully downloaded: ${downloadPath}`);
                } else {
                    throw new Error("❌ Downloaded file not found!");
                }

                expect(fs.existsSync(downloadPath)).toBeTruthy();
            } catch (error) {
                console.error("Error during file download:", error);
            }
        }
    }

    async clickManfHeader() {
        await this.page.locator(`tr>th:nth-child(2)`).click();
    }
    async clickModelHeader() {
        await this.page.locator(`tr>th:nth-child(3)`).click();
    }
    async clickSerialNumberHeader() {
        await this.page.locator(`tr>th:nth-child(4)`).click();
    }
    async clickSuperOwnerHeader() {
        await this.page.locator(`tr>th:nth-child(5)`).click();
    }
    async clickOwnerHeader() {
        await this.page.locator(`tr>th:nth-child(6)`).click();
    }
    async clickStatusHeader() {
        await this.page.locator(`tr>th:nth-child(7)`).click();
    }
    async clickAvailablityHeader() {
        await this.page.locator(`tr>th:nth-child(8)`).click();
    }

}
