import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AssetEnrollment } from '../pages/New_Asset_Enrollment';
import testData from '../testData/testData.json';
import { FILL_IN_FIELD, FILL_OUT_FIELD, PANCARD_FIELD, AADHAAR_FIELD, PASSPORT_FIELD, SELECT_ITEM } from '../utils/constants';
import { AssetHelper } from '../utils/AssetHelpers';
import { CommonUtils } from '../utils/commonUtils';
import { Alert } from '../components/alert';

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
        console.log(">> Starting test case : " + test.info().title);



    });

    test('New Asset Enrollment Page @smoke', async ({ page }) => {
        expect(await assetEnrollment.assetEnrollmentHeader.isVisible()).toBeTruthy();
        expect(await assetEnrollment.assetEnrollmentTabs.isVisible()).toBeTruthy();
        expect(await assetEnrollment.createAssetTabs.allTextContents()).toEqual(assetEnrollment.createAssetTabsDetails);
        await assetEnrollment.enrollment();
    });
    // to-do
    test('New Asset Enrollment Create Asset-positive @smoke', async ({ page }) => {
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
        expect(await assetEnrollment.verifySuccessMessage("Successfully Created!"));
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
        expect(tooltipMessage === FILL_OUT_FIELD || tooltipMessage === FILL_IN_FIELD).toBeTruthy();
    });
    test('New Asset Enrollment Create Asset-   Model validation', async () => {
        await assetEnrollment.fillAllMandatoryField('USB HUB Adapter', '543543', 'CAELIUS_OWNED', "Caelius", 'HP02', '6900')
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
        expect(tooltipMessage === FILL_OUT_FIELD || tooltipMessage === FILL_IN_FIELD).toBeTruthy();
    });
    test('New Asset Enrollment Create Asset-  blank  serial number validation', async ({ page }) => {
        await assetEnrollment.SelectAssetType("USB HUB Adapter")
        await assetEnrollment.fillModelNumber("MODEL");
        await assetEnrollment.selectSuperOwner(testData.DefaultSuperOwner)
        await assetEnrollment.selectOwner('Caelius')
        await assetEnrollment.fillManufracture('HP40')
        await assetEnrollment.clickOnSubmitButton()
        let tooltipMessage = await assetEnrollment.getValidationMessage(assetEnrollment.serialNumber)
        expect(tooltipMessage === FILL_OUT_FIELD || tooltipMessage === FILL_IN_FIELD).toBeTruthy();

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
        await assetEnrollment.fillAllMandatoryField('USB HUB Adapter', 'ABC23', 'CAELIUS_OWNED', "Caelius", '232332', '6900')
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
        expect(await assetEnrollment.toastMessage()).toEqual("The serial number provided is a duplicate; an asset with this serial number already exists")

    })

    test('Navigate to bulk create asset ', async () => {
        await assetEnrollment.navigateToBulkCreateAsset()
        await expect(assetEnrollment.bulkAssetHeader).toBeVisible();
        await expect(assetEnrollment.chooseButton).toBeVisible();
        await expect(assetEnrollment.submitButton).toBeVisible();
    })

    test('HRMIS_36 bulk create asset  Upload valid .xls / .xlsx file @smoke', async ({ page }) => {
        await assetEnrollment.navigateToBulkCreateAsset()
        await assetEnrollment.uploadAndVerifyFile(testData.VALID_XLSX_FILE, page, assetEnrollment.submitButton, assetEnrollment.popupMessage)
        console.debug(await assetEnrollment.successPopup.innerText());
        await expect(assetEnrollment.successPopup).toBeVisible()
    })
    // to-do (not to be automated)
    test.skip(' bulk create asset Upload Unsupported file', async ({ page }) => {
        await assetEnrollment.navigateToBulkCreateAsset()
        await assetEnrollment.uploadAndVerifyFile(testData.UNSUPPORTED_FILE, page, assetEnrollment.submitButton, assetEnrollment.popupMessage)
        expect(assetEnrollment.toastMessage()).toEqual("Invalid file type. Please upload valid .xls, .xlsx file only.")
    })

    test('Bulk Create - Upload Field Empty', async ({ page }) => {
        await assetEnrollment.navigateToBulkCreateAsset();
        await assetEnrollment.clickOnSubmitButton();

        // Assert file input field displays required validation message
        const validationMessage = await assetEnrollment.getValidationMessage(assetEnrollment.fileInputSelector);
        expect(validationMessage).toBe("Please select a file.");
    });

    test('Bulk Create - When Asset Type Is Missing', async ({ page }) => {
        await assetEnrollment.navigateToBulkCreateAsset();
        await assetEnrollment.uploadAndVerifyFile(testData.ASSET_TYPE_COLUMN_LEFT, page, assetEnrollment.submitButton, assetEnrollment.popupMessage);

        await expect(assetEnrollment.popupMessage).toBeVisible();
        const errorMessages = await assetEnrollment.popupMessage.allInnerTexts();
        expect(errorMessages.length).toBeGreaterThan(0);
        expect(errorMessages.join(" ")).toContain("Asset Type is missing.");
    });

    test('Bulk Create - When MODEL column is missing', async ({ page }) => {
        await assetEnrollment.navigateToBulkCreateAsset();
        await assetEnrollment.uploadAndVerifyFile(testData.MODEL_COLUMN, page, assetEnrollment.submitButton, assetEnrollment.popupMessage);

        await expect(assetEnrollment.popupMessage).toBeVisible();
        const errorMessages = await assetEnrollment.popupMessage.allInnerTexts();
        expect(errorMessages.length).toBeGreaterThan(0);
        expect(errorMessages.join(" ")).toContain("Model is missing.");
    });

    test('Bulk Create - When Owner_Column is missing', async ({ page }) => {
        await assetEnrollment.navigateToBulkCreateAsset();
        await assetEnrollment.uploadAndVerifyFile(testData.OWNER_COLUMN, page, assetEnrollment.submitButton, assetEnrollment.popupMessage);

        await expect(assetEnrollment.popupMessage).toBeVisible();
        const errorMessages = await assetEnrollment.popupMessage.allInnerTexts();
        expect(errorMessages.length).toBeGreaterThan(0);
        expect(errorMessages.join(" ")).toContain("Owner is missing.");
    });

    test('Bulk Create - When Manufracture coloumn is missing', async ({ page }) => {
        await assetEnrollment.navigateToBulkCreateAsset();
        await assetEnrollment.uploadAndVerifyFile(testData.MANUFRACTURE_COLUMN, page, assetEnrollment.submitButton, assetEnrollment.popupMessage);

        await expect(assetEnrollment.popupMessage).toBeVisible();
        const errorMessages = await assetEnrollment.popupMessage.allInnerTexts();
        expect(errorMessages.length).toBeGreaterThan(0);
        expect(errorMessages.join(" ")).toContain("Manufacturers is missing.");
    });

    test('Bulk Create - When SerialNumber coloumn is missing', async ({ page }) => {
        await assetEnrollment.navigateToBulkCreateAsset();
        await assetEnrollment.uploadAndVerifyFile(testData.SERIALNUMBER_COLUMN, page, assetEnrollment.submitButton, assetEnrollment.popupMessage);

        await expect(page.locator('.fs-5')).toBeVisible();
        const errorMessages = await page.locator('.fs-5').allInnerTexts();
        expect(errorMessages.length).toBeGreaterThan(0);
        // expect(errorMessages.join(" ")).toContain("SerialNumber is missing.");
        expect(errorMessages.join(" ")).toContain(' "serialCell" is null');

    });
    test('Bulk Create - When Processor coloumn is missing', async ({ page }) => {
        await assetEnrollment.navigateToBulkCreateAsset();
        await assetEnrollment.uploadAndVerifyFile(testData.PROCESSOR_COLUMN, page, assetEnrollment.submitButton, assetEnrollment.popupMessage);

        await expect(page.locator('.fs-5')).toBeVisible();
        const errorMessages = await page.locator('.fs-5').allInnerTexts();
        expect(errorMessages.length).toBeGreaterThan(0);
        expect(errorMessages.join(" ")).toContain(' "processorCell" is null');

    });

    test.skip('Bulk Create - When Warrenty coloumn is missing', async ({ page }) => {
        await assetEnrollment.navigateToBulkCreateAsset();
        await assetEnrollment.uploadAndVerifyFile(testData.WARRANTY_COLUMN, page, assetEnrollment.submitButton, assetEnrollment.popupMessage);

        await expect(assetEnrollment.popupMessage).toBeVisible();
        const errorMessages = await assetEnrollment.popupMessage.allInnerTexts();
        expect(errorMessages.length).toBeGreaterThan(0);
        expect(errorMessages.join(" ")).toContain("Warranty is missing.");
    });

    test.skip('Bulk Create - When Purchase coloumn is missing', async ({ page }) => {
        await assetEnrollment.navigateToBulkCreateAsset();
        await assetEnrollment.uploadAndVerifyFile(testData.PURCHASE_COLUMN, page, assetEnrollment.submitButton, assetEnrollment.popupMessage);

        await expect(assetEnrollment.popupMessage).toBeVisible();
        const errorMessages = await assetEnrollment.popupMessage.allInnerTexts();
        expect(errorMessages.length).toBeGreaterThan(0);
        expect(errorMessages.join(" ")).toContain("Purchase is missing.");
    });

    test('Bulk Create - When SuperOwner coloumn is missing', async ({ page }) => {
        await assetEnrollment.navigateToBulkCreateAsset();
        await assetEnrollment.uploadAndVerifyFile(testData.SUPEROWNER_COLUMN, page, assetEnrollment.submitButton, assetEnrollment.popupMessage);

        await expect(assetEnrollment.popupMessage).toBeVisible();
        const errorMessages = await assetEnrollment.popupMessage.allInnerTexts();
        expect(errorMessages.length).toBeGreaterThan(0);
        expect(errorMessages.join(" ")).toContain("SuperOwner is missing.");
    });

    test('Bulk Create - When user enter ExistingSerialNumber coloumn ', async ({ page }) => {
        await assetEnrollment.navigateToBulkCreateAsset();
        await assetEnrollment.uploadAndVerifyFile(testData.EXISTINGSERIALNUMBER_COLUMN, page, assetEnrollment.submitButton, assetEnrollment.popupMessage);

        await expect(assetEnrollment.popupMessage).toBeVisible();
        const errorMessages = await assetEnrollment.popupMessage.allInnerTexts();
        expect(errorMessages.length).toBeGreaterThan(0);
        expect(errorMessages.join(" ")).toContain("Duplicate serial number");
    });

    test('Bulk Create - When user enter NonExistingSerialNumber coloumn ', async ({ page }) => {
        await assetEnrollment.navigateToBulkCreateAsset();
        await page.pause()
        await assetEnrollment.uploadAndVerifyFile(testData.NONEXISTINGASSETTYPE_COLUMN, page, assetEnrollment.submitButton, assetEnrollment.popupMessage);

        await expect(assetEnrollment.popupMessage).toBeVisible();
        const errorMessages = await assetEnrollment.popupMessage.allInnerTexts();
        expect(errorMessages.length).toBeGreaterThan(0);
        expect(errorMessages.join(" ")).toContain("Asset type with name 'Laptop kit' does not exist or is not verified.");
    });
    test('Bulk Create - When user enter Nounit coloumn ', async ({ page }) => {
        await assetEnrollment.navigateToBulkCreateAsset();
        await assetEnrollment.uploadAndVerifyFile(testData.NOUNIT_COLUMN, page, assetEnrollment.submitButton, assetEnrollment.popupMessage);

        await expect(assetEnrollment.popupMessage).toBeVisible();
        const errorMessages = await assetEnrollment.popupMessage.allInnerTexts();
        expect(errorMessages.length).toBeGreaterThan(0);
        expect(errorMessages.join(" ")).toContain("Warranty value must contain 'month' or 'year', e.g., '12 months' or '2 years'.");
    });


    test('should Display All AssetTypeRequest Columns', async ({ page }) => {
        await assetEnrollment.navigateToAssetTypeRequest()
        await assetEnrollment.verifyAllAssetTypeRequestColumnsVisible();
        await expect(assetEnrollment.createAssetTypeButton).toBeVisible();
    });


    test('should open Create Asset Type popup with correct header and all labels visible', async ({ page }) => {
        await assetEnrollment.navigateToAssetTypeRequest()
        await assetEnrollment.clickOnCreateAssetTypeButton()
        const header = await assetEnrollment.createAssetTypePopupHeader.textContent();
        expect(header).toEqual('Create Asset Type');
        const labelCount = await assetEnrollment.createAssetTypePopupLabel.count();
        for (let i = 0; i < labelCount; i++) {
            const label = assetEnrollment.createAssetTypePopupLabel.nth(i);
            await expect(label).toBeVisible();
        }
    });


    test('New Asset Enrollment Asset Type Request Create Asset Type Empty Field', async ({ page }) => {
        await assetEnrollment.navigateToAssetTypeRequest();
        await assetEnrollment.clickOnCreateAssetTypeButton();
        await assetEnrollment.clickOnSubmitButton();
        let tooltipMessage = await assetEnrollment.getValidationMessage(assetEnrollment.popupAssetNameField)
        expect(tooltipMessage === FILL_OUT_FIELD || tooltipMessage === FILL_IN_FIELD).toBeTruthy();
    });

    test('New Asset Enrollment Asset Type Request Create Asset Type Comment Field Empty', async ({ page }) => {
        await assetEnrollment.navigateToAssetTypeRequest();
        await assetEnrollment.clickOnCreateAssetTypeButton();
        await assetEnrollment.popupAssetNameField.fill(await AssetHelper.generateRandomString(5));
        await assetEnrollment.clickOnSubmitButton();
        let tooltipMessage = await assetEnrollment.getValidationMessage(assetEnrollment.comment)
        expect(tooltipMessage === FILL_OUT_FIELD || tooltipMessage === FILL_IN_FIELD).toBeTruthy();
    });

    // Accept more than 40 chars.. --- need to be fixed
    test('Asset Type Request Asset Name Field More Than 40 Characters', async ({ page }) => {
        await assetEnrollment.navigateToAssetTypeRequest();
        await assetEnrollment.clickOnCreateAssetTypeButton();
        await assetEnrollment.popupAssetNameField.fill(await AssetHelper.generateRandomString(42));
        await assetEnrollment.comment.fill(await AssetHelper.generateRandomString(5));
        await assetEnrollment.clickOnSubmitButton();
        const message = await assetEnrollment.validationMessage.textContent();
        console.log(message);
        await expect(assetEnrollment.validationMessage).toBeVisible();
        expect(message).toEqual("Asset name must not exceed 40 characters");
    });



    test('Asset Type Request Asset Name Field Only Special Characters', async ({ page }) => {
        await assetEnrollment.navigateToAssetTypeRequest();
        await assetEnrollment.clickOnCreateAssetTypeButton();
        await assetEnrollment.popupAssetNameField.fill("#@$#@#")
        await assetEnrollment.comment.fill(await AssetHelper.generateRandomString(6));
        await assetEnrollment.clickOnSubmitButton();
        const message = await assetEnrollment.validationMessage.textContent();
        await expect(assetEnrollment.validationMessage).toBeVisible();
        expect(message).toEqual("Entry cannot contain only numbers and special characters");

    });

    test('Asset Type Request Asset Name Field Only Number', async ({ page }) => {
        await assetEnrollment.navigateToAssetTypeRequest();
        await assetEnrollment.clickOnCreateAssetTypeButton();
        await assetEnrollment.popupAssetNameField.fill("1111")
        await assetEnrollment.comment.fill(await AssetHelper.generateRandomString(6));
        await assetEnrollment.clickOnSubmitButton();
        const message = await assetEnrollment.validationMessage.textContent();
        await expect(assetEnrollment.validationMessage).toBeVisible();
        expect(message).toEqual("Entry cannot contain only numbers and special characters");
    });


    test('Create Asset Type Cross Icon', async ({ page }) => {
        await assetEnrollment.navigateToAssetTypeRequest();
        await assetEnrollment.clickOnCreateAssetTypeButton();
        await assetEnrollment.clickOnPopUpCrossIcon()
        await expect(assetEnrollment.createAssetTypePopupHeader).toBeHidden();

    });

    test('Create Asset Type Cancel Button', async ({ page }) => {
        await assetEnrollment.navigateToAssetTypeRequest();
        await assetEnrollment.clickOnCreateAssetTypeButton();
        await assetEnrollment.clickOnPopUpCancelButton()
        await expect(assetEnrollment.createAssetTypePopupHeader).toBeHidden();
    });

    test('HRMIS_35 Create Asset Type Created and Verify Created Asset Type Is Displayed @smoke', async ({ page }) => {
        await assetEnrollment.navigateToAssetTypeRequest();
        await assetEnrollment.clickOnCreateAssetTypeButton();
        let name = await AssetHelper.generateRandomString(5)
        await assetEnrollment.popupAssetNameField.fill(name);
        await assetEnrollment.comment.fill(name);
        await assetEnrollment.clickOnSubmitButton();
        let message = await assetEnrollment.toastMessage()
        expect(message).toEqual(`Request to create ${name} asset type sent successfully.`)
        await assetEnrollment.verifyAssetTypeIsPresentInList(name)
    });

    test('Create Asset Type Verify Sorting @smoke ', async ({ page }) => {
        test.setTimeout(480000);
        await assetEnrollment.navigateToAssetTypeRequest();

        const columnsToTest = [3, 4, 5, 6, 7];

        for (const columnIndex of columnsToTest) {
            console.log(`Testing Column ${columnIndex} - Ascending Sort`);
            await assetEnrollment.clickAssetTypeRequestOnRowHeader(columnIndex);

            // Wait to allow table sort/render to complete
            await page.waitForTimeout(2000);

            const ascData = await assetEnrollment.getRowdata(columnIndex);
            await assetEnrollment.verifyRowsSorting(ascData, "asc");

            console.log(`Testing Column ${columnIndex} - Descending Sort`);
            await assetEnrollment.clickAssetTypeRequestOnRowHeader(columnIndex);

            // Wait again for descending sort
            await page.waitForTimeout(2000);

            const descData = await assetEnrollment.getRowdata(columnIndex);
            await assetEnrollment.verifyRowsSorting(descData, "desc");
        }
    })


    test('HRMIS_38 should approve asset type request and verify status is updated to APPROVED @smoke', async ({ page }) => {
        await assetEnrollment.navigateToApproveAssetTypeRequest();

        const noRecordLocator = page.locator(".fs-4");

        await assetEnrollment.approveAssetTypeRequestNoRecord()
        await assetEnrollment.clickOnViewButton();
        const approvedName = await assetEnrollment.AssetTypeRequestAndVerifyStatus('APPROVED')
        await assetEnrollment.clickOnSubmitButton();
        await assetEnrollment.waitforLoaderToDisappear();
        await assetEnrollment.navigateToAssetTypeRequest();
        if (!approvedName) {
            throw new Error("Approved asset name is undefined");
        }
        await assetEnrollment.verifyAssetTypeStatusByName(approvedName, "APPROVED");

    });


    test('HRMIS_39 should reject asset type request and verify status is updated to REJECTED @smoke', async ({ page }) => {
        await assetEnrollment.navigateToApproveAssetTypeRequest();
        const noRecordLocator = page.locator(".fs-4");
        await assetEnrollment.approveAssetTypeRequestNoRecord()
        await assetEnrollment.clickOnViewButton();
        const rejectedName = await assetEnrollment.AssetTypeRequestAndVerifyStatus('REJECTED');
        await assetEnrollment.clickOnSubmitButton();
        await assetEnrollment.waitforLoaderToDisappear();
        await assetEnrollment.navigateToAssetTypeRequest();
        if (!rejectedName) {
            throw new Error("Approved asset name is undefined");
        }
        await assetEnrollment.verifyAssetTypeStatusByName(rejectedName, "REJECTED");
    });

    test('Asset Type Request Approve Date', async ({ page }) => {
        await assetEnrollment.navigateToApproveAssetTypeRequest();
        const noRecordLocator = page.locator(".fs-4");
        await assetEnrollment.approveAssetTypeRequestNoRecord()
        await assetEnrollment.clickOnViewButton();
        let trimmedName = await assetEnrollment.AssetTypeRequestAndVerifyStatus('APPROVED')
        await assetEnrollment.clickOnSubmitButton();
        await assetEnrollment.waitforLoaderToDisappear();
        await assetEnrollment.navigateToAssetTypeRequest();
        let { verifyDate, found } = await assetEnrollment.AssetTypeRequestAndVerifyDate(trimmedName)
        await assetEnrollment.verifyAssetTypeApprovedDateIsToday(verifyDate, found)

    });

    test('Asset Type Request Reject Date', async ({ page }) => {
        await assetEnrollment.navigateToApproveAssetTypeRequest();
        const noRecordLocator = page.locator(".fs-4");
        await assetEnrollment.approveAssetTypeRequestNoRecord()
        await assetEnrollment.clickOnViewButton();
        let trimmedName = await assetEnrollment.AssetTypeRequestAndVerifyStatus('REJECTED')
        await assetEnrollment.clickOnSubmitButton();
        await assetEnrollment.waitforLoaderToDisappear();
        await assetEnrollment.navigateToAssetTypeRequest();
        let { verifyDate, found } = await assetEnrollment.AssetTypeRequestAndVerifyDate(trimmedName)
        await assetEnrollment.verifyAssetTypeApprovedDateIsToday(verifyDate, found)

    });

    test('Approve Asset Type Request No Record', async ({ page }) => {
        await assetEnrollment.navigateToApproveAssetTypeRequest();
        await assetEnrollment.approveAssetTypeRequestNoRecord();
    });




    test('Approve Asset Type Request Verification @smoke', async ({ page }) => {
        await assetEnrollment.navigateToAssetTypeRequest();
        await assetEnrollment.clickOnCreateAssetTypeButton();
        let name = await AssetHelper.generateRandomString(5);
        await assetEnrollment.popupAssetNameField.fill(name);
        await assetEnrollment.comment.fill(name);
        await assetEnrollment.clickOnSubmitButton()
        let message = await assetEnrollment.toastMessage()
        expect(message).toEqual(`Request to create ${name} asset type sent successfully.`)
        await assetEnrollment.verifyAssetTypeIsPresentInList(name)
        await assetEnrollment.navigateToApproveAssetTypeRequest();
        await assetEnrollment.verifyAssetTypeIsPresentInList(name)

    });

    test('Approve Asset Type Request status does not selected', async ({ page }) => {
        await assetEnrollment.navigateToApproveAssetTypeRequest();
        await assetEnrollment.clickOnViewButton();
        await assetEnrollment.clickOnSubmitButton()
        let message = await assetEnrollment.getValidationMessage(assetEnrollment.actionDropdown)
        expect(message).toBe(SELECT_ITEM);
    });

    test('Approve Asset Type Request comment field empty', async ({ page }) => {
        await assetEnrollment.navigateToApproveAssetTypeRequest();
        await assetEnrollment.clickOnViewButton();
        await assetEnrollment.actionDropdown.selectOption({ value: 'APPROVED' })
        await assetEnrollment.clickOnSubmitButton()
        let message2 = await assetEnrollment.getValidationMessage(assetEnrollment.comment)
        expect(message2 === FILL_OUT_FIELD || message2 === FILL_IN_FIELD).toBeTruthy();

    });

    test('Approve Asset Type Request Approve selected ', async ({ page }) => {
        await assetEnrollment.navigateToApproveAssetTypeRequest();
        await assetEnrollment.clickOnViewButton();
        let name = await page.locator("(//table[@class='resume custom'])[1]/tbody/tr/td[2]").textContent();
        await assetEnrollment.actionDropdown.selectOption({ value: 'APPROVED' })
        await assetEnrollment.comment.fill("ABCDFG");
        await assetEnrollment.clickOnSubmitButton();
        let message = await assetEnrollment.toastMessage()
        expect(message).toEqual(`Request for ${name} asset type approved successfully`)

    });

    test('Approve Asset Type Request Rejected', async ({ page }) => {
        await assetEnrollment.navigateToApproveAssetTypeRequest();
        await assetEnrollment.clickOnViewButton();
        let name = await page.locator("(//table[@class='resume custom'])[1]/tbody/tr/td[2]").textContent();
        await assetEnrollment.actionDropdown.selectOption({ value: 'REJECTED' })
        await assetEnrollment.comment.fill("ABCDFG");
        await assetEnrollment.clickOnSubmitButton();
        let message = await assetEnrollment.toastMessage()
        expect(message).toEqual(`Request for ${name} asset type denied successfully`)
    });

    test('Approve Asset Type Request Cross', async ({ page }) => {
        await assetEnrollment.navigateToApproveAssetTypeRequest();
        await assetEnrollment.clickOnViewButton();
        await assetEnrollment.clickOnPopUpCrossIcon()
        await expect(page.locator("#staticBackdropLabel")).toBeHidden();
    });

    test('Approve Asset Type Request Cancel', async ({ page }) => {
        await assetEnrollment.navigateToApproveAssetTypeRequest();
        await assetEnrollment.clickOnViewButton();
        await assetEnrollment.clickOnPopUpCancelButton()
        await expect(page.locator("#staticBackdropLabel")).toBeHidden();
    });
    // to-do
    test('Reject Asset Type Request with Comment', async ({ page }) => {
        await assetEnrollment.navigateToApproveAssetTypeRequest();
        await assetEnrollment.clickOnViewButton();
        const { option, comment } = await assetEnrollment.AssetTypeRequestCommentApprove('REJECTED');
        await assetEnrollment.clickOnSubmitButton();
        await assetEnrollment.navigateToAssetTypeRequest();
        await assetEnrollment.verifyAssetStatusByComment(option, comment);
    });
    // to-do
    test('Approve Asset Type Request with Comment', async ({ page }) => {
        await assetEnrollment.navigateToApproveAssetTypeRequest();
        await assetEnrollment.clickOnViewButton();

        const { option, comment } = await assetEnrollment.AssetTypeRequestCommentApprove('APPROVED');

        await assetEnrollment.clickOnSubmitButton();
        await assetEnrollment.navigateToAssetTypeRequest();
        await assetEnrollment.verifyAssetStatusByComment(option, comment);
    });


    test('Correct Request Date Appear', async ({ page }) => {
        await assetEnrollment.navigateToAssetTypeRequest();
        await assetEnrollment.clickOnCreateAssetTypeButton()
        let name = await AssetHelper.generateRandomString(5)
        await assetEnrollment.popupAssetNameField.fill(name);
        await assetEnrollment.comment.fill(await AssetHelper.generateRandomString(5));
        await assetEnrollment.clickOnSubmitButton()
        await assetEnrollment.navigateToApproveAssetTypeRequest();
        let assetCreateDate = await assetEnrollment.getAssetCreationDateByName(name)
        let currentDate = await assetEnrollment.getCurrentDate()
        expect(assetCreateDate).toEqual(currentDate);

    });

    test('Approve Asset Type Sorting ', async ({ page }) => {
        await assetEnrollment.navigateToApproveAssetTypeRequest();

        const noRecordLocator = page.locator(".fs-4");
        if (await noRecordLocator.isVisible()) {
            console.log("No records available");
            return;
        } else {
            const columnsToTest = [2, 3, 4, 5];

            for (const columnIndex of columnsToTest) {
                console.log(`Testing Column ${columnIndex} - Ascending Sort`);
                await assetEnrollment.clickOnAprooveAssetRowHeader(columnIndex);

                // Wait to allow table sort/render to complete
                await page.waitForTimeout(2000);

                const ascData = await assetEnrollment.getAprooveAssetRowdata(columnIndex);
                await assetEnrollment.verifyRowsSorting(ascData, "asc");

                console.log(`Testing Column ${columnIndex} - Descending Sort`);
                await assetEnrollment.clickOnAprooveAssetRowHeader(columnIndex);

                // Wait again for descending sort
                await page.waitForTimeout(2000);

                const descData = await assetEnrollment.getAprooveAssetRowdata(columnIndex);
                await assetEnrollment.verifyRowsSorting(descData, "desc");
            }
        }

    });
});
