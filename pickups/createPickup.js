/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

// const client = new EasyPostClient(process.env.PROD_KEY); // prodKey
const client = new EasyPostClient(process.env.TEST_KEY); // testKey
// const client = new EasyPostClient(process.env.DEFAULT_CA_PROD_KEY); // prodKey for EP default carrier accounts
// const client = new EasyPostClient(process.env.DEFAULT_CA_TEST_KEY); // prodKey for EP default carrier accounts

//============create a pickup============
try {
  const pickup = await client.Pickup.create({
    // address: { id: "adr_b729c3e41d1211ef81c0ac1f6bc539aa" },
    address: {
      name: "McLain Eighth Street",
      company: "McLain 8th Street",
      street1: "750 E Eighth St",
      street2: null,
      city: "Traverse City",
      state: "MI",
      zip: "49686",
      country: "US",
      phone: "4108765756",
      email: null,
    },
    shipment: { id: "shp_8192c7594ad8442ea14c9db958063d20" },
    // batch: { id: "batch_72f026f41dfb443c8d7344b4e0c4020b" },
    reference: "testing",
    min_datetime: "2025-02-10 10:00:00",
    max_datetime: "2025-02-10 14:00:00",
    is_account_address: false,
    instructions: "COURIER NEEDS TO BRING SCANNER INSIDE",
  });

  console.log(pickup);
} catch (error) {
  console.log("   ");
  console.log("PICKUP CREATE ERROR:");
  console.log(error);
}
