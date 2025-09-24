const { Builder } = require('selenium-webdriver');
const { Browser, By, Key, until } = require('selenium-webdriver')


class RegisterPage {
    constructor(driver) {
        this.driver = driver;
    }


    async register(name, email, password, rePassword, address, phone) {
        await this.driver.findElement(By.xpath("(//input[@class='ant-input'])[1]")).sendKeys(name);
        await this.driver.findElement(By.xpath("(//input[@class='ant-input'])[2]")).sendKeys(email);
        await this.driver.findElement(By.xpath("(//input[@class='ant-input'])[3]")).sendKeys(password);
        await this.driver.findElement(By.xpath("(//input[@class='ant-input'])[4]")).sendKeys(rePassword);
        await this.driver.findElement(By.xpath("(//input[@class='ant-input'])[5]")).sendKeys(address);
        await this.driver.findElement(By.xpath("(//input[@class='ant-input'])[6]")).sendKeys(phone);
        // must remember the error( can not clickable)
        let button = await this.driver.findElement(By.xpath("//button[@type='submit']"));
        await this.driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", button);
        await this.driver.sleep(300); // small wait for animation settle
        await button.click();

    }
}

module.exports = RegisterPage;