import { test, expect, Page } from '@playwright/test'

let page: Page
//using context concept rather than page whenever you are dealing with multiple tabs on your single test
test("'Find a Dentist' by a zipcode",async({context}) => {
    let page = await context.newPage()
    let timelimit = 8000

    //navigate to uhc home
    await page.goto("https://www.uhc.com/")
    //click on find a doctor
    await page.locator("xpath=//a[text()='Find a doctor']").nth(0).click({timeout:timelimit})
    
    let [newPage] = await Promise.all
    (
        [
            //creating session for new tab
            context.waitForEvent('page'),
            //click on search as a guest
            await page.locator("xpath=//a[text()='Search as a guest']").click({timeout:timelimit})        
        ]
    )//end of promise function
   
    //click on dental directory
    await newPage.locator("xpath=//div[text()='Dental Directory']").click({timeout:timelimit})
    //click on medicare plans
    await newPage.locator("xpath=//div[text()='Medicare Plans']").click({timeout:timelimit})
    //enter zipcode
    await newPage.waitForTimeout(2000)     
    await newPage.locator("xpath=//*[@id='location']").fill("11218",{timeout:timelimit})
    await newPage.waitForTimeout(1500)     
    //click outside to get out of zip code field
    await newPage.locator("xpath=//*[text()='Search by your location to find a plan']").click({timeout:timelimit})
    //click on link result
    await newPage.locator("xpath=//*[@data-test-id='change-location-result']").click({timeout:timelimit})
    //click on continue
    await newPage.locator("xpath=//*[text()='Continue']").click({timeout:timelimit})
    //click on no preference 
    await newPage.locator("xpath=//*[text()='No Preference']").click({timeout:timelimit})
    

    //switch back to previous tab
    //await page.bringToFront()
    await newPage.waitForTimeout(4000)     

})//end of test

