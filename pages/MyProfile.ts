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
  readonly basicInfoAccordion: Locator;
  readonly workAccordion: Locator;
  readonly personalDetailsAccordion: Locator;
  readonly workExperienceAccordion: Locator;
  readonly workExperienceTable: Locator;
  readonly addExperienceButton: Locator;
  readonly addExperienceModal: Locator;
  readonly workExpJobTitleInput: Locator;
  readonly workExpCompanyInput: Locator;
  readonly workExpFromInput: Locator;
  readonly workExpToInput: Locator;
  readonly workExpDescriptionInput: Locator;
  readonly workExpSubmitButton: Locator;
  readonly deleteExperienceModal: Locator;
  readonly deleteExperienceConfirmButton: Locator;

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
    this.basicInfoAccordion = page.getByRole('button', { name: 'Basic info', exact: true });
    this.workAccordion = page.getByRole('button', { name: 'Work', exact: true });
    this.personalDetailsAccordion = page.getByRole('button', { name: 'Personal Details', exact: true });
    this.workExperienceAccordion = page.getByRole('button', { name: 'Work Experience', exact: true });
    this.workExperienceTable = page.locator('#collapse4 tbody');
    this.addExperienceButton = page.locator('button.add-experience');
    this.addExperienceModal = page.locator('#staticBackdropExperience');
    this.workExpJobTitleInput = this.addExperienceModal.locator('input[name="title"]');
    this.workExpCompanyInput = this.addExperienceModal.locator('input[name="company"]');
    this.workExpFromInput = this.addExperienceModal.locator('input[name="from"]');
    this.workExpToInput = this.addExperienceModal.locator('input[name="to"]');
    this.workExpDescriptionInput = this.addExperienceModal.locator('textarea#jobDescription');
    this.workExpSubmitButton = this.addExperienceModal.locator('button:has-text("Submit")');
    this.deleteExperienceModal = page.locator('#staticBackdropExperienceDelete');
    this.deleteExperienceConfirmButton = this.deleteExperienceModal.locator('button:has-text("Yes")');
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

  async verifyGeneralAccordionsPresent(): Promise<void> {
    await expect(this.basicInfoAccordion).toBeVisible();
    await expect(this.workAccordion).toBeVisible();
    await expect(this.personalDetailsAccordion).toBeVisible();
    await expect(this.workExperienceAccordion).toBeVisible();
  }

  async expandAccordion(accordion: Locator): Promise<void> {
    const expanded = await accordion.getAttribute('aria-expanded');
    if (expanded !== 'true') {
      await accordion.click();
    }
  }

  async openWorkExperienceSection(): Promise<void> {
    await this.expandAccordion(this.workExperienceAccordion);
    await expect(this.workExperienceTable).toBeVisible({ timeout: 10000 });
  }

  async clickAddWorkExperience(): Promise<void> {
    await this.addExperienceButton.click();
    await expect(this.addExperienceModal).toBeVisible({ timeout: 10000 });
  }

  async fillWorkExperienceForm(data: { title: string; company: string; from: string; to: string; description: string }): Promise<void> {
    await this.workExpJobTitleInput.fill(data.title);
    await this.workExpCompanyInput.fill(data.company);
    await this.workExpFromInput.fill(data.from);
    await this.workExpToInput.fill(data.to);
    await this.workExpDescriptionInput.fill(data.description);
  }

  async submitWorkExperienceForm(): Promise<void> {
    await this.workExpSubmitButton.click();
  }

  async getWorkExperienceRow(title: string): Promise<Locator> {
    return this.workExperienceTable.locator('tr', { hasText: title });
  }

  async verifyWorkExperienceRowExists(title: string): Promise<void> {
    const row = await this.getWorkExperienceRow(title);
    await expect(row).toBeVisible({ timeout: 10000 });
  }

  async verifyWorkExperienceRowNotExists(title: string): Promise<void> {
    const row = await this.getWorkExperienceRow(title);
    await expect(row).toHaveCount(0);
  }

  async deleteWorkExperienceRow(title: string): Promise<void> {
    const row = await this.getWorkExperienceRow(title);
    await row.locator('a.text-danger:has-text("Delete")').click();
    await expect(this.deleteExperienceModal).toBeVisible({ timeout: 10000 });
    await this.deleteExperienceConfirmButton.click();
  }

  async submitChangePassword(): Promise<void> {
    await this.changePasswordSubmitButton.click();
  }

  async cancelChangePasswordPopup(): Promise<void> {
    await this.changePasswordCancelButton.click();
    await expect(this.changePasswordModal).toBeHidden({ timeout: 10000 });
  }
}
