/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api"
import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import crypto from "crypto"
import fs from "fs"

// const client = new EasyPostClient(process.env.PROD_KEY);  // prodKey
const client = new EasyPostClient(process.env.TEST_KEY) // testKey

//============retrieve shipment============
try {
  const shipment = await client.Shipment.retrieve('shp_c233218815084f50b5494dfa0892a35e')
  
  console.log(shipment)

} catch (error) {
  console.log("   ")
  console.log("SHIPMENT RETRIEVE ERROR:")
  console.log(error)
}