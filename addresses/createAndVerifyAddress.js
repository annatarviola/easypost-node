/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import crypto from "crypto";
import fs from "fs";

// const client = new EasyPostClient(process.env.PROD_KEY);  // prodKey
const client = new EasyPostClient(process.env.TEST_KEY); // testKey

//============create address with verification============
try {
  const address = await client.Address.createAndVerify({
    // name: "TEST VERIFICATION",
    // // company: "",
    // street1: "417 MONTGOMERY ST",
    // street2: "floor 5",
    // city: "San Francisco",
    // state: "CA",
    // zip: "94104",
    // country: "US",
    // // email: "",
    // phone: "415-123-4567",
    name: "Nathan Lees",
    company: "Bespoke Telephony Solutions",
    street1: "Woodland Lodge",
    street2: "Dunston Business Village",
    city: "Staffordshire",
    state: "GB",
    zip: "ST189FJ",
    country: "GB",
    phone: "448000210777",
    email: "nathan.lees@bespoketelephonysolutions.com",
  });

  console.log(address);
} catch (error) {
  console.log("   ");
  console.log("CREATE AND VERIFY ADDRESS ERROR:");
  console.log(error);
}
