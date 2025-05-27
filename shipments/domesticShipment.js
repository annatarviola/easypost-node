// /*  THIS COMPONENT IS SET UP TO USE THE DAD TOOL FOR THE ADDRESSES - CHANGE THE DAD ADDRESSES AS NECESSARY DEPENDING ON THE ORIGIN/DESTINATION COMBINATION YOU ARE TRYING TO TEST */

/* IMPORT EASYPOST AND .ENV INFO */
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

const client = new EasyPostClient(process.env.PROD_KEY); // prodKey
// const client = new EasyPostClient(process.env.TEST_KEY); // testKey
// const client = new EasyPostClient(process.env.DEFAULT_CA_PROD_KEY); // prodKey for EP default carrier accounts
// const client = new EasyPostClient(process.env.DEFAULT_CA_TEST_KEY); // prodKey for EP default carrier accounts

/* IMPORT DAD TOOL */
import dad from "dad-tool";

// CREATE DAD ADDRESSES
const unitedstates1 = dad.random("US_AZ");
const unitedstates2 = dad.random("US_CA");
const canada1 = dad.random("CA_BC");
const canada2 = dad.random("CA_BC");
const australia1 = dad.random("AU_VT");
const australia2 = dad.random("AU_VT");
const unitedkingdom1 = dad.random("EU_UK");
const unitedkingdom2 = dad.random("EU_UK");
const spain1 = dad.random("EU_ES");
const spain2 = dad.random("EU_ES");

// CREATE TO ADDRESS
const toAddress = await client.Address.create({
  name: "TO Example Destination Name",
  company: "TO Example Destination Company",
  street1: unitedstates1.street1,
  street2: unitedstates1.street2,
  city: unitedstates1.city,
  state: unitedstates1.state,
  zip: unitedstates1.zip,
  country: unitedstates1.country,
  phone: "(415) 528-7555",
  email: "example@email.com",
  residential: true,
  verify: null,
  // federal_tax_id: "12345",
  // verify: ["delivery"],
});

// CREATE FROM ADDRESS
const fromAddress = await client.Address.create({
  name: "FROM Example Origin Name",
  company: "FROM Example Origin Company",
  street1: unitedstates2.street1,
  street2: unitedstates2.street2,
  city: unitedstates2.city,
  state: unitedstates2.state,
  zip: unitedstates2.zip,
  country: unitedstates2.country,
  phone: "(415) 528-7555",
  email: "example@email.com",
  // federal_tax_id: '12345'
});

// CREATE RETURN ADDRESS
const returnAddress = await client.Address.create({
  name: "Example Return Name",
  company: "Example Return Company",
  street1: unitedstates2.street1,
  street2: unitedstates2.street2,
  city: unitedstates2.city,
  state: unitedstates2.state,
  zip: unitedstates2.zip,
  country: unitedstates2.country,
  phone: "+1 415-528-7555",
  email: "example@email.com",
  // federal_tax_id: '12345'
});

// CREATE PARCEL
const parcel = await client.Parcel.create({
  length: "11.5",
  width: "6.125",
  height: "6",
  // predefined_package: "SmallFlatRateBox",
  weight: "40",
});

