import { Page, Locator, expect, BrowserContext } from '@playwright/test'
import { BasePage } from './Basepage'
import { Loader } from '../components/loaders'
import fs from "fs";
import { AssetHelper } from '../utils/AssetHelpers'




export class Employee_Management extends BasePage {

    public Employee_Management: Locator
    public Employee_Directory_tab: Locator
    public Employee_Directory_tab_Header: Locator
    public Employee_Directory_Cards: Locator
    public TotalEmployeecount: Locator
    public Employee_Directory_Searchbar: Locator
    public Employee_Directory_cards_title: Locator
    public Employee_Directory_Card_notfound: Locator
    public SelectDepartment: Locator
    public cardTextDepartment: Locator
    public SelectStatus: Locator
    public Card: Locator
    public EmployeeProfile: Locator
    public BasicInfo: Locator
    public AccordionBodyKey: Locator
    public AccordionBodyValue: Locator
    public BasicInfoAccordionBody: string[]
    public BasicInfoEditButton: Locator
    public BasicInfoFirstname: Locator
    public BasicInfoLastName: Locator
    public UpdateButton: Locator
    public CloseButton: Locator
    public WorkAccordion: Locator
    public WorkAccordionkey: Locator
    public WorkAccordionBody: string[]
    public WorkDate: Locator
    public EmployeeType: Locator
    public WorkEditButton: Locator
    public PersonalDetails: Locator
    public PersonalDetailsKey: Locator
    public PersonalDetailsBody: string[]
    public PersonalDetailsEditButton: Locator
    public PersonalDetailsDate: Locator
    public AadhaarCardNumber: Locator
    public PanCardNumber: Locator
    public PresentAddress: Locator
    public BloodGroup: Locator
    public MaritalStatus: Locator
    public AlternateNumber: Locator
    public PermanentAddress: Locator
    public PassportNumber: Locator
    public WorkExperience: Locator
    public Education: Locator
    public Dependents: Locator
    public AssignedAssets: Locator
    public AssignedRecords: Locator
    public NextButton: Locator
    public PreviousButton: Locator
    public EmployeeAccess: Locator
    public CurrentStatus: Locator
    public Status: Locator
    public EmployeeAccessStatus: Locator
    public EmployeeAccessSubmitButton: Locator
    public CardName: Locator
    public Loader: Loader
    public LeftOutDate: Locator
    public Leftreason: Locator
    public LeftOutSubmitbutton: Locator
    public AssignManagertab: Locator
    public AssignManagerHeader: Locator
    public AssignManagerSubTabManager: Locator
    public AssignManagerSubTabLeaveManager: Locator
    public AssignManagerDropdown: Locator
    public Coloumn: Locator
    public ColoumnBody: string[]
    public ManagerActionButton: Locator
    public PopupHeader: Locator
    public CrossButton: Locator
    public PopupDropDown: Locator
    public PopupSubmitButton: Locator
    public CancelButton: Locator
    public LeaveManagerPopupDropDown: Locator
    public LeaveManagerActionButton: Locator
    public Pop_Up_Header: Locator
    public NoButton: Locator
    public YesButton: Locator
    public AssignButton: Locator
    public AssignManagerPopUpDropdown: Locator
    public AssignManagerPopupHeader: Locator
    public AssignManagerPopupDropdownOption: Locator
    public AssignManagerPopupCrossicon: Locator
    public AssignManagerPopupCancleButton: Locator
    public AssignManagerPopupSubmitbutton: Locator
    public PromotionManagement: Locator
    public PromotionHeader: Locator
    public PromotionColoumn: Locator
    public PromotionColoumntext: string[]
    public Dropdown: Locator
    public PromotionDropdownOption: Locator
    public PromoteButton: Locator
    public PromotionPopUpHeader: Locator
    public PromotionPopUpLabel: Locator
    public PromotionCancelButton: Locator
    public DepartmentDropdown: Locator
    public DesignationDropdown: Locator
    public DesignationDropDownOptions: Locator
    public PromoteEmployeePopUpSubmitButton: Locator
    public Document_upload_Tab: Locator
    public Document_upload_Header: Locator
    public Document_Upload_Column: Locator
    public Document_Upload_Column_text: string[]
    public Upload_Icon: Locator
    public PopUp_Header: Locator
    public Popup_Cross_button: Locator
    public Popup_Cancel_button: Locator
    public Choose_file: Locator
    public PopUP_Submit_button: Locator
    public PopUp_comment: Locator
    public EyeIcon: Locator
    public Performance_Evaluation: Locator
    public Performance_Header: Locator
    public Performance_Export_button: Locator
    public Role_Managment: Locator
    public Role_Header: Locator
    public Approve_Document: Locator
    public Approve_Header: Locator
    public Approve_Label: Locator
    public Approve_Label_Document_type_dropdown: Locator
    public Approve_Label_Employee_dropdown: Locator
    public Approve_Label_Exiting_Document_type: Locator
    public Approve_Label_Exiting_Employee: Locator
    public Action_button: Locator
    public Action_Button_popup: Locator
    public View_button: Locator
    public Select_action_dropdown: Locator
    public Reason_Section: Locator
    public Departments: Locator
    public Departments_Header: Locator
    public AddDepartmentButton: Locator
    public Departments_SearchBar: Locator
    public No_Of_records: Locator
    public Department_name: Locator
    public No_Record_avialable: Locator
    public updateIcon: Locator
    public Name_TextArea: Locator
    public No_record: Locator

