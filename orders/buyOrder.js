/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import crypto from "crypto";
import fs from "fs";

const client = new EasyPostClient(process.env.PROD_KEY);  // prodKey
// const client = new EasyPostClient(process.env.TEST_KEY); // testKey

// //============buy order============
try {
  const order = await client.Order.retrieve(
    "order_a972b082e471453db9043d2d786a5ac2"
  );

  const boughtOrder = await client.Order.buy(order.id, "FedEx", "FEDEX_INTERNATIONAL_CONNECT_PLUS");

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

// multiple order call

// try {
//     const order1 = await client.Order.retrieve('order_22ecde7f39754b4d9c4511e1abae6fc6');
//     const boughtOrder1 = await client.Order.buy(order1.id, 'UPS', 'Express');
//     console.log(boughtOrder1);

//     const order2 = await client.Order.retrieve('order_963ec97346f44c588a2b27a54bafa040');
//     const boughtOrder2 = await client.Order.buy(order2.id, 'UPS', 'Express');
//     console.log(boughtOrder2);

//     const order3 = await client.Order.retrieve('order_f99fabc9ccfd4c76aec54c5a4075c17c');
//     const boughtOrder3 = await client.Order.buy(order3.id, 'UPS', 'Express');
//     console.log(boughtOrder3);

//     const order4 = await client.Order.retrieve('order_ed060a26bc1e4f34baf0814b0d03c206');
//     const boughtOrder4 = await client.Order.buy(order4.id, 'UPS', 'Express');
//     console.log(boughtOrder4);

//     const order5 = await client.Order.retrieve('order_acbdee99894c4202b24c6b517cb61a29');
//     const boughtOrder5 = await client.Order.buy(order5.id, 'UPS', 'Express');
//     console.log(boughtOrder5);

//     const order6 = await client.Order.retrieve('order_0fff187d960b493bbeda437cce453fa6');
//     const boughtOrder6 = await client.Order.buy(order6.id, 'UPS', 'Express');
//     console.log(boughtOrder6);

// } catch (error) {
//   console.log("   ")
//   console.log("ORDER BUY ERROR:")
//   console.log(error)
// }
