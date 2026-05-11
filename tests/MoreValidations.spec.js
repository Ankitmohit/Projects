const { test,expect } = require("@playwright/test")

test("Popup Validation", async({page})=>{

    await page.goto("https://www.rahulshettyacademy.com/AutomationPractice/");

    //await page.goto("http://google.com");
    //await  page.goBack();
    //await page.goForward();

    //await expect(page.locator())

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();

    //iframe
    const frame= page.frameLocator("#courses-iframe");
    await frame.locator("li a[href*='lifetime-access']:visible").click();
    const textcheck = await frame.locator(".text h2").textContent();
    console.log(textcheck.split(" ")[1]);



})