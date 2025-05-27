// /* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import crypto from "crypto";
import fs from "fs";
import {
  logRateErrors,
  logShipmentRates,
  getAdminLink,
  getLabelUrl,
} from "../utils/shipmentUtils.js";

// const client = new EasyPostClient(process.env.PROD_KEY); // prodKey
const client = new EasyPostClient(process.env.TEST_KEY); // testKey
// const client = new EasyPostClient(process.env.DEFAULT_CA_PROD_KEY); // prodKey for EP default carrier accounts
// const client = new EasyPostClient(process.env.DEFAULT_CA_TEST_KEY); // prodKey for EP default carrier accounts

// bring in the admin shipment JSON data from the misc.json file
import ship from "../misc.json" assert { type: "json" };

// DELETES ALL THE NECESSARY ATTRIBUTES
if (ship.to_address) {
  delete ship.to_address.id;
  delete ship.to_address.mode;
  delete ship.to_address.updated_at;
  delete ship.to_address.created_at;
  delete ship.to_address.carrier_facility;
}

if (ship.from_address) {
  delete ship.from_address.id;
  delete ship.from_address.created_at;
  delete ship.from_address.mode;
  delete ship.from_address.updated_at;
}

if (ship.return_address) {
  delete ship.return_address.id;
  delete ship.return_address.created_at;
  delete ship.return_address.mode;
  delete ship.return_address.updated_at;
}

if (ship.parcel) {
  delete ship.parcel.id;
  delete ship.parcel.created_at;
  delete ship.parcel.mode;
  delete ship.parcel.updated_at;
}

if (ship.rates) {
  delete ship.rates;
}

if (ship.selected_rate) {
  delete ship.selected_rate;
}

if (ship.parcel.predefined_package === null) {
  delete ship.parcel.predefined_package;
}

if (ship.customs_info) {
  delete ship.customs_info.id;
  delete ship.customs_info.created_at;
  delete ship.customs_info.mode;
  delete ship.customs_info.updated_at;
  delete ship.customs_info.object;
  for (let i = 0; i < ship.customs_info.customs_items.length; i++) {
    delete ship.customs_info.customs_items[i].id;
    delete ship.customs_info.customs_items[i].created_at;
    delete ship.customs_info.customs_items[i].mode;
    delete ship.customs_info.customs_items[i].updated_at;
    delete ship.customs_info.customs_items[i].object;
    if (ship.customs_info.customs_items[i].currency === null) {
      delete ship.customs_info.customs_items[i].currency;
    }

    // convert these values to a Number rather than a string to avoid the "Invalid prop `customs_info`..." error
    ship.customs_info.customs_items[i].quantity = parseFloat(
      ship.customs_info.customs_items[i].quantity
    );
    ship.customs_info.customs_items[i].value = parseFloat(
      ship.customs_info.customs_items[i].value
    );
    ship.customs_info.customs_items[i].weight = parseFloat(
      ship.customs_info.customs_items[i].weight
    );
  }
}

// extras (depending on the shipment and the options)
// if (ship.options.payment) {
//   delete ship.options.payment;
// }
// if (ship.options.bill_receiver_account) {
//   delete ship.options.bill_receiver_account;
// }
// if (ship.options.bill_receiver_postal_code) {
//   delete ship.options.bill_receiver_postal_code;
// }

// & ADDITIONAL OPTIONS
// ship.options.label_format = "PNG"
// ship.options.cost_center = "easypost1"
// ship.reference = "easypost ref"
// ship.customs_info.contents_explanation = "example explanation"
// ship.customs_info.customs_items[0].description = "example description"
// ship.customs_info.customs_items[1].description = "example description"
// ship.customs_info.customs_items[2].description = "example description"
// ship.options.importer_address_id = "adr_xxxxx"
// ship.options.hazmat = "LITHIUM"

