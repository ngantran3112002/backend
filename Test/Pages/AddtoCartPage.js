const { Builder } = require('selenium-webdriver');
const { Browser, By, Key, until } = require('selenium-webdriver');


class AddtoCartPage {
    constructor(driver) {
        this.driver = driver;
    }

    async addtoCart(quantity) {
        await this.driver.findElement(By.className("ant-input-number-input")).sendKeys(quantity);

    }

    async checkProductinCart(element) {
        let elements = await this.driver.findElements(By.className("ant-table-row ant-table-row-level-0"));
        for (let el of elements) {
            let subElements = await el.findElements(By.className("ant-table-cell"));
            let text1 = await subElements[1].getText();
            if (text1 === element) {
                return true;
            }
        }
        return false;
    }


    async ComparePrice(qty) {
        let price = await this.driver.findElement(By.xpath("(//div[@class='ant-space-item'])[7]")).getText();
        let expectedPrice = price.replace(/[^\d.]/g, "") * qty;
        let btn = await this.driver.findElement(By.xpath("(//button[@class='ant-btn ant-btn-default'])[3]"));
        await this.driver.executeScript("arguments[0].click();", btn);
        let NameofProduct = await this.driver.findElement(By.xpath("(//div[@class='ant-space-item'])[1]")).getText();

        let btn2 = await this.driver.findElement(By.xpath("(//button[@class='makeStyles-btn-13'])[1]"));
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", btn2);
        await this.driver.sleep(5000);
        await this.driver.executeScript("arguments[0].click();", btn2);
        let a = await this.driver.findElement(By.xpath("(//tr[@class='ant-table-row ant-table-row-level-0'])[1]"));
        let container = await a.findElement(By.xpath("(.//td[@class='ant-table-cell'])[2]")).getText();
        let temp = await a.findElement(By.xpath("(.//td[@class='ant-table-cell'])[5]")).getText();
        let actualPrice = temp.replace(/[^\d.]/g, "") * 1
        let quantity = await this.driver.findElement(By.id("incrementor0")).getAttribute("value");
        if (container === NameofProduct && quantity === qty && actualPrice === expectedPrice) {
            return true;
        } else return false;
    }
}

module.exports = AddtoCartPage