    constructor(page: Page) {
        super(page)
        this.Employee_Management = page.locator("//a[text()='Employee Management']")
        this.Employee_Directory_tab = page.locator("//a[text()='Employee Directory']")
        this.Employee_Directory_tab_Header = page.locator(".d-flex")
        this.Employee_Directory_Cards = page.locator(".col-md-4.col-lg-3")
        this.TotalEmployeecount = page.locator(".total")
        this.Employee_Directory_Searchbar = page.locator("//input[@name = 'search']")
        this.Employee_Directory_cards_title = page.locator(".card-title.text-primary")
        this.Employee_Directory_Card_notfound = page.locator(".fs-4")
        this.SelectDepartment = page.locator("#department")
        this.cardTextDepartment = page.locator("//small[@class = 'card-text']")
        this.SelectStatus = page.locator("#selectedStatus")
        this.Card = page.locator(`.col-md-4.col-lg-3`)
        this.EmployeeProfile = page.locator(".employee-profile")
        this.BasicInfo = page.locator('#heading1')
        this.AccordionBodyKey = page.locator("#collapse1 div.d-flex.flex-column.text-black-50>p")
        this.AccordionBodyValue = page.locator("h2[@id='heading1']/following-sibling::div/div/div[2]/div[4]/div/p")
        this.BasicInfoEditButton = page.locator("#heading1 + div i.fa-edit")
        this.BasicInfoFirstname = page.locator("div:nth-child(2)>div>div:nth-child(1)>input")
        this.BasicInfoLastName = page.locator("div:nth-child(2)>div>div:nth-child(2)>input")
        this.UpdateButton = page.locator(".btn.btn-primary.btn-sm")
        this.CloseButton = page.locator(".btn.btn-secondary.btn-sm.ms-2")
        this.WorkAccordion = page.locator("#heading2")
        this.WorkAccordionkey = page.locator("#collapse2 div.d-flex.flex-column.text-black-50>p")
        this.WorkDate = page.locator('//*[@id="collapse2"]/div/form/div[1]/div[4]/div/div/input')
        this.WorkEditButton = page.locator("#heading2 + div i.fa-edit")
        this.PersonalDetails = page.locator("#heading3")
        this.PersonalDetailsKey = page.locator('//*[@id="collapse3"]/div/div[2]/div/div/div/div/p')
        this.EmployeeType = page.locator("//select[@name = 'employeeSubType']")
        this.PersonalDetailsEditButton = page.locator("#heading3 + div i.fa-edit")
        this.PersonalDetailsDate = page.locator('//input[@type="date"][not(@disabled)]')
        this.AadhaarCardNumber = page.locator('//input[@name="aadharNumber"][not(@disabled)]')
        this.PanCardNumber = page.locator('//input[@name="panCardNumber"][not(@disabled)]')
        this.PresentAddress = page.locator('//textarea[@name="presentAddress"][not(@disabled)]')
        this.BloodGroup = page.locator('//select[@id="bloodGroup"][not(@disabled)]')
        this.MaritalStatus = page.locator("//select[@id = 'maritalStatus'][not(@disabled)]")
        this.AlternateNumber = page.locator("//input[@name = 'alternateNumber'][not(@disabled)]")
        this.PermanentAddress = page.locator("//textarea[@name = 'permanentAddress'][not(@disabled)]")
        this.PassportNumber = page.locator("//input[@name = 'passportNumber'][not(@disabled)]")
        this.WorkExperience = page.locator("#heading4")
        this.Education = page.locator("#heading5")
        this.Dependents = page.locator("#heading6")
        this.AssignedAssets = page.locator("#tab4-tab")
        this.AssignedRecords = page.locator(".table-responsive.mt-4")
        this.NextButton = page.getByText('Next')
        this.NextButton = page.getByText('Previous')
        this.EmployeeAccess = page.locator("#tab11-tab")
        this.CurrentStatus = page.getByLabel("Current Status")
        this.Status = page.getByLabel('//*[@id="tab11"]/form/div[1]/div[2]/div[2]/label')
        this.EmployeeAccessStatus = page.locator("#status")
        this.EmployeeAccessSubmitButton = page.locator("#tab11 > form > div.justify-content-center.modal-footer > button")
        this.CardName = page.locator("div>h4>b")
        this.LeftOutDate = page.locator('//*[@id="tab11"]/form/div[1]/div[3]/div[2]/label/text()')
        this.Leftreason = page.locator('//*[@id="tab11"]/form/div[1]/div[4]/div[2]/label/text()')
        this.LeftOutSubmitbutton = page.locator('#tab11 > form > div.justify-content-center.modal-footer > button')
        this.BasicInfoAccordionBody = [
            'First Name',
            'Last Name',
            'Employee Id',
            'Middle Name',
            'Email'
        ]
        this.WorkAccordionBody = [
            'Department',
            'Designation',
            'Reporting To',
            'Date of Joining',
            'Employee Status',
            'Employee Type'
        ]
        this.PersonalDetailsBody = [
            'Date of Birth',
            'Blood Group',
            'Aadhaar Card Number',
            'Gender',
            'Passport Number',
            'Marital Status',
            'PAN Number',
            'Alternate Number',
            'Present Address',
            'Permanent Address'
        ]
        this.Loader = new Loader(page)

        this.AssignManagertab = page.locator("//a[text()='Assign Manager']")
        this.AssignManagerHeader = page.locator('div>h1')
        this.AssignManagerSubTabManager = page.locator("#tab1-tab")
        this.AssignManagerSubTabLeaveManager = page.locator("#tab2-tab")
        this.AssignManagerDropdown = page.locator("#react-select-2-placeholder")
        this.Coloumn = page.locator("thead>tr>th")
        this.ManagerActionButton = page.locator(".btn.btn-secondary")
        this.PopupHeader = page.locator("(//div[@class = 'modal-header'])[1]")
        this.CrossButton = page.locator("(//button[@class = 'btn-close'])[1]")
        this.PopupDropDown = page.locator("#react-select-3-input")
        this.PopupSubmitButton = page.locator("(//button[@class = 'theme-button'])[1]")
        this.CancelButton = page.locator("(//button[@type = 'button'])[4]")
        this.LeaveManagerPopupDropDown = page.locator("#react-select-4-input")
        this.LeaveManagerActionButton = page.locator(".btn.btn-danger")
        this.Pop_Up_Header = page.locator("div>div>div>div>h5")
        this.NoButton = page.locator(".theme-button.bg-grey.mx-3.w-35.cancel-modal-Manager-delete")
        this.YesButton = page.locator("//button[@class = 'theme-button ']")
        this.AssignButton = page.locator(".btn.btn-secondary.m-3")
        this.AssignManagerPopupCrossicon = page.locator("(//button[@type = 'button'])[5]")
        this.AssignManagerPopupCancleButton = page.locator("(//button[@type = 'button'])[6]")
        this.AssignManagerPopUpDropdown = page.locator("#react-select-5-input")
        this.AssignManagerPopupHeader = page.locator("(//h5[@id = 'staticBackdropLabel'])[2]")
        this.AssignManagerPopupDropdownOption = page.locator("#react-select-5-option-1")
        this.AssignManagerPopupSubmitbutton = page.locator("(//button[@class = 'theme-button'])[2]")
        this.ColoumnBody = [
            'Name',
            'Assigned Manager',
            'Action'
        ]


        this.PromotionManagement = page.locator("//a[text()='Promotion Management']")
        this.PromotionHeader = page.locator(".page-heading")
        this.PromotionColoumn = page.locator("thead>tr>th")
        this.Dropdown = page.locator("#react-select-2-input")
        this.PromotionDropdownOption = page.locator("#react-select-2-option-0")
        this.PromoteButton = page.locator(".btn.btn-secondary")
        this.PromotionPopUpHeader = page.locator("#staticBackdropLabel")
        this.PromotionPopUpLabel = page.locator("div>label")
        this.PromotionCancelButton = page.locator("(//button[@type = 'button'])[2]")
        this.DepartmentDropdown = page.locator("#department")
        this.DesignationDropdown = page.locator("#designation")
        this.DesignationDropDownOptions = page.locator("//select[@id = 'designation']//option")
        this.PromoteEmployeePopUpSubmitButton = page.locator("//button[@type = 'submit']")
        this.PromotionColoumntext = [
            'Employee Id',
            'Name',
            'Department',
            'Designation',
            'Action'

        ]
        this.Document_upload_Tab = page.locator("//a[text()='Document Upload']")
        this.Document_upload_Header = page.locator("div>h1")
        this.Document_Upload_Column = page.locator("thead>tr>th")
        this.Upload_Icon = page.locator("(//i[@class = 'fa fa-upload'])[2]")
        this.PopUp_Header = page.locator(".modal-header")
        this.Popup_Cross_button = page.locator(".btn-close.close-class")
        this.Popup_Cancel_button = page.locator(".cancel-promote")
        this.Choose_file = page.locator("#file-input")
        this.PopUP_Submit_button = page.locator("//button[@type = 'submit']")
        this.PopUp_comment = page.locator("//textarea[@name = 'comment']")
        this.EyeIcon = page.locator("(//a[@class = 'fs-5'])[1]")
        this.Document_Upload_Column_text = [

            'S.No.',
            'Document Name',
            'Mandatory',
            'Status',
            'Action'
        ]

        this.Performance_Evaluation = page.locator("//a[text()='Performance Evaluation']")
        this.Performance_Header = page.locator(".h-100")
        this.Performance_Export_button = page.locator(".actions.d-flex.gap-2")
        this.Role_Managment = page.locator("(//a[text()='Role Management'])[1]")

        this.Role_Header = page.locator("div>h1")
        this.Approve_Document = page.locator("//a[text()='Approve Document']")
        this.Approve_Header = page.locator("div>h1")
        this.Approve_Label = page.locator("//label[@class = 'label']")

        this.Approve_Label_Document_type_dropdown = page.locator("#react-select-2-input")
        this.Approve_Label_Employee_dropdown = page.locator("#react-select-3-input")
        this.Approve_Label_Exiting_Document_type = page.locator("tr>td:nth-child(3)")
        this.Approve_Label_Exiting_Employee = page.locator("tr>td:nth-child(2)")
        this.Action_button = page.locator("(//button[@class = 'btn btn-secondary'])[1]")
        this.Action_Button_popup = page.locator("#staticBackdropLabel")
        this.View_button = page.locator("//a[text()='View']")
        this.Select_action_dropdown = page.locator("#documentAction")
        this.Reason_Section = page.locator("//textarea[@class = 'border']")
        this.Departments = page.locator("//a[text()='Departments']")
        this.Departments_Header = page.locator("div>h1")
        this.AddDepartmentButton = page.locator("//a[text()= '+ Add Department']")
        this.Departments_SearchBar = page.getByPlaceholder("Search By Name.")
        this.Department_name = page.locator("tbody>tr>td:nth-child(2)")
        this.No_Of_records = page.locator(".total")
        this.No_Record_avialable = page.locator(".fs-4.text-secondary.text-center")
        this.updateIcon = page.locator("(//i[@class = 'fa fa-edit'])[1]")
        this.Name_TextArea = page.getByPlaceholder("Enter Department Name")
        this.No_record = page.locator(".fs-4.text-secondary.text-center.mt-5")

    }

