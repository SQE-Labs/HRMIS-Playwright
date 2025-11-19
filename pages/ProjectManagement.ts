import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './Basepage'
import { AssetHelper } from '../utils/AssetHelpers'

export class ProjectManagement extends BasePage {

    // Locators
    public projectListTab: Locator;
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
    public searchInput: Locator;
    public editBtn: Locator;
    public accordion: Locator;
    public joiningDateInput: Locator;
    public employeeNameDropdown: Locator;
    public designationDropdown: Locator;
    public reasonDropdown: Locator;

    constructor(page: Page) {
        super(page);

        this.projectListTab = page.locator("//a[text()='Project List']");
        this.createProjectBtn = page.getByRole("link", { name: "Create Project" });
        this.projectHeader = page.locator("h1:has-text('Project List')");
        this.submitBtn = page.getByRole("button", { name: "Submit" });
        this.cancelBtn = page.getByRole("button", { name: "Cancel" });
        this.projectNameInput = page.locator("input[name='projectName']");
        this.projectTypeDropdown = page.locator("#react-select-2-input");
        this.deliveryLeadDropdown = page.locator("#react-select-3-input"); // refine if multiple selects exist
        this.projectManagerDropdown = page.locator("#react-select-4-input");
        this.principalSponsorDropdown = page.locator("#react-select-5-input");
        this.leadBusinessAnalystDropdown = page.locator("#react-select-6-input");
        this.projectDescriptionInput = page.locator("textarea");
        this.sowStartDateInput = page.locator("(//input[@type='text'])[7]");
        this.sowEndDateInput = page.locator("(//input[@type='text'])[8]");
        this.actualStartDateInput = page.locator("(//input[@type='text'])[9]");
        this.actualEndDateInput = page.locator("(//input[@type='text'])[10]");
        this.searchInput = page.locator("input[placeholder='Search By Project Name']");
        this.editBtn = page.locator(".fa.fa-edit")
        this.accordion = page.locator(".accordion-collapse.collapse.show");
        this.joiningDateInput = page.locator("(//input[@type='text'])[4]");
        this.employeeNameDropdown = page.locator("#react-select-2-input");
        this.designationDropdown = page.locator("#react-select-3-input");
        this.reasonDropdown = page.locator("#react-select-2-input");
    }

    async expandTab(): Promise<void> {
        await AssetHelper.expandIfCollapsed(this.page.getByRole('link', { name: "Project TeamFlow" }));
    }

    async navigateToProjectListTab(): Promise<void> {
        await this.projectListTab.click();
        await this.waitforLoaderToDisappear();
    }

    async clickCreateProject(): Promise<void> {
        await this.createProjectBtn.click();
        await this.waitforLoaderToDisappear();

    }
    async searchProject(projectName: string): Promise<void> {
        await this.searchInput.fill(projectName);
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
        description: string,
        sowStart: string,
        sowEnd: string,
        actualStart: string,
        actualEnd: string
    }): Promise<void> {
        // Fill Project Name
        await this.projectNameInput.fill(projectData.name);
        // Select Project Type
        await this.projectTypeDropdown.click()
        await this.projectTypeDropdown.fill(projectData.projectType);
        await this.page.getByText(projectData.projectType).last().click();
        // Select Delivery Lead
        await this.deliveryLeadDropdown.click();
        await this.deliveryLeadDropdown.fill(projectData.deliveryLead);
        await this.page.getByText(projectData.deliveryLead).last().click();
        // Select Project Manager
        await this.projectManagerDropdown.click();
        await this.projectManagerDropdown.fill(projectData.projectManager);
        await this.page.getByText(projectData.projectManager).last().click();
        // Select Principal Sponsor
        await this.principalSponsorDropdown.click();
        await this.principalSponsorDropdown.fill(projectData.principalSponsor);
        await this.page.getByText(projectData.principalSponsor).last().click();
        // Select Lead Business Analyst
        await this.leadBusinessAnalystDropdown.click();
        await this.leadBusinessAnalystDropdown.fill(projectData.leadBusinessAnalyst);
        await this.page.getByText(projectData.leadBusinessAnalyst).last().click();
        // Fill Dates and Description
        await this.sowStartDateInput.fill(projectData.sowStart);
        // await this.sowEndDateInput.fill(projectData.sowEnd);
        await this.projectDescriptionInput.fill(projectData.description);
        await this.projectDescriptionInput.click(); // To trigger any onBlur events

        await this.submitBtn.click();
    }
    async addNewMember(memberData: {
        employeeName: string,
        designation: string,
        joiningDate: string,
        endDate: string
    }): Promise<void> {
        // Select Employee Name
        await expect(this.page.getByText("Add New Member")).toBeVisible();
        await expect(this.page.locator('.css-olqui2-singleValue:has-text("Active")')).toBeHidden();
        await this.employeeNameDropdown.click();
        await this.page.waitForTimeout(2000);
        await this.employeeNameDropdown.fill(memberData.employeeName);
        await this.page.getByText(memberData.employeeName).last().click();
        // Select Designation
        await this.designationDropdown.click();
        await this.page.waitForTimeout(2000);
        await this.designationDropdown.fill(memberData.designation);
        await this.page.getByText(memberData.designation).last().click();
        // Fill Joining Date
        await this.joiningDateInput.fill(memberData.joiningDate);
        await expect(this.page.locator('.css-olqui2-singleValue:has-text("Active")')).toBeVisible();
        // Fill End Date
        // await this.endDateInput.fill(memberData.endDate);
        await this.page.locator('button[type = "submit"]').click();
    }
}
