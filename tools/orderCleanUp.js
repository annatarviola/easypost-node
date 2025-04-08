// THIS TOOL REMOVES ALL INTERNAL DETAILS FROM THE ORDER JSON YOU GET FROM ADMIN

import fs from 'fs';

// bring in the data from the misc.json file
import order from '../misc.json' assert { type: 'json' }

delete order.user
delete order.user_id
delete order.from_address_id
delete order.to_address_id
delete order.buyer_address_id
delete order.return_address_id
delete order.customs_info_id
delete order.id
delete order._internal

for (const i in order.shipments) {
    delete order.shipments[i]._internal
}

// write info to a CSV file in the Downloads folder
fs.writeFileSync(`/Users/smarston/Downloads/json_for_${order.public_id}.txt`, JSON.stringify(order, null, 4));

// log to console just in case
console.log(JSON.stringify(order, null, 2))
