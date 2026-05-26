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
  readonly addCSATEmployeeFilterOption: Locator;
  readonly addCSATProjectAccordionButton: Locator;
  readonly addCSATExpandedAccordion: Locator;
  readonly addCSATCancelButton: Locator;

  readonly addCSATProjectOption: Locator;
  // readonly addCSATEmployeeOption: Locator;

  readonly addCSATEmployeeCheckBox: Locator;
  readonly addCSATNextButton: Locator;
  readonly addCSATRatingInput: Locator;
  readonly addCSATAddRatingButton: Locator;
  readonly addCSATToastMsg: Locator;

  constructor(page: Page) {
    super(page);
    this.projectTeamFlow = page.getByRole('button', { name: 'Project TeamFlow' });
    this.csatRatingHeader = page.getByRole('navigation').getByRole('link', { name: 'CSAT Rating' });

    this.manageFilterByPlaceholder = page.locator('div.csat-rating-filters-card').getByRole('combobox').first();
    this.manageProjectFilterOption = page.getByText('Project Name', { exact: true });
    this.manageEmployeeFilterOption = page.getByText('Employee Name', { exact: true });

    this.manageProjectAndEmployeeNamePlaceholder = page.locator('div.csat-rating-filters-card').getByRole('combobox').nth(1);
    this.manageProjectOption = page.getByText('', { exact: false });

    this.manageEmployeeOption = page.getByText('', { exact: false });

    this.manageEditIcon = page.locator('tr', { hasText: 'Vishal Dev Thakur' }).first().getByText('Edit');

    this.manageRatingInput = page.locator('tr', { hasText: 'Vishal Dev Thakur' }).first().locator('input');

    this.manageUpdateIcon = page.locator('tr', { hasText: 'Vishal Dev Thakur' }).first().getByText('Update');
    this.manageToastMsg = page.getByRole('alert');

    this.addCSATButton = page.getByRole('tab', { name: 'Add CSAT Ratings' });
    this.addCSATFilterByPlaceholder = page.locator('div.csat-rating-filters-card').getByRole('combobox').first();
    this.addCSATProjectAndEmployeeNamePlaceholder = page.locator('div.csat-rating-filters-card').getByRole('combobox').nth(1);

    this.addCSATProjectFilterOption = page.getByText('Project Name', { exact: true });
    this.addCSATEmployeeFilterOption = page.locator('#react-select-4-option-1');
    this.addCSATProjectAccordionButton = page.locator('div.accordion-item.project-accordion-item h2.accordion-header button.accordion-button').first();
    this.addCSATExpandedAccordion = page.locator('div.accordion-collapse.show');
    this.addCSATCancelButton = page.getByRole('button', { name: 'Cancel' });

    this.addCSATProjectOption = page.getByText('', { exact: false });
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
    const option = this.page.getByText(projectName, { exact: true }).last();
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
    const employeeOption = this.page.getByText(employeeName, { exact: true }).last();
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
    await this.addCSATProjectAndEmployeeNamePlaceholder.fill(projectName);
    await this.page.waitForTimeout(500);
    const option = this.page.getByText(projectName, { exact: true }).last();
    await expect(option).toBeVisible({ timeout: 5000 });
    await option.click();
    await this.addCSATEmployeeCheckBox.check();
    await this.addCSATNextButton.click();
    await this.addCSATRatingInput.fill(inputRating.toString());
    await this.addCSATAddRatingButton.click();
    await expect(this.addCSATToastMsg).toHaveText('CSAT created successfully.', { timeout: 5000 });
  }

  async addCSATSelectEmployee(employeeName: string, inputRating: number): Promise<void> {
    await this.addCSATButton.click();
    await this.addCSATFilterByPlaceholder.click();
    await this.addCSATEmployeeFilterOption.click();
    await this.addCSATProjectAndEmployeeNamePlaceholder.click();
    await this.addCSATProjectAndEmployeeNamePlaceholder.fill(employeeName);
    await this.page.waitForTimeout(500);
    const option = this.page.getByText(employeeName, { exact: true }).last();
    await expect(option).toBeVisible({ timeout: 5000 });
    await option.click();
    await this.waitforLoaderToDisappear();
    await this.addCSATProjectAccordionButton.click();
    const employeeCheckBox = this.addCSATExpandedAccordion.getByText(employeeName, { exact: true }).locator('xpath=ancestor::tr[1]/td[1]/input');
    await employeeCheckBox.check();
    await this.addCSATNextButton.click();
    await this.addCSATRatingInput.fill(inputRating.toString());
    await this.addCSATAddRatingButton.click();
    await expect(this.addCSATToastMsg).toHaveText('CSAT created successfully.', { timeout: 5000 });
  }

  async verifyAddCSATCancelClearsSelections(employeeName: string): Promise<void> {
    await this.addCSATButton.click();
    await this.addCSATFilterByPlaceholder.click();
    await this.addCSATEmployeeFilterOption.click();
    await this.addCSATProjectAndEmployeeNamePlaceholder.click();
    await this.addCSATProjectAndEmployeeNamePlaceholder.fill(employeeName);
    await this.page.waitForTimeout(500);
    const option = this.page.getByText(employeeName, { exact: true }).last();
    await expect(option).toBeVisible({ timeout: 5000 });
    await option.click();
    await this.waitforLoaderToDisappear();
    await this.addCSATProjectAccordionButton.click();

    const employeeCheckBox = this.addCSATExpandedAccordion.locator('tbody tr input[type="checkbox"]').first();

    await employeeCheckBox.check();
    await expect(employeeCheckBox).toBeChecked();

    await this.addCSATCancelButton.click();
    await this.waitforLoaderToDisappear();

    const selectedCheckBoxes = this.page.locator('div.accordion-collapse.show tbody input[type="checkbox"]:checked');
    await expect(selectedCheckBoxes).toHaveCount(0);
  }
}
