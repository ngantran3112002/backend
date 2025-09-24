const { Builder } = require('selenium-webdriver');
const { Browser, By, Key, until } = require('selenium-webdriver');


class AddMoreProductPage {
    constructor(driver) {
        this.driver = driver;
    }
    // navigation to page Admin/
    async Navigation() {
        await this.driver.findElement(By.xpath("(//a[@class='makeStyles-link-14'])[4]")).click();
        await this.driver.findElement(By.xpath("(//a[@href='/admin/products'])")).click();
        await this.driver.findElement(By.className("ant-btn ant-btn-primary")).click();

    }
    // fill the data
    async fillTheForm(name, description, price, quantityInStock, image) {


        await this.driver.findElement(By.id("name")).sendKeys(name);
        await this.driver.findElement(By.id("description")).sendKeys(description);
        await this.driver.findElement(By.id("price")).sendKeys(price);
        await this.driver.findElement(By.id("quantityInStock")).sendKeys(quantityInStock);

        await this.driver.findElement(By.id("image")).sendKeys(image);
        await this.driver.findElement(By.xpath("//button[@type='submit']")).click();
    }
    // check product exist or not
    async checkProduct(name) {
        await this.driver.findElement(By.xpath("(//a[@class='makeStyles-link-14'])[2]")).click();
        await this.driver.sleep(3000);
        let e = await this.driver.findElement(By.xpath("(//input[@type='search'])[1]"));

        await e.sendKeys(name);
        await e.sendKeys(Key.ENTER);
    }
}

module.exports = AddMoreProductPage;
