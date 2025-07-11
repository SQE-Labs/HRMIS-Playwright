import { Page, Locator, expect } from '@playwright/test';
import { Loader } from '../components/loaders';
import { BasePage } from './Basepage';

export class LoginPage extends BasePage {
    private email: Locator;
    private password: Locator;
    private submitButton: Locator;
    private loader: Loader;

    // Locators

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.email = page.locator("[type='email']");
        this.password = page.locator("[type='password']");
        this.submitButton = page.locator("#submitButton");
        this.loader = new Loader(page);
    }

    async validLogin(userEmail: string, userPassword: string) {
        await this.email.fill(userEmail);
        await this.password.fill(userPassword);
        await this.submitButton.click();
        await expect(this.loader.getSpinoverlay()).not.toBeAttached();
        await this.page.waitForLoadState('networkidle');
    }
}
