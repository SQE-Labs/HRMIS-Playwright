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
        this.submitButton = page.locator("#submitButton");
    }

    async validLogin(userEmail: string, userPassword: string) {
        await this.open('url');
        await this.email.fill(userEmail);
        await this.password.fill(userPassword);
        await this.submitButton.click();
        await this.waitForDotsLoaderToDisappear()
        await this.waitForSpinnerLoaderToDisappear()
        await this.page.waitForLoadState('networkidle');
    }
    async loginUsingJson(page: Page, loginObj: string) {
        //json paarsingl;

        // const user = users[username];

        // if (!user) {
        //     throw new Error(`User '${username}' not found in LoginDetail.json`);
        // }

        // await this.validLogin(user.UserEmail, user.UserPassword);
    }
}