    async expandEmployeeManagementTab(): Promise<void> {
        await AssetHelper.expandIfCollapsed(this.Employee_Management);
    }
    async isExpanded(): Promise<boolean> {
        return await AssetHelper.isExpanded(this.Employee_Management);
    }
    async collapseAssetManagementTab(): Promise<void> {
        await AssetHelper.collapseIfExpanded(this.Employee_Management);
    }
    async isCollapsed(): Promise<boolean> {
        return await AssetHelper.isCollapsed(this.Employee_Management);
    }
    async naviagteToEmployeeDirectoryTab() {
        await this.Employee_Directory_tab.click()
    }

    async totalCardsCount() {
        var TotalCards = await this.Employee_Directory_Cards.count()
        console.debug(TotalCards)
        var TotalEmployeeText = await this.TotalEmployeecount.textContent() || ""
        var TotalEmployeecount = parseFloat(TotalEmployeeText.replace(/[^\d.]/g, '')) || 0
        console.debug(TotalEmployeecount)
        return { TotalCards, TotalEmployeecount }
    }

    async searchByEmployeeDirectorySearchBar(EmployeeName: string) {
        await this.Employee_Directory_Searchbar.pressSequentially(EmployeeName)
    }

    async selectDepartment(Option: string) {
        await this.SelectDepartment.selectOption({ label: Option });
    }

    async selectStatus(Status: string) {
        await this.SelectStatus.selectOption({ label: Status });

    }
    async noRecord() {
        var Norecord = await this.Employee_Directory_Card_notfound.textContent()
        console.debug(Norecord)
        return Norecord
    }

    async fechingEmployeeName() {
        let employee = this.Card.nth(14)
        let employeeName = await employee.textContent()
        console.debug(employeeName)
        return employeeName
    }

    async clickOnEmployeeCard() {
        await this.Card.nth(14).click()
    }

    async clickOnBasicInfo() {
        await this.BasicInfo.click()
    }

    async getAccordionBodycountAndText(Locator: Locator, dropdownLocator) {
        const AccordionBodycount = await Locator.count();
        for (let i = 0; i < AccordionBodycount; i++) {
            const AccordionBodydata = Locator.nth(i);
            const AccordionBodyText = await AccordionBodydata.textContent();
            expect(AccordionBodyText).toEqual(dropdownLocator[i])
        }
    }

    async clickOnBasicInfoEditButton() {
        await this.BasicInfoEditButton.click()
    }

    async clickOnUpdateButton() {
        await this.UpdateButton.click()
    }
    async getOriginalBasicInfoName() {
        var originalFirstName = await this.page.locator('#collapse1 > div > div:nth-child(2) > div:nth-child(2) > div > p:nth-child(1)').textContent();
        var originalLastName = await this.page.locator('#collapse1 > div > div:nth-child(2) > div:nth-child(2) > div > p:nth-child(2)').textContent();
        var originalMiddleName = await this.page.locator('#collapse1 > div > div:nth-child(2) > div:nth-child(4) > div > p:nth-child(1)').textContent();
        return { originalFirstName, originalLastName, originalMiddleName }
    }
    async clickOnCloseButton() {
        await this.CloseButton.click()
    }

    async getUpdatedBasicInfoName() {
        var updatedFirstName = await this.page.locator('#collapse1 > div > div:nth-child(2) > div:nth-child(2) > div > p:nth-child(1)').textContent();
        var updatedLastName = await this.page.locator('#collapse1 > div > div:nth-child(2) > div:nth-child(2) > div > p:nth-child(2)').textContent();
        var updatedMiddleName = await this.page.locator('#collapse1 > div > div:nth-child(2) > div:nth-child(4) > div > p:nth-child(1)').textContent();

        return { updatedFirstName, updatedLastName, updatedMiddleName }
    }

    async clickOnWorkAccordion() {
        await this.WorkAccordion.click()
    }

    async clickOnWorkEditButton() {
        await this.WorkEditButton.click()

    }

    async getExistingDate() {
        var ExistingDate = await this.page.locator('//*[@id="collapse2"]/div/div[2]/div[4]/div/p[1]').textContent()
        return ExistingDate
    }
    async getCurrentDate() {
        var CurrentDate = await this.page.locator('//*[@id="collapse2"]/div/div[2]/div[4]/div/p[1]').textContent()
        return CurrentDate
    }

    async getfutureDate() {
        var futureDate = new Date();
        // Generate a random number of days between 1 and 365 (1 year ahead)
        var randomDays = Math.floor(Math.random() * 365) + 1;
        futureDate.setDate(futureDate.getDate() + randomDays);
        // Format the future date as 'YYYY-MM-DD'
        const futureDates = futureDate.toISOString().split('T')[0];
        return futureDates
    }

