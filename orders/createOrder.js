/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import crypto from "crypto";
import fs from "fs";

const client = new EasyPostClient(process.env.PROD_KEY); // prodKey
// const client = new EasyPostClient(process.env.TEST_KEY); // testKey

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
const toAddress = {
  name: "Example Destination Name",
  company: "Example Destination Company",
  street1: canada1.street1,
  street2: canada1.street2,
  city: canada1.city,
  state: canada1.state,
  zip: canada1.zip,
  country: canada1.country,
  phone: "415-528-7555",
  email: "example@email.com",
  // federal_tax_id: '12345',
  // verify: ['delivery']
};

// CREATE FROM ADDRESS
const fromAddress = {
  name: "Example Origin Name",
  company: "Example Origin Company",
  street1: unitedstates2.street1,
  street2: unitedstates2.street2,
  city: unitedstates2.city,
  state: unitedstates2.state,
  zip: unitedstates2.zip,
  country: unitedstates2.country,
  phone: "415-528-7555",
  email: "example@email.com",
  // federal_tax_id: '12345'
};

/// CREATE CUSTOMS INFO
const customsItem = {
  description: "easypost tshirts",
  quantity: 1,
  value: 10,
  weight: 5,
  hs_tariff_number: "123456",
  origin_country: "us",
  code: "1234",
};

const customsInfo = {
  eel_pfc: "NOEEI 30.37(a)",
  customs_certify: true,
  customs_signer: "Steve Brule",
  contents_type: "merchandise",
  contents_explanation: "this is the general notes section",
  restriction_type: "none",
  // restriction_comments: '',
  non_delivery_option: "return",

  /* customs_items can be passed in as instances or ids.
   *  if the item does not have an id, it will be created. */
  customs_items: [
    customsItem,
    {
      description: "easypost festive fun shirts",
      quantity: 2,
      weight: 5,
      value: 23,
      hs_tariff_number: "654321",
      origin_country: "US",
      code: "1234",
    },
  ],
};

// CREATE ARRAY WITH SPECIFIC NUMBER OF SHIPMENTS FOR SHIPMENT OBJECT

const shipmentArr = (num) =>
  Array(num).fill({
    options: {
      label_format: "PDF"
    },
    parcel: {
      length: "7",
      width: "6",
      height: "4",
      weight: "11",
    },
    // is_return: true,
    customs_info: customsInfo,
  });

