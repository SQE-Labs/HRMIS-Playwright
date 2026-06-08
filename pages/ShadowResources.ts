import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './Basepage'
import { AssetHelper } from '../utils/AssetHelpers'

export class ShadowResources extends BasePage {
    public shadowResourcesTab: Locator;
    public shadowResourcesHeader: Locator;
    public searchInput: Locator;
    public resourcesList: Locator;
    public totalResources: Locator;
    public addMemberButton: Locator;
    public shadowMemberModal: Locator;
    public shadowMemberTitle: Locator;
    public shadowEmployeeNameDropdown: Locator;
    public mainEmployeeNameDropdown: Locator;
    public shadowResourceDesignationDropdown: Locator;
    public joiningDateInput: Locator;
    public endDateInput: Locator;
    public submitButton: Locator;
    public datePickerDay: Locator;


    constructor(page: Page) {
        super(page);

        this.shadowResourcesTab = page.getByRole('link', { name: 'Shadow Resources', exact: true });
        this.shadowResourcesHeader = page.getByRole('heading', { name: 'Shadow Resources', exact: true });
        this.searchInput = page.locator("input[placeholder='Search By Project Name']");
        this.resourcesList = page.locator(".project-accordion-item");
        this.totalResources = page.locator(".total span");
        this.addMemberButton = page.getByRole('button', { name: 'Add Member' });
        this.shadowMemberModal = page.locator('div.modal.show div.modal-content.rounded-lg');
        this.shadowMemberTitle = this.shadowMemberModal.getByText('Add Shadow Member');
        this.shadowEmployeeNameDropdown = this.shadowMemberModal.locator("xpath=//label[contains(normalize-space(),'Shadow Employee')]/ancestor::div[contains(@class,'row')][1]//input[@role='combobox']");
        this.mainEmployeeNameDropdown = this.shadowMemberModal.locator("xpath=//label[contains(normalize-space(),'Main Employee')]/ancestor::div[contains(@class,'row')][1]//input[@role='combobox']");
        this.shadowResourceDesignationDropdown = this.shadowMemberModal.locator("xpath=//label[contains(normalize-space(),'Shadow Resource Designation')]/ancestor::div[contains(@class,'row')][1]//input[@role='combobox']");
        this.joiningDateInput = this.shadowMemberModal.locator("xpath=//label[contains(normalize-space(),'Joining Date')]/ancestor::div[contains(@class,'row')][1]//input[@type='text']").first();
        this.endDateInput = this.shadowMemberModal.locator("xpath=//label[contains(normalize-space(),'End Date')]/ancestor::div[contains(@class,'row')][1]//input[@type='text']").first();
        this.submitButton = this.shadowMemberModal.getByRole('button', { name: 'Add Member' });
        this.datePickerDay = this.shadowMemberModal.locator('.react-datepicker__day:not(.react-datepicker__day--outside-month)');
    }

    async navigateToShadowResources(): Promise<void> {
        await AssetHelper.expandIfCollapsed(this.page.getByRole('button', { name: 'Project TeamFlow' }));
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

    async clickAddMemberButton(resourceName: string): Promise<void> {
        const projectCard = this.resourcesList.filter({ hasText: resourceName }).first();
        const projectAddMemberButton = projectCard.getByRole('button', { name: 'Add Member' });
        await expect(projectAddMemberButton).toBeEnabled({ timeout: 30000 });
        await projectAddMemberButton.click();
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
        await expect(this.shadowMemberTitle).toBeVisible();

        await this.selectDropdownOption(this.shadowEmployeeNameDropdown, memberData.shadowName);

        await this.selectDropdownOption(this.mainEmployeeNameDropdown, memberData.mainEmployeeName);

        await this.selectDropdownOption(this.shadowResourceDesignationDropdown, memberData.designation);

        // Open joining date picker and click the day (modal-scoped, with page-level fallback)
        if (memberData.joiningDate) {
            await this.joiningDateInput.click();
            const parts = memberData.joiningDate.split('/');
            const day = String(parseInt(parts[1], 10));
            let dayLocator = this.datePickerDay.filter({ hasText: day }).first();
            if (!(await dayLocator.isVisible().catch(() => false))) {
                dayLocator = this.page.locator('.react-datepicker__day:not(.react-datepicker__day--outside-month)').filter({ hasText: day }).first();
            }
            await dayLocator.waitFor({ state: 'visible', timeout: 5000 });
            await dayLocator.click();
        }

        // endDate intentionally ignored for add-only flow

        // Wait briefly for modal state to update, then submit
        try {
            await this.submitButton.waitFor({ state: 'visible', timeout: 8000 });
        } catch (err) {
            console.warn('Submit button not visible after date selection; proceeding to click.');
        }

        await this.submitButton.click();
    }

    async selectDropdownOption(dropdown: Locator, optionText: string): Promise<void> {
        await dropdown.click();
        await dropdown.fill(optionText);
        const option = this.page.getByText(optionText, { exact: true }).last();
        await option.waitFor({ state: 'visible', timeout: 10000 });
        await option.click({ force: true });
    }
}