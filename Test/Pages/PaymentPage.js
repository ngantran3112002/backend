const { Builder } = require('selenium-webdriver');
const { Browser, By, Key, until } = require('selenium-webdriver');


class Payment {
    constructor(driver) {
        this.driver = driver;
    }

    async fillForm(name, phone, email, address, message) {
        await this.driver.findElement(By.xpath("//input[@name='name']")).sendKeys(name);
        await this.driver.findElement(By.xpath("//input[@name='phone']")).sendKeys(phone);
        await this.driver.findElement(By.xpath("//input[@name='email']")).sendKeys(email);
        await this.driver.findElement(By.xpath("//input[@name='address']")).sendKeys(address);
        await this.driver.findElement(By.xpath("//input[@name='message']")).sendKeys(message);
    }


    async checkPayment() {
        let elements = await this.driver.findElements(By.className("ant-table-row ant-table-row-level-0"));
        let total = 0;
        let ActualTotalPrice = 0;
        for (let el of elements) {

            let subElements = await el.findElements(By.className("ant-table-cell"));
            let t = await subElements[1].getText();

            if (t === "Tổng tiền") {
                let a = await subElements[4].getText();
                ActualTotalPrice = (a.replace(/[^\d.]/g, "") * 1);

            }
            let priceOfProduct = await subElements[2].getText();
            let cleanStr = priceOfProduct.replace(/[^\d.]/g, "");

            let quantity = await subElements[3].getText() * 1;

            let actualPrice = (cleanStr * 1) * quantity;


            total = total + actualPrice
            

        }
        if (ActualTotalPrice === total) {
            return true;
        } else {
            return false
        }
    }


}



module.exports = Payment