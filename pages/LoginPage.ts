import { Page, Locator, expect } from '@playwright/test';
import { Loader } from '../components/loaders';
import { BasePage } from './Basepage';

export class LoginPage extends BasePage {
    private email: Locator;
    private password: Locator;
    private submitButton: Locator;

    // Locators

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.email = page.locator("[type='email']");
        this.password = page.locator("[type='password']");
        this.submitButton = page.getByRole('button', { name: 'Sign in' });
    }

    async validLogin(userEmail: string, userPassword: string) {
        // Use baseURL from Playwright config.
        await this.open('/');
        const onLoginPage = await this.email.isVisible({ timeout: 5000 }).catch(() => false);
        if (!onLoginPage) {
            // Already logged in
            if (await this.logoutButton.isVisible().catch(() => false)) {
                return;
            }
            await this.email.waitFor({ state: 'visible', timeout: 10000 });
        }
        await this.email.fill(userEmail);
        await this.password.fill(userPassword);
        await this.submitButton.click();
        await this.waitForDotsLoaderToDisappear()
        await this.waitForSpinnerLoaderToDisappear()
        await this.page.waitForLoadState('domcontentloaded');
    }
}
