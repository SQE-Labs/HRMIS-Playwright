import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './Basepage'

export class ProjectReport extends BasePage {

    public projectReportTab: Locator
    public projectNameDropdown: Locator
    public projectTable: Locator
    public filterByDropdown: Locator
    public projectName: Locator
    public projectn: Locator
    public downloadButton: Locator

    constructor(page: Page) {
        super(page)
        this.projectReportTab = page.locator("//a[text()='Project Report']")
        this.filterByDropdown = page.locator("#filter")
        this.projectNameDropdown = page.locator("#secondDropdown")
        this.projectTable = page.locator("table")
        this.projectName = page.locator("//div[text()='Project Name']");
        this.projectn = page.locator("//div[text()='%s']");
        this.downloadButton = page.locator("//button[contains(text(),'Download')]");
    }

    async navigateToProjectReport(): Promise<void> {
        await this.projectReportTab.click()
        await this.waitforLoaderToDisappear();
    }

    async selectProjectByName(projectName: string): Promise<void> {
        await this.projectNameDropdown.click();
        await this.projectNameDropdown.selectOption(projectName);
        await this.waitforLoaderToDisappear();
    }

    async filterByProjectName(): Promise<void> {
        await this.filterByDropdown.click();
        await this.filterByDropdown.selectOption("Project Name");
        await this.waitforLoaderToDisappear();
    }
    async clickDownloadButton(): Promise<void> {
        await this.downloadButton.waitFor({ state: 'visible' });
        await this.downloadButton.click();
    }
}
