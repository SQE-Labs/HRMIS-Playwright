import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './Basepage'

export class MyProjects extends BasePage {

    public myProjectsTab: Locator;
    public projectHeader: Locator;
    public searchInput: Locator;
    public projectsList: Locator;
    public totalProjectAssign: Locator;
   

    constructor(page: Page) {
        super(page);

        this.myProjectsTab = page.locator("//a[text()='My Projects']");
        this.projectHeader = page.locator("h1:has-text('My Projects')");
        this.searchInput = page.locator("input[placeholder='Search By Project Name']");
        this.projectsList = page.locator(".project-accordion-item");
        this.totalProjectAssign = page.locator(".total span");
       
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
        await this.page.locator(`//h2//span[text()='${projectName}']/../../..//div//button[text()='Team Members']`).click();
        await this.waitforLoaderToDisappear();
    }
    async navigateToShadowTeammembers(projectName: string): Promise<void> {
        await this.page.locator(`//h2//span[text()='${projectName}']/../../..//div//button[text()='Shadow Team Members']`).click();
        await this.waitforLoaderToDisappear();
    }
    


}