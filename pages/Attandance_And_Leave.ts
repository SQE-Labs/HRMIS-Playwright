import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './Basepage'
import { Loader } from '../components/loaders'

export class AttendanceTab extends BasePage {
    private attendanceAndLeaveTab: Locator
    private applyLeaveTab: Locator
    private applyLeaveHeader: Locator
    private totalLeaveBalanceLabels: string[]
    private applyLeaveButton: Locator
    private popUpHeader: Locator
    private privilegeLeaveBadge: Locator
    private dateInput: Locator
    private reasonOfLeaveInput: Locator
    private submitButton: Locator
    private yesButton: Locator
    private noButton: Locator
    private typeOfLeavesDropdown: Locator

    constructor(page: Page) {
        super(page)
        this.attendanceAndLeaveTab = page.locator("//a[text()='Attendance & Leaves']")
        this.applyLeaveTab = page.locator("//a[text()='Apply Leaves']")
        this.applyLeaveHeader = page.locator(".d-flex")
        this.totalLeaveBalanceLabels = [
            'WFH (MTD):',
            'WFH (QTD):',
            'Privilege Leave :',
            'Unpaid Leave (MTD) :',
            'Unpaid Leave (YTD):',
            'Half Yearly Leave :'
        ]
        this.applyLeaveButton = page.locator(".actions")
        this.popUpHeader = page.locator('//*[@id="staticBackdropApplyLeave"]/div/div/form/div[1]')
        this.typeOfLeavesDropdown = page.locator("#leave_type_list")
        this.privilegeLeaveBadge = page.locator(".badge.bg-warning.text-center.mt-2")
        this.dateInput = page.getByPlaceholder("mm/dd/yyyy - mm/dd/yyyy")
        this.reasonOfLeaveInput = page.locator("#reasonOfLeave")
        this.submitButton = page.locator('//*[@id="staticBackdropApplyLeave"]/div/div/form/div[3]/button[1]')
        this.yesButton = page.locator('//*[@id="staticBackdropConfirm"]/div/div/div[2]/button[1]')
        this.noButton = page.locator('//*[@id="staticBackdropConfirm"]/div/div/div[2]/button[2]')

    }

    // Example method (rename and refactor your logic into methods as needed)
    async applyPrivilegeLeave() {
        try {
            await this.attendanceAndLeaveTab.click()
            console.log('Attendance & Leave tab expanded successfully')
        } catch (error) {
            console.error('Attendance & Leave tab did not expand', error)
        }
        await this.applyLeaveTab.click()
        const header = await this.applyLeaveHeader.textContent()
        expect(header).toEqual('Apply Leaves')
        await this.page.waitForTimeout(2000)
        const leaveDescriptions = this.totalLeaveBalanceLabels.map(label => label.replace(/\d+/g, '').trim())
        console.log(leaveDescriptions)
        expect(leaveDescriptions).toEqual(this.totalLeaveBalanceLabels)

        await this.applyLeaveButton.waitFor({ state: 'visible' })
        const privilegeLeaveText = (await this.page.locator("//span[@class='badge badge-warning mx-2'][text()='Privilege Leave : ']").textContent()) || ""
        const privilegeLeaveCount = parseFloat(privilegeLeaveText.replace(/[^\d.]/g, '')) || 0
        console.log("Privilege Leave Count:", privilegeLeaveCount)

        await this.applyLeaveButton.click()
        await this.page.waitForTimeout(5000)

        const popUpHeaderText = await this.popUpHeader.textContent()
        expect(popUpHeaderText).toEqual("Apply Leave")

        const byDefaultOption = await this.typeOfLeavesDropdown.locator('option:first-child').textContent()
        expect(byDefaultOption?.trim()).toEqual("Select leave type")

        await this.typeOfLeavesDropdown.selectOption({ value: 'PrivilegeLeave' })

        const selectedPrivilegeLeave = await this.privilegeLeaveBadge.innerText()
        expect(privilegeLeaveText).toEqual(selectedPrivilegeLeave)

        if (privilegeLeaveCount === 0) {
            console.log(await this.privilegeLeaveBadge.textContent())
            await this.page.waitForSelector('//*[@id="staticBackdropConfirm"]/div/div/div[1]/h5', { state: 'visible' })
            const popupMessage = await this.page.locator('//*[@id="staticBackdropConfirm"]/div/div/div[1]/h5').textContent()
            console.log(popupMessage)
            expect(popupMessage).toContain("Are you sure you want to continue with the selected leave type since your leave balance is zero?")
            // Uncomment and handle button clicks as needed
            // if (await this.yesButton.isVisible()) {
            //     await this.yesButton.click()
            // } else if (await this.noButton.isVisible()) {
            //     await this.noButton.click()
            //     console.log("User clicked No. Cancelling leave request.")
            // }
        } else {
            await this.privilegeLeaveBadge.isVisible()
            const currentDate = new Date()
            const todayDate = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate
                .getDate()
                .toString()
                .padStart(2, '0')}/${currentDate.getFullYear()}`
            const futureDate = new Date()
            const randomDays = privilegeLeaveCount === 1 ? 1 : Math.floor(Math.random() * privilegeLeaveCount) + 1
            futureDate.setDate(currentDate.getDate() + randomDays)
            const futureDateString = `${(futureDate.getMonth() + 1).toString().padStart(2, '0')}/${futureDate
                .getDate()
                .toString()
                .padStart(2, '0')}/${futureDate.getFullYear()}`

            await this.dateInput.click()
            await this.page.waitForTimeout(500)
            await this.dateInput.fill(todayDate)
            await this.page.waitForTimeout(500)
            await this.dateInput.fill(futureDateString)
            await this.page.waitForTimeout(500)
            await this.reasonOfLeaveInput.pressSequentially("Casual Leave !!")
            await this.submitButton.click()
            await this.page.waitForTimeout(4000)

            const successMessage = await this.page.locator(".Toastify__toast-body").textContent()
            console.log(successMessage)
            expect(this.page.locator(".Toastify__toast-body")).toBeVisible()
            expect(this.page.locator(".Toastify__toast-body")).toBeVisible()
            const pendingOption = await this.page.locator("tbody>tr:nth-child(1)").allTextContents()
            expect(pendingOption.join(" ")).toContain("PENDING")
        }
    }
}
