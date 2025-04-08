/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api"
import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import crypto from "crypto"
import fs from "fs"

// const client = new EasyPostClient(process.env.PROD_KEY);  // prodKey
const client = new EasyPostClient(process.env.TEST_KEY) // testKey

//============buy shipment by lowest rate============
try {
  const insurances = await client.Insurance.all({
    page_size: 5,
  });

  console.log(insurances);
} catch (error) {
  console.log("   ")
  console.log("ERROR GETTING INSURANCES:")
  console.log(error)
}