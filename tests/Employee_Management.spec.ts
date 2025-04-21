import { test, expect} from '@playwright/test'
import { BasePage } from '../pages/BasePage';
import { LoginPage } from '../pages/LoginPage';
import { Login } from '../Support/Command';
import { Employee_Management } from '../pages/Employee_Management';

let Employee_Directory
test.describe("'Employee Management module'", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        const basepage = new BasePage(page)

        await basepage.open('url')
        await page.waitForTimeout(2000)
        await Login.login(page, "SuperUser")
        Employee_Directory = new Employee_Management(page)

    });

    test("Employee Management tab", async ({ page }) => {
        await Employee_Directory.Employee()
    })

    test("EmployeedirectoryCard", async ({ page }) => {
        await Employee_Directory.EmployeedirectoryCard()
    })

    test("EmployeeAccessBlock ", async ({ page }) => {
        await Employee_Directory.Employee_Access_Block()
    })

    test.skip("EmployeeAccessLeftout ", async ({ page }) => {
        await Employee_Directory.Employee_Access_LeftOut()
    })

    test("EmployeeAccess Update Status ", async ({ page }) => {
        await Employee_Directory.Update_status()
    })
    test("Assign Manager tab ", async ({ page }) => {
        await Employee_Directory.AssignManager()
    })
    test("Assign Leave manager tab ", async ({ page }) => {
        await Employee_Directory.Assign_Leave_Manager()
    })

    test("Promotion Management tab ", async ({ page }) => {
        await Employee_Directory.Promotion_Management()
    })

    test("Document Upload Tab", async ({ page }) => {
        await Employee_Directory.Document_Upload()
    })
    test("Document Upload Dropdown", async ({ page }) => {
        await Employee_Directory.Document_Upload_DropDown()
    })
    test("Document Upload upload button ", async ({ page }) => {
        await Employee_Directory.Document_Upload_Upload_button()
    })
    test("Document Upload upload button cancel button functionality ", async ({ page }) => {
        await Employee_Directory.Document_Upload_Upload_button_Cancel_button()
    })
    test("Document Upload upload button cross icon functionality ", async ({ page }) => {
        await Employee_Directory.Document_Upload_Upload_button_cross_Icon()
    })
    test("Document Upload PopUp Functionality ", async ({ page }) => {
        await Employee_Directory.Document_upload_PopUp_Functionality()
    })
    // test.only("Document Upload Eye Icon", async ({ page, browser}) => {
    //     await Employee_Directory.Document_upload_Eye_Icon()
    // })

    test("Performance Evaluation subtab ", async ({ page }) => {
        await Employee_Directory.performance_Evaluation()
    })

    test("Role Management subtab ", async ({ page }) => {
        await Employee_Directory.Role_Management()
    })
    test("Role Management Dropdown ", async ({ page }) => {
        await Employee_Directory.Role_Management_DropDown()
    })
    test("Approve Document tab ", async ({ page }) => {
        await Employee_Directory.approve_document()
    })
    test("Approve Document Document type ", async ({ page }) => {
        await Employee_Directory.Approve_Document_Document_type()
    })
    test("Approve Document Employee ", async ({ page }) => {
        await Employee_Directory.Approve_Document_Employee()
    })
    test("Approve Document Dropdown ", async ({ page }) => {
        await Employee_Directory.Approve_Document_Dropdown()
    })
    test("Approve Employee Dropdown ", async ({ page }) => {
        await Employee_Directory.Approve_Employee_Dropdown()
    })
    test("Approve Action Button ", async ({ page }) => {
        await Employee_Directory.Approve_Document_Action_button()
    })
    test("Approve Cancel button ", async ({ page }) => {
        await Employee_Directory.Action_button_popup_cancel()
    })
    test("Approve Cross Icon ", async ({ page }) => {
        await Employee_Directory.Action_button_popup_Cross_icon()
    })
    test("Approve Popup Approve functionaliy ", async ({ page }) => {
        await Employee_Directory.Action_Button_Popup_Approved()
    })
    test("Approve Popup Rejected functionality ", async ({ page }) => {
        await Employee_Directory.Action_Button_Popup_Rejected()
    })
    test("Departments  ", async ({ page }) => {
        await Employee_Directory.Department()
    })
    test("Departments no. of records...  ", async ({ page }) => {
        await Employee_Directory.Department_No_of_records()
    })
    test("Departments search bar valid ...  ", async ({ page }) => {
        await Employee_Directory.Departments_Search_Bar_Valid()
    })
    test("Departments search bar Invalid ...  ", async ({ page }) => {
        await Employee_Directory.Departments_Search_Bar_Invalid()
    })
    test("Departments Update Icon ...  ", async ({ page }) => {
        await Employee_Directory.Departments_Update_Icon()
    })
    
    test("Departments Cancel Button ...  ", async ({ page }) => {
        await Employee_Directory.Departments_cancel_button()
    })
    test("Departments Cross Icon ...  ", async ({ page }) => {
        await Employee_Directory.Departments_Cross_Icon()
    })
    test("Departments pop up functionality ...  ", async ({ page }) => {
        await Employee_Directory.Departments_Pop_up_functionality()
    })
    test("Department + Add Department  ", async ({ page }) => {
        await Employee_Directory.Departments_Add_Department()
    })
    test("Departments Add Department Cancel Button ...  ", async ({ page }) => {
        await Employee_Directory.Departments_Add_Department_cancel_button()
    })
    test("Departments Add Department Cross Icon ...  ", async ({ page }) => {
        await Employee_Directory.Departments_Add_Department_Cross_Icon()
    })
    test("Department + Add Department Functionality...  ", async ({ page }) => {
        await Employee_Directory.Departments_Add_Department_functionality()
    })

})