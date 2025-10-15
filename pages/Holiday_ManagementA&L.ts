import { BasePage } from '../pages/Basepage';
import { expect, Locator, Page } from '@playwright/test';
import * as constants from "../utils/constants";
import { AttendanceLeaveTab } from "../pages/Attendance&Leaves";

export class holiday_Management extends BasePage {
    
    public heading: Locator;
    public searchField: Locator;
    public statusDropdown: Locator;
    public yearDropdown: Locator;
    public addHolidayButton: Locator;
    public holidayTable: Locator;
    public editLink: Locator;
    public holidayField: Locator;
    public submitBtn: Locator;
    public dateField: Locator;
    public deleteLink: Locator;
    public popupHeading: Locator;
    public yesBtn: Locator;
    public holidayList: Locator;
    public leaveCount: Locator;
    public dateFilterO: Locator;
    public nextArrow: Locator;
    public dates: Locator;
    public rowCount: Locator;
    public updateStatusDropdown: Locator





    constructor(page: Page) {
        super(page);
        let attendanceLeaveTab: AttendanceLeaveTab
        attendanceLeaveTab = new AttendanceLeaveTab(page)

        this.heading = page.getByRole('heading', { name: 'Holiday Management' });
        this.searchField = page.getByPlaceholder('Search By Holiday');
        this.statusDropdown = page.locator('#status')
        this.yearDropdown = page.locator('#year')
        this.updateStatusDropdown = page.locator("(//select[@id='status' and @name='status'])[2]")
        this.addHolidayButton = page.getByText('+ Add Holiday')
        this.holidayTable = page.locator('.table-responsive')
        this.editLink = page.locator("//a[@class='fw-bolder'][text()='Edit']").first();
        this.holidayField = page.getByPlaceholder('Enter Holiday');
        this.submitBtn = page.getByRole('button', { name: 'Submit' });
        this.dateField = page.locator("//input[@type='date']");
        this.deleteLink = page.locator("(//a[text()='Delete'])[last()]")
        this.popupHeading = page.getByText("Are you sure you want to delete this holiday?");
        this.yesBtn = page.getByText("Yes")
        this.leaveCount = page.locator("//div[@class='total']/span");


        // holiday list
        this.holidayList = page.locator("//table/tbody/tr/td");

        // Out of Office
        this.dateFilterO = page.getByPlaceholder("MM-DD-YYYY")
        this.nextArrow = page.locator("//button[@aria-label='Next Month']")
        this.dates = page.locator(".react-datepicker__week>div");
        this.rowCount = page.locator('thead + tbody > tr:visible')

    }

    async selectDate(date: string) {
        // date format: "dd-mm-yyyy"
        const [day, month, year] = date.split('-');
        const formattedDate = `${year}-${month}-${day}`; // yyyy-mm-dd

        // Fill the date field directly
        await this.dateField.fill(formattedDate);
    }

    async getRandomDate(): Promise<string> {
        const start = new Date(2025, 0, 1);
        const end = new Date(2025, 11, 31);
        const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
        const randomDate = new Date(randomTime);

        const day = String(randomDate.getDate()).padStart(2, '0');
        const month = String(randomDate.getMonth() + 1).padStart(2, '0');
        const year = randomDate.getFullYear();

        // Return in yyyy-mm-dd format for input[type="date"]
        return `${year}-${month}-${day}`;
    }


    async updateHoliday(newHolidayName: string) {
        // Step 1: Click on Edit link
        await this.editLink.click();

        // Step 2: Update data in any field (Holiday Name in this case)
        await this.holidayField.fill(newHolidayName);

        // Step 3: Click Submit
        await this.submitBtn.click();


    }
    async addHoliday(holidayName: string, date: string) {
        // Clicking on Add button
        await this.addHolidayButton.click()
        await this.holidayField.fill(holidayName)
        const [day, month, year] = date.split('-');
        const formattedDate = `${year}-${month}-${day}`;
        await this.dateField.fill(formattedDate)
        await this.submitBtn.click();
    }

