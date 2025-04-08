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

// const client = new EasyPostClient(process.env.PROD_KEY); // prodKey
const client = new EasyPostClient(process.env.TEST_KEY); // testKey
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
  name: "Example Destination Name",
  company: "Example Destination Company",
  street1: unitedstates1.street1,
  street2: unitedstates1.street2,
  city: unitedstates1.city,
  state: unitedstates1.state,
  zip: unitedstates1.zip,
  country: unitedstates1.country,
  phone: "1234567890",
  email: "example@email.com",
  federal_tax_id: "12345",
  // verify: ['delivery']
});

// CREATE FROM ADDRESS
const fromAddress = await client.Address.create({
  name: "Example Origin Name",
  company: "Example Origin Name",
  street1: unitedkingdom2.street1,
  street2: unitedkingdom2.street2,
  city: unitedkingdom2.city,
  state: unitedkingdom2.state,
  zip: unitedkingdom2.zip,
  country: unitedkingdom2.country,
  phone: "0987654321",
  email: "example@email.com",
  federal_tax_id: "67890",
  // state_tax_id: "12345678",
});

// CREATE RETURN ADDRESS
const returnAddress = await client.Address.create({
  name: "Example Return Name",
  company: "Example Return Company",
  street1: canada2.street1,
  street2: canada2.street2,
  city: canada2.city,
  state: canada2.state,
  zip: canada2.zip,
  country: canada2.country,
  phone: "415-528-7555",
  email: "example@email.com",
  federal_tax_id: "12345",
});

// CREATE PARCEL
const parcel = await client.Parcel.create({
  length: 8.0,
  width: 6.0,
  height: 1.0,
  weight: 35.27,
  // predefined_package: "Letter",
});

// CREATE CUSTOMS INFO
const customsItem = await client.CustomsItem.create({
  description: "Customs item description here",
  quantity: 1,
  weight: 5,
  value: 12,
  hs_tariff_number: "123456",
  origin_country: "US",
  code: "12345",
  manufacturer: "EasyPost",
});

const customsInfo = await client.CustomsInfo.create({
  eel_pfc: "NOEEI 30.37(a)",
  customs_certify: true,
  customs_signer: "Steve Brule",
  contents_type: "returned_goods",
  contents_explanation: "customs_info.contents_explanation value here",
  restriction_type: "none",
  restriction_comments: "",
  declaration: "customs_info.declaration value here",

  /* customs_items can be passed in as instances or ids.
   *  if the item does not have an id, it will be created. */
  customs_items: [
    customsItem,
    // await client.CustomsItem.create({
    //   description: "wwf hulk hogan wrestling figure hasbro 1993",
    //   hs_tariff_number: "95030095",
    //   origin_country: "US",
    //   quantity: 1,
    //   value: "25.0",
    //   weight: 0.8,
    //   currency: "USD",
    // }),
  ],
});

