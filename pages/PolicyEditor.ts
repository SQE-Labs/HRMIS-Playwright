import { Locator, Page } from '@playwright/test'
import { BasePage } from './Basepage'
import { AssetHelper } from '../utils/AssetHelpers'

export class PolicyEditor extends BasePage {
    // Page navigation
    public policyModuleButton: Locator;
    public policyEditorLink: Locator;

    // List / search
    public searchInput: Locator;
    public table: Locator;
    public rows: Locator;
    public paginationNext: Locator;
    public paginationPrev: Locator;
    public rowsPerPageSelect: Locator;
    public totalPolicies: Locator;
    public openDocumentViewerButton: Locator;

    // Add Policy form
    public addPolicyButton: Locator;
    public policyTitleInput: Locator;
    public regionDropdown: Locator;
    public policyDocumentInput: Locator;
    public policyValidFromButton: Locator;
    public policyDescriptionInput: Locator;
    public policyModal: Locator;
    public policyStatusSwitch: Locator;
    public submitButton: Locator;

    constructor(page: Page) {
        super(page)

        this.policyModuleButton = page.getByRole('button', { name: "Caelius' Policies" })
        this.policyEditorLink = page.getByRole('link', { name: 'Policy Editor' })

        this.searchInput = page.locator('#policy-list-search')
        this.table = page.locator('table[aria-label="Policies"]')
        this.rows = this.table.locator('tbody tr')
        this.paginationNext = page.getByRole('button', { name: 'Next' })
        this.paginationPrev = page.getByRole('button', { name: 'Previous' })
        this.rowsPerPageSelect = page.getByLabel('Rows per page');
        this.totalPolicies = page.locator(
            'span:has-text("Total Policies") strong'
        );

        this.openDocumentViewerButton = page.locator('#open-document-view');

        this.addPolicyButton = page.getByRole('button', {
            name: /add policy/i
        });

        this.policyTitleInput = page.locator("input[name='policyTitle']")
        this.regionDropdown = page.getByLabel('Region *')
        this.policyDocumentInput = page.locator("input[name='policyDocument']")
        this.policyValidFromButton = page.getByRole('button', { name: 'Policy Valid From' })
        this.policyDescriptionInput = page.locator("textarea[name='description']")
        this.policyModal = page.getByRole('dialog', { name: /update policy/i })
        this.policyStatusSwitch = this.policyModal.getByRole('switch', { name: /policy status/i })
        this.submitButton = page.getByRole('button', { name: 'Submit' })
    }

    async expandTab(): Promise<void> {
        await AssetHelper.expandIfCollapsed(this.policyModuleButton)
    }

    async navigateToPolicyEditorPage(): Promise<void> {
        await this.policyEditorLink.click()
        await this.waitforLoaderToDisappear()
        await this.page.waitForLoadState('domcontentloaded')
    }

    async searchPolicy(query: string): Promise<void> {
        await this.searchInput.fill(query)
        await this.searchInput.press('Enter')
        await this.waitforLoaderToDisappear()
    }

    async clickAddPolicy(): Promise<void> {
        await this.addPolicyButton.click()
        await this.waitforLoaderToDisappear()
    }

    async fillPolicyTitle(title: string): Promise<void> {
        await this.policyTitleInput.fill(title)
    }

    async selectRegion(region: string): Promise<void> {
        await this.regionDropdown.click()
        await this.page.getByRole('option', { name: region, exact: true }).click()
    }

    async uploadPolicyDocument(filePath: string): Promise<void> {
        await this.policyDocumentInput.setInputFiles(filePath)
    }

    private getDatePickerDay(day: number): Locator {
        const dayText = String(day).padStart(2, '0')
        return this.page.locator(`.react-datepicker__day--0${dayText}:not(.react-datepicker__day--outside-month)`).first()
    }

    async selectValidFromDate(day: number): Promise<void> {
        await this.policyValidFromButton.click()
        await this.getDatePickerDay(day).click()
    }

    async fillPolicyDescription(description: string): Promise<void> {
        await this.policyDescriptionInput.fill(description)
    }

    async selectPolicyStatus(status: 'Active' | 'Inactive'): Promise<void> {
        const isActive = await this.policyStatusSwitch.isChecked()
        if (status === 'Active' && !isActive) {
            await this.policyStatusSwitch.click({ force: true });
        }

        if (status === 'Inactive' && isActive) {
            await this.policyStatusSwitch.click({ force: true });
        }
    }

    async submitPolicy(): Promise<void> {
        await this.submitButton.click()
        await this.waitforLoaderToDisappear()
    }

    // rows are 1-based externally
    rowByIndex(index: number): Locator {
        return this.rows.nth(index - 1)
    }

    async getRowText(index: number): Promise<string> {
        return this.rowByIndex(index).innerText()
    }

    async clickViewByIndex(index: number): Promise<void> {
        await this.rowByIndex(index).locator('button:has-text("View")').click()
    }

    async clickEditByIndex(index: number): Promise<void> {
        await this.rowByIndex(index).locator('button:has-text("Edit")').click()
    }

    rowByTitle(title: string): Locator {
        return this.rows.filter({ hasText: title }).first()
    }

    async clickEditByTitle(title: string): Promise<void> {
        await this.rowByTitle(title).locator('button:has-text("Edit")').click()
    }

    async openDocumentViewer(): Promise<void> {
        await this.openDocumentViewerButton.click()
    }

    async nextPage(): Promise<void> {
        await this.paginationNext.click()
    }

    async previousPage(): Promise<void> {
        await this.paginationPrev.click()
    }

    async setRowsPerPage(value: string): Promise<void> {
        await this.rowsPerPageSelect.selectOption(value)
    }

    async getTotalPoliciesCount(): Promise<number> {
        const txt = await this.totalPolicies.textContent()
        if (!txt) return 0
        const num = Number(txt.trim())
        return Number.isNaN(num) ? 0 : num
    }
}

