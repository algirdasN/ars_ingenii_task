import { Builder, WebDriver } from "selenium-webdriver";
import { Options } from "selenium-webdriver/firefox";
import { Browser } from "selenium-webdriver/lib/capabilities";


export class Driver {

    static initiate(browser: string): WebDriver {
        switch (browser) {
            case Browser.FIREFOX:
                return Driver.initiateFirefox()
            // case Browser.CHROME:
            //     return InitiateChrome;
            default:
                throw new Error(`Unsupported browser: '${browser}'`)
        }
    }

    private static initiateFirefox(): WebDriver {
        let driver = new Builder().forBrowser(Browser.FIREFOX)
        let options = new Options()
        options.addArguments("-private")
        return driver.withCapabilities(options).build()
    }
}