import { Page, Locator, expect } from '@playwright/test';
import { Loader } from '../components/loaders';
import { BasePage } from './Basepage';
import { MyProfilePage } from './MyProfile';
import { getExpectedCompanyName, getRuntimeCountry, getRuntimeRole, resolveCountryRoleCredentials, type SupportedCountry, type SupportedRole } from '../utils/auth';

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
        const onLoginPage = await this.email.isVisible({ timeout: 2000 }).catch(() => false);
        if (!onLoginPage) {
            // Already logged in
            if (await this.logoutButton.isVisible().catch(() => false)) {
                return;
            }
            await this.email.waitFor({ state: 'visible', timeout: 5000 });
        }
        await this.email.fill(userEmail);
        await this.password.fill(userPassword);
        await this.submitButton.click();
        
        // Use Promise.race to exit faster when loaders disappear
        await Promise.race([
            this.waitForDotsLoaderToDisappear().catch(() => {}),
            this.waitForSpinnerLoaderToDisappear().catch(() => {}),
            new Promise(resolve => setTimeout(resolve, 2000)) // Fallback 2sec timeout
        ]);
    }

    async loginAsRole(
        role: SupportedRole = getRuntimeRole(),
        country: SupportedCountry = getRuntimeCountry(),
    ) {
        const credentials = resolveCountryRoleCredentials(country, role);
        await this.validLogin(credentials.email, credentials.password);

        const expectedCompanyName = getExpectedCompanyName(country);
        const profilePage = new MyProfilePage(this.page);
        await profilePage.validateCompanyName(
          expectedCompanyName,
          country,
          role,
          `${country} ${role}`
        );

        await this.open('/dashboard/');
    }
}
