/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

// const client = new EasyPostClient(process.env.PROD_KEY);  // prodKey
const client = new EasyPostClient(process.env.TEST_KEY); // testKey

// //============retrieve a tracker============
// try {
//     const tracker = await client.Tracker.retrieve('trk_...');

//     console.log(tracker);
// } catch (error) {
//   console.log("   ")
//   console.log("RETRIEVE TRACKER ERROR:")
//   console.log(error)
// }

//============retrieve all trackers============

try {
  const trackers = await client.Tracker.all({
    tracking_code: "277465398756",
  });

  console.log(trackers);
} catch (error) {
  console.log("   ");
  console.log("RETRIEVE TRACKER ERROR:");
  console.log(error);
}
