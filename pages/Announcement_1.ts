import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./Basepage";

export class Announcement1 extends BasePage {
     
    public Announcement: Locator;
    public New_Announcement: Locator;
    public heading: Locator;
    public createAnnouncement: Locator;
    public selectEventType: Locator;
    public TypeText: Locator;
    public startDateTime: Locator;
    public endDateTime: Locator;
    public presentedBy: Locator;
    public venue: Locator;
    public mode: Locator;
    public fileInput: Locator;
    public description: Locator;
    public submitButton: Locator;
    public cancelButton: Locator;
    
   


    constructor(page: Page) {
        super(page);
    
        this.Announcement = page.locator("//a[text()='Announcements']");
        this.New_Announcement = page.locator("//a[text()='New Announcement']");    
        this.heading = page.locator("h1:has-text('New Announcement')"); 
        this.createAnnouncement = page.locator("//button[text()='+ Create Announcement']")
        this.selectEventType = page.locator("//select[@name='eventType']");
        this.TypeText = page.locator("//input[@placeholder='Enter title']");
        this.startDateTime = page.locator("//label[contains(normalize-space(),'Start Date Time')]/following::input[1]");
        this.endDateTime = page.locator("//label[contains(normalize-space(),'End Date Time')]/following::input[1]");
        this.presentedBy = page.locator("//label[contains(normalize-space(),'Presented By')]/following::input[1]");
        this.venue = page.locator("//label[contains(normalize-space(),'Venue')]/following::input[1]");
        this.mode = page.locator("//label[contains(normalize-space(),'Mode')]/following::input[1]");
        this.fileInput = page.locator("//input[@type='file']");
        this.description = page.locator("//label[contains(normalize-space(),'Description')]/following::textarea[1]");
        this.submitButton = page.locator("//button[text()='Submit']");
        this.cancelButton = page.locator("//button[text()='Cancel']");
    } 

   async Announcementclick() {
    try {
        await this.Announcement.click();
        console.log('Announcement expanded successfully');
    } catch (error) {
        console.error('Attendance & Leave tab did not expand', error);
    }

    await this.New_Announcement.click();
    await expect(this.heading).toHaveText('New Announcement');
    await this.createAnnouncement.click();
    await this.waitforLoaderToDisappear();
}

private formatDateTime(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}`;
}

async fillCreateAnnouncementForm(fileName = "screenshot.png", eventType = "Classroom Session") {
    const title = `Title-${await this.generateRandomString(6)}`;
    const presenter = `Presenter-${await this.generateRandomString(5)}`;
    const venue = `Venue-${await this.generateRandomString(5)}`;
    const mode = `Mode-${await this.generateRandomString(4)}`;
    const description = `Description-${await this.generateRandomString(10)}`;

    const start = new Date();
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    await this.selectEventType.selectOption({ label: eventType });
    await this.TypeText.fill(title);
    await this.startDateTime.fill(this.formatDateTime(start));
    await this.endDateTime.fill(this.formatDateTime(end));
    await this.presentedBy.fill(presenter);
    await this.venue.fill(venue);
    await this.mode.fill(mode);
    await this.uploadFile(fileName, this.page);
    await this.description.fill(description);
}

async submitAnnouncement() {
    await this.submitButton.click();
    await this.waitforLoaderToDisappear();
}
};
