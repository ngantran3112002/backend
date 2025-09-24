const { Builder } = require('selenium-webdriver');
const { Browser, By, Key, until } = require('selenium-webdriver')


class LoginPage {
    constructor(driver) {
        this.driver = driver;
    }

    async login(email, password) {
        await this.driver.findElement(By.name('email')).sendKeys(email);
        await this.driver.findElement(By.name('password')).sendKeys(password);
        await this.driver.findElement(By.xpath("//button[@type='submit']")).click();
                
    }
}

module.exports = LoginPage;