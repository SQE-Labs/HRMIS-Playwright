import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from '../pages/BasePage'
import { Loader } from '../Components/Loaders'
import { ClassicRunner } from '@applitools/eyes-playwright'


export class AttandanceTab extends BasePage {

    private AttandanceandLeave: Locator
    private ApplyLeave: Locator
    private ApplyleaveHeader: Locator
    private TotalLeaveBalance: string[]
    private ApplyLeaveButton: Locator
    private PopUpHeader: Locator
    private Loader: Loader
    private TypeofLeaves: Locator
    private PrivilageLeave: Locator
    private date: Locator
    private ReasonofLeave: Locator
    private SubmitButton: Locator
    private yesButton: Locator
    private NoButton: Locator


    constructor(page: Page) {
        super(page);
        this.AttandanceandLeave = page.locator("//a[text()='Attendance & Leaves']")
        this.ApplyLeave = page.locator("//a[text()='Apply Leaves']")
        this.ApplyleaveHeader = page.locator(".d-flex")
        this.TotalLeaveBalance = [
            'WFH (MTD):',
            'WFH (QTD):',
            'Privilege Leave :',
            'Unpaid Leave (MTD) :',
            'Unpaid Leave (YTD):',
            'Half Yearly Leave :'
        ]
        this.ApplyLeaveButton = page.locator(".actions")
        this.PopUpHeader = page.locator('//*[@id="staticBackdropApplyLeave"]/div/div/form/div[1]')
        this.TypeofLeaves = page.locator("#leave_type_list")
        this.PrivilageLeave = page.locator(".badge.bg-warning.text-center.mt-2")
        this.date = page.getByPlaceholder("mm/dd/yyyy - mm/dd/yyyy")
        this.ReasonofLeave = page.locator("#reasonOfLeave")
        this.SubmitButton = page.locator('//*[@id="staticBackdropApplyLeave"]/div/div/form/div[3]/button[1]')
        this.yesButton = page.locator('//*[@id="staticBackdropConfirm"]/div/div/div[2]/button[1]')
        this.NoButton = page.locator('//*[@id="staticBackdropConfirm"]/div/div/div[2]/button[2]')

        this.Loader = new Loader(page)

    }

    async AttandanceTab() {
        // LI-TC-001
        try {
            await this.AttandanceandLeave.click()
            console.log('AttandanceandLeave tab expanded Succesfully')
        } catch (error) {
            console.error('AttandanceandLeave tab Does not expanded', error)
        }
        await this.ApplyLeave.click()
        var header = await this.ApplyleaveHeader.textContent()
        expect(header).toEqual('Apply Leaves')
        await this.page.waitForTimeout(2000)
        const leaveDescriptions = this.TotalLeaveBalance.map(leave => leave.replace(/\d+/g, '').trim());
        console.log(leaveDescriptions);
        expect(leaveDescriptions).toEqual(this.TotalLeaveBalance)


        // LI-TC-002

        await this.ApplyLeaveButton.waitFor({ state: 'visible' });
        const PrivilegeLeaveText = (await this.page.locator("//span[@class='badge badge-warning mx-2'][text()='Privilege Leave : ']").textContent()) || "";
        const PrivilegeLeaveCount = parseFloat(PrivilegeLeaveText.replace(/[^\d.]/g, '')) || 0;
        console.log("Privilege Leave Count:", PrivilegeLeaveCount);

        await this.ApplyLeaveButton.click();
        await this.page.waitForTimeout(5000);

        var PopUpHeader = await this.PopUpHeader.textContent();
        expect(PopUpHeader).toEqual("Apply Leave");

        const ByDefaultOption = await this.TypeofLeaves.locator('option:first-child').textContent();
        expect(ByDefaultOption?.trim()).toEqual("Select leave type");


        await this.TypeofLeaves.selectOption({ value: 'PrivilegeLeave' });

        const SelectedPrivilageLeave = await this.PrivilageLeave.innerText();
        expect(PrivilegeLeaveText).toEqual(SelectedPrivilageLeave);

        // If Privilege Leave is 0, 
        if (PrivilegeLeaveCount === 0) {
            console.log(await this.PrivilageLeave.textContent())
            await this.page.waitForSelector('//*[@id="staticBackdropConfirm"]/div/div/div[1]/h5', { state: 'visible' });
            const Popupmessage = await this.page.locator('//*[@id="staticBackdropConfirm"]/div/div/div[1]/h5').textContent();
            console.log(Popupmessage);
            expect(Popupmessage).toContain("Are you sure you want to continue with the selected leave type since your leave balance is zero?");
            // if (await this.yesButton.isVisible()) {
            //     await this.yesButton.click();

            // } else if (await this.NoButton.isVisible()) {
            //     await this.NoButton.click();
            //     console.log("User clicked No. Cancelling leave request.");
            //     // Add actions for canceling leave request
            // }
        } else {
            // Continue with the leave application process
            await this.PrivilageLeave.isVisible();

            // Get today's date
            var currentDate = new Date();
            const TodayDate = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate
                .getDate()
                .toString()
                .padStart(2, '0')}/${currentDate.getFullYear()}`;

            // Determine the future leave date
            var futureDate = new Date();
            var randomDays = PrivilegeLeaveCount === 1 ? 1 : Math.floor(Math.random() * PrivilegeLeaveCount) + 1;
            futureDate.setDate(currentDate.getDate() + randomDays);

            const FutureDate = `${(futureDate.getMonth() + 1).toString().padStart(2, '0')}/${futureDate
                .getDate()
                .toString()
                .padStart(2, '0')}/${futureDate.getFullYear()}`;

            // Fill in leave dates
            await this.date.click();
            await this.page.waitForTimeout(500);
            await this.date.fill(TodayDate);
            await this.page.waitForTimeout(500);
            await this.date.fill(FutureDate);
            await this.page.waitForTimeout(500);
            await this.ReasonofLeave.pressSequentially("Casual Leave !!");
            await this.SubmitButton.click();
            await this.page.waitForTimeout(4000);

            // Verify success message
            const successMessage = await this.page.locator(".Toastify__toast-body").textContent();
            console.log(successMessage);
            expect(this.page.locator(".Toastify__toast-body")).toBeVisible();
            expect(this.page.locator(".Toastify__toast-body")).toBeVisible();
            const pendingOption = await this.page.locator("tbody>tr:nth-child(1)").allTextContents();
            expect(pendingOption.join(" ")).toContain("PENDING");


        }

    }



}