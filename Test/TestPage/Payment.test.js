const { Builder } = require('selenium-webdriver');
const { Browser, By, Key, until } = require('selenium-webdriver')

const assert = require('assert');
const LoginPage = require("../Pages/LoginPage")
const AddtoCartPage = require("../Pages/AddtoCartPage");

const Payment = require("../Pages/PaymentPage")
const chrome = require("selenium-webdriver/chrome");
const { expect } = require("chai");


describe("Check if payment is successfull or not", function () {
    let driver;
    before(async () => {
        driver = await new Builder().forBrowser("chrome").build();
        await driver.get("http://localhost:3000/login");

        const loginPage = new LoginPage(driver);
        await loginPage.login("tranngan03112002@gmail.com", "123");
        await driver.wait(async () => {
            let text = await driver.findElement(By.xpath("(//button[@class='makeStyles-btn-13'])[2]")).getText();
            return text === "user1"
        }, 2000);

    })

    after(async () => {
        await driver.sleep(5000);
        await driver.quit();
    })

    it("check payment", async function () {

        await driver.findElement(By.xpath("(//a[@class='makeStyles-link-14'])[1]")).click();

        await driver.sleep(3000);
        let element = await driver.findElement(By.xpath("(//button[@class='ant-btn ant-btn-primary ant-btn-lg'])[1]"));

        // ?
        await driver.executeScript("arguments[0].click();", element);
        let product = await driver.findElement(By.xpath("(//a[@href='/products/details/3'])")).getText();
        // click "GIỎ HÀNG" button
        let btn2 = await driver.findElement(By.xpath("(//button[@class='makeStyles-btn-13'])[1]"));
        await driver.executeScript("arguments[0].scrollIntoView(true);", btn2);
        await driver.sleep(5000);
        await driver.executeScript("arguments[0].click();", btn2);
        // check product in cart or not
        let ad = new AddtoCartPage(driver);
        let bool = await ad.checkProductinCart(product);

        //payment

        await driver.findElement(By.xpath("//button[contains(text(), 'Xác thực thanh toán')]")).click();
        let payment = new Payment(driver);
        let check = await payment.checkPayment();
        if (check) {
            await driver.findElement(By.className("btn btn-primary mx-1")).click();
            let element1 = await driver.wait(
                until.elementLocated(By.className("ant-notification-notice-description")),
                5000
            )
            let text = await driver.findElement(By.className("ant-notification-notice-description")).getText();
            assert.ok(bool && text == "Đặt hàng thành công", "Payment is not successful")
        }



    })
})