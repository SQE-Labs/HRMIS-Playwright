import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './Basepage'
import { AssetHelper } from '../utils/AssetHelpers'
import { CommonUtils } from '../utils/commonUtils';
let utils = new CommonUtils();

export class ProjectManagement extends BasePage {
    // Locators
    public projectListTab: Locator;
    public projectsTab: Locator;
    public createProjectBtn: Locator;
    public projectHeader: Locator;
    public projectNameInput: Locator;
    public deliveryLeadDropdown: Locator;
    public projectDescriptionInput: Locator;
    public sowStartDateInput: Locator;
    public sowEndDateInput: Locator;
    public actualStartDateInput: Locator;
    public actualEndDateInput: Locator;
    public submitBtn: Locator;
    public cancelBtn: Locator;
    public projectTypeDropdown: Locator;
    public projectManagerDropdown: Locator;
    public principalSponsorDropdown: Locator;
    public leadBusinessAnalystDropdown: Locator;
    public headOfDeliveryDropdown: Locator;
    public searchInput: Locator;
    public editBtn: Locator;
    public accordion: Locator;
    public joiningDateInput: Locator;
    public employeeNameDropdown: Locator;
    public designationDropdown: Locator;
    public reasonDropdown: Locator;
    // Modal-scoped locators
    public modal: Locator;
    public addMemberModalTitle: Locator;
    public employeeNameControl: Locator;
    public designationControl: Locator;
    public joiningInputModal: Locator;
    public datePickerDay: Locator;
    public modalActiveIndicator: Locator;
    public modalSubmitButton: Locator;
    public menuLocator: Locator;

    constructor(page: Page) {
        super(page);

        this.projectListTab = page.getByRole("link", { name: "Project List", exact: true });
        this.projectsTab = page.getByRole("link", { name: "Projects", exact: true });
        this.createProjectBtn = page.locator("a[href='/dashboard/createProject']");
        this.projectHeader = page.getByRole("heading", { name: "Project List", level: 2 });
        this.submitBtn = page.getByRole("button", { name: "Submit" });
        this.cancelBtn = page.getByRole("button", { name: "Cancel" });
        this.projectNameInput = page.locator("input[name='projectName']");
        this.projectTypeDropdown = page.locator("//label[normalize-space()='Project Type']/ancestor::div[contains(@class,'row')][1]//input[@role='combobox']");
        this.deliveryLeadDropdown = page.locator("//label[normalize-space()='Delivery Lead']/ancestor::div[contains(@class,'row')][1]//input[@role='combobox']");
        this.projectManagerDropdown = page.locator("//label[normalize-space()='Project Manager']/ancestor::div[contains(@class,'row')][1]//input[@role='combobox']");
        this.principalSponsorDropdown = page.locator("//label[normalize-space()='Principal Sponsor']/ancestor::div[contains(@class,'row')][1]//input[@role='combobox']");
        this.leadBusinessAnalystDropdown = page.locator("//label[contains(normalize-space(),'Lead Business Analyst')]/ancestor::div[contains(@class,'row')][1]//input[@role='combobox']");
        this.headOfDeliveryDropdown = page.locator("//label[normalize-space()='Head of Delivery']/ancestor::div[contains(@class,'row')][1]//input[@role='combobox']");
        this.projectDescriptionInput = page.locator("textarea[name='commercialSummary']");
        this.sowStartDateInput = page.locator("//label[normalize-space()='SOW']/ancestor::div[contains(@class,'row')][1]//input[contains(@class,'custom-date')]").first();
        this.sowEndDateInput = page.locator("//label[normalize-space()='SOW']/ancestor::div[contains(@class,'row')][1]//input[contains(@class,'custom-date')]").nth(1);
        this.actualStartDateInput = page.locator("//label[normalize-space()='Actual']/ancestor::div[contains(@class,'row')][1]//input[contains(@class,'custom-date')]").first();
        this.actualEndDateInput = page.locator("//label[normalize-space()='Actual']/ancestor::div[contains(@class,'row')][1]//input[contains(@class,'custom-date')]").nth(1);
        this.searchInput = page.locator("input[placeholder='Search By Project Name']");
        this.editBtn = page.locator(".fa.fa-edit")
        this.accordion = page.locator(".accordion-collapse.collapse.show");
        this.joiningDateInput = page.locator("//label[contains(normalize-space(),'Joining Date')]/ancestor::div[contains(@class,'row')][1]//input[contains(@class,'custom-date') or @type='text']").first();
        this.employeeNameDropdown = page.locator("//label[contains(normalize-space(),'Employee Name')]/ancestor::div[contains(@class,'row')][1]//input[@role='combobox']");
        this.designationDropdown = page.locator("//label[contains(normalize-space(),'Designation')]/ancestor::div[contains(@class,'row')][1]//input[@role='combobox']");
        this.reasonDropdown = page.locator(".modal.show input[role='combobox']").first();
        // Modal-scoped
        this.modal = page.locator('.modal.show');
        this.addMemberModalTitle = this.modal.getByText('Add New Member');
        this.employeeNameControl = this.modal.locator("xpath=//label[contains(normalize-space(),'Employee Name')]/ancestor::div[contains(@class,'row')][1]//div[contains(@class,'css-13cymwt-control')]");
        this.designationControl = this.modal.locator("xpath=//label[contains(normalize-space(),'Designation')]/ancestor::div[contains(@class,'row')][1]//div[contains(@class,'css-13cymwt-control')]");
        this.joiningInputModal = this.modal.locator("xpath=//label[contains(normalize-space(),'Joining Date')]/ancestor::div[contains(@class,'row')][1]//input[contains(@class,'custom-date') or @type='text']").first();
        this.datePickerDay = this.modal.locator('.react-datepicker__day:not(.react-datepicker__day--outside-month)');
        this.modalActiveIndicator = this.modal.locator('.css-olqui2-singleValue:has-text("Active")');
        this.modalSubmitButton = this.modal.locator('button[type="submit"]').first();
        this.menuLocator = page.locator('[class*="menu"]');
    }

