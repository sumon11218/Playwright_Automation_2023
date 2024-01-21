import { test, expect, Page } from '@playwright/test'

let page: Page
//using context concept rather than page whenever you are dealing with multiple tabs on your single test
test("'Find a doctor' by a zipcode and then switch back to default tab to click on 'visit us' ",async({context}) => {
    let page = await context.newPage()
    let timelimit = 8000
    //navigate to google
    console.log("Navigate to Fidelis Care home page")
    await page.goto("https://www.fideliscare.org/")
    //hover to shop for a plan
    console.log("Hover to Shop for a Plan")
    await page.locator("xpath=//span[text()='Shop For a Plan']").hover({timeout:timelimit})
    //click on shop for a plan
    console.log("Click on Shop for a Plan")
    await page.locator("xpath=//a[text()='Shop for a Plan']").nth(0).click({timeout:timelimit})
    
    //concept below will allow you to interact with a new tab that opened after click on on find a doctor
    //whichever element that click from the default tab which opens up a new tab, then that element must me wrapped inside Promise.all array function
    console.log("Click on Find a Doctor")
    let [newPage] = await Promise.all
    (
        [
            //creating session for new tab
            context.waitForEvent('page'),
            //click on find a doctor from default page
            await page.locator("xpath=//*[@href='/Find-A-Doctor']").nth(0).click({timeout:timelimit})
        ]
    )//end of promise function
    console.log("Switch to new tab & enter a zip code")
    //entering zip code on new tab
    await newPage.locator("xpath=//input[@id='searchLocation']").fill("11218",{timeout:timelimit})
    await newPage.waitForTimeout(1500)


    //switch back to previous tab
    await page.bringToFront()
    //click on visit us
    console.log("Switch back to default tab & click on Search")
    await page.locator("xpath=//a[contains(text(),'Search')] ").nth(3).click({timeout:timelimit})
    await newPage.waitForTimeout(4000)     
})//end of test

