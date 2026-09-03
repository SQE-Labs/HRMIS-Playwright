import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './Basepage';

export class MyProfilePage extends BasePage {
  private accountMenuButton: Locator;
  private myProfileLink: Locator;
  private basicInfoButton: Locator;

  constructor(page: Page) {
    super(page);
    this.accountMenuButton = page.getByRole('button', { name: /Account menu/i });
    this.myProfileLink = page.getByText('My Profile', { exact: true });
    this.basicInfoButton = page.getByRole('button', { name: 'Basic info' });
  }

  async openMyProfile(): Promise<void> {
    if (await this.myProfileLink.isVisible().catch(() => false)) {
      return;
    }

    await this.accountMenuButton.click();
    await expect(this.myProfileLink).toBeVisible();
    await this.myProfileLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  private async ensureBasicInfoExpanded(): Promise<void> {
    const expanded = await this.basicInfoButton.getAttribute('aria-expanded').catch(() => null);
    if (expanded !== 'true') {
      await this.basicInfoButton.click();
    }
  }

  async getCompanyName(): Promise<string> {
    await this.openMyProfile();
    await this.ensureBasicInfoExpanded();

    const companyLabel = this.page.getByText('Company Name', { exact: true }).first();
    await companyLabel.waitFor({ state: 'visible', timeout: 10000 });

    const companyValue = companyLabel.locator('xpath=following-sibling::*[1]');
    const siblingText = (await companyValue.textContent().catch(() => null))?.trim() || '';
    if (siblingText) {
      return siblingText;
    }

    const profileText = await this.page.locator('main').innerText();
    const match = profileText.match(/Company Name\s+([^\n]+)/i);
    if (match?.[1]) {
      return match[1].trim();
    }

    throw new Error('Unable to read Company Name from My Profile page.');
  }

  async validateCompanyName(
    expectedCompanyName: string,
    country: string,
    role: string,
    userIdentifier: string
  ): Promise<void> {
    const actualCompanyName = await this.getCompanyName();

    try {
      expect(actualCompanyName).toBe(expectedCompanyName);
    } catch {
      throw new Error(
        `Company mismatch after login. Country: ${country}. Role: ${role}. User: ${userIdentifier}. Expected Company: ${expectedCompanyName}. Actual Company: ${actualCompanyName}.`
      );
    }
  }
}