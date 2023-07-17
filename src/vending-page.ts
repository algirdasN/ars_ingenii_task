import { By, WebDriver, WebElement } from "selenium-webdriver";

export enum Product {
    TWIX = "Twix",
    CHOCOLATE = "Chocolate",
    BROWNIE = "Brownie"
}

export class VendingPage {
    private driver: WebDriver;

    private get twixButton(): WebElement { return this.driver.findElement(By.id("Twix")) }
    private get chocolateButton(): WebElement { return this.driver.findElement(By.id("Chocolate")) }
    private get brownieButton(): WebElement { return this.driver.findElement(By.id("Brownie")) }

    private get coinValue5(): WebElement { return this.driver.findElement(By.id("5")) }
    private get coinValue2(): WebElement { return this.driver.findElement(By.id("2")) }
    private get coinValue1(): WebElement { return this.driver.findElement(By.id("1")) }
    private get coinValue0_1(): WebElement { return this.driver.findElement(By.id("0.1")) }

    private get totalLabel(): WebElement { return this.driver.findElement(By.id("Total")) }
    private get messageLabel(): WebElement { return this.driver.findElement(By.id("message")) }
    private get cancelButton(): WebElement { return this.driver.findElement(By.id("cancel")) }

    constructor(driver: WebDriver) {
        this.driver = driver
    }

    public setCoins(coins: number[]) {
        this.setCoin(this.coinValue5, coins[0])
        this.setCoin(this.coinValue2, coins[1])
        this.setCoin(this.coinValue1, coins[2])
        this.setCoin(this.coinValue0_1, coins[3])
    }

    private async setCoin(element: WebElement, value: number) {
        if (value) {
            await element.sendKeys(value)
        }
    }

    public clickProductButton(product: Product) {
        switch (product) {
            case Product.TWIX:
                this.clickTwixButton()
                break
            case Product.CHOCOLATE:
                this.clickChocolateButton()
                break
            case Product.BROWNIE:
                this.clickBrownieButton()
                break
            default:
                throw new Error(`Unsupported product '${product}'`)
        }
    }

    public async clickTwixButton() {
        return await this.twixButton.click()
    }

    public async clickChocolateButton() {
        return await this.chocolateButton.click()
    }

    public async clickBrownieButton() {
        return await this.brownieButton.click()
    }

    public async clickCancelButton() {
        return await this.cancelButton.click()
    }

    public async getTotalValue() {
        return await this.totalLabel.getText().then(v => Number(v))
    }

    public async getMessageText() {
        return await this.messageLabel.getText()
    }

    public async getReturnedValue() {
        let match = await this.messageLabel.getText().then(v => new RegExp("€([\\d.]+)").exec(v))
        if (match) {
            return Number(match[1])
        }
    }
}