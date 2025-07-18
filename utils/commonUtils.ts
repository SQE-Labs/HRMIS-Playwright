
import * as fs from 'fs';
import * as path from 'path';
import { expect, Page, Download, Locator } from '@playwright/test';

export class CommonUtils {
    async verifyXLSXDownload(page: Page, exportTrigger: () => Promise<void>): Promise<void> {
        const [download] = await Promise.all([
            page.waitForEvent('download', { timeout: 5000 }),
            exportTrigger(),
        ]);

        const downloadedFile = await download.suggestedFilename();
        expect(downloadedFile).toBeTruthy();

        const downloadDir = path.join(process.cwd(), 'Download');
        if (!fs.existsSync(downloadDir)) {
            fs.mkdirSync(downloadDir, { recursive: true });
        }

        const downloadPath = path.join(downloadDir, downloadedFile);
        await download.saveAs(downloadPath);

        expect(fs.existsSync(downloadPath)).toBe(true);

        const fileStats = fs.statSync(downloadPath);
        expect(fileStats.size).toBeGreaterThan(0);

        expect(path.extname(downloadedFile)).toBe('.xlsx');
        console.log(`File successfully downloaded: ${downloadPath}`);

        fs.unlinkSync(downloadPath);
        expect(fs.existsSync(downloadPath)).toBe(false);
        console.log(`File cleaned up: ${downloadPath}`);
    }

    async verifyRowsSorting(rowsLocator, sortingType = 'asc') {
        let elementsText = (await rowsLocator.allTextContents()).map((s: string) => s.trim());
        // console.log("unsorted " + elementsText)
        let sortedElements;
        if (sortingType.toLowerCase().includes("asc")) {

            sortedElements = [...elementsText].sort((a: string, b: any) => a.localeCompare(b));
        }
        else {
            sortedElements = [...elementsText].sort((a: any, b: string) => b.localeCompare(a));
        }
        //console.log("sorted" + sortedElements)

        expect(elementsText).toEqual(sortedElements)

    }
    async generateRandomInteger(length: number) {
        const characters = '0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    async generateRandomAlphaNum(length = 5) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0234567891';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    async generateRandomString(length = 5) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    async uploadAndVerifyFile(
        fileName: string,
        page: Page,
        submitButton: Locator,
        popupMessage: Locator
    ) {
        let fileInputSelector = "//input[@type = 'file']"
        // Construct full cross-platform file path
        const filePath = path.resolve(__dirname, '..', 'files', fileName);

        // Validate file before uploading
        expect(fs.existsSync(filePath)).toBe(true);
        const fileStats = fs.statSync(filePath);
        expect(fileStats.size).toBeGreaterThan(0);
        expect(path.extname(filePath)).toMatch(/\.xlsx|\.docx/); // adjust if needed

        // Upload file
        await page.setInputFiles(fileInputSelector, filePath);
        await page.waitForSelector(fileInputSelector, { state: 'attached' });

        
        
        
        
        // Submit
        // await submitButton.click();
        // await popupMessage.waitFor({ state: 'visible' });

        // // Log result
        // const messages = await page.locator('div>ol').allInnerTexts();
        // console.log(`Upload result for ${fileName}:\n`, messages);

        // // Close popup
        // await page.locator(".btn-close").click();
        // await page.waitForTimeout(500);
    }
}
