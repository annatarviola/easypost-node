import EasyPostClient from "@easypost/api";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

// const client = new EasyPostClient(process.env.PROD_KEY); // prodKey
const client = new EasyPostClient(process.env.TEST_KEY); // testKey

(async () => {
  const smartRates = await client.Shipment.getSmartRates(
    "shp_189db12f89174ae6ac1f85e639f6f77f"
  );

  console.log(smartRates);
})();