    async clickOnPersonalDetails(){
        await this.PersonalDetails.click()

    }
    async EmployeedirectoryCard() {






       
    

        // TC_EM_022
        try {
            await this.PersonalDetails.click()
            console.log(' PersonalDetails expanded Succesfully')
        } catch (error) {
            console.error('PersonalDetails Does not expanded', error)
        }
        await this.page.waitForTimeout(1000)

        const PersonalDetailskeycount = await this.PersonalDetailsKey.count()

        for (let i = 0; i < PersonalDetailskeycount; i++) {
            const PersonalDetailsKey = await this.PersonalDetailsKey.nth(i)
            const PersonalDetailskeytext = await PersonalDetailsKey.textContent()
            expect(PersonalDetailskeytext).toEqual(this.PersonalDetailsBody[i])
        }

        // TC_EM_023
        await this.PersonalDetails.click()
        await this.page.waitForTimeout(1000)
        await expect(this.page.locator("heading3")).toBeHidden();

        // TC_EM_024
        await this.PersonalDetails.click()
        await this.PersonalDetailsEditButton.click()
        await this.PersonalDetailsDate.clear()
        await this.UpdateButton.click()
        var DateofBirthField = await this.PersonalDetailsDate
        var tooltipMessage = await DateofBirthField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log(tooltipMessage);
        expect(tooltipMessage).toBe('Please fill out this field.')
        await this.PersonalDetailsDate.fill('1993-08-08')

        // TC_EM_025
        await this.AadhaarCardNumber.clear()
        await this.UpdateButton.click()
        var AadhaarCardNumberField = await this.AadhaarCardNumber

        var tooltipMessage = await AadhaarCardNumberField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('AadhaarCardField :- ', tooltipMessage);
        expect(tooltipMessage).toBe('Please enter a 12-digit Aadhar card number')
        await this.AadhaarCardNumber.fill('765432131242')

        // TC_EM_026
        await this.PanCardNumber.clear()
        await this.UpdateButton.click()
        var PanCardNumberField = await this.PanCardNumber

        var tooltipMessage = await PanCardNumberField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('PanCardField :-', tooltipMessage);

        expect(tooltipMessage).toBe('Please enter a 10-digit PAN card number')
        await this.PanCardNumber.fill('2324354231')

        // TC_EM_027
        await this.PresentAddress.clear()
        await this.UpdateButton.click()
        var PresentAddressField = await this.PresentAddress

        var tooltipMessage = await PresentAddressField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('PresentAddress :-', tooltipMessage);

        expect(tooltipMessage).toBe('Please fill out this field.')
        await this.PresentAddress.fill('Hello World !!')

        // TC_EM_028
        await this.BloodGroup.selectOption({ label: 'Select Blood Group' })
        await this.UpdateButton.click()
        var BloodGroupField = await this.BloodGroup
        var tooltipMessage = await BloodGroupField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('BloodGroup :-', tooltipMessage);
        expect(tooltipMessage).toBe('Please select an item in the list.')
        await this.BloodGroup.selectOption({ label: 'O+ve' })

        // TC_EM_029
        await this.MaritalStatus.selectOption({ label: 'Select Marital Status' })
        await this.UpdateButton.click()
        var MaritalStatusField = await this.MaritalStatus
        var tooltipMessage = await MaritalStatusField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('MaritalStatus :-', tooltipMessage);
        expect(tooltipMessage).toBe('Please select an item in the list.')
        await this.MaritalStatus.selectOption({ label: 'Single' })

        // TC_EM_030
        await this.AlternateNumber.clear()
        await this.UpdateButton.click()
        var AlternateNumberField = await this.AlternateNumber

        var tooltipMessage = await AlternateNumberField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('AlternateNumber :-', tooltipMessage);

        expect(tooltipMessage).toBe('Please fill out this field.')
        await this.AlternateNumber.fill('9987651232')

        // TC_EM_031
        await this.PermanentAddress.clear()
        await this.UpdateButton.click()
        var PermanentAddressField = await this.PermanentAddress
        var tooltipMessage = await PermanentAddressField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('PermanentAddress :-', tooltipMessage);
        expect(tooltipMessage).toBe('Please fill out this field.')
        await this.PermanentAddress.fill("dsadasdasdsa")

        // TC_EM_032
        await this.PassportNumber.clear()
        await this.UpdateButton.click()
        var PassportNumberField = await this.PassportNumber
        var tooltipMessage = await PassportNumberField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('PassportNumberField :-', tooltipMessage);
        expect(tooltipMessage).toBe('Please enter a 12-digit Passport number')
        await this.PermanentAddress.fill('123213213123')

        // TC_EM_033
        await this.CloseButton.click()
        var OriginalaadharNumber = await this.page.locator('//*[@id="collapse3"]/div/div[2]/div[3]/div/div[2]/p').textContent()
        var OriginalPanCardNumber = await this.page.locator('//*[@id="collapse3"]/div/div[2]/div[7]/div/div[2]/p').textContent()
        var OriginalpermanentAddress = await this.page.locator('//*[@id="collapse3"]/div/div[2]/div[10]/div/div[2]/p').textContent()
        await this.PersonalDetailsEditButton.click()
        await this.AadhaarCardNumber.clear()
        await this.AadhaarCardNumber.fill('765432131242')
        await this.PanCardNumber.clear()
        await this.PanCardNumber.fill('2324354231')
        await this.BloodGroup.selectOption({ label: 'B+ve' })
        await this.PermanentAddress.clear()
        await this.PermanentAddress.fill('Hello')
        await this.CloseButton.click()

        var currentaadharNumber = await this.page.locator('//*[@id="collapse3"]/div/div[2]/div[3]/div/div[2]/p').textContent()
        var currentPanCardNumber = await this.page.locator('//*[@id="collapse3"]/div/div[2]/div[7]/div/div[2]/p').textContent()
        var CurrentpermanentAddress = await this.page.locator('//*[@id="collapse3"]/div/div[2]/div[10]/div/div[2]/p').textContent()
        expect(OriginalaadharNumber).toEqual(currentaadharNumber)
        expect(OriginalPanCardNumber).toEqual(currentPanCardNumber)
        expect(OriginalpermanentAddress).toEqual(CurrentpermanentAddress)

        // TC_EM_034
        var OriginalaadharNumber = await this.page.locator('//*[@id="collapse3"]/div/div[2]/div[3]/div/div[2]/p').textContent()
        var OriginalPanCardNumber = await this.page.locator('//*[@id="collapse3"]/div/div[2]/div[7]/div/div[2]/p').textContent()
        var OriginalpermanentAddress = await this.page.locator('//*[@id="collapse3"]/div/div[2]/div[10]/div/div[2]/p').textContent()
        var permanentAddress = await AssetHelper.generateRandomString(5);

        await this.PersonalDetailsEditButton.click()
        await this.AadhaarCardNumber.clear()
        await this.AadhaarCardNumber.fill('765432131242')
        await this.PanCardNumber.clear()
        await this.PanCardNumber.fill('2324354231')
        await this.BloodGroup.selectOption({ label: 'B+ve' })
        await this.PermanentAddress.clear()
        await this.PermanentAddress.fill(permanentAddress)
        await this.UpdateButton.click()
        const toastVisible2 = await this.page.locator(".Toastify__toast-body").isVisible()
        expect(toastVisible2).toBe(true)
        const toastText2 = await this.page.locator(".Toastify__toast-body").textContent()
        expect(typeof toastText2).toBe("string")
        console.log(toastText2)
        var currentaadharNumber = await this.page.locator('//*[@id="collapse3"]/div/div[2]/div[3]/div/div[2]/p').textContent()
        var currentPanCardNumber = await this.page.locator('//*[@id="collapse3"]/div/div[2]/div[7]/div/div[2]/p').textContent()
        var CurrentpermanentAddress = await this.page.locator('//*[@id="collapse3"]/div/div[2]/div[10]/div/div[2]/p').textContent()
        expect(OriginalpermanentAddress).not.toEqual(CurrentpermanentAddress)
        await this.page.waitForTimeout(1000)

        // TC_EM_035 && TC_EM_037
        try {
            await this.WorkExperience.click()
            console.log('WorkExperince tab expanded Succesfully')
        } catch (error) {
            console.error('Experience tab Does not expanded', error)
        }
        var Norecord = await this.page.locator('//*[@id="collapse4"]/div/div/div/div/div').textContent()
        expect(Norecord).toEqual("No records available")

        // TC_EM_036
        try {
            await this.WorkExperience.click()
            console.log('WorkExperince tab collapse Succesfully')
        } catch (error) {
            console.error('Experience tab Does not Collapse', error)
        }

        // TC_EM_038 
        try {
            await this.Education.click()
            console.log('Education tab expanded Succesfully')
        } catch (error) {
            console.error('Education tab Does not expanded', error)
        }
        var Norecord = await this.page.locator('//*[@id="collapse5"]/div/div/div/div/div').textContent()
        expect(Norecord).toEqual("No records available")

        // TC_EM_039
        try {
            await this.Education.click()
            console.log('Education tab Collapse Succesfully')
        } catch (error) {
            console.error('Education tab Does not Collapse', error)
        }

        // TC_EM_40  && TC_EM_041
        try {
            await this.Dependents.click()
            console.log('Dependents tab expanded Succesfully')
        } catch (error) {
            console.error('Dependents tab Does not expanded', error)
        }
        var Norecord = await this.page.locator('//*[@id="collapse6"]/div/div/div/div/div').textContent()
        expect(Norecord).toEqual("No records available")

        // TC_EM_42
        try {
            await this.Dependents.click()
            console.log('Dependents tab Collapse Succesfully')
        } catch (error) {
            console.error('Dependents tab Does not Collapse', error)
        }
    }

    // async
    //     // TC_EM_043
    //     await this.AssignedAssets.click()
    //     await expect(this.AssignedRecords).toBeVisible()

    //     // TC_EM_044
    //     // await this.NextButton.click()
    //     // await this.page.waitForTimeout(1000)
    //     // expect(await this.PreviousButton.isEnabled()).toBeTruthy();

    //     // await this.PreviousButton.click()
    //     // await this.page.waitForTimeout(1000)
    //     // expect(await this.NextButton.isEnabled()).toBeTruthy();
    //     // expect(await this.PreviousButton.isEnabled()).toBeTruthy();

