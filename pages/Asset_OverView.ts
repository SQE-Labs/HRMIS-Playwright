import { Page, Locator, expect } from "@playwright/test";
import { AssetManagementTab } from "./AssetManagementTab";
import { Loader } from "../Components/Loaders";
import { BasePage } from "./BasePage";
import * as xlsx from 'xlsx'
import fs from "fs";
import { assert } from "console";
import { Alert } from '../Components/Alert'


export class OverView extends AssetManagementTab {
    // TC_AM_003
    private OverViewAsset: Locator
    private OverviewHeader: Locator
    private OverViewDropdown: Locator
    private OverViewCards: Locator
    private Loader: Loader
    // TC_AM_004
    private TotalAsset: Locator
    public Cardscount: any
    // TC_AM_005
    private AssetType_Dropdown: Locator
    // TC_AM_006
    private Filter: Locator
    public randomOption: any
    // TC_AM_007
    private Export: Locator
    private Alert: Alert
    public totalAssetsAfterFilter: any
    private EmptyRecord: Locator
    // TC_AM_008
    private Assigned: Locator
    private Available: Locator
    private Total: Locator
    // TC_AM_009   
    private Card: Locator
    private CardHeader: Locator
    //TC_AM_010 
    private S_No: Locator
    public countInnerAsset: any
    // TC_AM_011
    private SuperOwn_Dropdown: Locator
    // TC_AM_012
    private Owner_Dropdown: Locator
    // TC_AM_013
    private Availability_Dropdown: Locator
    // Tc_AM_017
    public SuperOwnrandomOption: any
    public OwnerrandomOption: any
    public AvailabilityrandomOption: any

    constructor(page: Page) {
        super(page)
        this.Cardscount = 0
        this.countInnerAsset = 0
        this.totalAssetsAfterFilter = 0
        this.randomOption = ''
        // this.SuperOwnrandomOption = ''
        // this.OwnerrandomOption = ''
        // this.AvailabilityrandomOption = ''

        this.OverViewAsset = page.locator("//a[text()='Asset Overview']")
        this.OverviewHeader = page.locator("//h1[text()='Asset Overview']")
        this.OverViewDropdown = page.locator("#filterAssetType option:nth-child(1)")
        this.OverViewCards = page.locator(".col-md-12>div>div")
        this.TotalAsset = page.locator(".total")
        this.AssetType_Dropdown = page.locator('[id="filterAssetType"]')
        this.Filter = page.locator("button[type='button']")
        this.Export = page.locator("//a[@class='export theme-button']")
        this.EmptyRecord = page.locator(".fs-4.text-secondary.text-center")
        this.Assigned = page.locator(".badge.badge-info ")
        this.Available = page.locator(".badge.badge-success.mx-2")
        this.Total = page.locator(".badge.badge-danger ")
        this.Card = page.locator(".card-body.text-center")
        this.CardHeader = page.locator(".d-flex>span>h1")
        this.S_No = page.locator("tbody>tr")
        this.SuperOwn_Dropdown = page.locator("[id='superOwnerFilter']")
        this.Owner_Dropdown = page.locator("#ownerFilter")
        this.Availability_Dropdown = page.locator("#availabilityFilter")
        this.Loader = new Loader(page)
        this.Alert = new Alert(page)
    }


    async verifyAsset() {
        try {
            await this.expandAssetManagementTab()
            await this.OverViewAsset.click()
            console.log("Redirected towards Asset OverView page")
        } catch (error) {
            console.log('Unable to rediret towards Asset OverView page', error)
        }
    }

    async verifyHeader() {
        const headerText = await this.OverviewHeader.textContent();  // ✅ Get actual text content
        if (headerText?.trim() === "Asset Overview") {
            console.log("Redirected towards :-", headerText);
        } else {
            console.warn("Unexpected header text found:", headerText);
        }
        return headerText;
    }

    async verifyDefaultDropdown() {
        await expect(this.OverViewDropdown).toHaveText("All")
    }

