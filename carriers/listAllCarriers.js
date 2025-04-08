/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api"
import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import crypto from "crypto"
import fs from "fs"

// const client = new EasyPostClient(process.env.PROD_KEY);  // prodKey
const client = new EasyPostClient(process.env.TEST_KEY) // testKey

//============list of your added carrier accounts============
try {
    const carrierAccounts = await client.CarrierAccount.all();

  console.log(carrierAccounts);
} catch (error) {
  console.log("   ")
  console.log("ERROR GETTING YOUR CARRIER ACCOUNTS:")
  console.log(error)
}