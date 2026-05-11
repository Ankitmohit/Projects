const {test,expect}=require('@playwright/test');

test('Playwright special locators', async({page})=>
{
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employe").check();
    await page.getByLabel("Gender").selectOption("Male");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button",{name:'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!").isVisible();
    await page.getByRole("link",{name:"Shop"}).click();
    await page.locator("app-card").filter({hasText:"iphone X"}).getByRole("button").click();
    await page.pause();
})