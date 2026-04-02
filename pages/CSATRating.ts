import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './Basepage';

export class CSATRatingPage extends BasePage {
  readonly projectTeamFlow: Locator;
  readonly csatRatingHeader: Locator;
  readonly filterByPlaceholder: Locator;
  readonly projectOption: Locator;
  readonly projectAndEmployeeNamePlaceholder: Locator;
  readonly projectFilterOption: Locator;
  readonly employeeFilterOption: Locator;
  readonly employeeOption: Locator;

  constructor(page: Page) {
    super(page);
    this.projectTeamFlow = page.getByText("Project TeamFlow");
    this.csatRatingHeader = page.locator('//a[normalize-space()="CSAT Rating"]');

    this.filterByPlaceholder = page.locator('#react-select-2-input');

    this.projectFilterOption = page.locator('#react-select-2-option-0');
    this.employeeFilterOption = page.locator('#react-select-2-option-1');

    this.projectAndEmployeeNamePlaceholder = page.locator('#react-select-3-input');
    this.projectOption = page.locator('#react-select-3-option-23');

    this.employeeOption = page.locator('#react-select-3-option-2');

  }

  async openCSATRatingPage(): Promise<void> {
    await this.projectTeamFlow.click();
    await this.csatRatingHeader.click();
  }

  async selectProject(projectName: string): Promise<void> {
    await this.filterByPlaceholder.click();
    await this.projectFilterOption.click();
    await this.projectAndEmployeeNamePlaceholder.click();
    const option = this.projectOption.filter({ hasText: projectName }).first();
    await option.click();
    await this.waitforLoaderToDisappear();
  }

  async verifyTeamMemberVisible(teamMemberName: string): Promise<void> {
    const memberLocator = this.page.getByText(teamMemberName, { exact: true });
    await expect(memberLocator.first()).toBeVisible({ timeout: 10000 });
  }

  async selectEmployee(employeeName: string): Promise<void> {
    await this.filterByPlaceholder.click();
    await this.employeeFilterOption.click();
    await this.projectAndEmployeeNamePlaceholder.click();
    const employeeOption = this.employeeOption.filter({ hasText: employeeName }).first();
    await employeeOption.click();
    await this.waitforLoaderToDisappear();
  }

  async verifyProjectVisible(projectName: string): Promise<void> {
    const memberLocator = this.page.getByText(projectName, { exact: true });
    await expect(memberLocator.first()).toBeVisible({ timeout: 10000 });
  }


}
