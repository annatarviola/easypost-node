/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api"
import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import crypto from "crypto"
import fs from "fs"

const client = new EasyPostClient(process.env.PROD_KEY);  // prodKey
// const client = new EasyPostClient(process.env.TEST_KEY) // testKey

//============retrieve available carrier account types============
try {
    const carrierAccounts = await client.CarrierAccount.all();

  console.log(carrierAccounts);
} catch (error) {
  console.log("   ")
  console.log("ERROR GETTING CARRIER ACCOUNT TYPES:")
  console.log(error)
}