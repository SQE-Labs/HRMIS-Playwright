import { Page, Locator } from '@playwright/test';
import { BasePage } from './Basepage';

export class RandomNumber extends BasePage {
    private assetTypeDropdown: Locator;

    constructor(page: Page) {
        super(page);
        this.assetTypeDropdown = page.locator('[id="filterAssetType"]');
    }

    async selectRandomAssetType(): Promise<string | null> {
        console.log("Click on Asset Type Dropdown");

        await this.assetTypeDropdown.waitFor({ state: "visible", timeout: 5000 });

        const options = await this.assetTypeDropdown.locator("option").allInnerTexts();
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
            await this.assetTypeDropdown.selectOption({ label: randomOption });
            console.log(`Successfully selected: ${randomOption}`);
        } catch (error) {
            console.error(`Failed to select option: ${randomOption}`, error);
            return null;
        }

        const selectedValue = (await this.assetTypeDropdown.inputValue()).trim();
        console.log(`Selected value: ${selectedValue}`);

        return randomOption;
    }

    getRandomNumber(): Promise<string | null> {
        return this.selectRandomAssetType();
    }
}
