const { Builder } = require('selenium-webdriver');
const { Browser, By, Key, until } = require('selenium-webdriver')
const assert = require('assert');
const chrome = require("selenium-webdriver/chrome");

const RegisterPage = require('../Pages/RegisterPage');

describe('Test Suite for User', function () {
    let driver;
    before(async () => {
        driver = await new Builder().forBrowser("chrome").build();
        await driver.get("http://localhost:3000/register");
    })

    after(async () => {
        await driver.sleep(5000);
        await driver.quit();
    })



    it("register for user", async function () {
        const registerPage = new RegisterPage(driver);
        await registerPage.register('ngan', 'ngan03311@gmail.com', '123456', '123456', 'nam dinh', '098632');
        let element = await driver.wait(
            until.elementLocated(By.className("ant-notification-notice-description")),
            5000
        )

        await driver.wait(until.elementIsVisible(element),5000);
        let text = await element.getText();

        assert.ok(text === 'Thay đổi mật khẩu thành công', "register failed");

    })
})