//============buy shipment by lowest rate============
try {
  const order = await client.Order.create({
    options: {
      // print_custom_1: "hgjksdhlkfjdhg",
    },
    to_address: toAddress,
    // to_address: {
    //   zip: "T0E 1Z0",
    //   country: "CA",
    //   city: "ROCKY RAPIDS",
    //   phone: "1-800-263-2535",
    //   name: "KEETON MELVILLE",
    //   company: "KEETON MELVILLE",
    //   street1: " 4809 50 AVENUE",
    //   state: "AB",
    //   email: "mmcreceiver@maves.com",
    // },
    from_address: fromAddress,
    // from_address: {
    //   name: "BISSELL CANADA CORPORATION",
    //   street1: "8465 Mount Pleasant Way",
    //   street2: "",
    //   city: "Milton",
    //   state: "ON",
    //   zip: "L9T 2X7",
    //   country: "CA",
    //   phone: "18002632535",
    //   email: "bill.hall@nfiindustries.com",
    //   createdAt: "Nov 20, 2024, 8:15:23 PM",
    //   updatedAt: "Nov 20, 2024, 8:15:23 PM",
    // },
    return_address: toAddress,
    // reference: "ShipmentRef",
    // shipments: [
    //   {
    //     // options: {
    //     //   label_format: "PDF",
    //     //   // label_date: "2024-03-29T21:00:00Z",
    //     //   // currency: "USD",
    //     //   payment: {
    //     //     type: "SENDER"
    //     //   }
    //     // },
    //     parcel: {
    //       height: 5,
    //       length: 5,
    //       width: 5,
    //       weight: 15,
    //       // predefined_package: "Parcel"
    //     },
    //     // reference: 2,
    //     customs_info: customsInfo,
    //     // customs_info: {
    //     //   customs_items: [],
    //     //   eel_pfc: "NO EEI 30.37 (a)",
    //     //   contents_type: "merchandise",
    //     //   contents_explanation: "SUN TAN PREPARATIONS",
    //     //   restriction_type: "none",
    //     //   non_delivery_option: "return"
    //     // }
    //   },
    //   {
    //     options: {
    //       special_rates_eligibility: "USPS.MEDIAMAIL",
    //       label_date: "2024-11-18T00:00:00+00:00",
    //       print_custom_3: "MA14417",
    //       print_custom_2: "SH1829322",
    //       incoterm: "DDU",
    //       currency: "USD",
    //       delivered_duty_paid: false,
    //       print_custom: [
    //         {
    //           value: "SH1829322",
    //         },
    //         {
    //           value: "MA14417",
    //         },
    //       ],
    //       payment: {
    //         type: "SENDER",
    //       },
    //       date_advance: 3,
    //     },
    //     customs_info: {
    //       contents_type: "merchandise",
    //       customs_certify: true,
    //       customs_signer: "Joe Workman",
    //       eel_pfc: "NOEEI 30.37(a)",
    //       non_delivery_option: "return",
    //       restriction_comments: null,
    //       restriction_type: "none",
    //       mode: "production",
    //       declaration: null,
    //       customs_items: [
    //         {
    //           description: "T-shirts and other garments of cotton",
    //           hs_tariff_number: "6109.10",
    //           origin_country: "US",
    //           quantity: 1,
    //           value: "40.62",
    //           weight: 6,
    //           code: "3713141",
    //           mode: "production",
    //           manufacturer: null,
    //           currency: null,
    //           eccn: null,
    //           printed_commodity_identifier: null,
    //         },
    //       ],
    //     },
    //     parcel: {
    //       length: 13,
    //       width: 10,
    //       height: 1,
    //       predefined_package: null,
    //       weight: 6,
    //     },
    //   },
    // ],
    shipments: shipmentArr(2),
    carrier_accounts: [{ id: process.env.UPS_CA }],
    // service: "FEDEX_GROUND",
    reference: crypto.randomUUID(),
  });

  // // write info to a txt file in the Downloads folder
  // fs.writeFileSync(
  //   `/Users/lspringer/Downloads/my_order_${order.id}.txt`,
  //   JSON.stringify(order, null, 2)
  // );

  // log order ID
  console.log("ORDER ID:");
  console.log(order.id);
  console.log("   ");
  console.log("   ");

  // log any rates returned
  for (const i in order.shipments) {
    for (const rate in order.shipments[i].rates)
      console.log(
        `${order.shipments[i].id} - ${order.shipments[i].rates[rate].carrier} - ${order.shipments[i].rates[rate].service} - ${order.shipments[i].rates[rate].rate}`
      );
  }

  // log any rating errors
  console.log("\n\nRATING ERRORS:");
  for (const i in order.messages) {
    console.log(order.messages[i]);
  }

  // buy order
  if (order.shipments[0].rates) {
    try {
      const boughtOrder = await client.Order.buy(
        order.id,
        "UPS", // carrier
        "UPSStandard" // service
      );

      console.log(boughtOrder);

      // link to order admin page
      console.log(" ");
      console.log(" ");
      console.log("ADMIN URL:");
      console.log(
        `https://easypost-admin.easypo.net/easy_post~shipment/${boughtOrder.id}`
      );
    } catch (error) {
      console.log("   ");
      console.log("ORDER BUY ERROR:");
      console.log(error);
    }
  }
} catch (error) {
  console.log("   ");
  console.log("ORDER CREATE ERROR:");
  console.log(error);
}
