import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './Basepage';

export class MyProfilePage extends BasePage {
  readonly myProfileLink: Locator;
  readonly generalInformationTab: Locator;
  readonly changePasswordButton: Locator;
  readonly changePasswordModal: Locator;
  readonly changePasswordTitle: Locator;
  readonly currentPasswordInput: Locator;
  readonly newPasswordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly changePasswordSubmitButton: Locator;
  readonly changePasswordCancelButton: Locator;

  constructor(page: Page) {
    super(page);
    this.myProfileLink = page.getByRole('link', { name: 'My Profile' });
    this.generalInformationTab = page.getByRole('tab', { name: 'General Information' });
    this.changePasswordButton = page.locator('button.change-password-btn');
    this.changePasswordModal = page.locator('#staticBackdropChangePassword');
    this.changePasswordTitle = this.changePasswordModal.locator('.modal-title');
    this.currentPasswordInput = this.changePasswordModal.locator('input[placeholder="Enter Current Password"]');
    this.newPasswordInput = this.changePasswordModal.locator('input[placeholder="Enter New Password"]');
    this.confirmPasswordInput = this.changePasswordModal.locator('input[placeholder="Enter Confirm Password"]');
    this.changePasswordSubmitButton = this.changePasswordModal.locator('button:has-text("Submit")');
    this.changePasswordCancelButton = this.changePasswordModal.locator('button:has-text("Cancel")');
  }

  async openMyProfile(): Promise<void> {
    await this.myProfileLink.click();
    await this.waitforLoaderToDisappear();
  }

  async verifyGeneralInformationTabVisible(): Promise<void> {
    await expect(this.generalInformationTab).toBeVisible({ timeout: 10000 });
  }

  async clickChangePassword(): Promise<void> {
    await this.changePasswordButton.click();
    await expect(this.changePasswordModal).toBeVisible({ timeout: 10000 });
  }

  async verifyChangePasswordPopupVisible(): Promise<void> {
    await expect(this.changePasswordModal).toBeVisible({ timeout: 10000 });
    await expect(this.changePasswordTitle).toHaveText('Change Password');
    await expect(this.currentPasswordInput).toBeVisible();
    await expect(this.newPasswordInput).toBeVisible();
    await expect(this.confirmPasswordInput).toBeVisible();
    await expect(this.changePasswordSubmitButton).toBeVisible();
  }

  async fillChangePasswordForm(current: string, next: string, confirm: string): Promise<void> {
    await this.currentPasswordInput.fill(current);
    await this.newPasswordInput.fill(next);
    await this.confirmPasswordInput.fill(confirm);
  }

  async submitChangePassword(): Promise<void> {
    await this.changePasswordSubmitButton.click();
  }

  async cancelChangePasswordPopup(): Promise<void> {
    await this.changePasswordCancelButton.click();
    await expect(this.changePasswordModal).toBeHidden({ timeout: 10000 });
  }
}