    async verifyViewCards() {
        await expect(this.Loader.getThreeDotClass()).not.toBeAttached() // waiting for three dots appear while clicking on Assest Overview
        const cards = await this.OverViewCards.allTextContents()
        console.log(cards)
        this.Cardscount = await this.OverViewCards.count()
        console.log("Total Cards :- ", this.Cardscount)
        return this.Cardscount   // return total number of count 

        let isMatched = true
        if (cards.length !== this.Cardscount) {
            console.log(`Mismatch in number of cards: Expected ${this.Cardscount}, but got ${cards.length}`);
            isMatched = false;
        }
        if (isMatched) {
            console.log("All cards matched Successfully")
        } else {
            console.log("Some cards title does not matched")
        }
    }

    // TC_AM_004
    async verifyTotalAsset() {
        const totalAssetTexts = await this.TotalAsset.allTextContents() // Get by text 

        // we only want number so i use parseInt to get number only
        const totalAssetCount = totalAssetTexts.length > 0 ? parseInt(totalAssetTexts[0].replace(/\D/g, ''), 10) : 0;

        console.log("TotalAsset :  ", totalAssetCount)
        let isAssetCountMatch = true
        if (totalAssetCount === 0) {
            console.warn("No assets found after filtering. This is expected behavior if no matching assets exist.");
        } else if (totalAssetCount === this.Cardscount) {
            console.log("Count of (all cards and total assets) Match successfully");
            isAssetCountMatch = true; // Set to true when counts match
        } else {
            console.error(`Mismatch: 'number of cards' is not equal to 'totalAssets': Expected ${this.Cardscount}, but got ${totalAssetCount}`);
        }

        return totalAssetCount
    }

    // Random Selection from Dropdown
    // TC_AM_005
    async Random_Asse_type_Selection() {
        console.log("Click on Asset Type Dropdown");

        // Wait for the dropdown to be visible and enabled
        await this.AssetType_Dropdown.waitFor({ state: "visible", timeout: 5000 });

        // Get all available dropdown options
        const options = await this.AssetType_Dropdown.locator("option").allInnerTexts();
        if (options.length === 0) {
            console.error("No options available in the dropdown.");
            return null;
        }

        // Filter out empty options (if any)
        const validOptions = options.filter(option => option.trim() !== "");

        if (validOptions.length === 0) {
            console.error("No valid options found in the dropdown.");
            return null;
        }

        // Randomly select an option
        const randomOption = validOptions[Math.floor(Math.random() * validOptions.length)].trim();
        console.log(`Randomly selected option: ${randomOption}`);

        // Select the option with error handling
        try {
            await this.AssetType_Dropdown.selectOption({ label: randomOption });
            console.log(`Successfully selected: ${randomOption}`);
        } catch (error) {
            console.error(`Failed to select option: ${randomOption}`, error);
            return null;
        }

        // Verify the selected option
        const selectedValue = (await this.AssetType_Dropdown.inputValue()).trim();
        console.log(`Selected value: ${selectedValue}`);

        return randomOption;
    }

