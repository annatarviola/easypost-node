/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import crypto from "crypto";
import fs from "fs";

const client = new EasyPostClient(process.env.PROD_KEY); // prodKey
// const client = new EasyPostClient(process.env.TEST_KEY); // testKey
// const client = new EasyPostClient(process.env.DEFAULT_CA_PROD_KEY); // prodKey for EP default carrier accounts
// const client = new EasyPostClient(process.env.DEFAULT_CA_TEST_KEY); // prodKey for EP default carrier accounts

/**
 * TOOL DESCRIPTION AS SHOWN IN https://www.easypost.com/docs/api#retrieve-rates-for-a-shipment
 *
 * You can retrieve Rates without creating a Shipment object using this endpoint.
 * This endpoint is ideal when wanting to display or compare rates without creating Shipment objects.
 * The Rate objects returned by this endpoint do not include IDs.
 */

try {
  const rates = await client.BetaRate.retrieveStatelessRates({
    // is_return: true,
    from_address: {
      name: "Boll & Branch",
      street1: "30 Ludwig Court",
      city: "Shoemakersville",
      state: "PA",
      zip: "19555",
      country: "US",
    },
    to_address: {
      name: "",
      street1: "355 East Ohio Street",
      street2: "1407",
      city: "Chicago",
      state: "IL",
      zip: "60611",
      country: "US",
    },
    options: {special_rates_eligibility: "USPS.MEDIAMAIL"},
    parcel: { length: 45, width: 60, height: 8, weight: 288.7 },
    carrier_accounts: [process.env.UPS_CA],
  });

  console.log(rates);
} catch (error) {
  console.log("   ");
  console.log("STATELESS RATING ERROR:");
  console.log(error);
}
