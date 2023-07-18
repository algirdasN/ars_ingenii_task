import { afterEach, beforeEach, describe, expect, test } from '@jest/globals';
import { WebDriver } from 'selenium-webdriver';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { BrowserConfig, Driver } from '../src/driver';
import { Product, VendingPage } from '../src/vending-page';

type TestConfig = {
    browser: BrowserConfig,
    autPath: string
}

describe("Vending machine tests", () => {
    let driver: WebDriver
    let vendingPage: VendingPage

    beforeEach(async () => {
        let config: TestConfig = JSON.parse(readFileSync("resources/config.json", "utf-8"))
        driver = Driver.initiate(config.browser)
        vendingPage = new VendingPage(driver)
        await driver.get("file://" + resolve(config.autPath))
    }, 10000)

    afterEach(async () => {
        if (driver) {
            await driver.close()
        }
    })


    test.each([
        [[1, 1, 1, 1], 8.10],
        [[2, 3, 4, 5], 20.50],
    ])("Coin arithmetic test", async (coins: number[], total: number) => {
        vendingPage.setCoins(coins)

        await expect(vendingPage.getTotalValue()).resolves.toEqual(total)
    })


    test.each([
        [[1, 0, 0, 0], Product.TWIX],
        [[0, 0, 2, 1], Product.CHOCOLATE],
        [[0, 1, 0, 0], Product.BROWNIE]
    ])("Succesful purchase test", async (coins: number[], product: Product) => {
        vendingPage.setCoins(coins)
        vendingPage.clickProductButton(product)

        await expect(vendingPage.getMessageText()).resolves.toContain(product + " has been bought.")
    })


    test.each([
        [[1, 0, 0, 0], Product.BROWNIE, 3],
        [[0, 1, 0, 1], Product.CHOCOLATE, 0.1],
        [[0, 0, 2, 0], Product.TWIX, 0],
    ])("Change test", async (coins: number[], product: Product, change: number) => {
        vendingPage.setCoins(coins)
        vendingPage.clickProductButton(product)

        await expect(vendingPage.getReturnedValue()).resolves.toEqual(change)
    })


    test.each([
        [[0, 0, 1, 9], Product.CHOCOLATE, 1.9],
        [[0, 0, 0, 1], Product.TWIX, 0.1],
    ])("Insufficient money test", async (coins: number[], product: Product, returned: number) => {
        vendingPage.setCoins(coins)
        vendingPage.clickProductButton(product)

        await expect(vendingPage.getMessageText()).resolves.toContain("You have not paid enough.")
        await expect(vendingPage.getReturnedValue()).resolves.toEqual(returned)
    })


    test("Cancel test", async () => {
        vendingPage.setCoins([1, 1, 1, 1])
        vendingPage.clickCancelButton()

        await expect(vendingPage.getTotalValue()).resolves.toEqual(0)
        await expect(vendingPage.getReturnedValue()).resolves.toEqual(8.1)
    })
})

