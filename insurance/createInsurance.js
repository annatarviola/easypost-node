/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api"
import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import crypto from "crypto"
import fs from "fs"

const client = new EasyPostClient(process.env.PROD_KEY);  // prodKey
// const client = new EasyPostClient(process.env.TEST_KEY) // testKey

//============buy shipment by lowest rate============
try {
  const insurance = await client.Insurance.create({
    to_address: { id: 'adr_f6c5daaa1f6611ef8d15ac1f6bc53342' },
    from_address: { id: 'adr_f6dcb9341f6611ef8d8d3cecef1b359e' },
    tracking_code: '1ZH699G00300110032',
    carrier: 'UPS',
    amount: '50.00',
    reference: 'insuranceRef1',
  });

  console.log(insurance);
} catch (error) {
  console.log("   ")
  console.log("ERROR CREATING INSURANCE:")
  console.log(error)
}