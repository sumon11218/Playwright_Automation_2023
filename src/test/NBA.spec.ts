import { test, expect, Page } from '@playwright/test'

let page: Page
//using context concept rather than page whenever you are dealing with multiple tabs on your single test
test("'Look for a game in NBA site scheduled in November",async({context}) => {
    let page = await context.newPage()
    let timelimit = 8000

    //navigate to nba home
    await page.goto("https://www.nba.com/")
    //click on games
    await page.locator("xpath=//span[text()='Games']").click({timeout:timelimit})
    //click on thursday schedule
    await page.locator("xpath=//*[@data-text='Thu 16']").click({timeout:timelimit})
    //choose first game displayed
    await page.locator("xpath=//section[@class='GameCard_gcMain__q1lUW']").nth(0).click({timeout:timelimit})
    //scroll
    await page.mouse.wheel(0,160)
    await page.waitForTimeout(500)
    await page.mouse.wheel(0,160)
    await page.waitForTimeout(500)
    await page.mouse.wheel(0,160)
    await page.waitForTimeout(500)
    await page.mouse.wheel(0,160)
    await page.waitForTimeout(500)
    await page.mouse.wheel(0,160)
})//end of test

