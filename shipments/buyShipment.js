/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import crypto from "crypto";
import {
  getAdminLink,
  getLabelUrl,
} from "../utils/shipmentUtils.js";

const client = new EasyPostClient(process.env.PROD_KEY);  // prodKey
// const client = new EasyPostClient(process.env.TEST_KEY); // testKey

//============buy shipment by lowest rate============
try {
  const shipment = await client.Shipment.retrieve(
    "shp_8fef95ed473640168c98d11f64c1142c"
  );
  console.log("   ");
  console.log("   ");
  console.log(`attempting to purchase ${shipment.id}...`);
  //============buy shipment by lowest rate============
  try {
    console.log("   ");
    console.log("   ");
    console.log(`attempting to purchase ${shipment.id}...`);
    const boughtShipment = await client.Shipment.buy(
      shipment.id, // shipment id
      shipment.lowestRate(), // shipment rate
      null // insurance
    );
    console.log(JSON.stringify(boughtShipment, null, 2));

    // log shipment ID & admin link
    getAdminLink(boughtShipment);

    // log link to label URL
    getLabelUrl(boughtShipment);
  } catch (error) {
    console.log("   ");
    console.log("SHIPMENT BUY ERROR:");
    console.log(error);
    getAdminLink(shipment);
  }

  //============buy shipment by carrier name/service type============
  // try {
  //     const boughtShipment = await client.Shipment.buy(
  //         shipment.id,
  //         shipment.lowestRate(["FedEx"], ["FEDEX_GROUND"])
  //     )
  //     console.log(JSON.stringify(boughtShipment, null, 2))
  // } catch (error) {
  //     console.log("   ")
  //     console.log("SHIPMENT BUY ERROR:")
  //     console.log(error)
  // }
} catch (error) {
  console.log("   ");
  console.log("SHIPMENT RETRIEVE ERROR:");
  console.log(error);
}
