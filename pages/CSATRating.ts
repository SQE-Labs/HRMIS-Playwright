import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './Basepage';

export class CSATRatingPage extends BasePage {
  readonly projectTeamFlow: Locator;
  readonly csatRatingHeader: Locator;

  readonly manageFilterByPlaceholder: Locator;
  readonly manageProjectOption: Locator;
  readonly manageEmployeeOption: Locator;

  readonly manageProjectAndEmployeeNamePlaceholder: Locator;
  readonly manageProjectFilterOption: Locator;
  readonly manageEmployeeFilterOption: Locator;
  readonly manageEditIcon: Locator;
  readonly manageRatingInput: Locator;
  readonly manageUpdateIcon: Locator;
  readonly manageToastMsg: Locator;

  readonly addCSATButton: Locator;
  readonly addCSATFilterByPlaceholder: Locator;
  readonly addCSATProjectAndEmployeeNamePlaceholder: Locator;

  readonly addCSATProjectFilterOption: Locator;

  readonly addCSATProjectOption: Locator;
  // readonly addCSATEmployeeOption: Locator;

  readonly addCSATEmployeeCheckBox: Locator;
  readonly addCSATNextButton: Locator;
  readonly addCSATRatingInput: Locator;
  readonly addCSATAddRatingButton: Locator;
  readonly addCSATToastMsg: Locator;

  constructor(page: Page) {
    super(page);
    this.projectTeamFlow = page.getByText("Project TeamFlow");
    this.csatRatingHeader = page.locator('//a[normalize-space()="CSAT Rating"]');

    this.manageFilterByPlaceholder = page.locator('#react-select-2-input');
    this.manageProjectFilterOption = page.locator('#react-select-2-option-0');
    this.manageEmployeeFilterOption = page.locator('#react-select-2-option-1');

    this.manageProjectAndEmployeeNamePlaceholder = page.locator('#react-select-3-input');
    this.manageProjectOption = page.locator('#react-select-3-option-23');

    this.manageEmployeeOption = page.locator('#react-select-3-option-2');

    this.manageEditIcon = page.locator('tr', { hasText: 'Vishal Dev Thakur' }).first().getByText('Edit');

    this.manageRatingInput = page.locator('tr', { hasText: 'Vishal Dev Thakur' }).first().locator('input');

    this.manageUpdateIcon = page.locator('tr', { hasText: 'Vishal Dev Thakur' }).first().getByText('Update');
    this.manageToastMsg = page.getByRole('alert');

    this.addCSATButton = page.getByRole('tab', { name: 'Add CSAT Ratings' });
    this.addCSATFilterByPlaceholder = page.locator('#react-select-4-input');
    this.addCSATProjectAndEmployeeNamePlaceholder = page.locator('#react-select-5-input');

    this.addCSATProjectFilterOption = page.locator('#react-select-4-option-0');

    this.addCSATProjectOption = page.locator('#react-select-5-option-227');
    // this.addCSATEmployeeOption = page.locator('#react-select-4-option-1');

    this.addCSATEmployeeCheckBox = page.locator('tr', { hasText: 'Vishal Dev Thakur' }).nth(0).getByRole('checkbox');
    this.addCSATNextButton = page.getByRole('button', { name: 'Next' });
    this.addCSATRatingInput = page.getByPlaceholder('Enter CSAT Rating');
    this.addCSATAddRatingButton = page.getByRole('button', { name: 'Add Rating' });
    this.addCSATToastMsg = page.getByRole('alert');
  }


  async openCSATRatingPage(): Promise<void> {
    await this.projectTeamFlow.click();
    await this.csatRatingHeader.click();
  }

  async manageSelectProject(projectName: string): Promise<void> {
    await this.manageFilterByPlaceholder.click();
    await this.manageProjectFilterOption.click();
    await this.manageProjectAndEmployeeNamePlaceholder.click();
    const option = this.manageProjectOption.filter({ hasText: projectName }).first();
    await option.click();
    await this.waitforLoaderToDisappear();
  }

  async verifyManageTeamMemberVisible(teamMemberName: string): Promise<void> {
    const memberLocator = this.page.getByText(teamMemberName, { exact: true });
    await expect(memberLocator.first()).toBeVisible({ timeout: 10000 });
  }

  async manageSelectEmployee(employeeName: string): Promise<void> {
    await this.manageFilterByPlaceholder.click();
    await this.manageEmployeeFilterOption.click();
    await this.manageProjectAndEmployeeNamePlaceholder.click();
    const employeeOption = this.manageEmployeeOption.filter({ hasText: employeeName }).first();
    await employeeOption.click();
    await this.waitforLoaderToDisappear();
  }

  async verifyManageProjectVisible(projectName: string): Promise<void> {
    const memberLocator = this.page.getByText(projectName, { exact: true });
    await expect(memberLocator.first()).toBeVisible({ timeout: 10000 });
  }

  async manageUpdateRating(newRating: number): Promise<void> {
    await this.manageEditIcon.click();
    await this.manageRatingInput.fill('');
    await this.manageRatingInput.fill(newRating.toString());
    await this.manageUpdateIcon.click();
    await expect(this.manageToastMsg).toHaveText('CSAT updated successfully.', { timeout: 5000 });
  }


  async addCSATSelectProject(projectName: string, inputRating: number): Promise<void> {
    await this.addCSATButton.click();
    await this.addCSATFilterByPlaceholder.click();
    await this.addCSATProjectFilterOption.click();
    await this.addCSATProjectAndEmployeeNamePlaceholder.click();
    const option = this.addCSATProjectOption.filter({ hasText: projectName }).first();
    await option.click();
    await this.addCSATEmployeeCheckBox.check();
    await this.addCSATNextButton.click();
    await this.addCSATRatingInput.fill(inputRating.toString());
    await this.addCSATAddRatingButton.click();
    await expect(this.addCSATToastMsg).toHaveText('CSAT created successfully.', { timeout: 5000 });
  }
}
