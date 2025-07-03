import { Page } from "@playwright/test";
import * as users from "../utils/LoginDetail.json"; 
import { LoginPage } from "../pages/Loginpage";
import { BasePage } from "../pages/Basepage";

export class Login extends BasePage{
    static async login(page: Page, username: string) {
        const user = users[username];
        
        if (!user) {
            throw new Error(`User '${username}' not found in LoginDetail.json`);
        }

        const loginPage = new LoginPage(page);
        await loginPage.validLogin(user.UserEmail, user.UserPassword);
    }
}
