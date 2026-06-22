import { test, expect } from '@playwright/test'
import path from 'path'
import { LoginPage } from '../../pages/LoginPage'
import { PolicyEditor } from '../../pages/PolicyEditor'
import testData from '../../testData/testData.json'
import { DummyResume } from '../../utils/constants'

let policyEditor: PolicyEditor

test.describe.serial('Policy Editor Add Policy', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword)

        policyEditor = new PolicyEditor(page)
        await policyEditor.expandTab()
        await policyEditor.navigateToPolicyEditorPage()
    })

    test('Add a new policy @smoke @reg @ci', async ({ page }) => {
        const policyTitle = `Nav Test1-${Date.now()}`
        const validFromDay = 4
        const documentPath = path.resolve(process.cwd(), 'files', DummyResume)

        await policyEditor.clickAddPolicy()
        await expect(policyEditor.policyTitleInput).toBeVisible()

        await policyEditor.fillPolicyTitle(policyTitle)
        await policyEditor.selectRegion('India')
        await policyEditor.uploadPolicyDocument(documentPath)
        await policyEditor.selectValidFromDate(validFromDay)
        await policyEditor.fillPolicyDescription('Test')
        await policyEditor.submitPolicy()

        await policyEditor.searchPolicy(policyTitle)
        await expect(page.getByRole('cell', { name: policyTitle, exact: true })).toBeVisible()
    })
})
