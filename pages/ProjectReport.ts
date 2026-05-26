import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './Basepage'
import { AssetHelper } from '../utils/AssetHelpers'

export class ProjectReport extends BasePage {

    public projectReportTab: Locator
    public reportCard: Locator
    public filterCard: Locator
    public filterLabel: Locator
    public projectNameDropdown: Locator
    public projectTable: Locator
    public filterByDropdown: Locator
    public projectName: Locator
    public projectn: Locator
    public downloadButton: Locator

    constructor(page: Page) {
        super(page)
        this.projectReportTab = page.getByRole('link', { name: 'Project Report', exact: true })
        this.reportCard = page.locator("div.report-card")
        this.filterCard = page.locator("div.report-card .p-3.mb-3.rounded-lg")
        this.filterLabel = page.locator("div.report-card label").filter({ hasText: 'Select Filter' })
        this.filterByDropdown = page.locator("select#filter")
        this.projectNameDropdown = page.locator("select#secondDropdown")
        this.projectTable = page.locator("table")
        this.projectName = page.locator("//div[text()='Project Name']");
        this.projectn = page.locator("//div[text()='%s']");
        this.downloadButton = page.locator("button.theme-button");
    }

    async navigateToProjectReport(): Promise<void> {
        await AssetHelper.expandIfCollapsed(this.page.getByRole('button', { name: 'Project TeamFlow' }));
        await this.projectReportTab.waitFor({ state: 'visible' });
        await this.projectReportTab.click()
        await this.waitforLoaderToDisappear();
    }

    async selectProjectByName(projectName: string): Promise<void> {
        await this.projectNameDropdown.selectOption({ label: projectName });
        await this.waitforLoaderToDisappear();
    }

    async filterByProjectName(): Promise<void> {
        await this.filterByDropdown.selectOption({ label: "Project Name" });
        await this.waitforLoaderToDisappear();
    }
    async clickDownloadButton(): Promise<void> {
        await this.downloadButton.waitFor({ state: 'visible' });
        await this.downloadButton.click();
    }
}
