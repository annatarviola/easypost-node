/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const client = new EasyPostClient(process.env.PROD_KEY);  // prodKey
// const client = new EasyPostClient(process.env.TEST_KEY); // testKey

//============CREATE A WEBHOOK============
try {
  const webhook = await client.Webhook.create({
    url: "https://webhook.site/50b431db-ff59-4b69-b6d2-3a19b25b3741",
  });

  console.log(webhook);
} catch (error) {
  console.log("   ");
  console.log("WEBHOOK CREATE ERROR:");
  console.log(error);
}
