import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./Basepage";

type DailyEntryDropdown = "category" | "minutes" | "status";
type RequiredAddEntryField = "project" | "category" | "taskDescription" | "hours";

export interface TimesheetEntryExpectation {
  project: string;
  category: string;
  taskDescription: string;
  hours: string;
  minutes: string;
  workStream?: string;
  status?: string;
}

export class MyTimesheets extends BasePage {
  private readonly header: Locator;
  private readonly dailyTimeEntrySection: Locator;
  private readonly previousDayButton: Locator;
  private readonly nextDayButton: Locator;
  private readonly projectDropdown: Locator;
  private readonly categoryDropdown: Locator;
  private readonly taskDescriptionTextArea: Locator;
  private readonly hoursInput: Locator;
  private readonly minutesDropdown: Locator;
  private readonly statusDropdown: Locator;
  private readonly addEntryButton: Locator;
  private readonly submitTimesheetButton: Locator;
  private readonly timesheetEntriesTable: Locator;
  private readonly editEntryButton: Locator;
  private readonly editEntryModal: Locator;
  private readonly editTaskDescriptionTextArea: Locator;
  private readonly saveChangesButton: Locator;
  private readonly removeEntryButton: Locator;
  private readonly requiredFieldError: Locator;
  private readonly visibleDropdownOptions: Locator;

  constructor(page: Page) {
    super(page);

    this.header = page.locator("h2.heading-lg");
    this.dailyTimeEntrySection = page
      .locator("[class*='timesheet-entry-card']")
      .filter({ hasText: "Daily Time Entry" })
      .or(
        page
          .locator("section, article, div")
          .filter({ hasText: "Daily Time Entry" })
      )
      .first();
    this.previousDayButton = page.getByRole("button", { name: "Previous day" });
    this.nextDayButton = page.getByRole("button", { name: "Next day" });
    this.projectDropdown = page.locator(
      "#timesheet-add-entry-form-project-trigger"
    );
    this.categoryDropdown = page.locator(
      "#timesheet-add-entry-form-category-trigger"
    );
    this.taskDescriptionTextArea = page.locator(
      "#timesheet-add-entry-form-description"
    );
    this.hoursInput = page.locator("#timesheet-add-entry-form-hours");
    this.minutesDropdown = page.locator(
      "#timesheet-add-entry-form-minutes-trigger"
    );
    this.statusDropdown = page.locator(
      "#timesheet-add-entry-form-status-trigger"
    );
    this.addEntryButton = page.locator(
      'button[class*="add-new-entry-card_button"]'
    );
    this.submitTimesheetButton = page.locator(
      'button[class*="button_accent"]'
    ).filter({ hasText: "Submit Timesheet for Approval" });
    this.timesheetEntriesTable = page.locator(
      'table[class*="responsive-table_table"][aria-label="Timesheet entries"]'
    );
    this.editEntryButton = page.getByRole("button", { name: "Edit entry" });
    this.editEntryModal = page.locator('div[role="dialog"]').filter({
      has: page.locator("#timesheet-edit-entry-form"),
    });
    this.editTaskDescriptionTextArea = page.locator(
      "#timesheet-edit-entry-form-description"
    );
    this.saveChangesButton = page.getByRole("button", { name: "Save Changes" });
    this.removeEntryButton = page.getByRole("button", { name: "Remove entry" });
    this.requiredFieldError = page.locator(
      '[class*="timesheet-entry-form_error"]'
    ).filter({ hasText: "Required" });
    this.visibleDropdownOptions = page.locator(
      [
        "[role='option']:visible",
        "[role='listbox']:visible [role='option']",
        "[role='listbox']:visible li",
        "[role='listbox']:visible div",
        "[id*='listbox']:visible [role='option']",
        "[id*='listbox']:visible li",
        "[id*='listbox']:visible div",
      ].join(", ")
    );
  }

  // Page load and date navigation
  async waitForMyTimesheetsPage(): Promise<void> {
    await this.waitforLoaderToDisappear();
    await expect(this.header).toHaveText("My Timesheets");
  }

  async verifyDailyTimeEntryDate(expectedDate: Date = new Date()): Promise<void> {
    await this.waitforLoaderToDisappear();
    await expect(this.dailyTimeEntrySection).toBeVisible();

    const sectionText = await this.dailyTimeEntrySection.innerText();
    const expectedDateText = this.formatDailyTimeEntryDate(expectedDate);

    expect(sectionText).toContain(expectedDateText);
  }

