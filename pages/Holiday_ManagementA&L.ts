import { BasePage } from '../pages/Basepage';
import { expect, Locator, Page } from '@playwright/test';
import * as constants from "../utils/constants";

export class holiday_Management extends BasePage {
    private heading: Locator;
    private searchField: Locator;
    private statusDropdown: Locator;
    private yearDropdown: Locator;
    private addHolidayButton: Locator;
    private holidayTable: Locator;
    private editLink: Locator;
    private holidayField: Locator;
    private submitBtn: Locator;


    constructor(page: Page) {
        super(page);

        this.heading = page.getByRole('heading', { name: 'Holiday Management' });
        this.searchField = page.getByPlaceholder('Search By Holiday');
        this.statusDropdown = page.locator('#status')
        this.yearDropdown = page.locator('#year')
        this.addHolidayButton = page.getByText('+ Add Holiday')
        this.holidayTable = page.locator('.table-responsive')
        this.editLink = page.locator("//a[@class='fw-bolder'][text()='Edit']").first();
        this.holidayField = page.getByPlaceholder('Enter Holiday');
        this.submitBtn = page.getByRole('button', { name: 'Submit' });


    }

    async verifyUIelements() {
        // Verify heading
        await expect(this.heading).toBeVisible();

        // Verify Search field
        await expect(this.searchField).toBeVisible();

        // Verify Status dropdown (default Pending)
        await expect(this.statusDropdown).toBeVisible();
        await expect(this.statusDropdown).toHaveValue('Pending');

        // Verify Year dropdown (default = current year)
        const currentYear = new Date().getFullYear().toString();
        await expect(this.yearDropdown).toBeVisible();
        await expect(this.yearDropdown).toHaveValue(currentYear);

        // Verify +Add Holiday button
        await expect(this.addHolidayButton).toBeVisible();

        // Verify Holiday table
        await expect(this.holidayTable).toBeVisible();


    }

    async updateHoliday(newHolidayName: string) {
        // Step 1: Click on Edit link
        await this.editLink.click();

        // Step 2: Update data in any field (Holiday Name in this case)
        await this.holidayField.fill(newHolidayName);

        // Step 3: Click Submit
        await this.submitBtn.click();

        // step 4: Verify the success message 
        const message = await this.toastMessage();
        console.log("Success  message: " + message);
        expect(message).toContain(constants.APPROVE_LEAVE_SUCCESSMESSAGE);



    }
}

