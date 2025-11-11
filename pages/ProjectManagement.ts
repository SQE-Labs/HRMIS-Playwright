import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './Basepage'
import { AssetHelper } from '../utils/AssetHelpers'

export class ProjectManagement extends BasePage {

    // Locators
    private projectListTab: Locator;
    private createProjectBtn: Locator;
    private projectNameInput: Locator;
    private deliveryLeadDropdown: Locator;
    private projectDescriptionInput: Locator;
    private sowStartDateInput: Locator;
    private sowEndDateInput: Locator;
    private actualStartDateInput: Locator;
    private actualEndDateInput: Locator;
    private submitBtn: Locator;
    private cancelBtn: Locator;
    private projectTypeDropdown: Locator;
    private projectManagerDropdown: Locator;
    private principalSponsorDropdown: Locator;
    private leadBusinessAnalystDropdown: Locator;
    private searchInput: Locator;

    constructor(page: Page) {
        super(page);

        this.projectListTab = page.locator("//a[text()='Project List']");
        this.createProjectBtn = page.getByRole("link", { name: "Create Project" });
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
    }

    async expandTab(): Promise<void> {
        await AssetHelper.expandIfCollapsed(this.page.getByRole('link', { name: "Project TeamFlow" }));
    }

    async navigateToProjectListTab(): Promise<void> {
        await this.projectListTab.click();
    }

    async clickCreateProject(): Promise<void> {
        await this.createProjectBtn.click();
    }
    async searchProject(projectName: string): Promise<void> {
        await this.searchInput.fill(projectName);
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

}
