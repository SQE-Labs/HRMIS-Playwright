import { BasePage } from '../pages/Basepage';
import { expect, Locator, Page } from '@playwright/test';
import { AttendanceLeaveTab } from "../pages/Attendance&Leaves";
import * as constants from '../utils/constants';


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
    public lastEditLink: Locator;
    public holidayExistingWarning: Locator;
    public cancelBtn: Locator;
    public holidayRow: Locator;
    public holidayRemoveToast: Locator;
    public holidayAddedToast: Locator;


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
        this.deleteLink = page.getByText('Delete').first();
        this.popupHeading = page.getByText("Are you sure you want to delete this holiday?");
        this.yesBtn = page.getByText("Yes")
        this.leaveCount = page.locator("//div[@class='total']/span");
        this.lastEditLink = page.locator("//a[@class='fw-bolder'][text()='Edit']").last();
        this.holidayExistingWarning = page.getByText("Holiday for similar date is already existed");
        this.cancelBtn = page.getByRole('button', { name: 'Cancel' });
        this.holidayRow = page.locator("//tbody/tr/td[2]");
        this.holidayRemoveToast = page.getByText("Holiday removed successfully");
        this.holidayAddedToast = page.getByText("Holiday added");

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
        const now = new Date();

        // Start: 1st day of the current month
        const start = new Date(now.getFullYear(), now.getMonth(), 1);

        // End: last day of the next month
        const end = new Date(now.getFullYear(), now.getMonth() + 2, 0);

        // Generate a random timestamp between start and end
        const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
        const randomDate = new Date(randomTime);

        const day = String(randomDate.getDate()).padStart(2, '0');
        const month = String(randomDate.getMonth() + 1).padStart(2, '0');
        const year = randomDate.getFullYear();

        // Return in yyyy-mm-dd format
        return `${year}-${month}-${day}`;
    }




    async updateHoliday(newHolidayName: string) {
        // Step 1: Click on Edit link
        await this.lastEditLink.click();

        // Step 2: Update data in any field (Holiday Name in this case)
        await this.holidayField.fill(newHolidayName);

        // Step 3: Click Submit
        await this.submitBtn.click();


    }
    async addHoliday(holidayName: string, date: string) {
        const [day, month, year] = date.split('-');
        const formattedDate = `${year}-${month}-${day}`;

        // Adding the holiday
        await this.addHolidayButton.click();
        await this.holidayField.fill(holidayName);
        await this.dateField.fill(formattedDate);
        await this.submitBtn.click();
        await this.page.waitForSelector('.toast-message', { state: 'hidden', timeout: 5000 });
    }

    async addHolidayWithRandomDate(holidayName: string = "Comp_Off Leave") {
        // Step 1: Generate random date in yyyy-mm-dd format
        const randomDate = await this.getRandomDate();
        const [year, month, day] = randomDate.split("-");
        const formattedDateForMethod = `${day}-${month}-${year}`;

        // Step 2: Add holiday
        await this.addHoliday(holidayName, formattedDateForMethod);
        await this.page.waitForLoadState("networkidle");

        // Step 3: Format date as shown in table (e.g., "October 25, 2025")
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const formattedForOtherUse = `${monthNames[parseInt(month) - 1]} ${day}, ${year}`;

        // Step 4: Wait until the holiday row that CONTAINS this date appears
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState()
        const holidayRow = this.page.locator("tr", { hasText: formattedForOtherUse });
        await expect(holidayRow).toBeVisible({ timeout: 15000 });

        // Step 5: Click on the "Edit" link inside that row (contains-based)
        const editLink = holidayRow.locator("a:has-text('Edit')");
        await expect(editLink).toBeVisible({ timeout: 5000 });
        await editLink.click();

        // Step 6: Wait until form fields appear, update, and approve
        await expect(this.holidayField).toBeVisible({ timeout: 5000 });
        await this.holidayField.fill(holidayName);
        await this.updateStatusDropdown.selectOption("Approved");
        await this.submitBtn.click();
        await this.page.waitForLoadState("networkidle");

        // Step 7: Return formatted date for external verification
        return formattedForOtherUse;
    }



    async filterHolidayListByYear(selectedYear: string, yearColIndex: number, dateColIndex: number) {
        // Select provided year or previous year by default
        const year = selectedYear ?? (new Date().getFullYear() - 1).toString();
        await this.yearDropdown.selectOption(year);
        await this.page.waitForLoadState('networkidle');

        // Ensure at least one row appears after filtering
        const firstRow = this.holidayList.first();
        await expect(firstRow, 'Holiday list did not load after selecting year.').toBeVisible({ timeout: 10000 });

        // Small wait to allow UI to stabilize if data loads dynamically
        await this.page.waitForFunction(
            () => document.querySelectorAll('tbody > tr').length > 0,
            { timeout: 10000 }
        );

        // Scroll to the bottom row to ensure all rows are rendered
        const totalRows = await this.holidayList.count();
        if (totalRows > 0) await this.holidayList.last().scrollIntoViewIfNeeded();

        // Get Year and Date column data
        const [yearData, dateData] = await Promise.all([
            this.getTableRowdata(yearColIndex),
            this.getTableRowdata(dateColIndex)
        ]);

        // Verify Year column values
        for (const cellYear of yearData) {
            expect(
                cellYear.trim(),
                `Year column mismatch. Expected ${year}, got ${cellYear}`
            ).toBe(year);
        }

        // Verify Date column year matches the selected year
        for (const dateStr of dateData) {
            const parsedYear = new Date(dateStr).getFullYear().toString();
            expect(
                parsedYear,
                `Date column mismatch. Expected ${year}, got ${parsedYear}`
            ).toBe(year);
        }
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
            await cell.waitFor({ state: 'visible', timeout: 7000 });
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

    async selectSingleDate(dateStr: string) {
        const [monthStr, dayStr, yearStr] = dateStr.split('-');
        const targetMonth = Number(monthStr);
        const targetDay = Number(dayStr);
        const targetYear = Number(yearStr);

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const monthName = monthNames[targetMonth - 1];

        const currentMonthLocator = this.page.locator('.react-datepicker__current-month');

        // Wait until the correct month/year is displayed
        while (!(await currentMonthLocator.textContent())?.includes(`${monthName} ${targetYear}`)) {
            await this.nextArrow.click();
            // wait until calendar updates
            await this.page.waitForTimeout(300);
        }

        // Pick only visible days in the currently displayed month
        const dateCell = this.page.locator('.react-datepicker__day:not(.react-datepicker__day--outside-month)')
            .filter({ hasText: targetDay.toString() })
            .first();

        // Ensure element is attached and visible
        await dateCell.waitFor({ state: 'visible', timeout: 5000 });

        // Click with force to bypass headless visibility issues
        await dateCell.click({ force: true });

        // Optional: small delay to allow input to update
        await this.page.waitForTimeout(200);
    }
    async selectSingleDateWithMonth(targetMonth: string, targetYear: string, targetDay: string) {
        const monthLabel = this.page.locator('.react-datepicker__current-month');
        let maxTries = 12; // safety limit to avoid infinite loop

        // Loop until desired month and year are visible
        while (maxTries > 0) {
            const currentMonth = (await monthLabel.textContent())?.trim();
            if (currentMonth?.includes(`${targetMonth} ${targetYear}`)) {
                break; // found the correct month/year
            }

            await this.nextArrow.click();
            await this.page.waitForTimeout(500); // let UI update
            maxTries--;
        }

        // Select the target day
        const allDates = await this.dates.all();
        for (const dateCell of allDates) {
            const dateText = (await dateCell.textContent())?.trim();
            if (dateText === targetDay) {
                await dateCell.click();
                break;
            }
        }
    }
    async deleteAllCompOffHolidays(holidayName: string) {
        // Step 1: Filter holidays by Approved status
        await this.statusDropdown.selectOption(constants.ApproveStatus);
        await this.page.waitForLoadState('networkidle');

        // Step 2: Locate all matching holiday rows
        let holidayRows = this.page.locator(`tr:has-text("${holidayName}")`);

        // Step 3: Keep deleting until none left
        while (await holidayRows.count() > 0) {
            const firstRow = holidayRows.first();
            const deleteButton = firstRow.locator("//a[text()='Delete']");

            await deleteButton.click();
            await this.yesBtn.click();

            // Refresh locator (table updates dynamically)
            holidayRows = this.page.locator(`tr:has-text("${holidayName}")`);
        }

        // Step 4: Optional final assertion
        await expect(holidayRows).toHaveCount(0);
    }


}