    async Employee_Access_Block() {
        // TC_EM_050

        await this.Employee_Management.click()
        await this.page.waitForTimeout(2000)
        await this.Employee_Directory_tab.click()
        await this.Card.click()
        await this.EmployeeAccess.click()
        expect(await this.CurrentStatus.isVisible())
        expect(await this.Status.isVisible())


        // TC_EM_051
        await this.EmployeeAccessStatus.textContent()
        await this.EmployeeAccessSubmitButton.click()
        var EmployeeAccessStatus = await this.EmployeeAccessStatus

        var tooltipMessage = await EmployeeAccessStatus.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log(tooltipMessage);
        expect(tooltipMessage).toBe('Please select an item in the list.')

        // TC_EM_052'
        // await this.page.pause()
        await this.EmployeeAccessStatus.selectOption({ label: 'BLOCKED (Temporally Disable)' })
        var CardName = await this.CardName.textContent()
        await this.EmployeeAccessSubmitButton.click()
        var SuccessMessage = console.log(await this.page.locator(".Toastify__toast-body").textContent())
        await this.page.waitForTimeout(3000)
        expect(await this.page.locator(".Toastify__toast-body").isVisible())

    }
    async Employee_Access_LeftOut() {


        // await this.SelectStatus.selectOption({ label: 'BLOCKED (Temporally Disable)' });
        // var TotalCards = await this.Employee_Directory_Cards.count()
        // var TotalEmployeeText = await this.TotalEmployeecount.textContent() || ""
        // var TotalEmployeecount = parseFloat(TotalEmployeeText.replace(/[^\d.]/g, '')) || 0



        // Initialize an empty array for storing the titles
        // let CardsTitle : string[]= [];

        // Pause to allow the page to load if needed
        // await this.page.pause();

        // Loop through each employee card and extract the title
        // for (let i = 0; i < TotalEmployeecount; i++) {
        //     let cardTitle = await this.Employee_Directory_cards_title.nth(i).textContent();

        //     if (cardTitle !== null && cardTitle.trim() !== '') {
        //         CardsTitle.push(cardTitle.trim());
        //     }
        // }
        // Log the titles
        // console.log(CardsTitle);
        // Ensure the correct variable name is used here
        // expect(CardsTitle).toContain(CardName);


        // TC_EM_053

        await this.Employee_Management.click()
        await this.page.waitForTimeout(2000)
        await this.Employee_Directory_tab.click()
        await this.Card.click()
        await expect(this.Loader.getThreeDotLoader()).not.toBeAttached()
        await this.EmployeeAccess.click()
        await this.EmployeeAccessStatus.selectOption({ label: 'LEFTOUT (Permanently Disable)' })
        await this.page.waitForTimeout(2000)
        await expect(this.page.locator('div:nth-child(3) > div.col-md-4 > div > div > input')).toBeVisible()
        await expect(this.page.locator("//textarea[@name = 'comment']")).toBeVisible()

        // TC_EM_054
        // await this.LeftOutSubmitbutton.click()
        // var LeftOutDateField = await this.LeftOutDate

        // var tooltipMessage = await LeftOutDateField.evaluate(el => (el as HTMLInputElement).validationMessage);
        // console.log(tooltipMessage);
        // expect(tooltipMessage).toBe('Please fill out this field.')


        // TC_EM_055
        await (this.page.locator('div:nth-child(3) > div.col-md-4 > div > div > input')).click()
        await this.page.locator("//div[@aria-current='date']").click()
        await this.LeftOutSubmitbutton.click()
        var LeftreasonField = await this.page.locator("//textarea[@name = 'comment']")

        var tooltipMessage = await LeftreasonField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log(tooltipMessage);
        expect(tooltipMessage).toBe('Please fill out this field.')

        // TC_EM_056
        var Leftreason = await this.page.locator("//textarea[@name = 'comment']").fill("Hello World !")
        await this.LeftOutSubmitbutton.click()
        console.log(await this.page.locator(".Toastify__toast-body").textContent())
        expect(await this.page.locator(".Toastify__toast-body").isVisible())


    }

    async Update_status() {

        await this.Employee_Management.click()
        await this.page.waitForTimeout(2000)
        await this.Employee_Directory_tab.click()

        await this.SelectStatus.selectOption({ label: 'LEFTOUT (Permanently Disable)' })
        expect(this.Loader.getThreeDotLoader()).not.toBeAttached()

        await this.page.locator(".col-md-4.col-lg-3:nth-child(1)").click()
        await this.EmployeeAccess.click()
        await this.EmployeeAccessStatus.selectOption({ label: 'VERIFIED' })
        await this.LeftOutSubmitbutton.click()
        console.log(await this.page.locator(".Toastify__toast-body").textContent())
        expect(await this.page.locator(".Toastify__toast-body").isVisible())
    }


    async AssignManager() {
        // TC_EM_061

        // await this.page.pause()
        await this.Employee_Management.click()
        await this.AssignManagertab.click()
        var AssignHeader = await this.AssignManagerHeader.textContent()
        expect(AssignHeader).toEqual("Assign Manager")
        expect(this.AssignManagerSubTabManager).toHaveText('Manager')
        expect(this.AssignManagerSubTabLeaveManager).toHaveText('Leave Manager')

        // TC_EM_062        
        await this.page.locator('#react-select-2-input').click()
        await this.page.waitForTimeout(2000)
        await this.page.locator("#react-select-2-option-0").click()
        await this.page.waitForTimeout(3000)
        await expect(this.Loader.getThreeDotLoader()).not.toBeAttached()
        var Coloumncount = await this.Coloumn.count()
        for (let i = 0; i < Coloumncount; i++) {
            var AssignColoumnData = this.Coloumn.nth(i);
            var AssignColoumnText = await AssignColoumnData.textContent();
            expect(AssignColoumnText).toEqual(this.ColoumnBody[i])
        }

        // TC_EM_063
        await this.ManagerActionButton.click()
        var PopupHeader = await this.PopupHeader.textContent()
        expect(PopupHeader).toEqual("Assign Manager")


        // TC_EM_064
        await this.CrossButton.click()
        await expect(this.PopupHeader).toBeHidden()

        // TC_EM_065
        await this.ManagerActionButton.click()
        await this.PopupDropDown.click()
        await this.page.locator("#react-select-3-option-0").click()
        await this.CancelButton.click()
        await expect(this.PopupHeader).toBeHidden()


        // TC_EM_066
        await this.ManagerActionButton.click()
        await this.PopupDropDown.click()
        await this.page.locator("#react-select-3-option-0").click()
        await this.PopupSubmitButton.click()
        console.log(await this.page.locator(".Toastify__toast-body").textContent())
        expect(await this.page.locator(".Toastify__toast-body").isVisible())



        // TC_EM_067
        await this.page.waitForTimeout(7000)
        await this.PopupDropDown.click()
        await this.page.locator("#react-select-3-option-2").click()
        await this.PopupSubmitButton.click()
        console.log(await this.page.locator(".Toastify__toast-body").textContent())
        expect(await this.page.locator(".Toastify__toast-body").isVisible())
    }

    async Assign_Leave_Manager() {
        // TC_EM_071
        await this.Employee_Management.click()
        await this.AssignManagertab.click()
        await this.AssignManagerSubTabLeaveManager.click()
        let LeaveManagerHeader = await this.page.locator("(//h3[@class = 'heading'])[2]").textContent()
        expect(LeaveManagerHeader).toEqual("Leave Manager")


        // TC_EM_072
        await this.LeaveManagerPopupDropDown.click()
        await this.page.locator("#react-select-4-option-0").click()
        await this.page.waitForTimeout(3000)
        await expect(this.Loader.getThreeDotLoader()).not.toBeAttached()
        var Coloumncount = await this.Coloumn.count()
        for (let i = 0; i < Coloumncount; i++) {
            var LeaveManagerData = this.Coloumn.nth(i);
            var LeaveManagerText = await LeaveManagerData.textContent();
            expect(LeaveManagerText).toEqual(this.ColoumnBody[i])
        }
        // TC_EM_073
        await this.LeaveManagerActionButton.click()
        var LeavePopupheader = await this.Pop_Up_Header.textContent()
        expect(LeavePopupheader).toEqual("Are you sure you want to delete ?")

        // TC_EM_074
        await this.NoButton.click()
        await expect(this.Pop_Up_Header).toBeHidden()

        // TC_EM_075
        await this.LeaveManagerActionButton.click()
        await this.YesButton.click()
        console.log(await this.page.locator(".Toastify__toast-body").textContent())
        expect(await this.page.locator(".Toastify__toast-body").isVisible())
        console.log(await this.page.locator("div>h4").textContent())
        await expect(this.page.locator("div>h4")).toBeVisible()
        await this.page.waitForTimeout(6000)

        // TC_EM_076

        await this.AssignButton.click()
        console.log(await this.AssignManagerPopupHeader.textContent())
        await expect(this.AssignManagerPopupHeader).toBeVisible()

        // TC_EM_077
        await this.AssignManagerPopupCrossicon.click()
        await expect(this.AssignManagerPopupHeader).toBeHidden()


        // TC_EM_078
        await this.AssignButton.click()
        await this.AssignManagerPopupCancleButton.click()
        await expect(this.AssignManagerPopupHeader).toBeHidden()

        // -----------------------------------------------------------
        await this.AssignButton.click()
        await this.AssignManagerPopupSubmitbutton.click()
        await this.page.waitForSelector(".Toastify__toast-body")
        console.log(await this.page.locator(".Toastify__toast-body").textContent())
        expect(await this.page.locator(".Toastify__toast-body").isVisible())
        await this.page.waitForTimeout(6000)
        // -----------------------------------------------------------


        // TC_EM_079
        // Select himself as manager
        await this.AssignManagerPopUpDropdown.click()
        await this.page.locator("#react-select-5-option-0").click()
        await this.AssignManagerPopupSubmitbutton.click()
        console.log(await this.page.locator(".Toastify__toast-body").textContent())
        expect(await this.page.locator(".Toastify__toast-body").isVisible())
        await this.page.waitForTimeout(6000)

        // TC_EM_080
        await this.AssignManagerPopUpDropdown.click()
        await this.AssignManagerPopupDropdownOption.click()
        await this.AssignManagerPopupSubmitbutton.click()
        console.log(await this.page.locator(".Toastify__toast-body").textContent())
        expect(await this.page.locator(".Toastify__toast-body").isVisible())
        await this.page.waitForTimeout(6000)

    }


