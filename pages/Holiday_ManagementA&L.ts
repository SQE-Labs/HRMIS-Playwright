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
    private dateField: Locator;
    private deleteLink : Locator;
    private popupHeading : Locator;
    private yesBtn : Locator;
    private holidayList :Locator;
    private leaveCount :Locator;


    


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
        this.dateField = page.locator("//input[@type='date']");
        this.deleteLink = page.getByText('delete')
        this.popupHeading = page.getByText("Are you sure you want to delete this holiday?");
        this.yesBtn = page.getByText("Yes")
        this.leaveCount = page.locator("//div[@class='total']/span");

        // holiday list
        this.holidayList = page.locator("//table/tbody/tr/td");
    }

    async selectDate(date: string) {
    // date format: "dd-mm-yyyy"
    const [day, month, year] = date.split('-');
    const formattedDate = `${year}-${month}-${day}`; // yyyy-mm-dd

    // Fill the date field directly
    await this.dateField.fill(formattedDate);
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
    async addHoliday(holidayName:string, date: string){
        // Clicking on Add button
      //  await this.page.pause();
        await this.addHolidayButton.click()
        await this.holidayField.fill(holidayName)
        const [day, month, year] = date.split('-');
        const formattedDate = `${year}-${month}-${day}`;
        await this.dateField.fill(formattedDate)
        await this.submitBtn.click();
        const message = await this.toastMessage();
        console.log("Success  message: " + message);
        expect(message).toContain(constants.HOLIDAY_ADDED_TOAST);
    }

    async deletingHoliday(){
        // Clicking on delete link
        await this.deleteLink.first().click();
        await expect(this.popupHeading).toBeVisible();
        await this.yesBtn.click();

        const message = await this.toastMessage();
        console.log("Success  message: " + message);
        expect(message).toContain(constants.HOLIDAY_REMOVE_TOAST);
    }

    async verifyHolidayListPage(selectedYear: string){
    
      // Verify 'Year' dropdown is visible
     

         // Select provided year or previous year by default
        const year = selectedYear ?? (new Date().getFullYear() - 1).toString();
        await this.yearDropdown.selectOption(year);

          // Wait for at least one row to appear
        await this.holidayList.first().waitFor({ state: 'visible' });

     

    }
    async getTableRowdata(columnIndex: number): Promise<string[]> {
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


    async verifyOutOfOfficeElements(date:string ){
        this.selectDate(date)
        this.waitForDotsLoaderToDisappear();
            // Get count of holiday rows
        const listCount = await this.holidayList.count();

    // Get all inner texts from leaveCount locator
        const totalLeaveTexts = await this.leaveCount.allInnerTexts();
        const totalLeaveCount = totalLeaveTexts.length;

    // Compare counts
    await expect(listCount).toBe(totalLeaveCount);

    // Get all holiday text contents
    const result = await this.holidayList.allTextContents();
    console.log(result)
    }

}

