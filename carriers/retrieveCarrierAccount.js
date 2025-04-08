/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const client = new EasyPostClient(process.env.PROD_KEY); // prodKey
// const client = new EasyPostClient(process.env.TEST_KEY) // testKey

try {
  const carrierAccount = await client.CarrierAccount.retrieve("ca_00412fb6307e451b9f15336dc4c412d0");

  console.log(carrierAccount);
} catch (error) {
  console.log("   ");
  console.log("ERROR RETRIEVING CARRIER ACCOUNT:");
  console.log(error);
}
