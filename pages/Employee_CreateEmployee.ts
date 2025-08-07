import { Page, Locator, expect, BrowserContext, Browser } from '@playwright/test'
import { BasePage } from './Basepage'

export class Employee_CreateEmployee extends BasePage {

    // locator initalizing
    fnameField: Locator
    lnameField: Locator
    genderCheckbox: Locator
    bloodgroupDropdown: Locator
    aadharNumberField: Locator
    panCardNumberField: Locator
    passportNumberField: Locator
    maritalStatusDropdown: Locator
    dateOfJoiningField: Locator
    dateOfBirthField: Locator
    nextButton: Locator
    phoneNumberField: Locator
    alternateNumberField: Locator
    relationshipDropDown: Locator
    alternateNameField: Locator
    presentAddressFeld: Locator
    permanentAddressField: Locator
    submitBttn: Locator
    thankyouMessage: Locator


    constructor(newTab: Page) {
        super(newTab)
        // assign locator
        this.fnameField = this.page.locator('input[name=firstName]');
        this.lnameField = this.page.locator('input[name=lastName]');
        this.genderCheckbox = this.page.locator('input[id=male]');
        this.bloodgroupDropdown = this.page.locator('#bloodGroup');
        this.aadharNumberField = this.page.locator('input[name=aadharNumber]');
        this.panCardNumberField = this.page.locator('input[name=panCardNumber]');
        this.passportNumberField = this.page.locator('input[name=passportNumber]');
        this.maritalStatusDropdown = this.page.locator('select[name=maritalStatus]');
        this.dateOfJoiningField = this.page.locator('input[name="joiningDate"]');
        this.dateOfBirthField = this.page.locator('input[name="dob"]');
        this.nextButton = this.page.locator("//button[text()='Next']");
        this.phoneNumberField = this.page.locator('input[name="phoneNumber"]');
        this.alternateNumberField = this.page.locator('input[name="alternateNumber"]')
        this.relationshipDropDown = this.page.locator('#relationWithAlternateNo')
        this.alternateNameField = this.page.locator('input[name="alternateName"]')
        this.presentAddressFeld = this.page.locator('textarea[name="presentAddress"]');
        this.permanentAddressField = this.page.locator('textarea[name="permanentAddress"]')
        this.submitBttn = this.page.locator("(//button[text()='Submit'])[1]");
        this.thankyouMessage = this.page.locator(".fw-300");
    }


    async enterPersonalEmailToVerifyandSubmit(emailID1: string,) {
        console.log(emailID1);
        const dialog = this.page.getByRole('dialog', { name: 'Verify' });
        await dialog.getByPlaceholder('ted@gmail.com').fill(emailID1);
        await dialog.getByRole('button', { name: 'Submit' }).click();
        await this.page.waitForLoadState('networkidle');

    }

    async fillCreateEmployeeForm(
        fname: string,
        lname: string,
        bloodGroupValue: string,
        aadharNumber: string,
        panCardNumber: string,
        passportNumber?: string,
        maritalStatus: string,
        dob: string,
        doj: string,
        phoneNumber: string,
        alternateNumber: string,
        relationship: string,
        alternateName: string,
        presentAddress: string,
        permanentAddress: string

    ) {

        await expect(this.fnameField).toBeVisible();
        await this.fnameField.fill(fname);
        await this.lnameField.fill(lname);
        await this.genderCheckbox.click(); // Male 
        await this.bloodgroupDropdown.selectOption(bloodGroupValue);
        await this.aadharNumberField.fill(aadharNumber);
        await this.panCardNumberField.fill(panCardNumber);
        await this.passportNumberField.fill(passportNumber || ' ');
        await this.maritalStatusDropdown.selectOption(maritalStatus);

        await this.dateOfBirthField.fill(dob); // Format: 'YYYY-MM-DD'
        await this.dateOfJoiningField.fill(doj); // Format: 'YYYY-MM-DD'

        await this.nextButton.click();

        // Page 2
        await this.phoneNumberField.fill(phoneNumber);
        await this.alternateNumberField.fill(alternateNumber);
        await this.relationshipDropDown.selectOption(relationship);
        await this.alternateNameField.fill(alternateName);
        await this.presentAddressFeld.fill(presentAddress);
        await this.permanentAddressField.fill(permanentAddress);

        await this.nextButton.click();

        //submit button

        await this.submitBttn.click();
        await this.waitforLoaderToDisappear();


    }


    async getSuccessMessageTxt(): Promise<string> {
        const message = await this.thankyouMessage.textContent();
        return message || " ";
    }



}

