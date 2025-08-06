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
    public Record_notfound: Locator
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
    public refreshbutton: Locator
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
    public LeftOutCommentField: Locator
    public leftoutcurrentDate: Locator
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
    public DropdownOption: Locator
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
    public AssignedAsset: Locator
    public itemsPerPage: Locator
    public pageCount: Locator
    public leftOutCards: Locator
    public selectEmployeeOption: Locator


    constructor(page: Page) {
        super(page)
        this.Employee_Management = page.locator("//a[text()='Employee Management']")
        this.Employee_Directory_tab = page.locator("//a[text()='Employee Directory']")
        this.Employee_Directory_tab_Header = page.locator(".d-flex")
        this.Employee_Directory_Cards = page.locator(".col-md-4.col-lg-3")
        this.TotalEmployeecount = page.locator(".total")
        this.Employee_Directory_Searchbar = page.locator("//input[@name = 'search']")
        this.Employee_Directory_cards_title = page.locator(".card-title.text-primary")
        this.Record_notfound = page.locator(".fs-4")
        this.SelectDepartment = page.locator("#department")
        this.cardTextDepartment = page.locator("//small[@class = 'card-text']")
        this.SelectStatus = page.locator("#selectedStatus")
        this.Card = page.locator(`.card-title.text-primary`)
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
        this.refreshbutton = page.locator('//button[text() = "Refresh"]')
        this.AssignedRecords = page.locator(".table-responsive.mt-4")
        this.NextButton = page.getByText('Next')
        this.PreviousButton = page.getByText('Previous')
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
        this.DropdownOption = page.locator("#react-select-2-option-1")
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
        this.AssignedAsset = page.locator('(//div[@class ="table-responsive mt-4"])/table/tbody/tr')
        this.itemsPerPage = page.locator("#itemsPerPage");
        this.pageCount = page.locator(".page-link.text-dark.disabled");
        this.LeftOutDate = page.locator("div:nth-child(3) > div.col-md-4 > div > div > input")
        this.LeftOutCommentField = page.locator("//textarea[@name = 'comment']")
        this.leftoutcurrentDate = page.locator("//div[@aria-current='date']")
        this.leftOutCards = page.locator(".col-md-4.col-lg-3")
        this.selectEmployeeOption = page.locator("#react-select-2-option-2")
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

    async getWorkExperience() {
        let TotalExperience = await this.page.locator('(//table[@class = "resume custom"])[1]/tbody/tr').count()
        console.debug(TotalExperience)

        return TotalExperience
    }

    async getEmployeeEducation() {
        let TotalEducation = await this.page.locator('(//table[@class = "resume custom"])[2]/tbody/tr').count()
        console.debug(TotalEducation)

        return TotalEducation
    }
    async getEmployeeDependents() {
        let TotalDependents = await this.page.locator('(//table[@class = "resume custom"])[3]/tbody/tr').count()
        console.debug(TotalDependents)

        return TotalDependents
    }

    async searchByEmployeeDirectorySearchBar(EmployeeName: string) {
        await this.Employee_Directory_Searchbar.pressSequentially(EmployeeName)
    }

    async optionSelection(locator: Locator, Option: string) {
        await locator.selectOption({ label: Option });
    }

    async noRecord(value) {
        var Norecord = await this.Record_notfound.nth(value).textContent()
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
        let card = this.Card.nth(14)
        let Name = await card.innerText()

        await card.click()
        return Name

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

    async clickOnPersonalDetails() {
        await this.PersonalDetails.click()

    }
    async clickOnPersonalDetailEdit() {
        await this.PersonalDetailsEditButton.click()

    }

    async getOriginalPeronalDetails() {
        var OriginalaadharNumber = await this.page.locator('//*[@id="collapse3"]/div/div[2]/div[3]/div/div[2]/p').textContent()
        var OriginalPanCardNumber = await this.page.locator('//*[@id="collapse3"]/div/div[2]/div[7]/div/div[2]/p').textContent()
        var OriginalpermanentAddress = await this.page.locator('//*[@id="collapse3"]/div/div[2]/div[10]/div/div[2]/p').textContent()
        return { OriginalaadharNumber, OriginalPanCardNumber, OriginalpermanentAddress }
    }

    async getUpdatedPerosnalDetails() {
        var currentaadharNumber = await this.page.locator('//*[@id="collapse3"]/div/div[2]/div[3]/div/div[2]/p').textContent()
        var currentPanCardNumber = await this.page.locator('//*[@id="collapse3"]/div/div[2]/div[7]/div/div[2]/p').textContent()
        var CurrentpermanentAddress = await this.page.locator('//*[@id="collapse3"]/div/div[2]/div[10]/div/div[2]/p').textContent()
        return { currentaadharNumber, currentPanCardNumber, CurrentpermanentAddress }
    }

    async clickOnWorkExperience() {
        await this.WorkExperience.click()
    }

    async clickOnEducation() {
        await this.Education.click()
    }
    async clickOnDependents() {
        await this.Dependents.click()
    }

    async clickOnAssignedAssets() {
        await this.AssignedAssets.click()

    }

    // async
    //     // TC_EM_043
    //     await this.AssignedAssets.click()
    // await expect(this.AssignedRecords).toBeVisible()

    //     // TC_EM_044
    //     // await this.NextButton.click()
    //     // await this.page.waitForTimeout(1000)
    //     // expect(await this.PreviousButton.isEnabled()).toBeTruthy();

    //     // await this.PreviousButton.click()
    //     // await this.page.waitForTimeout(1000)
    //     // expect(await this.NextButton.isEnabled()).toBeTruthy();
    //     // expect(await this.PreviousButton.isEnabled()).toBeTruthy();


    async clickOnEmployeeAccessSubTab() {
        await this.EmployeeAccess.click()

    }

    async getItemPerPage() {
        await this.itemsPerPage.waitFor({ state: 'visible' });
        await this.itemsPerPage.click();
        const selectedValue = parseInt((await this.itemsPerPage.inputValue()).trim(), 10);
        console.log("Selected Value: ", selectedValue);
        return selectedValue
    }

    async getAssignedAssets() {
        let TotalAssignedAssets = await this.AssignedAsset.count()
        console.debug(TotalAssignedAssets)
        return TotalAssignedAssets
    }


    async pagination() {

    }

    async navigateToAssignManager() {
        await this.AssignManagertab.click()
    }

    async getColumnCount() {
        var Coloumncount = await this.Coloumn.count()
        for (let i = 0; i < Coloumncount; i++) {
            var AssignColoumnData = this.Coloumn.nth(i);
            var AssignColoumnText = await AssignColoumnData.textContent();
            expect(AssignColoumnText).toEqual(this.ColoumnBody[i])
        }
        return Coloumncount
    }
    async clickOnActionButton() {
        await this.ManagerActionButton.click()
    }
    async clickOnCrossButton() {
        await this.CrossButton.click()

    }
    async clickOnCancelButton() {
        await this.CancelButton.click()

    }

    async verifyCollapseIsHidden(value: number) {
        await expect(this.page.locator(`#collapse${value}`).last()).toBeHidden()
    }
    async selectionofAssignManager(value) {
        await this.page.locator(`#react-select-3-option-${value}`).click()

    }
    async selectionOfLeaveManager(value) {
        await this.page.locator(`#react-select-4-option-${value}`).click()

    }
    async clickOnAssignManagerSubTabLeaveManager() {
        await this.AssignManagerSubTabLeaveManager.click()
    }
    async leaveManagerNotAssigned() {
        let Coloumncount = await this.getColumnCount()
        if (Coloumncount === 0) {
            expect(this.noRecord(1)).toEqual("Leave manager not assigned")
            await this.AssignButton.click()
            await this.PopupDropDown.click()
            await this.selectionofAssignManager(0)
            await this.PopupSubmitButton.click()
            let message = await this.toastMessage()
            expect(message).toEqual("Successfully Assigned!")
        }
    }
    async clickOnNOButton() {
        await this.NoButton.click()

    }

    async clickOnYesButton() {
        await this.YesButton.click()

    }

    // async Assign_Leave_Manager() {


    //     await this.AssignButton.click()
    //     console.log(await this.AssignManagerPopupHeader.textContent())
    //     await expect(this.AssignManagerPopupHeader).toBeVisible()

    //     // TC_EM_077
    //     await this.AssignManagerPopupCrossicon.click()
    //     await expect(this.AssignManagerPopupHeader).toBeHidden()


    //     // TC_EM_078
    //     await this.AssignButton.click()
    //     await this.AssignManagerPopupCancleButton.click()
    //     await expect(this.AssignManagerPopupHeader).toBeHidden()

    //     // -----------------------------------------------------------
    //     await this.AssignButton.click()
    //     await this.AssignManagerPopupSubmitbutton.click()
    //     await this.page.waitForSelector(".Toastify__toast-body")
    //     console.log(await this.page.locator(".Toastify__toast-body").textContent())
    //     expect(await this.page.locator(".Toastify__toast-body").isVisible())
    //     await this.page.waitForTimeout(6000)
    //     // -----------------------------------------------------------


    //     // TC_EM_079
    //     // Select himself as manager
    //     await this.AssignManagerPopUpDropdown.click()
    //     await this.page.locator("#react-select-5-option-0").click()
    //     await this.AssignManagerPopupSubmitbutton.click()
    //     console.log(await this.page.locator(".Toastify__toast-body").textContent())
    //     expect(await this.page.locator(".Toastify__toast-body").isVisible())
    //     await this.page.waitForTimeout(6000)

    //     // TC_EM_080
    //     await this.AssignManagerPopUpDropdown.click()
    //     await this.AssignManagerPopupDropdownOption.click()
    //     await this.AssignManagerPopupSubmitbutton.click()
    //     console.log(await this.page.locator(".Toastify__toast-body").textContent())
    //     expect(await this.page.locator(".Toastify__toast-body").isVisible())
    //     await this.page.waitForTimeout(6000)

    // }

    async navigateToPromotionManagement() {
        await this.PromotionManagement.click()
    }
    async getLabelCount() {
        let labelcount = await this.PromotionPopUpLabel.count()
        for (let i = 0; i < labelcount; i++) {
            let labelText = await this.PromotionPopUpLabel.nth(i).textContent()
            console.log(labelText)
        }

    }

    async getDesignationoptionCount() {
        let DesignationoptionCount = await this.DesignationDropDownOptions.count()
        console.log(DesignationoptionCount)
        for (let i = 0; i < DesignationoptionCount; i++) {
            let DesignationOptionText = await this.DesignationDropDownOptions.nth(i).textContent()
            console.log(DesignationOptionText)
        }
    }
    async LeaveManagerData() {
        var Coloumncount = await this.Coloumn.count()
        for (let i = 0; i < Coloumncount; i++) {
            var LeaveManagerData = this.Coloumn.nth(i);
            var LeaveManagerText = await LeaveManagerData.textContent();
            expect(LeaveManagerText).toEqual(this.ColoumnBody[i])
        }
    }

    async navigateToDocumentUploadTab() {
        await this.Document_upload_Tab.click()
    }



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

    async navigateToRoleManagement() {
        await this.Role_Managment.click()
        await this.waitforLoaderToDisappear()
    }

    async navigaeToApproveDocument() {
        await this.Approve_Document.click()
        await this.waitforLoaderToDisappear()
        // TC_EM_103
    }

    async getTextSetFromLocator(locator: Locator, startIndex = 0): Promise<Set<string>> {
        const count = await locator.count();
        const values = new Set<string>();

        for (let i = startIndex; i < count; i++) {
            const text = await locator.nth(i).textContent();
            if (text) values.add(text.trim());
        }

        return values;
    }



    async checkNoRecordsAndReturn(): Promise<boolean> {
        const noRecords = await this.No_record;
        return await noRecords.isVisible();
    }
    async getUniqueTextSetFromLocator(locator: Locator, start = 0, end?: number): Promise<Set<string>> {
        const count = await locator.count();
        const values = new Set<string>();
        const loopEnd = end !== undefined ? Math.min(end, count) : count;

        for (let i = start; i < loopEnd; i++) {
            const text = await locator.nth(i).textContent();
            if (text) {
                values.add(text.trim());
            }
        }

        return values;
    }

    async selectDropdownOptionByIndex(index: number) {
        await this.Approve_Label_Employee_dropdown.click();
        await this.page.locator(`#react-select-3-option-${index}`).click();
    }


    async navigateToDepartments() {
        // TC_EM_11;
        await this.Departments.click()
        await this.waitforLoaderToDisappear()
    }

    async Department_No_of_records() {
        // TC_EM_120
        let Name_count = await this.Department_name.count()
        await this.page.waitForTimeout(2000)
        console.log(Name_count)
        let total_name = await this.No_Of_records.allTextContents()
        let totalNameCount = total_name.length > 0 ? parseInt(total_name[0].replace(/\D/g, ''), 10) : 0;
        await this.page.waitForTimeout(2000)
        console.log("TotalAsset :  ", totalNameCount)
        return {Name_count , totalNameCount}
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