// CREATE SHIPMENT
try {
  console.log("attempting to create shipment...");
  console.log("   ");
  console.log("   ");

  const shipment = await client.Shipment.create({
    // is_return: true,
    // to_address: toAddress,
    to_address: {
      name: "abcdefghijklmnopqrstuvwxyz0123456789",
      company: null,
      street1: "301 E OCEAN BLVD STE 1720",
      street2: null,
      city: "LONG BEACH",
      state: "CA",
      zip: "90802-8813",
      country: "US",
      phone: "0123456789",
      email: null,
    },
    // from_address: fromAddress,
    from_address: {
      name: "From Address",
      company: null,
      street1: "3522 New Land Loop",
      street2: null,
      city: "Lehi",
      state: "UT",
      zip: "84043",
      country: "US",
      phone: "9876543210",
    },
    // return_address: returnAddress,
    // return_address: {
    // name: "Return Address",
    // company: "LaptopReturn.com",
    // street1: "48 Leicester Square",
    // street2: "",
    // city: "London",
    // state: "England",
    // zip: "WC2H 7LU",
    // country: "UK",
    // phone: "5852006265",
    // email: "ryan@laptopreturn.com",
    // },
    parcel: parcel,
    // parcel: {id: "prcl_bcc33f53a810497983b0ee762887e6d1"},
    // parcel: {
    //   length: 3,
    //   width: 23.6,
    //   height: 19.6,
    //   weight: 1093,
    // },
    // tax_identifiers: [
    //   {
    //     entity: "RECEIVER",
    //     tax_id_type: "VAT",
    //     tax_id: "12345",
    //     issuing_country: "US",
    //   },
    //   {
    //     entity: "SENDER",
    //     tax_id: "GB123456789",
    //     tax_id_type: "IOSS",
    //     issuing_country: "GB",
    //   },
    // ],
    options: {
      // additional_handling: true,
      // address_validation_level: "0",
      // alcohol: true,
      // carrier_insurance_amount: "1000",
      // carrier_notification_email: "lilyspringer@hotmail.com",
      // certified_mail: true,
      // commercial_invoice_format: "PNG",
      // currency: "CAD",
      // customs_broker_address_id: "toAddress.id",
      // date_advance: "1",
      // delivery_confirmation: "SIGNATURE",
      // delivery_max_datetime: "2022-05-10 10:30:00",
      // delivery_min_datetime: "2022-05-10 10:30:00",
      // dropoff_max_datetime: "2021-05-20T15:00:00Z",
      // duty_payment_account: {
      //   account: "510087780",
      //   country: "US",
      //   postal_code: "12345",
      //   type: "THIRD_PARTY",
      // },
      // end_shipper_id: "es_21706a39ca84494f93ff379ef23a7d5c",
      // freight_charge: "0",
      // handling_instructions: "handling instructions",
      // hazmat: "PRIMARY_CONTAINED",
      // importer_address_id: "adr_cac53236bc4e49edbc4e07146766998d",
      // invoice_number: "123456789",
      // label_date: "2025-04-22T00:00:00Z",
      // label_format: "PNG",
      // label_size: "4x6",
      // live_animal: "DAY_OLD_POULTRY",
      // machinable: false,
      // notifications: [
      //   {
      //     destination: "lilyspringer@hotmail.com",
      //     method: "EMAIL",
      //   },
      //   {
      //     destination: "lspringer@easypost.com",
      //     method: "EMAIL",
      //   },
      // ],
      // one_page: true,
      // payment: {
      //   account: "716047598",
      //   country: "US",
      //   postal_code: "15108",
      //   type: "THIRD_PARTY",
      // },
      // pickup_max_datetime: "2022-05-10 10:30:00",
      // pickup_min_datetime: "2022-05-10 10:30:00",
      // postage_label_inline: true,
      // print_custom_1: "PRINT CUSTOM 1",
      // print_custom_1_barcode: true,
      // print_custom_1_code: "REF",
      // print_custom_2: "PRINT CUSTOM 2",
      // print_custom_2_barcode: true,
      // print_custom_2_code: "PO",
      // print_custom_3: "PRINT CUSTOM 3",
      // print_custom_3_code: "PO",
      // print_custom_4: "PRINT CUSTOM 4",
      // print_custom_4_code: "DP",
      // print_custom_5: "PRINT CUSTOM 5",
      // print_custom_5_code: "RMA",
      // registered_mail: true,
      // saturday_delivery: true,
    },
    carrier_accounts: [process.env.UPS_CA],
    // carrier_accounts: "ca_69c9e73ebf5d42c9ae407ae8a3697214",
    // service: "DHLParcelGround",
    reference: "REFERENCE",
    // reference: crypto.randomUUID(),     // pass random number as reference
  });

  // console.log(JSON.stringify(shipment, null, 2));
  console.log(
    JSON.stringify(
      shipment,
      (key, value) => {
        // Exclude keys starting with "_params"
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

  //============buy shipment by lowest rate============
  try {
    console.log("   ");
    console.log("   ");
    console.log(`attempting to purchase ${shipment.id}...`);
    const boughtShipment = await client.Shipment.buy(
      shipment.id, // shipment id
      shipment.lowestRate() // shipment rate
      // 50 // insurance
    );
    // console.log(JSON.stringify(boughtShipment, null, 2));
    console.log(
      JSON.stringify(
        boughtShipment,
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
  }

  // ============buy shipment by carrier name/service type============
  // try {
  //     const boughtShipment = await client.Shipment.buy(
  //         shipment.id,
  //         shipment.lowestRate(["USPS"], ["First"])
  //     )
  //     console.log(JSON.stringify(boughtShipment, null, 2))
  // } catch (error) {
  //     console.log("   ")
  //     console.log("SHIPMENT BUY ERROR:")
  //     console.log(error)
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
