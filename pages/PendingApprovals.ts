import { BasePage } from "./Basepage";
import { Page, Locator, ElementHandle } from "@playwright/test";

export class PendingApprovals extends BasePage{
    private viewButton : Locator;
    private approveButton : Locator;
    private rejectButton : Locator;
    private commentBox : Locator;
    private allowResubmissionDialog : Locator;
    private resubmissionDialogHeading : Locator;
    private resubmissionAllowButton : Function;
    
    constructor(page: Page){
        super(page);
        this.viewButton = page.locator("(//a[text()='View'])[1]");
        this.approveButton = page.getByRole("button", { name : "Approve"});
        this.rejectButton = page.getByRole("button", { name : "Reject"});
        this.commentBox = page.getByPlaceholder("Add comment or reason (required for reject)...");
        this.allowResubmissionDialog = page.getByRole('dialog').nth(1);
        this.resubmissionDialogHeading = this.allowResubmissionDialog.getByRole("heading");
        this.resubmissionAllowButton = (option : string) => this.allowResubmissionDialog.getByRole("button", { name : `${option}`});
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

    public async rejectAllProjectEntries(){
        let index = 0;
        let eHandles = await this.rejectButton.elementHandles();
        while(await this.rejectButton.count() > 0){
            await this.enterCommentforTimesheetEntry(index, "Sample comment");
            await eHandles[index].click();
            index++;
        }
    }

    public async enterCommentforTimesheetEntry(index: number, comment :string){
        await this.commentBox.nth(index).fill(comment);
    }

    public async getResubmissionDialogText(){
        return await this.resubmissionDialogHeading.innerText();
    }

    public async selectResubmissionAllowOption(option:boolean){
        if(option){
            await this.resubmissionAllowButton("Yes, allow");
        }
    }
}