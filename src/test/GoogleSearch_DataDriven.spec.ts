import { test, expect, Page } from '@playwright/test'
import Excel from 'exceljs';


//any variable can be defined with let or const
let page: Page

//create beforeAll function to define only one instance of the page
test.beforeAll(async({browser}) =>{
    page = await browser.newPage()
})

test("Search for different cars on Google Search field",async() => {
    const workbook = new Excel.Workbook();
    const content = await workbook.xlsx.readFile("src/test/resources/playwright_datadriven.xlsx");
    const worksheet = content.worksheets[0];
    const numberOfRows = worksheet.rowCount - 1;
    //start of for loop
    for(let i=2; i<numberOfRows;i++){
        const cars = worksheet.getCell(i,1).toString();
        //console.log("row value: " + cell)
        //navigate to bing
        await page.goto("https://www.google.com")
        //type a specific car from excel data on your search field
        await page.locator("xpath=//*[@name='q']").fill(cars,{timeout:5000})
        //click on search icon
        await page.locator("xpath=//*[@name='btnK']").nth(1).click({force:true})
        await page.waitForTimeout(900)
    }//end of loop
})//end of test


