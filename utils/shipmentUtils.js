// log shipment without extraneous _params:
export const logShipment = (shipment) => {
  for (let key in shipment) {
    if (shipment[key] && typeof shipment[_params] === 'object') {
      delete shipment[key]._params
    }
  }

  console.log(shipment)
}

// log any rate errors:
export const logRateErrors = (shipment) => {
  if (shipment.messages) {
    // Remove the _params key from each object in shipment.messages
    const cleanedMessages = shipment.messages.map((message) => {
      const { _params, ...rest } = message;
      return rest;
    });
    console.log("  ");
    console.log("RATE ERRORS:");
    console.log(JSON.stringify(cleanedMessages, null, 2));
  }
};

// log any rates:
export const logShipmentRates = (shipment) => {
  if (shipment.rates.length >= 1) {
    console.log("   ");
    console.log("RATES:");
    for (const i in shipment.rates) {
      console.log(
        `${shipment.rates[i].carrier} - ${shipment.rates[i].service} - ${shipment.rates[i].rate}`
      );
    }
    console.log("   ");
  }
};

// link to shipment admin page
export const getAdminLink = (shipment) => {
  console.log("");
  console.log("=====SHIPMENT ID:=====");
  console.log(shipment.id);
  console.log("");
  console.log("=====ADMIN URL:=====");
  console.log(
    `https://easypost-admin.easypo.net/easy_post~shipment/${shipment.id}`
  );
};

// link to shipment label
export const getLabelUrl = (shipment) => {
  console.log(" ");
  console.log("=====LABEL URL:=====");
  console.log(JSON.stringify(shipment.postage_label.label_url));
};