/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api"
import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import crypto from "crypto"
import fs from "fs"

// const client = new EasyPostClient(process.env.PROD_KEY);  // prodKey
const client = new EasyPostClient(process.env.TEST_KEY) // testKey

//============consolidate all shipment labels to one label file============
try {
  const batch = await client.Batch.retrieve('batch_0eae7269c5ec4b7badc56e14f4bea39a');

  const batchWithLabel = await client.Batch.generateLabel(batch.id, 'PNG');

  console.log(batchWithLabel);
} catch (error) {
  console.log("   ")
  console.log("BATCH LABEL ERROR:")
  console.log(error)
}