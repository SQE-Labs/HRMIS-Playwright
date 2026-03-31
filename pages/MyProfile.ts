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
  readonly educationAccordion: Locator;
  readonly dependentsAccordion: Locator;
  readonly appraisalHistoryTab: Locator;
  readonly appraisalHistoryViewButton: Locator;

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

  readonly educationTable: Locator;
  readonly addEducationButton: Locator;
  readonly addEducationModal: Locator;
  readonly eduDegreeInput: Locator;
  readonly eduCollegeInput: Locator;
  readonly eduFromInput: Locator;
  readonly eduToInput: Locator;
  readonly eduSubmitButton: Locator;
  readonly deleteEducationModal: Locator;
  readonly deleteEducationConfirmButton: Locator;

  readonly dependentsTable: Locator;
  readonly addDependentButton: Locator;
  readonly addDependentModal: Locator;
  readonly dependentNameInput: Locator;
  readonly dependentGenderSelect: Locator;
  readonly dependentRelationshipInput: Locator;
  readonly dependentMobileInput: Locator;
  readonly dependentDobInput: Locator;
  readonly dependentSubmitButton: Locator;
  readonly deleteDependentModal: Locator;
  readonly deleteDependentConfirmButton: Locator;

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
    this.educationAccordion = page.getByRole('button', { name: 'Education', exact: true });
    this.dependentsAccordion = page.getByRole('button', { name: 'Dependents', exact: true });
    this.appraisalHistoryTab = page.locator('button#tab11-tab, button:has-text("Appraisal History")');
    this.appraisalHistoryViewButton = page.locator('#tab11').locator('text=View');

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

    this.educationTable = page.locator('div.accordion-item:has(button:has-text("Education")) tbody');
    this.addEducationButton = page.locator('button:has-text("Add Education")');
    this.addEducationModal = page.locator('#staticBackdropEducation, #staticBackdropEducationModal');
    this.eduDegreeInput = this.addEducationModal.locator('input[name="highestDegree"]');
    this.eduCollegeInput = this.addEducationModal.locator('input[name="college"]');
    this.eduFromInput = this.addEducationModal.locator('input[name="from"]');
    this.eduToInput = this.addEducationModal.locator('input[name="to"]');
    this.eduSubmitButton = this.addEducationModal.locator('button:has-text("Submit")');
    this.deleteEducationModal = page.locator('#staticBackdropEducationDelete, #staticBackdropEducationDeleteModal');
    this.deleteEducationConfirmButton = this.deleteEducationModal.locator('button:has-text("Yes")');

    this.dependentsTable = page.locator('div.accordion-item:has(button:has-text("Dependents")) tbody');
    this.addDependentButton = page.locator('button:has-text("Add Dependent")');
    this.addDependentModal = page.locator('#staticBackdropDependent, #staticBackdropDependents, .modal.fade:has-text("Add Dependent")');
    this.dependentNameInput = this.addDependentModal.locator('input[name="name"]');
    this.dependentGenderSelect = this.addDependentModal.locator('select[name="gender"], select#gender');
    this.dependentRelationshipInput = this.addDependentModal.locator('select[name="relationship"], select#relationship');
    this.dependentMobileInput = this.addDependentModal.locator('input[name="number"], input[name="mobile"], input[placeholder*="Mobile"]');
    this.dependentDobInput = this.addDependentModal.locator('input[name="dob"], input[type="date"], input[placeholder*="Date of Birth"]');
    this.dependentSubmitButton = this.addDependentModal.locator('button:has-text("Submit")');
    this.deleteDependentModal = page.locator('#staticBackdropDependentDelete, #staticBackdropDependentsDelete');
    this.deleteDependentConfirmButton = this.deleteDependentModal.locator('button:has-text("Yes")');
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
    await expect(this.educationAccordion).toBeVisible();
    await expect(this.dependentsAccordion).toBeVisible();
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

  async openEducationSection(): Promise<void> {
    await this.expandAccordion(this.educationAccordion);
    await expect(this.educationTable).toBeVisible({ timeout: 10000 });
  }

  async clickAddEducation(): Promise<void> {
    await this.addEducationButton.click();
    await expect(this.addEducationModal).toBeVisible({ timeout: 10000 });
  }

  async fillEducationForm(data: { degree: string; college: string; from: string; to: string }): Promise<void> {
    await this.eduDegreeInput.fill(data.degree);
    await this.eduCollegeInput.fill(data.college);
    await this.eduFromInput.fill(data.from);
    await this.eduToInput.fill(data.to);
  }

  async submitEducationForm(): Promise<void> {
    await this.eduSubmitButton.click();
  }

  async getEducationRow(degree: string): Promise<Locator> {
    return this.educationTable.locator('tr', { hasText: degree });
  }

  async verifyEducationRowExists(degree: string): Promise<void> {
    const row = await this.getEducationRow(degree);
    await expect(row).toBeVisible({ timeout: 10000 });
  }

  async verifyEducationRowNotExists(degree: string): Promise<void> {
    const row = await this.getEducationRow(degree);
    await expect(row).toHaveCount(0);
  }

  async deleteEducationRow(degree: string): Promise<void> {
    const row = await this.getEducationRow(degree);
    await row.locator('a.text-danger:has-text("Delete")').click();
    await expect(this.deleteEducationModal).toBeVisible({ timeout: 10000 });
    await this.deleteEducationConfirmButton.click();
  }

  async openDependentsSection(): Promise<void> {
    await this.expandAccordion(this.dependentsAccordion);
    await expect(this.dependentsTable).toBeVisible({ timeout: 10000 });
  }

  async openAppraisalHistoryTab(): Promise<void> {
    await this.appraisalHistoryTab.first().click();
    await this.waitforLoaderToDisappear();
    await expect(this.appraisalHistoryViewButton.first()).toBeVisible({ timeout: 10000 });
  }

  async downloadAppraisalHistoryPdf(rowIndex = 0): Promise<string> {
    const viewButton = this.appraisalHistoryViewButton.nth(rowIndex);
    await expect(viewButton).toBeVisible({ timeout: 10000 });
    const filePath = await this.downloadAndVerifyFile(this.page, async () => {
      await viewButton.click();
    });
    return filePath;
  }

  async clickAddDependent(): Promise<void> {
    await this.addDependentButton.click();
    await expect(this.addDependentModal).toBeVisible({ timeout: 10000 });
  }

  async fillDependentForm(data: { name: string; gender: string; relationship: string; mobile: string; dob: string }): Promise<void> {
    await this.dependentNameInput.fill(data.name);
    await this.setInputOrSelect(this.dependentGenderSelect, data.gender);
    await this.setInputOrSelect(this.dependentRelationshipInput, data.relationship);
    await this.dependentMobileInput.fill(data.mobile);
    await this.dependentDobInput.fill(data.dob);
  }

  async submitDependentForm(): Promise<void> {
    await this.dependentSubmitButton.click();
  }

  async getDependentRow(name: string): Promise<Locator> {
    return this.dependentsTable.locator('tr', { hasText: name });
  }

  async verifyDependentRowExists(name: string): Promise<void> {
    const row = await this.getDependentRow(name);
    await expect(row).toBeVisible({ timeout: 10000 });
  }

  async verifyDependentRowNotExists(name: string): Promise<void> {
    const row = await this.getDependentRow(name);
    await expect(row).toHaveCount(0);
  }

  async deleteDependentRow(name: string): Promise<void> {
    const row = await this.getDependentRow(name);
    await row.locator('a.text-danger:has-text("Delete")').click();
    await expect(this.deleteDependentModal).toBeVisible({ timeout: 10000 });
    await this.deleteDependentConfirmButton.click();
  }

  async submitChangePassword(): Promise<void> {
    await this.changePasswordSubmitButton.click();
  }

  async cancelChangePasswordPopup(): Promise<void> {
    await this.changePasswordCancelButton.click();
    await expect(this.changePasswordModal).toBeHidden({ timeout: 10000 });
  }

  private async setInputOrSelect(locator: Locator, value: string): Promise<void> {
    const tagName = await locator.evaluate((element) => element.tagName.toLowerCase());
    if (tagName === 'select') {
      await locator.selectOption({ label: value });
    } else {
      await locator.fill(value);
    }
  }
}
