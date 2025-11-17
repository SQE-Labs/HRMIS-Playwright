import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './Basepage'

export class ShadowResources extends BasePage {
    public shadowResourcesTab: Locator;
    public shadowResourcesHeader: Locator;
    public searchInput: Locator;
    public resourcesList: Locator;
    public totalResources: Locator;
    public shadowEmployeeNameDropdown: Locator;
    public mainEmoployeeNameDropdown: Locator;
    public shadowResourceDesignationDropdown: Locator;
    public joiningDateInput: Locator;
    public endDateInput: Locator;


    constructor(page: Page) {
        super(page);

        this.shadowResourcesTab = page.locator("//a[text()='Shadow Resources']");
        this.shadowResourcesHeader = page.locator("h1:has-text('Shadow Resources')");
        this.searchInput = page.locator("input[placeholder='Search By Project Name']");
        this.resourcesList = page.locator(".project-accordion-item");
        this.totalResources = page.locator(".total span");
        this.shadowEmployeeNameDropdown = page.locator("#react-select-2-input");
        this.mainEmoployeeNameDropdown = page.locator("#react-select-3-input");
        this.shadowResourceDesignationDropdown = page.locator("#react-select-4-input");
        this.joiningDateInput = page.locator("(//input[@type='text'])[5]");
        this.endDateInput = page.locator("(//input[@type='text'])[6]");
    }

    async navigateToShadowResources(): Promise<void> {
        await this.shadowResourcesTab.click();
        await this.waitforLoaderToDisappear();
    }

    async searchResource(resourceName: string): Promise<void> {
        await this.searchInput.fill(resourceName);
        await this.waitforLoaderToDisappear();
    }

    async verifyResourceInList(resourceName: string): Promise<void> {
        const resource = this.resourcesList.filter({ hasText: resourceName });
        await expect(resource).toHaveCount(1);
    }

    async getTotalResources(): Promise<number> {
        const totalText = await this.totalResources.textContent();
        return parseInt(totalText || '0', 10);
    }
    async addShadowMember(memberData: {
        shadowName: string,
        mainEmployeeName: string,
        designation: string,
        joiningDate: string,
        endDate: string
    }): Promise<void> {
        // Select Employee Name
        await expect(this.page.getByText("Add Member")).toBeVisible();
        await this.page.getByText("Add Member").click();
        await expect(this.page.locator('.css-olqui2-singleValue:has-text("Active")')).toBeHidden();
        await this.shadowEmployeeNameDropdown.fill(memberData.shadowName);
        await this.shadowEmployeeNameDropdown.press('Enter');
        // Select Main Employee Name
        await this.mainEmoployeeNameDropdown.fill(memberData.mainEmployeeName);
        await this.mainEmoployeeNameDropdown.press('Enter');
        // Select Designation
        await this.shadowResourceDesignationDropdown.fill(memberData.designation);
        await this.shadowResourceDesignationDropdown.press('Enter');
        // Fill Joining Date
        await this.joiningDateInput.fill(memberData.joiningDate);
        await expect(this.page.locator('.css-olqui2-singleValue:has-text("Active")')).toBeVisible();
        // Fill End Date
        // await this.endDateInput.fill(memberData.endDate);
        await this.page.locator('button[type = "submit"]').click();
    }
}