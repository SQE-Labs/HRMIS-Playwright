import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/Basepage';
import { expect, Locator, Page } from '@playwright/test';
import * as constants from '../utils/constants';

export class MyTeamLeavePage extends BasePage {

    public pageTitle: Locator;
    private searchBox: Locator;
    public statusDropdown: Locator;
    employeeColumn: any;


    constructor(page: Page) {
        super(page);
        this.pageTitle = page.getByText('My Team Leave');
        this.searchBox = page.getByPlaceholder('Search by Employee Name');
        this.statusDropdown = page.locator('select[name="status"]');
    }

    get employeeRows() {
    return this.page.locator("//table/tbody/tr");
}


    async verifyDefaultValueOfStatusDropdown() {
        const defaultValue = await this.statusDropdown.inputValue();
        expect(defaultValue).toBe(constants.PENDING_STATUS);
    }

    async isSearchBoxVisible(): Promise<boolean> {
        return await this.searchBox.isVisible();
    }

    async selectLeaveStatus(type: string) {
        await this.statusDropdown.selectOption(type);
        this.waitForSpinnerLoaderToDisappear
    }

   async searchEmployee(employeeName: string) {
    await this.searchBox.fill(employeeName);
    await this.searchBox.focus();
    await this.page.keyboard.press('Enter');
     // Wait for loader to disappear if exists
    await this.waitforLoaderToDisappear();

    // Wait until at least one row appears
    await this.employeeRows.first().waitFor({ state: 'visible' });

}

    async getEmployeeNames(): Promise<string[]> {
        const employeeColumn = this.page.locator("//table//tbody/tr/td[2]")
        return await employeeColumn.allTextContents();
    }
    async getAllSearchResults(): Promise<string[]> {
        const employees = this.page.locator("//table/tbody/tr");
        return await employees.allTextContents();
    }


}



