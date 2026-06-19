import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./Basepage";

export class MyTimesheets extends BasePage {
  readonly header: Locator;
  readonly dailyTimeEntrySection: Locator;
  readonly previousDayButton: Locator;
  readonly nextDayButton: Locator;

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
  }

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

  private formatDailyTimeEntryDate(date: Date): string {
    const weekday = date.toLocaleString("en-US", { weekday: "short" });
    const shortMonth = date.toLocaleString("en-US", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();

    return `${weekday}, ${shortMonth} ${day}, ${year}`;
  }
}