    async expandTab(): Promise<void> {
        await AssetHelper.expandIfCollapsed(this.page.getByRole('button', { name: "Project TeamFlow" }));
    }

    async navigateToProjectListTab(): Promise<void> {
        await this.projectListTab.click();
        await this.waitforLoaderToDisappear();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async clickCreateProject(): Promise<void> {
        await this.createProjectBtn.click();
        await this.waitforLoaderToDisappear();

    }
    async searchProject(projectName: string): Promise<void> {
        await this.searchInput.fill(projectName);
        await this.searchInput.press('Enter');
        await this.waitforLoaderToDisappear();
    }
    async clickOnPushNotificationBtn(): Promise<void> {
        await this.page.getByText('Push Notification').click();
        await this.waitforLoaderToDisappear();
    }
    async clickOnSendBtn(): Promise<void> {
        await this.page.getByRole('button', { name: 'Send' }).click();
        await this.waitforLoaderToDisappear();
    } 
    async clickOnYesBtn(): Promise<void> {
        await this.page.getByRole('button', { name: 'Yes' }).click();
        await this.waitforLoaderToDisappear();
    }
    async clickOnAddMembersBtn(): Promise<void> {
        await this.page.getByRole('button', { name: 'Add Member' }).click();
        await this.waitforLoaderToDisappear();
    }

    async fillAndSubmitProjectForm(projectData: {
        name: string,
        projectType: string,
        deliveryLead: string,
        projectManager: string,
        principalSponsor: string,
        leadBusinessAnalyst: string,
        headOfDelivery: string,
        description: string,
        sowStart: string,
        sowEnd: string,
        actualStart: string,
        actualEnd: string
    }): Promise<void> {
        // Scroll form into view
        await this.projectNameInput.scrollIntoViewIfNeeded();
        
        // Fill Project Name
        await this.projectNameInput.fill(projectData.name);
        await this.projectNameInput.blur();
        
        // Select Project Type
        await this.selectDropdownOption(this.projectTypeDropdown, projectData.projectType);
        
        // Select Delivery Lead
        await this.selectDropdownOption(this.deliveryLeadDropdown, projectData.deliveryLead);
        
        // Select Project Manager
        await this.selectDropdownOption(this.projectManagerDropdown, projectData.projectManager);
        
        // Select Principal Sponsor
        await this.selectDropdownOption(this.principalSponsorDropdown, projectData.principalSponsor);
        
        // Select Lead Business Analyst
        await this.selectDropdownOption(this.leadBusinessAnalystDropdown, projectData.leadBusinessAnalyst);
        // Select Head of Delivery
        if (projectData.headOfDelivery) {
            await this.selectDropdownOption(this.headOfDeliveryDropdown, projectData.headOfDelivery);
        }
        
        // Scroll dates into view
        await this.sowStartDateInput.scrollIntoViewIfNeeded();
        
        // Fill Dates and Description
        await this.sowStartDateInput.fill(projectData.sowStart);
        await this.sowEndDateInput.fill(projectData.sowEnd);
        await this.actualStartDateInput.fill(projectData.actualStart);
        await this.actualEndDateInput.fill(projectData.actualEnd);
        
        // Fill description
        await this.projectDescriptionInput.scrollIntoViewIfNeeded();
        await this.projectDescriptionInput.fill(projectData.description);
        await this.projectDescriptionInput.click(); // To trigger any onBlur events
        
        // Scroll submit button into view and wait
        await this.submitBtn.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);

        await this.submitBtn.click();
    }

