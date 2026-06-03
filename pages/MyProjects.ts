import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './Basepage'

export class MyProjects extends BasePage {

    public myProjectsTab: Locator;
    public projectHeader: Locator;
    public searchInput: Locator;
    public projectsList: Locator;
    public totalProjectAssign: Locator;
    public editMemberModal: Locator;
    public editMemberModalTitle: Locator;
    public editDesignationControl: Locator;
    public editDesignationDropdown: Locator;
    public saveChangesButton: Locator;
    public deleteMemberModal: Locator;
    public deleteMemberModalTitle: Locator;
    public confirmDeleteButton: Locator;
    public dropdownMenu: Locator;

    constructor(page: Page) {
        super(page);

        this.myProjectsTab = page.locator("//a[text()='My Projects']");
        this.projectHeader = page.locator("h1:has-text('My Projects')");
        this.searchInput = page.locator("input[placeholder='Search By Project Name']");
        this.projectsList = page.locator(".project-accordion-item");
        this.totalProjectAssign = page.locator(".total span");
        this.editMemberModal = page.locator('.modal.show');
        this.editMemberModalTitle = this.editMemberModal.getByText('Edit Team Member');
        this.editDesignationControl = this.editMemberModal.locator("xpath=//label[contains(normalize-space(),'Designation')]/ancestor::div[contains(@class,'row')][1]//div[contains(@class,'control')]");
        this.editDesignationDropdown = this.editMemberModal.locator("xpath=//label[contains(normalize-space(),'Designation')]/ancestor::div[contains(@class,'row')][1]//input[@role='combobox']");
        this.saveChangesButton = this.editMemberModal.getByRole('button', { name: 'Save Changes' });
        this.deleteMemberModal = page.locator('.modal.show');
        this.deleteMemberModalTitle = this.deleteMemberModal.getByText('Are you sure you want to delete this member?');
        this.confirmDeleteButton = this.deleteMemberModal.getByRole('button', { name: 'Yes' });
        this.dropdownMenu = page.locator('[class*="menu"]').filter({ visible: true }).first();
    }

    // ✅ public — used in both page object methods and test file
    public getProjectCard(projectName: string): Locator {
        return this.page.locator(`//h2//span[normalize-space()='${projectName}']/../../..`);
    }

    // ✅ public — expands the project card accordion, used in test file
    public async expandProjectCard(projectName: string): Promise<void> {
        await this.getProjectCard(projectName).locator('button.accordion-button').click({ force: true });
    }

    // ✅ public — returns member row inside a project card, used in test file
    public getMemberRowInCard(projectName: string, memberName: string): Locator {
        return this.getProjectCard(projectName).locator('tbody tr').filter({ hasText: memberName });
    }

    // ✅ public — asserts member text visible inside a project card, used in test file
    public async verifyMemberVisibleInCard(projectName: string, memberName: string): Promise<void> {
        await expect(this.getProjectCard(projectName).locator(`text=${memberName}`).first()).toBeVisible();
    }

    // ✅ private — only used internally inside this class
    private getEmployeeRow(projectName: string, employeeName: string): Locator {
        return this.getProjectCard(projectName).locator('tbody tr').filter({ hasText: employeeName }).first();
    }

    async navigateToMyProjects(): Promise<void> {
        await this.myProjectsTab.click();
        await this.waitforLoaderToDisappear();
    }

    async searchProject(projectName: string): Promise<void> {
        await this.searchInput.fill(projectName);
        await this.waitforLoaderToDisappear();
    }

    async verifyProjectInList(projectName: string): Promise<void> {
        const project = this.projectsList.filter({ hasText: projectName });
        await expect(project).toHaveCount(1);
    }

    async getTotalProjectsAssigned(): Promise<number> {
        const totalText = await this.totalProjectAssign.textContent();
        return parseInt(totalText || '0', 10);
    }

    async navigateToTeammembers(projectName: string): Promise<void> {
        const teamMembersButton = this.page.locator(`//h2//span[text()='${projectName}']/../../..//div//button[text()='Team Members']`);
        await teamMembersButton.scrollIntoViewIfNeeded();
        await teamMembersButton.click();
        await this.waitforLoaderToDisappear();
    }

    async navigateToShadowTeammembers(projectName: string): Promise<void> {
        const shadowMembersButton = this.page.locator(`//h2//span[text()='${projectName}']/../../..//div//button[text()='Shadow Team Members']`);
        await shadowMembersButton.scrollIntoViewIfNeeded();
        // Use page.evaluate click to avoid pointer interception by floating widgets (datepickers etc.)
        await shadowMembersButton.evaluate((element) => {
            (element as HTMLElement).click();
        });
        await this.waitforLoaderToDisappear();
    }

    async selectDropdownOption(dropdown: Locator, optionText: string): Promise<void> {
        await dropdown.click();
        await dropdown.fill(optionText);
        await this.dropdownMenu.waitFor({ state: 'visible', timeout: 10000 });
        const option = this.page.getByText(optionText, { exact: true }).last();
        await option.waitFor({ state: 'visible', timeout: 10000 });
        await option.click({ force: true });
    }

    async editTeamMemberDesignation(projectName: string, employeeName: string, designation: string): Promise<void> {
        const projectCard = this.getProjectCard(projectName);
        await expect(projectCard).toBeVisible();

        const editLink = this.getEmployeeRow(projectName, employeeName).getByText('Edit', { exact: true }).first();
        await editLink.scrollIntoViewIfNeeded();
        await editLink.click({ force: true });

        await expect(this.editMemberModalTitle).toBeVisible();
        await this.editDesignationControl.click();
        await this.selectDropdownOption(this.editDesignationDropdown, designation);
        await this.saveChangesButton.click();
        await this.waitforLoaderToDisappear();
    }

    async deleteTeamMember(projectName: string, employeeName: string): Promise<void> {
        const projectCard = this.getProjectCard(projectName);
        await expect(projectCard).toBeVisible();

        const memberRow = this.getEmployeeRow(projectName, employeeName);
        await expect(memberRow).toBeVisible();

        const deleteLink = memberRow.getByText('Delete', { exact: true }).first();
        await deleteLink.scrollIntoViewIfNeeded();
        await deleteLink.click({ force: true });

        await expect(this.deleteMemberModalTitle).toBeVisible();
        await this.confirmDeleteButton.click();
        await this.waitforLoaderToDisappear();
    }
}