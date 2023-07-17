import { Builder, WebDriver } from "selenium-webdriver";
import { Options as FirefoxOptions } from "selenium-webdriver/firefox";
import { Options as ChromeOptions } from "selenium-webdriver/chrome";
import { Browser } from "selenium-webdriver/lib/capabilities";

export type BrowserConfig = {
    name: string,
    maximized: boolean,
    private: boolean
}

export class Driver {

    static initiate(config: BrowserConfig): WebDriver {
        switch (config.name) {
            case Browser.FIREFOX:
                return Driver.initiateFirefox(config)
            case Browser.CHROME:
                return Driver.initiateChrome(config)
            default:
                throw new Error(`Unsupported browser: '${config.name}'`)
        }
    }

    private static initiateFirefox(config: BrowserConfig): WebDriver {
        let options = new FirefoxOptions()
        if (config.private) {
            options.addArguments("-private")
        }
        let driver = new Builder().withCapabilities(options).build()
        if (config.maximized) {
            driver.manage().window().maximize()
        }
        return driver
    }

    private static initiateChrome(config: BrowserConfig): WebDriver {
        let options = new ChromeOptions()
        if (config.private) {

            options.addArguments("--incognito")
        }
        if (config.maximized) {
            options.addArguments("--start-maximized")
        }
        return new Builder().withCapabilities(options).build()
    }
}