// CREATE SHIPMENT
try {
  console.log("attempting to create shipment...");
  console.log("   ");
  console.log("   ");

  const shipment = await client.Shipment.create({
    // is_return: true,
    to_address: toAddress,
    // from_address: {
    //   company: "Causeway Sensors Ltd",
    //   name: "Deirdre \nFrancis",
    //   street1: "IRCEP Buil Queens Univ. Belfast,",
    //   street2: "Physics Dept Main Site",
    //   city: "Belfast",
    //   state: "NI",
    //   zip: "BT71NN",
    //   country: "GB",
    //   phone: "07515527649",
    //   email: "dfrancis@causewaysensors.com",
    // },
    from_address: fromAddress,
    // to_address: {
    //   company: "Darwin Microfluidics",
    //   name: "Vincent Rocher",
    //   street1: "INOVTRONIK",
    //   street2: "18 rue Denis Papin",
    //   city: "Beauchamp",
    //   state: null,
    //   zip: "95250",
    //   country: "FR",
    //   phone: "+33189197051",
    //   email: "admin@darwin-microfluidics.com",
    // },
    // return_address: returnAddress,
    // buyer_address: {
    //   name: "BUYER ADDRESS",
    //   // company: "MITO Warehouse",
    //   street1: "1122 E 500 S",
    //   // street2: "Suite B",
    //   city: "SALT LAKE CITY",
    //   state: "UT",
    //   zip: "84102",
    //   country: "US",
    //   phone: "0123456789",
    //   // email: "lynsey@mitomaterials.com",
    // },
    // return_address: { ... },     // add non-dad dummy data
    parcel: parcel,
    customs_info: customsInfo,
    // customs_info: { ... },        // add non-dad dummy data
    // customs_info: {
    //   contents_explanation: "Laboratory supplies (non medical use)",
    //   contents_type: "merchandise",
    //   customs_certify: false,
    //   customs_signer: "Vincent Rocher",
    //   eel_pfc: null,
    //   non_delivery_option: "return",
    //   restriction_comments: null,
    //   restriction_type: "none",
    //   mode: null,
    //   declaration: null,
    //   customs_items: [
    //     {
    //       description: "Advanced Microfluidics Connectors and Tubing Kit",
    //       hs_tariff_number: "39173300",
    //       origin_country: "US",
    //       quantity: 5.0,
    //       value: 904.85,
    //       weight: 8.82,
    //       code: "AF-K100-12",
    //       mode: null,
    //       manufacturer: null,
    //       currency: "GBP",
    //       eccn: null,
    //       printed_commodity_identifier: null,
    //     },
    //   ],
    // },
    // tax_identifiers: [
    //   {
    //     entity: "SENDER",
    //     tax_id: "9999999999",
    //     tax_id_type: "EORI",
    //     issuing_country: "US",
    //   },
    // ],
    options: {
      // currency: "USD",
      // reference: "package-77894747",
      // invoice: "77734619-2526177817-RE",
      // saturday_delivery: false,
      // alcohol: false,
      // incoterm: "DAP",
      // cost_center: "warehouse31",
      // endorsement: "RETURN_SERVICE_REQUESTED",
      // freight_charge: 0,
      // address_validation_level: "O",
      // import_control: "PRINT",
      // import_control_description: "import control description",
      // carrier_insurance_amount: "1000",
      // print_custom_1: "AWESOME SOLUTIONS",
      // print_custom_2: "PRINT CUSTOM 2",
      // print_custom_2_code: "PO",
      // print_custom_3: "PRINT CUSTOM 3",
      // print_custom_3_code: "RMA",
      // print_custom_4: "PRINT CUSTOM 4",
      // print_custom_4_code: "DP",
      // print_custom_1_barcode: true,
      // print_custom_2_barcode: true,
      // hazmat: "SECONDARY_CONTAINED"
      // commercial_invoice_letterhead: "IMAGE_1",
      // commercial_invoice_signature: "IMAGE_2",
      commercial_invoice_format: "ZPL",
      // commercial_invoice_size: "4x6"
      // suppress_etd: true,
      // freight_charge: 0,
      // customs_include_shipping: true,
      // date_advance: "1",
      // handling_instructions: "API O#: 14639 | OLP O#: 300014639",
      // postage_label_inline: true,
      // label_format: "pdf",
      // one_page: true,
      // label_size: "4X6",
      // merchant_id: "EasyPost",
      // incoterm: "DDP",
      // label_date: "2024-07-28T15:00:00Z",
      // oriiginal_ship_date: "2024-07-28T15:00:00Z",
      // overlabel_original_tracking_number: "0123456789",
      // incoterm: "DTP",
      // currency: "USD",
      // invoice_number: "123456789",
      // importer_address_id: "adr_9faf7d50d84311ef85b73cecef1b359e",
      // customs_broker_address_id: "adr_8c1da6ead84311efb61aac1f6bc539ae",
      // payment: {
      //   type: "THIRD_PARTY",
      //   account: "H699G0",
      //   country: "US",
      //   postal_code: "84102",
      // },
      // duty_payment_account: {
      //   type: "THIRD_PARTY",
      //   account: "510087780",
      //   country: "US",
      //   postal_code: "12345",
      // },
      // dropoff_max_datetime: "2021-05-20T15:00:00Z",
      // delivery_confirmation: "NO_SIGNATURE",
      // commercial_invoice_format: "PNG",
      // delivery_min_datetime: "2022-05-10 10:30:00",
      // delivery_max_datetime: "2022-05-10 10:30:00",
      // pickup_min_datetime: "2022-05-10 10:30:00",
      // pickup_max_datetime: "2022-05-10 10:30:00",
      // customs_broker_address_id: toAddress.id,
    },

    carrier_accounts: [process.env.RMV3_CA],
    // service: 'INTERNATIONAL_ECONOMY',
    reference: "[REFERENCE VALUE]",
    // reference: crypto.randomUUID(),     // pass random number as reference
  });

  // log entire shipment object
  // console.log(JSON.stringify(shipment, null, 2));
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

  //============buy shipment by lowest rate============
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

  // // ============buy shipment by carrier name/service type============
  // try {
  //     const boughtShipment = await client.Shipment.buy(
  //         shipment.id,
  //         shipment.lowestRate(["CanadaPost"], ["RegularParcel"])
  //     )
  //     console.log(JSON.stringify(boughtShipment, null, 2))
  // } catch (error) {
  //     console.log("   ")
  //     console.log("SHIPMENT BUY ERROR:")
  //     console.log(error)
  // }
} catch (error) {
  console.log("   ");
  console.log("SHIPMENT CREATE ERROR:");
  console.log(error);
}
