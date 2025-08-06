import { test, expect } from '@playwright/test'
import { BasePage } from '../pages/Basepage';
import { LoginPage } from '../pages/LoginPage';
import { Employee_Management } from '../pages/Employee_Management';
import testData from '../testData/testData.json';

let EmployeeDirectory: Employee_Management
test.describe("'Employee Management > Assign Manager module'", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        const basepage = new BasePage(page)

        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);

        EmployeeDirectory = new Employee_Management(page)
        await EmployeeDirectory.expandEmployeeManagementTab()
        await EmployeeDirectory.navigateToDepartments()
    });

    test("should display Departments tab with correct header", async ({ page }) => {
        expect(await EmployeeDirectory.Departments_Header.isVisible())
        let header = await EmployeeDirectory.Departments_Header.textContent()
        expect(header).toEqual("Departments")
    });

    test("should display correct number of records in Departments tab", async ({ page }) => {
        let {Name_count , totalNameCount } = await EmployeeDirectory.Department_No_of_records()
        expect(Name_count).toEqual(totalNameCount)
    });


    
});