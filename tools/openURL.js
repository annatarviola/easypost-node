// TOOL IS NOT WORKING


import inquirer from "inquirer"
import puppeteer from "puppeteer"

const baseURL = "https://easypost-admin.easypo.net/easy_post~shipment"
const regex = /shp_\w+/g

inquirer
    .prompt([
        {
            type: "input",
            name: "userInput",
            message: "Enter the IDs to open them in Admin",
            default: "shp_xxxx, ca_xxxx",
        },
    ])
    .then((answers) => {
        console.log("did it work? ", answers)
        let shipList = answers.userInput.match(regex) // this will return an array of the regex matched items and assign it to the 'shipList' variable
        for (const shipment in shipList) {
            if (shipList[shipment].length === 36) {
              // window.open(
              //   `${baseURL}/${shipList[shipment]}`,
              //   "_blank"
              (async () => {
                // Launch the browser
                const browser = await puppeteer.launch();
              
                // Create a page
                const page = await browser.newPage();
              
                // Go to your site
                await page.goto(`https://google.com`);

              })();
            } else {
                console.log("maybe not a valid shipment ID?")
            }
        }
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    })
