/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

// const client = new EasyPostClient(process.env.PROD_KEY); // prodKey
const client = new EasyPostClient(process.env.TEST_KEY); // testKey

try {
  const shipmentWithForm = await client.Shipment.generateForm(
    "shp_5a70eeba987a4ee7bfbe06623965bf4b",
    "label_qr_code"
  );

  console.log(shipmentWithForm);
} catch (error) {
  console.log("   ");
  console.log("RMA QR CODE CREATE ERROR:");
  console.log(error);
}