    async Promotion_Management() {
        // TC_EM_081
        await this.Employee_Management.click()
        await this.PromotionManagement.click()
        await expect(this.Loader.getSpinLoader()).not.toBeAttached()
        console.log(await this.PromotionHeader.textContent())
        await expect(this.PromotionHeader).toBeVisible()

        // TC_EM_082
        await this.Dropdown.click()
        await this.PromotionDropdownOption.click()
        var PromotionColoumnCount = await this.PromotionColoumn.count()
        for (let i = 0; i < PromotionColoumnCount; i++) {
            var coloumnText = await this.PromotionColoumn.nth(i).textContent()
            expect(coloumnText).toEqual(this.PromotionColoumntext[i])
        }

        // TC_EM_083
        await this.PromoteButton.click()
        await expect(this.Loader.getThreeDotLoader()).not.toBeAttached()
        console.log(await this.PromotionPopUpHeader.textContent())
        expect(this.PromotionPopUpHeader).toBeVisible()
        let labelcount = await this.PromotionPopUpLabel.count()
        for (let i = 0; i < labelcount; i++) {
            let labelText = await this.PromotionPopUpLabel.nth(i).textContent()
            console.log(labelText)
        }

        // TC_EM_084
        await this.CrossButton.click()
        await expect(this.PromotionPopUpHeader).toBeHidden()

        // TC_EM_085
        await this.PromoteButton.click()
        await this.page.waitForTimeout(1000)
        await this.PromotionCancelButton.click()
        await expect(this.PromotionPopUpHeader).toBeHidden()

        // TC_EM_086
        await this.PromoteButton.click()
        await this.DepartmentDropdown.selectOption({ value: '5' })
        await this.page.waitForTimeout(7000)
        let DesignationoptionCount = await this.DesignationDropDownOptions.count()
        console.log(DesignationoptionCount)
        for (let i = 0; i < DesignationoptionCount; i++) {
            let DesignationOptionText = await this.DesignationDropDownOptions.nth(i).textContent()
            console.log(DesignationOptionText)
        }

        // TC_EM_087
        await this.DesignationDropdown.selectOption({ label: 'Sr. Solution Architect' })
        await this.PromoteEmployeePopUpSubmitButton.click()
        await this.page.waitForTimeout(500)
        console.log(await this.page.locator(".Toastify__toast-body").textContent())
        expect(await this.page.locator(".Toastify__toast-body").isVisible())
    }

    async Document_Upload() {
        // TC_EM_088
        await this.Employee_Management.click()
        await this.Document_upload_Tab.click()
        await expect(this.Loader.getSpinLoader()).not.toBeAttached()
        await this.Document_upload_Header.isVisible()
        var header = await this.Document_upload_Header.textContent()
        expect(header).toEqual("Document Upload")

    }
    async Document_Upload_DropDown() {
        // TC_EM_089
        await this.Employee_Management.click()
        await this.Document_upload_Tab.click()
        expect(this.Loader.getSpinLoader()).not.toBeAttached()
        await this.Dropdown.click()
        await this.page.locator("#react-select-2-option-0").click()
        await this.page.waitForTimeout(1000)
        var ColoumnCount = await this.Document_Upload_Column.count()
        console.log(ColoumnCount)
        for (let i = 0; i < ColoumnCount; i++) {
            var coloumnText = await this.Document_Upload_Column.nth(i).textContent()
            console.log(coloumnText)
            expect(coloumnText).toEqual(this.Document_Upload_Column_text[i])
        }
    }

    async Document_Upload_Upload_button() {
        // TC_EM_090
        await this.Employee_Management.click()
        await this.Document_upload_Tab.click()
        expect(this.Loader.getSpinLoader()).not.toBeAttached()
        await this.Dropdown.click()
        await this.page.locator("#react-select-2-option-0").click()
        await this.page.waitForTimeout(1000)
        await this.Upload_Icon.click()

        var PopUp_Header = await this.PopUp_Header.textContent()
        await this.PopUp_Header.isVisible()
        expect(PopUp_Header).toEqual("Upload Document Action")

    }
    async Document_Upload_Upload_button_Cancel_button() {
        // TC_EM_091
        await this.Document_Upload_Upload_button()
        await this.page.waitForTimeout(2000)
        await this.Popup_Cancel_button.click()
        await this.PopUp_Header.isHidden()

    }
    async Document_Upload_Upload_button_cross_Icon() {
        // TC_EM_092
        await this.Document_Upload_Upload_button()
        await this.page.waitForTimeout(2000)
        await this.Popup_Cross_button.click()
        await this.PopUp_Header.isHidden()
    }

    async Document_upload_PopUp_Functionality() {
        // TC_EM_093
        await this.Document_Upload_Upload_button()
        await this.page.waitForTimeout(200)
        await this.PopUP_Submit_button.click()
        var ChooseFileField = await this.Choose_file

        var tooltipMessage = await ChooseFileField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log(tooltipMessage);

        expect(tooltipMessage).toBe('Please select a file.')


        // TC_EM_094

        await this.page.waitForTimeout(7000)
        // await this.page.locator(".btn-close").click()``
        var fileInputSelector = "#file-input"
        var filePath = 'C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Files\\screenshot.png'; // Specify the path to the file you want to upload
        await this.page.setInputFiles(fileInputSelector, filePath);
        await this.page.waitForTimeout(1000)
        await this.PopUP_Submit_button.click()
        await this.page.waitForTimeout(1000)
        var commentField = await this.PopUp_comment

        var tooltipMessage = await commentField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log(tooltipMessage)

        expect(tooltipMessage).toBe('Please fill out this field.')


        // TC_EM_95
        await this.PopUp_comment.pressSequentially("Thank you !!")
        await this.PopUP_Submit_button.click()

        console.log(await this.page.locator(".Toastify__toast-body").textContent())
        expect(await this.page.locator(".Toastify__toast-body").isVisible())

    }

    // async Document_upload_Eye_Icon(context: BrowserContext) {
    //     // TC_EM_096

    //     await this.Employee_Management.click();
    //     await this.Document_upload_Tab.click();
    //     await this.page.waitForTimeout(500);
    //     await this.Document_upload_DropDown.click();
    //     await this.page.locator("#react-select-2-option-0").click();
    //     await this.page.waitForTimeout(1000);

    //     // Click the EyeIcon and wait for a new page to open
    //     const [newPage] = await Promise.all([
    //         context.waitForEvent('page'),
    //         this.EyeIcon.click(),  // Single click here inside Promise.all
    //     ]);

    //     // Wait for the new page to load completely
    //     await newPage.waitForLoadState();

    //     // Validate the URL contains or matches the expected
    // }    


    async performance_Evaluation() {
        // TC_EM_097

        await this.Employee_Management.click();
        await this.Performance_Evaluation.click()
        expect(this.Loader.getSpinLoader()).not.toBeAttached()
        await this.page.waitForTimeout(500);

        var header = await this.Performance_Header.textContent()
        expect(header).toEqual("Performance Evaluation")

        let Performance_Export_button = await this.Performance_Export_button.isVisible()
        expect(Performance_Export_button)
    }
    // async performance_Evaluation_Dropdown(){
    //     await this.performance_Evaluation()
    //     await this.Dropdown.click()
    //     await this.page.locator("#react-select-2-option-1").click()
    // }

