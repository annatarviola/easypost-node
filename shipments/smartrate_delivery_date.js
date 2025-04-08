/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api"
import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import crypto from "crypto"
import fs from "fs"

const client = new EasyPostClient(process.env.PROD_KEY);  // prodKey
// const client = new EasyPostClient(process.env.TEST_KEY) // testKey

/**
 * TOOL DESCRIPTION AS SHOWN IN https://www.easypost.com/docs/api/node#retrieve-estimated-delivery-date-and-total-transit-days-across-all-rates-for-a-shipment
 * 
 * The Delivery Date endpoint of the SmartRate API will return an EasyPost Estimated Delivery Date as well as a Days in Transit object that contains the expected number of total days the shipment is to be in transit across a variety of percentiles for every Rate for a given Shipment. Transit days are calculated as the number of days (including weekends and holidays) between the first time the carrier acknowledges possession of the Shipment and the first out-for-delivery attempt.

This endpoint requires the parameter planned_ship_date to be provided when called. Planned Ship Date is the date that the user would expect the carrier to take possession of the shipment. Knowing this makes the results of the API extremely accurate.
 */


try {
    const shipment = await client.Shipment.retrieve('shp_c516103de702471ab11e6d1be5c59d7d');

    const estimatedDeliveryDates = await client.Shipment.retrieveEstimatedDeliveryDate(
      shipment.id,
      '2025-01-17', // planned_ship_date
    );
  
    console.log(JSON.stringify(estimatedDeliveryDates, (key, value) => {
      // Exclude keys starting with an underscore
      if (key.startsWith('_')) {
        return undefined;
      }
      return value;
    }, 2));

} catch (error) {
  console.log("   ")
  console.log("ESTIMATED DELIVERY DATE RATING ERROR:")
  console.log(error)
}
