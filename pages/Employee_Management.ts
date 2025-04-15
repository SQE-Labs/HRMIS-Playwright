import { Page, Locator, expect, BrowserContext } from '@playwright/test'
import { BasePage } from './BasePage'
import { Loader } from '../Components/Loaders'
import { ADDRGETNETWORKPARAMS, TIMEOUT } from 'dns'
import { totalmem } from 'os'
import { count, error } from 'console'
import exp from 'constants'


export class Employee_Management extends BasePage {

    private Employee_Management: Locator
    private Employee_Directory_tab: Locator
    private Employee_Directory_tab_Header: Locator
    private Employee_Directory_Cards: Locator
    private TotalEmployeecount: Locator
    private Employee_Directory_Searchbar: Locator
    private Employee_Directory_cards_title: Locator
    private Employee_Directory_Card_notfound: Locator
    private SelectDepartment: Locator
    private cardTextDepartment: Locator
    private SelectStatus: Locator
    private Card: Locator
    private EmployeeProfile: Locator
    private BasicInfo: Locator
    private AccordionBodyKey: Locator
    private AccordionBodyValue: Locator
    private BasicInfoAccordionBody: string[]
    private BasicInfoEditButton: Locator
    private BasicInfoFirstname: Locator
    private BasicInfoLastName: Locator
    private UpdateButton: Locator
    private CloseButton: Locator
    private WorkAccordion: Locator
    private WorkAccordionkey: Locator
    private WorkAccordionBody: string[]
    private WorkDate: Locator
    private EmployeeType: Locator
    private WorkEditButton: Locator
    private PersonalDetails: Locator
    private PersonalDetailsKey: Locator
    private PersonalDetailsBody: string[]
    private PersonalDetailsEditButton: Locator
    private PersonalDetailsDate: Locator
    private AadhaarCardNumber: Locator
    private PanCardNumber: Locator
    private PresentAddress: Locator
    private BloodGroup: Locator
    private MaritalStatus: Locator
    private AlternateNumber: Locator
    private PermanentAddress: Locator
    private PassportNumber: Locator
    private WorkExperience: Locator
    private Education: Locator
    private Dependents: Locator
    private AssignedAssets: Locator
    private AssignedRecords: Locator
    private NextButton: Locator
    private PreviousButton: Locator
    private EmployeeAccess: Locator
    private CurrentStatus: Locator
    private Status: Locator
    private EmployeeAccessStatus: Locator
    private EmployeeAccessSubmitButton: Locator
    private CardName: Locator
    private Loader: Loader
    private LeftOutDate: Locator
    private Leftreason: Locator
    private LeftOutSubmitbutton: Locator
    private AssignManagertab: Locator
    private AssignManagerHeader: Locator
    private AssignManagerSubTabManager: Locator
    private AssignManagerSubTabLeaveManager: Locator
    private AssignManagerDropdown: Locator
    private Coloumn: Locator
    private ColoumnBody: string[]
    private ManagerActionButton: Locator
    private PopupHeader: Locator
    private CrossButton: Locator
    private PopupDropDown: Locator
    private PopupSubmitButton: Locator
    private CancelButton: Locator
    private LeaveManagerPopupDropDown: Locator
    private LeaveManagerActionButton: Locator
    private LeeaveManagerPopupHeader: Locator
    private NoButton: Locator
    private YesButton: Locator
    private AssignButton: Locator
    private AssignManagerPopUpDropdown: Locator
    private AssignManagerPopupHeader: Locator
    private AssignManagerPopupDropdownOption: Locator
    private AssignManagerPopupCrossicon: Locator
    private AssignManagerPopupCancleButton: Locator
    private AssignManagerPopupSubmitbutton: Locator
    private PromotionManagement: Locator
    private PromotionHeader: Locator
    private PromotionColoumn: Locator
    private PromotionColoumntext: string[]
    private Dropdown: Locator
    private PromotionDropdownOption: Locator
    private PromoteButton: Locator
    private PromotionPopUpHeader: Locator
    private PromotionPopUpLabel: Locator
    private PromotionCancelButton: Locator
    private DepartmentDropdown: Locator
    private DesignationDropdown: Locator
    private DesignationDropDownOptions: Locator
    private PromoteEmployeePopUpSubmitButton: Locator
    private Document_upload_Tab: Locator
    private Document_upload_Header: Locator
    private Document_Upload_Column: Locator
    private Document_Upload_Column_text: string[]
    private Upload_Icon: Locator
    private PopUp_Header: Locator
    private Popup_Cross_button: Locator
    private Popup_Cancel_button: Locator
    private Choose_file: Locator
    private PopUP_Submit_button: Locator
    private PopUp_comment: Locator
    private EyeIcon: Locator
    private Performance_Evaluation: Locator
    private Performance_Header: Locator
    private Performance_Export_button: Locator
    private Role_Managment: Locator
    private Role_Header: Locator
    private Approve_Document: Locator
    private Approve_Header: Locator
    private Approve_Label: Locator
    private Approve_Label_Document_type_dropdown: Locator
    private Approve_Label_Employee_dropdown: Locator
    private Approve_Label_Exiting_Document_type: Locator
    private Approve_Label_Exiting_Employee : Locator




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
        this.Card = page.locator(".col-md-4.col-lg-3:nth-child(14)")
        this.EmployeeProfile = page.locator(".employee-profile")
        this.BasicInfo = page.locator("#heading1")
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
        this.LeeaveManagerPopupHeader = page.locator("div>div>div>div>h5")
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
        this.Upload_Icon = page.locator("(//i[@class = 'fa fa-upload'])[1]")
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


    }
    async Employee() {
        // TC_EM_001
        try {
            await this.Employee_Management.click()
            console.log('Employee Management tab expanded Succesfully')
        } catch (error) {
            console.error('Employee Managment tab Does not expanded', error)
        }
        await this.page.waitForTimeout(2000)
        await this.Employee_Directory_tab.click()
        expect(this.Loader.getThreeDotLoader()).not.toBeAttached()
        const Directory_Header = await this.Employee_Directory_tab_Header.textContent()
        expect(Directory_Header?.trim()).toEqual("Employee Directory")

        await this.page.waitForTimeout(3000)
        var TotalCards = await this.Employee_Directory_Cards.count()
        var TotalEmployeeText = await this.TotalEmployeecount.textContent() || ""
        var TotalEmployeecount = parseFloat(TotalEmployeeText.replace(/[^\d.]/g, '')) || 0
        expect(TotalCards).toEqual(TotalEmployeecount)

        // TC_EM_002
        await this.Employee_Directory_Searchbar.pressSequentially("TEST Account SQE")
        var TotalCards = await this.Employee_Directory_Cards.count()
        var TotalCardsText = await this.Employee_Directory_cards_title.textContent() || ""
        expect(TotalCardsText.trim().replace(/\s+/g, ' ')).toContain("TEST Account SQE")
        var TotalEmployeeTextContent = await this.TotalEmployeecount.textContent() || ""
        var TotalEmployeecount = parseFloat(TotalEmployeeTextContent.replace(/[^\d.]/g, '')) || 0
        expect(TotalCards).toEqual(TotalEmployeecount)


        // TC_EM_003
        await this.Employee_Directory_Searchbar.clear()
        await this.Employee_Directory_Searchbar.pressSequentially("123213") //Invalid Employee
        var Norecord = await this.Employee_Directory_Card_notfound.textContent()
        expect(Norecord).toEqual("No Record Available")


        // TC_EM_004
        await this.Employee_Directory_Searchbar.clear()
        await this.page.waitForTimeout(2000)
        // await this.SelectDepartment.click()
        await this.SelectDepartment.selectOption({ label: 'Technical' });
        await this.page.waitForTimeout(7000)
        await expect(this.Loader.getThreeDotLoader()).not.toBeAttached()
        var TotalCards = await this.Employee_Directory_Cards.count()
        var TotalEmployeeTextContent = await this.TotalEmployeecount.textContent() || ""
        var TotalEmployeecount = parseFloat(TotalEmployeeTextContent.replace(/[^\d.]/g, '')) || 0
        expect(TotalCards).toEqual(TotalEmployeecount)


        // TC_EM_005
        await this.page.waitForTimeout(2000)
        await this.SelectStatus.selectOption({ label: 'LEFTOUT (Permanently Disable)' });
        await expect(this.Loader.getThreeDotLoader()).not.toBeAttached()
        var TotalCards = await this.Employee_Directory_Cards.count()
        var TotalEmployeeTextContent = await this.TotalEmployeecount.textContent() || ""
        var TotalEmployeecount = parseFloat(TotalEmployeeTextContent.replace(/[^\d.]/g, '')) || 0
        expect(TotalCards).toEqual(TotalEmployeecount)


        // TC_EM_006
        await this.SelectDepartment.selectOption({ label: 'Admin' });
        await expect(this.Loader.getThreeDotLoader()).not.toBeAttached()
        var TotalCards = await this.Employee_Directory_Cards.count()
        if (TotalCards === 0) {
            try {
                var Norecord = await this.Employee_Directory_Card_notfound.textContent()
                expect(Norecord).toEqual("No Record Available")
            } catch (error) {
                throw error
            }
        } else {
            var TotalEmployeeTextContent = await this.TotalEmployeecount.textContent() || ""
            var TotalEmployeecount = parseFloat(TotalEmployeeTextContent.replace(/[^\d.]/g, '')) || 0
            expect(TotalCards).toEqual(TotalEmployeecount)
        }


        // TC_EM_007
        await this.SelectDepartment.selectOption({ label: 'Technical' });
        await this.SelectStatus.selectOption({ label: 'BLOCKED (Temporally Disable)' });
        await this.page.waitForTimeout(4000)
        await expect(this.Loader.getThreeDotLoader()).not.toBeAttached()
        var TotalCards = await this.Employee_Directory_Cards.count()
        if (TotalCards === 0) {
            try {
                var Norecord = await this.Employee_Directory_Card_notfound.textContent()
                expect(Norecord).toEqual("No Record Available")
            } catch (error) {
                throw error
            }
        } else {
            var TotalEmployeeTextContent = await this.TotalEmployeecount.textContent() || ""
            var TotalEmployeecount = parseFloat(TotalEmployeeTextContent.replace(/[^\d.]/g, '')) || 0
            expect(TotalCards).toEqual(TotalEmployeecount)
        }


    }
    async EmployeedirectoryCard() {
        // TC_EM_008
        await this.Employee_Management.click()
        await this.page.waitForTimeout(2000)
        await this.Employee_Directory_tab.click()
        await this.Card.click()
        await this.EmployeeProfile.isVisible()

        // TC_EM_009
        await this.BasicInfo.click()
        const AccordionBodycount = await this.AccordionBodyKey.count();

        for (let i = 0; i < AccordionBodycount; i++) {
            var AccordionBodydata = this.AccordionBodyKey.nth(i);
            var AccordionBodyText = await AccordionBodydata.textContent();
            expect(AccordionBodyText).toEqual(this.BasicInfoAccordionBody[i])
        }

        // TC_EM_010
        await this.BasicInfo.click();
        await this.page.waitForTimeout(1000);
        expect(await this.page.locator("heading1").isHidden()).toBe(true)

        // TC_EM_011
        await this.page.waitForTimeout(2000)
        await this.BasicInfo.click();
        await this.BasicInfoEditButton.click()
        await this.BasicInfoFirstname.clear()
        await this.UpdateButton.click()
        var FirstnameField = await this.BasicInfoFirstname

        var tooltipMessage = await FirstnameField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log(tooltipMessage);

        expect(tooltipMessage).toBe('Please fill out this field.')


        // TC_EM_013
        await this.BasicInfo.click();
        await this.page.waitForTimeout(2000)
        await this.BasicInfoEditButton.click()
        await this.BasicInfoLastName.clear()
        await this.UpdateButton.click()
        var LastNameField = await this.BasicInfoFirstname

        var tooltipMessage = await LastNameField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log(tooltipMessage);

        expect(tooltipMessage).toBe('Please fill out this field.')


        // TC_EM_014
        await this.CloseButton.click()
        var originalFirstName = await this.page.locator('#collapse1 > div > div:nth-child(2) > div:nth-child(2) > div > p:nth-child(1)').textContent();
        var originalLastName = await this.page.locator('#collapse1 > div > div:nth-child(2) > div:nth-child(2) > div > p:nth-child(2)').textContent();
        var originalMiddleName = await this.page.locator('#collapse1 > div > div:nth-child(2) > div:nth-child(4) > div > p:nth-child(1)').textContent();
        await this.BasicInfoEditButton.click()
        await this.BasicInfoFirstname.clear()
        await this.BasicInfoFirstname.fill('Archit')
        await this.BasicInfoLastName.clear()
        await this.BasicInfoLastName.fill('Khurana')
        await this.CloseButton.click()
        var CurrentFirstName = await this.page.locator('#collapse1 > div > div:nth-child(2) > div:nth-child(2) > div > p:nth-child(1)').textContent();
        var CurrentLastName = await this.page.locator('#collapse1 > div > div:nth-child(2) > div:nth-child(2) > div > p:nth-child(2)').textContent();
        var CurrentMiddleName = await this.page.locator('#collapse1 > div > div:nth-child(2) > div:nth-child(4) > div > p:nth-child(1)').textContent();
        expect(originalFirstName).toEqual(CurrentFirstName)
        expect(originalLastName).toEqual(CurrentLastName)
        expect(originalMiddleName).toEqual(CurrentMiddleName)


        // TC_EM_015
        function generateRandomString(length) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        // Generate random first and last names
        var randomFirstName = generateRandomString(8);
        var randomLastName = generateRandomString(10);

        // Get the original names before editing
        var originalFirstName = await this.page.locator('#collapse1 > div > div:nth-child(2) > div:nth-child(2) > div > p:nth-child(1)').textContent();
        var originalLastName = await this.page.locator('#collapse1 > div > div:nth-child(2) > div:nth-child(2) > div > p:nth-child(2)').textContent();

        // Click edit button and update names
        await this.BasicInfoEditButton.click();
        await this.BasicInfoFirstname.clear();
        await this.BasicInfoFirstname.fill(randomFirstName);
        await this.BasicInfoLastName.clear();
        await this.BasicInfoLastName.fill(randomLastName);
        await this.UpdateButton.click();

        // Get the updated names
        var CurrentFirstName = await this.page.locator('#collapse1 > div > div:nth-child(2) > div:nth-child(2) > div > p:nth-child(1)').textContent();
        var CurrentLastName = await this.page.locator('#collapse1 > div > div:nth-child(2) > div:nth-child(2) > div > p:nth-child(2)').textContent();

        expect(originalFirstName).not.toEqual(CurrentFirstName)
        expect(originalLastName).not.toEqual(CurrentLastName)
        await this.page.waitForTimeout(500)
        console.log(await this.page.locator(".Toastify__toast-body").textContent())
        expect(await this.page.locator(".Toastify__toast-body").isVisible())


        // TC_EM_016
        try {
            await this.WorkAccordion.click()
            console.log(' WorkAccordion expanded Succesfully')
        } catch (error) {
            console.error('WorkAccordion Does not expanded', error)
        }
        await this.page.waitForTimeout(1000)

        const WorkAccordionkeycount = await this.WorkAccordionkey.count()

        for (let i = 0; i < WorkAccordionkeycount; i++) {
            const WorkAccordionkey = await this.WorkAccordionkey.nth(i)
            const WorkAccordionkeytext = await WorkAccordionkey.textContent()
            expect(WorkAccordionkeytext).toEqual(this.WorkAccordionBody[i])
        }


        // TC_EM_017
        await this.WorkAccordion.click()
        await this.page.waitForTimeout(1000)
        expect(await this.page.locator("heading2").isHidden()).toBe(true)

        // TC_EM_018
        await this.WorkAccordion.click()
        await this.WorkEditButton.click()
        await this.WorkDate.clear()
        await this.UpdateButton.click()

        var DateOfjoiningField = await this.WorkDate

        var tooltipMessage = await DateOfjoiningField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log(tooltipMessage);

        expect(tooltipMessage).toBe('Please fill out this field.')

        // TC_EM_019
        await this.WorkDate.fill("2090-12-12")
        await this.EmployeeType.selectOption({ label: 'Select Employee Sub Type' })
        await this.UpdateButton.click()
        var EmployeeTypeField = await this.EmployeeType

        var tooltipMessage = await EmployeeTypeField.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log(tooltipMessage);

        expect(tooltipMessage).toBe('Please select an item in the list.')

        // TC_EM_020
        await this.CloseButton.click()
        var ExistingDate = await this.page.locator('//*[@id="collapse2"]/div/div[2]/div[4]/div/p[1]').textContent()
        await this.WorkEditButton.click()
        await this.WorkDate.fill("2090-12-12")
        await this.CloseButton.click()
        var CurrentDate = await this.page.locator('//*[@id="collapse2"]/div/div[2]/div[4]/div/p[1]').textContent()
        expect(ExistingDate).toEqual(CurrentDate)

        // TC_EM_021
        var ExistingDate = await this.page.locator('//*[@id="collapse2"]/div/div[2]/div[4]/div/p[1]').textContent()
        await this.WorkEditButton.click()
        var futureDate = new Date();
        // Generate a random number of days between 1 and 365 (1 year ahead)
        var randomDays = Math.floor(Math.random() * 365) + 1;
        futureDate.setDate(futureDate.getDate() + randomDays);
        // Format the future date as 'YYYY-MM-DD'
        const futureDates = futureDate.toISOString().split('T')[0];
        await this.WorkDate.fill(futureDates);
        await this.UpdateButton.click()
        var CurrentDate = await this.page.locator('//*[@id="collapse2"]/div/div[2]/div[4]/div/p[1]').textContent()
        expect(ExistingDate).not.toEqual(CurrentDate)

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
            // console.log(PersonalDetailskeytext)
            expect(PersonalDetailskeytext).toEqual(this.PersonalDetailsBody[i])
        }


        // TC_EM_023
        await this.PersonalDetails.click()
        await this.page.waitForTimeout(1000)
        expect(await this.page.locator("heading3").isHidden()).toBe(true)

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
        var permanentAddress = generateRandomString(8);

        await this.PersonalDetailsEditButton.click()
        await this.AadhaarCardNumber.clear()
        await this.AadhaarCardNumber.fill('765432131242')
        await this.PanCardNumber.clear()
        await this.PanCardNumber.fill('2324354231')
        await this.BloodGroup.selectOption({ label: 'B+ve' })
        await this.PermanentAddress.clear()
        await this.PermanentAddress.fill(permanentAddress)
        await this.UpdateButton.click()
        console.log(await this.page.locator(".Toastify__toast-body").textContent())
        expect(await this.page.locator(".Toastify__toast-body").isVisible())
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
        var LeavePopupheader = await this.LeeaveManagerPopupHeader.textContent()
        expect(LeavePopupheader).toEqual("Are you sure you want to delete ?")

        // TC_EM_074
        await this.NoButton.click()
        await expect(this.LeeaveManagerPopupHeader).toBeHidden()

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
        await this.page.locator("#react-select-2-option-0").click()
        await this.page.locator(".theme-button.ms-2 ").click()
        console.log(await this.page.locator(".Toastify__toast-body").textContent())
        expect(await this.page.locator(".Toastify__toast-body").isVisible())

        let message = await this.page.locator(".badge.badge-success.fs-5").textContent()
        console.log(message)
        expect(message).toEqual(" The role has been successfully assigned to TEST Account SQE .")
    }

    async approve_document() {
        // TC_EM_104
        await this.Employee_Management.click();
        await this.Approve_Document.click()
        expect(this.Loader.getSpinLoader()).not.toBeAttached()
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

    async Approve_Document_Document_type() {
        // TC_EM_105
        await this.approve_document();
        await this.page.waitForTimeout(2000);
        const labelCount = await this.Approve_Label_Exiting_Document_type.count();
        const uniqueTypes = new Set;

        for (let i = 0; i < labelCount - 1; i++) {
            const existingType = await this.Approve_Label_Exiting_Document_type.nth(i).textContent();
            if (existingType) {
                uniqueTypes.add(existingType.trim());
            }
        }

        console.log("Unique Approved Document Types:", [...uniqueTypes]);


        await this.Approve_Label_Document_type_dropdown.click()

        await this.page.waitForTimeout(2000)
        const options = this.page.locator('[id^="react-select-2-option"]');
        const dropdownCount = await options.count();
        const DropdownTypes = new Set
        for (let i = 1; i < dropdownCount; i++) {
            const dropdownItem = await options.nth(i).textContent();
            if (dropdownItem) {
                DropdownTypes.add(dropdownItem.trim());
            }
        }
        console.log("Unique Approved Document Types:",[...DropdownTypes])

        expect([...uniqueTypes].sort()).toEqual([...DropdownTypes].sort())
    }

    async Approve_Document_Employee() {
        // TC_EM_106

        await this.approve_document();
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
        console.log("Droopdown Employee Types:",[...DropdownTypes])

        expect([...uniqueTypes].sort()).toEqual([...DropdownTypes].sort())
        
    }

}
