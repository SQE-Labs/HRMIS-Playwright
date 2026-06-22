import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./Basepage";

type DailyEntryDropdown = "category" | "minutes" | "status";

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

  async selectFirstAvailableProject(): Promise<void> {
    await this.openDropdownIfClosed(this.projectDropdown);
    const firstProject = this.visibleDropdownOptions.first();
    const projectName = (await firstProject.innerText()).trim();

    await firstProject.click();
    await expect(this.projectDropdown).toContainText(projectName);
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

  private formatDailyTimeEntryDate(date: Date): string {
    const weekday = date.toLocaleString("en-US", { weekday: "short" });
    const shortMonth = date.toLocaleString("en-US", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();

    return `${weekday}, ${shortMonth} ${day}, ${year}`;
  }
}
