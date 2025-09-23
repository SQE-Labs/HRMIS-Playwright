import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/Basepage';
import { expect, Locator, Page } from '@playwright/test';

export class ApproveLeaveHR extends BasePage {

    private viewLeaveLink: Locator;

     constructor(page: Page) {
    super(page);

    this.viewLeaveLink = page.getByText('View');
     }

    async clickViewLeaveLink() {
        await this.viewLeaveLink.scrollIntoViewIfNeeded();
        await this.viewLeaveLink.click();
    }




    
    
    

}




