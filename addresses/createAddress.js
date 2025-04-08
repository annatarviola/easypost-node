/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import crypto from "crypto";
import fs from "fs";

const client = new EasyPostClient(process.env.PROD_KEY); // prodKey
// const client = new EasyPostClient(process.env.TEST_KEY); // testKey

//============create address============
try {
  const address = await client.Address.create({
    carrier_facility: null,
    country: "US",
    mode: "production",
    name: "Hilda Lopez Orellana",
    state: "TX",
    street1: "125 W Dyna Dr Apt # 126",
    zip: "77060",
    verify: true
  });

  console.log(address);
} catch (error) {
  console.log("   ");
  console.log("CREATE ADDRESS ERROR:");
  console.log(error);
}
