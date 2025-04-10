import { test, expect } from '@playwright/test'
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
    
    test("EmployeedirectoryCard" , async ({page}) =>{
        await Employee_Directory.EmployeedirectoryCard()
    })
    
    test("EmployeeAccessBlock " , async ({page}) =>{
        await Employee_Directory.Employee_Access_Block()
    })
    
    test.skip("EmployeeAccessLeftout " , async ({page}) =>{
        await Employee_Directory.Employee_Access_LeftOut()
    })

    test("EmployeeAccess Update Status " , async ({page}) =>{
        await Employee_Directory.Update_status()
    })
    test("Assign Manager tab " , async ({page}) =>{
        await Employee_Directory.AssignManager()
    })
    test("Assign Leave manager tab " , async ({page}) =>{
        await Employee_Directory.Assign_Leave_Manager()
    })

    test("Promotion Management tab " , async ({page}) =>{
        await Employee_Directory.Promotion_Management()
    })
})