

const { Builder } = require('selenium-webdriver');
const { Browser, By, Key, until } = require('selenium-webdriver')

const assert = require('assert');
const LoginPage = require("../Pages/LoginPage")


const chrome = require("selenium-webdriver/chrome");


let options = new chrome.Options();
options.addArguments("--log-level=3");

describe('Test Login for User and Administrator', function () {
     let driver;

     beforeEach(async () => {
          driver = await new Builder().forBrowser("chrome").build();
          await driver.get("http://localhost:3000/login");
     })

     afterEach(async () => {
          await driver.sleep(5000);
          await driver.quit();
     })

     it('login Admininstrator', async function () {
          const loginPage = new LoginPage(driver);
          await loginPage.login("admin1@gmail.com", "admin1");
           await driver.wait(async () => {
            let text = await driver.findElement(By.xpath("(//button[@class='makeStyles-btn-13'])[2]")).getText();
            return text === "Administration1"
        }, 2000);
          let text = await driver.findElement(By.xpath("(//button[@class='makeStyles-btn-13'])[2]")).getText();
          assert.ok(text === "Administration1", "Login failed")
     });

     it('login User', async function () {
          const loginPage = new LoginPage(driver);
          await loginPage.login("tranngan03112002@gmail.com", "123");
          await driver.wait(async () => {
               let text = await driver.findElement(By.xpath("(//button[@class='makeStyles-btn-13'])[2]")).getText();
               return text === 'user1'
          }, 2000);
          let text = await driver.findElement(By.xpath("(//button[@class='makeStyles-btn-13'])[2]")).getText();
          assert.ok(text === 'user1', "login failed");
     })
     
});





