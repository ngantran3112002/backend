const { Builder } = require('selenium-webdriver');
const { Browser, By, Key, until } = require('selenium-webdriver')

const assert = require('assert');
const LoginPage = require("../Pages/LoginPage")
const AddtoCartPage = require("../Pages/AddtoCartPage");

const Payment = require("../Pages/PaymentPage")
const chrome = require("selenium-webdriver/chrome");


describe("Cart Test Suite", function () {
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

    it("Add to cart test", async function () {

        await driver.findElement(By.xpath("(//a[@class='makeStyles-link-14'])[1]")).click();
        // wait until products appear to click
        let element = await driver.wait(
            until.elementLocated(By.xpath("(//a[@class='name'])[2]")),
            2000
        );
        await element.click();
        const addCart = new AddtoCartPage(driver);
        // Add quanity
        await driver.wait(
            until.elementLocated(By.className("ant-input-number-input")), 2000
        );
        const quantity = 7;
        await addCart.addtoCart(quantity);

        let check = await addCart.ComparePrice(quantity);

        assert(check, "Quanity of products is wrong ")
    });

})