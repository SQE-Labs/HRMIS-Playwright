import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import testData from "../testData/testData.json";
import { RoleManagement } from "../pages/Role_Management";
import * as constants from "../utils/constants";

let loginObj: LoginPage;
let roleManagement: RoleManagement; 
test.describe("Role Management Tests", () => {
    test.beforeEach(async ({ page }, testInfo) => { 
         loginObj = new LoginPage(page);
        roleManagement = new RoleManagement(page);
        console.log(">> Starting test case : " + testInfo.title);
    });

    // testcase failed due to 
    test('RM_1, Verify that Role Management UI elements are present @smoke @eti @knowBug#510', async ({ page }) => {
       
        await loginObj.validLogin(
            testData.SuperUser.UserEmail,
            testData.SuperUser.UserPassword
        );

        const roleName = "Automation Test Role";
        const roleDescription = "This is a role created by automation test.";
        const updatedRoleName = "Auto_Role_Updated";
        const updatedRoleDescription = "This role has been updated by automation test.";
        const checkboxTabName = "Analytics&Insights";
        const tabName = "Analytics & Insights;"

        // Navigating to Role Management tab
        await roleManagement.roleManagementTab.click();
        await roleManagement.navigateToRoleManagementTab("Role List");
        await page.waitForLoadState();

        // Adding new Role
        await roleManagement.addRole(roleName, roleDescription);
        // verify toast message
        let message = await roleManagement.toastMessage();
        console.log("Success  message: " + message);
        expect(message).toContain(constants.ROLE_ADD_SUCCESSMESSAGE);

        await page.waitForSelector('.Toastify__toast-body', { state: 'hidden', timeout: 5000 });
        
        await roleManagement.fetchLastRecordView("40");
        await page.waitForLoadState();
        // searching the created role
        await roleManagement.searchRoleByName(roleName);
        // waiting for search results to load
        await page.waitForLoadState();

        // --- VERIFY ROLE AND EDIT USING RELATIVE LOCATOR ---
        const roleRow = page.locator(`tr:has-text("${roleName}")`);
        await expect(roleRow).toBeVisible();

        const editButton = roleRow.getByText('Edit');
        await editButton.click();

        await roleManagement.roleTitleField.fill(updatedRoleName);
        await roleManagement.descriptionField.fill(updatedRoleDescription);
        await roleManagement.submitButton.click();

        // verify toast message
        let message1 = await roleManagement.toastMessage();
        console.log("Success  message: " + message1);
        // Successfully updated. message
        expect(message1?.trim()).toContain(constants.APPROVE_LEAVE_SUCCESSMESSAGE);
        await page.waitForSelector('.Toastify__toast-body', { state: 'hidden', timeout: 5000 });

        // refreshing the page to avoid stale element reference
        await page.reload()
        await page.waitForLoadState();
        await roleManagement.fetchLastRecordView("40");
        await page.waitForLoadState();
        // searching the updated role
        await roleManagement.searchRoleByName(updatedRoleName);
        // verify the updated role is present in the search result
        const updatedRoleTitle = page.getByText(updatedRoleName);
        await expect(updatedRoleTitle).toBeVisible();

        // navigate to Menu Assigment sub tab of Role Management
        await roleManagement.roleManagementTab.click();
        await roleManagement.navigateToRoleManagementTab("Menu Assignment");
        await page.waitForLoadState();

        // Select the updated role from the dropdown
        await roleManagement.selectRole(updatedRoleName);
        await roleManagement.waitForSpinnerLoaderToDisappear();

        // Check all sub tab checkboxes under "Analytics&Insights" tab
        await roleManagement.checkSubTabCheckbox(checkboxTabName);

        // store  checkboxTabName in a variable
        const expectedTabName = checkboxTabName;

        // click on submit button
        await roleManagement.submitButton.click();
        await roleManagement.waitForSpinnerLoaderToDisappear();

        // verify toast message
        let message2 = await roleManagement.toastMessage();
        console.log("Success  message: " + message2);
        // Successfully updated. message
        expect(message2?.trim()).toContain(constants.ROLE_UPDATE_SUCCESSMESSAGE);
        await page.waitForSelector('.Toastify__toast-body', { state: 'hidden', timeout: 5000 });

        // verify the information text
        await expect(roleManagement.successMsg).toBeVisible();
        await page.waitForLoadState();

        // Adding Code
        // Navigate to Employee Management tab to verify the assigned role
        await roleManagement.employeeManagementTab.click();
        await roleManagement.roleMangementSubTab.click();
        await page.waitForLoadState();

        // select the employee from the dropdown
        await roleManagement.selectEmloyee(testData.LEAVE_EMP_NAME2);
        await roleManagement.waitForSpinnerLoaderToDisappear();

        // select the updated role checkbox 
        // Verify that the user can see the role checkbox in the sidebar
        const updatedRoleCheckbox = page.getByRole('checkbox', { name: updatedRoleName });
        await updatedRoleCheckbox.check();
        await expect(updatedRoleCheckbox).toBeChecked();
        await page.waitForLoadState();
        // click on submit button
        await roleManagement.submitButton.click();
        await roleManagement.waitForSpinnerLoaderToDisappear();

        // verify toast message
        let message3 = await roleManagement.toastMessage();
        console.log("Success  message: " + message3);
        // Successfully updated. message
        expect(message3?.trim()).toContain(constants.ROLE_UPDATE_SUCCESSMESSAGE);
        await page.waitForSelector('.Toastify__toast-body', { state: 'hidden', timeout: 5000 });

        // verify the information text
        await expect(roleManagement.roleAssignSuccessMsg).toBeVisible();
        await page.waitForLoadState();

        // logout user
        await loginObj.logout();

        // Login as the employee to verify the assigned role
        await loginObj.validLogin(
            testData.Employee.UserEmail,
            testData.SuperUser.UserPassword
        );
        await page.waitForLoadState();


        // Verify that the user can see the tab corresponding to the assigned role in the sidebar
        // Locate the sidebar tab using the selected checkbox name
        const sidebarTab = page.getByRole('link', { name: new RegExp(expectedTabName.replace('&', '\\s*&\\s*'), 'i') });

        // Wait for it to be visible
        await expect(sidebarTab).toBeVisible();

        // Get and print the actual visible tab name
        const actualTabName = await sidebarTab.innerText();
        // Normalize both strings by removing spaces
        const normalize = (str: string) => str.replace(/\s/g, '');

        // Assert after normalization
        expect(normalize(actualTabName)).toBe(normalize(expectedTabName));
        console.log(" Visible tab is: " + actualTabName);

        
        // Logout the employee user
        await loginObj.logout();

        // Login back as SuperUser to delete the created role
        await loginObj.validLogin(
            testData.SuperUser.UserEmail,
            testData.SuperUser.UserPassword
        );

        //waiting for page to load
        await page.waitForLoadState();

        // before deleting unassign the role from employee
        await roleManagement.employeeManagementTab.click();
        await roleManagement.roleMangementSubTab.click();
        await page.waitForLoadState();

        // select the employee from the dropdown
        await roleManagement.selectEmloyee(testData.LEAVE_EMP_NAME2);
        await roleManagement.waitForSpinnerLoaderToDisappear();

        // select the updated role checkbox 
        // Verify that the user can see the role checkbox in the sidebar
        const roleCheckbox = page.getByRole('checkbox', { name: updatedRoleName });
        await roleCheckbox.uncheck();
        await expect(roleCheckbox).not.toBeChecked();
        await page.waitForLoadState();

        // click on submit button
        await roleManagement.submitButton.click();
        await roleManagement.waitForSpinnerLoaderToDisappear();

        // verify toast message
        let unassignMessage = await roleManagement.toastMessage();
        console.log("Unassign Role Success  message: " + unassignMessage);
        expect(unassignMessage?.trim()).toContain(constants.ROLE_UPDATE_SUCCESSMESSAGE);
        await page.waitForSelector('.Toastify__toast-body', { state: 'hidden', timeout: 5000 });

        // Navigate back to Role List tab to delete the created role
        await roleManagement.roleManagementTab.click();
        await roleManagement.navigateToRoleManagementTab("Role List");
        await page.waitForLoadState(); 
        await page.reload(); 
        await page.waitForLoadState();

        await roleManagement.fetchLastRecordView("40");
        await page.waitForLoadState();

        // searching the updated role to delete
        await roleManagement.searchRoleByName(updatedRoleName); 
        // waiting for search results to load
        await page.waitForLoadState();  

        // --- VERIFY ROLE AND DELETE USING RELATIVE LOCATOR ---
        const deleteRoleRow = page.locator(`tr:has-text("${updatedRoleName}")`);

        // Wait for the row to appear
        await expect(deleteRoleRow).toBeVisible({ timeout: 5000 });

        // Wait for Delete button inside this row
        const deleteButton = deleteRoleRow.getByText('Delete');
        await expect(deleteButton).toBeVisible({ timeout: 5000 });

        // Click Delete
        await deleteButton.click();
        await roleManagement.yesButton.click();
        await roleManagement.waitForSpinnerLoaderToDisappear();

        // verify toast message 
        let deleteMessage = await roleManagement.toastMessage();
        console.log("Delete Success  message: " + deleteMessage);
        expect(deleteMessage).toContain(constants.ROLE_DELETE_SUCCESSMESSAGE);   
       
    });

});