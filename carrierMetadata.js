import EasyPostClient from "@easypost/api"
import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
const EasyPostBetaClient = require('@easypost/api');

const client = new EasyPostBetaClient(process.env.EASYPOST_API_KEY);


(async () => {
//   // Request all metadata for all carriers
//   const carrierMetadata = await client.CarrierMetadata.retrieve();
//   console.log(carrierMetadata);

  // Request specific metadata for specific carriers
  const carrierMetadataWithFilters = await client.CarrierMetadata.retrieve(
    ['canadapost'],
    ['service_levels', 'predefined_packages'],
  );
  console.log(carrierMetadataWithFilters);
})();