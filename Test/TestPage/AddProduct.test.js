const { Builder } = require("selenium-webdriver")
const { Browser, By, Key, until } = require('selenium-webdriver');
const assert = require('assert')
const LoginPage = require("../Pages/LoginPage");

// const chrome = require("selenium-webdriver/chrome")

const AddMoreProductPage = require("../Pages/AddMoreProductPage")

describe("Admin test Suite", function () {
    let driver;
    before(async () => {
        driver = await new Builder().forBrowser("chrome").build();
        await driver.get("http://localhost:3000/login");
        const loginPage = new LoginPage(driver);
        await loginPage.login("admin1@gmail.com", "admin1");
        await driver.wait(async () => {
            let text = await driver.findElement(By.xpath("(//button[@class='makeStyles-btn-13'])[2]")).getText();
            return text === "Administration1"
        }, 3000)
    })


    after(async () => {
        await driver.sleep(6000);
        await driver.quit();
    })


    it("Administrator adds more product", async function () {
        let addProduct = new AddMoreProductPage(driver);


        await addProduct.Navigation();

        await addProduct.fillTheForm(
            "Product 7",
            "This is an added product",
            "123456",
            "6",
            "D:/Mã 1.png"
        )


        await addProduct.checkProduct("Product 7")

        let currentURL = await driver.getCurrentUrl();
        assert.ok(currentURL.includes("details"), "Adding products is failed")

    })
})

// npx mocha "../TestPage/*.test.js" --no-timeouts --parallel --reporter mochawesome --require mochawesome/register