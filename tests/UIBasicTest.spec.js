const {test,expect}=require('@playwright/test');

test.only('Browser Context Playwright test', async ({browser})=>
{
    
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator("#username");
    const signInButton = page.locator("input[type='submit']");
    const cardTitles = page.locator(".card-body a");
    //await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());

    //css 
    await username.fill("rahulshetty");
    await page.locator("input[name='password']").fill("Learning@830$3mK2");
    await signInButton.click();
    
    await page.locator("[style*='block']").textContent();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");

    // type - fill 

    await username.fill("");
    await username.fill("rahulshettyacademy");
    await signInButton.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);

}
);

test('Page playwright test', async ({page})=>
{
    
    await page.goto('https://google.com');
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');
}
)