    async Role_Management() {
        // TC_EM_101
        await this.Employee_Management.click();
        await this.Role_Managment.click()
        expect(this.Loader.getSpinLoader()).not.toBeAttached()
        await this.page.waitForTimeout(500);

        var header = await this.Role_Header.textContent()
        expect(header).toEqual("Role Management")

    }

    async Role_Management_DropDown() {
        // TC_EM_102
        await this.Role_Management()
        await this.Dropdown.click()
        var optioncount = await this.page.locator(".css-10wo9uf-option").count()
        for (let i = 0; i < optioncount; i++) {
            let option = await this.page.locator(".css-10wo9uf-option").nth(i)
            await expect(option).toBeVisible();
            let text = await this.page.locator(".css-10wo9uf-option").nth(i).textContent()
            console.log(text)
        }

        // TC_EM_103
        await this.page.locator("#react-select-2-option-1").click()
        await this.page.locator(".theme-button.ms-2 ").click()
        console.log(await this.page.locator(".Toastify__toast-body").textContent())
        expect(await this.page.locator(".Toastify__toast-body").isVisible())

        let message = await this.page.locator(".badge.badge-success.fs-5").textContent()
        console.log(message)
        expect(message).toEqual(" The role has been successfully assigned to Autom Mation User .")
    }

    async approve_document() {
        // TC_EM_104
        await this.Employee_Management.click();
        await this.Approve_Document.click()
        await this.page.waitForTimeout(3000)
        expect(this.Loader.getSpinLoader()).not.toBeAttached()
        const noRecords = await this.No_record
        if (await noRecords.isVisible()) {
            console.log("Approval for Pending Documents is not available.");
            return false;
        } else {
            var header = await this.Approve_Header.textContent()
            expect(header).toEqual("Approve Document")
            let labelcount = await this.Approve_Label.count()
            for (let i = 0; i < labelcount; i++) {
                let label = await this.Approve_Label.nth(i)
                expect(label).toBeVisible()
                let text = await this.Approve_Label.nth(i).textContent()
                console.log(text)
            }
        }
    }

    async Approve_Document_Document_type() {
        // TC_EM_105
        let isAvailable = await this.approve_document();
        if (!isAvailable) return;

        await this.page.waitForTimeout(2000);
        const labelCount = await this.Approve_Label_Exiting_Document_type.count();
        const uniqueTypes = new Set();

        for (let i = 0; i < labelCount - 1; i++) {
            const existingType = await this.Approve_Label_Exiting_Document_type.nth(i).textContent();
            if (existingType) {
                uniqueTypes.add(existingType.trim());
            }
        }

        console.log("Unique Approved Document Types:", [...uniqueTypes]);

        await this.Approve_Label_Document_type_dropdown.click();
        await this.page.waitForTimeout(2000);

        const options = this.page.locator('[id^="react-select-2-option"]');
        const dropdownCount = await options.count();
        const DropdownTypes = new Set();
        for (let i = 1; i < dropdownCount; i++) {
            const dropdownItem = await options.nth(i).textContent();
            if (dropdownItem) {
                DropdownTypes.add(dropdownItem.trim());
            }
        }
        console.log("Unique Approved Document Types:", [...DropdownTypes]);

        expect([...uniqueTypes].sort()).toEqual([...DropdownTypes].sort());
    }

    async Approve_Document_Employee() {
        // TC_EM_106
        const isAvailable = await this.approve_document();
        if (!isAvailable) return;
        await this.page.waitForTimeout(2000);

        const labelCount = await this.Approve_Label_Exiting_Employee.count();
        const uniqueTypes = new Set;

        for (let i = 0; i < labelCount - 1; i++) {
            const existingType = await this.Approve_Label_Exiting_Employee.nth(i).textContent();
            if (existingType) {
                uniqueTypes.add(existingType.trim());
            }
        }

        console.log("Unique Approved Employee Types:", [...uniqueTypes]);
        await this.Approve_Label_Employee_dropdown.click()
        await this.page.waitForTimeout(2000)
        const options = this.page.locator('[id^="react-select-3-option"]');
        const dropdownCount = await options.count();
        const DropdownTypes = new Set
        for (let i = 1; i < dropdownCount; i++) {
            const dropdownItem = await options.nth(i).textContent();
            if (dropdownItem) {
                DropdownTypes.add(dropdownItem.trim());
            }
        }
        console.log("Droopdown Employee Types:", [...DropdownTypes])

        expect([...uniqueTypes].sort()).toEqual([...DropdownTypes].sort())
    }

    async Approve_Document_Dropdown() {
        // TC_EM_107

        const isAvailable = await this.approve_document();
        if (!isAvailable) return;
        await this.Approve_Label_Document_type_dropdown.click()
        await this.page.locator("#react-select-2-option-1").click()
        await this.page.waitForTimeout(500)
        let SelectedOption = await this.page.locator("(//div[@class = ' css-1dimb5e-singleValue'])[1]").textContent()
        console.log(SelectedOption)

        await this.page.waitForTimeout(1500)
        const options = this.Approve_Label_Exiting_Document_type
        await this.page.waitForTimeout(1500)
        const dropdownCount = await options.count();
        const DropdownTypes = new Set
        for (let i = 0; i < dropdownCount - 1; i++) {
            const dropdownItem = await options.nth(i).textContent();
            if (dropdownItem) {
                DropdownTypes.add(dropdownItem.trim());
            }
        }
        console.log("Droopdown Document type :- ", [...DropdownTypes])
        expect([...DropdownTypes].sort()).toEqual([SelectedOption])
    }


    async Approve_Employee_Dropdown() {
        // TC_EM_108
        const isAvailable = await this.approve_document();
        if (!isAvailable) return;
        await this.Approve_Label_Employee_dropdown.click()
        await this.page.locator("#react-select-3-option-2").click()
        await this.page.waitForTimeout(500)
        let SelectedOption = await this.page.locator("(//div[@class = ' css-1dimb5e-singleValue'])[2]").textContent()
        console.log(SelectedOption)

        await this.page.waitForTimeout(1500)
        const options = this.Approve_Label_Exiting_Employee
        await this.page.waitForTimeout(1500)
        const dropdownCount = await options.count();
        const DropdownTypes = new Set
        for (let i = 0; i < dropdownCount - 1; i++) {
            const dropdownItem = await options.nth(i).textContent();
            if (dropdownItem) {
                DropdownTypes.add(dropdownItem.trim());
            }
        }
        console.log("Droopdown Document type :- ", [...DropdownTypes])
        expect([...DropdownTypes].sort()).toEqual([SelectedOption])
    }

    async Approve_Document_Action_button() {
        // TC_EM_109
        const isAvailable = await this.approve_document();
        if (!isAvailable) return;
        await this.Action_button.click()
        await this.page.waitForTimeout(1000)
        await this.Action_Button_popup.isVisible()
        let header = await this.Action_Button_popup.textContent()
        console.log(header)
        expect(header).toEqual('Verify Document')
    }

    async Action_button_popup_cancel() {
        // TC_EM_110
        const isAvailable = await this.approve_document();
        if (!isAvailable) return;
        await this.Approve_Document_Action_button()
        await this.page.locator(".cancel-approve").click()
        await this.page.waitForTimeout(1000)
        expect(await this.Action_Button_popup.isHidden()).toBe(true)
    }
    async Action_button_popup_Cross_icon() {
        // TC_EM_111
        const isAvailable = await this.approve_document();
        if (!isAvailable) return;
        await this.Approve_Document_Action_button()
        await this.page.locator(".btn-close").click()
        await this.page.waitForTimeout(1000)
        expect(await this.Action_Button_popup.isHidden()).toBe(true)
    }

