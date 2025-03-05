
import { Page, Locator } from '@playwright/test'
import { BasePage } from '../pages/BasePage'

export class Loader extends BasePage{
    private SpinLoader : Locator
    private threeDotLoader : Locator
    private Spinoverlay : Locator
    private threeDotclass: Locator
    // private page : Page

// Locators
    constructor(page : Page){
        super(page)
        // this.page = page
        this.SpinLoader = page.locator("[data-testid='tail-spin-loading'] ")
        this.threeDotLoader = page.locator("[data-testid='three-dots-svg']")
        this.Spinoverlay = page.locator(".overlay")
        this.threeDotclass = page.locator(".centered-loader")
    }

    getSpinLoader(){
        return this.SpinLoader
    }
    getSpinoverlay(){
        return this.Spinoverlay
    }

    getThreeDotLoader(){
        return this.threeDotLoader
    }
    getThreeDotClass(){
        return this.threeDotclass
    }

}
