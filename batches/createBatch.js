/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import crypto from "crypto";
import fs from "fs";

const client = new EasyPostClient(process.env.PROD_KEY); // prodKey
// const client = new EasyPostClient(process.env.TEST_KEY); // testKey

// ============buy shipment by lowest rate============
try {
  const batch = await client.Batch.create({
    shipments: [
      // {
      //   reference: "356750-UPS",
      //   mode: "test",
      //   to_address: {
      //     name: "QA Automation Name",
      //     phone: "+3054440777",
      //     email: "qa.automationlogistic@cookunity.com",
      //     street1: "4162 County Rd 53",
      //     city: "Mayo",
      //     state: "Florida",
      //     zip: "32066",
      //     country: "US",
      //     residential: true,
      //   },
      //   from_address: {
      //     name: "CookUnity",
      //     email: "info@cookunity.com",
      //     street1: "5225 Collins Ave, Suite 242",
      //     city: "Miami",
      //     state: "FL",
      //     zip: "33140",
      //     country: "US",
      //     phone: "18007425877",
      //   },
      //   parcel: {
      //     length: 16.7,
      //     width: 11.8,
      //     height: 16.6,
      //     weight: 384,
      //   },
      //   // carrier: "UPS",
      //   // service: "Ground",
      //   // carrier_accounts: [process.env.UPS_CA],
      //   options: {
      //     label_format: "PNG",
      //     pickup_min_datetime: "2024-11-04T19:00:00.000Z",
      //     pickup_max_datetime: "2024-11-04T22:00:00.000Z",
      //     delivery_min_datetime: "2024-11-06T14:00:00.000-05:00",
      //     delivery_max_datetime: "2024-11-06T17:00:00.000-05:00",
      //     label_date: "2024-11-05T19:00:00.000-05:00",
      //   },
      // },
      // {
      //   id: "shp_8b35cd696ffe4b568e7e6ee346387422",
      //   carrier: "UPS",
      //   service: "Ground"
      // },
      // {
      //   id: "shp_2f1eaa2afec64ea890ed1814597dd0a2",
      //   carrier: "UPS",
      //   service: "Ground"
      // },
      {
        id: "shp_40c4e54bf18e45189b49b0409cb184bd",
      },
      {
        id: "shp_54354a8221ca4f709842a200a4a488f4",
      },
      {
        id: "shp_ffac1ebebc624b5ea73e726e19f58b5d",
      },
      // {
      //   to_address: {
      //     name: "Dr. Steve Brule",
      //     street1: "179 N Harbor Dr",
      //     city: "Redondo Beach",
      //     state: "CA",
      //     zip: "90277",
      //     country: "US",
      //     phone: "8573875756",
      //     email: "dr_steve_brule@gmail.com",
      //   },
      //   from_address: {
      //     name: "EasyPost",
      //     street1: "417 Montgomery Street",
      //     street2: "5th Floor",
      //     city: "San Francisco",
      //     state: "CA",
      //     zip: "94104",
      //     country: "US",
      //     phone: "4153334445",
      //     email: "support@easypost.com",
      //   },
      //   parcel: {
      //     length: "20.2",
      //     width: "10.9",
      //     height: "5",
      //     weight: "65.9",
      //   },
      //   options: { label_format: "zpl" },
      //   carrier: "UPS",
      //   carrier_accounts: ["ca_9e67386ae8354acc813087f603f88b6c"],
      //   service: "Ground",
      // },
      // {
      //   to_address: {
      //     name: "Dr. Steve Brule",
      //     street1: "179 N Harbor Dr",
      //     city: "Redondo Beach",
      //     state: "CA",
      //     zip: "90277",
      //     country: "US",
      //     phone: "8573875756",
      //     email: "dr_steve_brule@gmail.com",
      //   },
      //   from_address: {
      //     name: "EasyPost",
      //     street1: "417 Montgomery Street",
      //     street2: "5th Floor",
      //     city: "San Francisco",
      //     state: "CA",
      //     zip: "94104",
      //     country: "US",
      //     phone: "4153334445",
      //     email: "support@easypost.com",
      //   },
      //   options: { label_format: "zpl" },
      //   parcel: {
      //     length: "20.2",
      //     width: "10.9",
      //     height: "5",
      //     weight: "65.9",
      //   },
      //   carrier: "UPS",
      //   carrier_accounts: ["ca_9e67386ae8354acc813087f603f88b6c"],
      //   service: "Ground",
      // },
    ],
  });

  console.log(batch);

  // buy batch
  // const boughtBatch = await client.Batch.buy(batch.id);

  // console.log(boughtBatch);
} catch (error) {
  console.log("   ");
  console.log("CREATE BATCH ERROR:");
  console.log(error);
}

// //=================add shipments to batch=======================
// try {
//   (async () => {
//     const batch = await client.Batch.retrieve('batch_72f026f41dfb443c8d7344b4e0c4020b');

//     const batchWithShipments = await client.Batch.addShipments(batch.id, ['shp_dbfecb96e2a746cf920d9e36a5014292']);

//     console.log(batchWithShipments);
//   })();

// } catch (error) {
//   console.log("   ")
//   console.log("ADD TO BATCH ERROR:")
//   console.log(error)
// }

// // ==================buy a batch================
// try {
//   const createdBatch = await client.Batch.create({
//     shipments: [
//       {
//         from_address: { id: 'adr_...' },
//         to_address: { id: 'adr_...' },
//         parcel: { id: 'prcl_...' },
//         service: 'First',
//         carrier: 'USPS',
//         carrier_accounts: ['ca_...'],
//       },
//     ],
//   })
// } catch(error) {
//     console.log("   ");
//     console.log("BUY BATCH ERROR:");
//     console.log(error)};
