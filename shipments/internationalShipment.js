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
  street1: canada1.street1,
  street2: canada1.street2,
  city: canada1.city,
  state: canada1.state,
  zip: canada1.zip,
  country: canada1.country,
  phone: "1234567890",
  email: "example@email.com",
  federal_tax_id: "12345",
  // verify: ['delivery']
});

// CREATE FROM ADDRESS
const fromAddress = await client.Address.create({
  name: "Example Origin Name",
  company: "Example Origin Name",
  street1: unitedstates2.street1,
  street2: unitedstates2.street2,
  city: unitedstates2.city,
  state: unitedstates2.state,
  zip: unitedstates2.zip,
  country: unitedstates2.country,
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
  length: 5.0,
  width: 5.0,
  height: 5.0,
  weight: 0.01,
  // predefined_package: "Letter",
});

// CREATE CUSTOMS INFO
const customsItem = await client.CustomsItem.create({
  description: "Customs item description here",
  quantity: 1,
  weight: 5,
  value: 12,
  hs_tariff_number: "1234.56.0546",
  origin_country: "US",
  code: "12345",
  currency: "GBP",
  manufacturer: "EasyPost",
});

const customsInfo = await client.CustomsInfo.create({
  eel_pfc: "NOEEI 30.37(a)",
  customs_certify: true,
  customs_signer: "Steve Brule",
  contents_type: "merchandise",
  contents_explanation: "customs_info.contents_explanation value here",
  restriction_type: "none",
  restriction_comments: "[customs_info.restriction_comments value here]",
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
    is_return: true,
    to_address: toAddress,
    // to_address: {
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
    // from_address: {
    //   name: "Michael Mouse",
    //   // company: "Vincent Rocher",
    //   street1: "Damrak 8",
    //   // street2: "18 rue Denis Papin",
    //   city: "Amsterdam",
    //   state: null,
    //   zip: "1012 LG",
    //   country: "NL",
    //   phone: "+33189197051",
    //   email: "michael@mouse.com",
    // },
    // return_address: returnAddress,
    // buyer_address: {
    //   name: "BUYER ADDRESS",
    // company: "MITO Warehouse",
    //   street1: "1122 E 500 S",
    // street2: "Suite B",
    //   city: "SALT LAKE CITY",
    //   state: "UT",
    //   zip: "84102",
    //   country: "US",
    //   phone: "0123456789",
    // email: "lynsey@mitomaterials.com",
    // },
    // return_address: { ... },     // add non-dad dummy data
    parcel: parcel,
    customs_info: customsInfo,
    // customs_info: { ... },        // add non-dummy data
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
    //     tax_id: "123456789",
    //     tax_id_type: "EORI",
    //     issuing_country: "US",
    //   },
    // ],
    options: {
      address_validation_level: "O",
      alcohol: false,
      carrier_insurance_amount: "1000",
      commercial_invoice_format: "PNG",
      commercial_invoice_letterhead: "IMAGE_1",
      commercial_invoice_signature: "IMAGE_2",
      commercial_invoice_size: "4x6",
      cost_center: "warehouse31",
      currency: "USD",
      customs_broker_address_id: "toAddress.id",
      customs_include_shipping: true,
      date_advance: "1",
      delivery_confirmation: "NO_SIGNATURE",
      delivery_max_datetime: "2022-05-10 10:30:00",
      delivery_min_datetime: "2022-05-10 10:30:00",
      dropoff_max_datetime: "2021-05-20T15:00:00Z",
      duty_payment_account: {
        account: "510087780",
        country: "US",
        postal_code: "12345",
        type: "THIRD_PARTY",
      },
      endorsement: "RETURN_SERVICE_REQUESTED",
      freight_charge: 0,
      handling_instructions: "API O#: 14639 | OLP O#: 300014639",
      hazmat: "SECONDARY_CONTAINED",
      import_control: "PRINT",
      import_control_description: "import control description",
      importer_address_id: "adr_9faf7d50d84311ef85b73cecef1b359e",
      incoterm: "DTP",
      invoice: "77734619-2526177817-RE",
      invoice_number: "123456789",
      label_date: "2024-07-28T15:00:00Z",
      label_format: "PNG",
      label_size: "4X6",
      merchant_id: "EasyPost",
      one_page: true,
      oriiginal_ship_date: "2024-07-28T15:00:00Z",
      overlabel_original_tracking_number: "0123456789",
      payment: {
        account: "H699G0",
        country: "US",
        postal_code: "84102",
        type: "THIRD_PARTY",
      },
      pickup_max_datetime: "2022-05-10 10:30:00",
      pickup_min_datetime: "2022-05-10 10:30:00",
      postage_label_inline: true,
      print_custom_1: "AWESOME SOLUTIONS",
      print_custom_1_barcode: true,
      print_custom_2: "PRINT CUSTOM 2",
      print_custom_2_barcode: true,
      print_custom_2_code: "PO",
      print_custom_3: "PRINT CUSTOM 3",
      print_custom_3_code: "RMA",
      print_custom_4: "PRINT CUSTOM 4",
      print_custom_4_code: "DP",
      reference: "package-77894747",
      saturday_delivery: false,
      suppress_etd: true,
    },
    carrier_accounts: [process.env.USPS_CA],
    // service: 'Tracked24',
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
