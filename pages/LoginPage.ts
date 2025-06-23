import { Page, Locator, expect } from '@playwright/test';
import  {Loader} from '../Components/Loaders'
import { BasePage } from '../pages/BasePage';

export class LoginPage extends BasePage{
    private Email : Locator
    private Password : Locator
    private SubmitButton : Locator
    private Loader : Loader

// Locators

    constructor(page : Page){
        super(page)
        this.page = page
        this.Email = page.locator("[type='email']")
        this.Password = page.locator("[type='password']")
        this.SubmitButton = page.locator("#submitButton")
        this.Loader = new Loader(page)
        
    }

    async validLogin(UserEmail : string , UserPassword : string){
        // console.log("Filling Email with -->" , UserEmail)
        await this.Email.fill(UserEmail)
        // console.log("Filling Password with -->" , UserPassword)
        await this.Password.fill(UserPassword)
        await this.SubmitButton.click();
        await expect(this.Loader.getSpinoverlay()).not.toBeAttached()
        await this.page.waitForLoadState('networkidle')
    }
}