    async Action_Button_Popup_Approved() {
        // TC_EM_112
        const isAvailable = await this.approve_document();
        if (!isAvailable) return;
        await this.Approve_Document_Action_button()
        try {
            const [download] = await Promise.all([
                this.page.waitForEvent("download", { timeout: 5000 }), // Reduced timeout for efficiency
                this.View_button.click()
            ]);

            const downloadedFile = download.suggestedFilename();
            console.log("Downloaded file:", downloadedFile);

            // Ensure the file has a .xlsx extension
            if (!downloadedFile) {
                throw new Error(`Invalid file extension: ${downloadedFile}`);
            }

            // Define file save path
            const downloadPath = `C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Download\\${downloadedFile}`;
            await download.saveAs(downloadPath);

            // Verify the file exists
            if (fs.existsSync(downloadPath)) {
                console.log(`File successfully downloaded: ${downloadPath}`);
            } else {
                throw new Error("Error: Downloaded file not found in expected location!");
            }

            // Assertion to confirm successful XLSX file download
            expect(fs.existsSync(downloadPath)).toBeTruthy();
        } catch (error) {
            console.error("Error during file download:", error);
        }

        // TC_EM_113
        await this.page.waitForTimeout(2000)
        await this.page.locator("//button[@class = 'theme-button ']").click()
        let Select_action_Dropdown_field = await this.Select_action_dropdown

        var tooltipMessage = await Select_action_Dropdown_field.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log(tooltipMessage);
        expect(tooltipMessage).toBe('Please select an item in the list.')
        await this.page.waitForTimeout(500)
        // TC_EM_114 -- TC_EM_115
        await this.Select_action_dropdown.selectOption({ value: 'approved' })
        await this.page.locator("//button[@class = 'theme-button ']").click()
        console.log(await this.page.locator(".Toastify__toast-body").textContent())
        expect(await this.page.locator(".Toastify__toast-body").isVisible())
    }

    async Action_Button_Popup_Rejected() {
        // TC_EM_116
        const isAvailable = await this.approve_document();
        if (!isAvailable) return;
        await this.Approve_Document_Action_button()
        await this.Select_action_dropdown.selectOption({ value: 'rejected' })
        await this.page.waitForTimeout(1000)
        await this.Reason_Section.isVisible()

        // TC_EM_117
        await this.page.locator("//button[@class = 'theme-button ']").click()
        let Reason_Section_Dropdown_field = await this.Reason_Section
        var tooltipMessage = await Reason_Section_Dropdown_field.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log(tooltipMessage);
        expect(tooltipMessage).toBe('Please fill out this field.')
        await this.page.waitForTimeout(1000)

        // TC_EM_118
        await this.Reason_Section.fill("Thank you !!")
        await this.page.locator("//button[@class = 'theme-button ']").click()
        console.log(await this.page.locator(".Toastify__toast-body").textContent())
        expect(await this.page.locator(".Toastify__toast-body").isVisible())
    }
    async Department() {
        // TC_EM_119
        await this.Employee_Management.click();
        this.Departments.click()
        await this.page.waitForTimeout(4000)
        expect(await this.Departments_Header.isVisible())
        let header = await this.Departments_Header.textContent()
        expect(header).toEqual('Departments')

    }
    async Department_No_of_records() {
        // TC_EM_120
        await this.Department()
        await this.page.waitForTimeout(2000)
        let Name_count = await this.Department_name.count()
        await this.page.waitForTimeout(2000)
        console.log(Name_count)
        let total_name = await this.No_Of_records.allTextContents()
        let totalNameCount = total_name.length > 0 ? parseInt(total_name[0].replace(/\D/g, ''), 10) : 0;
        await this.page.waitForTimeout(2000)
        console.log("TotalAsset :  ", totalNameCount)
    }
    async Departments_Search_Bar_Valid() {
        // TC_EM_121
        await this.Department()
        await this.page.waitForTimeout(2000)
        let existingname = await this.Department_name.allTextContents();
        let Entered_Name = [existingname[0]]
        console.log("Extracted Existing names :", Entered_Name);
        await this.Departments_SearchBar.pressSequentially(existingname[0])
        await this.page.waitForTimeout(2000)
        let filtered_Name = await this.Department_name
        let AfterSearchCount = await filtered_Name.count();
        let AfterSearchTypes = new Set
        for (let i = 0; i < AfterSearchCount; i++) {
            const AfterSearchName = await filtered_Name.nth(i).textContent();
            if (AfterSearchName) {
                AfterSearchTypes.add(AfterSearchName.trim());
            }
        }
        console.log("After Search Type :- ", [...AfterSearchTypes])
        expect([...AfterSearchTypes].sort()).toEqual(Entered_Name)
    }
    async Departments_Search_Bar_Invalid() {
        // TC_EM_0122
        await this.Department()
        await this.page.waitForTimeout(2000)
        await this.Departments_SearchBar.pressSequentially('utrewqerwq')
        await this.page.waitForTimeout(1000)
        await this.No_Record_avialable.isVisible()
        let No_record = await this.No_Record_avialable.textContent()
        console.log(No_record)
        expect(No_record).toEqual("No Record Available")
    }
    async Departments_Update_Icon() {
        // TC_EM_0123
        await this.Department()
        await this.page.waitForTimeout(2000)
        await this.updateIcon.click()
        await this.page.waitForTimeout(2000)
        expect(await this.Pop_Up_Header.isVisible())
        let header = await this.Pop_Up_Header.textContent()
        // console.log(header)
        expect(header).toEqual("Update  Department")

    }
    async Departments_cancel_button() {
        // TC_EM_0124
        await this.Departments_Update_Icon()
        await this.page.waitForTimeout(2000)
        await this.page.locator(".cancel-modal").click()
        await expect(this.Pop_Up_Header).toBeHidden()
    }
    async Departments_Cross_Icon() {
        // TC_EM_0125
        await this.Departments_Update_Icon()
        await this.page.waitForTimeout(2000)
        await this.page.locator(".btn-close").click()
        await expect(this.Pop_Up_Header).toBeHidden()
    }
    async Departments_Pop_up_functionality() {
        // TC_EM_0126
        await this.Departments_Update_Icon()
        await this.page.waitForTimeout(2000)
        await this.PopUP_Submit_button.click()
        let toast_message = await this.page.locator(".Toastify__toast-body").textContent()
        console.log(toast_message)
        expect(await this.page.locator(".Toastify__toast-body").isVisible())
        expect(toast_message).toEqual('Department not updated. Please try again after some time')


        // TC_EM_0127
        await this.page.waitForTimeout(7000)
        await this.Name_TextArea.clear()
        await this.PopUP_Submit_button.click()
        let NameField = await this.Name_TextArea
        var tooltipMessage = await NameField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log(tooltipMessage);
        expect(tooltipMessage).toBe('Please fill out this field.')

        // TC_EM_0128
        let Department_name = await AssetHelper.generateRandomString(6);
        await this.Name_TextArea.pressSequentially(Department_name)
        await this.PopUP_Submit_button.click()
        toast_message = await this.page.locator(".Toastify__toast-body").textContent()
        console.log(toast_message)
        expect(await this.page.locator(".Toastify__toast-body").isVisible())
        expect(toast_message).toEqual('Department successfully updated!')
    }
    async Departments_Add_Department() {
        // TC_EM_129
        await this.Department()
        await this.page.waitForTimeout(5000)
        await this.AddDepartmentButton.click()
        await expect(this.Pop_Up_Header).toBeVisible()
    }
    async Departments_Add_Department_cancel_button() {
        // TC_EM_0130
        await this.Departments_Add_Department()
        await this.page.waitForTimeout(2000)
        await this.page.locator(".cancel-modal").click()
        await expect(this.Pop_Up_Header).toBeHidden()
    }
    async Departments_Add_Department_Cross_Icon() {
        // TC_EM_0131
        await this.Departments_Add_Department()
        await this.page.waitForTimeout(2000)
        await this.page.locator(".btn-close").click()
        await expect(this.Pop_Up_Header).toBeHidden()
    }

    async Departments_Add_Department_functionality() {
        // TC_EM_0132
        await this.Departments_Add_Department()
        await this.page.waitForTimeout(2000)
        await this.PopUP_Submit_button.click()
        var NameField = await this.Name_TextArea

        var tooltipMessage = await NameField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log(tooltipMessage);

        expect(tooltipMessage).toBe('Please fill out this field.')
        await this.page.waitForTimeout(6000)

        // TC_EM_0133
        let Department_name = await AssetHelper.generateRandomString(6);
        await this.Name_TextArea.pressSequentially(Department_name)
        await this.PopUP_Submit_button.click()
        let toast_message = await this.page.locator(".Toastify__toast-body").textContent()
        console.log(toast_message)
        expect(await this.page.locator(".Toastify__toast-body").isVisible())
        expect(toast_message).toEqual("Department created successfully!")
    }


}
// export function await AssetHelper.generateRandomString(5)(length: any) {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
//     let result = '';
//     const charactersLength = characters.length;
//     for (let i = 0; i < length; i++) {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
// }