    async selectDropdownOption(dropdown: Locator, optionText: string): Promise<void> {
        // Click to open dropdown
        await dropdown.click();
        await this.page.waitForTimeout(500);

        // Fill the dropdown input in one go (avoid typing char-by-char)
        await dropdown.fill(optionText);
        await this.page.waitForTimeout(500);
        
        // Wait for the options menu to appear
        await this.page.locator('[class*="menu"]').filter({ visible: true }).first().waitFor({ state: 'visible', timeout: 10000 });
        
        // Click the matching option directly
        const option = this.page.getByText(optionText, { exact: true }).last();
        await option.waitFor({ state: 'visible', timeout: 10000 });
        await option.click({ force: true });
        
        // Wait for dropdown to close and state to update
        await this.page.waitForTimeout(500);
    }
    async addNewMember(memberData: {
        employeeName: string,
        designation: string,
        joiningDate: string,
        endDate: string
    }): Promise<void> {
        // Select Employee Name
        await expect(this.addMemberModalTitle).toBeVisible();
        await expect(this.modalActiveIndicator).toBeHidden();

        // Use the generic dropdown selection flow (open, fill, pick suggestion)
        await this.employeeNameControl.click();
        await this.selectDropdownOption(this.employeeNameDropdown, memberData.employeeName);

        // Select Designation via same flow
        await this.designationControl.click();
        await this.selectDropdownOption(this.designationDropdown, memberData.designation);

        // Fill Joining Date (use modal-scoped locator to target the modal input)
        await this.joiningInputModal.click();
        // Open datepicker and pick the day from the provided MM/DD/YYYY string
        const parts = memberData.joiningDate.split('/');
        const day = String(parseInt(parts[1], 10));
        let dayLocator = this.datePickerDay.filter({ hasText: day }).first();
        // If datepicker renders outside modal, fallback to page-level locator
        if (!(await dayLocator.isVisible().catch(() => false))) {
            dayLocator = this.page.locator('.react-datepicker__day:not(.react-datepicker__day--outside-month)').filter({ hasText: day }).first();
        }
        await dayLocator.waitFor({ state: 'visible', timeout: 5000 });
        await dayLocator.click();

        // Wait for either the 'Active' indicator or submit button to become visible
        try {
            await Promise.race([
                this.modalActiveIndicator.waitFor({ state: 'visible', timeout: 8000 }),
                this.modalSubmitButton.waitFor({ state: 'visible', timeout: 8000 })
            ]);
        } catch (err) {
            console.warn('Active indicator not visible after wait; proceeding to submit.');
        }

        // Submit modal
        await this.modalSubmitButton.click();
    }
}
