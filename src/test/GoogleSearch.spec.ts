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
    await page.goto("https://www.google.com")
    //wait few seconds
    await page.waitForTimeout(3000)
    //type bmw on your search field
    await page.locator("xpath=//*[@name='p']").fill("BMW",{timeout:3000})
    //click on google search button
    await page.locator("xpath=//*[@name='btnK']").nth(1).click()
})//end of test

//capture the search result 
test("Capture the search number for BMW",async() => {
    //wait few seconds
    await page.waitForTimeout(3000)
    //store the search results text in a variablen 
    let result = await page.locator("xpath=//*[@id='result-stats']").textContent()
    //capture the search number and print it out
    let arrayResult = result.split(" ")
    console.log("BMW search number is " + arrayResult[1])
})//end of test

