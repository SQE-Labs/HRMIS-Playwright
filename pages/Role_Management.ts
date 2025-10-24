import { BasePage } from '../pages/Basepage';
import { ElementHandle, expect, Locator, Page } from '@playwright/test';

export class RoleManagement extends BasePage {

    // locator initalizing
    public roleManagementTab: Locator;
    public searchField: Locator;
    public addRoleButton: Locator;
    public roleTitleField: Locator;
    public descriptionField: Locator;
    public submitButton: Locator;
    public editButton: Locator;
    public deleteButton: Locator;
    public itemsPerPageDropDown: Locator;
    public selectRoleDropdown: Locator;
    public subTabsCheckboxes: Locator;
    public tabCheckbox: Locator;
    public successMsg: Locator;
    public yesButton: Locator;
    public employeeManagementTab: Locator;
    public selectEmployeeRoleDropdown: Locator;
    public roleMangementSubTab: Locator;
    public roleAssignSuccessMsg: Locator;

    constructor(page: Page) {
        super(page)
        // assign locator
        this.searchField = page.getByPlaceholder("Search By Role Title")
        this.addRoleButton = page.getByText("+ Add Role");
        this.roleManagementTab = page.locator("(//a[text()='Role Management'])[2]")
        this.roleTitleField = page.getByPlaceholder("Enter Role Title")
        this.descriptionField = page.locator("textarea[name='description']")
        this.submitButton = page.getByText('Submit')
        this.editButton = page.locator("//a[text()='Edit']").first();
        this.deleteButton = page.getByText('Delete')
        this.itemsPerPageDropDown = page.locator("#itemsPerPage");

        // Menu Assign Role locators
        this.selectRoleDropdown = page.locator(".css-1xc3v61-indicatorContainer")
        this.subTabsCheckboxes = page.locator("//input[@id='check_Analytics&Insights']/..//div/input");
        this.tabCheckbox = page.locator("//input[@id='check_Analytics&Insights']");
       this.successMsg = page.locator("//strong[contains(., 'The menu has been successfully assigned to')]");
        this.roleAssignSuccessMsg = page.locator("//strong[contains(., 'The role has been successfully assigned to')]")
       this.yesButton = page.getByRole('button', { name: 'Yes' });
       this.employeeManagementTab = page.getByRole('link', { name: 'Employee Management' });
        this.selectEmployeeRoleDropdown = page.locator(".css-1xc3v61-indicatorContainer")
        this.roleMangementSubTab = page.locator("(//a[text()='Role Management'])[1]");
    }

    // Navigating to the sub tabs under the Role Management tab
    async navigateToRoleManagementTab(tabName: string): Promise<void> {
        await this.page.getByRole('link', { name: tabName }).click();
    }

    async searchRoleByName(roleName: string): Promise<void> {
        await this.searchField.fill(roleName);     
        await this.searchField.press('Enter');       
        await this.page.waitForLoadState('networkidle');
    }
    async addRole(roleTitle: string, description: string): Promise<void> {
        await this.addRoleButton.click();
        await this.roleTitleField.fill(roleTitle);
        await this.descriptionField.fill(description);
        await this.submitButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async fetchLastRecordView(record: string) {
        await this.itemsPerPageDropDown.selectOption(record);
}
    async selectRole(roleName: string): Promise<void> {
        await this.selectRoleDropdown.click();
        await this.page.getByText(roleName, { exact: true }).click();
    }
   
    async checkSubTabCheckbox(subTabName: string): Promise<void> {
        // 1 Click on the main tab checkbox
        const mainTab = this.page.locator(`//input[@id='check_${subTabName}']`);
        await mainTab.check();
        await expect(mainTab).toBeChecked();

        // 2 Locate all subtab checkboxes under that tab
        const subTabs = this.page.locator(`//input[@id='check_${subTabName}']/..//div/input`);
        const handles = await subTabs.elementHandles() as ElementHandle<HTMLInputElement>[];

        // 3 Loop through and log each subtab’s label + state
        for (const subCheckbox of handles) {
            const label: string = await subCheckbox.evaluate((el: HTMLInputElement) =>
                el.parentElement?.innerText.trim() ?? ''
            );
            await subCheckbox.check(); // ensure it’s checked
            const isChecked = await subCheckbox.evaluate((el: HTMLInputElement) => el.checked);
            console.log(`${label}: ${isChecked}`);
        }
    }
    
    async selectEmloyee(empName: string): Promise<void> {
        await this.selectEmployeeRoleDropdown.click();
        await this.page.getByText(empName, { exact: true }).click();
    }


    async selectUpdateRoleCheckbox(updatedName: string): Promise<void> {
        const roleRow = this.page.locator(`tr:has-text("${updatedName}")`);
        const roleCheckbox = roleRow.locator('input[type="checkbox"]');
        await roleCheckbox.check();
        await expect(roleCheckbox).toBeChecked();
    }

    async verifyTabVisible(tabName: string): Promise<void> {
        const tab = this.page.getByRole('link', { name: tabName });
        await expect(tab).toBeVisible();
    }

}

