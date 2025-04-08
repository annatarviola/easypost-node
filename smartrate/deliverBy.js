import EasyPostClient from "@easypost/api";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

// const client = new EasyPostClient(process.env.PROD_KEY); // prodKey
const client = new EasyPostClient(process.env.TEST_KEY); // testKey

const params = {
  from_zip: '84043',
  to_zip: '84102',
  planned_ship_date: '2024-11-18',
  carriers: ['UPS'],
};

(async () => {
  const results = await client.SmartRate.estimateDeliveryDate(params);

  console.log(results);
})();
