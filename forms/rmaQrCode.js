/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const client = new EasyPostClient(process.env.PROD_KEY); // prodKey
// const client = new EasyPostClient(process.env.TEST_KEY); // testKey

try {
  const shipmentWithForm = await client.Shipment.generateForm(
    "shp_ada6f3e7489c4151870937fa133f0a7e",
    "rma_qr_code",
    {
      rma: {
        pack_and_return: false
      },
    }
  );

  console.log(shipmentWithForm);
} catch (error) {
  console.log("   ");
  console.log("RMA QR CODE CREATE ERROR:");
  console.log(error);
}
