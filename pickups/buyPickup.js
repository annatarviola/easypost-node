/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api"
import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import crypto from "crypto"
import fs from "fs"

// const client = new EasyPostClient(process.env.PROD_KEY); // prodKey
const client = new EasyPostClient(process.env.TEST_KEY); // testKey
// const client = new EasyPostClient(process.env.DEFAULT_CA_PROD_KEY); // prodKey for EP default carrier accounts
// const client = new EasyPostClient(process.env.DEFAULT_CA_TEST_KEY); // prodKey for EP default carrier accounts


//============buy a pickup============
try {
  const pickup = await client.Pickup.retrieve('pickup_a0756c7f20504adba490c6f8ec8adaf7');

  const boughtPickup = await client.Pickup.buy(pickup.id, 'USPS', 'NextDay');

  console.log(boughtPickup);
} catch (error) {
  console.log("   ")
  console.log("PICKUP BUY ERROR:")
  console.log(error)
}