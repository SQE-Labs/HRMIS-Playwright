import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './Basepage'

export class ProjectReport extends BasePage {

    public projectReportTab: Locator
    private projectNameDropdown: Locator
    private projectTable: Locator
    private filterByDropdown: Locator
    private projectName: Locator
    private projectn: Locator
    private downloadButton: Locator

    constructor(page: Page) {
        super(page)
        this.projectReportTab = page.locator("//a[text()='Project Report']")
        this.filterByDropdown = page.locator("(//input[@id='react-select-2-input'])[1]")
        this.projectNameDropdown = page.locator("(//input[@id='react-select-3-input'])[1]")
        this.projectTable = page.locator("table")
        this.projectName = page.locator("//div[text()='Project Name']");
        this.projectn = page.locator("//div[text()='%s']");
        this.downloadButton = page.locator("//button[contains(text(),'Download')]");
    }

    async navigateToProjectReport(): Promise<void> {
        await this.projectReportTab.click()
        // await expect(this.projectNameDropdown).toBeVisible()
    }

    async selectProjectByName(projectName: string): Promise<void> {
        await this.projectNameDropdown.click()
        const projectOption = this.page.locator(`//div[text()='${projectName}']`)
        await projectOption.click();

    }

    async filterByProjectName(): Promise<void> {
        await this.filterByDropdown.first().click()
        await this.projectName.click();
    }

    getProjectTable() {
        return this.projectTable
    }

    async clickDownloadButton(): Promise<void> {
        await this.downloadButton.waitFor({ state: 'visible' });
        await this.downloadButton.click();
    }
}
