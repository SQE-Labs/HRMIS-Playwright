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

    constructor(page: Page) {
        super(page);

        this.projectListTab = page.locator("//a[text()='Project List']");
        this.createProjectBtn = page.getByRole("link", { name: "Create Project" });
        this.submitBtn = page.getByRole("button", { name: "Submit" });
        this.cancelBtn = page.getByRole("button", { name: "Cancel" });
        this.projectNameInput = page.locator("input[name='projectName']");
        this.deliveryLeadDropdown = page.locator("select"); // refine if multiple selects exist
        this.projectDescriptionInput = page.locator("textarea");
        this.sowStartDateInput = page.locator("input[id='sowStartDate']");
        this.sowEndDateInput = page.locator("input[id='sowEndDate']");
        this.actualStartDateInput = page.locator("input[placeholder='Start Date']").nth(1);
        this.actualEndDateInput = page.locator("input[placeholder='End Date']").nth(1);
    }

    async expandTab(): Promise<void> {
        await AssetHelper.expandIfCollapsed(this.page.getByRole('link', { name: "Project Management" }));
    }

    async navigateToProjectListTab(): Promise<void> {
        await this.projectListTab.click();
    }

    async clickCreateProject(): Promise<void> {
        await this.createProjectBtn.click();
    }

    async fillAndSubmitProjectForm(projectData: {
        name: string,
        deliveryLead: string,
        description: string,
        sowStart: string,
        sowEnd: string,
        actualStart: string,
        actualEnd: string
    }): Promise<void> {
        await this.projectNameInput.fill(projectData.name);
        await this.deliveryLeadDropdown.selectOption({ label: projectData.deliveryLead });
        await this.projectDescriptionInput.fill(projectData.description);

        await this.sowStartDateInput.fill(projectData.sowStart);
        await this.sowEndDateInput.fill(projectData.sowEnd);
        await this.submitBtn.click();
    }
}
