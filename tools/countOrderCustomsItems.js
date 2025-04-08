import order from "../misc.json" assert { type: "json" };

let totalQuantity = 0;

order.shipments.forEach(shipment => {
    if (shipment.customs_info && shipment.customs_info.customs_items) {
        shipment.customs_info.customs_items.forEach(item => {
            totalQuantity += item.quantity
        })
    }
})

console.log(`TOTAL CUSTOMS ITEM QUANTITY: ${totalQuantity}`)
