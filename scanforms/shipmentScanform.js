/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

// const client = new EasyPostClient(process.env.PROD_KEY);  // prodKey
const client = new EasyPostClient(process.env.TEST_KEY); // testKey

//============SCANFORM SHIPMENTS DIRECTLY============
try {
  const scanForm = await client.ScanForm.create({
    shipments: [
    
      { id: "shp_755873debbd040f2a951d0c38ec2c325" },
      { id: "shp_1e9dbd56b73a4193a1532502095cc91d" },
    ],
  });

  console.log(scanForm);
} catch (error) {
  console.log("   ");
  console.log("SHIPMENT SCANFORM ERROR:");
  console.log(error);
}
