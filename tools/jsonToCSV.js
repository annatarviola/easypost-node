const converter = require('json-2-csv');
const fs = require('fs');

// add JSON from admin here
const myJson = require('../misc.json');
const batchShipments = myJson;

// convert JSON array to CSV string
const letsGo = async () => {
    try {
        const csv = await converter.json2csvAsync(batchShipments);

        // print CSV string
        console.log(csv);

        // write info to a CSV file in the Downloads folder
        fs.writeFileSync('/Users/smarston/Downloads/my_file.csv', csv);

    } catch (err) {
        console.log(err);
    }
};

letsGo();