  async getDailyTimeEntryText(): Promise<string> {
    await this.waitforLoaderToDisappear();
    await expect(this.dailyTimeEntrySection).toBeVisible();
    return (await this.dailyTimeEntrySection.innerText()).trim();
  }

  async clickPreviousDay(): Promise<void> {
    await this.previousDayButton.waitFor({ state: "visible" });
    await this.previousDayButton.click();
    await this.waitforLoaderToDisappear();
  }

  async clickNextDay(): Promise<void> {
    await this.nextDayButton.waitFor({ state: "visible" });
    await this.nextDayButton.click();
    await this.waitforLoaderToDisappear();
  }

  // Daily Time Entry form
  async verifyProjectDropdownHasAvailableProjects(): Promise<void> {
    await this.openDropdown(this.projectDropdown);
    await expect(this.visibleDropdownOptions.first()).toBeVisible();
    expect(await this.visibleDropdownOptions.count()).toBeGreaterThan(0);
  }

  async selectFirstAvailableProject(): Promise<string> {
    await this.openDropdownIfClosed(this.projectDropdown);
    const firstProject = this.visibleDropdownOptions.first();
    const projectName = (await firstProject.innerText()).trim();

    await firstProject.click();
    await expect(this.projectDropdown).toContainText(projectName);
    return projectName;
  }

  async selectCategory(categoryName: string): Promise<void> {
    await this.selectDropdownOption("category", categoryName);
  }

  async fillTaskDescription(description: string): Promise<void> {
    await this.taskDescriptionTextArea.click();
    await this.taskDescriptionTextArea.fill(description);
  }

  async verifyTaskDescription(description: string): Promise<void> {
    await expect(this.taskDescriptionTextArea).toHaveValue(description);
  }

  async fillHours(hours: string): Promise<void> {
    await this.hoursInput.click();
    await this.hoursInput.fill(hours);
  }

  async verifyHours(hours: string): Promise<void> {
    await expect(this.hoursInput).toHaveValue(hours);
  }

  async selectMinutes(minutes: string): Promise<void> {
    await this.selectDropdownOption("minutes", minutes);
  }

  async selectStatus(status: string): Promise<void> {
    await this.selectDropdownOption("status", status);
  }

  async clickAddEntry(): Promise<void> {
    await expect(this.addEntryButton).toBeVisible();
    await this.addEntryButton.click();
    await this.waitforLoaderToDisappear();
  }

  //checks the error inside that field’s container
  async verifyRequiredErrorForField(field: RequiredAddEntryField): Promise<void> {
    await expect(
      this.getAddEntryFieldContainer(field).locator(this.requiredFieldError)
    ).toBeVisible();
  }

  //Runs the check for all four fields, confirms the message is tied to the right field
  async verifyRequiredErrorsForEmptyAddEntryForm(): Promise<void> {
    const requiredFields: RequiredAddEntryField[] = [
      "project",
      "category",
      "taskDescription",
      "hours",
    ];

    for (const field of requiredFields) {
      await this.verifyRequiredErrorForField(field);
    }
  }

  async verifyTimesheetEntriesTableVisible(): Promise<void> {
    await expect(this.timesheetEntriesTable).toBeVisible();
  }

  async verifyTimesheetEntryInTable(
    expected: TimesheetEntryExpectation
  ): Promise<void> {
    const workStream = expected.workStream ?? "—";
    const status = expected.status ?? "In-progress";
    const paddedMinutes = expected.minutes.padStart(2, "0");

    await this.verifyTimesheetEntriesTableVisible();

    const entryRow = this.getTimesheetEntryRow(expected.taskDescription);

    await expect(entryRow).toBeVisible();

    await expect(
      entryRow.locator('[class*="timesheet-data-table_projectName"]')
    ).toHaveText(expected.project);

    await expect(entryRow.locator("td").nth(1)).toHaveText(workStream);

    await expect(
      entryRow.locator('[class*="task-category-label_categoryLabel"]')
    ).toHaveText(expected.category);

    await expect(
      entryRow.locator('[class*="timesheet-data-table_descriptionCell"]')
    ).toHaveText(expected.taskDescription);

    const timeValue = entryRow.locator(
      '[class*="timesheet-data-table_timeValue"]'
    );
    await expect(timeValue.locator("strong").nth(0)).toHaveText(expected.hours);
    await expect(timeValue.locator("strong").nth(1)).toHaveText(paddedMinutes);

    await expect(
      entryRow.locator(
        '[class*="timesheet-data-table_statusWrapper"] [class*="badge"]'
      )
    ).toHaveText(status);
  }

