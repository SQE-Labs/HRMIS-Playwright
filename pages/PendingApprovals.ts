import { BasePage } from "./Basepage";
import { Page, Locator, ElementHandle } from "@playwright/test";

export class PendingApprovals extends BasePage{
    private viewButton : Locator;
    private approveButton : Locator;
    
    constructor(page: Page){
        super(page);
        this.viewButton = page.locator("(//a[text()='View'])[1]");
        this.approveButton = page.getByRole("button", { name : "Approve"});
    }

    public async clickOnViewButtonforFirstResult(){
        await this.viewButton.click();
    }

    public async approveAllProjectEntries(){
        let index = 0; 
        let eHandles = await this.approveButton.elementHandles();
        while(await this.approveButton.count() > 0){
            await eHandles[index].click();
            index++;
        }
    }
}