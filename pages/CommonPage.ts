import { expect, Page } from "@playwright/test";
import { CommonPopupLocators } from "../fixtures/locator/popup.locator";

export class CommonPage {

    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async expectErrorPopup(errorCode: string, expectMessage: string){
        const errorTitle = this.page.locator(CommonPopupLocators.title);
        const errorMessage = this.page.locator(CommonPopupLocators.message);
    
        await expect(errorTitle).toHaveText(`Error: ${errorCode}`);
        await expect(errorMessage).toContainText(expectMessage);

        await this.clickCommonOKButton();
    }

    async clickCommonOKButton(){
        await this.page.locator(CommonPopupLocators.confirmButton).click();
    }
}