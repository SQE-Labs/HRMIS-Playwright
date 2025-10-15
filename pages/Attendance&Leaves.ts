import { Page, Locator } from '@playwright/test';
import { BasePage } from './Basepage';
import { AssetHelper } from "../utils/AssetHelpers";

export class AttendanceLeaveTab extends BasePage{
    static navigateToAttendanceTab(arg0: string) {
        throw new Error('Method not implemented.');
    }
      public attendanceLeave: Locator;
      private subTabs: Locator;

       // Locators
  constructor(page: Page) {
    super(page);
    this.page = page;

    this.attendanceLeave = page.getByText('Attendance & Leaves')
    this.subTabs = page.locator("//a[text()='Attendance & Leaves']/../ul/li")
  }
   async expandAttendanceAndLeaveTab(): Promise<void> {
    await AssetHelper.expandIfCollapsed(this.attendanceLeave);
  }
  async isExpanded(): Promise<boolean> {
    return await AssetHelper.isExpanded(this.attendanceLeave);
  }

  async verifySubTabs(subTabsTitles: string[]): Promise<boolean> {
    const titles = await this.subTabs.allTextContents();
    console.debug(titles);

    for (let i = 0; i < subTabsTitles.length; i++) {
      if (!titles[i]?.includes(subTabsTitles[i])) {
        console.debug(`Mismatch at index ${i}: Expected "${subTabsTitles[i]}", but got "${titles[i]}"`);
        return false;
      }
    }

    return true;
  }

   async collapseAttendanceLeaveTab(): Promise<void> {
    await AssetHelper.collapseIfExpanded(this.attendanceLeave);
  }

  async isCollapsed(): Promise<boolean> {
    return await AssetHelper.isCollapsed(this.attendanceLeave);
  }


  // Navigating to the sub tabs under the Attendance&Leave tab
   async navigateToAttendanceTab(tabName: string): Promise<void> {
    await this.attendanceLeave.click();
    await this.page.getByRole('link', { name: tabName }).click();
    
  }

}