    async addHolidayWithRandomDate(holidayName: string = "Comp_Off Leave") {
        const randomDate = await this.getRandomDate(); // generate random date

        // Convert it to dd-mm-yyyy for your existing addHoliday method
        const [year, month, day] = randomDate.split('-');
        const formattedDateForMethod = `${day}-${month}-${year}`;

        // Call your original addHoliday method
        await this.addHoliday(holidayName, formattedDateForMethod);
        await this.editLink.last().click();
        await this.updateStatusDropdown.selectOption('Approved')
        await this.submitBtn.click();

        // Return the date in yyyy-mm-dd format to use in applyOfficalDutyLeave
        return randomDate;
    }


    async filterHolidayListByYear(selectedYear: string, yearColIndex: number, dateColIndex: number) {

        // Select provided year or previous year by default
        const year = selectedYear ?? (new Date().getFullYear() - 1).toString();
        await this.yearDropdown.selectOption(year);

        // Wait for at least one row to appear
        await this.holidayList.first().waitFor({ state: 'visible', timeout:3000 });

        // Get Year column data
        const yearData: string[] = await this.getTableRowdata(yearColIndex);
        
        // Get Date column data
        const dateData: string[] = await this.getTableRowdata(dateColIndex);

        // Verify Year column
        yearData.forEach(cellYear => {
            expect(cellYear, `Year column mismatch. Expected ${year}, got ${cellYear}`).toBe(year);
        });

        // Verify Date column
        dateData.forEach(dateStr => {
            const cellYear = new Date(dateStr).getFullYear().toString();
            expect(cellYear, `Date column mismatch. Expected ${year}, got ${cellYear}`).toBe(year);
        });

    }

    async getTableRowdata(columnIndex: number): Promise<string[]> {
        // Wait for at least one cell in the desired column to appear
        await this.page.waitForSelector(`tr>th:nth-child(${columnIndex})`);

        const rows = await this.page.locator('tbody > tr:visible');
        const columnData: string[] = [];

        const rowCount = await rows.count();

        if (rowCount === 0) {
            console.warn("No data rows found in <tbody>.");
            return [];
        }

        for (let i = 0; i < rowCount; i++) {
            const cell = rows.nth(i).locator(`td:nth-child(${columnIndex})`);
            await cell.waitFor({ state: 'visible', timeout: 5000 });
            const text = await cell.textContent();
            columnData.push((text ?? '').trim());
        }

        console.log(`Column ${columnIndex} data:`, columnData);
        return columnData;
    }


    async verifyOutOfOfficeElements(date: string) {
        this.dateFilterO.click()

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





    async verifyDateInFromTo(selectedDate: string, fromColumn: number, toColumn: number) {
        const fromDates = await this.getTableRowdata(fromColumn);
        const toDates = await this.getTableRowdata(toColumn);

        // Convert selectedDate string to Date object
        const selectedDateObj = new Date(selectedDate);

        // Check if selected date exists in any row in From or To column
        let dateFound = false;
        for (let i = 0; i < fromDates.length; i++) {
            const fromDate = new Date(fromDates[i]);
            const toDate = new Date(toDates[i]);

            // Check if selected date is within From and To range
            if (selectedDateObj.getTime() >= fromDate.getTime() && selectedDateObj.getTime() <= toDate.getTime()) {
                dateFound = true;
                break;
            }
        }

        console.log(`Selected date ${selectedDate} found in From/To columns:`, dateFound);
        expect(dateFound).toBe(true);
    }

    async selectSingleDate(targetMonth: string, targetYear: string, targetDay: string) {
        // Loop until desired month and year are visible
        while (!(await this.page.locator('.react-datepicker__current-month').textContent())?.includes(`${targetMonth} ${targetYear}`)) {
            await this.nextArrow.click();
        }

        // Select the day
        const allDates = await this.dates.all();
        for (const dateCell of allDates) {
            if ((await dateCell.textContent())?.trim() === targetDay) {
                await dateCell.click();
                break;
            }
        }
    }
}

