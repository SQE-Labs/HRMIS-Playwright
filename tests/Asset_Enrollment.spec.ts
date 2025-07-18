import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Loginpage';
import { AssetEnrollment } from '../pages/New_Asset_Enrollment';
import { BasePage } from '../pages/Basepage';
import testData from '../testData/testData.json';
import { ASSET_TYPE_COLUMN_LEFT, FILL_FIELD, MODEL_COLUMN, SELECT_ITEM, UNSUPPORTED_FILE, VALID_XLSX_FILE } from '../utils/constants';
import { asyncWrapProviders } from 'async_hooks';
import { assert } from 'console';


let assetEnrollment: AssetEnrollment;

test.describe('Asset Enrollment Page', () => {
    test.beforeEach(async ({ page }) => {
        const loginObj = new LoginPage(page);
        await loginObj.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);
        assetEnrollment = new AssetEnrollment(page);
        await page.waitForLoadState('domcontentloaded')
        await assetEnrollment.expandAssetManagementTab()
        await assetEnrollment.navigateToNewAssetEnrollmet();
        await assetEnrollment.waitforLoaderToDisappear()
        await page.waitForTimeout(3000);

    });

    test('New Asset Enrollment Page', async ({ page }) => {
        expect(await assetEnrollment.assetEnrollmentHeader.isVisible()).toBeTruthy();
        expect(await assetEnrollment.assetEnrollmentTabs.isVisible()).toBeTruthy();
        expect(await assetEnrollment.createAssetTabs.allTextContents()).toEqual(assetEnrollment.createAssetTabsDetails);
        await assetEnrollment.enrollment();
    });
    // to-do
    test('New Asset Enrollment Create Asset-positive', async ({ page }) => {
        await assetEnrollment.fillAllMandatoryField(
            'USB HUB Adapter',
            '342ASD',
            'CAELIUS_OWNED',
            "Caelius",
            'HP02',
            await assetEnrollment.generateRandomInteger(5)
        );
        await assetEnrollment.clickOnSubmitButton();
        // add assertion here
    });


    test('New Asset Enrollment Create Asset-  blank asset type validation', async ({ page }) => {
        await assetEnrollment.clickOnSubmitButton()

        let tooltipMessage = await assetEnrollment.getValidationMessage(assetEnrollment.assetType)
        expect(tooltipMessage).toBe(SELECT_ITEM);

    });
    test('New Asset Enrollment Create Asset-  blank Model validation', async ({ page }) => {
        await assetEnrollment.SelectAssetType("USB HUB Adapter")
        await assetEnrollment.clickOnSubmitButton()
        let tooltipMessage = await assetEnrollment.getValidationMessage(assetEnrollment.model)
        expect(tooltipMessage).toBe(FILL_FIELD);
    });
    test('New Asset Enrollment Create Asset-   Model validation', async () => {
        await assetEnrollment.fillAllMandatoryField('USB HUB Adapter', '342ASD', 'CAELIUS_OWNED', "Caelius", 'HP02', '6900')
        await assetEnrollment.clickOnSubmitButton()
        let message2 = await assetEnrollment.validationMessage.textContent();
        console.debug(message2)
        expect(assetEnrollment.validationMessage.isVisible()).toBeTruthy();
        expect(message2).toEqual('Entry cannot contain only numbers and special characters')
        await assetEnrollment.fillAllMandatoryField('USB HUB Adapter', '1234567890123456789012345678901234567890145', 'CAELIUS_OWNED', "Caelius", 'HP02', '6900')
        await assetEnrollment.clickOnSubmitButton();
        let message = await assetEnrollment.validationMessage.textContent();
        console.debug(message)
        expect(message).toEqual('Model cannot exceed 40 characters.')
    })


    test('New Asset Enrollment Create Asset-  blank super owner validation', async ({ page }) => {
        await assetEnrollment.SelectAssetType("USB HUB Adapter")
        await assetEnrollment.fillModelNumber("MODEL");
        await assetEnrollment.clickOnSubmitButton()
        let tooltipMessage = await assetEnrollment.getValidationMessage(assetEnrollment.superOwnerLocator)
        expect(tooltipMessage).toBe(SELECT_ITEM);
    });
    test('New Asset Enrollment Create Asset-  blank  owner validation', async ({ page }) => {
        await assetEnrollment.SelectAssetType("USB HUB Adapter")
        await assetEnrollment.fillModelNumber("MODEL");
        await assetEnrollment.selectSuperOwner(testData.DefaultSuperOwner)
        if (await assetEnrollment.superOwnerLocator.selectOption({ label: testData.DefaultSuperOwner })) {
            let text = await assetEnrollment.ownerLocator.allInnerTexts();
            let lines = text[0].split('\n').map(s => s.trim());
            expect(lines).toEqual(['Select an owner', 'Caelius', 'Consultant', 'SQE Labs']);
            expect(await assetEnrollment.ownerLocator.isVisible()).toBeTruthy();
        }
        await assetEnrollment.clickOnSubmitButton()
        let tooltipMessage = await assetEnrollment.getValidationMessage(assetEnrollment.ownerLocator)
        expect(tooltipMessage).toBe(SELECT_ITEM);

    });
    test('New Asset Enrollment Create Asset-  blank  manufacturer validation', async ({ page }) => {
        await assetEnrollment.SelectAssetType("USB HUB Adapter")
        await assetEnrollment.fillModelNumber("MODEL");
        await assetEnrollment.selectSuperOwner(testData.DefaultSuperOwner)
        await assetEnrollment.selectOwner('Caelius')
        await assetEnrollment.clickOnSubmitButton()
        let tooltipMessage = await assetEnrollment.getValidationMessage(assetEnrollment.manufacturer)
        expect(tooltipMessage).toBe(FILL_FIELD);
    });
    test('New Asset Enrollment Create Asset-  blank  serial number validation', async ({ page }) => {
        await assetEnrollment.SelectAssetType("USB HUB Adapter")
        await assetEnrollment.fillModelNumber("MODEL");
        await assetEnrollment.selectSuperOwner(testData.DefaultSuperOwner)
        await assetEnrollment.selectOwner('Caelius')
        await assetEnrollment.fillManufracture('HP40')
        await assetEnrollment.clickOnSubmitButton()
        let tooltipMessage = await assetEnrollment.getValidationMessage(assetEnrollment.serialNumber)
        expect(tooltipMessage).toBe(FILL_FIELD);

    });
    test('New Asset Enrollment Create Asset- Warranty year validtaion', async ({ page }) => {
        await assetEnrollment.fillAllMandatoryField('USB HUB Adapter', '342ASD', 'CAELIUS_OWNED', "Caelius", 'HP02', await assetEnrollment.generateRandomInteger(5))
        await expect(assetEnrollment.warrantyYear).toBeDisabled();
        await assetEnrollment.fillWarrantyYear('1')
        await expect(assetEnrollment.warrantyYear).toBeEnabled();
        // Enter Negative Warrenty Year
        await assetEnrollment.fillWarrantyYear('-1')
        await assetEnrollment.clickOnSubmitButton()
        let message = await assetEnrollment.validationMessage.textContent();
        console.debug(message)
        expect(message).toEqual('Value must be greater than or equal to 1')
        // Enter More than 10 Warrenty Year
        await assetEnrollment.fillWarrantyYear('11')
        await assetEnrollment.clickOnSubmitButton()
        let message2 = await assetEnrollment.validationMessage.textContent();
        console.debug(message2)
        expect(message2).toEqual('Years cannot be more than 10')
        // Enter More then 120 and select month
        await assetEnrollment.fillWarrantyYear('121')
        await assetEnrollment.warrantyYear.selectOption({ label: 'Month' });
        await assetEnrollment.clickOnSubmitButton()
        let message3 = await assetEnrollment.validationMessage.textContent();
        console.debug(message3)
        expect(message3).toEqual('Months cannot be more than 120')

    });


    test('New Asset Enrollment Create Asset- purchase field  validtaion', async ({ page }) => {
        await assetEnrollment.fillAllMandatoryField('USB HUB Adapter', '342ASD', 'CAELIUS_OWNED', "Caelius", 'HP02', await assetEnrollment.generateRandomInteger(5))
        const purchaseCostValue = await assetEnrollment.purchaseCost.getAttribute('value');
        expect(purchaseCostValue).toEqual("0");
        // Enter Only Special Characters in purchase field
        await assetEnrollment.fillPurchase('@#$%$')
        await assetEnrollment.clickOnSubmitButton()
        let message4 = await assetEnrollment.validationMessage.textContent();
        console.debug(message4)
        expect(message4).toEqual('Must be a valid number')
        // Enter Amount More than 10 lacs
        await assetEnrollment.fillPurchase('1000001')
        await assetEnrollment.clickOnSubmitButton()
        let message5 = await assetEnrollment.validationMessage.textContent();
        console.debug(message5)
        expect(message5).toEqual('Amount must be less than or equal to 10,00,000 (10 Lacs)')
    });

    test('User try to enter more than 40 characters in Model field', async () => {
        await assetEnrollment.fillAllMandatoryField('USB HUB Adapter', '1234567890123456789012345678901234567890145', 'CAELIUS_OWNED', "Caelius", 'HP02', '6900')
        await assetEnrollment.clickOnSubmitButton();
        let message = await assetEnrollment.validationMessage.textContent();
        console.debug(message)
        expect(message).toEqual('Model cannot exceed 40 characters.')
    })
    test('User try to enter more than 40 characters in Manufracturer field', async () => {
        await assetEnrollment.fillAllMandatoryField('USB HUB Adapter', 'ABC23', 'CAELIUS_OWNED', "Caelius", '1234567890123456789012345678901234567890145', '6900')
        await assetEnrollment.clickOnSubmitButton();
        let message = await assetEnrollment.validationMessage.textContent();
        console.debug(message)
        expect(message).toEqual('Manufacturer cannot exceed 40 characters.')
    })
    test('Try to enter only numbers in Manufracturer field', async () => {
        await assetEnrollment.fillAllMandatoryField('USB HUB Adapter', 'ABC23', 'CAELIUS_OWNED', "Caelius", '342ASD', '6900')
        await assetEnrollment.clickOnSubmitButton()
        let message = await assetEnrollment.validationMessage.textContent();
        console.debug(message)
        expect(assetEnrollment.validationMessage.isVisible()).toBeTruthy();
        expect(message).toEqual('Entry cannot contain only numbers and special characters')
    })

    test('User try to enter more than 40 characters in Serial number field', async () => {
        await assetEnrollment.fillAllMandatoryField('USB HUB Adapter', 'ABC23', 'CAELIUS_OWNED', "Caelius", 'HP03', '1234567890123456789012345678901234567890145')
        await assetEnrollment.clickOnSubmitButton();
        let message = await assetEnrollment.validationMessage.textContent();
        console.debug(message)
        expect(message).toEqual('Serial Number must not exceed 40 characters.')
    })

    test('User try to enter Special charcters only in  Serial number field', async () => {
        await assetEnrollment.fillAllMandatoryField('USB HUB Adapter', 'ABC23', 'CAELIUS_OWNED', "Caelius", 'HP03', '@#$%')
        await assetEnrollment.clickOnSubmitButton();
        let message = await assetEnrollment.validationMessage.textContent();
        console.debug(message)
        expect(message).toEqual('Entry cannot contain only special characters')
    })

    test('User try to enter Existing Serial number', async ({ page }) => {
        await assetEnrollment.fillAllMandatoryField('USB HUB Adapter', 'ABC23', 'CAELIUS_OWNED', "Caelius", 'HP03', '13')
        await assetEnrollment.clickOnSubmitButton();
        expect(await assetEnrollment.getToastMessage()).toEqual("The serial number provided is a duplicate; an asset with this serial number already exists")

    })

    test('Navigate to bulk create asset', async () => {
        await assetEnrollment.navigateToBulkCreateAsset()
        await expect(assetEnrollment.bulkAssetHeader).toBeVisible();
        await expect(assetEnrollment.chooseButton).toBeVisible();
        await expect(assetEnrollment.submitButton).toBeVisible();
    })

    test('bulk create asset  Upload valid .xls / .xlsx file', async ({ page }) => {
        await assetEnrollment.navigateToBulkCreateAsset()
        await assetEnrollment.uploadAndVerifyFile(VALID_XLSX_FILE, page, assetEnrollment.submitButton, assetEnrollment.popupMessage)
        await assetEnrollment.clickOnSubmitButton()
        console.debug(await assetEnrollment.successPopup.innerText());
        await expect(assetEnrollment.successPopup).toBeVisible()
        // Assertion
    })
    // to-do (not to be automated)
    test.skip(' bulk create asset Upload Unsupported file', async ({ page }) => {
        await assetEnrollment.navigateToBulkCreateAsset()
        await assetEnrollment.uploadAndVerifyFile(UNSUPPORTED_FILE, page, assetEnrollment.submitButton, assetEnrollment.popupMessage)
        await expect(assetEnrollment.toastMessage()).toEqual("Invalid file type. Please upload valid .xls, .xlsx file only.")
    })

    test('bulk create asset Upload Field Empty', async ({ page }) => {
        await assetEnrollment.navigateToBulkCreateAsset()
        await assetEnrollment.clickOnSubmitButton()
        await assetEnrollment.getValidationMessage(assetEnrollment.fileInputSelector)
    })

    test('bulk create asset ASSET_TYPE_COLUMN_LEFT   ', async ({ page }) => {
        await assetEnrollment.navigateToBulkCreateAsset()
        await assetEnrollment.uploadAndVerifyFile(ASSET_TYPE_COLUMN_LEFT, page, assetEnrollment.submitButton, assetEnrollment.popupMessage)
        await assetEnrollment.clickOnSubmitButton()
        await assetEnrollment.popupMessage.waitFor({ state: 'visible' });
        console.log(await page.locator('div>ol').allInnerTexts());
    })
    test('bulk create asset   ', async ({ page }) => {
        await assetEnrollment.navigateToBulkCreateAsset()
        await assetEnrollment.uploadAndVerifyFile(MODEL_COLUMN, page, assetEnrollment.submitButton, assetEnrollment.popupMessage)
        await assetEnrollment.clickOnSubmitButton()
        await assetEnrollment.popupMessage.waitFor({ state: 'visible' });
        console.log(await page.locator('div>ol').allInnerTexts());
    })
    test('New Asset Enrollment Bulk Create Asset', async ({ page }) => {
        console.log('Bulk Create Assets ....');
        await assetEnrollment.bulkCreateAsset();
    });

    test('New Asset Enrollment Asset Type Request', async ({ page }) => {
        await assetEnrollment.assetTypeRequests();
    });

    test('New Asset Enrollment Asset Type Request Create Asset Type Functionality', async ({ page }) => {
        await assetEnrollment.assetTypeRequestCreateAssetTypeRequest();
    });

    test('New Asset Enrollment Asset Type Request Create Asset Type Empty Field', async ({ page }) => {
        await assetEnrollment.assetTypeRequestEmptyField();
    });

    test('Asset Type Request Asset Name Field More Than 40 Characters', async ({ page }) => {
        await assetEnrollment.assetTypeRequestAssetNameFieldMoreThan40Characters();
    });

    test('Asset Type Request Asset Name Field Only Special Or Number', async ({ page }) => {
        await assetEnrollment.assetTypeRequestAssetNameFieldNumberSpecialChar();
    });

    test('Create Asset Type Cross Icon', async ({ page }) => {
        await assetEnrollment.createAssetTypeCrossIcon();
    });

    test('Create Asset Type Cancel Button', async ({ page }) => {
        await assetEnrollment.createAssetTypeCancelButton();
    });

    test('Create Asset Type Created', async ({ page }) => {
        await assetEnrollment.createAssetTypeCreated();
    });

    test('Create Asset Type Sorting', async ({ page }) => {
        await assetEnrollment.createAssetTypeSorting();
    });

    test('Asset Type Request Status Approve Status', async ({ page }) => {
        await assetEnrollment.assetTypeRequestStatusApproveStatus();
    });

    test('Asset Type Request Status Reject Status', async ({ page }) => {
        await assetEnrollment.assetTypeRequestStatusRejectStatus();
    });

    test('Asset Type Request Approve Date', async ({ page }) => {
        await assetEnrollment.assetTypeRequestApproveDate();
    });

    test('Asset Type Request Reject Date', async ({ page }) => {
        await assetEnrollment.assetTypeRequestRejectDate();
    });

    test('Approve Asset Type Request No Record', async ({ page }) => {
        await assetEnrollment.approveAssetTypeRequestNoRecord();
    });

    test('Approve Asset Type Request Verification', async ({ page }) => {
        await assetEnrollment.approveAssetTypeRequestVerification();
    });

    test('Approve Asset Type Request Approved', async ({ page }) => {
        await assetEnrollment.approveAssetTypeRequestApproved();
    });

    test('Approve Asset Type Request Rejected', async ({ page }) => {
        await assetEnrollment.approveAssetTypeRequestRejected();
    });

    test('Approve Asset Type Request Cross', async ({ page }) => {
        await assetEnrollment.approveAssetTypeRequestCross();
    });

    test('Approve Asset Type Request Cancel', async ({ page }) => {
        await assetEnrollment.approveAssetTypeRequestCancel();
    });

    test('Approve Asset Type Request Comment Approve', async ({ page }) => {
        await assetEnrollment.approveAssetTypeRequestCommentApprove();
    });

    test('Approve Asset Type Request Comment Rejected', async ({ page }) => {
        await assetEnrollment.approveAssetTypeRequestCommentRejected();
    });

    test('Correct Request Date Appear', async ({ page }) => {
        await assetEnrollment.correctRequestDateAppear();
    });

    test('Approve Asset Type Sorting', async ({ page }) => {
        await assetEnrollment.approveAssetTypeSorting()
    });
});