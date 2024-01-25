import { test, expect, Page } from '@playwright/test'

//any variable can be defined with let or const
let page: Page

//create beforeAll function to define only one instance of the page
test.beforeAll(async({browser}) =>{
    page = await browser.newPage()
})

//search for bmw 
test("Search for BMW on Search Field @smoke",async() => {
    //navigate to google
    console.log("Navigating to Google home page")
    await page.goto("https://www.google.com")
    //wait few seconds
    //await page.waitForTimeout(7000)
    //type bmw on your search field
    console.log("Entering BMW as a keyword on google search field")
    await page.locator("xpath=//*[@name='q']").fill("BMW",{timeout:3000})
    //click on google search button
    console.log("Clicking on google search button")
    await page.locator("xpath=//*[@name='btnK']").nth(1).click({force:true})
    //store the search results text in a variablen 
    console.log("Capturing search results for BMW")
    let result = await page.locator("xpath=//*[@id='result-stats']").textContent({timeout:3000})
    //capture the search number and print it out
    let arrayResult = result.split(" ")
    console.log("BMW search number is " + arrayResult[1])
    //this is for testing
})//end of test