    // TC_AM_006
    async VerifyFilter() {
        console.log("Verifying Filter button functionality...");

        // Reload the page to reset the state
        await this.page.reload();

        // Ensure the default selection is "All"
        await expect(this.OverViewDropdown).toHaveText("All");

        // Click filter with default selection
        await this.Filter.click();
        await expect(this.Loader.getThreeDotClass()).not.toBeAttached();

        this.Cardscount = await this.OverViewCards.count();
        console.log("Data is filtered when no option is selected");

        let totalAssetsAfterFilter = await this.verifyTotalAsset();
        console.log(`Total assets after filtering: ${totalAssetsAfterFilter}`);

        // Select a random asset type
        this.randomOption = await this.Random_Asse_type_Selection();
        if (!this.randomOption) {
            console.warn("No valid option selected. Skipping filter verification.");
            return;
        }

        console.log(`Randomly selected asset type: ${this.randomOption}`);

        // Click filter button after selecting an asset type
        await this.Filter.click();
        await expect(this.Loader.getThreeDotClass()).not.toBeAttached();

        await this.page.waitForTimeout(2000);
        this.Cardscount = await this.OverViewCards.count();
        totalAssetsAfterFilter = await this.verifyTotalAsset();
        console.log(`Total assets after filtering: ${totalAssetsAfterFilter}`);

        console.log("The data is filtered based on a randomly selected option.");
        return totalAssetsAfterFilter
    }
    // TC_AM_007
    async verifyExport() {
        console.log("Verifying Export functionality...");

        // Select a random option from the dropdown
        this.randomOption = await this.Random_Asse_type_Selection();
        if (!this.randomOption) {
            console.warn("No valid option selected. Skipping export verification.");
            return;
        }

        console.log(`Selected asset type: ${this.randomOption}`);

        // Click the Filter button
        await this.Filter.click();
        await expect(this.Loader.getThreeDotClass()).not.toBeAttached();
        await this.page.waitForTimeout(1500); // Reduced wait time for efficiency

        this.Cardscount = await this.OverViewCards.count();
        const totalAssetsAfterFilter = await this.verifyTotalAsset();
        console.log(`Total assets after filtering: ${totalAssetsAfterFilter}`);

        // Check if "No Record Available!" message is present
        const noRecordText = "No Record Available!";
        const noRecordElement = await this.page.$(".Toastify__toast-body>div:nth-child(2)"); // Ensure correct selector

        let emptyRecordText = "";
        if (noRecordElement) {
            emptyRecordText = (await noRecordElement.textContent())?.trim() || "";
        }


        // CASE 1: No records found
        if (emptyRecordText === noRecordText || totalAssetsAfterFilter === 0) {
            console.log("Case 1: No records available after filtering.");

            // Click Export button
            await this.Export.click();
            await expect(this.Alert.getAlertElement()).toBeVisible();

            const alertMessage = await this.Alert.getAlertText();
            console.log("Alert message appeared as expected:", alertMessage);

            // Ensure the correct alert message appears
            expect(alertMessage).toContain(noRecordText);

            // No file should be downloaded
            console.log(" Export should not trigger a file download.");
        }
        // CASE 2: Records found
        else {
            console.log(" Case 2: One or more assets found. Proceeding with export...");

            try {
                // Wait for the file download event before clicking Export
                const [download] = await Promise.all([
                    this.page.waitForEvent("download", { timeout: 10000 }), // Reduced timeout for efficiency
                    this.Export.click()
                ]);

                const downloadedFile = download.suggestedFilename();
                console.log("Downloaded file:", downloadedFile);

                // Ensure the file has a .xlsx extension
                if (!downloadedFile.endsWith(".xlsx")) {
                    throw new Error(`Invalid file extension: ${downloadedFile}`);
                }

                // Define file save path
                const downloadPath = `C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Download\\${downloadedFile}`;
                await download.saveAs(downloadPath);

                // Verify the file exists
                if (fs.existsSync(downloadPath)) {
                    console.log(`File successfully downloaded: ${downloadPath}`);
                } else {
                    throw new Error("Error: Downloaded file not found in expected location!");
                }

                // Assertion to confirm successful XLSX file download
                expect(fs.existsSync(downloadPath)).toBeTruthy();
            } catch (error) {
                console.error("Error during file download:", error);
            }
        }
    }
    // TC_AM_008
    async Details_appear_on_card() {
        let Details_display = ['Assigned', 'Available', 'Total']
        await this.page.reload();
        await this.AssetType_Dropdown.waitFor({ state: 'visible', timeout: 5000 });
        await this.page.waitForTimeout(2000);
        await this.AssetType_Dropdown.selectOption({ value: "1" });
        const selectedValue = await this.AssetType_Dropdown.inputValue();
        console.log(`Selected asset type: ${selectedValue}`);
        await this.Filter.click();
        const Details = [
            (await this.Assigned.innerText()).split(":")[0].trim(),
            (await this.Available.innerText()).split(":")[0].trim(),
            (await this.Total.innerText()).split(":")[0].trim()
        ]
        console.log(Details)

        expect(Details).toEqual(Details_display)
    }
    // TC_AM_009
    async Card_openup() {
        await this.AssetType_Dropdown.waitFor({ state: 'visible', timeout: 5000 });
        await this.page.waitForTimeout(2000);
        await this.AssetType_Dropdown.selectOption({ value: "2" });
        await this.Filter.click()
        await this.Card.click()
        await expect(this.Loader.getSpinLoader()).not.toBeAttached();
        let header = await this.CardHeader.textContent()
        if (header?.trim() === 'Keyboard') {
            console.log("Redirected towards :-", header)
        } else {
            console.log("Unexpected header text found")
        }
    }
    // TC_AM_010
    async InnercountInnerAsset() {
        const totalcountof_S_no = await this.S_No.allTextContents() // Get by text 
        this.countInnerAsset = await this.S_No.count()
        console.log(this.countInnerAsset)
        // we only want number so i use parseInt to get number only
        const totalAssetInsidecard = await this.TotalAsset.allTextContents()
        const validnumbers = totalAssetInsidecard.length > 0 ? parseInt(totalAssetInsidecard[0].replace(/\D/g, ''), 10) : 0;
        const validNumbers = totalAssetInsidecard
            .map(text => parseInt(text.replace(/\D/g, ''), 10)) // Extract numbers
            .filter(num => !isNaN(num)); // Remove NaN values

        const totalAssetCountInsideCard = validNumbers.length > 0 ? validNumbers[0] : 0;

        console.log("TotalAsset :  ", totalAssetCountInsideCard)
        let isAssetCountMatchinsidecard = true
        if (totalAssetCountInsideCard === 0) {
            console.warn("No assets found after filtering. This is expected behavior if no matching assets exist.");
        } else if (totalAssetCountInsideCard === this.countInnerAsset) {
            console.log("Count of (all cards and total assets) Match successfully");
            isAssetCountMatchinsidecard = true; // Set to true when counts match
        } else {
            console.error(`Mismatch: 'number of cards' is not equal to 'totalAssets': Expected ${this.countInnerAsset}, but got ${totalAssetCountInsideCard}`);
        }
    }
    // TC_AM_011
    async SuperOwnDropdown() {
        console.log("Click on Super Own Dropdown");

        // Wait for the dropdown to be visible and enabled
        await this.SuperOwn_Dropdown.waitFor({ state: "visible", timeout: 5000 });

        // Get all available dropdown options
        let SuperOwnoptions = await this.SuperOwn_Dropdown.locator("option").allInnerTexts();
        if (SuperOwnoptions.length === 0) {
            console.error("No options available in the dropdown.");
            return null;
        }

        // Filter out empty options (if any)
        const SuperOwnvalidOptions = SuperOwnoptions.filter(option => option.trim() !== "");

        if (SuperOwnoptions.length === 0) {
            console.error("No valid options found in the dropdown.");
            return null;
        }

        // Randomly select an option
        const SuperOwnrandomOption = SuperOwnvalidOptions[Math.floor(Math.random() * SuperOwnvalidOptions.length)].trim();
        console.log(`Randomly selected option: ${SuperOwnrandomOption}`);

        // Select the option with error handling
        try {
            await this.SuperOwn_Dropdown.selectOption({ label: SuperOwnrandomOption });
            console.log(`Successfully selected: ${SuperOwnrandomOption}`);

        } catch (error) {
            console.error(`Failed to select option: ${SuperOwnrandomOption}`, error);
            return null;
        }
        // Verify the selected option
        const superOwnselectedValue = (await this.SuperOwn_Dropdown.inputValue()).trim();
        console.log(`Selected value: ${superOwnselectedValue}`);
        return superOwnselectedValue
    }
    // TC_AM_012
    async Ownerdropdown() {
        console.log("Click on Owner Dropdown");

        // Wait for the dropdown to be visible and enabled
        await this.Owner_Dropdown.waitFor({ state: "visible", timeout: 5000 });

        // Get all available dropdown options
        const Owneroptions = await this.Owner_Dropdown.locator("option").allInnerTexts();
        if (Owneroptions.length === 0) {
            console.error("No options available in the dropdown.");
            return null;
        }

        // Filter out empty options (if any)
        const OwnervalidOptions = Owneroptions.filter(option => option.trim() !== "");

        if (Owneroptions.length === 0) {
            console.error("No valid options found in the dropdown.");
            return null;
        }

        // Randomly select an option
        const OwnerrandomOption = OwnervalidOptions[Math.floor(Math.random() * OwnervalidOptions.length)].trim();
        console.log(`Randomly selected option: ${OwnerrandomOption}`);

        // Select the option with error handling
        try {
            await this.Owner_Dropdown.selectOption({ label: OwnerrandomOption });
            console.log(`Successfully selected: ${OwnerrandomOption}`);
        } catch (error) {
            console.error(`Failed to select option: ${OwnerrandomOption}`, error);
            return null;
        }

        // Verify the selected option
        const OwwnerselectedValue = (await this.Owner_Dropdown.inputValue()).trim();
        console.log(`Selected value: ${OwwnerselectedValue}`);

        return OwwnerselectedValue

    }
    // TC_AM_013
    async Availabilitydropdown() {
        console.log("Click on Availability Dropdown");

        // Wait for the dropdown to be visible and enabled
        await this.Availability_Dropdown.waitFor({ state: "visible", timeout: 5000 });

        // Get all available dropdown options
        const Availabilityoptions = await this.Availability_Dropdown.locator("option").allInnerTexts();
        if (Availabilityoptions.length === 0) {
            console.error("No options available in the dropdown.");
            return null;
        }

        // Filter out empty options (if any)
        const AvailabilityvalidOptions = Availabilityoptions.filter(option => option.trim() !== "");

        if (Availabilityoptions.length === 0) {
            console.error("No valid options found in the dropdown.");
            return null;
        }

        // Randomly select an option
        const AvailabilityrandomOption = AvailabilityvalidOptions[Math.floor(Math.random() * AvailabilityvalidOptions.length)].trim();
        console.log(`Randomly selected option: ${AvailabilityrandomOption}`);

        // Select the option with error handling
        try {
            await this.Availability_Dropdown.selectOption({ label: AvailabilityrandomOption });
            console.log(`Successfully selected: ${AvailabilityrandomOption}`);
        } catch (error) {
            console.error(`Failed to select option: ${AvailabilityrandomOption}`, error);
            return null;
        }

        // Verify the selected option
        const AvailabilityselectedValue = (await this.Availability_Dropdown.inputValue()).trim();
        console.log(`Selected value: ${AvailabilityselectedValue}`);
        return AvailabilityselectedValue


    }
    // I merge 3 test script in one TC_AM_014 || TC_AM_015 || TC_AM_016
    async CheckOptionVisible() {
        console.log("Check All option is selected and In Owner dropdown All options are visible")
        let SuperOwnoptions = await this.SuperOwn_Dropdown.locator("option").allTextContents();
        let superOwncount = SuperOwnoptions.length
        console.log(superOwncount)
        for (let x = 0; x < superOwncount; x++) {
            console.log(await this.SuperOwn_Dropdown.selectOption({ index: x }))
            await this.page.waitForTimeout(1000);
            let Ownerdropdown_Options = await this.Owner_Dropdown.allTextContents()
            console.log("Option in OwnerDropdown", Ownerdropdown_Options)
            let OwnerOption = await this.Owner_Dropdown.count()
            let VisibleOwnerOption: string[] = []
            for (let i = 0; i < OwnerOption; ++i) {
                let presentOwneroptions = await this.Owner_Dropdown.nth(i).innerText()
                VisibleOwnerOption.push(presentOwneroptions.replace(/\n/g, "").trim())
            }
            console.log(VisibleOwnerOption)

            expect(Ownerdropdown_Options).toEqual(VisibleOwnerOption);
            
        }
    }
    // TC_AM_017
    async CardFilter() {
        console.log("Collecting selected dropdown values...");
        let superOwnValue = await this.SuperOwnDropdown();
        let ownerValue = await this.Ownerdropdown();
        let availabilityValue = await this.Availabilitydropdown();

        // Store the selected values in an array or object
        let cardsData = {
            superOwnValue,
            ownerValue,
            availabilityValue
        };
        console.log("Selected Dropdown Values:", cardsData);
        await this.Filter.click()
        await this.Export.click()
        await expect(this.Loader.getThreeDotClass()).not.toBeAttached();
        await this.page.waitForTimeout(1500);

        
        
    }
}

