import { test, expect, Page } from '@playwright/test'

let timeLimit = 10000

//using context concept rather than page whenever you are dealing with multiple tabs on your single test
test("Get a quote at DHL",async({page}) => {
    await page.goto("https://www.dhl.com/us-en/")
    //click on accept all
    await page.locator("xpath=//*[contains(text(),'Accept All')]").nth(0).click({timeout:timeLimit})
    //click on ship
    await page.locator("xpath=//span[text()='Ship']").nth(1).click({timeout:timeLimit})
    //click on get a quote
    await page.locator("xpath=//*[contains(text(),'Get a Quote')]").nth(1).click({timeout: timeLimit})
    //enter destination country
    await page.locator("xpath=//*[@name='destinationCountry']").fill("United States of America",{timeout: timeLimit})


})





