import { Page, Locator, expect } from '@playwright/test';
import { Loader } from '../components/loaders'
import { BasePage } from './Basepage';

export class RandomNumber extends BasePage {
    private AssetType_Dropdown: Locator
    // private page : Page

    // Locators
    constructor(page: Page) {
        super(page)
        this.AssetType_Dropdown = page.locator('[id="filterAssetType"]')
    }
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
        let randomOption = validOptions[Math.floor(Math.random() * validOptions.length)].trim();
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

    getRandomnumber(){
        return this.Random_Asse_type_Selection
    }
}