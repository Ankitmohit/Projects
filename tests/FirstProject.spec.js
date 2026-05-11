const {test,expect}=require('@playwright/test');

test('FirstProject Login Page', async ({browser})=>
{
    
    const context = await browser.newContext();
    const page = await context.newPage();
    //await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    

    // First  click register button in the website
    const Register = page.locator("a[class='btn1']");
    await Register.click();

    // Fill in the registration form
    const Firstname = page.locator("input[type='firstname']");
    await Firstname.fill("Ankit");

    const Lastname = page.locator("input[type='lastname']");
    await Lastname.fill("Mishra");

    const Email = page.locator("input[type='email']");
    await Email.fill("ankitmishra@example.com");

    const PhoneNumber = page.locator("input[id='userMobile']");
    await PhoneNumber.fill("1234567890");

    //await page.locator('select[formcontrolname="occupation"]').selectOption('3');
    // Used this one but not working because of 
//     This usually happens when:

// Angular uses custom binding / ngModel / reactive forms
// The dropdown is not a plain HTML select in behavior
// The value attribute exists in DOM, but Playwright can't rely on it

    const occupation = page.locator('select[formcontrolname="occupation"]');

    await occupation.selectOption({ label: 'Engineer' });

    const radio =  page.locator('input[value="Male"]');
    await radio.click();

    const Password = page.locator('input[id="userPassword"]');
    await Password.fill("Test@123");

    await page.locator('input[id="confirmPassword"]').fill("Test@123");
    await page.locator("input[type='checkbox']").click();
    await page.locator('input[type="submit"]').click();

    console.log(await page.title());
}
);

test('@WC Client App', async ({page})=>
{
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator("input[type='email']").fill("ankitmishra@example.com");
    await page.locator("input[type='password']").fill("Test@123");
    await page.locator("input[type='submit']").click();

    //await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

});

test('UI Controls',async({page})=>{
   page.goto("https://rahulshettyacademy.com/loginpagePractise/") ;
   const username = page.locator('#username');
   const signIn = page.locator('#signInBtn');
   const documentblink = page.locator("[href*='documents-request']")
   const dropdown = page.locator('select.form-control');
   await dropdown.selectOption("consult");
   await page.locator(".radiotextsty").last().click();
   await page.locator('#okayBtn').click();
   console.log(await page.locator(".radiotextsty").last().isChecked());
   await expect(page.locator(".radiotextsty").last()).toBeChecked();
   await page.locator("#terms").click();
   await expect(page.locator("#terms")).toBeChecked();
   await page.locator("#terms").uncheck();
   //expect(await page.locator("#terms").isChecked()).toBeFalsy();// this is very basic
   await expect(page.locator("#terms")).not.toBeChecked();// Industry level this one is best
//    Better because:

// Built-in auto-wait
// Retries until condition matches
// More stable for real-world apps
   await expect(documentblink).toHaveAttribute("class","blinkingText");

   //assertions
   await page.pause();
})

test.only("Child windows handle", async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/") ;
    const documentblink = page.locator("[href*='documents-request']");
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),// Listen for any new page pending , rejected , fulfilled
        documentblink.click(),
    ]);// new page is opened

    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0]
    //console.log(domain);
    await page.locator("#username").fill(domain);
    await page.pause();
    console.log(await page.locator("#username").inputValue());

})

