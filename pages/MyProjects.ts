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
    async navigateToTeammembers(projectName : string): Promise<void> {
        const teamMembersButton = this.page.locator(`//h2//span[text()='${projectName}']/../../..//div//button[text()='Team Members']`);
        await teamMembersButton.scrollIntoViewIfNeeded();
        await teamMembersButton.evaluate((element) => {
            (element as HTMLElement).click();
        });
        await this.waitforLoaderToDisappear();
    }
    async navigateToShadowTeammembers(projectName: string): Promise<void> {
        const shadowMembersButton = this.page.locator(`//h2//span[text()='${projectName}']/../../..//div//button[text()='Shadow Team Members']`);
        await shadowMembersButton.scrollIntoViewIfNeeded();
        await shadowMembersButton.evaluate((element) => {
            (element as HTMLElement).click();
        });
        await this.waitforLoaderToDisappear();
    }

    async selectDropdownOption(dropdown: Locator, optionText: string): Promise<void> {
        await dropdown.click();
        await this.page.waitForTimeout(500);
        await dropdown.fill(optionText);
        await this.page.waitForTimeout(500);
        await this.page.locator('[class*="menu"]').filter({ visible: true }).first().waitFor({ state: 'visible', timeout: 10000 });
        const option = this.page.getByText(optionText, { exact: true }).last();
        await option.waitFor({ state: 'visible', timeout: 10000 });
        await option.click({ force: true });
        await this.page.waitForTimeout(500);
    }

    async editTeamMemberDesignation(projectName: string, employeeName: string, designation: string): Promise<void> {
        const projectCard = this.page.locator(`//h2//span[normalize-space()='${projectName}']/../../..`);
        await expect(projectCard).toBeVisible();

        const editLink = projectCard.locator('tbody tr').filter({ hasText: employeeName }).getByText('Edit', { exact: true }).first();
        await editLink.scrollIntoViewIfNeeded();
        await editLink.click({ force: true });

        await expect(this.editMemberModalTitle).toBeVisible();
        await this.editDesignationControl.click();
        await this.selectDropdownOption(this.editDesignationDropdown, designation);
        await this.saveChangesButton.click();
        await this.waitforLoaderToDisappear();
    }

    async deleteTeamMember(projectName: string, employeeName: string): Promise<void> {
        const projectCard = this.page.locator(`//h2//span[normalize-space()='${projectName}']/../../..`);
        await expect(projectCard).toBeVisible();

        const memberRow = projectCard.locator('tbody tr').filter({ hasText: employeeName }).first();
        await expect(memberRow).toBeVisible();

        const deleteLink = memberRow.getByText('Delete', { exact: true }).first();
        await deleteLink.scrollIntoViewIfNeeded();
        await deleteLink.click({ force: true });

        await expect(this.deleteMemberModalTitle).toBeVisible();
        await this.confirmDeleteButton.click();
        await this.waitforLoaderToDisappear();
    }
    


}