// CREATE SHIPMENT
try {
  console.log(`attempting to recreate ${ship.id ? ship.id : "shipment"}...`);
  console.log("   ");
  console.log("   ");

  const shipment = await client.Shipment.create({
    is_return: ship.is_return,
    to_address: ship.to_address,
    from_address: ship.from_address,
    return_address: ship.return_address,
    // return_address: {
    //   name: "Dr. Steve Brule",
    //   street1: "179 N Harbor Dr",
    //   city: "Redondo Beach",
    //   state: "CA",
    //   zip: "90277",
    //   country: "US",
    //   email: "dr_steve_brule@gmail.com",
    //   phone: "4155559999",
    // },
    // buyer_address: ship.buyer_address,
    parcel: ship.parcel,
    customs_info: ship.customs_info,
    options: ship.options,
    tax_identifiers: ship.tax_identifiers,
    // options: {
    //   payment: {
    //     type: "THIRD_PARTY",
    //     account: "202109538",
    //     postal_code: "60455",
    //   },
    //   alcohol: true,
    //   import_control: "PRINT",
    //   import_control_description: "DESCRIPTION_HERE",
    //   print_custom_1: "PRINT CUSTOM 1 HERE",
    //   print_custom_2: "printCustom2",
    //   print_custom_2_code: "PO",
    //   print_custom_3: "printCustom3",
    //   print_custom_3_code: "RMA",
    //   print_custom_1_barcode: true,
    //   print_custom_2_barcode: true,
    //   label_format: "PDF",
    //   label_size: "4x6",
    //   label_date: "2022-06-25T15:00:00Z",
    //   incoterm: "DAP",
    //   invoice_number: "123456789",
    //   importer_address_id: "adr_f82f2dee2b1a11ee98b4ac1f6bc539aa",
    //   payment: {
    //     type: "THIRD_PARTY",
    //     account: "510087780",
    //     country: "US",
    //     postal_code: "12345",
    //   },
    //   duty_payment_account: {
    //     type: "THIRD_PARTY",
    //     account: "510087780",
    //     country: "US",
    //     postal_code: "12345",
    //   },
    //   dropoff_max_datetime: "2021-05-20T15:00:00Z",
    //   delivery_confirmation: "SERVICE_DEFAULT",
    //   commercial_invoice_format: "PNG",
    //   commercial_invoice_size: "4x6",
    //   delivery_min_datetime: "2022-05-10 10:30:00",
    //   delivery_max_datetime: "2022-05-10 10:30:00",
    //   pickup_min_datetime: "2022-05-10 10:30:00",
    //   pickup_max_datetime: "2022-05-10 10:30:00",
    //   customs_broker_address_id: toAddress.id,
    // },
    carrier_accounts: [process.env.OSMV2_CA],
    // service: 'ExpressPostSignature',
    // reference: crypto.randomUUID(),
    reference: "REFERENCE 1",
    invoice_number: "invoice number",
  });

  // log entire shipment object
  // console.log(JSON.stringify(boughtShipment, null, 2));
  console.log(
    JSON.stringify(
      shipment,
      (key, value) => {
        // Exclude keys starting with an underscore
        if (key.startsWith("_")) {
          return undefined;
        }
        return value;
      },
      2
    )
  );

  // log any rate errors
  logRateErrors(shipment);

  // log any rates
  logShipmentRates(shipment);

  // log shipment ID & admin link
  getAdminLink(shipment);

  // ============buy shipment by lowest rate============
  try {
    console.log("   ");
    console.log("   ");
    console.log(`attempting to purchase ${shipment.id}...`);
    const boughtShipment = await client.Shipment.buy(
      shipment.id, // shipment id
      shipment.lowestRate(), // shipment rate
      null // insurance
    );
    // console.log(JSON.stringify(boughtShipment, null, 2));
    console.log(
      JSON.stringify(
        shipment,
        (key, value) => {
          // Exclude keys starting with an underscore
          if (key.startsWith("_")) {
            return undefined;
          }
          return value;
        },
        2
      )
    );

    // log shipment ID & admin link
    getAdminLink(boughtShipment);

    // log link to label URL
    getLabelUrl(boughtShipment);

    // write base64 string from an inline label into its own text file
    if (boughtShipment.postage_label.label_file) {
      fs.writeFileSync("file.txt", "", "utf8");

      let labelFile = boughtShipment.postage_label.label_file;

      fs.writeFileSync("./base64LabelFile.txt", labelFile);
    }
  } catch (error) {
    console.log("   ");
    console.log("SHIPMENT BUY ERROR:");
    console.log(error);
    getAdminLink(shipment);

    // print full json
    console.log(`\n\nSTRINGIFIED:\n${JSON.stringify(error, null, 2)}`);
  }

  // //============buy shipment by carrier name/service type============
  // try {
  //   console.log("   ");
  //   console.log("   ");
  //   console.log(`attempting to purchase ${shipment.id}...`);
  //   const boughtShipment = await client.Shipment.buy(
  //     shipment.id,
  //     shipment.lowestRate(["Sendle"], ["SAVER-PICKUP"])
  //   );
  //   console.log(JSON.stringify(boughtShipment, null, 2));
  // } catch (error) {
  //   console.log("   ");
  //   console.log("SHIPMENT BUY ERROR:");
  //   console.log(error);
  // }
  //================refund shipment==================
  try {
    const boughtShipment = await client.Shipment.retrieve(shipment.id);

    console.log(``);
    console.log(``);
    console.log(`attempting to refund ${shipment.id}...`);

    const refund = await client.Refund.create({
      carrier: boughtShipment.selected_rate.carrier,
      tracking_codes: [boughtShipment.tracking_code],
    });
    console.log(refund);
  } catch (error) {
    console.log("   ");
    console.log("SHIPMENT REFUND ERROR:");
    console.log(error);
  }
} catch (error) {
  console.log("   ");
  console.log("SHIPMENT CREATE ERROR:");
  console.log(error);
}

// ******** create a way to log shipment and/or errors into a file, potential code example below
// fs.writeFileSync('/Users/smarston/Downloads/test_canada_post_response_3.txt', JSON.stringify(shipment, null, 4));
