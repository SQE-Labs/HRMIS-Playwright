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
        this.editBtn = page.locator(".fa.fa-edit");
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
        this.menuLocator = page.locator('[class*="menu"]'); // ✅ used in selectDropdownOption
    }

    // ✅ Public helper — returns dynamic project button locator
    public getProjectButton(projectName: string): Locator {
        return this.page.locator(`button:has-text("${projectName}"):has-text("Active")`);
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
        await this.projectNameInput.scrollIntoViewIfNeeded();
        await this.projectNameInput.fill(projectData.name);
        await this.projectNameInput.blur();
        await this.selectDropdownOption(this.projectTypeDropdown, projectData.projectType);
        await this.selectDropdownOption(this.deliveryLeadDropdown, projectData.deliveryLead);
        await this.selectDropdownOption(this.projectManagerDropdown, projectData.projectManager);
        await this.selectDropdownOption(this.principalSponsorDropdown, projectData.principalSponsor);
        await this.selectDropdownOption(this.leadBusinessAnalystDropdown, projectData.leadBusinessAnalyst);

        if (projectData.headOfDelivery) {
            await this.selectDropdownOption(this.headOfDeliveryDropdown, projectData.headOfDelivery);
        }

        await this.sowStartDateInput.scrollIntoViewIfNeeded();
        await this.sowStartDateInput.fill(projectData.sowStart);
        await this.sowEndDateInput.fill(projectData.sowEnd);
        await this.actualStartDateInput.fill(projectData.actualStart);
        await this.actualEndDateInput.fill(projectData.actualEnd);

        await this.projectDescriptionInput.scrollIntoViewIfNeeded();
        await this.projectDescriptionInput.fill(projectData.description);
        await this.projectDescriptionInput.click();

        await this.submitBtn.scrollIntoViewIfNeeded();
        await this.submitBtn.click();
    }

    async selectDropdownOption(dropdown: Locator, optionText: string): Promise<void> {
        await dropdown.click();
        await dropdown.fill(optionText);
        await this.menuLocator.filter({ visible: true }).first().waitFor({ state: 'visible', timeout: 10000 }); // ✅ using class field
        const option = this.page.getByText(optionText, { exact: true }).last();
        await option.waitFor({ state: 'visible', timeout: 10000 });
        await option.click({ force: true });
        await this.waitforLoaderToDisappear();
    }

    async addNewMember(memberData: {
        employeeName: string,
        designation: string,
        joiningDate: string,
        endDate: string
    }): Promise<void> {
        await expect(this.addMemberModalTitle).toBeVisible();
        await expect(this.modalActiveIndicator).toBeHidden();

        await this.employeeNameControl.click();
        await this.selectDropdownOption(this.employeeNameDropdown, memberData.employeeName);

        await this.designationControl.click();
        await this.selectDropdownOption(this.designationDropdown, memberData.designation);

        await this.joiningInputModal.click();
        const parts = memberData.joiningDate.split('/');
        const day = String(parseInt(parts[1], 10));
        let dayLocator = this.datePickerDay.filter({ hasText: day }).first();

        if (!(await dayLocator.isVisible().catch(() => false))) {
            dayLocator = this.page.locator('.react-datepicker__day:not(.react-datepicker__day--outside-month)').filter({ hasText: day }).first();
        }
        await dayLocator.waitFor({ state: 'visible', timeout: 5000 });
        await dayLocator.click();

        try {
            await Promise.race([
                this.modalActiveIndicator.waitFor({ state: 'visible', timeout: 8000 }),
                this.modalSubmitButton.waitFor({ state: 'visible', timeout: 8000 })
            ]);
        } catch (err) {
            console.warn('Active indicator not visible after wait; proceeding to submit.');
        }
        
        await this.modalSubmitButton.click();
    }
}