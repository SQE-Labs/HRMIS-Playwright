import { Page, Locator, expect } from "@playwright/test";
import { AssetManagementTab } from "./Asset_Management_Tab";
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
    // public alert: Alert;
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
    // public superOwnerRandomOption: string;
    // public ownerRandomOption: string;
    // public availabilityRandomOption: string;
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
        await this.waitforLoaderToDisappear()
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

    async getselectedOptionName() {
        return await this.page.locator("div>h5").textContent()
    }

    async clickFilterButton(): Promise<void> {
        await this.filterButton.click();
        await this.waitforLoaderToDisappear();


    }
    async clickExportButton(): Promise<void> {
        await this.exportButton.click();
        await this.waitforLoaderToDisappear();

    }


    async selectAssetTypeDropdown(ddValue: string) {
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
    async openCard(ddValue: string): Promise<void> {
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


    async selectSuperOwner(SuperOwner: string): Promise<string> {
        await this.superOwnerDropdown.waitFor({ state: "visible", timeout: 2000 });

        await this.superOwnerDropdown.selectOption({ label: SuperOwner });
        console.debug(`Successfully selected: ${SuperOwner}`);
        const selectedValue = await this.superOwnerDropdown.evaluate((select: HTMLSelectElement) => select.value);
        console.debug(`Selected value (evaluate): ${selectedValue}`);
        expect(selectedValue, "Selected dropdown value should not be empty").not.toBe("");
        expect(selectedValue.toLowerCase()).toBe(SuperOwner.toLowerCase());
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

    async selectOwner(Owner: string): Promise<string> {
        await this.ownerDropdown.waitFor({ state: "visible", timeout: 2000 });
        await this.ownerDropdown.selectOption({ label: Owner });
        console.debug(`Successfully selected: ${Owner}`);
        const selectedValue = await this.ownerDropdown.evaluate((select: HTMLSelectElement) => select.value);
        console.debug(`Selected value: ${selectedValue}`);
        expect(selectedValue, "Selected Owner value should not be empty").not.toBe("");
        expect(selectedValue.toLowerCase()).toBe(Owner.toLowerCase());
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
        expect.soft(selectedValue.toLowerCase()).toBe(randomOption.toLowerCase());
        return selectedValue;
    }

    async selectAvailability(Option: string): Promise<string> {
        await this.availabilityDropdown.waitFor({ state: "visible", timeout: 2000 })

        console.debug(`Randomly selected option: ${Option}`);
        await this.availabilityDropdown.selectOption({ label: Option });
        console.debug(`Successfully selected: ${Option}`);
        const selectedValue = await this.availabilityDropdown.evaluate((select: HTMLSelectElement) => select.value);
        console.debug(`Selected value: ${selectedValue}`)
        expect(selectedValue, "Selected availability value should not be empty").not.toBe("");
        expect.soft(selectedValue.toLowerCase()).toBe(Option.toLowerCase());
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

    async selectOwnerDropDown(owner: string) {
        await this.ownerDropdown.selectOption(owner)
    }
    async selectSuperOwnerDropDown(superOwner: string) {
        await this.superOwnerDropdown.selectOption(superOwner)
    }
    async selectAvailabilityDropDown(availability: string) {
        await this.availabilityDropdown.selectOption(availability)
    }


    async filterAssetsByDropdownSelections(): Promise<number> {

        console.debug("Collecting selected dropdown values...");
        const superOwnerValue = await this.selectSuperOwner("CAELIUS_OWNED");
        expect(superOwnerValue, "Super Owner selection should not be empty").not.toBe("");
        const ownerValue = await this.selectOwner("Consultant");
        expect(ownerValue, "Owner selection should not be empty").not.toBe("");
        const availabilityValue = await this.selectAvailability("Assigned");
        expect(availabilityValue, "Availability selection should not be empty").not.toBe("");
        const cardsData = { superOwnerValue, ownerValue, availabilityValue };
        await this.clickFilterButton()
        await this.page.waitForTimeout(3000)
        console.debug("Selected Dropdown Values:", cardsData);
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
        const superOwnerValue = await this.selectSuperOwner("CAELIUS_OWNED");
        expect(superOwnerValue, "Super Owner selection should not be empty").not.toBe("");
        const ownerValue = await this.selectOwner("Consultant");
        expect(ownerValue, "Owner selection should not be empty").not.toBe("");
        const availabilityValue = await this.selectAvailability("Assigned");
        expect(availabilityValue, "Availability selection should not be empty").not.toBe("");
        await this.clickFilterButton()
        const totalAssetsAfterFilter = await this.getTotalAssetCount();
        console.debug(`Filtered asset count: ${totalAssetsAfterFilter}`);
        return totalAssetsAfterFilter

    }
    async clickAssetTypeRequestOnRowHeader(columnIndex: number) {
        const headerIcon = this.page.locator(`tr>th:nth-child(${columnIndex})`);
        await headerIcon.waitFor({ state: 'visible' });
        await headerIcon.click();
        // Add a short wait to allow sorting animation/data update
        await this.page.waitForTimeout(2000);
    }

    async clickOnAprooveAssetRowHeader(columnIndex: number) {
        const headerIcon = this.page.locator(`tr>th:nth-child(${columnIndex})`).last();
        await headerIcon.waitFor({ state: 'visible' });
        await headerIcon.click();

        // Add a short wait to allow sorting animation/data update
        await this.page.waitForTimeout(2000);
    }

    async getRowdata(columnIndex: number): Promise<string[]> {
        // Wait for at least one cell in the desired column to appear
        await this.page.waitForSelector(`tr>th:nth-child(${columnIndex})`);

        const rows = await this.page.locator('tbody > tr');
        const columnData: string[] = [];

        const rowCount = await rows.count();

        if (rowCount === 0) {
            console.warn("No data rows found in <tbody>.");
            return [];
        }

        for (let i = 0; i < rowCount; i++) {
            const cell = rows.nth(i).locator(`td:nth-child(${columnIndex})`);
            await cell.waitFor({ state: 'visible' });
            const text = await cell.textContent();
            columnData.push((text ?? '').trim());
        }

        console.log(`Column ${columnIndex} data:`, columnData);
        return columnData;
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