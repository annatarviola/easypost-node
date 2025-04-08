/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import crypto from "crypto";
import fs from "fs";

const client = new EasyPostClient(process.env.PROD_KEY); // prodKey
// const client = new EasyPostClient(process.env.TEST_KEY) // testKey

//============create a report============
try {
  const report = await client.Report.create({
    type: "shipment",
    start_date: "2024-08-25",
    end_date: "2024-09-25",
    // send_email: true,
    // include_children: false,
  });

  console.log(report);
} catch (error) {
  console.log("   ");
  console.log("CREATE REPORT ERROR:");
  console.log(error);
}