  async clickEditEntry(taskDescription: string): Promise<void> {
    const entryRow = this.getTimesheetEntryRow(taskDescription);
    await entryRow.locator(this.editEntryButton).click();
    await this.waitForEditEntryModal();
  }

  async waitForEditEntryModal(): Promise<void> {
    await expect(this.editEntryModal).toBeVisible();
    await expect(
      this.editEntryModal.getByRole("heading", { name: "Edit Timesheet Entry" })
    ).toBeVisible();
  }

  async fillEditTaskDescription(description: string): Promise<void> {
    await this.editTaskDescriptionTextArea.click();
    await this.editTaskDescriptionTextArea.fill(description);
    await expect(this.editTaskDescriptionTextArea).toHaveValue(description);
  }

  async clickSaveChanges(): Promise<void> {
    await expect(this.saveChangesButton).toBeEnabled();
    await this.saveChangesButton.click();
    await this.waitforLoaderToDisappear();
    await expect(this.editEntryModal).toBeHidden();
  }

  async clickRemoveEntry(taskDescription: string): Promise<void> {
    const entryRow = this.getTimesheetEntryRow(taskDescription);
    await entryRow.locator(this.removeEntryButton).click();
    await this.waitforLoaderToDisappear();
  }

  async verifyTimesheetEntryRemoved(taskDescription: string): Promise<void> {
    await expect(this.getTimesheetEntryRow(taskDescription)).toBeHidden();
  }

  async clickSubmitTimesheetForApproval(): Promise<void> {
    await expect(this.submitTimesheetButton).toBeVisible();
    await this.submitTimesheetButton.click();
    await this.waitforLoaderToDisappear();
    await this.page.waitForTimeout(5000);
  }

  async verifyDropdownSelectedValue(
    dropdown: DailyEntryDropdown,
    value: string
  ): Promise<void> {
    await expect(this.getDropdownLocator(dropdown)).toContainText(value);
  }

  private async selectDropdownOption(
    dropdown: DailyEntryDropdown,
    optionText: string
  ): Promise<void> {
    const dropdownLocator = this.getDropdownLocator(dropdown);

    await this.openDropdown(dropdownLocator);
    await this.visibleDropdownOptions
      .getByText(optionText, { exact: true })
      .click();
    await expect(dropdownLocator).toContainText(optionText);
  }

  private async openDropdown(dropdown: Locator): Promise<void> {
    await dropdown.waitFor({ state: "visible" });
    await dropdown.click();
    await expect(dropdown).toHaveAttribute("aria-expanded", "true");
    await expect(this.visibleDropdownOptions.first()).toBeVisible();
  }

  private async openDropdownIfClosed(dropdown: Locator): Promise<void> {
    const isExpanded = await dropdown
      .getAttribute("aria-expanded")
      .then((value) => value === "true");

    if (!isExpanded) {
      await this.openDropdown(dropdown);
    }
  }

  private getDropdownLocator(dropdown: DailyEntryDropdown): Locator {
    const dropdowns: Record<DailyEntryDropdown, Locator> = {
      category: this.categoryDropdown,
      minutes: this.minutesDropdown,
      status: this.statusDropdown,
    };

    return dropdowns[dropdown];
  }

  private getAddEntryFieldContainer(field: RequiredAddEntryField): Locator {
    const fieldLocators: Record<RequiredAddEntryField, Locator> = {
      project: this.projectDropdown,
      category: this.categoryDropdown,
      taskDescription: this.taskDescriptionTextArea,
      hours: this.hoursInput,
    };

    return this.page
      .locator(
        [
          '[class*="timesheet-entry-form_field"]',
          '[class*="timesheet-entry-form_fieldLarge"]',
          '[class*="timesheet-entry-form_fieldSmall"]',
        ].join(", ")
      )
      .filter({ has: fieldLocators[field] })
      .first();
  }

  private getTimesheetEntryRow(taskDescription: string): Locator {
    return this.timesheetEntriesTable
      .locator("tbody tr")
      .filter({ hasText: taskDescription })
      .first();
  }

  private formatDailyTimeEntryDate(date: Date): string {
    const weekday = date.toLocaleString("en-US", { weekday: "short" });
    const shortMonth = date.toLocaleString("en-US", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();

    return `${weekday}, ${shortMonth} ${day}, ${year}`;
  }
}
