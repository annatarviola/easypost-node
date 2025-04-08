/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

// const client = new EasyPostClient(process.env.PROD_KEY); // prodKey
const client = new EasyPostClient(process.env.TEST_KEY) // testKey

//============convert shipment label format after purchase============
try {
  const shipment = await client.Shipment.retrieve(
    "shp_5b36e57bd8954176879e53c7b069b9f3"
  );
  console.log("   ");
  console.log("   ");
  console.log(`attempting to re-format ${shipment.id}...`);
  const shipmentWithLabel = await client.Shipment.convertLabelFormat(
    shipment.id,
    "PDF"
  );

  console.log(shipmentWithLabel);

  if (shipmentWithLabel.postage_label.label_pdf_url) {
    console.log(" ");
    console.log("PDF LABEL URL:");
    console.log(JSON.stringify(shipmentWithLabel.postage_label.label_pdf_url));
    console.log(" ");
  }
  if (shipmentWithLabel.postage_label.label_zpl_url) {
    console.log(" ");
    console.log("ZPL LABEL URL:");
    console.log(JSON.stringify(shipmentWithLabel.postage_label.label_zpl_url));
    console.log(" ");
  }
  if (shipmentWithLabel.postage_label.label_epl2_url) {
    console.log(" ");
    console.log("EPL2 LABEL URL:");
    console.log(JSON.stringify(shipmentWithLabel.postage_label.label_epl2_url));
    console.log(" ");
  }
} catch (error) {
  console.log("   ");
  console.log("SHIPMENT RETRIEVE ERROR:");
  console.log(error);
}
