/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import crypto from "crypto";
import fs from "fs";

const client = new EasyPostClient(process.env.PROD_KEY); // prodKey
// const client = new EasyPostClient(process.env.TEST_KEY) // testKey

// //============retrieve a single report============
// try {
//     const report = await client.Report.retrieve('plrep_211bf0463c3840928bf0d960a9c16a0d');

//     console.log(report);
// } catch (error) {
//   console.log("   ")
//   console.log("RETRIEVE REPORT ERROR:")
//   console.log(error)
// }

//============retrieve all reports============

try {
  const reports = await client.Report.all({
    type: "shipment",
    page_size: 100,
    start_datetime: "2024-10-25T00:00:00Z",
    // before_id: "shprep_feff47ff542d424f8c01b9c6af614e78",
  });

  console.log(reports);
  console.log("")
  console.log("")
  console.log("")


  const idsAndDates = reports.reports;
 
  const result = idsAndDates.map((report) => ({
    id: report.id,
    start_date: report.start_date,
    created_at: report.created_at,
  }));

  console.log(result)

  // idsAndDates.forEach((report) => {
  //   console.log(
  //     `id: ${report.id}, start_date: ${report.start_date}, created_at: ${report.created_at}`
  //   );
  // });
} catch (error) {
  console.log("   ");
  console.log("RETRIEVE REPORTS ERROR:");
  console.log(error);
}
