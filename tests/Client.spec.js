const {test,expect}=require('@playwright/test');

test('Client App Login', async({page})=>
{
    const Email = "ankitmishra@example.com";
    const productName = 'ZARA COAT 3'
    const products = page.locator(".card-body");
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator("input[type='emai']").fill(Email);
    await page.locator("input[type='password']").fill("Test@123");
    await page.locator("input[type='submit']").click();
   await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    console.log(count);
    for(let i =0;i<count;++i)
    {
        
            const text = await products.nth(i).locator("b").innerText();

        if (text.trim() === productName) {
            await products.nth(i).locator("text=Add To Cart").click();
            break;
    }

    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
   
    
    // Enter details in payment page

    const CardNumber = page.locator("input[value='4542 9931 9292 2293']");
    await CardNumber.clear();
    await CardNumber.fill("4111 1111 1111 1111");

    const expiry = page.locator(':text-is("Expiry Date")');


const dropdowns = page.locator('select:visible');

await dropdowns.nth(0).selectOption('02');   // Month
await dropdowns.nth(1).selectOption('20'); // Year


const CvvCode = page.locator("//div[text()='CVV Code ']/following-sibling::input");
    await CvvCode.clear();
    await CvvCode.fill("411");


const NameofCard = page.locator("//div[text()='Name on Card ']/following-sibling::input");
    await NameofCard.clear();
    await NameofCard.fill("Ankit Mishra");


    const ApplyCoupen = page.locator("//div[text()='Apply Coupon ']/following-sibling::input");
    await ApplyCoupen.clear();
    await ApplyCoupen.fill("56645465");

    // Shipping Information

    await page.locator("input[placeholder='Select Country']").pressSequentially("ind");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();

    for(let i=0; i<optionsCount; ++i)
    {
        const text = await dropdown.locator("button").nth(i).locator("span").innerText();
        console.log(text);
        if(text.trim() === "India"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    expect(page.locator(".user__name [type='text']").first()).toHaveText(Email);
    await page.locator(".action__submit").click();

    expect(page.locator(".hero-primary")).toContainText(" Thankyou for the order. ");
    

    const orderid = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderid);

    // Important code to check the Order id from Orders page 
    await page.locator("button[routerlink='/dashboard/myorders']").click();

// locator store karo (count nahi)
const rows = page.locator("tbody tr");

// wait for rows to load
await rows.first().waitFor();

const rowCount = await rows.count();

for (let i = 0; i < rowCount; ++i) {

    const row = rows.nth(i);
    const rowOrderId = await row.locator("th").textContent();

    if (orderid.trim().includes(rowOrderId.trim())) {
        await row.locator("button").first().click();
        break; // important
    }
}

// Applied Assertion
const OrderidDetails = await page.locator(".col-text").textContent();
expect(orderid.includes(OrderidDetails)).toBeTruthy();

await page.pause();
})
