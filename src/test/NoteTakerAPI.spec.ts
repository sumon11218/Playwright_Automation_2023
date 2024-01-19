
import { test, expect, request } from '@playwright/test'

 // declaring global variables
 let page: any
 let context: any

 test.beforeAll(async ({browser}) =>{
   // Create a new Page instance
   page = await browser.newPage(); 
   context = await request.newContext();
 })//end of before all


//setup my test function which is similar to using @Test annotation in testNG
test('Get Notes From note taker API', async () => {
    //get existing note(s)
    const response = await context.get('https://fk-note-taker.herokuapp.com/api/notes', {
        headers: {
        "Content-Type": "application/json"
        }
      })//end of get

      //verify the status code is 200
      //expect is equivalent to hard assert in testNG
      expect(response.status()).toBe(200)

      //capture the body of the response
      let body = await response.json()

      //console.log("Entired body: " + JSON.stringify(body))

      //capture the first id and title of the existing note and print it out
      let firstNoteId = await JSON.stringify(body[0].id)
      let firstNoteTitle = await JSON.stringify(body[0].title)

      //console.log("First Note Id: " + firstNoteId + " First Note Title: " + firstNoteTitle)


      //loop through all the list of notes by printing their ids and title
      console.log("Notes Count: " + body.length)
      for(let i=0; i < body.length; i++){
        let noteId = await JSON.stringify(body[i].id)
        let noteTitle = await JSON.stringify(body[i].title)
        console.log("For Index " + i + " Note Id is " + noteId + " & Note Title is " + noteTitle)
      }//end of loop

})//end of test 1

test('Post/create a new notes From note taker API', async () => {
   //create 3 new notes
   let titles = Array<string>()
   titles.push("Note Nove 21, 2023 01")
   titles.push("Note Nove 21, 2023 02")
   titles.push("Note Nove 21, 2023 03")

  for(let i=0; i< titles.length; i++){
      const response = await context.post('https://fk-note-taker.herokuapp.com/api/notes', {
        headers: {
        "Content-Type": "application/json"
        },
        data:{
          "title": titles[i],
          "text": "First post automation"
        }
      })//end of get

      //verify the status code is 200
          //expect is equivalent to hard assert in testNG
          expect(response.status()).toBe(200)

          //capture the body of the response
          let body = await response.json()

          //console.log("Body: " + JSON.stringify(body))
          //print out the id, title & text for the newly created note
          let noteId = JSON.stringify(body.id).replace(/"/g,'')
          let noteTitle = JSON.stringify(body.title).replace(/"/g,'')
          let noteText = JSON.stringify(body.text).replace(/"/g,'')

          console.log("For index " + i + " The ID: " + noteId + " Title: " + noteTitle + " Text:" + noteText)
  }//end of loop
})//end of test 2


test('Delete the first id you get from get request', async () => {

  //get existing note(s)
  const response = await context.get('https://fk-note-taker.herokuapp.com/api/notes', {
    headers: {
    "Content-Type": "application/json"
    }
  })//end of get

  //verify the status code is 200
  //expect is equivalent to hard assert in testNG
  expect(response.status()).toBe(200)

  //capture the body of the response
  let body = await response.json()

  //capture the first id and title of the existing note and print it out
  let firstNoteId = await JSON.stringify(body[0].id)
  let firstNoteTitle = await JSON.stringify(body[0].title)

   //get existing note(s)
   const response2 = await context.delete('https://fk-note-taker.herokuapp.com/api/notes/'+firstNoteId, {
    headers: {
    "Content-Type": "application/json"
    }
  })//end of get
  expect(response.status()).toBe(200)

  //verify it on note taker ui
  await page.goto("https://fk-note-taker.herokuapp.com/notes")
  try{
    await page.locator("xpath=//*[text()='"+firstNoteTitle+"']").click({timeout: 3000})
  } catch(e) {
     console.log("PASS: Note with title " + firstNoteTitle + " doesn't exist")
  }

})//end of test 3